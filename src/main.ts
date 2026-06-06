import { showUI } from "@create-figma-plugin/utilities"
import type {
  FigmaJsonValue,
  FigmaSerializedFrame,
  FigmaSerializedNode,
  PluginToUiMessage,
  ResponsiveNodeRule,
  UiToPluginMessage
} from "./frameSchema"

type ImportableFrameNode = FrameNode | ComponentNode | InstanceNode
type GeneratedFrameNode = FrameNode | ComponentNode | InstanceNode
type GenerationPayload = Extract<UiToPluginMessage, { type: "generate-responsive-frame" }>["payload"]
type EffectiveGenerationRules = Omit<ResponsiveNodeRule, "enabled">
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

export default function () {
  showUI({
    height: 1000,
    width: 1400
  })

  figma.ui.onmessage = (message: UiToPluginMessage) => {
    if (message.type === "import-selected-frame") {
      importSelectedFrame()
      return
    }

    if (message.type === "generate-responsive-frame") {
      generateResponsiveFrame(message.payload).catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "Could not generate responsive frame."
        figma.notify(message)
      })
    }
  }
}

function importSelectedFrame() {
  const [selectedNode] = figma.currentPage.selection

  if (selectedNode == null) {
    sendToUi({
      type: "import-error",
      message: "Select a Figma frame, component, or instance first."
    })
    return
  }

  if (!isImportableFrameNode(selectedNode)) {
    sendToUi({
      type: "import-error",
      message: "The selected layer is not a frame. Select a frame, component, or instance."
    })
    return
  }

  if (!isAutoLayoutContainer(selectedNode)) {
    sendToUi({
      type: "import-error",
      message: "Select an Auto Layout frame, component, or instance. Responsive conversion needs Figma Auto Layout data."
    })
    return
  }

  sendToUi({
    type: "frame-imported",
    payload: serializeFrame(selectedNode)
  })

  figma.notify(`Imported "${selectedNode.name}"`)
}

async function generateResponsiveFrame(payload: GenerationPayload) {
  const sourceNode = await getGenerationSourceNode(payload)

  if (sourceNode == null) {
    figma.notify("Import the source frame again before generating.")
    return
  }

  const sourceWidth = clampNumber(payload.sourceWidth, 1, 10000)
  const generatedNode = sourceNode.clone()
  generatedNode.name = `${sourceNode.name} / ${getDeviceLabel(payload.targetDevice)}`
  generatedNode.x = sourceNode.x + sourceNode.width + 80
  generatedNode.y = sourceNode.y

  if (canResize(generatedNode)) {
    generatedNode.resize(
      clampNumber(payload.screenWidth, 240, 1920),
      Math.max(1, generatedNode.height)
    )
  }

  await applyResponsiveRules(
    generatedNode,
    payload,
    sourceWidth,
    createSourceNodeLookup(payload.sourceFrame),
    ""
  )

  figma.currentPage.selection = [generatedNode]
  figma.viewport.scrollAndZoomIntoView([generatedNode])
  figma.notify(`Generated ${Math.round(payload.screenWidth)}px responsive frame.`)
}

async function getGenerationSourceNode(payload: GenerationPayload): Promise<ImportableFrameNode | null> {
  if (payload.sourceFrame != null) {
    const importedSourceNode = await figma.getNodeByIdAsync(payload.sourceFrame.id)

    if (importedSourceNode != null && isImportableFrameNode(importedSourceNode)) {
      return importedSourceNode
    }
  }

  const [selectedNode] = figma.currentPage.selection

  return selectedNode != null && isImportableFrameNode(selectedNode)
    ? selectedNode
    : null
}

