import type { FigmaJsonValue, FigmaSerializedFrame, FigmaSerializedNode } from "../frameSchema"

export type NodeBounds = Pick<FigmaSerializedNode["geometry"], "x" | "y" | "width" | "height">

export function createVirtualGroup(): FigmaSerializedNode {
  const id = `responsive-group-${Date.now()}-${Math.round(Math.random() * 100000)}`

  return {
    id,
    name: "Responsive group",
    type: "RESPONSIVE_GROUP",
    responsive: {
      isVirtualGroup: true,
      groupRole: "group",
      conversionRole: "responsive-group",
      acceptsChildren: true,
      createdByUser: true
    },
    visible: true,
    locked: false,
    geometry: createEditorGeometry(0, 0, 0, 0),
    layout: {
      isAutoLayout: true,
      layoutMode: "VERTICAL",
      itemSpacing: 0,
      primaryAxisSizingMode: "AUTO",
      counterAxisSizingMode: "AUTO"
    },
    style: {},
    children: []
  }
}

export function isVirtualGroup(node: FigmaSerializedNode): boolean {
  return node.responsive?.isVirtualGroup === true || node.type === "RESPONSIVE_GROUP"
}

export function canAcceptDrop(node: FigmaSerializedNode): boolean {
  return isVirtualGroup(node) || node.responsive?.groupRole === "root"
}

export function getLayerKind(node: FigmaSerializedNode): string {
  if (isVirtualGroup(node)) {
    return "GROUP"
  }

  if (node.layout.isAutoLayout) {
    return "AUTO"
  }

  return node.type
}

export function countAutoLayoutNodes(node: FigmaSerializedNode): number {
  return (node.layout.isAutoLayout ? 1 : 0) + node.children.reduce((total, child) => {
    return total + countAutoLayoutNodes(child)
  }, 0)
}

export function findNode(node: FigmaSerializedNode, nodeId: string): FigmaSerializedNode | null {
  if (node.id === nodeId) {
    return node
  }

  for (const child of node.children) {
    const match = findNode(child, nodeId)

    if (match != null) {
      return match
    }
  }

  return null
}

export function findParentNode(node: FigmaSerializedNode, nodeId: string): FigmaSerializedNode | null {
  for (const child of node.children) {
    if (child.id === nodeId) {
      return node
    }

    const parent = findParentNode(child, nodeId)

    if (parent != null) {
      return parent
    }
  }

  return null
}

export function containsNode(node: FigmaSerializedNode, nodeId: string): boolean {
  return node.children.some((child) => child.id === nodeId || containsNode(child, nodeId))
}

export function updateNode<T extends FigmaSerializedNode>(
  node: T,
  nodeId: string,
  updater: (node: FigmaSerializedNode) => FigmaSerializedNode
): T {
  if (node.id === nodeId) {
    return updater(node) as T
  }

  return {
    ...node,
    children: node.children.map((child) => updateNode(child, nodeId, updater))
  }
}

export function moveNodeIntoGroup(
  frame: FigmaSerializedFrame,
  nodeId: string,
  groupId: string
): FigmaSerializedFrame | null {
  const nodeRootPosition = getNodeRootPosition(frame, nodeId)
  const groupRootPosition = getNodeRootPosition(frame, groupId)

  if (nodeRootPosition == null || groupRootPosition == null) {
    return null
  }

  const result = removeNode(frame, nodeId)

  if (result == null) {
    return null
  }

  const node = updateNodePosition(
    result.node,
    nodeRootPosition.x - groupRootPosition.x,
    nodeRootPosition.y - groupRootPosition.y
  )

  return updateNode(result.frame, groupId, (group) => ({
    ...group,
    children: [...group.children, node]
  }))
}

export function deleteNodeFromFrame(
  frame: FigmaSerializedFrame,
  nodeId: string
): FigmaSerializedFrame | null {
  if (frame.id === nodeId) {
    return null
  }

  return removeNode(frame, nodeId)?.frame ?? null
}

