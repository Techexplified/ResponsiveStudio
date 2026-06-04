import { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import FlexLayoutPanel from "./FlexLayoutPanel"
import type { FigmaSerializedFrame, FigmaSerializedNode } from "../frameSchema"
import {
  canAcceptDrop,
  containsNode,
  applyFlexLayoutToNode,
  countAutoLayoutNodes,
  createVirtualGroup,
  findNode,
  findParentNode,
  getLayerKind,
  isVirtualGroup,
  moveNodeIntoGroup,
  normalizeVirtualGroupGeometry,
  updateNode
} from "./editorModel"

type LayerPanelProps = {
  frame: FigmaSerializedFrame
  selectedNodeId: string | null
  onSelect: (nodeId: string) => void
  onFrameChange: (frame: FigmaSerializedFrame) => void
}

export default function LayerPanel({
  frame,
  selectedNodeId,
  onSelect,
  onFrameChange
}: LayerPanelProps) {
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null)
  const [isLayoutPanelOpen, setIsLayoutPanelOpen] = useState(true)
  const selectedNode = selectedNodeId == null ? null : findNode(frame, selectedNodeId)

  useEffect(() => {
    if (selectedNodeId != null) {
      setIsLayoutPanelOpen(true)
    }
  }, [selectedNodeId])

  function moveLayerToGroup(nodeId: string, groupId: string) {
    if (nodeId === frame.id || nodeId === groupId) {
      return
    }

    const target = findNode(frame, groupId)

    if (target == null || !canAcceptDrop(target) || containsNode(findNode(frame, nodeId) ?? target, groupId)) {
      return
    }

    const movedFrame = moveNodeIntoGroup(frame, nodeId, groupId)

    if (movedFrame != null) {
      onFrameChange(normalizeVirtualGroupGeometry(movedFrame))
      onSelect(nodeId)
    }
  }

  return (
    <aside class="flex min-h-0 flex-col border-l border-[#e5e7eb] bg-white">
      <div class="border-b border-[#e5e7eb] px-4 py-3">
        <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">
          Layers
        </h3>
      </div>

      <LayerTools
        frame={frame}
        selectedNodeId={selectedNodeId}
        onSelect={onSelect}
        onFrameChange={onFrameChange}
      />

      <div class="min-h-0 flex-1 overflow-auto p-3">
        <LayerNode
          node={frame}
          depth={0}
          selectedNodeId={selectedNodeId}
          draggedNodeId={draggedNodeId}
          onSelect={onSelect}
          onDragStart={setDraggedNodeId}
          onDragEnd={() => setDraggedNodeId(null)}
          onMove={moveLayerToGroup}
        />
      </div>

      {selectedNode != null && (
        <div class="shrink-0 border-t border-[#e5e7eb] bg-white">
          <button
            type="button"
            onClick={() => setIsLayoutPanelOpen((current) => !current)}
            class="flex h-11 w-full items-center justify-between px-3 text-left transition hover:bg-gray-50"
          >
            <div class="min-w-0">
              <p class="text-xs font-bold uppercase tracking-wide text-gray-500">
                Layout
              </p>
              <p class="truncate text-[11px] font-semibold text-gray-900">
                {selectedNode.name}
              </p>
            </div>

            <span class="shrink-0 text-xs font-semibold text-[#0f766e]">
              {isLayoutPanelOpen ? "Hide" : "Edit"}
            </span>
          </button>

          {isLayoutPanelOpen && (
            <div class="max-h-[45vh] overflow-auto">
              <FlexLayoutPanel
                node={selectedNode}
                onChange={(nextNode) => {
                  const laidOutNode = applyFlexLayoutToNode(nextNode)
                  const frameWithUpdatedNode = updateNode(frame, laidOutNode.id, () => laidOutNode)
                  const parentNode = findParentNode(frameWithUpdatedNode, laidOutNode.id)
                  const frameWithParentLayout = parentNode == null
                    ? frameWithUpdatedNode
                    : updateNode(frameWithUpdatedNode, parentNode.id, (node) => applyFlexLayoutToNode(node))

                  onFrameChange(
                    normalizeVirtualGroupGeometry(
                      frameWithParentLayout
                    )
                  )
                }}
              />
            </div>
          )}
        </div>
      )}
    </aside>
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
        class={`flex w-full items-center gap-2 rounded py-1.5 pr-2 pl-[var(--layer-indent)] text-left text-xs transition ${
          isSelected
            ? "bg-[#fbbf24] text-[#111827]"
            : acceptsDrop
              ? "bg-green-50 text-gray-800 outline outline-1 outline-green-200"
              : isDragging
                ? "opacity-50"
                : "text-gray-800 hover:bg-gray-50"
        }`}
        style={{ "--layer-indent": `${8 + depth * 18}px` }}
      >
        <span
          class={`h-1.5 w-1.5 shrink-0 rounded-full ${
            isSelected
              ? "bg-[#111827]"
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
            isSelected ? "text-[#111827]" : "text-gray-400"
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