async function applyResponsiveRules(
  node: SceneNode,
  payload: GenerationPayload,
  sourceWidth: number,
  sourceNodeLookup: Map<string, FigmaSerializedNode>,
  nodePath: string
) {
  const sourceNode = sourceNodeLookup.get(nodePath)
  const effectiveRules = getEffectiveGenerationRules(payload, sourceNode?.responsive?.nodeRule)

  if (hasAutoLayout(node)) {
    const nextLayoutMode = getConvertedLayoutMode(node, payload, effectiveRules)

    if (nextLayoutMode != null) {
      node.layoutMode = nextLayoutMode
      node.itemSpacing = clampNumber(effectiveRules.stackGap, 0, 200)
      node.counterAxisAlignItems = getFigmaCounterAxisAlignment(effectiveRules.stackAlignment)
    }

    const activeLayoutMode = nextLayoutMode ?? getCurrentLayoutMode(node)

    if (activeLayoutMode != null) {
      applyConvertedChildSizing(node, activeLayoutMode, effectiveRules.stackAlignment, sourceNode)
      applyResponsiveChildGeometry(node, activeLayoutMode, effectiveRules, sourceNode)
    }

    if (isRootResponsiveNode(node)) {
      const padding = clampNumber(payload.layoutRules.outputPadding, 0, 200)
      node.paddingTop = padding
      node.paddingRight = padding
      node.paddingBottom = padding
      node.paddingLeft = padding
    }
  }

  if (node.type === "TEXT") {
    await applyResponsiveTextRules(node, payload, sourceWidth)
  }

  if (hasChildren(node)) {
    for (let index = 0; index < node.children.length; index += 1) {
      const child = node.children[index]

      await applyResponsiveRules(
        child,
        payload,
        sourceWidth,
        sourceNodeLookup,
        nodePath === "" ? String(index) : `${nodePath}/${index}`
      )
    }
  }
}

async function applyResponsiveTextRules(node: TextNode, payload: GenerationPayload, sourceWidth: number) {
  if (typeof node.fontSize !== "number") {
    return
  }

  await loadTextFonts(node)

  const widthScale = clampNumber(payload.screenWidth / sourceWidth, 0.5, 1)
  const scaledSize = node.fontSize * widthScale
  const minimumTextSize = clampNumber(payload.layoutRules.minimumTextSize, 8, 48)

  if (payload.layoutRules.textScaleMode === "scale") {
    node.fontSize = Math.max(minimumTextSize, scaledSize)
  } else if (payload.layoutRules.textScaleMode === "clamp") {
    node.fontSize = Math.max(minimumTextSize, Math.min(node.fontSize, scaledSize))
  }

  if (payload.layoutRules.tightenLineHeight && node.lineHeight !== figma.mixed) {
    node.lineHeight = {
      unit: "PERCENT",
      value: 115
    }
  }
}

async function loadTextFonts(node: TextNode) {
  if (node.fontName !== figma.mixed) {
    await figma.loadFontAsync(node.fontName)
  }
}

function getConvertedLayoutMode(
  node: SceneNode,
  payload: GenerationPayload,
  layoutRules: EffectiveGenerationRules
): "HORIZONTAL" | "VERTICAL" | null {
  if (layoutRules.rowToColumnMode === "always") {
    return getTargetLayoutMode(node, layoutRules)
  }

  if (layoutRules.rowToColumnMode === "never") {
    return null
  }

  const shouldConvert = layoutRules.conversionDirection === "row-to-column"
    ? payload.screenWidth <= layoutRules.rowToColumnBreakpoint
    : payload.screenWidth >= layoutRules.rowToColumnBreakpoint

  return shouldConvert ? getTargetLayoutMode(node, layoutRules) : null
}

function getTargetLayoutMode(
  node: SceneNode,
  layoutRules: EffectiveGenerationRules
): "HORIZONTAL" | "VERTICAL" | null {
  if (!hasAutoLayout(node)) {
    return null
  }

  if (layoutRules.conversionDirection === "row-to-column") {
    return node.layoutMode === "HORIZONTAL" ? "VERTICAL" : null
  }

  return node.layoutMode === "VERTICAL" ? "HORIZONTAL" : null
}

function getCurrentLayoutMode(node: SceneNode & AutoLayoutMixin): "HORIZONTAL" | "VERTICAL" | null {
  if (node.layoutMode === "HORIZONTAL" || node.layoutMode === "VERTICAL") {
    return node.layoutMode
  }

  return null
}