export function wrapNodeInGroup(
  frame: FigmaSerializedFrame,
  nodeId: string
): FigmaSerializedFrame | null {
  if (frame.id === nodeId) {
    return null
  }

  const node = findNode(frame, nodeId)
  const parent = findParentNode(frame, nodeId)

  if (node == null || parent == null) {
    return null
  }

  const group = {
    ...createVirtualGroup(),
    name: `${node.name} group`,
    geometry: createEditorGeometry(
      node.geometry.x,
      node.geometry.y,
      node.geometry.width,
      node.geometry.height
    ),
    children: [
      updateNodePosition(node, 0, 0)
    ]
  }

  return updateNode(frame, parent.id, (parentNode) => ({
    ...parentNode,
    children: parentNode.children.map((child) => child.id === node.id ? group : child)
  }))
}

function removeNode(
  node: FigmaSerializedFrame,
  nodeId: string
): { frame: FigmaSerializedFrame; node: FigmaSerializedNode } | null
function removeNode(
  node: FigmaSerializedNode,
  nodeId: string
): { frame: FigmaSerializedNode; node: FigmaSerializedNode } | null
function removeNode(
  node: FigmaSerializedNode,
  nodeId: string
): { frame: FigmaSerializedNode; node: FigmaSerializedNode } | null {
  for (const child of node.children) {
    if (child.id === nodeId) {
      return {
        frame: {
          ...node,
          children: node.children.filter((candidate) => candidate.id !== nodeId)
        },
        node: child
      }
    }
  }

  for (const child of node.children) {
    const result = removeNode(child, nodeId)

    if (result != null) {
      return {
        frame: {
          ...node,
          children: node.children.map((candidate) =>
            candidate.id === child.id ? result.frame : candidate
          )
        },
        node: result.node
      }
    }
  }

  return null
}

export function normalizeVirtualGroupGeometry<T extends FigmaSerializedNode>(node: T): T {
  const children = node.children.map((child) => normalizeVirtualGroupGeometry(child))
  const nextNode = {
    ...node,
    children
  }

  if (!isVirtualGroup(nextNode)) {
    return nextNode
  }

  const bounds = getChildrenBounds(children)
  const isEmptyShell = nextNode.geometry.width === 0 && nextNode.geometry.height === 0
  const offsetX = bounds == null ? 0 : isEmptyShell || bounds.x < 0 ? bounds.x : 0
  const offsetY = bounds == null ? 0 : isEmptyShell || bounds.y < 0 ? bounds.y : 0
  const groupX = nextNode.geometry.x + offsetX
  const groupY = nextNode.geometry.y + offsetY
  const normalizedChildren = bounds == null
    ? children
    : children.map((child) => moveNodeBy(child, -offsetX, -offsetY))
  const normalizedBounds = getChildrenBounds(normalizedChildren)
  const width = normalizedBounds == null
    ? nextNode.geometry.width
    : Math.max(nextNode.geometry.width - offsetX, normalizedBounds.x + normalizedBounds.width)
  const height = normalizedBounds == null
    ? nextNode.geometry.height
    : Math.max(nextNode.geometry.height - offsetY, normalizedBounds.y + normalizedBounds.height)

  return {
    ...nextNode,
    children: normalizedChildren,
    geometry: createEditorGeometry(
      groupX,
      groupY,
      width,
      height,
      nextNode.geometry
    )
  }
}

function getNodeRootPosition(
  node: FigmaSerializedNode,
  nodeId: string,
  offset = { x: 0, y: 0 }
): Pick<NodeBounds, "x" | "y"> | null {
  if (node.id === nodeId) {
    return offset
  }

  for (const child of node.children) {
    const match = getNodeRootPosition(child, nodeId, {
      x: offset.x + child.geometry.x,
      y: offset.y + child.geometry.y
    })

    if (match != null) {
      return match
    }
  }

  return null
}

function moveNodeBy<T extends FigmaSerializedNode>(node: T, deltaX: number, deltaY: number): T {
  return updateNodePosition(
    node,
    node.geometry.x + deltaX,
    node.geometry.y + deltaY
  )
}

function updateNodePosition<T extends FigmaSerializedNode>(node: T, x: number, y: number): T {
  return {
    ...node,
    geometry: createEditorGeometry(
      x,
      y,
      node.geometry.width,
      node.geometry.height,
      node.geometry
    )
  }
}

