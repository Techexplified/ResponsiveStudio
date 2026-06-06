import { useState } from "preact/hooks"
import { h } from "preact"
import LayoutRules, { type LayoutRulesState } from "./LayoutRules"
import type { FigmaSerializedFrame } from "../frameSchema"


export type TargetDevice = "mobile" | "tablet" | "desktop" | "custom"

export type ConversionOption = {
  id: string
  label: string
  description: string
  enabled: boolean
}

export type ResponsiveGenerationSettings = {
  targetDevice: TargetDevice
  sourceWidth: number
  screenWidth: number
  sourceFrame: FigmaSerializedFrame | null
  layoutRules: LayoutRulesState
  options: ConversionOption[]
}

export function createDefaultConversionOptions(): ConversionOption[] {
  return [
    {
      id: "auto-stack",
      label: "Convert layout direction",
      description: "Switch rows and columns based on the layout rules.",
      enabled: true
    },
    {
      id: "resize-widths",
      label: "Scale layout reference",
      description: "Use relative width changes for generated layers.",
      enabled: true
    },
    {
      id: "preserve-text",
      label: "Preserve text",
      description: "Keep original text and layer names.",
      enabled: true
    },
    {
      id: "create-copy",
      label: "Create new frame",
      description: "Generate beside the selected frame.",
      enabled: true
    }
  ]
}


