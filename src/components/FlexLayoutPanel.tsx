import { h } from "preact"
import type { ComponentChildren } from "preact"
import type { FigmaSerializedNode } from "../frameSchema"

type FlexLayoutPanelProps = {
  node: FigmaSerializedNode
  onChange: (node: FigmaSerializedNode) => void
}

type Direction = "HORIZONTAL" | "VERTICAL"
type AxisAlign = "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN"
type CrossAlign = "MIN" | "CENTER" | "MAX" | "BASELINE"
type SizingMode = "AUTO" | "FIXED"

export default function FlexLayoutPanel({
  node,
  onChange
}: FlexLayoutPanelProps) {
  const layout = node.layout
  const padding = layout.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  const margin = layout.margin ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  function updateLayout(nextLayout: Partial<FigmaSerializedNode["layout"]>) {
    onChange({
      ...node,
      layout: {
        ...layout,
        isAutoLayout: true,
        ...nextLayout
      }
    })
  }

  return (
    <section class="bg-white p-3">
      <div class="space-y-3">
        <ControlGroup label="Direction">
          <SegmentedControl<Direction>
            value={(layout.layoutMode === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL")}
            options={[
              { value: "HORIZONTAL", label: "Row" },
              { value: "VERTICAL", label: "Column" }
            ]}
            onChange={(layoutMode) => updateLayout({
              autoLayoutDirection: layoutMode,
              layoutMode
            })}
          />
        </ControlGroup>

        <div class="grid grid-cols-2 gap-2">
          <NumberField
            label="Gap"
            value={layout.itemSpacing ?? 0}
            min={0}
            max={240}
            onChange={(itemSpacing) => updateLayout({ itemSpacing })}
          />

          <NumberField
            label="Wrap gap"
            value={layout.counterAxisSpacing ?? 0}
            min={0}
            max={240}
            onChange={(counterAxisSpacing) => updateLayout({ counterAxisSpacing })}
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <SelectField<AxisAlign>
            label="Justify items"
            value={(layout.primaryAxisAlignItems as AxisAlign | undefined) ?? "MIN"}
            options={[
              { value: "MIN", label: "Start" },
              { value: "CENTER", label: "Center" },
              { value: "MAX", label: "End" },
              { value: "SPACE_BETWEEN", label: "Between" }
            ]}
            onChange={(primaryAxisAlignItems) => updateLayout({ primaryAxisAlignItems })}
          />

          <SelectField<CrossAlign>
            label="Align items"
            value={(layout.counterAxisAlignItems as CrossAlign | undefined) ?? "MIN"}
            options={[
              { value: "MIN", label: "Start" },
              { value: "CENTER", label: "Center" },
              { value: "MAX", label: "End" },
              { value: "BASELINE", label: "Baseline" }
            ]}
            onChange={(counterAxisAlignItems) => updateLayout({ counterAxisAlignItems })}
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <SelectField<SizingMode>
            label="Width"
            value={(layout.primaryAxisSizingMode as SizingMode | undefined) ?? "AUTO"}
            options={[
              { value: "AUTO", label: "Hug" },
              { value: "FIXED", label: "Fixed" }
            ]}
            onChange={(primaryAxisSizingMode) => updateLayout({ primaryAxisSizingMode })}
          />

          <SelectField<SizingMode>
            label="Height"
            value={(layout.counterAxisSizingMode as SizingMode | undefined) ?? "AUTO"}
            options={[
              { value: "AUTO", label: "Hug" },
              { value: "FIXED", label: "Fixed" }
            ]}
            onChange={(counterAxisSizingMode) => updateLayout({ counterAxisSizingMode })}
          />
        </div>

        <button
          type="button"
          onClick={() => updateLayout({
            layoutWrap: layout.layoutWrap === "WRAP" ? "NO_WRAP" : "WRAP"
          })}
          class={`h-11 w-full rounded-xl border px-4 text-sm font-semibold transition ${
            layout.layoutWrap === "WRAP"
              ? "border-[#d97706] bg-[#fbbf24] text-[#111827] shadow-sm"
              : "border-[#cbd5e1] bg-[#f8fafc] text-gray-600 hover:border-gray-300 hover:bg-white"
          }`}
        >
          Wrap children
        </button>

        <SpacingBox
          title="Padding"
          value={padding}
          onChange={(nextPadding) => updateLayout({ padding: nextPadding })}
        />

        <SpacingBox
          title="Margin"
          value={margin}
          onChange={(nextMargin) => updateLayout({ margin: nextMargin })}
        />
      </div>
    </section>
  )
}

function ControlGroup({
  label,
  children
}: {
  label: string
  children: ComponentChildren
}) {
  return (
    <label class="block">
      <span class="mb-1 block text-[11px] font-semibold text-gray-600">
        {label}
      </span>
      {children}
    </label>
  )
}

function SegmentedControl<T extends string>({
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
    <div class="grid grid-cols-2 gap-1.5 rounded-2xl border border-[#cbd5e1] bg-[#e2e8f0] p-1.5">
      {options.map((option) => {
        const isSelected = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            class={`min-h-9 rounded-xl px-4 py-2 text-sm font-semibold transition ${
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

function NumberField({
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
      <span class="mb-1 block text-[11px] font-semibold text-gray-600">
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
        class="h-11 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      />
    </label>
  )
}

function CompactNumberField({
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
      <span class="mb-1 block text-center text-[10px] font-bold uppercase text-gray-400">
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
        class="h-10 w-full rounded-xl border border-[#e5e7eb] bg-white px-2 text-center text-sm font-semibold text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      />
    </label>
  )
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string
  value: T
  options: Array<{
    value: T
    label: string
  }>
  onChange: (value: T) => void
}) {
  return (
    <label class="block">
      <span class="mb-1 block text-[11px] font-semibold text-gray-600">
        {label}
      </span>

      <select
        value={value}
        onInput={(event) => onChange(event.currentTarget.value as T)}
        class="h-11 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function SpacingBox({
  title,
  value,
  onChange
}: {
  title: string
  value: {
    top: number
    right: number
    bottom: number
    left: number
  }
  onChange: (value: {
    top: number
    right: number
    bottom: number
    left: number
  }) => void
}) {
  function update(side: keyof typeof value, nextValue: number) {
    onChange({
      ...value,
      [side]: nextValue
    })
  }

  return (
    <div>
      <p class="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
        {title}
      </p>

      <div class="grid grid-cols-4 gap-1.5">
        <CompactNumberField
          label="T"
          value={value.top}
          min={0}
          max={240}
          onChange={(nextValue) => update("top", nextValue)}
        />
        <CompactNumberField
          label="R"
          value={value.right}
          min={0}
          max={240}
          onChange={(nextValue) => update("right", nextValue)}
        />
        <CompactNumberField
          label="B"
          value={value.bottom}
          min={0}
          max={240}
          onChange={(nextValue) => update("bottom", nextValue)}
        />
        <CompactNumberField
          label="L"
          value={value.left}
          min={0}
          max={240}
          onChange={(nextValue) => update("left", nextValue)}
        />
      </div>
    </div>
  )
}