export function applyFlexLayoutToNode<T extends FigmaSerializedNode>(node: T): T {
  if (node.children.length === 0) {
    return node
  }

  const layoutMode = node.layout.layoutMode === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL"
  const padding = node.layout.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  const gap = node.layout.itemSpacing ?? 0
  const innerWidth = Math.max(0, node.geometry.width - padding.left - padding.right)
  const innerHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom)
  const isHorizontal = layoutMode === "HORIZONTAL"
  const mainSize = isHorizontal ? innerWidth : innerHeight
  const crossSize = isHorizontal ? innerHeight : innerWidth
  const baseChildMetrics = node.children.map((child) => {
    const margin = child.layout.margin ?? {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
    const mainStartMargin = isHorizontal ? margin.left : margin.top
    const mainEndMargin = isHorizontal ? margin.right : margin.bottom
    const crossStartMargin = isHorizontal ? margin.top : margin.left
    const crossEndMargin = isHorizontal ? margin.bottom : margin.right
    const childMainSize = isHorizontal ? child.geometry.width : child.geometry.height
    const childCrossSize = isHorizontal ? child.geometry.height : child.geometry.width
    const fillsMainAxis = getNodeAxisSizing(child, isHorizontal ? "horizontal" : "vertical", layoutMode) === "FILL"
    const fillsCrossAxis = getNodeAxisSizing(child, isHorizontal ? "vertical" : "horizontal", layoutMode) === "FILL"

    return {
      child,
      margin,
      mainStartMargin,
      mainEndMargin,
      crossStartMargin,
      crossEndMargin,
      fillsMainAxis,
      fillsCrossAxis,
      childMainSize,
      childCrossSize,
      mainSize: childMainSize + mainStartMargin + mainEndMargin,
      crossSize: childCrossSize + crossStartMargin + crossEndMargin
    }
  })
  const fillMainAxisCount = baseChildMetrics.filter((child) => child.fillsMainAxis).length
  const fixedChildrenMainSize = baseChildMetrics.reduce((total, child) => {
    return child.fillsMainAxis ? total : total + child.mainSize
  }, 0)
  const baseGapTotal = gap * Math.max(0, baseChildMetrics.length - 1)
  const fillChildMainSize = fillMainAxisCount === 0
    ? 0
    : Math.max(1, (mainSize - fixedChildrenMainSize - baseGapTotal) / fillMainAxisCount)
  const childMetrics = baseChildMetrics.map((metric) => {
    if (!metric.fillsMainAxis && !metric.fillsCrossAxis) {
      return metric
    }

    const childMainSize = metric.fillsMainAxis
      ? fillChildMainSize
      : metric.childMainSize
    const childCrossSize = metric.fillsCrossAxis
      ? Math.max(1, crossSize - metric.crossStartMargin - metric.crossEndMargin)
      : metric.childCrossSize

    return {
      ...metric,
      childMainSize,
      childCrossSize,
      mainSize: childMainSize + metric.mainStartMargin + metric.mainEndMargin,
      crossSize: childCrossSize + metric.crossStartMargin + metric.crossEndMargin
    }
  })
  const totalChildrenMainSize = childMetrics.reduce((total, child) => total + child.mainSize, 0)
  const mainUsed = totalChildrenMainSize + baseGapTotal
  const justify = node.layout.primaryAxisAlignItems ?? "MIN"
  const align = node.layout.counterAxisAlignItems ?? "MIN"
  const dynamicGap = justify === "SPACE_BETWEEN" && childMetrics.length > 1
    ? Math.max(gap, (mainSize - totalChildrenMainSize) / (childMetrics.length - 1))
    : gap
  let cursor = padding[isHorizontal ? "left" : "top"] + getMainOffset(justify, mainSize, mainUsed)

  return {
    ...node,
    children: childMetrics.map((metric) => {
      const child = metric.child
      const crossAvailable = Math.max(0, crossSize - metric.crossSize)
      const crossOffset = getCrossOffset(align, crossAvailable)
      const nextX = isHorizontal
        ? cursor + metric.mainStartMargin
        : padding.left + metric.crossStartMargin + crossOffset
      const nextY = isHorizontal
        ? padding.top + metric.crossStartMargin + crossOffset
        : cursor + metric.mainStartMargin
      const nextWidth = isHorizontal ? metric.childMainSize : metric.childCrossSize
      const nextHeight = isHorizontal ? metric.childCrossSize : metric.childMainSize
      const nextChild = {
        ...child,
        geometry: createEditorGeometry(
          nextX,
          nextY,
          nextWidth,
          nextHeight,
          child.geometry
        )
      }

      cursor += metric.mainSize + dynamicGap

      return nextChild
    })
  }
}