function getEffectiveGenerationRules(
  payload: GenerationPayload,
  nodeRule: ResponsiveNodeRule | undefined
): EffectiveGenerationRules {
  if (nodeRule?.enabled === true) {
    return {
      conversionDirection: nodeRule.conversionDirection,
      rowToColumnMode: nodeRule.rowToColumnMode,
      rowToColumnBreakpoint: nodeRule.rowToColumnBreakpoint,
      stackGap: nodeRule.stackGap,
      stackAlignment: nodeRule.stackAlignment
    }
  }

  return {
    conversionDirection: payload.layoutRules.conversionDirection,
    rowToColumnMode: payload.layoutRules.rowToColumnMode,
    rowToColumnBreakpoint: payload.layoutRules.rowToColumnBreakpoint,
    stackGap: payload.layoutRules.stackGap,
    stackAlignment: payload.layoutRules.stackAlignment
  }
}

function createSourceNodeLookup(sourceFrame: FigmaSerializedFrame | null): Map<string, FigmaSerializedNode> {
  const sourceNodeLookup = new Map<string, FigmaSerializedNode>()

  if (sourceFrame == null) {
    return sourceNodeLookup
  }

  collectSourceNodes(sourceFrame, "", sourceNodeLookup)

  return sourceNodeLookup
}

function collectSourceNodes(
  node: FigmaSerializedNode,
  nodePath: string,
  sourceNodeLookup: Map<string, FigmaSerializedNode>
) {
  sourceNodeLookup.set(nodePath, node)

  node.children.forEach((child, index) => {
    collectSourceNodes(
      child,
      nodePath === "" ? String(index) : `${nodePath}/${index}`,
      sourceNodeLookup
    )
  })
}

function getFigmaCounterAxisAlignment(
  alignment: EffectiveGenerationRules["stackAlignment"]
): "MIN" | "CENTER" | "MAX" {
  if (alignment === "center") {
    return "CENTER"
  }

  return "MIN"
}

function applyConvertedChildSizing(
  node: SceneNode & AutoLayoutMixin,
  layoutMode: "HORIZONTAL" | "VERTICAL",
  alignment: EffectiveGenerationRules["stackAlignment"],
  sourceNode: FigmaSerializedNode | undefined
) {
  if (!hasChildren(node)) {
    return
  }

  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index]
    const sourceChild = sourceNode?.children[index]
    const fillsHorizontal = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "horizontal",
      layoutMode === "VERTICAL" && alignment === "stretch",
      layoutMode
    )
    const fillsVertical = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "vertical",
      layoutMode === "HORIZONTAL" && alignment === "stretch",
      layoutMode
    )
    const fillsMainAxis = layoutMode === "HORIZONTAL" ? fillsHorizontal : fillsVertical
    const fillsCrossAxis = layoutMode === "HORIZONTAL" ? fillsVertical : fillsHorizontal

    if (!("layoutAlign" in child)) {
      continue
    }

    child.layoutAlign = fillsCrossAxis ? "STRETCH" : "INHERIT"

    if ("layoutGrow" in child) {
      child.layoutGrow = fillsMainAxis ? 1 : 0
    }

    if ("layoutSizingHorizontal" in child) {
      const sizing = fillsHorizontal ? "FILL" : getSerializedAxisSizing(sourceChild, "horizontal")

      if (sizing != null) {
        child.layoutSizingHorizontal = sizing
      }
    }

    if ("layoutSizingVertical" in child) {
      const sizing = fillsVertical ? "FILL" : getSerializedAxisSizing(sourceChild, "vertical")

      if (sizing != null) {
        child.layoutSizingVertical = sizing
      }
    }
  }
}

function applyResponsiveChildGeometry(
  node: SceneNode & AutoLayoutMixin,
  layoutMode: "HORIZONTAL" | "VERTICAL",
  layoutRules: EffectiveGenerationRules,
  sourceNode: FigmaSerializedNode | undefined
) {
  if (!hasChildren(node)) {
    return
  }

  const padding = getNodePadding(node)
  const contentWidth = Math.max(1, node.width - padding.left - padding.right)
  const contentHeight = Math.max(1, node.height - padding.top - padding.bottom)
  const gap = clampNumber(node.itemSpacing ?? layoutRules.stackGap, 0, 200)

  if (layoutMode === "VERTICAL") {
    resizeVerticalLayoutChildren(node, sourceNode, contentWidth, contentHeight, gap)
    return
  }

  resizeHorizontalLayoutChildren(node, sourceNode, layoutRules, contentWidth, contentHeight, gap)
}

