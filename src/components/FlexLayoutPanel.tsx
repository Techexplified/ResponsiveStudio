import { h } from "preact"
import type { ComponentChildren } from "preact"
import type { FigmaSerializedNode } from "../frameSchema"
import { createEditorGeometry } from "./editorModel"

type FlexLayoutPanelProps = {
  node: FigmaSerializedNode
  parentLayoutMode: Direction | null
  onChange: (node: FigmaSerializedNode) => void
}

type Direction = "HORIZONTAL" | "VERTICAL"
type AxisAlign = "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN"
type CrossAlign = "MIN" | "CENTER" | "MAX" | "BASELINE"
type SizingMode = "FILL" | "HUG" | "FIXED"

export default function FlexLayoutPanel({
  node,
  parentLayoutMode,
  onChange
}: FlexLayoutPanelProps) {
  const layout = node.layout
  const isContainer = node.children.length > 0 || isFrameLikeNode(node)
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
  const widthSizing = getCurrentWidthSizing()
  const heightSizing = getCurrentHeightSizing()
  const sizingOptions = getSizingOptions(parentLayoutMode != null)

  function updateLayout(
    nextLayout: Partial<FigmaSerializedNode["layout"]>,
    options: {
      forceAutoLayout?: boolean
    } = {}
  ) {
    onChange({
      ...node,
      layout: {
        ...layout,
        isAutoLayout: options.forceAutoLayout === true || layout.isAutoLayout || isContainer,
        ...nextLayout
      }
    })
  }

  function updateWidthSizing(sizingMode: SizingMode) {
    const safeSizingMode = normalizeSelectableSizingMode(sizingMode, parentLayoutMode)

    updateLayout(normalizeChildSizingForParent({
      widthSizing: safeSizingMode,
      heightSizing
    }, {
      parentLayoutMode
    }, {
      layoutSizingHorizontal: safeSizingMode,
      ...(isContainer && layout.layoutMode === "HORIZONTAL"
        ? { primaryAxisSizingMode: toAxisSizingMode(safeSizingMode) }
        : {}),
      ...(isContainer && layout.layoutMode !== "HORIZONTAL"
        ? { counterAxisSizingMode: toAxisSizingMode(safeSizingMode) }
        : {})
    }))
  }

  function updateHeightSizing(sizingMode: SizingMode) {
    const safeSizingMode = normalizeSelectableSizingMode(sizingMode, parentLayoutMode)

    updateLayout(normalizeChildSizingForParent({
      widthSizing,
      heightSizing: safeSizingMode
    }, {
      parentLayoutMode
    }, {
      layoutSizingVertical: safeSizingMode,
      ...(isContainer && layout.layoutMode === "VERTICAL"
        ? { primaryAxisSizingMode: toAxisSizingMode(safeSizingMode) }
        : {}),
      ...(isContainer && layout.layoutMode !== "VERTICAL"
        ? { counterAxisSizingMode: toAxisSizingMode(safeSizingMode) }
        : {})
    }))
  }

  function stretchToParent() {
    updateWidthSizing("FILL")
  }

  function updateDirection(layoutMode: Direction) {
    const currentLayoutMode = layout.layoutMode === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL"

    if (currentLayoutMode === layoutMode) {
      return
    }

    const nextChildren = node.children.map((child) =>
      normalizeChildForParentDirection(child, currentLayoutMode, layoutMode)
    )

    // A gap that looked reasonable on the old axis can be enormous on the
    // new axis (for example, a 492 px horizontal gap becomes 492 px vertical
    // whitespace). Reset oversized imported gaps when switching direction.
    const nextItemSpacing = Math.min(layout.itemSpacing ?? 0, 48)

    onChange({
      ...node,
      children: nextChildren,
      layout: {
        ...layout,
        isAutoLayout: true,
        autoLayoutDirection: layoutMode,
        layoutMode,
        itemSpacing: nextItemSpacing,
        // Keep the container wrapped around its children on the new main axis.
        primaryAxisSizingMode: "AUTO",
        ...(layoutMode === "VERTICAL"
          ? { layoutSizingVertical: "HUG" as const }
          : { layoutSizingHorizontal: "HUG" as const })
      }
    })
  }

  function updateWidthValue(width: number) {
    const nextWidth = clampDimension(width)

    updateLayoutAndGeometry(
      normalizeChildSizingForParent({
        widthSizing: "FIXED",
        heightSizing
      }, {
        parentLayoutMode
      }, {
        layoutSizingHorizontal: "FIXED",
        ...(isContainer && layout.layoutMode === "HORIZONTAL"
          ? { primaryAxisSizingMode: "FIXED" as const }
          : {}),
        ...(isContainer && layout.layoutMode !== "HORIZONTAL"
          ? { counterAxisSizingMode: "FIXED" as const }
          : {})
      }),
      nextWidth,
      node.geometry.height
    )
  }

  function updateHeightValue(height: number) {
    const nextHeight = clampDimension(height)

    updateLayoutAndGeometry(
      normalizeChildSizingForParent({
        widthSizing,
        heightSizing: "FIXED"
      }, {
        parentLayoutMode
      }, {
        layoutSizingVertical: "FIXED",
        ...(isContainer && layout.layoutMode === "VERTICAL"
          ? { primaryAxisSizingMode: "FIXED" as const }
          : {}),
        ...(isContainer && layout.layoutMode !== "VERTICAL"
          ? { counterAxisSizingMode: "FIXED" as const }
          : {})
      }),
      node.geometry.width,
      nextHeight
    )
  }

  function updateLayoutAndGeometry(
    nextLayout: Partial<FigmaSerializedNode["layout"]>,
    width: number,
    height: number
  ) {
    onChange({
      ...node,
      geometry: createEditorGeometry(
        node.geometry.x,
        node.geometry.y,
        width,
        height,
        node.geometry
      ),
      layout: {
        ...layout,
        isAutoLayout: layout.isAutoLayout || isContainer,
        ...nextLayout
      }
    })
  }

  function getCurrentWidthSizing(): SizingMode {
    return getSizingMode(
      layout.layoutSizingHorizontal,
      layout.layoutMode === "HORIZONTAL" ? layout.primaryAxisSizingMode : layout.counterAxisSizingMode,
      parentLayoutMode != null
    )
  }

  function getCurrentHeightSizing(): SizingMode {
    return getSizingMode(
      layout.layoutSizingVertical,
      layout.layoutMode === "VERTICAL" ? layout.primaryAxisSizingMode : layout.counterAxisSizingMode,
      parentLayoutMode != null
    )
  }

  return (
    <section class="bg-white p-3">
      <div class="space-y-3">
        {isContainer && (
          <ControlGroup label="Direction">
            <SegmentedControl<Direction>
              value={(layout.layoutMode === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL")}
              options={[
                { value: "HORIZONTAL", label: "Row" },
                { value: "VERTICAL", label: "Column" }
              ]}
              onChange={updateDirection}
            />
          </ControlGroup>
        )}

        {isContainer && (
          <div class="grid grid-cols-2 gap-2">
            <NumberField
              label="Gap"
              value={layout.itemSpacing ?? 0}
              min={0}
              max={240}
              onChange={(itemSpacing) => updateLayout({ itemSpacing }, { forceAutoLayout: true })}
            />

            <NumberField
              label="Wrap gap"
              value={layout.counterAxisSpacing ?? 0}
              min={0}
              max={240}
              onChange={(counterAxisSpacing) => updateLayout({ counterAxisSpacing }, { forceAutoLayout: true })}
            />
          </div>
        )}

        {isContainer && (
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
              onChange={(primaryAxisAlignItems) => updateLayout({ primaryAxisAlignItems }, { forceAutoLayout: true })}
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
              onChange={(counterAxisAlignItems) => updateLayout({ counterAxisAlignItems }, { forceAutoLayout: true })}
            />
          </div>
        )}

        <div class="grid grid-cols-2 gap-2">
          <SelectField<SizingMode>
            label="Width"
            value={widthSizing}
            options={sizingOptions}
            onChange={updateWidthSizing}
          />

          <SelectField<SizingMode>
            label="Height"
            value={heightSizing}
            options={sizingOptions}
            onChange={updateHeightSizing}
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <NumberField
            label="W"
            value={Math.round(node.geometry.width)}
            min={1}
            max={10000}
            onChange={updateWidthValue}
          />

          <NumberField
            label="H"
            value={Math.round(node.geometry.height)}
            min={1}
            max={10000}
            onChange={updateHeightValue}
          />
        </div>

        {!isContainer && parentLayoutMode != null && (
          <button
            type="button"
            onClick={stretchToParent}
            class="h-11 w-full rounded-xl border border-[#0f766e] bg-[#ecfdf5] px-4 text-sm font-bold text-[#0f766e] transition hover:bg-[#ccfbf1]"
          >
            Stretch width to parent
          </button>
        )}

        {isContainer && (
          <button
            type="button"
            onClick={() => updateLayout({
              layoutWrap: layout.layoutWrap === "WRAP" ? "NO_WRAP" : "WRAP"
            }, { forceAutoLayout: true })}
            class={`h-11 w-full rounded-xl border px-4 text-sm font-semibold transition ${
              layout.layoutWrap === "WRAP"
                ? "border-[#d97706] bg-[#fbbf24] text-[#111827] shadow-sm"
                : "border-[#cbd5e1] bg-[#f8fafc] text-gray-600 hover:border-gray-300 hover:bg-white"
            }`}
          >
            Wrap children
          </button>
        )}

        {isContainer && (
          <BoxModelVisualizer
            margin={margin}
            padding={padding}
            onMarginChange={(nextMargin) => updateLayout({ margin: nextMargin }, { forceAutoLayout: true })}
            onPaddingChange={(nextPadding) => updateLayout({ padding: nextPadding }, { forceAutoLayout: true })}
          />
        )}
      </div>
    </section>
  )
}

function isFrameLikeNode(node: FigmaSerializedNode): boolean {
  return node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE"
}

function getSizingMode(
  layoutSizing: string | undefined,
  axisSizing: string | undefined,
  canFillParent: boolean
): SizingMode {
  if (canFillParent && layoutSizing === "FILL") {
    return "FILL"
  }

  if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
    return layoutSizing === "FILL" ? "FIXED" : layoutSizing
  }

  if (axisSizing === "AUTO") {
    return "HUG"
  }

  return "FIXED"
}

function getSizingOptions(canFillParent: boolean): Array<{
  value: SizingMode
  label: string
}> {
  const options: Array<{
    value: SizingMode
    label: string
  }> = [
    { value: "HUG", label: "Hug" },
    { value: "FIXED", label: "Fixed" }
  ]

  return canFillParent
    ? [{ value: "FILL", label: "Fill" }, ...options]
    : options
}

function normalizeSelectableSizingMode(sizingMode: SizingMode, parentLayoutMode: Direction | null): SizingMode {
  return sizingMode === "FILL" && parentLayoutMode == null ? "FIXED" : sizingMode
}

function normalizeChildForParentDirection(
  child: FigmaSerializedNode,
  currentParentLayoutMode: Direction,
  nextParentLayoutMode: Direction
): FigmaSerializedNode {
  const widthSizing = getChildAxisSizingForParent(
    child,
    getSourceAxisForTargetAxis("horizontal", nextParentLayoutMode, currentParentLayoutMode),
    currentParentLayoutMode
  )
  const heightSizing = getChildAxisSizingForParent(
    child,
    getSourceAxisForTargetAxis("vertical", nextParentLayoutMode, currentParentLayoutMode),
    currentParentLayoutMode
  )

  return {
    ...child,
    layout: {
      ...child.layout,
      ...normalizeChildSizingForParent({
        widthSizing,
        heightSizing
      }, {
        parentLayoutMode: nextParentLayoutMode
      }, {
        layoutSizingHorizontal: widthSizing,
        layoutSizingVertical: heightSizing
      })
    }
  }
}

function getChildAxisSizingForParent(
  child: FigmaSerializedNode,
  axis: "horizontal" | "vertical",
  parentLayoutMode: Direction
): SizingMode {
  const layoutSizing = axis === "horizontal"
    ? child.layout.layoutSizingHorizontal
    : child.layout.layoutSizingVertical

  if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
    return layoutSizing
  }

  const axisSizing = axisMatchesPrimaryAxis(child, axis)
    ? child.layout.primaryAxisSizingMode
    : child.layout.counterAxisSizingMode

  if (axisSizing === "AUTO") {
    return "HUG"
  }

  if (axisSizing === "FIXED") {
    return "FIXED"
  }

  if (child.layout.layoutAlign === "STRETCH" && axisMatchesCrossAxis(parentLayoutMode, axis)) {
    return "FILL"
  }

  if (
    typeof child.layout.layoutGrow === "number" &&
    child.layout.layoutGrow > 0 &&
    axisMatchesPrimaryParentAxis(parentLayoutMode, axis)
  ) {
    return "FILL"
  }

  return "FIXED"
}