type AxisSizingMode = "FILL" | "HUG" | "FIXED" | null

function getNodeAxisSizing(
  node: FigmaSerializedNode,
  axis: "horizontal" | "vertical",
  parentLayoutMode: "HORIZONTAL" | "VERTICAL" | null = null
): AxisSizingMode {
  const layoutSizing = axis === "horizontal"
    ? node.layout.layoutSizingHorizontal
    : node.layout.layoutSizingVertical

  if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
    return layoutSizing
  }

  const axisSizing = axisMatchesPrimaryAxis(node, axis)
    ? node.layout.primaryAxisSizingMode
    : node.layout.counterAxisSizingMode

  if (axisSizing === "AUTO") {
    return "HUG"
  }

  if (axisSizing === "FIXED") {
    return "FIXED"
  }

  if (parentLayoutMode != null && node.layout.layoutAlign === "STRETCH" && axisMatchesCrossAxis(parentLayoutMode, axis)) {
    return "FILL"
  }

  if (parentLayoutMode != null && typeof node.layout.layoutGrow === "number" && node.layout.layoutGrow > 0 && axisMatchesPrimaryParentAxis(parentLayoutMode, axis)) {
    return "FILL"
  }

  return null
}

function axisMatchesPrimaryAxis(node: FigmaSerializedNode, axis: "horizontal" | "vertical"): boolean {
  return axis === "horizontal"
    ? node.layout.layoutMode === "HORIZONTAL"
    : node.layout.layoutMode === "VERTICAL"
}

function axisMatchesPrimaryParentAxis(
  parentLayoutMode: "HORIZONTAL" | "VERTICAL",
  axis: "horizontal" | "vertical"
): boolean {
  return axis === "horizontal"
    ? parentLayoutMode === "HORIZONTAL"
    : parentLayoutMode === "VERTICAL"
}

function axisMatchesCrossAxis(
  parentLayoutMode: "HORIZONTAL" | "VERTICAL",
  axis: "horizontal" | "vertical"
): boolean {
  return axis === "horizontal"
    ? parentLayoutMode === "VERTICAL"
    : parentLayoutMode === "HORIZONTAL"
}

function getMainOffset(
  justify: string,
  mainSize: number,
  mainUsed: number
): number {
  const remaining = Math.max(0, mainSize - mainUsed)

  if (justify === "CENTER") {
    return remaining / 2
  }

  if (justify === "MAX") {
    return remaining
  }

  return 0
}

function getCrossOffset(align: string, available: number): number {
  if (align === "CENTER" || align === "BASELINE") {
    return available / 2
  }

  if (align === "MAX") {
    return available
  }

  return 0
}

export function getChildrenBounds(children: FigmaSerializedNode[]): NodeBounds | null {
  if (children.length === 0) {
    return null
  }

  const boxes = children.map((child) => child.geometry)
  const minX = Math.min(...boxes.map((box) => box.x))
  const minY = Math.min(...boxes.map((box) => box.y))
  const maxX = Math.max(...boxes.map((box) => box.x + box.width))
  const maxY = Math.max(...boxes.map((box) => box.y + box.height))

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  }
}

