import { h } from "preact"
import type { FigmaSerializedFrame } from "../frameSchema"
import type { ResponsiveGenerationSettings } from "./ResponsiveSidebar"

export type ExportFrameSnapshot = {
  id: string
  appliedAt: string
  settings: ResponsiveGenerationSettings
  frame: FigmaSerializedFrame
}

type ExportFramePanelProps = {
  snapshot: ExportFrameSnapshot | null
  isOpen: boolean
  onClose: () => void
}

export default function ExportFramePanel({
  snapshot,
  isOpen,
  onClose
}: ExportFramePanelProps) {
  const exportPayload = snapshot == null
    ? null
    : {
        exportType: "responsive-frame-plan",
        appliedAt: snapshot.appliedAt,
        target: {
          device: snapshot.settings.targetDevice,
          width: snapshot.settings.screenWidth
        },
        source: {
          importedWidth: snapshot.settings.sourceWidth
        },
        appliedOptions: snapshot.settings.options.filter((option) => option.enabled),
        frame: snapshot.frame
      }

  return (
    <aside
      class={`fixed right-0 top-0 z-[60] flex h-screen w-[min(420px,100vw)] flex-col border-l border-[#e5e7eb] bg-white shadow-2xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!isOpen}
    >
      <header class="flex h-16 shrink-0 items-center justify-between border-b border-[#e5e7eb] px-5">
        <div class="min-w-0">
          <h2 class="truncate text-sm font-bold text-gray-900">
            Export Frame
          </h2>
          <p class="mt-0.5 text-xs text-gray-500">
            Applied responsive changes snapshot
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          class="rounded-lg px-2 py-1 text-sm font-bold text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close export panel"
        >
          X
        </button>
      </header>

      {snapshot == null || exportPayload == null ? (
        <div class="flex min-h-0 flex-1 items-center justify-center px-8 text-center">
          <div>
            <h3 class="text-sm font-bold text-gray-900">
              No export yet
            </h3>
            <p class="mt-2 text-sm leading-6 text-gray-500">
              Generate a responsive frame to see the applied output here.
            </p>
          </div>
        </div>
      ) : (
        <div class="min-h-0 flex-1 overflow-auto">
          <section class="border-b border-[#e5e7eb] p-5">
            <div class="grid grid-cols-2 gap-3">
              <SummaryItem label="Target" value={snapshot.settings.targetDevice} />
              <SummaryItem label="Width" value={`${snapshot.settings.screenWidth}px`} />
              <SummaryItem label="Imported" value={`${snapshot.settings.sourceWidth}px`} />
              <SummaryItem label="Source" value={snapshot.frame.name} />
              <SummaryItem label="Children" value={String(snapshot.frame.children.length)} />
            </div>
          </section>

          <section class="border-b border-[#e5e7eb] p-5">
            <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">
              Applied Changes
            </h3>
            <div class="mt-3 space-y-2">
              {snapshot.settings.options
                .filter((option) => option.enabled)
                .map((option) => (
                  <div
                    key={option.id}
                    class="rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2"
                  >
                    <p class="text-xs font-semibold text-gray-900">
                      {option.label}
                    </p>
                    <p class="mt-0.5 text-xs text-gray-500">
                      {option.description}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          <section class="bg-[#111827]">
            <div class="flex h-10 items-center justify-between border-b border-white/10 px-4">
              <h3 class="text-xs font-bold uppercase tracking-wide text-gray-300">
                Export JSON
              </h3>
              <span class="text-xs text-gray-400">
                snapshot
              </span>
            </div>

            <pre class="max-h-[520px] overflow-auto p-4 text-xs leading-5 text-gray-100">
              {JSON.stringify(exportPayload, null, 2)}
            </pre>
          </section>
        </div>
      )}
    </aside>
    // <div>Export Preview</div>
  )
}

function SummaryItem({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div class="rounded-lg border border-[#e5e7eb] bg-gray-50 px-3 py-2">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p class="mt-1 truncate text-xs font-semibold text-gray-900">
        {value}
      </p>
    </div>
  )
}
