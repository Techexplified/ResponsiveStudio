import type {
  FigmaJsonValue,
  FigmaSerializedFrameV1,
  FigmaSerializedNodeV1,
  NormalizedFigmaDocument,
  NormalizedFigmaFrame,
  NormalizedFigmaNode,
  NormalizedLayoutMode,
  NormalizedNodeLayout,
  NormalizedNodeStyle,
  SerializedSpacing,
  ValidationIssue,
  ValidationResult
} from "./frameSchema"

type Bounds = {
  x: number
  y: number
  width: number
  height: number
  right: number
  bottom: number
  centerX: number
  centerY: number
}

type NormalizationContext = {
  warnings: string[]
}

type DenormalizeContext = {
  rootBounds: Bounds
  parentBounds: Bounds | null
  parentId: string | null
  parentLayoutMode: NormalizedLayoutMode | null
  depth: number
  siblingIndex: number
  siblingCount: number
  styles?: NormalizedFigmaDocument["styles"]
}

const defaultSpacing: SerializedSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

export function normalizeFigmaJson(input: unknown): NormalizedFigmaDocument {
  const result = deserializeNormalizedJson(input)

  if (!result.ok) {
    throw new Error(formatValidationErrors(result.errors))
  }

  return compactNormalizedDocument(result.value)
}

export function denormalizeFigmaJson(input: NormalizedFigmaDocument | NormalizedFigmaFrame): FigmaSerializedFrameV1 {
  const document = isNormalizedDocumentShape(input)
    ? input
    : {
        schemaVersion: 2,
        root: input
      } satisfies NormalizedFigmaDocument
  const rootGeometry = restoreGeometryDefaults(document.root.geometry)
  const rootBounds = createBounds(
    rootGeometry.x,
    rootGeometry.y,
    rootGeometry.width,
    rootGeometry.height
  )

  return {
    ...denormalizeNode(document.root, {
      rootBounds,
      parentBounds: null,
      parentId: null,
      parentLayoutMode: null,
      depth: 0,
      siblingIndex: 0,
      siblingCount: 1,
      styles: document.styles
    }),
    type: document.root.type,
    schemaVersion: 1,
    importedAt: new Date().toISOString()
  }
}

export function validateNormalizedJson(input: unknown): ValidationResult<NormalizedFigmaDocument> {
  const warnings: string[] = []
  const issues: ValidationIssue[] = []
  const document = readNormalizedDocument(input, "$", issues, warnings)

  if (document == null || issues.length > 0) {
    return {
      ok: false,
      errors: issues.length > 0
        ? issues
        : [{
            path: "$",
            message: "JSON must be a normalized schemaVersion 2 document."
          }],
      warnings
    }
  }

  return {
    ok: true,
    value: restoreNormalizedDocumentDefaults(document),
    warnings
  }
}

export function migrateV1ToV2(input: unknown): ValidationResult<NormalizedFigmaDocument> {
  const warnings: string[] = []

  if (!isFigmaSerializedFrameV1(input)) {
    return {
      ok: false,
      errors: [{
        path: "$",
        message: "Expected a schemaVersion 1 serialized frame."
      }],
      warnings
    }
  }

  const document = normalizeSerializedFrame(input, {
    warnings
  })

  return {
    ok: true,
    value: document,
    warnings
  }
}

export function serializeNormalizedJson(input: unknown): string {
  return JSON.stringify(normalizeFigmaJson(input), null, 2)
}

export function deserializeNormalizedJson(input: string | unknown): ValidationResult<NormalizedFigmaDocument> {
  const parsed: { ok: true; value: unknown } | { ok: false; error: string } = typeof input === "string"
    ? parseJson(input)
    : {
        ok: true,
        value: input
      }

  if (!parsed.ok) {
    return {
      ok: false,
      errors: [{
        path: "$",
        message: parsed.error
      }],
      warnings: []
    }
  }

  const directNormalized = validateNormalizedJson(parsed.value)

  if (directNormalized.ok) {
    return directNormalized
  }

  const directV1 = migrateV1ToV2(parsed.value)

  if (directV1.ok) {
    return directV1
  }

  const wrapper = asRecord(parsed.value)

  if (wrapper != null) {
    const frameValue = wrapper.frame
    const rootValue = wrapper.root
    const frameNormalized = validateNormalizedJson(frameValue)

    if (frameNormalized.ok) {
      return frameNormalized
    }

    const frameV1 = migrateV1ToV2(frameValue)

    if (frameV1.ok) {
      return frameV1
    }

    if (wrapper.schemaVersion === 2 && rootValue != null) {
      return validateNormalizedJson({
        schemaVersion: 2,
        root: rootValue
      })
    }
  }

  return {
    ok: false,
    errors: directNormalized.ok ? [] : directNormalized.errors,
    warnings: directNormalized.warnings
  }
}

function normalizeSerializedFrame(
  frame: FigmaSerializedFrameV1,
  context: NormalizationContext
): NormalizedFigmaDocument {
  const root = normalizeSerializedNode(frame, "$.root", true, context)

  return {
    schemaVersion: 2,
    root: {
      ...root,
      type: frame.type
    }
  }
}

function normalizeSerializedNode(
  node: FigmaSerializedNodeV1,
  path: string,
  isRoot: boolean,
  context: NormalizationContext
): NormalizedFigmaNode {
  const normalized: NormalizedFigmaNode = {
    id: node.id,
    name: node.name,
    type: node.type,
    geometry: normalizeGeometry(node.geometry),
    children: normalizeChildren(node.children, `${path}.children`, context)
  }
  const layout = normalizeLayout(node.layout)
  const style = normalizeStyle(node.style)
  const responsive = normalizeResponsive(node, isRoot)

  if (node.originalFigmaId != null) {
    normalized.originalFigmaId = node.originalFigmaId
  }

  if (node.visible === false) {
    normalized.visible = false
  }

  if (node.locked === true) {
    normalized.locked = true
  }

  if (!isEmptyRecord(layout)) {
    normalized.layout = layout
  }

  if (!isEmptyRecord(style)) {
    normalized.style = style
  }

  if (node.text != null) {
    normalized.text = cloneJsonObject(node.text)
  }

  if (responsive != null) {
    normalized.responsive = responsive
  }

  if (node.component != null) {
    normalized.component = cloneJsonValue(node.component)
  }

  if (node.instance != null) {
    normalized.instance = cloneJsonValue(node.instance)
  }

  if (node.metadata != null) {
    normalized.metadata = cloneJsonObject(node.metadata)
  }

  return normalized
}

function normalizeGeometry(geometry: FigmaSerializedNodeV1["geometry"]): NormalizedFigmaNode["geometry"] {
  const normalized: NormalizedFigmaNode["geometry"] = {
    x: roundLayoutNumber(geometry.x),
    y: roundLayoutNumber(geometry.y),
    width: roundLayoutNumber(geometry.width),
    height: roundLayoutNumber(geometry.height)
  }

  if (geometry.rotation !== 0) {
    normalized.rotation = roundLayoutNumber(geometry.rotation)
  }

  return normalized
}

