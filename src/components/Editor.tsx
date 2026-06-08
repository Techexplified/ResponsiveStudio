import { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import type { LayoutRulesState } from "./LayoutRules"
import type { TargetDevice } from "./ResponsiveSidebar"
import ExportPreviewDrawer from "./ExportPreviewDrawer"
import FramePreview from "./FramePreview"
import { JsonViewerOverlay, JsonViewerSlider } from "./JsonViewer"
import LayerPanel from "./LayerPanel"
import { findNode } from "./editorModel"
import type { FigmaSerializedFrame } from "../frameSchema"

type EditorProps = {
  frame: FigmaSerializedFrame | null
  targetDevice: TargetDevice
  screenWidth: number
  layoutRules: LayoutRulesState
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  onFrameChange: (frame: FigmaSerializedFrame) => void
}

export default function Editor({
  frame,
  targetDevice,
  screenWidth,
  layoutRules,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onFrameChange
}: EditorProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [isExportPreviewExpanded, setIsExportPreviewExpanded] = useState(false)
  const [isJsonViewerExpanded, setIsJsonViewerExpanded] = useState(false)

  useEffect(() => {
    setSelectedNodeId(frame?.id ?? null)
  }, [frame?.id])

  useEffect(() => {
    if (frame == null || selectedNodeId == null) {
      return
    }

    if (findNode(frame, selectedNodeId) == null) {
      setSelectedNodeId(frame.id)
    }
  }, [frame, selectedNodeId])

  if (frame == null) {
    return <EmptyEditorState />
  }

  return (
    <section class="relative grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_320px] bg-[#f6f7fb]">
      <div class="relative flex min-w-0 flex-col">
        <EditorHeader
          frame={frame}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
        />

        <div class="relative min-h-0 flex-1 overflow-hidden">
          <section class="relative h-full min-h-0 overflow-hidden pb-12">
            <div class="h-full overflow-hidden">
              {!isExportPreviewExpanded && (
                <FramePreview
                  frame={frame}
                  selectedNodeId={selectedNodeId}
                  onSelect={setSelectedNodeId}
                />
              )}
            </div>

            <ExportPreviewDrawer
              frame={frame}
              selectedNodeId={selectedNodeId}
              onSelect={setSelectedNodeId}
              targetDevice={targetDevice}
              screenWidth={screenWidth}
              layoutRules={layoutRules}
              isExpanded={isExportPreviewExpanded}
              onToggle={() => setIsExportPreviewExpanded((current) => !current)}
            />
          </section>

          <JsonViewerSlider
            frame={frame}
            isExpanded={isJsonViewerExpanded}
            onToggle={() => setIsJsonViewerExpanded((current) => !current)}
          />
        </div>
      </div>

      <LayerPanel
        frame={frame}
        selectedNodeId={selectedNodeId}
        layoutRules={layoutRules}
        onSelect={setSelectedNodeId}
        onFrameChange={onFrameChange}
      />

      {isJsonViewerExpanded && (
        <JsonViewerOverlay
          frame={frame}
          onFrameChange={onFrameChange}
          onClose={() => setIsJsonViewerExpanded(false)}
        />
      )}
    </section>
  )
}

function EmptyEditorState() {
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

function EditorHeader({
  frame,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}: {
  frame: FigmaSerializedFrame
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
}) {
  return (
    <header class="flex h-16 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-6">
      <div class="min-w-0">
        <h2 class="truncate text-sm font-bold text-gray-900">
          {frame.name}
        </h2>
        <p class="mt-0.5 text-xs text-gray-500">
          {frame.type} · {Math.round(frame.geometry.width)} x {Math.round(frame.geometry.height)} px · schema v{frame.schemaVersion}
        </p>
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <HistoryButton
          label="Undo"
          disabled={!canUndo}
          onClick={onUndo}
        />
        <HistoryButton
          label="Redo"
          disabled={!canRedo}
          onClick={onRedo}
        />
      </div>
    </header>
  )
}

function HistoryButton({
  label,
  disabled,
  onClick
}: {
  label: string
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      class={`h-8 rounded-lg border px-3 text-xs font-bold transition ${
        disabled
          ? "cursor-not-allowed border-[#e5e7eb] bg-gray-50 text-gray-300"
          : "border-[#cbd5e1] bg-white text-gray-700 hover:border-[#0f766e] hover:text-[#0f766e]"
      }`}
    >
      {label}
    </button>
  )
}
