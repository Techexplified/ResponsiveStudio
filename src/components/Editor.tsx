import { Fragment, h } from "preact"
import { useEffect, useState } from "preact/hooks"
import type { TargetDevice } from "./ResponsiveSidebar"
import type { FigmaJsonValue, FigmaSerializedFrame, FigmaSerializedNode } from "../frameSchema"

type EditorProps = {
  frame: FigmaSerializedFrame | null
  targetDevice: TargetDevice
  screenWidth: number
  onFrameChange: (frame: FigmaSerializedFrame) => void
}

export default function Editor({
  frame,
  targetDevice,
  screenWidth,
  onFrameChange
}: EditorProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null)
  const [isExportPreviewExpanded, setIsExportPreviewExpanded] = useState(false)
  const [isJsonViewerExpanded, setIsJsonViewerExpanded] = useState(false)

  useEffect(() => {
    setSelectedNodeId(frame?.id ?? null)
  }, [frame?.id])

  if (frame == null) {
    return (
      <section class="flex min-w-0 flex-1 items-center justify-center bg-[#f6f7fb] px-8">
        <div class="max-w-sm text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white text-xl text-gray-400">
            ▭
          </div>
          <h2 class="mt-4 text-sm font-bold text-gray-900">
            No frame imported
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Import a selected Figma frame to inspect its serialized layout, styles, text, and layer tree.
          </p>
        </div>
      </section>
    )
  }

  function moveLayerToGroup(nodeId: string, groupId: string) {
    if (frame == null || nodeId === frame.id || nodeId === groupId) {
      return
    }

    const target = findNode(frame, groupId)

    if (target == null || !canAcceptDrop(target) || containsNode(findNode(frame, nodeId) ?? target, groupId)) {
      return
    }

    const movedFrame = moveNodeIntoGroup(frame, nodeId, groupId)

    if (movedFrame != null) {
      onFrameChange(normalizeVirtualGroupGeometry(movedFrame))
      setSelectedNodeId(nodeId)
    }
  }

  return (
    <section class="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_320px] bg-[#f6f7fb]">
      <div class="relative flex min-w-0 flex-col">
        <header class="flex h-16 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-6">
          <div class="min-w-0">
            <h2 class="truncate text-sm font-bold text-gray-900">
              {frame.name}
            </h2>
            <p class="mt-0.5 text-xs text-gray-500">
              {frame.type} · {Math.round(frame.geometry.width)} x {Math.round(frame.geometry.height)} px · schema v{frame.schemaVersion}
            </p>
          </div>
        </header>

        <div class={`grid min-h-0 flex-1 ${
          isExportPreviewExpanded
            ? "grid-cols-[760px_minmax(0,1fr)]"
            : "grid-cols-[48px_minmax(0,1fr)]"
        }`}>
          <ExportPreviewDrawer
            frame={frame}
            targetDevice={targetDevice}
            screenWidth={screenWidth}
            isExpanded={isExportPreviewExpanded}
            onToggle={() => setIsExportPreviewExpanded((current) => !current)}
          />

          <div class={`grid min-h-0 ${
            isJsonViewerExpanded
              ? "grid-rows-[minmax(240px,1fr)_minmax(260px,38vh)]"
              : "grid-rows-[minmax(0,1fr)_48px]"
          }`}>
            <section class="min-h-0 overflow-auto p-6">
              <FramePreview
                frame={frame}
                selectedNodeId={selectedNodeId}
              />
            </section>

            <JsonViewerSlider
              frame={frame}
              isExpanded={isJsonViewerExpanded}
              onToggle={() => setIsJsonViewerExpanded((current) => !current)}
            />
          </div>
        </div>
      </div>

      <aside class="min-h-0 border-l border-[#e5e7eb] bg-white">
        <div class="border-b border-[#e5e7eb] px-4 py-3">
          <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">
            Layers
          </h3>
        </div>

        <LayerTools
          frame={frame}
          selectedNodeId={selectedNodeId}
          onSelect={setSelectedNodeId}
          onFrameChange={onFrameChange}
        />

        <div class="max-h-full overflow-auto p-3">
          <LayerNode
            node={frame}
            depth={0}
            selectedNodeId={selectedNodeId}
            draggedNodeId={draggedNodeId}
            onSelect={setSelectedNodeId}
            onDragStart={setDraggedNodeId}
            onDragEnd={() => setDraggedNodeId(null)}
            onMove={moveLayerToGroup}
          />
        </div>
      </aside>
    </section>
  )
}