function normalizeLayout(layout: FigmaSerializedNodeV1["layout"]): NormalizedNodeLayout {
  const normalized: NormalizedNodeLayout = {}
  const mode = readLayoutMode(layout.layoutMode ?? layout.autoLayoutDirection) ?? "NONE"

  if (mode !== "NONE") {
    normalized.mode = mode
  }

  if (layout.constraints != null && !isDefaultMinConstraints(layout.constraints)) {
    normalized.constraints = cloneJsonValue(layout.constraints)
  }

  if (layout.layoutSizingHorizontal != null && layout.layoutSizingHorizontal !== "FIXED") {
    normalized.horizontalSizing = layout.layoutSizingHorizontal
  }

  if (layout.layoutSizingVertical != null && layout.layoutSizingVertical !== "FIXED") {
    normalized.verticalSizing = layout.layoutSizingVertical
  }

  if (typeof layout.layoutGrow === "number" && layout.layoutGrow !== 0) {
    normalized.grow = layout.layoutGrow
  }

  if (layout.layoutAlign != null && layout.layoutAlign !== "INHERIT") {
    normalized.align = layout.layoutAlign
  }

  if (typeof layout.itemSpacing === "number" && layout.itemSpacing !== 0) {
    normalized.gap = layout.itemSpacing
  }

  if (typeof layout.counterAxisSpacing === "number" && layout.counterAxisSpacing !== 0) {
    normalized.counterGap = layout.counterAxisSpacing
  }

  if (layout.primaryAxisAlignItems != null && layout.primaryAxisAlignItems !== "MIN") {
    normalized.primaryAlign = layout.primaryAxisAlignItems
  }

  if (layout.counterAxisAlignItems != null && layout.counterAxisAlignItems !== "MIN") {
    normalized.counterAlign = layout.counterAxisAlignItems
  }

  if (layout.layoutWrap === "WRAP") {
    normalized.wrap = true
  }

  if (layout.padding != null && !isDefaultSpacing(layout.padding)) {
    normalized.padding = cloneSpacing(layout.padding)
  }

  if (layout.margin != null && !isDefaultSpacing(layout.margin)) {
    normalized.margin = cloneSpacing(layout.margin)
  }

  addAxisSizingIfNeeded(normalized, layout, mode)

  return normalized
}

function addAxisSizingIfNeeded(
  normalized: NormalizedNodeLayout,
  layout: FigmaSerializedNodeV1["layout"],
  mode: NormalizedLayoutMode
) {
  const inferredPrimary = inferPrimaryAxisSizing(layout, mode)
  const inferredCounter = inferCounterAxisSizing(layout, mode)

  if (layout.primaryAxisSizingMode != null && layout.primaryAxisSizingMode !== inferredPrimary) {
    normalized.primarySizing = layout.primaryAxisSizingMode
  }

  if (layout.counterAxisSizingMode != null && layout.counterAxisSizingMode !== inferredCounter) {
    normalized.counterSizing = layout.counterAxisSizingMode
  }
}

function normalizeStyle(style: FigmaSerializedNodeV1["style"]): NormalizedNodeStyle {
  const normalized: NormalizedNodeStyle = {}

  if (typeof style.opacity === "number" && style.opacity !== 1) {
    normalized.opacity = style.opacity
  }

  if (style.blendMode != null && style.blendMode !== "PASS_THROUGH") {
    normalized.blendMode = style.blendMode
  }

  if (style.fills != null && !isEmptyJsonArray(style.fills)) {
    normalized.fills = compactPaintArray(style.fills)
  }

  if (style.strokes != null && !isEmptyJsonArray(style.strokes)) {
    normalized.strokes = compactPaintArray(style.strokes)
  }

  if (typeof style.strokeWeight === "number" && style.strokeWeight !== 1) {
    normalized.strokeWeight = style.strokeWeight
  }

  if (style.cornerRadius != null && style.cornerRadius !== 0) {
    normalized.cornerRadius = style.cornerRadius
  }

  if (style.effects != null && !isEmptyJsonArray(style.effects)) {
    normalized.effects = cloneJsonValue(style.effects)
  }

  return normalized
}

function normalizeResponsive(
  node: FigmaSerializedNodeV1,
  isRoot: boolean
): FigmaSerializedNodeV1["responsive"] | undefined {
  const source = node.responsive

  if (source == null) {
    return undefined
  }

  const responsive: NonNullable<FigmaSerializedNodeV1["responsive"]> = {
    ...source
  }
  const inferredConversionRole = inferResponsiveConversionRole(node)
  const inferredAcceptsChildren = inferAcceptsChildren(node)

  if (isRoot && responsive.groupRole === "root") {
    delete responsive.groupRole
  }

  if (responsive.conversionRole === inferredConversionRole) {
    delete responsive.conversionRole
  }

  if (responsive.acceptsChildren === inferredAcceptsChildren) {
    delete responsive.acceptsChildren
  }

  return isEmptyRecord(responsive) ? undefined : cloneJsonObject(responsive)
}

function normalizeChildren(
  children: FigmaSerializedNodeV1[],
  path: string,
  context: NormalizationContext
): NormalizedFigmaNode[] {
  const normalizedChildren: NormalizedFigmaNode[] = []
  const firstIndexesById = new Map<string, number>()

  children.forEach((child, index) => {
    const childPath = `${path}[${index}]`
    const normalizedChild = normalizeSerializedNode(child, childPath, false, context)
    const existingIndex = firstIndexesById.get(normalizedChild.id)

    if (existingIndex == null) {
      firstIndexesById.set(normalizedChild.id, normalizedChildren.length)
      normalizedChildren.push(normalizedChild)
      return
    }

    const warning = `Duplicate node id "${normalizedChild.id}" at ${childPath}; keeping first occurrence.`

    context.warnings.push(warning)
    console.warn(warning)
    normalizedChildren[existingIndex] = mergeDuplicateNode(
      normalizedChildren[existingIndex],
      normalizedChild,
      `${path}[${existingIndex}]`,
      context
    )
  })

  return normalizedChildren
}

function mergeDuplicateNode(
  first: NormalizedFigmaNode,
  later: NormalizedFigmaNode,
  path: string,
  context: NormalizationContext
): NormalizedFigmaNode {
  return mergeRecordValues(first, later, path, context) as NormalizedFigmaNode
}

function mergeRecordValues<T extends Record<string, unknown>>(
  first: T,
  later: T,
  path: string,
  context: NormalizationContext
): T {
  const merged: Record<string, unknown> = {
    ...first
  }

  for (const [key, laterValue] of Object.entries(later)) {
    const nextPath = `${path}.${key}`
    const firstValue = merged[key]

    if (firstValue == null) {
      merged[key] = laterValue
      continue
    }

    if (valuesAreEqual(firstValue, laterValue)) {
      continue
    }

    if (isMergeableObject(firstValue) && isMergeableObject(laterValue)) {
      merged[key] = mergeRecordValues(firstValue, laterValue, nextPath, context)
      continue
    }

    const warning = `Duplicate node id conflict at ${nextPath}; kept first value.`

    context.warnings.push(warning)
    console.warn(warning)
  }

  return merged as T
}

