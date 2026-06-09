import { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import FlexLayoutPanel from "./FlexLayoutPanel"
import type { LayoutRulesState } from "./LayoutRules"
import type { FigmaSerializedFrame, FigmaSerializedNode, ResponsiveNodeRule, ResponsiveReplacementRule } from "../frameSchema"
import {
  canAcceptDrop,
  containsNode,
  applyFlexLayoutToNode,
  countAutoLayoutNodes,
  createVirtualGroup,
  deleteNodeFromFrame,
  findNode,
  findParentNode,
  getLayerKind,
  isVirtualGroup,
  moveNodeIntoGroup,
  normalizeVirtualGroupGeometry,
  updateNode,
  wrapNodeInGroup
} from "./editorModel"

type LayerPanelProps = {
  frame: FigmaSerializedFrame
  selectedNodeId: string | null
  layoutRules: LayoutRulesState
  onSelect: (nodeId: string) => void
  onFrameChange: (frame: FigmaSerializedFrame) => void
}

export default function LayerPanel({
  frame,
  selectedNodeId,
  layoutRules,
  onSelect,
  onFrameChange
}: LayerPanelProps) {
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null)
  const [isLayoutPanelOpen, setIsLayoutPanelOpen] = useState(true)
  const [contextMenu, setContextMenu] = useState<LayerContextMenuState | null>(null)
  const [selectedLayerIds, setSelectedLayerIds] = useState<string[]>(
    selectedNodeId == null ? [] : [selectedNodeId]
  )
  const [lastSelectedLayerId, setLastSelectedLayerId] = useState<string | null>(selectedNodeId)
  const selectedNode = selectedNodeId == null ? null : findNode(frame, selectedNodeId)
  const selectedParentNode = selectedNodeId == null ? null : findParentNode(frame, selectedNodeId)
  const selectedParentLayoutMode = getLayoutMode(selectedParentNode)
  const visibleLayerIds = getVisibleLayerIds(frame)

  useEffect(() => {
    if (selectedNodeId != null) {
      setIsLayoutPanelOpen(true)
    }
  }, [selectedNodeId])

  useEffect(() => {
    setSelectedLayerIds((currentIds) => {
      if (selectedNodeId == null) {
        return []
      }

      if (currentIds.includes(selectedNodeId)) {
        return currentIds
      }

      return [selectedNodeId]
    })
    setLastSelectedLayerId(selectedNodeId)
  }, [selectedNodeId])

  useEffect(() => {
    if (contextMenu == null) {
      return
    }

    function closeContextMenu() {
      setContextMenu(null)
    }

    function closeContextMenuOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setContextMenu(null)
      }
    }

    window.addEventListener("click", closeContextMenu)
    window.addEventListener("keydown", closeContextMenuOnEscape)

    return () => {
      window.removeEventListener("click", closeContextMenu)
      window.removeEventListener("keydown", closeContextMenuOnEscape)
    }
  }, [contextMenu])

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

  function selectLayer(nodeId: string, event?: MouseEvent) {
    const isRangeSelection = event?.shiftKey === true && lastSelectedLayerId != null
    const isToggleSelection = event?.metaKey === true || event?.ctrlKey === true

    if (isRangeSelection) {
      const rangeIds = getLayerRange(visibleLayerIds, lastSelectedLayerId, nodeId)
      const nextIds = isToggleSelection
        ? mergeUniqueIds(selectedLayerIds, rangeIds)
        : rangeIds

      setSelectedLayerIds(nextIds)
      onSelect(nodeId)
      return
    }

    if (isToggleSelection) {
      const nextIds = selectedLayerIds.includes(nodeId)
        ? selectedLayerIds.filter((id) => id !== nodeId)
        : [...selectedLayerIds, nodeId]
      const normalizedIds = nextIds.length === 0 ? [nodeId] : nextIds

      setSelectedLayerIds(normalizedIds)
      setLastSelectedLayerId(nodeId)
      onSelect(nodeId)
      return
    }

    setSelectedLayerIds([nodeId])
    setLastSelectedLayerId(nodeId)
    onSelect(nodeId)
  }

  function selectAllLayers() {
    const selectableIds = visibleLayerIds.filter((id) => id !== frame.id)

    if (selectableIds.length === 0) {
      return
    }

    setSelectedLayerIds(selectableIds)
    setLastSelectedLayerId(selectableIds[selectableIds.length - 1])
    onSelect(selectableIds[selectableIds.length - 1])
  }

  function collapseSelection() {
    if (selectedNodeId != null) {
      setSelectedLayerIds([selectedNodeId])
      setLastSelectedLayerId(selectedNodeId)
    }
  }

  function handleLayerPanelKeyDown(event: KeyboardEvent) {
    const target = event.target
    const isTextInput = target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement

    if (isTextInput) {
      return
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a") {
      event.preventDefault()
      selectAllLayers()
      return
    }

    if (event.key === "Escape" && selectedNodeId != null && selectedLayerIds.length > 1) {
      event.preventDefault()
      collapseSelection()
      return
    }

    if ((event.key === "Backspace" || event.key === "Delete") && selectedLayerIds.some((id) => id !== frame.id)) {
      event.preventDefault()
      deleteLayers(selectedLayerIds)
    }
  }

  function addGroupInside(nodeId: string) {
    const target = findNode(frame, nodeId)

    if (target == null || !canAcceptDrop(target)) {
      return
    }

    const group = createVirtualGroup()

    onFrameChange(
      normalizeVirtualGroupGeometry(
        updateNode(frame, nodeId, (node) => ({
          ...node,
          children: [...node.children, group]
        }))
      )
    )
    onSelect(group.id)
  }

  function wrapLayer(nodeId: string) {
    const wrappedFrame = wrapNodeInGroup(frame, nodeId)

    if (wrappedFrame != null) {
      onFrameChange(normalizeVirtualGroupGeometry(wrappedFrame))
      onSelect(findParentNode(wrappedFrame, nodeId)?.id ?? nodeId)
    }
  }

  function deleteLayer(nodeId: string) {
    deleteLayers([nodeId])
  }

  function deleteLayers(nodeIds: string[]) {
    const actionIds = getTopLevelSelectedIds(frame, nodeIds).filter((id) => id !== frame.id)

    if (actionIds.length === 0) {
      return
    }

    const firstParent = findParentNode(frame, actionIds[0])
    const nextFrame = actionIds.reduce<FigmaSerializedFrame | null>((currentFrame, nodeId) => {
      if (currentFrame == null) {
        return null
      }

      return deleteNodeFromFrame(currentFrame, nodeId)
    }, frame)

    if (nextFrame != null) {
      onFrameChange(normalizeVirtualGroupGeometry(nextFrame))
      setSelectedLayerIds([firstParent?.id ?? frame.id])
      onSelect(firstParent?.id ?? frame.id)
    }
  }

  function changeResponsiveRule(nodeId: string, nextRule: ResponsiveNodeRule | undefined) {
    onFrameChange(
      updateNode(frame, nodeId, (node) => {
        const responsive = {
          ...node.responsive
        }

        if (nextRule == null) {
          delete responsive.nodeRule
        } else {
          responsive.nodeRule = nextRule
        }

        return {
          ...node,
          responsive
        }
      })
    )
  }

  function changeResponsiveReplacement(nodeId: string, nextReplacement: ResponsiveReplacementRule | undefined) {
    onFrameChange(
      updateNode(frame, nodeId, (node) => {
        const responsive = {
          ...node.responsive
        }

        if (nextReplacement == null) {
          delete responsive.replacement
        } else {
          responsive.replacement = nextReplacement
        }

        return {
          ...node,
          responsive
        }
      })
    )
  }

  function openContextMenu(event: MouseEvent, nodeId: string) {
    event.preventDefault()
    event.stopPropagation()
    if (!selectedLayerIds.includes(nodeId)) {
      selectLayer(nodeId)
    }
    setContextMenu({
      nodeId,
      x: event.clientX,
      y: event.clientY
    })
  }

  return (
    <aside
      class="relative flex h-full min-h-0 flex-col overflow-hidden border-l border-[#e5e7eb] bg-white"
      tabIndex={0}
      onKeyDown={handleLayerPanelKeyDown}
    >
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

      <div class="min-h-24 flex-1 overflow-auto p-3">
        <LayerNode
          node={frame}
          depth={0}
          selectedNodeId={selectedNodeId}
          selectedLayerIds={selectedLayerIds}
          draggedNodeId={draggedNodeId}
          onSelect={selectLayer}
          onDragStart={setDraggedNodeId}
          onDragEnd={() => setDraggedNodeId(null)}
          onMove={moveLayerToGroup}
          onOpenMenu={openContextMenu}
        />
      </div>

      {contextMenu != null && (
        <LayerContextMenu
          frame={frame}
          state={contextMenu}
          selectedLayerIds={selectedLayerIds}
          onClose={() => setContextMenu(null)}
          onAddGroupInside={addGroupInside}
          onWrapLayer={wrapLayer}
          onDeleteLayers={deleteLayers}
        />
      )}

      {selectedNode != null && (
        <div class="flex max-h-[72%] shrink-0 flex-col overflow-hidden border-t border-[#e5e7eb] bg-white">
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
            <div class="min-h-0 flex-1 overflow-auto overscroll-contain pb-4">
              <FlexLayoutPanel
                node={selectedNode}
                parentLayoutMode={selectedParentLayoutMode}
                onChange={(nextNode) => {
                  const directionChanged = didLayoutDirectionChange(selectedNode, nextNode)
                  const editableNode = directionChanged
                    ? pinGeneratedLayoutDirection(nextNode, layoutRules)
                    : nextNode
                  const laidOutNode = applyFlexLayoutToNode(editableNode)
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

              <ResponsiveBehaviorPanel
                node={selectedNode}
                globalRules={layoutRules}
                onChange={(nextRule) => changeResponsiveRule(selectedNode.id, nextRule)}
                onReplacementChange={(nextReplacement) => changeResponsiveReplacement(selectedNode.id, nextReplacement)}
              />
            </div>
          )}
        </div>
      )}
    </aside>
  )
}