function ExportPreviewDrawer({
  frame,
  targetDevice,
  screenWidth,
  isExpanded,
  onToggle
}: {
  frame: FigmaSerializedFrame
  targetDevice: TargetDevice
  screenWidth: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <aside class="min-h-0 border-r border-[#e5e7eb] bg-white">
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
          <span class="[writing-mode:vertical-rl] rotate-180 text-xs font-bold uppercase tracking-wide text-gray-500">
            Export Preview
          </span>
        )}

        {isExpanded && (
          <span class="text-xs font-semibold text-[#5b35f5]">
            Collapse
          </span>
        )}
      </button>

      {isExpanded && (
        <div class="h-[calc(100%-48px)] min-h-0">
          <ReviewPanel
            frame={frame}
            targetDevice={targetDevice}
            screenWidth={screenWidth}
          />
        </div>
      )}
    </aside>
  )
}

function JsonViewerSlider({
  frame,
  isExpanded,
  onToggle
}: {
  frame: FigmaSerializedFrame
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <section class="min-h-0 border-t border-[#e5e7eb] bg-[#111827]">
      <button
        type="button"
        onClick={onToggle}
        class="flex h-12 w-full items-center justify-between px-6 text-left transition hover:bg-white/5"
      >
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wide text-gray-300">
            JSON Viewer
          </h3>
          <p class="mt-0.5 text-[11px] text-gray-400">
            {frame.children.length} root children
          </p>
        </div>

        <span class="text-xs font-semibold text-[#a99cff]">
          {isExpanded ? "Collapse" : "Expand"}
        </span>
      </button>

      {isExpanded && (
        <div class="h-[calc(100%-48px)] min-h-0">
          <JsonPreviewPanel frame={frame} />
        </div>
      )}
    </section>
  )
}

function FramePreview({
  frame,
  selectedNodeId
}: {
  frame: FigmaSerializedFrame
  selectedNodeId: string | null
}) {
  const backgroundColor = getSolidFillColor(frame.style.fills) ?? "#ffffff"
  const isSelected = selectedNodeId === frame.id
  const previewWidth = 720
  const scale = Math.min(
    1,
    previewWidth / Math.max(frame.geometry.width, 1),
    560 / Math.max(frame.geometry.height, 1)
  )

  return (
    <div class="flex min-h-full items-start justify-center">
      <div
        class="relative overflow-hidden rounded border border-[#d1d5db] shadow-sm"
        style={{
          width: `${frame.geometry.width * scale}px`,
          height: `${frame.geometry.height * scale}px`,
          backgroundColor,
          outline: isSelected ? "2px solid #5b35f5" : undefined,
          outlineOffset: isSelected ? "-2px" : undefined
        }}
      >
        {frame.children.map((child) => (
          <PreviewNode
            key={child.id}
            node={child}
            scale={scale}
            selectedNodeId={selectedNodeId}
          />
        ))}
      </div>
    </div>
  )
}