function axisMatchesPrimaryAxis(child: FigmaSerializedNode, axis: "horizontal" | "vertical"): boolean {
  return axis === "horizontal"
    ? child.layout.layoutMode === "HORIZONTAL"
    : child.layout.layoutMode === "VERTICAL"
}

function axisMatchesPrimaryParentAxis(
  parentLayoutMode: Direction,
  axis: "horizontal" | "vertical"
): boolean {
  return axis === "horizontal"
    ? parentLayoutMode === "HORIZONTAL"
    : parentLayoutMode === "VERTICAL"
}

function axisMatchesCrossAxis(
  parentLayoutMode: Direction,
  axis: "horizontal" | "vertical"
): boolean {
  return axis === "horizontal"
    ? parentLayoutMode === "VERTICAL"
    : parentLayoutMode === "HORIZONTAL"
}

function getSourceAxisForTargetAxis(
  axis: "horizontal" | "vertical",
  targetParentLayoutMode: Direction,
  sourceParentLayoutMode: Direction
): "horizontal" | "vertical" {
  if (targetParentLayoutMode === sourceParentLayoutMode) {
    return axis
  }

  return axisMatchesPrimaryParentAxis(targetParentLayoutMode, axis)
    ? getParentAxis(sourceParentLayoutMode, "primary")
    : getParentAxis(sourceParentLayoutMode, "cross")
}