function denormalizeNode(
  node: NormalizedFigmaNode,
  context: DenormalizeContext
): FigmaSerializedNodeV1 {
  const geometry = restoreGeometryDefaults(node.geometry)
  const absoluteBounds = context.parentBounds == null
    ? createBounds(geometry.x, geometry.y, geometry.width, geometry.height)
    : createBounds(
        context.parentBounds.x + geometry.x,
        context.parentBounds.y + geometry.y,
        geometry.width,
        geometry.height
      )
  const parentRelativeBounds = context.parentBounds == null
    ? createBounds(0, 0, geometry.width, geometry.height)
    : createBounds(geometry.x, geometry.y, geometry.width, geometry.height)
  const rootRelativeBounds = createBounds(
    absoluteBounds.x - context.rootBounds.x,
    absoluteBounds.y - context.rootBounds.y,
    geometry.width,
    geometry.height
  )
  const nodeChildren = getNodeChildren(node)
  const layout = denormalizeLayout(node.layout, context.parentLayoutMode)
  const children = nodeChildren.map((child, index) => denormalizeNode(child, {
    ...context,
    parentBounds: absoluteBounds,
    parentId: node.id,
    parentLayoutMode: layout.layoutMode === "GRID" || layout.layoutMode === "HORIZONTAL" || layout.layoutMode === "VERTICAL"
      ? layout.layoutMode
      : null,
    depth: context.depth + 1,
    siblingIndex: index,
    siblingCount: nodeChildren.length
  }))

  return {
    id: node.id,
    originalFigmaId: node.originalFigmaId,
    name: node.name,
    type: node.type,
    responsive: denormalizeResponsive(node, context.depth === 0),
    visible: node.visible ?? true,
    locked: node.locked ?? false,
    geometry: {
      x: geometry.x,
      y: geometry.y,
      width: geometry.width,
      height: geometry.height,
      rotation: geometry.rotation,
      absoluteBounds,
      parentRelativeBounds,
      rootRelativeBounds,
      percentOfParent: context.parentBounds == null
        ? undefined
        : getPercentBounds(parentRelativeBounds, context.parentBounds),
      percentOfRoot: getPercentBounds(rootRelativeBounds, context.rootBounds),
      hierarchy: {
        parentId: context.parentId,
        depth: context.depth,
        siblingIndex: context.siblingIndex,
        siblingCount: context.siblingCount
      }
    },
    layout,
    style: denormalizeStyle(node, context.styles),
    text: node.text == null ? undefined : cloneJsonObject(node.text),
    component: node.component == null ? undefined : cloneJsonValue(node.component),
    instance: node.instance == null ? undefined : cloneJsonValue(node.instance),
    metadata: node.metadata == null ? undefined : cloneJsonObject(node.metadata),
    children
  }
}

function denormalizeLayout(
  layout: NormalizedNodeLayout | undefined,
  parentLayoutMode: NormalizedLayoutMode | null
): FigmaSerializedNodeV1["layout"] {
  const mode = getStoredLayoutMode(layout)
  const horizontalSizing = layout?.horizontalSizing ?? inferNodeAxisLayoutSizing(layout, mode, "horizontal", parentLayoutMode)
  const verticalSizing = layout?.verticalSizing ?? inferNodeAxisLayoutSizing(layout, mode, "vertical", parentLayoutMode)
  const primarySizing = layout?.primarySizing ?? inferPrimaryAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing)
  const counterSizing = layout?.counterSizing ?? inferCounterAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing)

  return {
    isAutoLayout: layout?.isAutoLayout ?? isLayoutModeActive(mode),
    autoLayoutDirection: mode,
    constraints: layout?.constraints == null ? undefined : cloneJsonValue(layout.constraints),
    layoutMode: mode,
    layoutAlign: layout?.align ?? "INHERIT",
    layoutGrow: layout?.grow ?? 0,
    layoutSizingHorizontal: horizontalSizing,
    layoutSizingVertical: verticalSizing,
    itemSpacing: layout?.gap ?? 0,
    counterAxisSpacing: layout?.counterGap,
    primaryAxisAlignItems: layout?.primaryAlign ?? "MIN",
    counterAxisAlignItems: layout?.counterAlign ?? "MIN",
    layoutWrap: layout?.wrap === true ? "WRAP" : "NO_WRAP",
    padding: layout?.padding == null ? cloneSpacing(defaultSpacing) : cloneSpacing(layout.padding),
    margin: layout?.margin,
    primaryAxisSizingMode: primarySizing,
    counterAxisSizingMode: counterSizing
  }
}

function denormalizeStyle(
  node: NormalizedFigmaNode,
  styles: NormalizedFigmaDocument["styles"] | undefined
): FigmaSerializedNodeV1["style"] {
  const styleFromRegistry = node.styleRef == null ? undefined : styles?.[node.styleRef]
  const style = {
    ...styleFromRegistry,
    ...node.style
  }

  return {
    opacity: style.opacity ?? 1,
    blendMode: style.blendMode ?? "PASS_THROUGH",
    fills: style.fills == null ? undefined : restorePaintArray(style.fills),
    strokes: style.strokes == null ? undefined : restorePaintArray(style.strokes),
    strokeWeight: style.strokeWeight ?? 1,
    cornerRadius: style.cornerRadius ?? 0,
    effects: style.effects == null ? undefined : cloneJsonValue(style.effects)
  }
}

function denormalizeResponsive(
  node: NormalizedFigmaNode,
  isRoot: boolean
): FigmaSerializedNodeV1["responsive"] {
  const responsive: NonNullable<FigmaSerializedNodeV1["responsive"]> = {
    ...node.responsive
  }

  if (isRoot && responsive.groupRole == null) {
    responsive.groupRole = "root"
  }

  if (responsive.conversionRole == null) {
    responsive.conversionRole = inferResponsiveConversionRole({
      type: node.type,
      responsive: node.responsive,
      children: getNodeChildren(node),
      layout: denormalizeLayout(node.layout, null)
    })
  }

  if (responsive.acceptsChildren == null) {
    responsive.acceptsChildren = inferAcceptsChildren(node)
  }

  return responsive
}

function readNormalizedDocument(
  input: unknown,
  path: string,
  issues: ValidationIssue[],
  warnings: string[]
): NormalizedFigmaDocument | null {
  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected an object."
    })
    return null
  }

  if (record.schemaVersion !== 2) {
    issues.push({
      path: `${path}.schemaVersion`,
      message: "Expected schemaVersion 2."
    })
  }

  const root = readNormalizedNode(record.root, `${path}.root`, issues, warnings, true)
  const styles = readStyles(record.styles, `${path}.styles`, issues)

  if (root == null) {
    return null
  }

  if (root.type !== "FRAME" && root.type !== "COMPONENT" && root.type !== "INSTANCE") {
    issues.push({
      path: `${path}.root.type`,
      message: "Root node type must be FRAME, COMPONENT, or INSTANCE."
    })
  }

  return styles == null
    ? {
        schemaVersion: 2,
        root: root as NormalizedFigmaFrame
      }
    : {
        schemaVersion: 2,
        root: root as NormalizedFigmaFrame,
        styles
      }
}

function readNormalizedNode(
  input: unknown,
  path: string,
  issues: ValidationIssue[],
  warnings: string[],
  _isRoot = false
): NormalizedFigmaNode | null {
  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected a node object."
    })
    return null
  }

  const id = readRequiredString(record.id, `${path}.id`, issues)
  const name = readRequiredString(record.name, `${path}.name`, issues)
  const type = readRequiredString(record.type, `${path}.type`, issues)
  const geometry = readGeometry(record.geometry, `${path}.geometry`, issues)
  const children = readChildren(record.children, `${path}.children`, issues, warnings)

  if (id == null || name == null || type == null || geometry == null || children == null) {
    return null
  }

  const node: NormalizedFigmaNode = {
    id,
    name,
    type,
    geometry,
    children
  }
  const originalFigmaId = readOptionalString(record.originalFigmaId, `${path}.originalFigmaId`, issues)
  const visible = readOptionalBoolean(record.visible, `${path}.visible`, issues)
  const locked = readOptionalBoolean(record.locked, `${path}.locked`, issues)
  const layout = readLayout(record.layout, `${path}.layout`, issues)
  const style = readStyle(record.style, `${path}.style`, issues)
  const styleRef = readOptionalString(record.styleRef, `${path}.styleRef`, issues)
  const text = readText(record.text, `${path}.text`, issues)
  const responsive = readResponsive(record.responsive, `${path}.responsive`, issues)
  const component = readOptionalJsonValue(record.component, `${path}.component`, issues)
  const instance = readOptionalJsonValue(record.instance, `${path}.instance`, issues)
  const metadata = readMetadata(record.metadata, `${path}.metadata`, issues)

  if (originalFigmaId != null) {
    node.originalFigmaId = originalFigmaId
  }

  if (visible != null) {
    node.visible = visible
  }

  if (locked != null) {
    node.locked = locked
  }

  if (layout != null) {
    node.layout = layout
  }

  if (style != null) {
    node.style = style
  }

  if (styleRef != null) {
    node.styleRef = styleRef
  }

  if (text !== missingValue) {
    node.text = text
  }

  if (responsive != null) {
    node.responsive = responsive
  }

  if (component != null) {
    node.component = component
  }

  if (instance != null) {
    node.instance = instance
  }

  if (metadata != null) {
    node.metadata = metadata
  }

  return node
}