function ReviewPanel({
  frame,
  targetDevice,
  screenWidth
}: {
  frame: FigmaSerializedFrame
  targetDevice: TargetDevice
  screenWidth: number
}) {
  const reviewWidth = Number.isFinite(screenWidth) && screenWidth > 0
    ? screenWidth
    : frame.geometry.width
  const backgroundColor = getSolidFillColor(frame.style.fills) ?? "#ffffff"
  const previewMaxWidth = targetDevice === "desktop" ? 260 : targetDevice === "tablet" ? 230 : 180
  const canvasScale = Math.min(
    1,
    previewMaxWidth / Math.max(reviewWidth, 1),
    520 / Math.max(frame.geometry.height, 1)
  )
  const exportGroups = createExportReviewGroups(frame, reviewWidth)
  const reviewHeight = Math.max(
    Math.min(frame.geometry.height, 760),
    exportGroups.reduce((bottom, group) => Math.max(bottom, group.y + group.height), 0) + 24
  )

  return (
    <section class="flex h-full min-h-0 flex-col bg-[#fbfbfd]">
      <header class="flex h-12 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-5">
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">
            Preview & Result
          </h3>
          <p class="mt-0.5 text-[11px] text-gray-500">
            Original and generated export preview
          </p>
        </div>

        <div class="rounded-lg border border-[#e5e7eb] bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
          Live preview
        </div>
      </header>

      <div class="min-h-0 flex-1 overflow-auto p-5">
        <div class="grid min-h-full grid-cols-[minmax(0,1fr)_40px_minmax(190px,240px)] items-start gap-4">
          <div class="min-w-0">
            <div class="mb-3 flex items-end justify-between gap-3">
              <div>
                <h4 class="text-xs font-bold text-gray-900">
                  Original
                </h4>
                <p class="mt-0.5 text-[11px] text-gray-500">
                  {Math.round(frame.geometry.width)} x {Math.round(frame.geometry.height)}
                </p>
              </div>
            </div>

            <StaticFramePreview
              frame={frame}
              maxWidth={430}
              maxHeight={520}
            />
          </div>

          <div class="flex h-[420px] items-center justify-center text-2xl font-bold text-[#5b35f5]">
            →
          </div>

          <div class="min-w-0">
            <div class="mb-3 flex items-end justify-between gap-3">
              <div>
                <h4 class="text-xs font-bold text-gray-900">
                  Generated
                </h4>
                <p class="mt-0.5 text-[11px] text-gray-500">
                  {getDeviceLabel(targetDevice)} · {Math.round(reviewWidth)}px
                </p>
              </div>
            </div>

            <div class="flex justify-center">
              <div
                class="relative overflow-hidden rounded border border-[#d1d5db] bg-white shadow-sm"
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
                      bounds={group.sourceBounds}
                      scale={group.scale * canvasScale}
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

function StaticFramePreview({
  frame,
  maxWidth,
  maxHeight
}: {
  frame: FigmaSerializedFrame
  maxWidth: number
  maxHeight: number
}) {
  const backgroundColor = getSolidFillColor(frame.style.fills) ?? "#ffffff"
  const scale = Math.min(
    1,
    maxWidth / Math.max(frame.geometry.width, 1),
    maxHeight / Math.max(frame.geometry.height, 1)
  )

  return (
    <div class="flex justify-center">
      <div
        class="relative overflow-hidden rounded border border-[#d1d5db] bg-white shadow-sm"
        style={{
          width: `${frame.geometry.width * scale}px`,
          height: `${frame.geometry.height * scale}px`,
          backgroundColor
        }}
      >
        {frame.children.map((child) => (
          <PreviewNode
            key={child.id}
            node={child}
            scale={scale}
            selectedNodeId={null}
          />
        ))}
      </div>
    </div>
  )
}

function JsonPreviewPanel({ frame }: { frame: FigmaSerializedFrame }) {
  const json = JSON.stringify(frame, null, 2)

  return (
    <section class="flex h-full min-h-0 flex-col bg-[#111827]">
      <header class="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-6">
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wide text-gray-300">
            Frame JSON
          </h3>
          <p class="mt-0.5 text-[11px] text-gray-400">
            {frame.children.length} root children
          </p>
        </div>
      </header>

      <pre class="min-h-0 flex-1 overflow-auto p-4 text-xs leading-5 text-gray-100">
        {json}
      </pre>
    </section>
  )
}

function ResponsiveReviewNode({
  node,
  bounds,
  scale
}: {
  node: FigmaSerializedNode
  bounds: Pick<FigmaSerializedNode["geometry"], "x" | "y" | "width" | "height">
  scale: number
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
            bounds={bounds}
            scale={scale}
          />
        ))}
      </Fragment>
    )
  }

  const backgroundColor = getSolidFillColor(node.style.fills)
  const borderColor = getSolidFillColor(node.style.strokes)
  const borderWidth = borderColor == null
    ? 0
    : Math.max(1, (node.style.strokeWeight ?? 1) * scale)

  return (
    <div
      class="absolute overflow-hidden"
      title={node.name}
      style={{
        left: `${(node.geometry.x - bounds.x) * scale}px`,
        top: `${(node.geometry.y - bounds.y) * scale}px`,
        width: `${node.geometry.width * scale}px`,
        height: `${node.geometry.height * scale}px`,
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
          class="h-full w-full overflow-hidden px-1 py-0.5 text-[10px] leading-tight text-gray-800"
          style={{
            fontSize: typeof node.text.fontSize === "number"
              ? `${Math.max(8, node.text.fontSize * scale)}px`
              : undefined
          }}
        >
          {node.text.characters}
        </div>
      )}

      {node.children.map((child) => (
        <ResponsiveReviewNode
          key={child.id}
          node={child}
          bounds={bounds}
          scale={scale}
        />
      ))}
    </div>
  )
}