export default function ResponsiveSidebar({
  importedFrame,
  importError,
  jsonImportError,
  isJsonImportedFrame,
  targetDevice,
  sourceWidth,
  screenWidth,
  layoutRules,
  onTargetDeviceChange,
  onSourceWidthChange,
  onScreenWidthChange,
  onLayoutRulesChange,
  onClearFrame,
  onImportJson,
  onGenerate
}: {
  importedFrame: FigmaSerializedFrame | null
  importError: string
  jsonImportError: string
  isJsonImportedFrame: boolean
  targetDevice: TargetDevice
  sourceWidth: string
  screenWidth: string
  layoutRules: LayoutRulesState
  onTargetDeviceChange: (value: TargetDevice) => void
  onSourceWidthChange: (value: string) => void
  onScreenWidthChange: (value: string) => void
  onLayoutRulesChange: (value: LayoutRulesState) => void
  onClearFrame: () => void
  onImportJson: (value: string) => boolean
  onGenerate: (settings: ResponsiveGenerationSettings) => void
}) {
  const [options, setOptions] = useState<ConversionOption[]>(createDefaultConversionOptions)
  const [isJsonImportOpen, setIsJsonImportOpen] = useState(false)
  const [jsonImportValue, setJsonImportValue] = useState("")
  function toggleOption(id: string) {
    setOptions((current) =>
      current.map((option) =>
        option.id === id
          ? {
              ...option,
              enabled: !option.enabled
            }
          : option
      )
    )
  }

  function importSelectedFrame() {
    parent.postMessage(
      {
        pluginMessage: {
          type: "import-selected-frame"
        }
      },
      "*"
    )
  }

  function generateResponsiveFrame() {
    const payload = {
      targetDevice,
      sourceWidth: Number(sourceWidth),
      screenWidth: Number(screenWidth),
      sourceFrame: isJsonImportedFrame ? null : importedFrame,
      layoutRules,
      options
    }

    if (!isJsonImportedFrame) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "generate-responsive-frame",
            payload
          }
        },
        "*"
      )
    } else if (importedFrame != null) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "create-export-frame-from-json",
            payload: {
              frame: importedFrame,
              screenWidth: Number(screenWidth),
              layoutRules
            }
          }
        },
        "*"
      )
    }

    onGenerate(payload)
  }

  return (
    <aside class="flex h-full w-[360px] flex-col border-r border-[#e5e7eb] bg-white shadow-sm">
      <SidebarHeader />

      <div class="min-h-0 flex-1 overflow-auto px-5 py-5">
        <StepTitle index={1} title="Source Frame" />

        <SourceFrameCard
          frame={importedFrame}
          error={importError}
          onImport={importSelectedFrame}
          onToggleJsonImport={() => setIsJsonImportOpen((current) => !current)}
          onClear={onClearFrame}
        />

        {isJsonImportOpen && (
          <JsonImportCard
            value={jsonImportValue}
            error={jsonImportError}
            onChange={setJsonImportValue}
            onImport={() => {
              if (onImportJson(jsonImportValue)) {
                setJsonImportValue("")
                setIsJsonImportOpen(false)
              }
            }}
          />
        )}

        <WidthInput
          className="mt-4"
          label="Imported Width"
          value={sourceWidth}
          onChange={onSourceWidthChange}
          disabled={importedFrame == null}
        />

        <StepTitle index={2} title="Target Device" className="mt-7" />

        <DeviceSelector
          value={targetDevice}
          onChange={onTargetDeviceChange}
        />

        <WidthInput
          label="Reference Width"
          value={screenWidth}
          onChange={onScreenWidthChange}
        />

        <StepTitle index={3} title="Layout Rules" className="mt-7" />

        <LayoutRules
          value={layoutRules}
          onChange={onLayoutRulesChange}
        />

        {/* <StepTitle index={4} title="Options" className="mt-7" /> */}

        {/* <div class="space-y-3">
          {options.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              onToggle={() => toggleOption(option.id)}
            />
          ))}
        </div> */}
      </div>

      <div class="border-t border-[#e5e7eb] bg-white p-5">
        <button
          type="button"
          onClick={generateResponsiveFrame}
          disabled={importedFrame == null || !isValidWidth(sourceWidth) || !isValidWidth(screenWidth)}
          class={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
            importedFrame == null || !isValidWidth(sourceWidth) || !isValidWidth(screenWidth)
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-[#0f766e] text-white hover:bg-[#115e59]"
          }`}
        >
          <span>✦</span>
          {isJsonImportedFrame ? "Update Export Wireframe" : "Generate Responsive Frame"}
        </button>

        <p class="mt-3 text-center text-xs leading-relaxed text-gray-500">
          {isJsonImportedFrame
            ? "The pasted JSON is the editable export wireframe."
            : "A new editable frame will be created next to your selected frame."}
        </p>
      </div>
    </aside>
  )
}

function SidebarHeader() {
  return (
    <header class="flex h-16 items-center justify-between border-b border-[#e5e7eb] px-5">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f766e] text-sm font-bold text-white">
          R
        </div>

        <div>
          <h1 class="text-sm font-bold text-gray-900">
            Responsive Studio
          </h1>
          <p class="text-xs text-gray-500">
            Wireframe layout converter
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Close plugin"
        class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
      >
        ✕
      </button>
    </header>
  )
}

function StepTitle({
  index,
  title,
  className = ""
}: {
  index: number
  title: string
  className?: string
}) {
  return (
    <div class={`mb-3 flex items-center gap-2 ${className}`}>
      <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#0f766e] text-[10px] font-bold text-white">
        {index}
      </span>

      <h2 class="text-[11px] font-bold uppercase tracking-wide text-[#0f766e]">
        {title}
      </h2>
    </div>
  )
}

function SourceFrameCard({
  frame,
  error,
  onImport,
  onToggleJsonImport,
  onClear
}: {
  frame: FigmaSerializedFrame | null
  error: string
  onImport: () => void
  onToggleJsonImport: () => void
  onClear: () => void
}) {
  return (
    <div class="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f4f6] text-gray-500">
          ▭
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-gray-900">
            {frame == null ? "No frame imported" : frame.name}
          </p>
          <p class="mt-1 text-xs text-gray-500">
            {frame == null
              ? "Select a Figma frame and import it."
              : `${Math.round(frame.geometry.width)} x ${Math.round(frame.geometry.height)} px · ${frame.children.length} children`}
          </p>
        </div>
      </div>

      {error !== "" && (
        <p class="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}

      <div class="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onImport}
          class="min-w-0  flex-1 rounded-xl border border-[#d97706] bg-[#fbbf24] px-3 py-4! text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-[#f59e0b]"
        >
          Import Selected Frame
        </button>

        {frame != null && (
          <button
            type="button"
            onClick={onClear}
            class="rounded-xl border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          >
            Cancel
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onToggleJsonImport}
        class="mt-2 w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3 py-2 text-xs font-bold text-gray-600 transition hover:border-gray-300 hover:bg-white hover:text-gray-900"
      >
        Import JSON
      </button>
    </div>
  )
}

function JsonImportCard({
  value,
  error,
  onChange,
  onImport
}: {
  value: string
  error: string
  onChange: (value: string) => void
  onImport: () => void
}) {
  return (
    <div class="mt-3 rounded-xl border border-[#e5e7eb] bg-gray-50 p-3">
      <label class="mb-2 block text-xs font-bold text-gray-700">
        JSON Import
      </label>

      <textarea
        value={value}
        onInput={(event) => onChange(event.currentTarget.value)}
        class="h-32 w-full resize-none rounded-lg border border-[#d1d5db] bg-white p-3 font-mono text-[11px] leading-4 text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      />

      {error !== "" && (
        <p class="mt-2 rounded-lg bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-700">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={onImport}
        disabled={value.trim() === ""}
        class={`mt-2 h-9 w-full rounded-lg text-xs font-bold transition ${
          value.trim() === ""
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-[#0f766e] text-white hover:bg-[#115e59]"
        }`}
      >
        Import JSON
      </button>
    </div>
  )
}

function DeviceSelector({
  value,
  onChange
}: {
  value: TargetDevice
  onChange: (value: TargetDevice) => void
}) {
  const devices: Array<{
    id: TargetDevice
    label: string
  }> = [
    { id: "mobile", label: "Mobile" },
    { id: "tablet", label: "Tablet" },
    { id: "desktop", label: "Desktop" },
    { id: "custom", label: "Custom" }
  ]

  return (
    <div role="radiogroup" aria-label="Target device" class="grid grid-cols-2 gap-2">
      {devices.map((device) => {
        const isSelected = value === device.id

        return (
          <button
            key={device.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(device.id)}
            class={`flex items-center justify-start gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
              isSelected
                ? "border-[#d97706] bg-[#fbbf24] text-[#111827] shadow-sm"
                : "border-[#cbd5e1] bg-[#f8fafc] text-gray-600 hover:border-gray-300 hover:bg-white"
            }`}
          >
            <span
              class={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                isSelected
                  ? "border-[#0f766e] bg-white"
                  : "border-gray-300 bg-white"
              }`}
              aria-hidden="true"
            >
              <span
                class={`h-2 w-2 rounded-full bg-[#0f766e] transition ${
                  isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
            </span>
            <span class="min-w-0 truncate">
              {device.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function WidthInput({
  label,
  value,
  onChange,
  disabled = false,
  className = "mt-4"
}: {
  label: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}) {
  return (
    <div class={className}>
      <label class="mb-2 block text-xs font-semibold text-gray-700">
        {label}
      </label>

      <div class="flex gap-2">
        <input
          type="number"
          min="1"
          value={value}
          disabled={disabled}
          onInput={(event) => onChange(event.currentTarget.value)}
          class="h-10 min-w-0 flex-1 rounded-xl border border-[#e5e7eb] bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10 disabled:bg-gray-50 disabled:text-gray-400"
        />

        <div class="flex h-10 w-14 items-center justify-center rounded-xl border border-[#e5e7eb] bg-gray-50 text-xs font-semibold text-gray-500">
          px
        </div>
      </div>

    </div>
  )
}

function isValidWidth(value: string): boolean {
  const numberValue = Number(value)

  return Number.isFinite(numberValue) && numberValue > 0
}

function OptionRow({
  option,
  onToggle
}: {
  option: ConversionOption
  onToggle: () => void
}) {
  return (
    <div class="flex items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        class={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold transition ${
          option.enabled
            ? "border-[#d97706] bg-[#fbbf24] text-[#111827]"
            : "border-gray-300 bg-white text-transparent"
        }`}
      >
        ✓
      </button>

      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-semibold text-gray-900">
          {option.label}
        </p>

        <p class="mt-0.5 truncate text-xs text-gray-500">
          {option.description}
        </p>
      </div>
    </div>
  )
}