function getLayoutMode(node: FigmaSerializedNode | null): "HORIZONTAL" | "VERTICAL" | null {
  if (node?.layout.layoutMode === "HORIZONTAL" || node?.layout.layoutMode === "VERTICAL") {
    return node.layout.layoutMode
  }

  return null
}

function didLayoutDirectionChange(
  previousNode: FigmaSerializedNode,
  nextNode: FigmaSerializedNode
): boolean {
  return getLayoutMode(previousNode) !== getLayoutMode(nextNode) && getLayoutMode(nextNode) != null
}

function pinGeneratedLayoutDirection(
  node: FigmaSerializedNode,
  globalRules: LayoutRulesState
): FigmaSerializedNode {
  return {
    ...node,
    responsive: {
      ...node.responsive,
      nodeRule: {
        ...createResponsiveNodeRule(globalRules),
        ...node.responsive?.nodeRule,
        enabled: true,
        rowToColumnMode: "never"
      }
    }
  }
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
  selectedLayerIds,
  draggedNodeId,
  onSelect,
  onDragStart,
  onDragEnd,
  onMove,
  onOpenMenu
}: {
  node: FigmaSerializedNode
  depth: number
  selectedNodeId: string | null
  selectedLayerIds: string[]
  draggedNodeId: string | null
  onSelect: (nodeId: string, event?: MouseEvent) => void
  onDragStart: (nodeId: string) => void
  onDragEnd: () => void
  onMove: (nodeId: string, groupId: string) => void
  onOpenMenu: (event: MouseEvent, nodeId: string) => void
}) {
  const isPrimarySelected = selectedNodeId === node.id
  const isSelected = selectedLayerIds.includes(node.id)
  const isDragging = draggedNodeId === node.id
  const acceptsDrop = draggedNodeId != null && draggedNodeId !== node.id && canAcceptDrop(node) && !containsNode(node, draggedNodeId)
  const kind = getLayerKind(node)

  return (
    <div>
      <button
        type="button"
        draggable={depth > 0}
        onClick={(event) => onSelect(node.id, event)}
        onContextMenu={(event) => onOpenMenu(event, node.id)}
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
          isPrimarySelected
            ? "bg-[#fbbf24] text-[#111827]"
            : isSelected
              ? "bg-[#fef3c7] text-[#111827] outline outline-1 outline-[#f59e0b]/40"
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
            isPrimarySelected
              ? "bg-[#111827]"
              : isSelected
                ? "bg-[#d97706]"
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
        {node.responsive?.nodeRule?.enabled === true && (
          <span
            class={`shrink-0 rounded border px-1 text-[9px] font-bold ${
              isSelected
                ? "border-[#111827]/20 text-[#111827]"
                : "border-[#0f766e]/20 bg-[#ecfdf5] text-[#0f766e]"
            }`}
          >
            RULE
          </span>
        )}
      </button>

      {node.children.map((child) => (
        <LayerNode
          key={child.id}
          node={child}
          depth={depth + 1}
          selectedNodeId={selectedNodeId}
          selectedLayerIds={selectedLayerIds}
          draggedNodeId={draggedNodeId}
          onSelect={onSelect}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onMove={onMove}
          onOpenMenu={onOpenMenu}
        />
      ))}
    </div>
  )
}