function readGeometry(
  input: unknown,
  path: string,
  issues: ValidationIssue[]
): NormalizedFigmaNode["geometry"] | null {
  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected geometry object."
    })
    return null
  }

  const x = readRequiredNumber(record.x, `${path}.x`, issues)
  const y = readRequiredNumber(record.y, `${path}.y`, issues)
  const width = readRequiredNumber(record.width, `${path}.width`, issues)
  const height = readRequiredNumber(record.height, `${path}.height`, issues)
  const rotation = readOptionalNumber(record.rotation, `${path}.rotation`, issues)

  if (x == null || y == null || width == null || height == null) {
    return null
  }

  return rotation == null
    ? {
        x,
        y,
        width,
        height
      }
    : {
        x,
        y,
        width,
        height,
        rotation
      }
}

function readChildren(
  input: unknown,
  path: string,
  issues: ValidationIssue[],
  warnings: string[]
): NormalizedFigmaNode[] | null {
  if (input == null) {
    return []
  }

  if (!Array.isArray(input)) {
    issues.push({
      path,
      message: "Expected children array."
    })
    return null
  }

  const children: NormalizedFigmaNode[] = []

  input.forEach((child, index) => {
    const node = readNormalizedNode(child, `${path}[${index}]`, issues, warnings)

    if (node != null) {
      children.push(node)
    }
  })

  return children
}

function readLayout(
  input: unknown,
  path: string,
  issues: ValidationIssue[]
): NormalizedNodeLayout | undefined {
  if (input == null) {
    return undefined
  }

  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected layout object."
    })
    return undefined
  }

  const layout: NormalizedNodeLayout = {}
  const mode = readOptionalLayoutMode(record.mode, `${path}.mode`, issues)
  const isAutoLayout = readOptionalBoolean(record.isAutoLayout, `${path}.isAutoLayout`, issues)
  const constraints = readOptionalJsonValue(record.constraints, `${path}.constraints`, issues)
  const horizontalSizing = readOptionalString(record.horizontalSizing, `${path}.horizontalSizing`, issues)
  const verticalSizing = readOptionalString(record.verticalSizing, `${path}.verticalSizing`, issues)
  const grow = readOptionalNumber(record.grow, `${path}.grow`, issues)
  const align = readOptionalString(record.align, `${path}.align`, issues)
  const gap = readOptionalNumber(record.gap, `${path}.gap`, issues)
  const counterGap = readOptionalNumber(record.counterGap ?? record.counterAxisSpacing, `${path}.counterGap`, issues)
  const primaryAlign = readOptionalString(record.primaryAlign, `${path}.primaryAlign`, issues)
  const counterAlign = readOptionalString(record.counterAlign, `${path}.counterAlign`, issues)
  const wrap = readOptionalBoolean(record.wrap, `${path}.wrap`, issues)
  const padding = readSpacing(record.padding, `${path}.padding`, issues)
  const margin = readSpacing(record.margin, `${path}.margin`, issues)
  const primarySizing = readOptionalString(record.primarySizing ?? record.primaryAxisSizingMode, `${path}.primarySizing`, issues)
  const counterSizing = readOptionalString(record.counterSizing ?? record.counterAxisSizingMode, `${path}.counterSizing`, issues)

  if (mode != null) {
    layout.mode = mode
  }

  if (isAutoLayout != null) {
    layout.isAutoLayout = isAutoLayout
  }

  if (constraints != null) {
    layout.constraints = constraints
  }

  if (horizontalSizing != null) {
    layout.horizontalSizing = horizontalSizing
  }

  if (verticalSizing != null) {
    layout.verticalSizing = verticalSizing
  }

  if (grow != null) {
    layout.grow = grow
  }

  if (align != null) {
    layout.align = align
  }

  if (gap != null) {
    layout.gap = gap
  }

  if (counterGap != null) {
    layout.counterGap = counterGap
  }

  if (primaryAlign != null) {
    layout.primaryAlign = primaryAlign
  }

  if (counterAlign != null) {
    layout.counterAlign = counterAlign
  }

  if (wrap != null) {
    layout.wrap = wrap
  }

  if (padding != null) {
    layout.padding = padding
  }

  if (margin != null) {
    layout.margin = margin
  }

  if (primarySizing != null) {
    layout.primarySizing = primarySizing
  }

  if (counterSizing != null) {
    layout.counterSizing = counterSizing
  }

  return layout
}

function readStyle(
  input: unknown,
  path: string,
  issues: ValidationIssue[]
): NormalizedNodeStyle | undefined {
  if (input == null) {
    return undefined
  }

  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected style object."
    })
    return undefined
  }

  const style: NormalizedNodeStyle = {}
  const opacity = readOptionalNumber(record.opacity, `${path}.opacity`, issues)
  const blendMode = readOptionalString(record.blendMode, `${path}.blendMode`, issues)
  const fills = readOptionalJsonValue(record.fills, `${path}.fills`, issues)
  const strokes = readOptionalJsonValue(record.strokes, `${path}.strokes`, issues)
  const strokeWeight = readOptionalNumber(record.strokeWeight, `${path}.strokeWeight`, issues)
  const cornerRadius = readOptionalNumberOrString(record.cornerRadius, `${path}.cornerRadius`, issues)
  const effects = readOptionalJsonValue(record.effects, `${path}.effects`, issues)

  if (opacity != null) {
    style.opacity = opacity
  }

  if (blendMode != null) {
    style.blendMode = blendMode
  }

  if (fills != null) {
    style.fills = fills
  }

  if (strokes != null) {
    style.strokes = strokes
  }

  if (strokeWeight != null) {
    style.strokeWeight = strokeWeight
  }

  if (cornerRadius != null) {
    style.cornerRadius = cornerRadius
  }

  if (effects != null) {
    style.effects = effects
  }

  return style
}

const missingValue = Symbol("missing")

function readText(
  input: unknown,
  path: string,
  issues: ValidationIssue[]
): FigmaSerializedNodeV1["text"] | null | typeof missingValue {
  if (input === undefined) {
    return missingValue
  }

  if (input === null) {
    return null
  }

  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected text object or null."
    })
    return missingValue
  }

  const characters = readRequiredString(record.characters, `${path}.characters`, issues)
  const fontSize = readOptionalNumberOrString(record.fontSize, `${path}.fontSize`, issues)
  const fontName = readOptionalJsonValue(record.fontName, `${path}.fontName`, issues)
  const fontWeight = readOptionalNumber(record.fontWeight, `${path}.fontWeight`, issues)
  const textAlignHorizontal = readOptionalString(record.textAlignHorizontal, `${path}.textAlignHorizontal`, issues)
  const textAlignVertical = readOptionalString(record.textAlignVertical, `${path}.textAlignVertical`, issues)
  const lineHeight = readOptionalJsonValue(record.lineHeight, `${path}.lineHeight`, issues)
  const letterSpacing = readOptionalJsonValue(record.letterSpacing, `${path}.letterSpacing`, issues)

  if (characters == null) {
    return missingValue
  }

  return {
    characters,
    fontSize,
    fontName,
    fontWeight,
    textAlignHorizontal,
    textAlignVertical,
    lineHeight,
    letterSpacing
  }
}