function resizeVerticalLayoutChildren(
  node: SceneNode & AutoLayoutMixin & ChildrenMixin,
  sourceNode: FigmaSerializedNode | undefined,
  contentWidth: number,
  contentHeight: number,
  gap: number
) {
  const metrics = node.children.map((child, index) => {
    const sourceChild = sourceNode?.children[index]
    const fillsWidth = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "horizontal",
      true,
      "VERTICAL"
    )
    const fillsHeight = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "vertical",
      false,
      "VERTICAL"
    )
    const nextWidth = fillsWidth
      ? contentWidth
      : Math.min(readNumber(child, "width", contentWidth), contentWidth)

    return {
      child,
      fillsHeight,
      nextWidth
    }
  })
  const totalGap = gap * Math.max(0, metrics.length - 1)
  const fixedHeightTotal = metrics.reduce((total, metric) => {
    return metric.fillsHeight ? total : total + readNumber(metric.child, "height", 0)
  }, 0)
  const fillHeightCount = metrics.filter((metric) => metric.fillsHeight).length
  const fillHeight = fillHeightCount === 0
    ? 0
    : Math.max(1, (contentHeight - totalGap - fixedHeightTotal) / fillHeightCount)

  for (const metric of metrics) {
    const nextHeight = metric.fillsHeight ? fillHeight : readNumber(metric.child, "height", 1)

    resizeSceneNode(metric.child, metric.nextWidth, nextHeight)
  }
}

function resizeHorizontalLayoutChildren(
  node: SceneNode & AutoLayoutMixin & ChildrenMixin,
  sourceNode: FigmaSerializedNode | undefined,
  layoutRules: EffectiveGenerationRules,
  contentWidth: number,
  contentHeight: number,
  gap: number
) {
  const metrics = node.children.map((child, index) => {
    const sourceChild = sourceNode?.children[index]

    return {
      child,
      fillsWidth: shouldFillGeneratedAxis(
        sourceChild,
        child,
        "horizontal",
        false,
        "HORIZONTAL"
      ),
      fillsHeight: shouldFillGeneratedAxis(
        sourceChild,
        child,
        "vertical",
        layoutRules.stackAlignment === "stretch",
        "HORIZONTAL"
      )
    }
  })
  const totalGap = gap * Math.max(0, metrics.length - 1)
  const fixedWidthTotal = metrics.reduce((total, metric) => {
    return metric.fillsWidth ? total : total + readNumber(metric.child, "width", 0)
  }, 0)
  const fillWidthCount = metrics.filter((metric) => metric.fillsWidth).length
  const fillWidth = fillWidthCount === 0
    ? 0
    : Math.max(1, (contentWidth - totalGap - fixedWidthTotal) / fillWidthCount)

  for (const metric of metrics) {
    const currentWidth = readNumber(metric.child, "width", 1)
    const currentHeight = readNumber(metric.child, "height", 1)
    const nextWidth = metric.fillsWidth ? fillWidth : currentWidth
    const nextHeight = metric.fillsHeight ? contentHeight : currentHeight

    resizeSceneNode(metric.child, nextWidth, nextHeight)
  }
}

function getNodePadding(node: SceneNode & AutoLayoutMixin) {
  return {
    top: clampNumber(node.paddingTop, 0, 10000),
    right: clampNumber(node.paddingRight, 0, 10000),
    bottom: clampNumber(node.paddingBottom, 0, 10000),
    left: clampNumber(node.paddingLeft, 0, 10000)
  }
}

function resizeSceneNode(node: SceneNode, width: number, height: number) {
  if (!canResize(node)) {
    return
  }

  const nextWidth = Math.max(1, Math.round(width * 1000) / 1000)
  const nextHeight = Math.max(1, Math.round(height * 1000) / 1000)

  if (
    Math.abs(readNumber(node, "width", nextWidth) - nextWidth) < 0.01 &&
    Math.abs(readNumber(node, "height", nextHeight) - nextHeight) < 0.01
  ) {
    return
  }

  try {
    node.resize(nextWidth, nextHeight)
  } catch (_error) {
    // Some Figma nodes reject explicit resize while their auto-layout sizing is controlled by the parent.
  }
}