type LayerContextMenuState = {
  nodeId: string
  x: number
  y: number
}

function ResponsiveBehaviorPanel({
  node,
  globalRules,
  onChange,
  onReplacementChange
}: {
  node: FigmaSerializedNode
  globalRules: LayoutRulesState
  onChange: (rule: ResponsiveNodeRule | undefined) => void
  onReplacementChange: (rule: ResponsiveReplacementRule | undefined) => void
}) {
  const isContainer = node.children.length > 0
  const currentRule = node.responsive?.nodeRule
  const currentReplacement = node.responsive?.replacement
  const isCustom = currentRule?.enabled === true
  const isReplacementEnabled = currentReplacement?.enabled === true
  const rule = currentRule ?? createResponsiveNodeRule(globalRules)
  const replacement = currentReplacement ?? createResponsiveReplacementRule(globalRules)

  function updateRule(nextRule: Partial<ResponsiveNodeRule>) {
    onChange({
      ...rule,
      enabled: true,
      ...nextRule
    })
  }

  function updateReplacement(nextRule: Partial<ResponsiveReplacementRule>) {
    onReplacementChange({
      ...replacement,
      enabled: true,
      ...nextRule
    })
  }

  return (
    <section class="border-t border-[#e5e7eb] bg-white p-3">
      <div class="mb-2 flex items-center justify-between gap-2">
        <div class="min-w-0">
          <p class="text-xs font-bold uppercase tracking-wide text-gray-500">
            Responsive
          </p>
          <p class="truncate text-[11px] font-semibold text-gray-900">
            {node.name}
          </p>
        </div>
        {isCustom && (
          <span class="shrink-0 rounded border border-[#0f766e]/20 bg-[#ecfdf5] px-1.5 py-0.5 text-[9px] font-bold text-[#0f766e]">
            CUSTOM
          </span>
        )}
      </div>

      {!isContainer ? (
        <div class="rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2 text-[11px] font-semibold text-gray-400">
          Select a container layer
        </div>
      ) : (
        <div class="space-y-2">
          <LayerSegmentedControl
            value={isCustom ? "custom" : "inherit"}
            options={[
              { value: "inherit", label: "Inherit" },
              { value: "custom", label: "Custom" }
            ]}
            onChange={(value) => {
              if (value === "inherit") {
                onChange(undefined)
                return
              }

              onChange({
                ...createResponsiveNodeRule(globalRules),
                enabled: true
              })
            }}
          />

          {isCustom && (
            <div class="space-y-2">
              <LayerSegmentedControl
                value={rule.conversionDirection}
                options={[
                  { value: "row-to-column", label: "Row > Col" },
                  { value: "column-to-row", label: "Col > Row" }
                ]}
                onChange={(conversionDirection) => updateRule({ conversionDirection })}
              />

              <LayerSegmentedControl
                value={rule.rowToColumnMode}
                options={[
                  { value: "auto", label: "Auto" },
                  { value: "always", label: "Always" },
                  { value: "never", label: "Never" }
                ]}
                onChange={(rowToColumnMode) => updateRule({ rowToColumnMode })}
              />

              <div class="grid grid-cols-2 gap-2">
                <LayerNumberField
                  label={rule.conversionDirection === "row-to-column" ? "Max width" : "Min width"}
                  value={rule.rowToColumnBreakpoint}
                  min={240}
                  max={1600}
                  onChange={(rowToColumnBreakpoint) => updateRule({ rowToColumnBreakpoint })}
                />
                <LayerNumberField
                  label="Gap"
                  value={rule.stackGap}
                  min={0}
                  max={120}
                  onChange={(stackGap) => updateRule({ stackGap })}
                />
              </div>

              <LayerSegmentedControl
                value={rule.stackAlignment}
                options={[
                  { value: "start", label: "Start" },
                  { value: "center", label: "Center" },
                  { value: "stretch", label: "Fill" }
                ]}
                onChange={(stackAlignment) => updateRule({ stackAlignment })}
              />
            </div>
          )}

          <div class="rounded-lg border border-[#e5e7eb] bg-gray-50 p-2">
            <p class="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
              Replacement
            </p>

            <LayerSegmentedControl
              value={isReplacementEnabled ? "hamburger" : "off"}
              options={[
                { value: "off", label: "Off" },
                { value: "hamburger", label: "Hamburger" }
              ]}
              onChange={(value) => {
                if (value === "off") {
                  onReplacementChange(undefined)
                  return
                }

                onReplacementChange(createResponsiveReplacementRule(globalRules))
              }}
            />

            {isReplacementEnabled && (
              <div class="mt-2 space-y-2">
                <LayerSegmentedControl
                  value={replacement.trigger}
                  options={[
                    { value: "auto", label: "Auto" },
                    { value: "always", label: "Always" },
                    { value: "never", label: "Never" }
                  ]}
                  onChange={(trigger) => updateReplacement({ trigger })}
                />

                <div class="grid grid-cols-3 gap-2">
                  <LayerNumberField
                    label="Max width"
                    value={replacement.breakpoint}
                    min={240}
                    max={1600}
                    onChange={(breakpoint) => updateReplacement({ breakpoint })}
                  />
                  <LayerNumberField
                    label="W"
                    value={replacement.width}
                    min={16}
                    max={240}
                    onChange={(width) => updateReplacement({ width })}
                  />
                  <LayerNumberField
                    label="H"
                    value={replacement.height}
                    min={16}
                    max={240}
                    onChange={(height) => updateReplacement({ height })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function createResponsiveNodeRule(globalRules: LayoutRulesState): ResponsiveNodeRule {
  return {
    enabled: true,
    conversionDirection: globalRules.conversionDirection,
    rowToColumnMode: globalRules.rowToColumnMode,
    rowToColumnBreakpoint: globalRules.rowToColumnBreakpoint,
    stackGap: globalRules.stackGap,
    stackAlignment: globalRules.stackAlignment
  }
}

function createResponsiveReplacementRule(globalRules: LayoutRulesState): ResponsiveReplacementRule {
  return {
    enabled: true,
    preset: "hamburger",
    trigger: "auto",
    breakpoint: globalRules.rowToColumnBreakpoint,
    width: 44,
    height: 44
  }
}

function LayerSegmentedControl<T extends string>({
  value,
  options,
  onChange
}: {
  value: T
  options: Array<{
    value: T
    label: string
  }>
  onChange: (value: T) => void
}) {
  return (
    <div class={`grid gap-1 rounded-lg border border-[#cbd5e1] bg-[#e2e8f0] p-1 ${
      options.length === 2 ? "grid-cols-2" : "grid-cols-3"
    }`}>
      {options.map((option) => {
        const isSelected = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            class={`min-h-8 rounded-md px-2 text-[11px] font-bold transition ${
              isSelected
                ? "bg-[#fbbf24] text-[#111827] shadow-sm"
                : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function LayerNumberField({
  label,
  value,
  min,
  max,
  onChange
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  return (
    <label class="block">
      <span class="mb-1 block text-[10px] font-bold uppercase text-gray-400">
        {label}
      </span>
      <input
        type="number"
        value={String(value)}
        min={min}
        max={max}
        onInput={(event) => {
          const nextValue = Number(event.currentTarget.value)

          if (Number.isFinite(nextValue)) {
            onChange(Math.min(max, Math.max(min, nextValue)))
          }
        }}
        class="h-9 w-full rounded-lg border border-[#e5e7eb] bg-white px-2 text-xs font-bold text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      />
    </label>
  )
}

function LayerContextMenu({
  frame,
  state,
  selectedLayerIds,
  onClose,
  onAddGroupInside,
  onWrapLayer,
  onDeleteLayers
}: {
  frame: FigmaSerializedFrame
  state: LayerContextMenuState
  selectedLayerIds: string[]
  onClose: () => void
  onAddGroupInside: (nodeId: string) => void
  onWrapLayer: (nodeId: string) => void
  onDeleteLayers: (nodeIds: string[]) => void
}) {
  const node = findNode(frame, state.nodeId)

  if (node == null) {
    return null
  }

  const isRoot = node.id === frame.id
  const canAddChildGroup = canAcceptDrop(node)
  const actionLayerIds = selectedLayerIds.includes(node.id)
    ? selectedLayerIds
    : [node.id]
  const deletableLayerCount = actionLayerIds.filter((id) => id !== frame.id).length

  function run(action: () => void) {
    action()
    onClose()
  }

  return (
    <div
      class="fixed z-50 w-52 overflow-hidden rounded-lg border border-[#d1d5db] bg-white py-1 text-xs shadow-xl"
      style={{
        left: `${Math.min(state.x, window.innerWidth - 220)}px`,
        top: `${Math.min(state.y, window.innerHeight - 180)}px`
      }}
      onClick={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.preventDefault()}
    >
      <div class="border-b border-[#eef2f7] px-3 py-2">
        <p class="truncate font-bold text-gray-900">
          {node.name}
        </p>
        <p class="mt-0.5 text-[10px] font-semibold uppercase text-gray-400">
          {getLayerKind(node)}
        </p>
      </div>

      <ContextMenuButton onClick={() => run(() => onAddGroupInside(node.id))} disabled={!canAddChildGroup}>
        Add group inside
      </ContextMenuButton>
      <ContextMenuButton onClick={() => run(() => onWrapLayer(node.id))} disabled={isRoot}>
        Wrap in group
      </ContextMenuButton>
      <ContextMenuButton onClick={() => run(() => onDeleteLayers(actionLayerIds))} disabled={deletableLayerCount === 0} danger>
        {deletableLayerCount > 1 ? `Delete ${deletableLayerCount} layers` : "Delete layer"}
      </ContextMenuButton>
    </div>
  )
}

function ContextMenuButton({
  children,
  disabled = false,
  danger = false,
  onClick
}: {
  children: string
  disabled?: boolean
  danger?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      class={`block w-full px-3 py-2 text-left font-semibold transition ${
        disabled
          ? "cursor-not-allowed text-gray-300"
          : danger
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  )
}

function getVisibleLayerIds(node: FigmaSerializedNode): string[] {
  return [
    node.id,
    ...node.children.flatMap((child) => getVisibleLayerIds(child))
  ]
}

function getLayerRange(layerIds: string[], firstId: string, lastId: string): string[] {
  const firstIndex = layerIds.indexOf(firstId)
  const lastIndex = layerIds.indexOf(lastId)

  if (firstIndex === -1 || lastIndex === -1) {
    return [lastId]
  }

  const start = Math.min(firstIndex, lastIndex)
  const end = Math.max(firstIndex, lastIndex)

  return layerIds.slice(start, end + 1)
}

function mergeUniqueIds(firstIds: string[], secondIds: string[]): string[] {
  return Array.from(new Set([...firstIds, ...secondIds]))
}

function getTopLevelSelectedIds(frame: FigmaSerializedFrame, nodeIds: string[]): string[] {
  const selectedIds = nodeIds.filter((id) => id !== frame.id)

  return selectedIds.filter((nodeId) => {
    return !selectedIds.some((candidateId) => {
      if (candidateId === nodeId) {
        return false
      }

      const candidate = findNode(frame, candidateId)

      return candidate != null && containsNode(candidate, nodeId)
    })
  })
}