function readResponsive(
  input: unknown,
  path: string,
  issues: ValidationIssue[]
): FigmaSerializedNodeV1["responsive"] | undefined {
  if (input == null) {
    return undefined
  }

  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected responsive object."
    })
    return undefined
  }

  const responsive: NonNullable<FigmaSerializedNodeV1["responsive"]> = {}
  const isVirtualGroup = readOptionalBoolean(record.isVirtualGroup, `${path}.isVirtualGroup`, issues)
  const groupRole = readOptionalResponsiveGroupRole(record.groupRole, `${path}.groupRole`, issues)
  const conversionRole = readOptionalResponsiveConversionRole(record.conversionRole, `${path}.conversionRole`, issues)
  const acceptsChildren = readOptionalBoolean(record.acceptsChildren, `${path}.acceptsChildren`, issues)
  const createdByUser = readOptionalBoolean(record.createdByUser, `${path}.createdByUser`, issues)
  const nodeRule = readResponsiveNodeRule(record.nodeRule, `${path}.nodeRule`, issues)

  if (isVirtualGroup != null) {
    responsive.isVirtualGroup = isVirtualGroup
  }

  if (groupRole != null) {
    responsive.groupRole = groupRole
  }

  if (conversionRole != null) {
    responsive.conversionRole = conversionRole
  }

  if (acceptsChildren != null) {
    responsive.acceptsChildren = acceptsChildren
  }

  if (createdByUser != null) {
    responsive.createdByUser = createdByUser
  }

  if (nodeRule != null) {
    responsive.nodeRule = nodeRule
  }

  return responsive
}

function readResponsiveNodeRule(
  input: unknown,
  path: string,
  issues: ValidationIssue[]
): FigmaSerializedNodeV1["responsive"] extends { nodeRule?: infer T } ? T : never | undefined {
  if (input == null) {
    return undefined
  }

  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected responsive node rule object."
    })
    return undefined
  }

  const enabled = readRequiredBoolean(record.enabled, `${path}.enabled`, issues)
  const conversionDirection = record.conversionDirection === "column-to-row" ? "column-to-row" : record.conversionDirection === "row-to-column" ? "row-to-column" : null
  const rowToColumnMode = record.rowToColumnMode === "always" || record.rowToColumnMode === "never" || record.rowToColumnMode === "auto"
    ? record.rowToColumnMode
    : null
  const rowToColumnBreakpoint = readRequiredNumber(record.rowToColumnBreakpoint, `${path}.rowToColumnBreakpoint`, issues)
  const stackGap = readRequiredNumber(record.stackGap, `${path}.stackGap`, issues)
  const stackAlignment = record.stackAlignment === "center" || record.stackAlignment === "stretch" || record.stackAlignment === "start"
    ? record.stackAlignment
    : null

  if (conversionDirection == null) {
    issues.push({
      path: `${path}.conversionDirection`,
      message: "Expected row-to-column or column-to-row."
    })
  }

  if (rowToColumnMode == null) {
    issues.push({
      path: `${path}.rowToColumnMode`,
      message: "Expected auto, always, or never."
    })
  }

  if (stackAlignment == null) {
    issues.push({
      path: `${path}.stackAlignment`,
      message: "Expected start, center, or stretch."
    })
  }

  if (
    enabled == null ||
    conversionDirection == null ||
    rowToColumnMode == null ||
    rowToColumnBreakpoint == null ||
    stackGap == null ||
    stackAlignment == null
  ) {
    return undefined
  }

  return {
    enabled,
    conversionDirection,
    rowToColumnMode,
    rowToColumnBreakpoint,
    stackGap,
    stackAlignment
  } as FigmaSerializedNodeV1["responsive"] extends { nodeRule?: infer T } ? T : never
}

function readStyles(
  input: unknown,
  path: string,
  issues: ValidationIssue[]
): NormalizedFigmaDocument["styles"] | undefined {
  if (input == null) {
    return undefined
  }

  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected styles object."
    })
    return undefined
  }

  const styles: NonNullable<NormalizedFigmaDocument["styles"]> = {}

  for (const [key, value] of Object.entries(record)) {
    styles[key] = readStyle(value, `${path}.${key}`, issues) ?? {}
  }

  return styles
}

function readSpacing(
  input: unknown,
  path: string,
  issues: ValidationIssue[]
): SerializedSpacing | undefined {
  if (input == null) {
    return undefined
  }

  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected spacing object."
    })
    return undefined
  }

  const top = readRequiredNumber(record.top, `${path}.top`, issues)
  const right = readRequiredNumber(record.right, `${path}.right`, issues)
  const bottom = readRequiredNumber(record.bottom, `${path}.bottom`, issues)
  const left = readRequiredNumber(record.left, `${path}.left`, issues)

  if (top == null || right == null || bottom == null || left == null) {
    return undefined
  }

  return {
    top,
    right,
    bottom,
    left
  }
}

function readMetadata(
  input: unknown,
  path: string,
  issues: ValidationIssue[]
): NormalizedFigmaNode["metadata"] | undefined {
  if (input == null) {
    return undefined
  }

  const record = asRecord(input)

  if (record == null) {
    issues.push({
      path,
      message: "Expected metadata object."
    })
    return undefined
  }

  const metadata: NonNullable<NormalizedFigmaNode["metadata"]> = {}

  for (const [key, value] of Object.entries(record)) {
    if (isFigmaJsonValue(value)) {
      metadata[key] = cloneJsonValue(value)
      continue
    }

    issues.push({
      path: `${path}.${key}`,
      message: "Expected JSON-compatible metadata value."
    })
  }

  return metadata
}

function restoreNormalizedDocumentDefaults(document: NormalizedFigmaDocument): NormalizedFigmaDocument {
  return {
    ...document,
    root: restoreNormalizedNodeDefaults(document.root) as NormalizedFigmaFrame
  }
}

function restoreNormalizedNodeDefaults(
  node: NormalizedFigmaNode,
  parentLayoutMode: NormalizedLayoutMode | null = null
): NormalizedFigmaNode {
  const layout = restoreLayoutDefaults(node.layout, parentLayoutMode)
  const nextParentLayoutMode = isLayoutModeActive(layout.mode ?? "NONE")
    ? layout.mode ?? "NONE"
    : null

  return {
    ...node,
    visible: node.visible ?? true,
    locked: node.locked ?? false,
    geometry: restoreGeometryDefaults(node.geometry),
    layout,
    style: restoreStyleDefaults(node.style),
    text: node.text ?? null,
    children: getNodeChildren(node).map((child) => restoreNormalizedNodeDefaults(child, nextParentLayoutMode))
  }
}

function restoreGeometryDefaults(geometry: NormalizedFigmaNode["geometry"]): Required<NormalizedFigmaNode["geometry"]> {
  return {
    x: geometry.x,
    y: geometry.y,
    width: geometry.width,
    height: geometry.height,
    rotation: geometry.rotation ?? 0
  }
}