function shouldFillGeneratedAxis(
  sourceNode: FigmaSerializedNode | undefined,
  fallbackNode: SceneNode,
  axis: "horizontal" | "vertical",
  defaultFill: boolean,
  parentLayoutMode: "HORIZONTAL" | "VERTICAL"
): boolean {
  const serializedSizing = getSerializedAxisSizing(sourceNode, axis)

  if (serializedSizing != null) {
    return serializedSizing === "FILL"
  }

  if (sourceNode?.layout.layoutAlign === "STRETCH" && axisMatchesCrossAxis(parentLayoutMode, axis)) {
    return true
  }

  const sceneSizing = getSceneAxisSizing(fallbackNode, axis)

  if (sceneSizing != null) {
    return sceneSizing === "FILL"
  }

  return isSceneStretchedOnAxis(fallbackNode, axis, parentLayoutMode) || defaultFill
}

function getSerializedAxisSizing(
  node: FigmaSerializedNode | undefined,
  axis: "horizontal" | "vertical"
): "FILL" | "HUG" | "FIXED" | null {
  if (node == null) {
    return null
  }

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

  return null
}

function getSceneAxisSizing(
  node: SceneNode,
  axis: "horizontal" | "vertical"
): "FILL" | "HUG" | "FIXED" | null {
  if (axis === "horizontal" && "layoutSizingHorizontal" in node) {
    return node.layoutSizingHorizontal
  }

  if (axis === "vertical" && "layoutSizingVertical" in node) {
    return node.layoutSizingVertical
  }

  if (axis === "horizontal" && "layoutGrow" in node && node.layoutGrow > 0) {
    return "FILL"
  }

  return null
}

function axisMatchesPrimaryAxis(node: FigmaSerializedNode, axis: "horizontal" | "vertical"): boolean {
  return axis === "horizontal"
    ? node.layout.layoutMode === "HORIZONTAL"
    : node.layout.layoutMode === "VERTICAL"
}

function axisMatchesCrossAxis(
  parentLayoutMode: "HORIZONTAL" | "VERTICAL",
  axis: "horizontal" | "vertical"
): boolean {
  return axis === "horizontal"
    ? parentLayoutMode === "VERTICAL"
    : parentLayoutMode === "HORIZONTAL"
}

function isSceneStretchedOnAxis(
  node: SceneNode,
  axis: "horizontal" | "vertical",
  parentLayoutMode: "HORIZONTAL" | "VERTICAL"
): boolean {
  return "layoutAlign" in node &&
    node.layoutAlign === "STRETCH" &&
    axisMatchesCrossAxis(parentLayoutMode, axis)
}

function isRootResponsiveNode(node: SceneNode): node is GeneratedFrameNode {
  return isImportableFrameNode(node) && node.parent === figma.currentPage
}

function hasAutoLayout(node: SceneNode): node is SceneNode & AutoLayoutMixin {
  return "layoutMode" in node
}

function canResize(node: SceneNode): node is SceneNode & LayoutMixin {
  return "resize" in node && typeof node.resize === "function"
}

function getDeviceLabel(targetDevice: GenerationPayload["targetDevice"]): string {
  if (targetDevice === "mobile") {
    return "Mobile"
  }

  if (targetDevice === "tablet") {
    return "Tablet"
  }

  if (targetDevice === "desktop") {
    return "Desktop"
  }

  return "Custom"
}

function serializeFrame(node: ImportableFrameNode): FigmaSerializedFrame {
  const rootBounds = getAbsoluteBounds(node)

  return {
    ...serializeNode({
      node,
      isRoot: true,
      rootBounds,
      parentBounds: null,
      parentId: null,
      depth: 0,
      siblingIndex: 0,
      siblingCount: 1
    }),
    type: node.type,
    schemaVersion: 1,
    importedAt: new Date().toISOString()
  }
}

