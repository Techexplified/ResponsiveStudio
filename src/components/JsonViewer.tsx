import { h } from "preact"
import { useState } from "preact/hooks"
import type { FigmaSerializedFrame } from "../frameSchema"
import { serializeNormalizedJson } from "../normalizedFrameSchema"

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
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")
  const json = serializeNormalizedJson(frame)

  async function copyJson() {
    const didCopy = await copyText(json)

    if (didCopy) {
      setCopyStatus("copied")
      window.setTimeout(() => setCopyStatus("idle"), 1600)
      return
    }

    setCopyStatus("error")
    window.setTimeout(() => setCopyStatus("idle"), 1600)
  }

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

        <div class="flex items-center gap-2">
          <button
            type="button"
            onClick={copyJson}
            class="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-[#5eead4] transition hover:bg-white/5"
          >
            {copyStatus === "copied" ? "Copied" : copyStatus === "error" ? "Copy failed" : "Copy JSON"}
          </button>

          <button
            type="button"
            onClick={onClose}
            class="rounded-lg px-2 py-1 text-xs font-semibold text-[#5eead4] transition hover:bg-white/5"
          >
            Collapse
          </button>
        </div>
      </header>

      <JsonPreviewPanel json={json} />
    </section>
  )
}

function JsonPreviewPanel({ json }: { json: string }) {
  return (
    <section class="flex min-h-0 flex-1 flex-col bg-[#111827]">
      <pre class="min-h-0 flex-1 overflow-auto p-4 text-xs leading-5 text-gray-100">
        {json}
      </pre>
    </section>
  )
}

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText != null) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch (_error) {
    // Figma plugin iframes can reject Clipboard API access, so fall through.
  }

  const textarea = document.createElement("textarea")

  textarea.value = value
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.left = "-9999px"
  textarea.style.top = "0"
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  try {
    return document.execCommand("copy")
  } catch (_error) {
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}
