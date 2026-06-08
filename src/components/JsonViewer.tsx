import { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import type { FigmaSerializedFrame } from "../frameSchema"
import { denormalizeFigmaJson, deserializeNormalizedJson, serializeNormalizedJson } from "../normalizedFrameSchema"

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
            JSON Editor
          </h3>
          <p class="mt-0.5 text-[11px] text-gray-400">
            {frame.children.length} root children
          </p>
        </div>

        <span class="text-xs font-semibold text-[#5eead4]">
          {isExpanded ? "Collapse" : "Edit JSON"}
        </span>
      </button>
    </section>
  )
}

export function JsonViewerOverlay({
  frame,
  onFrameChange,
  onClose
}: {
  frame: FigmaSerializedFrame
  onFrameChange: (frame: FigmaSerializedFrame) => void
  onClose: () => void
}) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")
  const [json, setJson] = useState(() => serializeNormalizedJson(frame))
  const [editStatus, setEditStatus] = useState<"idle" | "applied" | "error">("idle")
  const [validationMessage, setValidationMessage] = useState("")

  useEffect(() => {
    setJson(serializeNormalizedJson(frame))
    setEditStatus("idle")
    setValidationMessage("")
  }, [frame])

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

  function applyJson() {
    const result = deserializeNormalizedJson(json)

    if (!result.ok) {
      setEditStatus("error")
      setValidationMessage(formatValidationErrors(result.errors))
      return
    }

    const nextFrame = denormalizeFigmaJson(result.value)

    onFrameChange(nextFrame)
    setJson(serializeNormalizedJson(nextFrame))
    setEditStatus("applied")
    setValidationMessage("")
    window.setTimeout(() => setEditStatus("idle"), 1600)
  }

  function resetJson() {
    setJson(serializeNormalizedJson(frame))
    setEditStatus("idle")
    setValidationMessage("")
  }

  return (
    <section class="fixed inset-0 z-50 flex min-h-0 flex-col bg-[#111827] shadow-2xl">
      <header class="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-6">
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wide text-gray-300">
            JSON Editor
          </h3>
          <p class="mt-0.5 text-[11px] text-gray-400">
            {frame.children.length} root children
          </p>
        </div>

        <div class="flex items-center gap-2">
          {validationMessage !== "" && (
            <span class="max-w-sm truncate text-xs font-semibold text-red-300" title={validationMessage}>
              {validationMessage}
            </span>
          )}

          {editStatus === "applied" && (
            <span class="text-xs font-semibold text-[#5eead4]">
              Applied
            </span>
          )}

          <button
            type="button"
            onClick={resetJson}
            class="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-gray-300 transition hover:bg-white/5"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={applyJson}
            class="rounded-lg border border-[#5eead4]/40 bg-[#0f766e] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#0d9488]"
          >
            Apply JSON
          </button>

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

      <JsonEditPanel
        json={json}
        hasError={editStatus === "error"}
        onChange={(nextJson) => {
          setJson(nextJson)
          if (editStatus === "error") {
            setEditStatus("idle")
            setValidationMessage("")
          }
        }}
      />
    </section>
  )
}

function JsonEditPanel({
  json,
  hasError,
  onChange
}: {
  json: string
  hasError: boolean
  onChange: (json: string) => void
}) {
  return (
    <section class="flex min-h-0 flex-1 flex-col bg-[#111827]">
      <textarea
        value={json}
        spellcheck={false}
        aria-label="Editable imported JSON"
        onInput={(event) => onChange(event.currentTarget.value)}
        class={`min-h-0 flex-1 resize-none overflow-auto border-0 bg-[#111827] p-4 font-mono text-xs leading-5 text-gray-100 outline-none ${
          hasError ? "shadow-[inset_0_0_0_2px_rgba(248,113,113,0.75)]" : ""
        }`}
      />
    </section>
  )
}

function formatValidationErrors(errors: Array<{ path: string; message: string }>): string {
  if (errors.length === 0) {
    return "JSON must include a serialized frame."
  }

  return `${errors[0].path}: ${errors[0].message}`
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