function restoreLayoutDefaults(
  layout: NormalizedNodeLayout | undefined,
  parentLayoutMode: NormalizedLayoutMode | null
): NormalizedNodeLayout {
  const mode = getStoredLayoutMode(layout)
  const horizontalSizing = layout?.horizontalSizing ?? inferNodeAxisLayoutSizing(layout, mode, "horizontal", parentLayoutMode)
  const verticalSizing = layout?.verticalSizing ?? inferNodeAxisLayoutSizing(layout, mode, "vertical", parentLayoutMode)

  return {
    isAutoLayout: layout?.isAutoLayout ?? isLayoutModeActive(mode),
    mode,
    constraints: layout?.constraints,
    horizontalSizing,
    verticalSizing,
    grow: layout?.grow ?? 0,
    align: layout?.align ?? "INHERIT",
    gap: layout?.gap ?? 0,
    counterGap: layout?.counterGap,
    primaryAlign: layout?.primaryAlign ?? "MIN",
    counterAlign: layout?.counterAlign ?? "MIN",
    wrap: layout?.wrap ?? false,
    padding: layout?.padding == null ? cloneSpacing(defaultSpacing) : cloneSpacing(layout.padding),
    margin: layout?.margin,
    primarySizing: layout?.primarySizing ?? inferPrimaryAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing),
    counterSizing: layout?.counterSizing ?? inferCounterAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing)
  }
}

function restoreStyleDefaults(style: NormalizedNodeStyle | undefined): NormalizedNodeStyle {
  return {
    opacity: style?.opacity ?? 1,
    blendMode: style?.blendMode ?? "PASS_THROUGH",
    fills: style?.fills,
    strokes: style?.strokes,
    strokeWeight: style?.strokeWeight ?? 1,
    cornerRadius: style?.cornerRadius ?? 0,
    effects: style?.effects
  }
}

function compactNormalizedDocument(document: NormalizedFigmaDocument): NormalizedFigmaDocument {
  const compactRoot = compactNormalizedNode(document.root)

  return document.styles == null
    ? {
        schemaVersion: 2,
        root: compactRoot as NormalizedFigmaFrame
      }
    : {
        schemaVersion: 2,
        styles: compactStyles(document.styles),
        root: compactRoot as NormalizedFigmaFrame
      }
}

function compactNormalizedNode(node: NormalizedFigmaNode): NormalizedFigmaNode {
  const children = getNodeChildren(node).map((child) => compactNormalizedNode(child))
  const compact: NormalizedFigmaNode = {
    id: node.id,
    name: node.name,
    type: node.type,
    geometry: compactGeometry(node.geometry)
  }
  const layout = compactLayout(node.layout)
  const style = compactStyle(node.style)
  const responsive = compactResponsive(node.responsive)

  if (node.originalFigmaId != null) {
    compact.originalFigmaId = node.originalFigmaId
  }

  if (node.visible === false) {
    compact.visible = false
  }

  if (node.locked === true) {
    compact.locked = true
  }

  if (layout != null) {
    compact.layout = layout
  }

  if (style != null) {
    compact.style = style
  }

  if (node.styleRef != null) {
    compact.styleRef = node.styleRef
  }

  if (node.text != null) {
    compact.text = cloneJsonObject(node.text)
  }

  if (responsive != null) {
    compact.responsive = responsive
  }

  if (node.component != null) {
    compact.component = cloneJsonValue(node.component)
  }

  if (node.instance != null) {
    compact.instance = cloneJsonValue(node.instance)
  }

  if (node.metadata != null) {
    compact.metadata = cloneJsonObject(node.metadata)
  }

  if (children.length > 0) {
    compact.children = children
  }

  return compact
}

function compactGeometry(geometry: NormalizedFigmaNode["geometry"]): NormalizedFigmaNode["geometry"] {
  const compact: NormalizedFigmaNode["geometry"] = {
    x: roundLayoutNumber(geometry.x),
    y: roundLayoutNumber(geometry.y),
    width: roundLayoutNumber(geometry.width),
    height: roundLayoutNumber(geometry.height)
  }

  if ((geometry.rotation ?? 0) !== 0) {
    compact.rotation = roundLayoutNumber(geometry.rotation ?? 0)
  }

  return compact
}

function compactLayout(layout: NormalizedNodeLayout | undefined): NormalizedNodeLayout | undefined {
  if (layout == null) {
    return undefined
  }

  const compact: NormalizedNodeLayout = {}

  if (layout.mode != null && layout.mode !== "NONE") {
    compact.mode = layout.mode
  }

  if (layout.constraints != null && !isDefaultMinConstraints(layout.constraints)) {
    compact.constraints = cloneJsonValue(layout.constraints)
  }

  if (layout.horizontalSizing != null && layout.horizontalSizing !== "FIXED") {
    compact.horizontalSizing = layout.horizontalSizing
  }

  if (layout.verticalSizing != null && layout.verticalSizing !== "FIXED") {
    compact.verticalSizing = layout.verticalSizing
  }

  if ((layout.grow ?? 0) !== 0) {
    compact.grow = layout.grow
  }

  if (layout.align != null && layout.align !== "INHERIT") {
    compact.align = layout.align
  }

  if ((layout.gap ?? 0) !== 0) {
    compact.gap = layout.gap
  }

  if ((layout.counterGap ?? 0) !== 0) {
    compact.counterGap = layout.counterGap
  }

  if (layout.primaryAlign != null && layout.primaryAlign !== "MIN") {
    compact.primaryAlign = layout.primaryAlign
  }

  if (layout.counterAlign != null && layout.counterAlign !== "MIN") {
    compact.counterAlign = layout.counterAlign
  }

  if (layout.wrap === true) {
    compact.wrap = true
  }

  if (layout.padding != null && !isDefaultSpacing(layout.padding)) {
    compact.padding = cloneSpacing(layout.padding)
  }

  if (layout.margin != null && !isDefaultSpacing(layout.margin)) {
    compact.margin = cloneSpacing(layout.margin)
  }

  const mode = getStoredLayoutMode(layout)
  const horizontalSizing = layout.horizontalSizing ?? inferNodeAxisLayoutSizing(layout, mode, "horizontal", null)
  const verticalSizing = layout.verticalSizing ?? inferNodeAxisLayoutSizing(layout, mode, "vertical", null)
  const inferredPrimary = inferPrimaryAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing)
  const inferredCounter = inferCounterAxisSizingFromLayoutSizing(mode, horizontalSizing, verticalSizing)

  if (layout.primarySizing != null && layout.primarySizing !== inferredPrimary) {
    compact.primarySizing = layout.primarySizing
  }

  if (layout.counterSizing != null && layout.counterSizing !== inferredCounter) {
    compact.counterSizing = layout.counterSizing
  }

  return isEmptyRecord(compact) ? undefined : compact
}

function compactStyle(style: NormalizedNodeStyle | undefined): NormalizedNodeStyle | undefined {
  if (style == null) {
    return undefined
  }

  const compact: NormalizedNodeStyle = {}

  if ((style.opacity ?? 1) !== 1) {
    compact.opacity = style.opacity
  }

  if (style.blendMode != null && style.blendMode !== "PASS_THROUGH") {
    compact.blendMode = style.blendMode
  }

  if (style.fills != null && !isEmptyJsonArray(style.fills)) {
    compact.fills = compactPaintArray(style.fills)
  }

  if (style.strokes != null && !isEmptyJsonArray(style.strokes)) {
    compact.strokes = compactPaintArray(style.strokes)
  }

  if ((style.strokeWeight ?? 1) !== 1) {
    compact.strokeWeight = style.strokeWeight
  }

  if (style.cornerRadius != null && style.cornerRadius !== 0) {
    compact.cornerRadius = style.cornerRadius
  }

  if (style.effects != null && !isEmptyJsonArray(style.effects)) {
    compact.effects = cloneJsonValue(style.effects)
  }

  return isEmptyRecord(compact) ? undefined : compact
}

