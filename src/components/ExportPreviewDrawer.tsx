import { h } from "preact"
import type { ComponentChildren } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"
import type { LayoutRulesState } from "./LayoutRules"
import type { TargetDevice } from "./ResponsiveSidebar"
import type { FigmaSerializedFrame, FigmaSerializedNode, ResponsiveNodeRule } from "../frameSchema"
import {
  findNode,
  getCornerRadius,
  getLayerKind,
  getSolidFillColor,
  getTextFontFamily,
  getTextFontWeight,
  getTextHorizontalAlign,
  getTextLineHeight,
  getTextVerticalJustify,
  isVirtualGroup,
  type NodeBounds
} from "./editorModel"

type ExportPreviewDrawerProps = {
  frame: FigmaSerializedFrame
  selectedNodeId: string | null
  onSelect: (nodeId: string) => void
  targetDevice: TargetDevice
  screenWidth: number
  layoutRules: LayoutRulesState
  isExpanded: boolean
  onToggle: () => void
}

export default function ExportPreviewDrawer({
  frame,
  selectedNodeId,
  onSelect,
  targetDevice,
  screenWidth,
  layoutRules,
  isExpanded,
  onToggle
}: ExportPreviewDrawerProps) {
  const [inspectedNodeId, setInspectedNodeId] = useState<string | null>(null)
  const inspectedNode = inspectedNodeId == null
    ? null
    : inspectedNodeId === frame.id
      ? frame
      : findNode(frame, inspectedNodeId)

  useEffect(() => {
    if (!isExpanded) {
      setInspectedNodeId(null)
    }
  }, [isExpanded])

  function inspectNode(nodeId: string) {
    onSelect(nodeId)
    setInspectedNodeId(nodeId)
  }

  return (
    <aside
      class={`absolute bottom-0 right-0 top-0 z-40 min-h-0 border-l border-[#e5e7eb] bg-white shadow-xl transition-[width] ${
        isExpanded ? "w-full" : "w-12"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        class={`w-full text-left transition hover:bg-gray-50 ${
          isExpanded
            ? "flex h-12 items-center justify-between px-4"
            : "flex h-full items-center justify-center"
        }`}
      >
        {isExpanded ? (
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">
              Export Preview
            </h3>
            <p class="mt-0.5 text-[11px] text-gray-500">
              {getDeviceLabel(targetDevice)} · {Math.round(screenWidth)}px
            </p>
          </div>
        ) : (
          <span class="[writing-mode:vertical-rl] text-xs font-bold uppercase tracking-wide text-gray-500">
            Export Preview
          </span>
        )}

        {isExpanded && (
          <span class="text-xs font-semibold text-[#0f766e]">
            Collapse
          </span>
        )}
      </button>

      {isExpanded && (
        <div class="relative h-[calc(100%-48px)] min-h-0">
          <GeneratedPreview
            frame={frame}
            selectedNodeId={selectedNodeId}
            onSelect={onSelect}
            onInspect={inspectNode}
            targetDevice={targetDevice}
            screenWidth={screenWidth}
            layoutRules={layoutRules}
          />

          {inspectedNode != null && (
            <ExportInspectorPanel
              frame={frame}
              node={inspectedNode}
              targetDevice={targetDevice}
              screenWidth={screenWidth}
              layoutRules={layoutRules}
              onSelect={onSelect}
              onClose={() => setInspectedNodeId(null)}
            />
          )}
        </div>
      )}
    </aside>
  )
}

function GeneratedPreview({
  frame,
  selectedNodeId,
  onSelect,
  onInspect,
  targetDevice,
  screenWidth,
  layoutRules
}: {
  frame: FigmaSerializedFrame
  selectedNodeId: string | null
  onSelect: (nodeId: string) => void
  onInspect: (nodeId: string) => void
  targetDevice: TargetDevice
  screenWidth: number
  layoutRules: LayoutRulesState
}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const lastPreviewClickRef = useRef<{
    nodeId: string
    clickedAt: number
  } | null>(null)
  const [viewportWidth, setViewportWidth] = useState(720)
  const reviewWidth = Number.isFinite(screenWidth) && screenWidth > 0
    ? screenWidth
    : frame.geometry.width
  const backgroundColor = getSolidFillColor(frame.style.fills) ?? "#ffffff"
  const exportGroups = createExportReviewGroups(frame, reviewWidth, layoutRules)
  const reviewHeight = Math.max(
    Math.min(frame.geometry.height, 760),
    exportGroups.reduce((bottom, group) => Math.max(bottom, group.y + group.height), 0) + 24
  )
  const availableWidth = Math.max(240, viewportWidth - 48)
  const fitScale = availableWidth / Math.max(reviewWidth, 1)
  const minimumReadableScale = targetDevice === "desktop" ? 0.45 : targetDevice === "tablet" ? 0.6 : 0.85
  const canvasScale = Math.min(1, Math.max(minimumReadableScale, fitScale))
  const canvasWidth = Math.max(1, reviewWidth * canvasScale)
  const canvasHeight = Math.max(1, reviewHeight * canvasScale)
  const isFrameSelected = selectedNodeId === frame.id

  useEffect(() => {
    const scrollArea = scrollAreaRef.current

    if (scrollArea == null) {
      return
    }

    function updateViewportWidth() {
      const currentScrollArea = scrollAreaRef.current

      if (currentScrollArea == null) {
        return
      }

      setViewportWidth(currentScrollArea.getBoundingClientRect().width)
    }

    updateViewportWidth()

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateViewportWidth)

      return () => window.removeEventListener("resize", updateViewportWidth)
    }

    const observer = new ResizeObserver(updateViewportWidth)
    observer.observe(scrollArea)

    return () => observer.disconnect()
  }, [])

  function selectOrInspectNode(nodeId: string) {
    const now = Date.now()
    const lastClick = lastPreviewClickRef.current
    const isDoubleClick = lastClick != null &&
      lastClick.nodeId === nodeId &&
      now - lastClick.clickedAt < 450

    lastPreviewClickRef.current = {
      nodeId,
      clickedAt: now
    }

    if (isDoubleClick) {
      onInspect(nodeId)
      return
    }

    onSelect(nodeId)
  }

  return (
    <section class="flex h-full min-h-0 flex-col bg-[#fbfbfd]">
      <div ref={scrollAreaRef} class="min-h-0 flex-1 overflow-auto p-5">
        <div
          class="min-h-full"
          style={{
            minWidth: `${canvasWidth + 40}px`
          }}
        >
          <div class="mx-auto w-fit">
            <div class="mb-3 flex items-center justify-between gap-4 text-xs">
              <div class="flex items-center gap-2">
                <span class="font-bold text-gray-900">
                  Generated
                </span>
                <span class="text-gray-300">·</span>
                <span class="font-semibold text-gray-500">
                  {getDeviceLabel(targetDevice)}
                </span>
                <span class="text-gray-300">·</span>
                <span class="font-semibold text-gray-500">
                  {Math.round(reviewWidth)}px
                </span>
              </div>
              <div class="flex shrink-0 items-center gap-2">
                {selectedNodeId != null && (
                  <button
                    type="button"
                    onClick={() => onInspect(selectedNodeId)}
                    class="rounded-md border border-[#0f766e]/30 bg-[#ecfdf5] px-2 py-1 text-[10px] font-bold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                  >
                    Inspect
                  </button>
                )}
                <span class="rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-[10px] font-bold text-gray-500">
                  {Math.round(canvasScale * 100)}%
                </span>
              </div>
            </div>

            <div class="flex justify-center">
              <div
                class="relative cursor-pointer overflow-hidden rounded border border-[#d1d5db] shadow-sm"
                onClick={(event) => {
                  event.stopPropagation()
                  selectOrInspectNode(frame.id)
                }}
                onContextMenu={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  onInspect(frame.id)
                }}
                style={{
                  width: `${canvasWidth}px`,
                  height: `${canvasHeight}px`,
                  backgroundColor,
                  outline: isFrameSelected ? "2px solid #0f766e" : undefined,
                  outlineOffset: isFrameSelected ? "-2px" : undefined,
                  boxShadow: isFrameSelected ? "0 0 0 3px rgba(15, 118, 110, 0.14)" : undefined
                }}
              >
                {exportGroups.map((group) => (
                  <div
                    key={group.node.id}
                    class="absolute overflow-hidden"
                    style={{
                      left: `${group.x * canvasScale}px`,
                      top: `${group.y * canvasScale}px`,
                      width: `${group.width * canvasScale}px`,
                      height: `${group.height * canvasScale}px`
                    }}
                  >
                    <ResponsiveReviewNode
                      node={group.node}
                      origin={group.sourceBounds}
                      scale={group.scale * canvasScale}
                      layoutRules={layoutRules}
                      reviewWidth={reviewWidth}
                      selectedNodeId={selectedNodeId}
                      onPreviewClick={selectOrInspectNode}
                      onPreviewInspect={onInspect}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResponsiveReviewNode({
  node,
  origin,
  scale,
  layoutRules,
  reviewWidth,
  selectedNodeId,
  onPreviewClick,
  onPreviewInspect
}: {
  node: FigmaSerializedNode
  origin: Pick<NodeBounds, "x" | "y">
  scale: number
  layoutRules: LayoutRulesState
  reviewWidth: number
  selectedNodeId: string | null
  onPreviewClick: (nodeId: string) => void
  onPreviewInspect: (nodeId: string) => void
}) {
  if (!node.visible) {
    return null
  }

  const isSelected = selectedNodeId === node.id

  if (isVirtualGroup(node)) {
    const arrangedChildren = arrangeResponsiveChildren(node, layoutRules, reviewWidth)
    const renderedHeight = getResponsiveNodeHeight(node, layoutRules, reviewWidth)

    return (
      <div
        class="absolute cursor-pointer overflow-visible"
        title={node.name}
        onClick={(event) => {
          event.stopPropagation()
          onPreviewClick(node.id)
        }}
        onContextMenu={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onPreviewInspect(node.id)
        }}
        style={{
          left: `${(node.geometry.x - origin.x) * scale}px`,
          top: `${(node.geometry.y - origin.y) * scale}px`,
          width: `${node.geometry.width * scale}px`,
          height: `${renderedHeight * scale}px`,
          outline: isSelected ? "2px solid #0f766e" : "1px dashed rgba(15, 118, 110, 0.35)",
          outlineOffset: isSelected ? "-2px" : "-1px",
          boxShadow: isSelected ? "0 0 0 3px rgba(15, 118, 110, 0.14)" : undefined
        }}
      >
        {arrangedChildren.map((child) => (
          <ResponsiveReviewNode
            key={child.node.id}
            node={child.node}
            origin={{ x: 0, y: 0 }}
            scale={scale}
            layoutRules={layoutRules}
            reviewWidth={reviewWidth}
            selectedNodeId={selectedNodeId}
            onPreviewClick={onPreviewClick}
            onPreviewInspect={onPreviewInspect}
          />
        ))}
      </div>
    )
  }

  const fillColor = getSolidFillColor(node.style.fills)
  const isTextNode = node.text != null
  const backgroundColor = isTextNode ? undefined : fillColor
  const textColor = isTextNode ? fillColor : undefined
  const borderColor = getSolidFillColor(node.style.strokes)
  const borderWidth = borderColor == null
    ? 0
    : Math.max(1, (node.style.strokeWeight ?? 1) * scale)
  const arrangedChildren = arrangeResponsiveChildren(node, layoutRules, reviewWidth)
  const renderedHeight = getResponsiveNodeHeight(node, layoutRules, reviewWidth)

  return (
    <div
      class="absolute cursor-pointer overflow-hidden"
      title={node.name}
      onClick={(event) => {
        event.stopPropagation()
        onPreviewClick(node.id)
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onPreviewInspect(node.id)
      }}
      style={{
        left: `${(node.geometry.x - origin.x) * scale}px`,
        top: `${(node.geometry.y - origin.y) * scale}px`,
        width: `${node.geometry.width * scale}px`,
        height: `${renderedHeight * scale}px`,
        opacity: node.style.opacity,
        backgroundColor,
        borderColor,
        borderStyle: borderColor == null ? undefined : "solid",
        borderWidth: `${borderWidth}px`,
        borderRadius: getCornerRadius(node.style.cornerRadius, scale),
        outline: isSelected ? "2px solid #0f766e" : undefined,
        outlineOffset: isSelected ? "-2px" : undefined,
        boxShadow: isSelected ? "0 0 0 3px rgba(15, 118, 110, 0.14)" : undefined
      }}
    >
      {node.text != null && (
        <div
          class="h-full w-full overflow-hidden"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: getTextVerticalJustify(node),
            fontSize: typeof node.text.fontSize === "number"
              ? `${getResponsiveFontSize(node.text.fontSize, scale, layoutRules)}px`
              : undefined,
            fontFamily: getTextFontFamily(node),
            fontWeight: getTextFontWeight(node),
            lineHeight: layoutRules.tightenLineHeight ? 1.15 : getTextLineHeight(node, scale),
            color: textColor ?? "#1f2937",
            textAlign: getTextHorizontalAlign(node),
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }}
        >
          {node.text.characters}
        </div>
      )}

      {arrangedChildren.map((child) => (
        <ResponsiveReviewNode
          key={child.node.id}
          node={child.node}
          origin={{ x: 0, y: 0 }}
          scale={scale}
          layoutRules={layoutRules}
          reviewWidth={reviewWidth}
          selectedNodeId={selectedNodeId}
          onPreviewClick={onPreviewClick}
          onPreviewInspect={onPreviewInspect}
        />
      ))}
    </div>
  )
}

function ExportInspectorPanel({
  frame,
  node,
  targetDevice,
  screenWidth,
  layoutRules,
  onSelect,
  onClose
}: {
  frame: FigmaSerializedFrame
  node: FigmaSerializedNode
  targetDevice: TargetDevice
  screenWidth: number
  layoutRules: LayoutRulesState
  onSelect: (nodeId: string) => void
  onClose: () => void
}) {
  const isFrame = node.id === frame.id
  const isContainer = node.children.length > 0
  const isText = node.text != null
  const reviewWidth = Number.isFinite(screenWidth) && screenWidth > 0
    ? screenWidth
    : frame.geometry.width
  const effectiveRules = getEffectiveLayoutRules(node, layoutRules)
  const convertedLayoutMode = getConvertedLayoutMode(node, effectiveRules, reviewWidth)
  const renderedHeight = isFrame
    ? Math.max(frame.geometry.height, createExportReviewGroups(frame, reviewWidth, layoutRules).reduce((bottom, group) => Math.max(bottom, group.y + group.height), 0))
    : getResponsiveNodeHeight(node, layoutRules, reviewWidth)

  return (
    <aside class="absolute bottom-3 right-3 top-3 z-20 flex w-72 flex-col overflow-hidden rounded-lg border border-[#d1d5db] bg-white shadow-2xl">
      <header class="flex h-12 shrink-0 items-center justify-between border-b border-[#e5e7eb] px-3">
        <div class="min-w-0">
          <p class="truncate text-xs font-bold text-gray-900">
            {node.name}
          </p>
          <p class="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
            {isFrame ? "FRAME" : getLayerKind(node)}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          class="rounded px-2 py-1 text-xs font-bold text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          X
        </button>
      </header>

      <div class="min-h-0 flex-1 overflow-auto p-3">
        <InspectorSection title={isFrame ? "Canvas" : "Export Box"}>
          <div class="grid grid-cols-2 gap-2">
            <InspectorMetric label="Width" value={`${Math.round(isFrame ? reviewWidth : node.geometry.width)}px`} />
            <InspectorMetric label="Height" value={`${Math.round(renderedHeight)}px`} />
            <InspectorMetric label="X" value={`${Math.round(node.geometry.x)}px`} />
            <InspectorMetric label="Y" value={`${Math.round(node.geometry.y)}px`} />
          </div>
        </InspectorSection>

        {isFrame && (
          <InspectorSection title="Frame Settings">
            <div class="grid grid-cols-2 gap-2">
              <InspectorMetric label="Device" value={getDeviceLabel(targetDevice)} />
              <InspectorMetric label="Children" value={String(frame.children.length)} />
              <InspectorMetric label="Padding" value={`${layoutRules.outputPadding}px`} />
              <InspectorMetric label="Rules" value={String(countCustomRules(frame))} />
            </div>
          </InspectorSection>
        )}

        {isContainer && (
          <InspectorSection title="Container Behavior">
            <div class="space-y-2">
              <InspectorRow label="Current layout" value={String(node.layout.layoutMode ?? "None")} />
              <InspectorRow label="Generated layout" value={convertedLayoutMode ?? "Keep"} />
              <InspectorRow label="Rule source" value={node.responsive?.nodeRule?.enabled === true ? "Custom" : "Inherited"} />
              <InspectorRow label="Direction" value={formatConversionDirection(effectiveRules.conversionDirection)} />
              <InspectorRow label="Trigger" value={effectiveRules.rowToColumnMode} />
              <InspectorRow label="Breakpoint" value={`${effectiveRules.rowToColumnBreakpoint}px`} />
              <InspectorRow label="Gap" value={`${effectiveRules.stackGap}px`} />
              <InspectorRow label="Align" value={effectiveRules.stackAlignment} />
              <InspectorRow label="Children" value={String(node.children.length)} />
            </div>
          </InspectorSection>
        )}

        {isText && (
          <InspectorSection title="Text">
            <div class="space-y-2">
              <InspectorRow label="Size" value={typeof node.text?.fontSize === "number" ? `${node.text.fontSize}px` : "Mixed"} />
              <InspectorRow label="Weight" value={String(getTextFontWeight(node) ?? "Default")} />
              <InspectorRow label="Align" value={getTextHorizontalAlign(node)} />
              <div class="rounded-lg border border-[#e5e7eb] bg-gray-50 p-2 text-xs leading-5 text-gray-700">
                {node.text?.characters}
              </div>
            </div>
          </InspectorSection>
        )}

        {!isFrame && !isText && (
          <InspectorSection title="Visual Style">
            <div class="space-y-2">
              <InspectorRow label="Fill" value={getSolidFillColor(node.style.fills) ?? "None"} />
              <InspectorRow label="Stroke" value={getSolidFillColor(node.style.strokes) ?? "None"} />
              <InspectorRow label="Radius" value={node.style.cornerRadius == null ? "0" : String(node.style.cornerRadius)} />
              <InspectorRow label="Opacity" value={node.style.opacity == null ? "100%" : `${Math.round(node.style.opacity * 100)}%`} />
            </div>
          </InspectorSection>
        )}
      </div>

      <footer class="shrink-0 border-t border-[#e5e7eb] p-3">
        <button
          type="button"
          onClick={() => onSelect(node.id)}
          class="h-9 w-full rounded-lg border border-[#0f766e] bg-[#ecfdf5] text-xs font-bold text-[#0f766e] transition hover:bg-[#ccfbf1]"
        >
          Select in layers
        </button>
      </footer>
    </aside>
  )
}

function InspectorSection({
  title,
  children
}: {
  title: string
  children: ComponentChildren
}) {
  return (
    <section class="mb-3">
      <h4 class="mb-2 text-[10px] font-bold uppercase tracking-wide text-gray-400">
        {title}
      </h4>
      {children}
    </section>
  )
}

function InspectorMetric({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div class="rounded-lg border border-[#e5e7eb] bg-gray-50 px-2 py-2">
      <p class="text-[9px] font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p class="mt-1 truncate text-xs font-bold text-gray-900">
        {value}
      </p>
    </div>
  )
}

function InspectorRow({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div class="flex items-center justify-between gap-3 rounded-lg border border-[#e5e7eb] bg-white px-2 py-1.5">
      <span class="text-[11px] font-semibold text-gray-500">
        {label}
      </span>
      <span class="min-w-0 truncate text-right text-[11px] font-bold text-gray-900">
        {value}
      </span>
    </div>
  )
}

function countCustomRules(node: FigmaSerializedNode): number {
  const count = (node.responsive?.nodeRule?.enabled === true ? 1 : 0) + node.children.reduce((total, child) => {
    return total + countCustomRules(child)
  }, 0)

  return count
}

function formatConversionDirection(direction: EffectiveLayoutRules["conversionDirection"]): string {
  return direction === "row-to-column" ? "Row > Column" : "Column > Row"
}

function getResponsiveNodeHeight(
  node: FigmaSerializedNode,
  layoutRules: LayoutRulesState,
  reviewWidth: number
): number {
  if (node.children.length === 0) {
    return node.geometry.height
  }

  const arrangedChildren = arrangeResponsiveChildren(node, layoutRules, reviewWidth)
  const childrenBottom = arrangedChildren.reduce((bottom, child) => {
    return Math.max(
      bottom,
      child.node.geometry.y + getResponsiveNodeHeight(child.node, layoutRules, reviewWidth)
    )
  }, 0)
  const padding = node.layout.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  if (getNodeAxisSizing(node, "vertical") === "HUG") {
    return Math.max(1, childrenBottom + padding.bottom)
  }

  return Math.max(node.geometry.height, childrenBottom)
}

function createExportReviewGroups(frame: FigmaSerializedFrame, reviewWidth: number, layoutRules: LayoutRulesState): Array<{
  node: FigmaSerializedNode
  x: number
  y: number
  width: number
  height: number
  sourceBounds: NodeBounds
  scale: number
}> {
  const outerPadding = layoutRules.outputPadding
  const contentWidth = Math.max(1, reviewWidth - outerPadding * 2)
  const visibleChildren = frame.children
    .filter((child) => child.visible)
    .sort((first, second) => first.geometry.y - second.geometry.y || first.geometry.x - second.geometry.x)

  let nextY = outerPadding

  return visibleChildren.map((child) => {
    const sourceBounds = child.geometry
    const scale = contentWidth / Math.max(sourceBounds.width, 1)
    const height = Math.max(1, getResponsiveNodeHeight(child, layoutRules, reviewWidth) * scale)
    const group = {
      node: child,
      x: outerPadding,
      y: nextY,
      width: contentWidth,
      height,
      sourceBounds,
      scale
    }

    nextY += height + layoutRules.stackGap

    return group
  })
}

function arrangeResponsiveChildren(
  node: FigmaSerializedNode,
  layoutRules: LayoutRulesState,
  reviewWidth: number
): Array<{
  node: FigmaSerializedNode
}> {
  const effectiveRules = getEffectiveLayoutRules(node, layoutRules)
  const convertedLayoutMode = getConvertedLayoutMode(node, effectiveRules, reviewWidth)
  const activeLayoutMode = convertedLayoutMode ?? getNativeLayoutMode(node)
  const activeRules = convertedLayoutMode == null
    ? getNativeLayoutRules(node, effectiveRules)
    : effectiveRules

  if (activeLayoutMode == null) {
    return node.children.map((child) => ({ node: child }))
  }

  if (activeLayoutMode === "HORIZONTAL") {
    return arrangeChildrenHorizontally(node, layoutRules, activeRules, reviewWidth)
  }

  return arrangeChildrenVertically(node, layoutRules, activeRules, reviewWidth)
}

function arrangeChildrenVertically(
  node: FigmaSerializedNode,
  layoutRules: LayoutRulesState,
  effectiveRules: EffectiveLayoutRules,
  reviewWidth: number
): Array<{
  node: FigmaSerializedNode
}> {
  const padding = node.layout.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  let nextY = padding.top
  const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right)
  const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom)
  const totalGap = effectiveRules.stackGap * Math.max(0, node.children.length - 1)
  const childLayouts = node.children.map((child) => {
    const childWidth = shouldFillAxis(
      child,
      "horizontal",
      effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH"
    )
      ? contentWidth
      : Math.min(child.geometry.width, contentWidth)
    const childForWidth = {
      ...child,
      geometry: {
        ...child.geometry,
        width: childWidth
      }
    }

    return {
      child,
      childWidth,
      baseHeight: getResponsiveNodeHeight(childForWidth, layoutRules, reviewWidth),
      fillsHeight: shouldFillAxis(child, "vertical", false)
    }
  })
  const fillHeightCount = childLayouts.filter((child) => child.fillsHeight).length
  const fixedHeightTotal = childLayouts.reduce((total, child) => {
    return child.fillsHeight ? total : total + child.baseHeight
  }, 0)
  const fillHeight = fillHeightCount === 0
    ? 0
    : Math.max(1, (contentHeight - totalGap - fixedHeightTotal) / fillHeightCount)

  return childLayouts.map((childLayout) => {
    const child = childLayout.child
    const childWidth = childLayout.childWidth
    const childHeight = childLayout.fillsHeight ? fillHeight : childLayout.baseHeight
    const childX = getStackedChildX(
      effectiveRules.stackAlignment,
      padding.left,
      contentWidth,
      childWidth
    )
    const nextChild = {
      ...child,
      geometry: {
        ...child.geometry,
        x: childX,
        y: nextY,
        width: childWidth,
        height: childHeight
      }
    }

    nextY += childHeight + effectiveRules.stackGap

    return {
      node: nextChild
    }
  })
}

function arrangeChildrenHorizontally(
  node: FigmaSerializedNode,
  layoutRules: LayoutRulesState,
  effectiveRules: EffectiveLayoutRules,
  reviewWidth: number
): Array<{
  node: FigmaSerializedNode
}> {
  const padding = node.layout.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  let nextX = padding.left
  const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right)
  const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom)
  const totalGap = effectiveRules.stackGap * Math.max(0, node.children.length - 1)
  const childLayouts = node.children.map((child) => ({
    child,
    fillsWidth: shouldFillAxis(child, "horizontal", false),
    childHeight: shouldFillAxis(
      child,
      "vertical",
      effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH"
    )
      ? contentHeight
      : child.geometry.height
  }))
  const fillWidthCount = childLayouts.filter((child) => child.fillsWidth).length
  const fixedWidthTotal = childLayouts.reduce((total, child) => {
    return child.fillsWidth ? total : total + child.child.geometry.width
  }, 0)
  const fillChildWidth = fillWidthCount === 0
    ? 0
    : Math.max(1, (contentWidth - totalGap - fixedWidthTotal) / fillWidthCount)

  return childLayouts.map((childLayout) => {
    const child = childLayout.child
    const childWidth = childLayout.fillsWidth ? fillChildWidth : child.geometry.width
    const childHeight = childLayout.childHeight
    const childY = getInlineChildY(
      effectiveRules.stackAlignment,
      padding.top,
      contentHeight,
      childHeight
    )
    const nextChild = {
      ...child,
      geometry: {
        ...child.geometry,
        x: nextX,
        y: childY,
        width: childWidth,
        height: childHeight
      }
    }

    nextX += childWidth + effectiveRules.stackGap

    return {
      node: nextChild
    }
  })
}

function getStackedChildX(
  stackAlignment: EffectiveLayoutRules["stackAlignment"],
  paddingLeft: number,
  contentWidth: number,
  childWidth: number
): number {
  if (stackAlignment === "center") {
    return paddingLeft + Math.max(0, (contentWidth - childWidth) / 2)
  }

  return paddingLeft
}

function getInlineChildY(
  stackAlignment: EffectiveLayoutRules["stackAlignment"],
  paddingTop: number,
  contentHeight: number,
  childHeight: number
): number {
  if (stackAlignment === "center") {
    return paddingTop + Math.max(0, (contentHeight - childHeight) / 2)
  }

  return paddingTop
}

function getConvertedLayoutMode(
  node: FigmaSerializedNode,
  layoutRules: EffectiveLayoutRules,
  reviewWidth: number
): "HORIZONTAL" | "VERTICAL" | null {
  if (node.children.length < 2) {
    return null
  }

  if (layoutRules.rowToColumnMode === "always") {
    return getTargetLayoutMode(node, layoutRules)
  }

  if (layoutRules.rowToColumnMode === "never") {
    return null
  }

  const shouldConvert = layoutRules.conversionDirection === "row-to-column"
    ? reviewWidth <= layoutRules.rowToColumnBreakpoint
    : reviewWidth >= layoutRules.rowToColumnBreakpoint

  return shouldConvert ? getTargetLayoutMode(node, layoutRules) : null
}

function getTargetLayoutMode(
  node: FigmaSerializedNode,
  layoutRules: EffectiveLayoutRules
): "HORIZONTAL" | "VERTICAL" | null {
  if (layoutRules.conversionDirection === "row-to-column") {
    return node.layout.layoutMode === "HORIZONTAL" ? "VERTICAL" : null
  }

  return node.layout.layoutMode === "VERTICAL" ? "HORIZONTAL" : null
}

function getNativeLayoutMode(node: FigmaSerializedNode): "HORIZONTAL" | "VERTICAL" | null {
  if (node.layout.layoutMode === "HORIZONTAL" || node.layout.layoutMode === "VERTICAL") {
    return node.layout.layoutMode
  }

  return null
}

function getNativeLayoutRules(
  node: FigmaSerializedNode,
  fallbackRules: EffectiveLayoutRules
): EffectiveLayoutRules {
  return {
    ...fallbackRules,
    stackGap: node.layout.itemSpacing ?? fallbackRules.stackGap,
    stackAlignment: getNativeStackAlignment(node)
  }
}

function getNativeStackAlignment(
  node: FigmaSerializedNode
): EffectiveLayoutRules["stackAlignment"] {
  if (node.layout.counterAxisAlignItems === "CENTER" || node.layout.counterAxisAlignItems === "BASELINE") {
    return "center"
  }

  return "start"
}

type EffectiveLayoutRules = Omit<ResponsiveNodeRule, "enabled">
type AxisSizingMode = "FILL" | "HUG" | "FIXED" | null

function shouldFillAxis(
  node: FigmaSerializedNode,
  axis: "horizontal" | "vertical",
  defaultFill: boolean
): boolean {
  const sizingMode = getNodeAxisSizing(node, axis)

  return sizingMode === "FILL" || (sizingMode == null && defaultFill)
}

function getNodeAxisSizing(
  node: FigmaSerializedNode,
  axis: "horizontal" | "vertical"
): AxisSizingMode {
  const layoutSizing = axis === "horizontal"
    ? node.layout.layoutSizingHorizontal
    : node.layout.layoutSizingVertical

  if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
    return layoutSizing
  }

  const axisSizing = axisMatchesPrimaryAxis(node, axis)
    ? node.layout.primaryAxisSizingMode
    : node.layout.counterAxisSizingMode

  if (axisSizing === "AUTO") {
    return "HUG"
  }

  if (axisSizing === "FIXED") {
    return "FIXED"
  }

  if (axis === "horizontal" && typeof node.layout.layoutGrow === "number" && node.layout.layoutGrow > 0) {
    return "FILL"
  }

  return null
}

function axisMatchesPrimaryAxis(node: FigmaSerializedNode, axis: "horizontal" | "vertical"): boolean {
  return axis === "horizontal"
    ? node.layout.layoutMode === "HORIZONTAL"
    : node.layout.layoutMode === "VERTICAL"
}

function getEffectiveLayoutRules(
  node: FigmaSerializedNode,
  layoutRules: LayoutRulesState
): EffectiveLayoutRules {
  const nodeRule = node.responsive?.nodeRule

  if (nodeRule?.enabled === true) {
    return {
      conversionDirection: nodeRule.conversionDirection,
      rowToColumnMode: nodeRule.rowToColumnMode,
      rowToColumnBreakpoint: nodeRule.rowToColumnBreakpoint,
      stackGap: nodeRule.stackGap,
      stackAlignment: nodeRule.stackAlignment
    }
  }

  return {
    conversionDirection: layoutRules.conversionDirection,
    rowToColumnMode: layoutRules.rowToColumnMode,
    rowToColumnBreakpoint: layoutRules.rowToColumnBreakpoint,
    stackGap: layoutRules.stackGap,
    stackAlignment: layoutRules.stackAlignment
  }
}

function getResponsiveFontSize(
  fontSize: number,
  scale: number,
  layoutRules: LayoutRulesState
): number {
  const scaledSize = fontSize * scale

  if (layoutRules.textScaleMode === "preserve") {
    return Math.max(8, scaledSize)
  }

  if (layoutRules.textScaleMode === "scale") {
    return Math.max(layoutRules.minimumTextSize, scaledSize)
  }

  return Math.max(layoutRules.minimumTextSize, Math.min(fontSize, scaledSize))
}

function getDeviceLabel(targetDevice: TargetDevice): string {
  if (targetDevice === "mobile") {
    return "Mobile"
  }

  if (targetDevice === "tablet") {
    return "Tablet"
  }

  if (targetDevice === "desktop") {
    return "Desktop"
  }

  return "Custom"
}