function serializeNode({
  node,
  isRoot = false,
  rootBounds,
  parentBounds,
  parentId,
  depth,
  siblingIndex,
  siblingCount
}: {
  node: SceneNode
  isRoot?: boolean
  rootBounds: Bounds
  parentBounds: Bounds | null
  parentId: string | null
  depth: number
  siblingIndex: number
  siblingCount: number
}): FigmaSerializedNode {
  const absoluteBounds = getAbsoluteBounds(node)
  const parentRelativeBounds = getRelativeBounds(absoluteBounds, parentBounds ?? absoluteBounds)
  const rootRelativeBounds = getRelativeBounds(absoluteBounds, rootBounds)
  const percentOfParent = parentBounds == null
    ? undefined
    : getPercentBounds(parentRelativeBounds, parentBounds)
  const percentOfRoot = getPercentBounds(rootRelativeBounds, rootBounds)

  return {
    id: node.id,
    name: node.name,
    type: node.type,
    responsive: serializeResponsiveMetadata(node, isRoot),
    visible: readBoolean(node, "visible", true),
    locked: readBoolean(node, "locked", false),
    geometry: {
      x: readNumber(node, "x", 0),
      y: readNumber(node, "y", 0),
      width: readNumber(node, "width", 0),
      height: readNumber(node, "height", 0),
      rotation: readNumber(node, "rotation", 0),
      absoluteBounds,
      parentRelativeBounds,
      rootRelativeBounds,
      percentOfParent,
      percentOfRoot,
      hierarchy: {
        parentId,
        depth,
        siblingIndex,
        siblingCount
      }
    },
    layout: serializeLayout(node),
    style: serializeStyle(node),
    text: node.type === "TEXT" ? serializeText(node) : undefined,
    children: hasChildren(node)
      ? node.children.map((child, index) => serializeNode({
          node: child,
          rootBounds,
          parentBounds: absoluteBounds,
          parentId: node.id,
          depth: depth + 1,
          siblingIndex: index,
          siblingCount: node.children.length
        }))
      : []
  }
}

function serializeLayout(node: SceneNode): FigmaSerializedNode["layout"] {
  const layout: FigmaSerializedNode["layout"] = {
    isAutoLayout: isAutoLayoutContainer(node)
  }

  if ("constraints" in node) {
    layout.constraints = toJsonValue(node.constraints)
  }

  if ("layoutMode" in node) {
    layout.layoutMode = node.layoutMode
    layout.autoLayoutDirection = node.layoutMode
  }

  if ("layoutAlign" in node) {
    layout.layoutAlign = node.layoutAlign
  }

  if ("layoutGrow" in node) {
    layout.layoutGrow = node.layoutGrow
  }

  if ("layoutSizingHorizontal" in node) {
    layout.layoutSizingHorizontal = node.layoutSizingHorizontal
  }

  if ("layoutSizingVertical" in node) {
    layout.layoutSizingVertical = node.layoutSizingVertical
  }

  if ("itemSpacing" in node) {
    layout.itemSpacing = node.itemSpacing
  }

  if ("counterAxisSpacing" in node && node.counterAxisSpacing != null) {
    layout.counterAxisSpacing = node.counterAxisSpacing
  }

  if ("primaryAxisAlignItems" in node) {
    layout.primaryAxisAlignItems = node.primaryAxisAlignItems
  }

  if ("counterAxisAlignItems" in node) {
    layout.counterAxisAlignItems = node.counterAxisAlignItems
  }

  if ("layoutWrap" in node) {
    layout.layoutWrap = node.layoutWrap
  }

  if (
    "paddingTop" in node &&
    "paddingRight" in node &&
    "paddingBottom" in node &&
    "paddingLeft" in node
  ) {
    layout.padding = {
      top: node.paddingTop,
      right: node.paddingRight,
      bottom: node.paddingBottom,
      left: node.paddingLeft
    }
  }

  if ("primaryAxisSizingMode" in node) {
    layout.primaryAxisSizingMode = node.primaryAxisSizingMode
  }

  if ("counterAxisSizingMode" in node) {
    layout.counterAxisSizingMode = node.counterAxisSizingMode
  }

  return layout
}