function createExportReviewGroups(frame: FigmaSerializedFrame, reviewWidth: number): Array<{
  node: FigmaSerializedNode
  x: number
  y: number
  width: number
  height: number
  sourceBounds: Pick<FigmaSerializedNode["geometry"], "x" | "y" | "width" | "height">
  scale: number
}> {
  const outerPadding = reviewWidth < 480 ? 16 : 24
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
    const height = Math.max(1, sourceBounds.height * scale)
    const group = {
      node: child,
      x: outerPadding,
      y: nextY,
      width: contentWidth,
      height,
      sourceBounds,
      scale
    }

    nextY += height + 16

    return group
  })
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

function PreviewNode({
  node,
  scale,
  selectedNodeId
}: {
  node: FigmaSerializedNode
  scale: number
  selectedNodeId: string | null
}) {
  if (!node.visible) {
    return null
  }

  if (isVirtualGroup(node)) {
    const isSelected = selectedNodeId === node.id
    const box = getChildrenBounds(node.children)

    return (
      <Fragment>
        {isSelected && box != null && (
          <div
            class="pointer-events-none absolute"
            title={node.name}
            style={{
              left: `${box.x * scale}px`,
              top: `${box.y * scale}px`,
              width: `${box.width * scale}px`,
              height: `${box.height * scale}px`,
              outline: "2px solid #5b35f5",
              outlineOffset: "-2px"
            }}
          />
        )}

        {node.children.map((child) => (
          <PreviewNode
            key={child.id}
            node={child}
            scale={scale}
            selectedNodeId={selectedNodeId}
          />
        ))}
      </Fragment>
    )
  }

  const backgroundColor = getSolidFillColor(node.style.fills)
  const borderColor = getSolidFillColor(node.style.strokes)
  const borderWidth = borderColor == null
    ? 0
    : Math.max(1, (node.style.strokeWeight ?? 1) * scale)
  const isSelected = selectedNodeId === node.id

  return (
    <div
      class="absolute overflow-hidden"
      title={node.name}
      style={{
        left: `${node.geometry.x * scale}px`,
        top: `${node.geometry.y * scale}px`,
        width: `${node.geometry.width * scale}px`,
        height: `${node.geometry.height * scale}px`,
        opacity: node.style.opacity,
        backgroundColor,
        borderColor,
        borderStyle: borderColor == null ? undefined : "solid",
        borderWidth: `${borderWidth}px`,
        borderRadius: getCornerRadius(node.style.cornerRadius, scale),
        outline: isSelected ? "2px solid #5b35f5" : undefined,
        outlineOffset: isSelected ? "-2px" : undefined
      }}
    >
      {node.text != null && (
        <div
          class="h-full w-full overflow-hidden px-1 py-0.5 text-[10px] leading-tight text-gray-800"
          style={{
            fontSize: typeof node.text.fontSize === "number"
              ? `${Math.max(8, node.text.fontSize * scale)}px`
              : undefined
          }}
        >
          {node.text.characters}
        </div>
      )}

      {node.children.map((child) => (
        <PreviewNode
          key={child.id}
          node={child}
          scale={scale}
          selectedNodeId={selectedNodeId}
        />
      ))}
    </div>
  )
}