export function createEditorGeometry(
  x: number,
  y: number,
  width: number,
  height: number,
  existing?: FigmaSerializedNode["geometry"]
): FigmaSerializedNode["geometry"] {
  const bounds = createEditorBounds(x, y, width, height)

  return {
    x,
    y,
    width,
    height,
    rotation: existing?.rotation ?? 0,
    absoluteBounds: bounds,
    parentRelativeBounds: bounds,
    rootRelativeBounds: bounds,
    percentOfParent: existing?.percentOfParent,
    percentOfRoot: existing?.percentOfRoot ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      right: 0,
      bottom: 0
    },
    hierarchy: existing?.hierarchy ?? {
      parentId: null,
      depth: 0,
      siblingIndex: 0,
      siblingCount: 1
    }
  }
}

function createEditorBounds(
  x: number,
  y: number,
  width: number,
  height: number
): FigmaSerializedNode["geometry"]["absoluteBounds"] {
  return {
    x,
    y,
    width,
    height,
    right: x + width,
    bottom: y + height,
    centerX: x + width / 2,
    centerY: y + height / 2
  }
}

export function getSolidFillColor(value: FigmaJsonValue | undefined): string | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }

  const paint = value.find((entry) => {
    return isJsonObject(entry) && entry.type === "SOLID" && entry.visible !== false
  })

  if (!isJsonObject(paint) || !isJsonObject(paint.color)) {
    return undefined
  }

  const opacity = typeof paint.opacity === "number" ? paint.opacity : 1
  const red = toCssColorChannel(paint.color.r)
  const green = toCssColorChannel(paint.color.g)
  const blue = toCssColorChannel(paint.color.b)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

export function getCornerRadius(value: number | string | undefined, scale: number): string | undefined {
  return typeof value === "number" ? `${value * scale}px` : undefined
}

export function getTextFontFamily(node: FigmaSerializedNode): string | undefined {
  const fontName = node.text?.fontName

  if (!isJsonObject(fontName) || typeof fontName.family !== "string") {
    return undefined
  }

  return `"${fontName.family}", Inter, Arial, sans-serif`
}

export function getTextFontWeight(node: FigmaSerializedNode): number | string | undefined {
  if (typeof node.text?.fontWeight === "number") {
    return node.text.fontWeight
  }

  const fontName = node.text?.fontName

  if (!isJsonObject(fontName) || typeof fontName.style !== "string") {
    return undefined
  }

  const style = fontName.style.toLowerCase()

  if (style.includes("black")) {
    return 900
  }

  if (style.includes("extra bold") || style.includes("extrabold")) {
    return 800
  }

  if (style.includes("bold")) {
    return 700
  }

  if (style.includes("semi bold") || style.includes("semibold")) {
    return 600
  }

  if (style.includes("medium")) {
    return 500
  }

  if (style.includes("light")) {
    return 300
  }

  return 400
}

export function getTextLineHeight(node: FigmaSerializedNode, scale: number): string | number | undefined {
  const lineHeight = node.text?.lineHeight

  if (!isJsonObject(lineHeight)) {
    return undefined
  }

  if (lineHeight.unit === "PIXELS" && typeof lineHeight.value === "number") {
    return `${lineHeight.value * scale}px`
  }

  if (lineHeight.unit === "PERCENT" && typeof lineHeight.value === "number") {
    return `${lineHeight.value}%`
  }

  return undefined
}

export function getTextHorizontalAlign(node: FigmaSerializedNode): "left" | "center" | "right" | "justify" {
  if (node.text?.textAlignHorizontal === "CENTER") {
    return "center"
  }

  if (node.text?.textAlignHorizontal === "RIGHT") {
    return "right"
  }

  if (node.text?.textAlignHorizontal === "JUSTIFIED") {
    return "justify"
  }

  return "left"
}

export function getTextVerticalJustify(node: FigmaSerializedNode): "flex-start" | "center" | "flex-end" {
  if (node.text?.textAlignVertical === "CENTER") {
    return "center"
  }

  if (node.text?.textAlignVertical === "BOTTOM") {
    return "flex-end"
  }

  return "flex-start"
}

function toCssColorChannel(value: FigmaJsonValue | undefined): number {
  return typeof value === "number" ? Math.round(value * 255) : 0
}

function isJsonObject(value: FigmaJsonValue | undefined): value is { [key: string]: FigmaJsonValue } {
  return value != null && !Array.isArray(value) && typeof value === "object"
}