function compactStyles(styles: NonNullable<NormalizedFigmaDocument["styles"]>): NormalizedFigmaDocument["styles"] {
  const compacted: NonNullable<NormalizedFigmaDocument["styles"]> = {}

  for (const [key, style] of Object.entries(styles)) {
    compacted[key] = compactStyle(style) ?? {}
  }

  return compacted
}

function compactResponsive(
  responsive: FigmaSerializedNodeV1["responsive"] | undefined
): FigmaSerializedNodeV1["responsive"] | undefined {
  if (responsive == null || isEmptyRecord(responsive)) {
    return undefined
  }

  return cloneJsonObject(responsive)
}

function inferPrimaryAxisSizing(
  layout: FigmaSerializedNodeV1["layout"],
  mode: NormalizedLayoutMode
): string {
  return inferPrimaryAxisSizingFromLayoutSizing(
    mode,
    layout.layoutSizingHorizontal ?? "FIXED",
    layout.layoutSizingVertical ?? "FIXED"
  )
}

function inferCounterAxisSizing(
  layout: FigmaSerializedNodeV1["layout"],
  mode: NormalizedLayoutMode
): string {
  return inferCounterAxisSizingFromLayoutSizing(
    mode,
    layout.layoutSizingHorizontal ?? "FIXED",
    layout.layoutSizingVertical ?? "FIXED"
  )
}

function inferNodeAxisLayoutSizing(
  layout: NormalizedNodeLayout | undefined,
  mode: NormalizedLayoutMode,
  axis: "horizontal" | "vertical",
  parentLayoutMode: NormalizedLayoutMode | null
): string {
  const ownAxisSizing = axisMatchesPrimaryAxis(mode, axis)
    ? layout?.primarySizing
    : layout?.counterSizing

  if (ownAxisSizing === "AUTO") {
    return "HUG"
  }

  if (parentLayoutMode != null && layout?.align === "STRETCH" && axisMatchesCrossAxis(parentLayoutMode, axis)) {
    return "FILL"
  }

  if (parentLayoutMode != null && typeof layout?.grow === "number" && layout.grow > 0 && axisMatchesPrimaryParentAxis(parentLayoutMode, axis)) {
    return "FILL"
  }

  return "FIXED"
}

function inferPrimaryAxisSizingFromLayoutSizing(
  mode: NormalizedLayoutMode,
  horizontalSizing: string,
  verticalSizing: string
): string {
  const sizing = mode === "HORIZONTAL" || mode === "GRID"
    ? horizontalSizing
    : verticalSizing

  return sizing === "HUG" ? "AUTO" : "FIXED"
}

function inferCounterAxisSizingFromLayoutSizing(
  mode: NormalizedLayoutMode,
  horizontalSizing: string,
  verticalSizing: string
): string {
  const sizing = mode === "HORIZONTAL" || mode === "GRID"
    ? verticalSizing
    : horizontalSizing

  return sizing === "HUG" ? "AUTO" : "FIXED"
}

function getStoredLayoutMode(layout: NormalizedNodeLayout | undefined): NormalizedLayoutMode {
  return layout?.mode ?? "NONE"
}

function isLayoutModeActive(mode: NormalizedLayoutMode): boolean {
  return mode !== "NONE"
}

function axisMatchesPrimaryAxis(
  mode: NormalizedLayoutMode,
  axis: "horizontal" | "vertical"
): boolean {
  if (mode === "GRID") {
    return axis === "horizontal"
  }

  return axis === "horizontal"
    ? mode === "HORIZONTAL"
    : mode === "VERTICAL"
}

function axisMatchesPrimaryParentAxis(
  parentLayoutMode: NormalizedLayoutMode,
  axis: "horizontal" | "vertical"
): boolean {
  if (parentLayoutMode === "GRID") {
    return axis === "horizontal"
  }

  return axis === "horizontal"
    ? parentLayoutMode === "HORIZONTAL"
    : parentLayoutMode === "VERTICAL"
}

function axisMatchesCrossAxis(
  parentLayoutMode: NormalizedLayoutMode,
  axis: "horizontal" | "vertical"
): boolean {
  if (parentLayoutMode === "GRID") {
    return axis === "vertical"
  }

  return axis === "horizontal"
    ? parentLayoutMode === "VERTICAL"
    : parentLayoutMode === "HORIZONTAL"
}

function inferResponsiveConversionRole(node: {
  layout: Pick<FigmaSerializedNodeV1["layout"], "isAutoLayout">
  children: unknown[]
  type: string
  responsive?: FigmaSerializedNodeV1["responsive"]
}): NonNullable<FigmaSerializedNodeV1["responsive"]>["conversionRole"] {
  if (node.responsive?.isVirtualGroup === true || node.type === "RESPONSIVE_GROUP") {
    return "responsive-group"
  }

  return node.layout.isAutoLayout ? "auto-layout-container" : "manual-layer"
}

function inferAcceptsChildren(node: Pick<FigmaSerializedNodeV1, "children" | "type" | "responsive"> | NormalizedFigmaNode): boolean {
  return node.type === "FRAME" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE" ||
    node.type === "RESPONSIVE_GROUP" ||
    node.responsive?.isVirtualGroup === true ||
    getNodeChildren(node).length > 0
}

function readLayoutMode(value: unknown): NormalizedLayoutMode | null {
  return value === "NONE" || value === "HORIZONTAL" || value === "VERTICAL" || value === "GRID"
    ? value
    : null
}

function readOptionalLayoutMode(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): NormalizedLayoutMode | undefined {
  if (value == null) {
    return undefined
  }

  if (value === "NONE" || value === "HORIZONTAL" || value === "VERTICAL" || value === "GRID") {
    return value
  }

  issues.push({
    path,
    message: "Expected NONE, HORIZONTAL, VERTICAL, or GRID."
  })
  return undefined
}

function readOptionalResponsiveGroupRole(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): "root" | "group" | undefined {
  if (value == null) {
    return undefined
  }

  if (value === "root" || value === "group") {
    return value
  }

  issues.push({
    path,
    message: "Expected root or group."
  })
  return undefined
}

function readOptionalResponsiveConversionRole(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): "auto-layout-container" | "manual-layer" | "responsive-group" | undefined {
  if (value == null) {
    return undefined
  }

  if (value === "auto-layout-container" || value === "manual-layer" || value === "responsive-group") {
    return value
  }

  issues.push({
    path,
    message: "Expected auto-layout-container, manual-layer, or responsive-group."
  })
  return undefined
}

function readRequiredString(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): string | null {
  if (typeof value === "string") {
    return value
  }

  issues.push({
    path,
    message: "Expected string."
  })
  return null
}

function readOptionalString(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): string | undefined {
  if (value == null) {
    return undefined
  }

  if (typeof value === "string") {
    return value
  }

  issues.push({
    path,
    message: "Expected string."
  })
  return undefined
}

function readRequiredNumber(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  issues.push({
    path,
    message: "Expected finite number."
  })
  return null
}

