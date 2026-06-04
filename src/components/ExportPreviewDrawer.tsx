import { Fragment, h } from "preact"
import type { LayoutRulesState } from "./LayoutRules"
import type { TargetDevice } from "./ResponsiveSidebar"
import type { FigmaSerializedFrame, FigmaSerializedNode } from "../frameSchema"
import {
  getChildrenBounds,
  getCornerRadius,
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
  targetDevice: TargetDevice
  screenWidth: number
  layoutRules: LayoutRulesState
  isExpanded: boolean
  onToggle: () => void
}

export default function ExportPreviewDrawer({
  frame,
  targetDevice,
  screenWidth,
  layoutRules,
  isExpanded,
  onToggle
}: ExportPreviewDrawerProps) {
  return (
    <aside
      class={`absolute bottom-12 right-0 top-0 z-10 min-h-0 border-l border-[#e5e7eb] bg-white shadow-xl transition-[width] ${
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
        <div class="h-[calc(100%-48px)] min-h-0">
          <GeneratedPreview
            frame={frame}
            targetDevice={targetDevice}
            screenWidth={screenWidth}
            layoutRules={layoutRules}
          />
        </div>
      )}
    </aside>
  )
}

function GeneratedPreview({
  frame,
  targetDevice,
  screenWidth,
  layoutRules
}: {
  frame: FigmaSerializedFrame
  targetDevice: TargetDevice
  screenWidth: number
  layoutRules: LayoutRulesState
}) {
  const reviewWidth = Number.isFinite(screenWidth) && screenWidth > 0
    ? screenWidth
    : frame.geometry.width
  const backgroundColor = getSolidFillColor(frame.style.fills) ?? "#ffffff"
  const previewMaxWidth = targetDevice === "desktop" ? 420 : targetDevice === "tablet" ? 360 : 280
  const canvasScale = Math.min(
    1,
    previewMaxWidth / Math.max(reviewWidth, 1),
    520 / Math.max(frame.geometry.height, 1)
  )
  const exportGroups = createExportReviewGroups(frame, reviewWidth, layoutRules)
  const reviewHeight = Math.max(
    Math.min(frame.geometry.height, 760),
    exportGroups.reduce((bottom, group) => Math.max(bottom, group.y + group.height), 0) + 24
  )

  return (
    <section class="flex h-full min-h-0 flex-col bg-[#fbfbfd]">
      <div class="min-h-0 flex-1 overflow-auto p-5">
        <div class="flex min-h-full items-start justify-center">
          <div class="min-w-0">
            <div class="mb-3 flex items-center gap-2 text-xs">
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

            <div class="flex justify-center">
              <div
                class="relative overflow-hidden rounded border border-[#d1d5db] shadow-sm"
                style={{
                  width: `${reviewWidth * canvasScale}px`,
                  height: `${reviewHeight * canvasScale}px`,
                  backgroundColor
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
  reviewWidth
}: {
  node: FigmaSerializedNode
  origin: Pick<NodeBounds, "x" | "y">
  scale: number
  layoutRules: LayoutRulesState
  reviewWidth: number
}) {
  if (!node.visible) {
    return null
  }

  if (isVirtualGroup(node)) {
    return (
      <Fragment>
        {node.children.map((child) => (
          <ResponsiveReviewNode
            key={child.id}
            node={child}
            origin={origin}
            scale={scale}
            layoutRules={layoutRules}
            reviewWidth={reviewWidth}
          />
        ))}
      </Fragment>
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
      class="absolute overflow-hidden"
      title={node.name}
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
        borderRadius: getCornerRadius(node.style.cornerRadius, scale)
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
        />
      ))}
    </div>
  )
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
    const sourceBounds = isVirtualGroup(child)
      ? getChildrenBounds(child.children) ?? child.geometry
      : child.geometry
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
  if (!shouldStackNode(node, layoutRules, reviewWidth)) {
    return node.children.map((child) => ({ node: child }))
  }

  const padding = node.layout.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  let nextY = padding.top
  const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right)

  return node.children.map((child) => {
    const childWidth = layoutRules.stackAlignment === "stretch"
      ? contentWidth
      : child.geometry.width
    const childX = getStackedChildX(
      layoutRules.stackAlignment,
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
        width: childWidth
      }
    }

    nextY += getResponsiveNodeHeight(child, layoutRules, reviewWidth) + layoutRules.stackGap

    return {
      node: nextChild
    }
  })
}

function getStackedChildX(
  stackAlignment: LayoutRulesState["stackAlignment"],
  paddingLeft: number,
  contentWidth: number,
  childWidth: number
): number {
  if (stackAlignment === "center") {
    return paddingLeft + Math.max(0, (contentWidth - childWidth) / 2)
  }

  return paddingLeft
}

function shouldStackNode(
  node: FigmaSerializedNode,
  layoutRules: LayoutRulesState,
  reviewWidth: number
): boolean {
  if (node.children.length < 2 || node.layout.layoutMode !== "HORIZONTAL") {
    return false
  }

  if (layoutRules.rowToColumnMode === "always") {
    return true
  }

  if (layoutRules.rowToColumnMode === "never") {
    return false
  }

  return reviewWidth <= layoutRules.rowToColumnBreakpoint
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
