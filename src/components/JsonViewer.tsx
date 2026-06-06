import { h } from "preact"
import type { FigmaSerializedFrame } from "../frameSchema"

type JsonViewerSliderProps = {
  frame: FigmaSerializedFrame
  isExpanded: boolean
  onToggle: () => void
}

export function JsonViewerSlider({
  frame,
  isExpanded,
  onToggle
}: JsonViewerSliderProps) {
  return (
    <section class="absolute bottom-0 left-0 right-12 z-30 h-12 border-t border-[#e5e7eb] bg-[#111827]">
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

        <span class="text-xs font-semibold text-[#5eead4]">
          {isExpanded ? "Collapse" : "Expand"}
        </span>
      </button>
    </section>
  )
}

export function JsonViewerOverlay({
  frame,
  onClose
}: {
  frame: FigmaSerializedFrame
  onClose: () => void
}) {
  return (
    <section class="fixed inset-0 z-50 flex min-h-0 flex-col bg-[#111827] shadow-2xl">
      <header class="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-6">
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wide text-gray-300">
            JSON Viewer
          </h3>
          <p class="mt-0.5 text-[11px] text-gray-400">
            {frame.children.length} root children
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          class="rounded-lg px-2 py-1 text-xs font-semibold text-[#5eead4] transition hover:bg-white/5"
        >
          Collapse
        </button>
      </header>

      <JsonPreviewPanel frame={frame} />
    </section>
  )
}

function JsonPreviewPanel({ frame }: { frame: FigmaSerializedFrame }) {
  const json = JSON.stringify(frame, null, 2)

  return (
    <section class="flex min-h-0 flex-1 flex-col bg-[#111827]">
      <pre class="min-h-0 flex-1 overflow-auto p-4 text-xs leading-5 text-gray-100">
        {json}
      </pre>
    </section>
  )
}