function getParentAxis(
  parentLayoutMode: Direction,
  role: "primary" | "cross"
): "horizontal" | "vertical" {
  if (role === "primary") {
    return parentLayoutMode === "HORIZONTAL" ? "horizontal" : "vertical"
  }

  return parentLayoutMode === "HORIZONTAL" ? "vertical" : "horizontal"
}

function clampDimension(value: number): number {
  return Math.min(10000, Math.max(1, Math.round(value)))
}

function toAxisSizingMode(sizingMode: SizingMode): "AUTO" | "FIXED" {
  return sizingMode === "HUG" ? "AUTO" : "FIXED"
}

function normalizeChildSizingForParent(
  sizing: {
    widthSizing: SizingMode
    heightSizing: SizingMode
  },
  context: {
    parentLayoutMode: Direction | null
  },
  nextLayout: Partial<FigmaSerializedNode["layout"]>
): Partial<FigmaSerializedNode["layout"]> {
  if (context.parentLayoutMode === "HORIZONTAL") {
    return {
      ...nextLayout,
      layoutGrow: sizing.widthSizing === "FILL" ? 1 : 0,
      layoutAlign: sizing.heightSizing === "FILL" ? "STRETCH" : "INHERIT"
    }
  }

  if (context.parentLayoutMode === "VERTICAL") {
    return {
      ...nextLayout,
      layoutGrow: sizing.heightSizing === "FILL" ? 1 : 0,
      layoutAlign: sizing.widthSizing === "FILL" ? "STRETCH" : "INHERIT"
    }
  }

  return {
    ...nextLayout,
    layoutGrow: 0,
    layoutAlign: "INHERIT"
  }
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

type SpacingValue = {
  top: number
  right: number
  bottom: number
  left: number
}

function BoxModelVisualizer({
  margin,
  padding,
  onMarginChange,
  onPaddingChange
}: {
  margin: SpacingValue
  padding: SpacingValue
  onMarginChange: (value: SpacingValue) => void
  onPaddingChange: (value: SpacingValue) => void
}) {
  function updateMargin(side: keyof SpacingValue, nextValue: number) {
    onMarginChange({
      ...margin,
      [side]: nextValue
    })
  }

  function updatePadding(side: keyof SpacingValue, nextValue: number) {
    onPaddingChange({
      ...padding,
      [side]: nextValue
    })
  }

  return (
    <div>
      <p class="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
        Box model
      </p>

      <div class="rounded-lg border border-[#d1d5db] bg-[#f8fafc] p-2">
        <div class="grid grid-cols-[48px_minmax(0,1fr)_48px] grid-rows-[40px_1fr_40px] gap-1 rounded-md border border-dashed border-[#f59e0b] bg-[#fffbeb] p-2">
          <BoxModelLabel text="Margin" tone="margin" />
          <BoxModelInput
            label="Margin top"
            value={margin.top}
            onChange={(nextValue) => updateMargin("top", nextValue)}
          />
          <div />

          <BoxModelInput
            label="Margin left"
            value={margin.left}
            onChange={(nextValue) => updateMargin("left", nextValue)}
          />

          <div class="grid grid-cols-[44px_minmax(0,1fr)_44px] grid-rows-[36px_1fr_36px] gap-1 rounded-md border border-dashed border-[#0f766e] bg-[#ecfdf5] p-2">
            <BoxModelLabel text="Padding" tone="padding" />
            <BoxModelInput
              label="Padding top"
              value={padding.top}
              onChange={(nextValue) => updatePadding("top", nextValue)}
            />
            <div />

            <BoxModelInput
              label="Padding left"
              value={padding.left}
              onChange={(nextValue) => updatePadding("left", nextValue)}
            />

            <div class="flex min-h-12 items-center justify-center rounded border border-[#cbd5e1] bg-white px-2">
              <span class="truncate text-[10px] font-bold uppercase tracking-wide text-gray-400">
                Content
              </span>
            </div>

            <BoxModelInput
              label="Padding right"
              value={padding.right}
              onChange={(nextValue) => updatePadding("right", nextValue)}
            />
            <div />
            <BoxModelInput
              label="Padding bottom"
              value={padding.bottom}
              onChange={(nextValue) => updatePadding("bottom", nextValue)}
            />
            <div />
          </div>

          <BoxModelInput
            label="Margin right"
            value={margin.right}
            onChange={(nextValue) => updateMargin("right", nextValue)}
          />
          <div />
          <BoxModelInput
            label="Margin bottom"
            value={margin.bottom}
            onChange={(nextValue) => updateMargin("bottom", nextValue)}
          />
          <div />
        </div>
      </div>
    </div>
  )
}

function BoxModelLabel({
  text,
  tone
}: {
  text: string
  tone: "margin" | "padding"
}) {
  return (
    <div
      class={`flex items-center text-[10px] font-bold uppercase tracking-wide ${
        tone === "margin" ? "text-[#b45309]" : "text-[#0f766e]"
      }`}
    >
      {text}
    </div>
  )
}

function BoxModelInput({
  label,
  value,
  onChange
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label class="block min-w-0" title={label}>
      <span class="sr-only">{label}</span>
      <input
        type="number"
        value={String(value)}
        min={0}
        max={240}
        aria-label={label}
        onInput={(event) => {
          const nextValue = Number(event.currentTarget.value)

          if (Number.isFinite(nextValue)) {
            onChange(Math.min(240, Math.max(0, nextValue)))
          }
        }}
        class="h-full min-h-8 w-full rounded border border-white/80 bg-white/90 px-1 text-center text-xs font-bold text-gray-900 outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10"
      />
    </label>
  )
}