function LayerTools({
  frame,
  selectedNodeId,
  onSelect,
  onFrameChange
}: {
  frame: FigmaSerializedFrame
  selectedNodeId: string | null
  onSelect: (nodeId: string) => void
  onFrameChange: (frame: FigmaSerializedFrame) => void
}) {
  const selectedNode = selectedNodeId == null ? null : findNode(frame, selectedNodeId)
  const autoLayoutNodes = countAutoLayoutNodes(frame)

  function addGroup() {
    const group = createVirtualGroup()
    const parentId = selectedNode != null && isVirtualGroup(selectedNode)
      ? selectedNode.id
      : frame.id

    onFrameChange(
      normalizeVirtualGroupGeometry(
        updateNode(frame, parentId, (node) => ({
          ...node,
          children: [...node.children, group]
        }))
      )
    )
    onSelect(group.id)
  }

  return (
    <div class="border-b border-[#e5e7eb] p-3">
      <div class="rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2">
        <p class="text-xs font-semibold text-gray-700">
          Auto Layout ready
        </p>
        <p class="mt-0.5 text-xs text-gray-500">
          {autoLayoutNodes} layout containers in this import
        </p>
      </div>

      <div class="mt-3">
        <button
          type="button"
          onClick={addGroup}
          class="w-full rounded-lg border border-[#e5e7eb] bg-white px-2 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Add responsive group
        </button>
      </div>
    </div>
  )
}