function readOptionalNumber(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): number | undefined {
  if (value == null) {
    return undefined
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  issues.push({
    path,
    message: "Expected finite number."
  })
  return undefined
}

function readOptionalNumberOrString(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): number | string | undefined {
  if (value == null) {
    return undefined
  }

  if ((typeof value === "number" && Number.isFinite(value)) || typeof value === "string") {
    return value
  }

  issues.push({
    path,
    message: "Expected finite number or string."
  })
  return undefined
}

function readRequiredBoolean(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): boolean | null {
  if (typeof value === "boolean") {
    return value
  }

  issues.push({
    path,
    message: "Expected boolean."
  })
  return null
}

function readOptionalBoolean(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): boolean | undefined {
  if (value == null) {
    return undefined
  }

  if (typeof value === "boolean") {
    return value
  }

  issues.push({
    path,
    message: "Expected boolean."
  })
  return undefined
}

function readOptionalJsonValue(
  value: unknown,
  path: string,
  issues: ValidationIssue[]
): FigmaJsonValue | undefined {
  if (value == null) {
    return undefined
  }

  if (isFigmaJsonValue(value)) {
    return cloneJsonValue(value)
  }

  issues.push({
    path,
    message: "Expected JSON-compatible value."
  })
  return undefined
}

function isFigmaSerializedFrameV1(value: unknown): value is FigmaSerializedFrameV1 {
  const record = asRecord(value)

  return record != null &&
    record.schemaVersion === 1 &&
    typeof record.importedAt === "string" &&
    (record.type === "FRAME" || record.type === "COMPONENT" || record.type === "INSTANCE") &&
    isFigmaSerializedNodeV1(record)
}

function isFigmaSerializedNodeV1(value: unknown): value is FigmaSerializedNodeV1 {
  const record = asRecord(value)
  const geometry = asRecord(record?.geometry)

  return record != null &&
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    typeof record.type === "string" &&
    typeof record.visible === "boolean" &&
    typeof record.locked === "boolean" &&
    geometry != null &&
    typeof geometry.x === "number" &&
    typeof geometry.y === "number" &&
    typeof geometry.width === "number" &&
    typeof geometry.height === "number" &&
    asRecord(record.layout) != null &&
    asRecord(record.style) != null &&
    Array.isArray(record.children) &&
    record.children.every((child) => isFigmaSerializedNodeV1(child))
}

function isNormalizedDocumentShape(value: unknown): value is NormalizedFigmaDocument {
  const record = asRecord(value)

  return record?.schemaVersion === 2 && record.root != null
}

function isFigmaJsonValue(value: unknown): value is FigmaJsonValue {
  if (
    value == null ||
    typeof value === "string" ||
    typeof value === "number" && Number.isFinite(value) ||
    typeof value === "boolean"
  ) {
    return true
  }

  if (Array.isArray(value)) {
    return value.every((entry) => isFigmaJsonValue(entry))
  }

  const record = asRecord(value)

  return record != null && Object.values(record).every((entry) => isFigmaJsonValue(entry))
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value != null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null
}

function getNodeChildren<T>(node: { children?: T[] }): T[] {
  return node.children ?? []
}

function cloneSpacing(spacing: SerializedSpacing): SerializedSpacing {
  return {
    top: spacing.top,
    right: spacing.right,
    bottom: spacing.bottom,
    left: spacing.left
  }
}

function cloneJsonValue<T extends FigmaJsonValue>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function cloneJsonObject<T extends Record<string, FigmaJsonValue> | object>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function isDefaultSpacing(spacing: SerializedSpacing): boolean {
  return spacing.top === 0 && spacing.right === 0 && spacing.bottom === 0 && spacing.left === 0
}

function isDefaultMinConstraints(value: FigmaJsonValue): boolean {
  const constraints = asRecord(value)

  return constraints != null &&
    constraints.horizontal === "MIN" &&
    constraints.vertical === "MIN" &&
    Object.keys(constraints).every((key) => key === "horizontal" || key === "vertical")
}

function isEmptyRecord(value: object): boolean {
  return Object.keys(value).length === 0
}

function isEmptyJsonArray(value: FigmaJsonValue): boolean {
  return Array.isArray(value) && value.length === 0
}

function compactPaintArray(value: FigmaJsonValue): FigmaJsonValue {
  if (!Array.isArray(value)) {
    return cloneJsonValue(value)
  }

  return value.map((paint) => compactPaint(paint))
}

function compactPaint(value: FigmaJsonValue): FigmaJsonValue {
  const paint = asRecord(value)

  if (paint == null) {
    return cloneJsonValue(value)
  }

  const compact: { [key: string]: FigmaJsonValue } = {}

  for (const [key, entry] of Object.entries(paint)) {
    if (key === "visible" && entry === true) {
      continue
    }

    if (key === "opacity" && entry === 1) {
      continue
    }

    if (isFigmaJsonValue(entry)) {
      compact[key] = cloneJsonValue(entry)
    }
  }

  return compact
}

function restorePaintArray(value: FigmaJsonValue): FigmaJsonValue {
  if (!Array.isArray(value)) {
    return cloneJsonValue(value)
  }

  return value.map((paint) => restorePaint(paint))
}

function restorePaint(value: FigmaJsonValue): FigmaJsonValue {
  const paint = asRecord(value)

  if (paint == null) {
    return cloneJsonValue(value)
  }

  const restored: { [key: string]: FigmaJsonValue } = {}

  for (const [key, entry] of Object.entries(paint)) {
    if (isFigmaJsonValue(entry)) {
      restored[key] = cloneJsonValue(entry)
    }
  }

  if (typeof restored.type === "string") {
    if (restored.visible == null) {
      restored.visible = true
    }

    if (restored.opacity == null) {
      restored.opacity = 1
    }
  }

  return restored
}

function isMergeableObject(value: unknown): value is Record<string, unknown> {
  return asRecord(value) != null
}

function valuesAreEqual(first: unknown, second: unknown): boolean {
  return JSON.stringify(first) === JSON.stringify(second)
}

function parseJson(value: string): { ok: true; value: unknown } | { ok: false; error: string } {
  try {
    return {
      ok: true,
      value: JSON.parse(value) as unknown
    }
  } catch (_error) {
    return {
      ok: false,
      error: "Paste valid JSON."
    }
  }
}

function formatValidationErrors(errors: ValidationIssue[]): string {
  if (errors.length === 0) {
    return "Invalid normalized JSON."
  }

  return errors.map((error) => `${error.path}: ${error.message}`).join("\n")
}

function createBounds(x: number, y: number, width: number, height: number): Bounds {
  const roundedX = roundLayoutNumber(x)
  const roundedY = roundLayoutNumber(y)
  const roundedWidth = roundLayoutNumber(width)
  const roundedHeight = roundLayoutNumber(height)

  return {
    x: roundedX,
    y: roundedY,
    width: roundedWidth,
    height: roundedHeight,
    right: roundLayoutNumber(roundedX + roundedWidth),
    bottom: roundLayoutNumber(roundedY + roundedHeight),
    centerX: roundLayoutNumber(roundedX + roundedWidth / 2),
    centerY: roundLayoutNumber(roundedY + roundedHeight / 2)
  }
}

function getPercentBounds(bounds: Bounds, container: Bounds) {
  return {
    x: toPercent(bounds.x, container.width),
    y: toPercent(bounds.y, container.height),
    width: toPercent(bounds.width, container.width),
    height: toPercent(bounds.height, container.height),
    right: toPercent(bounds.right, container.width),
    bottom: toPercent(bounds.bottom, container.height)
  }
}

function toPercent(value: number, total: number): number {
  return total === 0 ? 0 : roundLayoutNumber((value / total) * 100)
}

function roundLayoutNumber(value: number): number {
  return Math.round(value * 1000) / 1000
}
