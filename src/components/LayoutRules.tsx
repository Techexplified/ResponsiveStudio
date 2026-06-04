import { h } from "preact"
import type { ComponentChildren } from "preact"

export type RowToColumnMode = "auto" | "always" | "never"
export type StackAlignment = "start" | "center" | "stretch"
export type TextScaleMode = "preserve" | "scale" | "clamp"

export type LayoutRulesState = {
  rowToColumnMode: RowToColumnMode
  rowToColumnBreakpoint: number
  stackGap: number
  outputPadding: number
  stackAlignment: StackAlignment
  textScaleMode: TextScaleMode
  minimumTextSize: number
  tightenLineHeight: boolean
}

export const defaultLayoutRules: LayoutRulesState = {
  rowToColumnMode: "auto",
  rowToColumnBreakpoint: 480,
  stackGap: 16,
  outputPadding: 16,
  stackAlignment: "stretch",
  textScaleMode: "clamp",
  minimumTextSize: 12,
  tightenLineHeight: true
}

type LayoutRulesProps = {
  value: LayoutRulesState
  onChange: (value: LayoutRulesState) => void
}

export default function LayoutRules({ value, onChange }: LayoutRulesProps) {
  function update(nextValue: Partial<LayoutRulesState>) {
    onChange({
      ...value,
      ...nextValue
    })
  }

  return (
    <div class="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
      <RuleHeader
        title="Row to columns"
        description="Stack horizontal groups when the target width gets tight."
      />

      <SegmentedControl
        value={value.rowToColumnMode}
        options={[
          { value: "auto", label: "Auto" },
          { value: "always", label: "Always" },
          { value: "never", label: "Never" }
        ]}
        onChange={(rowToColumnMode) => update({ rowToColumnMode })}
      />

      <div class="mt-3 grid grid-cols-2 gap-2">
        <NumberField
          label="Breakpoint"
          value={value.rowToColumnBreakpoint}
          suffix="px"
          min={240}
          max={1200}
          onChange={(rowToColumnBreakpoint) => update({ rowToColumnBreakpoint })}
        />

        <NumberField
          label="Stack gap"
          value={value.stackGap}
          suffix="px"
          min={0}
          max={96}
          onChange={(stackGap) => update({ stackGap })}
        />
      </div>

      <div class="mt-3 grid grid-cols-[minmax(0,1fr)_130px] gap-2">
        <ControlGroup label="Stack align">
          <SegmentedControl
            value={value.stackAlignment}
            options={[
              { value: "start", label: "Start" },
              { value: "center", label: "Center" },
              { value: "stretch", label: "Fill" }
            ]}
            onChange={(stackAlignment) => update({ stackAlignment })}
          />
        </ControlGroup>

        <NumberField
          label="Padding"
          value={value.outputPadding}
          suffix="px"
          min={0}
          max={80}
          onChange={(outputPadding) => update({ outputPadding })}
        />
      </div>

      <div class="my-4 h-px bg-[#e5e7eb]" />

      <RuleHeader
        title="Text settings"
        description="Control how typography adapts in generated layouts."
      />

      <SegmentedControl
        value={value.textScaleMode}
        options={[
          { value: "preserve", label: "Keep" },
          { value: "scale", label: "Scale" },
          { value: "clamp", label: "Clamp" }
        ]}
        onChange={(textScaleMode) => update({ textScaleMode })}
      />

      <div class="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2">
        <NumberField
          label="Minimum text"
          value={value.minimumTextSize}
          suffix="px"
          min={8}
          max={24}
          onChange={(minimumTextSize) => update({ minimumTextSize })}
        />

        <button
          type="button"
          onClick={() => update({ tightenLineHeight: !value.tightenLineHeight })}
          class={`h-10 rounded-xl border px-3 text-xs font-semibold transition ${
            value.tightenLineHeight
              ? "border-[#d97706] bg-[#fbbf24] text-[#111827] shadow-sm"
              : "border-[#cbd5e1] bg-[#f8fafc] text-gray-600 hover:border-gray-300 hover:bg-white"
          }`}
        >
          Line height
        </button>
      </div>
    </div>
  )
}

function RuleHeader({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div class="mb-3">
      <h3 class="text-xs font-bold text-gray-900">
        {title}
      </h3>
      <p class="mt-0.5 text-[11px] leading-5 text-gray-500">
        {description}
      </p>
    </div>
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
    <div class="grid grid-cols-3 gap-1.5 rounded-2xl border border-[#cbd5e1] bg-[#e2e8f0] p-1.5">
      {options.map((option) => {
        const isSelected = option.value === value

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
  suffix,
  min,
  max,
  onChange
}: {
  label: string
  value: number
  suffix: string
  min: number
  max: number
  onChange: (value: number) => void
}) {
  return (
    <label class="block">
      <span class="mb-1 block text-[11px] font-semibold text-gray-600">
        {label}
      </span>

      <div class="flex h-11 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white focus-within:border-[#0f766e] focus-within:ring-2 focus-within:ring-[#0f766e]/10">
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
          class="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm font-semibold text-gray-900 outline-none"
        />

        <span class="flex w-9 shrink-0 items-center justify-center bg-gray-50 text-[11px] font-semibold text-gray-500">
          {suffix}
        </span>
      </div>
    </label>
  )
}