function LayerNode({
  node,
  depth,
  selectedNodeId,
  draggedNodeId,
  onSelect,
  onDragStart,
  onDragEnd,
  onMove
}: {
  node: FigmaSerializedNode
  depth: number
  selectedNodeId: string | null
  draggedNodeId: string | null
  onSelect: (nodeId: string) => void
  onDragStart: (nodeId: string) => void
  onDragEnd: () => void
  onMove: (nodeId: string, groupId: string) => void
}) {
  const isSelected = selectedNodeId === node.id
  const isDragging = draggedNodeId === node.id
  const acceptsDrop = draggedNodeId != null && draggedNodeId !== node.id && canAcceptDrop(node) && !containsNode(node, draggedNodeId)
  const kind = getLayerKind(node)

  return (
    <div>
      <button
        type="button"
        draggable={depth > 0}
        onClick={() => onSelect(node.id)}
        onDragStart={(event) => {
          event.dataTransfer?.setData("text/plain", node.id)
          onDragStart(node.id)
        }}
        onDragEnd={onDragEnd}
        onDragOver={(event) => {
          if (acceptsDrop) {
            event.preventDefault()
          }
        }}
        onDrop={(event) => {
          const droppedNodeId = event.dataTransfer?.getData("text/plain") || draggedNodeId

          if (droppedNodeId != null && acceptsDrop) {
            event.preventDefault()
            onMove(droppedNodeId, node.id)
          }
        }}
        class={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition ${
          isSelected
            ? "bg-[#f3f0ff] text-[#5b35f5]"
            : acceptsDrop
              ? "bg-green-50 text-gray-800 outline outline-1 outline-green-200"
              : isDragging
                ? "opacity-50"
                : "text-gray-800 hover:bg-gray-50"
        }`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        <span
          class={`h-1.5 w-1.5 shrink-0 rounded-full ${
            isSelected
              ? "bg-[#5b35f5]"
              : canAcceptDrop(node)
                ? "bg-green-500"
                : "bg-gray-300"
          }`}
        />
        <span class="min-w-0 flex-1 truncate font-semibold">
          {node.name}
        </span>
        <span
          class={`shrink-0 text-[10px] font-semibold ${
            isSelected ? "text-[#5b35f5]" : "text-gray-400"
          }`}
        >
          {kind}
        </span>
      </button>

      {node.children.map((child) => (
        <LayerNode
          key={child.id}
          node={child}
          depth={depth + 1}
          selectedNodeId={selectedNodeId}
          draggedNodeId={draggedNodeId}
          onSelect={onSelect}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onMove={onMove}
        />
      ))}
    </div>
  )
}

function createVirtualGroup(): FigmaSerializedNode {
  const id = `responsive-group-${Date.now()}-${Math.round(Math.random() * 100000)}`

  return {
    id,
    name: "Responsive group",
    type: "RESPONSIVE_GROUP",
    responsive: {
      isVirtualGroup: true,
      groupRole: "group",
      conversionRole: "responsive-group",
      acceptsChildren: true,
      createdByUser: true
    },
    visible: true,
    locked: false,
    geometry: createEditorGeometry(0, 0, 0, 0),
    layout: {
      isAutoLayout: true,
      layoutMode: "VERTICAL",
      itemSpacing: 0,
      primaryAxisSizingMode: "AUTO",
      counterAxisSizingMode: "AUTO"
    },
    style: {},
    children: []
  }
}

function isVirtualGroup(node: FigmaSerializedNode): boolean {
  return node.responsive?.isVirtualGroup === true || node.type === "RESPONSIVE_GROUP"
}

function canAcceptDrop(node: FigmaSerializedNode): boolean {
  return isVirtualGroup(node) || node.responsive?.groupRole === "root"
}

function getLayerKind(node: FigmaSerializedNode): string {
  if (isVirtualGroup(node)) {
    return "GROUP"
  }

  if (node.layout.isAutoLayout) {
    return "AUTO"
  }

  return node.type
}

function countAutoLayoutNodes(node: FigmaSerializedNode): number {
  return (node.layout.isAutoLayout ? 1 : 0) + node.children.reduce((total, child) => {
    return total + countAutoLayoutNodes(child)
  }, 0)
}

function findNode(node: FigmaSerializedNode, nodeId: string): FigmaSerializedNode | null {
  if (node.id === nodeId) {
    return node
  }

  for (const child of node.children) {
    const match = findNode(child, nodeId)

    if (match != null) {
      return match
    }
  }

  return null
}

function containsNode(node: FigmaSerializedNode, nodeId: string): boolean {
  return node.children.some((child) => child.id === nodeId || containsNode(child, nodeId))
}

function findParentId(node: FigmaSerializedNode, nodeId: string): string | null {
  for (const child of node.children) {
    if (child.id === nodeId) {
      return node.id
    }

    const parentId = findParentId(child, nodeId)

    if (parentId != null) {
      return parentId
    }
  }

  return null
}

function updateNode<T extends FigmaSerializedNode>(
  node: T,
  nodeId: string,
  updater: (node: FigmaSerializedNode) => FigmaSerializedNode
): T {
  if (node.id === nodeId) {
    return updater(node) as T
  }

  return {
    ...node,
    children: node.children.map((child) => updateNode(child, nodeId, updater))
  }
}

function collectVirtualGroups(node: FigmaSerializedNode): FigmaSerializedNode[] {
  return [
    ...(isVirtualGroup(node) ? [node] : []),
    ...node.children.flatMap((child) => collectVirtualGroups(child))
  ]
}

function moveNodeIntoGroup(
  frame: FigmaSerializedFrame,
  nodeId: string,
  groupId: string
): FigmaSerializedFrame | null {
  const result = removeNode(frame, nodeId)

  if (result == null) {
    return null
  }

  return updateNode(result.frame, groupId, (group) => ({
    ...group,
    children: [...group.children, result.node]
  }))
}

function removeNode(
  node: FigmaSerializedFrame,
  nodeId: string
): { frame: FigmaSerializedFrame; node: FigmaSerializedNode } | null
function removeNode(
  node: FigmaSerializedNode,
  nodeId: string
): { frame: FigmaSerializedNode; node: FigmaSerializedNode } | null
function removeNode(
  node: FigmaSerializedNode,
  nodeId: string
): { frame: FigmaSerializedNode; node: FigmaSerializedNode } | null {
  for (const child of node.children) {
    if (child.id === nodeId) {
      return {
        frame: {
          ...node,
          children: node.children.filter((candidate) => candidate.id !== nodeId)
        },
        node: child
      }
    }
  }

  for (const child of node.children) {
    const result = removeNode(child, nodeId)

    if (result != null) {
      return {
        frame: {
          ...node,
          children: node.children.map((candidate) =>
            candidate.id === child.id ? result.frame : candidate
          )
        },
        node: result.node
      }
    }
  }

  return null
}

function normalizeVirtualGroupGeometry<T extends FigmaSerializedNode>(node: T): T {
  const children = node.children.map((child) => normalizeVirtualGroupGeometry(child))
  const nextNode = {
    ...node,
    children
  }

  if (!isVirtualGroup(nextNode)) {
    return nextNode
  }

  const bounds = getChildrenBounds(children)

  return {
    ...nextNode,
    geometry: createEditorGeometry(
      bounds?.x ?? 0,
      bounds?.y ?? 0,
      bounds?.width ?? 0,
      bounds?.height ?? 0,
      nextNode.geometry
    )
  }
}

function getChildrenBounds(children: FigmaSerializedNode[]): Pick<FigmaSerializedNode["geometry"], "x" | "y" | "width" | "height"> | null {
  if (children.length === 0) {
    return null
  }

  const boxes = children.map((child) => child.geometry)
  const minX = Math.min(...boxes.map((box) => box.x))
  const minY = Math.min(...boxes.map((box) => box.y))
  const maxX = Math.max(...boxes.map((box) => box.x + box.width))
  const maxY = Math.max(...boxes.map((box) => box.y + box.height))

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  }
}

function createEditorGeometry(
  x: number,
  y: number,
  width: number,
  height: number,
  existing?: FigmaSerializedNode["geometry"]
): FigmaSerializedNode["geometry"] {
  const bounds = createEditorBounds(x, y, width, height)

  return {
    x,
    y,
    width,
    height,
    rotation: existing?.rotation ?? 0,
    absoluteBounds: bounds,
    parentRelativeBounds: bounds,
    rootRelativeBounds: bounds,
    percentOfParent: existing?.percentOfParent,
    percentOfRoot: existing?.percentOfRoot ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      right: 0,
      bottom: 0
    },
    hierarchy: existing?.hierarchy ?? {
      parentId: null,
      depth: 0,
      siblingIndex: 0,
      siblingCount: 1
    }
  }
}

function createEditorBounds(
  x: number,
  y: number,
  width: number,
  height: number
): FigmaSerializedNode["geometry"]["absoluteBounds"] {
  return {
    x,
    y,
    width,
    height,
    right: x + width,
    bottom: y + height,
    centerX: x + width / 2,
    centerY: y + height / 2
  }
}

function JsonPanel({ frame }: { frame: FigmaSerializedFrame }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const json = JSON.stringify(frame, null, 2)

  return (
    <section
      class={`border-t border-[#e5e7eb] bg-[#111827] ${
        isExpanded ? "absolute inset-0 z-20 flex flex-col" : "h-12 shrink-0"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsExpanded((current) => !current)}
        class="flex h-12 w-full items-center justify-between border-b border-white/10 px-4 text-left"
      >
        <h3 class="text-xs font-bold uppercase tracking-wide text-gray-300">
          Frame JSON
        </h3>

        <span class="text-xs font-semibold text-gray-400">
          {isExpanded ? "Collapse" : `${frame.children.length} root children · Expand`}
        </span>
      </button>

      {isExpanded && (
        <pre class="min-h-0 flex-1 overflow-auto p-4 text-xs leading-5 text-gray-100">
          {json}
        </pre>
      )}
    </section>
  )
}

function getSolidFillColor(value: FigmaJsonValue | undefined): string | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }

  const paint = value.find((entry) => {
    return isJsonObject(entry) && entry.type === "SOLID" && entry.visible !== false
  })

  if (!isJsonObject(paint) || !isJsonObject(paint.color)) {
    return undefined
  }

  const opacity = typeof paint.opacity === "number" ? paint.opacity : 1
  const red = toCssColorChannel(paint.color.r)
  const green = toCssColorChannel(paint.color.g)
  const blue = toCssColorChannel(paint.color.b)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

function getCornerRadius(value: number | string | undefined, scale: number): string | undefined {
  return typeof value === "number" ? `${value * scale}px` : undefined
}

function toCssColorChannel(value: FigmaJsonValue | undefined): number {
  return typeof value === "number" ? Math.round(value * 255) : 0
}

function isJsonObject(value: FigmaJsonValue | undefined): value is { [key: string]: FigmaJsonValue } {
  return value != null && !Array.isArray(value) && typeof value === "object"
}