function serializeResponsiveMetadata(node: SceneNode, isRoot: boolean): FigmaSerializedNode["responsive"] {
  const isAutoLayout = isAutoLayoutContainer(node)

  return {
    groupRole: isRoot ? "root" : undefined,
    conversionRole: isAutoLayout ? "auto-layout-container" : "manual-layer",
    acceptsChildren: hasChildren(node)
  }
}

function serializeStyle(node: SceneNode): FigmaSerializedNode["style"] {
  const style: FigmaSerializedNode["style"] = {}

  if ("opacity" in node) {
    style.opacity = node.opacity
  }

  if ("blendMode" in node) {
    style.blendMode = node.blendMode
  }

  if ("fills" in node && node.fills !== figma.mixed) {
    style.fills = toJsonValue(node.fills)
  }

  if ("strokes" in node) {
    style.strokes = toJsonValue(node.strokes)
  }

  if ("strokeWeight" in node && node.strokeWeight !== figma.mixed) {
    style.strokeWeight = node.strokeWeight
  }

  if ("cornerRadius" in node) {
    style.cornerRadius = node.cornerRadius === figma.mixed ? "mixed" : node.cornerRadius
  }

  if ("effects" in node) {
    style.effects = toJsonValue(node.effects)
  }

  return style
}

function serializeText(node: TextNode): FigmaSerializedNode["text"] {
  return {
    characters: node.characters,
    fontSize: node.fontSize === figma.mixed ? "mixed" : node.fontSize,
    fontName: toJsonValue(node.fontName),
    fontWeight: node.fontWeight === figma.mixed ? undefined : node.fontWeight,
    textAlignHorizontal: node.textAlignHorizontal,
    textAlignVertical: node.textAlignVertical,
    lineHeight: toJsonValue(node.lineHeight),
    letterSpacing: toJsonValue(node.letterSpacing)
  }
}

function isImportableFrameNode(node: BaseNode): node is ImportableFrameNode {
  return node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE"
}

function isAutoLayoutContainer(node: SceneNode): boolean {
  return "layoutMode" in node && node.layoutMode !== "NONE"
}

function hasChildren(node: SceneNode): node is SceneNode & ChildrenMixin {
  return "children" in node
}

function readNumber(node: SceneNode, key: string, fallback: number): number {
  const value = (node as unknown as Record<string, unknown>)[key]
  return typeof value === "number" ? value : fallback
}

function readBoolean(node: SceneNode, key: string, fallback: boolean): boolean {
  const value = (node as unknown as Record<string, unknown>)[key]
  return typeof value === "boolean" ? value : fallback
}

function getAbsoluteBounds(node: SceneNode): Bounds {
  const absoluteBoundingBox = "absoluteBoundingBox" in node ? node.absoluteBoundingBox : null
  const x = absoluteBoundingBox?.x ?? readNumber(node, "x", 0)
  const y = absoluteBoundingBox?.y ?? readNumber(node, "y", 0)
  const width = absoluteBoundingBox?.width ?? readNumber(node, "width", 0)
  const height = absoluteBoundingBox?.height ?? readNumber(node, "height", 0)

  return createBounds(x, y, width, height)
}

function getRelativeBounds(bounds: Bounds, origin: Bounds): Bounds {
  return createBounds(
    bounds.x - origin.x,
    bounds.y - origin.y,
    bounds.width,
    bounds.height
  )
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

function toPercent(value: number, total: number): number {
  return total === 0 ? 0 : roundLayoutNumber((value / total) * 100)
}

function roundLayoutNumber(value: number): number {
  return Math.round(value * 1000) / 1000
}

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min
  }

  return Math.min(max, Math.max(min, value))
}

function toJsonValue(value: unknown): FigmaJsonValue {
  if (value === figma.mixed) {
    return "mixed"
  }

  if (value == null) {
    return null
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value
  }

  if (Array.isArray(value)) {
    return value.map((item) => toJsonValue(item))
  }

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, toJsonValue(entry)])
    )
  }

  return String(value)
}

function sendToUi(message: PluginToUiMessage) {
  figma.ui.postMessage(message)
}
