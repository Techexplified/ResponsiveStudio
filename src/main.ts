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
type JsonExportPayload = Extract<UiToPluginMessage, { type: "create-export-frame-from-json" }>["payload"]
type JsonExportLayoutRules = JsonExportPayload["layoutRules"]
type EffectiveJsonExportRules = Omit<ResponsiveNodeRule, "enabled">
type EffectiveGenerationRules = Omit<ResponsiveNodeRule, "enabled">
type SerializedLayoutMode = "NONE" | "HORIZONTAL" | "VERTICAL" | "GRID"
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
      return
    }

    if (message.type === "create-export-frame-from-json") {
      createExportFrameFromJson(message.payload).catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "Could not create export frame from JSON."
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
  const referenceWidth = clampNumber(payload.screenWidth, 1, 10000)
  const normalizedPayload = {
    ...payload,
    sourceWidth,
    screenWidth: referenceWidth
  }
  const sourceFrame = payload.sourceFrame ?? serializeFrame(sourceNode)
  const materializedFrame = materializeExportPreviewFrame({
    frame: sourceFrame,
    screenWidth: referenceWidth,
    layoutRules: normalizedPayload.layoutRules
  })
  const generatedNode = await createSceneNodeFromSerializedNode(materializedFrame, true)

  if (!isImportableFrameNode(generatedNode)) {
    figma.notify("Generated responsive output must resolve to a frame.")
    return
  }

  generatedNode.name = `${sourceNode.name} / ${getDeviceLabel(payload.targetDevice)}`
  generatedNode.x = sourceNode.x + sourceNode.width + 80
  generatedNode.y = sourceNode.y
  figma.currentPage.appendChild(generatedNode)

  figma.currentPage.selection = [generatedNode]
  figma.viewport.scrollAndZoomIntoView([generatedNode])
  figma.notify(`Generated ${getDeviceLabel(payload.targetDevice)} responsive frame from ${Math.round(referenceWidth)}px reference.`)
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

function resizeRootGeneratedFrame(node: SceneNode, referenceWidth: number) {
  setGeneratedRootSizing(node)

  if (!canResize(node)) {
    return
  }

  const currentHeight = readNumber(node, "height", 1)

  resizeSceneNode(node, referenceWidth, currentHeight)
  setGeneratedRootSizing(node)
}

function setGeneratedRootSizing(node: SceneNode) {
  if ("layoutSizingHorizontal" in node) {
    node.layoutSizingHorizontal = "FIXED"
  }

  if ("layoutSizingVertical" in node) {
    node.layoutSizingVertical = "HUG"
  }

  if (!hasAutoLayout(node)) {
    return
  }

  const layoutMode = getCurrentLayoutMode(node)

  if (layoutMode === "HORIZONTAL") {
    node.primaryAxisSizingMode = "FIXED"
    node.counterAxisSizingMode = "AUTO"
  } else if (layoutMode === "VERTICAL") {
    node.primaryAxisSizingMode = "AUTO"
    node.counterAxisSizingMode = "FIXED"
  } else {
    node.primaryAxisSizingMode = "FIXED"
    node.counterAxisSizingMode = "AUTO"
  }
}

async function createExportFrameFromJson(payload: JsonExportPayload) {
  const materializedFrame = materializeExportPreviewFrame(payload)
  const exportFrame = await createSceneNodeFromSerializedNode(materializedFrame, true)

  if (!isImportableFrameNode(exportFrame)) {
    figma.notify("JSON export must resolve to a frame.")
    return
  }

  exportFrame.name = materializedFrame.name
  exportFrame.x = getNextExportFrameX(materializedFrame.geometry.width)
  exportFrame.y = figma.viewport.center.y - materializedFrame.geometry.height / 2
  figma.currentPage.appendChild(exportFrame)
  figma.currentPage.selection = [exportFrame]
  figma.viewport.scrollAndZoomIntoView([exportFrame])
  figma.notify(`Created export frame "${exportFrame.name}" from JSON.`)
}

function materializeExactExportFrame(frame: FigmaSerializedFrame): FigmaSerializedFrame {
  return {
    ...withSerializedGeometry(
      {
        ...frame,
        layout: getStaticSerializedLayout(frame),
        children: frame.children.map((child) => materializeExactExportNode(child))
      },
      0,
      0,
      frame.geometry.width,
      frame.geometry.height
    ),
    type: frame.type,
    schemaVersion: 1,
    importedAt: frame.importedAt
  }
}

function materializeExactExportNode(node: FigmaSerializedNode): FigmaSerializedNode {
  return withSerializedGeometry(
    {
      ...node,
      layout: getStaticSerializedLayout(node),
      children: node.children.map((child) => materializeExactExportNode(child))
    },
    node.geometry.x,
    node.geometry.y,
    node.geometry.width,
    node.geometry.height
  )
}

function materializeExportPreviewFrame(payload: JsonExportPayload): FigmaSerializedFrame {
  const reviewWidth = Number.isFinite(payload.screenWidth) && payload.screenWidth > 0
    ? payload.screenWidth
    : payload.frame.geometry.width
  const exportGroups = createJsonExportReviewGroups(payload.frame, reviewWidth, payload.layoutRules)
  const reviewHeight = Math.max(
    Math.min(payload.frame.geometry.height, 760),
    exportGroups.reduce((bottom, group) => Math.max(bottom, group.y + group.height), 0) + 24
  )

  return {
    ...withSerializedGeometry(
      {
        ...payload.frame,
        layout: getStaticSerializedLayout(payload.frame),
        children: exportGroups.map((group) => materializeJsonExportNode({
          node: group.node,
          origin: group.sourceBounds,
          scale: group.scale,
          layoutRules: payload.layoutRules,
          reviewWidth,
          x: group.x,
          y: group.y,
          width: group.width,
          height: group.height
        }))
      },
      0,
      0,
      reviewWidth,
      reviewHeight
    ),
    type: payload.frame.type,
    schemaVersion: 1,
    importedAt: payload.frame.importedAt
  }
}

function createJsonExportReviewGroups(frame: FigmaSerializedFrame, reviewWidth: number, layoutRules: JsonExportLayoutRules): Array<{
  node: FigmaSerializedNode
  x: number
  y: number
  width: number
  height: number
  sourceBounds: Pick<FigmaSerializedNode["geometry"], "x" | "y" | "width" | "height">
  scale: number
}> {
  const outerPadding = layoutRules.outputPadding
  const rootReplacement = materializeJsonExportReplacementNode(frame, reviewWidth)

  if (rootReplacement != null) {
    return [{
      node: rootReplacement,
      x: outerPadding,
      y: outerPadding,
      width: rootReplacement.geometry.width,
      height: rootReplacement.geometry.height,
      sourceBounds: rootReplacement.geometry,
      scale: 1
    }]
  }

  const contentWidth = Math.max(1, reviewWidth - outerPadding * 2)
  const visibleChildren = frame.children
    .filter((child) => child.visible)
    .map((child) => materializeJsonExportReplacementNode(child, reviewWidth) ?? child)
    .sort((first, second) => first.geometry.y - second.geometry.y || first.geometry.x - second.geometry.x)
  let nextY = outerPadding

  return visibleChildren.map((child) => {
    const sourceBounds = child.geometry
    const scale = contentWidth / Math.max(sourceBounds.width, 1)
    const height = Math.max(1, getJsonExportNodeHeight(child, layoutRules, reviewWidth) * scale)
    const group = {
      node: child,
      x: outerPadding,
      y: nextY,
      width: contentWidth,
      height,
      sourceBounds,
      scale
    }

    nextY += height + layoutRules.stackGap

    return group
  })
}

function materializeJsonExportNode({
  node,
  origin,
  scale,
  layoutRules,
  reviewWidth,
  x = (node.geometry.x - origin.x) * scale,
  y = (node.geometry.y - origin.y) * scale,
  width = node.geometry.width * scale,
  height = getJsonExportNodeHeight(node, layoutRules, reviewWidth) * scale
}: {
  node: FigmaSerializedNode
  origin: Pick<FigmaSerializedNode["geometry"], "x" | "y">
  scale: number
  layoutRules: JsonExportLayoutRules
  reviewWidth: number
  x?: number
  y?: number
  width?: number
  height?: number
}): FigmaSerializedNode {
  const arrangedChildren = arrangeJsonExportChildren(node, layoutRules, reviewWidth)
  const text = node.text == null
    ? undefined
    : {
        ...node.text,
        fontSize: typeof node.text.fontSize === "number"
          ? getJsonExportFontSize(node.text.fontSize, scale, layoutRules)
          : node.text.fontSize,
        lineHeight: scaleJsonExportLineHeight(node.text.lineHeight, scale)
      }
  const style = {
    ...node.style,
    strokeWeight: typeof node.style.strokeWeight === "number"
      ? node.style.strokeWeight * scale
      : node.style.strokeWeight,
    cornerRadius: typeof node.style.cornerRadius === "number"
      ? node.style.cornerRadius * scale
      : node.style.cornerRadius
  }

  return withSerializedGeometry(
    {
      ...node,
      layout: getStaticSerializedLayout(node),
      style,
      text,
      children: arrangedChildren
        .filter((child) => child.node.visible)
        .map((child) => materializeJsonExportNode({
          node: child.node,
          origin: { x: 0, y: 0 },
          scale,
          layoutRules,
          reviewWidth
        }))
    },
    x,
    y,
    width,
    height
  )
}

function materializeJsonExportReplacementNode(
  node: FigmaSerializedNode,
  reviewWidth: number
): FigmaSerializedNode | null {
  const rule = node.responsive?.replacement

  if (!isReplacementActive(rule, reviewWidth)) {
    return null
  }

  const { width, height } = getSerializedReplacementDimensions(node, rule)
  const lineWidth = Math.max(12, Math.min(width - 12, Math.round(width * 0.5)))
  const lineHeight = Math.max(2, Math.min(4, Math.round(height * 0.08)))
  const gap = Math.max(4, Math.round(height * 0.12))
  const totalLineHeight = lineHeight * 3 + gap * 2
  const startX = Math.max(0, (width - lineWidth) / 2)
  const startY = Math.max(0, (height - totalLineHeight) / 2)

  return {
    ...withSerializedGeometry(node, node.geometry.x, node.geometry.y, width, height),
    name: `${node.name} / hamburger`,
    layout: getStaticSerializedLayout(node),
    style: {
      ...node.style,
      fills: [createSerializedSolidPaint(1, 1, 1)],
      strokes: [createSerializedSolidPaint(0.15, 0.17, 0.2)],
      strokeWeight: 1,
      cornerRadius: 8
    },
    text: undefined,
    children: [0, 1, 2].map((index) => ({
      id: `${node.id}-hamburger-line-${index}`,
      name: `Hamburger line ${index + 1}`,
      type: "RECTANGLE",
      visible: true,
      locked: false,
      geometry: createSerializedGeometry(
        startX,
        startY + index * (lineHeight + gap),
        lineWidth,
        lineHeight
      ),
      layout: {
        isAutoLayout: false,
        layoutMode: "NONE",
        layoutSizingHorizontal: "FIXED",
        layoutSizingVertical: "FIXED"
      },
      style: {
        fills: [createSerializedSolidPaint(0.1, 0.12, 0.16)],
        cornerRadius: 999
      },
      children: []
    }))
  }
}

function createSerializedSolidPaint(r: number, g: number, b: number): FigmaJsonValue {
  return {
    type: "SOLID",
    visible: true,
    opacity: 1,
    color: {
      r,
      g,
      b
    }
  }
}

function getJsonExportNodeHeight(
  node: FigmaSerializedNode,
  layoutRules: JsonExportLayoutRules,
  reviewWidth: number
): number {
  const replacementNode = materializeJsonExportReplacementNode(node, reviewWidth)

  if (replacementNode != null) {
    return replacementNode.geometry.height
  }

  if (node.children.length === 0) {
    return node.geometry.height
  }

  const arrangedChildren = arrangeJsonExportChildren(node, layoutRules, reviewWidth)
  const childrenBottom = arrangedChildren.reduce((bottom, child) => {
    return Math.max(
      bottom,
      child.node.geometry.y + getJsonExportNodeHeight(child.node, layoutRules, reviewWidth)
    )
  }, 0)
  const padding = node.layout.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  if (getJsonExportNodeAxisSizing(node, "vertical") === "HUG") {
    return Math.max(1, childrenBottom + padding.bottom)
  }

  return Math.max(node.geometry.height, childrenBottom)
}

function arrangeJsonExportChildren(
  node: FigmaSerializedNode,
  layoutRules: JsonExportLayoutRules,
  reviewWidth: number
): Array<{ node: FigmaSerializedNode }> {
  const layoutNode = {
    ...node,
    children: node.children.map((child) => materializeJsonExportReplacementNode(child, reviewWidth) ?? child)
  }
  const effectiveRules = getEffectiveJsonExportRules(layoutNode, layoutRules)
  const convertedLayoutMode = getConvertedJsonExportLayoutMode(layoutNode, effectiveRules, reviewWidth)
  const activeLayoutMode = convertedLayoutMode ?? getNativeJsonExportLayoutMode(layoutNode)
  const sourceParentLayoutMode = getNativeJsonExportLayoutMode(layoutNode) ?? activeLayoutMode
  const activeRules = convertedLayoutMode == null
    ? getNativeJsonExportLayoutRules(layoutNode, effectiveRules)
    : effectiveRules

  if (activeLayoutMode == null) {
    return layoutNode.children.map((child) => ({ node: child }))
  }

  if (activeLayoutMode === "HORIZONTAL") {
    return arrangeJsonExportChildrenHorizontally(layoutNode, layoutRules, activeRules, reviewWidth, sourceParentLayoutMode)
  }

  return arrangeJsonExportChildrenVertically(layoutNode, layoutRules, activeRules, reviewWidth, sourceParentLayoutMode)
}

function arrangeJsonExportChildrenVertically(
  node: FigmaSerializedNode,
  layoutRules: JsonExportLayoutRules,
  effectiveRules: EffectiveJsonExportRules,
  reviewWidth: number,
  sourceParentLayoutMode: "HORIZONTAL" | "VERTICAL" | null
): Array<{ node: FigmaSerializedNode }> {
  const padding = node.layout.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right)
  const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom)
  const childLayouts = node.children.map((child) => {
    const childWidth = shouldFillJsonExportAxis(
      child,
      "horizontal",
      effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH",
      "VERTICAL",
      sourceParentLayoutMode
    )
      ? contentWidth
      : Math.min(child.geometry.width, contentWidth)
    const childForWidth = withSerializedGeometry(
      child,
      child.geometry.x,
      child.geometry.y,
      childWidth,
      child.geometry.height
    )

    return {
      child,
      childWidth,
      baseHeight: getJsonExportNodeHeight(childForWidth, layoutRules, reviewWidth),
      fillsHeight: shouldFillJsonExportAxis(child, "vertical", false, "VERTICAL", sourceParentLayoutMode)
    }
  })
  const justify = getJsonExportMainAxisAlign(node)
  const align = getJsonExportCrossAxisAlign(node, effectiveRules)
  const baseGap = effectiveRules.stackGap
  const baseGapTotal = baseGap * Math.max(0, childLayouts.length - 1)
  const fillHeightCount = childLayouts.filter((child) => child.fillsHeight).length
  const fixedHeightTotal = childLayouts.reduce((total, child) => {
    return child.fillsHeight ? total : total + child.baseHeight
  }, 0)
  const fillHeight = fillHeightCount === 0
    ? 0
    : Math.max(1, (contentHeight - baseGapTotal - fixedHeightTotal) / fillHeightCount)
  const totalChildrenHeight = childLayouts.reduce((total, child) => {
    return total + (child.fillsHeight ? fillHeight : child.baseHeight)
  }, 0)
  const mainUsed = totalChildrenHeight + baseGapTotal
  const dynamicGap = getJsonExportDynamicMainAxisGap(justify, baseGap, contentHeight, totalChildrenHeight, childLayouts.length)
  let nextY = padding.top + getJsonExportMainAxisOffset(justify, contentHeight, mainUsed)

  return childLayouts.map((childLayout) => {
    const child = childLayout.child
    const childWidth = childLayout.childWidth
    const childHeight = childLayout.fillsHeight ? fillHeight : childLayout.baseHeight
    const childX = padding.left + getJsonExportCrossAxisOffset(align, contentWidth, childWidth)
    const nextChild = withSerializedGeometry(
      child,
      childX,
      nextY,
      childWidth,
      childHeight
    )

    nextY += childHeight + dynamicGap

    return {
      node: nextChild
    }
  })
}

function arrangeJsonExportChildrenHorizontally(
  node: FigmaSerializedNode,
  _layoutRules: JsonExportLayoutRules,
  effectiveRules: EffectiveJsonExportRules,
  _reviewWidth: number,
  sourceParentLayoutMode: "HORIZONTAL" | "VERTICAL" | null
): Array<{ node: FigmaSerializedNode }> {
  const padding = node.layout.padding ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right)
  const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom)
  const childLayouts = node.children.map((child) => ({
    child,
    fillsWidth: shouldFillJsonExportAxis(child, "horizontal", false, "HORIZONTAL", sourceParentLayoutMode),
    childHeight: shouldFillJsonExportAxis(
      child,
      "vertical",
      effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH",
      "HORIZONTAL",
      sourceParentLayoutMode
    )
      ? contentHeight
      : child.geometry.height
  }))
  const justify = getJsonExportMainAxisAlign(node)
  const align = getJsonExportCrossAxisAlign(node, effectiveRules)
  const baseGap = effectiveRules.stackGap
  const baseGapTotal = baseGap * Math.max(0, childLayouts.length - 1)
  const fillWidthCount = childLayouts.filter((child) => child.fillsWidth).length
  const fixedWidthTotal = childLayouts.reduce((total, child) => {
    return child.fillsWidth ? total : total + child.child.geometry.width
  }, 0)
  const fillChildWidth = fillWidthCount === 0
    ? 0
    : Math.max(1, (contentWidth - baseGapTotal - fixedWidthTotal) / fillWidthCount)
  const totalChildrenWidth = childLayouts.reduce((total, child) => {
    return total + (child.fillsWidth ? fillChildWidth : child.child.geometry.width)
  }, 0)
  const mainUsed = totalChildrenWidth + baseGapTotal
  const dynamicGap = getJsonExportDynamicMainAxisGap(justify, baseGap, contentWidth, totalChildrenWidth, childLayouts.length)
  let nextX = padding.left + getJsonExportMainAxisOffset(justify, contentWidth, mainUsed)

  return childLayouts.map((childLayout) => {
    const child = childLayout.child
    const childWidth = childLayout.fillsWidth ? fillChildWidth : child.geometry.width
    const childHeight = childLayout.childHeight
    const childY = padding.top + getJsonExportCrossAxisOffset(align, contentHeight, childHeight)
    const nextChild = withSerializedGeometry(
      child,
      nextX,
      childY,
      childWidth,
      childHeight
    )

    nextX += childWidth + dynamicGap

    return {
      node: nextChild
    }
  })
}

function getConvertedJsonExportLayoutMode(
  node: FigmaSerializedNode,
  layoutRules: EffectiveJsonExportRules,
  reviewWidth: number
): "HORIZONTAL" | "VERTICAL" | null {
  if (layoutRules.rowToColumnMode === "always") {
    return getTargetJsonExportLayoutMode(node, layoutRules)
  }

  if (layoutRules.rowToColumnMode === "never") {
    return null
  }

  const shouldConvert = layoutRules.conversionDirection === "row-to-column"
    ? reviewWidth <= layoutRules.rowToColumnBreakpoint
    : reviewWidth >= layoutRules.rowToColumnBreakpoint

  return shouldConvert ? getTargetJsonExportLayoutMode(node, layoutRules) : null
}

function getTargetJsonExportLayoutMode(
  node: FigmaSerializedNode,
  layoutRules: EffectiveJsonExportRules
): "HORIZONTAL" | "VERTICAL" | null {
  if (layoutRules.conversionDirection === "row-to-column") {
    return node.layout.layoutMode === "HORIZONTAL" ? "VERTICAL" : null
  }

  return node.layout.layoutMode === "VERTICAL" ? "HORIZONTAL" : null
}

function getNativeJsonExportLayoutMode(node: FigmaSerializedNode): "HORIZONTAL" | "VERTICAL" | null {
  if (node.layout.layoutMode === "HORIZONTAL" || node.layout.layoutMode === "VERTICAL") {
    return node.layout.layoutMode
  }

  return null
}

function getNativeJsonExportLayoutRules(
  node: FigmaSerializedNode,
  fallbackRules: EffectiveJsonExportRules
): EffectiveJsonExportRules {
  return {
    ...fallbackRules,
    stackGap: node.layout.itemSpacing ?? fallbackRules.stackGap,
    stackAlignment: getNativeJsonExportStackAlignment(node)
  }
}

function getNativeJsonExportStackAlignment(
  node: FigmaSerializedNode
): EffectiveJsonExportRules["stackAlignment"] {
  if (node.layout.counterAxisAlignItems === "CENTER" || node.layout.counterAxisAlignItems === "BASELINE") {
    return "center"
  }

  return "start"
}

function getEffectiveJsonExportRules(
  node: FigmaSerializedNode,
  layoutRules: JsonExportLayoutRules
): EffectiveJsonExportRules {
  const nodeRule = node.responsive?.nodeRule

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
    conversionDirection: layoutRules.conversionDirection,
    rowToColumnMode: layoutRules.rowToColumnMode,
    rowToColumnBreakpoint: layoutRules.rowToColumnBreakpoint,
    stackGap: layoutRules.stackGap,
    stackAlignment: layoutRules.stackAlignment
  }
}

function shouldFillJsonExportAxis(
  node: FigmaSerializedNode,
  axis: "horizontal" | "vertical",
  defaultFill: boolean,
  parentLayoutMode: "HORIZONTAL" | "VERTICAL" | null = null,
  sourceParentLayoutMode: "HORIZONTAL" | "VERTICAL" | null = parentLayoutMode
): boolean {
  const sizingMode = getJsonExportNodeAxisSizingForParent(node, axis, parentLayoutMode, sourceParentLayoutMode)

  return sizingMode === "FILL" || (sizingMode == null && defaultFill)
}

function getJsonExportNodeAxisSizingForParent(
  node: FigmaSerializedNode,
  axis: "horizontal" | "vertical",
  parentLayoutMode: "HORIZONTAL" | "VERTICAL" | null,
  sourceParentLayoutMode: "HORIZONTAL" | "VERTICAL" | null
): "FILL" | "HUG" | "FIXED" | null {
  return getJsonExportNodeAxisSizing(
    node,
    getSourceAxisForTargetAxis(axis, parentLayoutMode, sourceParentLayoutMode),
    sourceParentLayoutMode
  )
}

function getJsonExportNodeAxisSizing(
  node: FigmaSerializedNode,
  axis: "horizontal" | "vertical",
  parentLayoutMode: "HORIZONTAL" | "VERTICAL" | null = null
): "FILL" | "HUG" | "FIXED" | null {
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

function getJsonExportFontSize(
  fontSize: number,
  scale: number,
  layoutRules: JsonExportLayoutRules
): number {
  const scaledSize = fontSize * scale

  if (layoutRules.textScaleMode === "preserve") {
    return Math.max(8, scaledSize)
  }

  if (layoutRules.textScaleMode === "scale") {
    return Math.max(layoutRules.minimumTextSize, scaledSize)
  }

  return Math.max(layoutRules.minimumTextSize, Math.min(fontSize, scaledSize))
}

function scaleJsonExportLineHeight(lineHeight: FigmaJsonValue | undefined, scale: number): FigmaJsonValue | undefined {
  const lineHeightObject = asJsonObject(lineHeight)

  if (
    lineHeightObject != null &&
    lineHeightObject.unit === "PIXELS" &&
    typeof lineHeightObject.value === "number"
  ) {
    return {
      ...lineHeightObject,
      value: lineHeightObject.value * scale
    }
  }

  return lineHeight
}

function getJsonExportMainAxisAlign(node: FigmaSerializedNode): string {
  return typeof node.layout.primaryAxisAlignItems === "string"
    ? node.layout.primaryAxisAlignItems
    : "MIN"
}

function getJsonExportCrossAxisAlign(node: FigmaSerializedNode, layoutRules: EffectiveJsonExportRules): string {
  if (typeof node.layout.counterAxisAlignItems === "string") {
    return node.layout.counterAxisAlignItems
  }

  if (layoutRules.stackAlignment === "center") {
    return "CENTER"
  }

  return "MIN"
}

function getJsonExportDynamicMainAxisGap(
  justify: string,
  baseGap: number,
  mainSize: number,
  totalChildrenMainSize: number,
  childCount: number
): number {
  return justify === "SPACE_BETWEEN" && childCount > 1
    ? Math.max(baseGap, (mainSize - totalChildrenMainSize) / (childCount - 1))
    : baseGap
}

function getJsonExportMainAxisOffset(justify: string, mainSize: number, mainUsed: number): number {
  const remaining = Math.max(0, mainSize - mainUsed)

  if (justify === "CENTER") {
    return remaining / 2
  }

  if (justify === "MAX") {
    return remaining
  }

  return 0
}

function getJsonExportCrossAxisOffset(align: string, crossSize: number, childCrossSize: number): number {
  const remaining = Math.max(0, crossSize - childCrossSize)

  if (align === "CENTER" || align === "BASELINE") {
    return remaining / 2
  }

  if (align === "MAX") {
    return remaining
  }

  return 0
}

function getStaticSerializedLayout(node: FigmaSerializedNode): FigmaSerializedNode["layout"] {
  return {
    ...node.layout,
    isAutoLayout: false,
    autoLayoutDirection: "NONE",
    layoutMode: "NONE",
    layoutAlign: "INHERIT",
    layoutGrow: 0,
    layoutSizingHorizontal: "FIXED",
    layoutSizingVertical: "FIXED"
  }
}

function createSerializedGeometry(
  x: number,
  y: number,
  width: number,
  height: number
): FigmaSerializedNode["geometry"] {
  const safeX = roundLayoutNumber(x)
  const safeY = roundLayoutNumber(y)
  const safeWidth = Math.max(1, roundLayoutNumber(width))
  const safeHeight = Math.max(1, roundLayoutNumber(height))
  const bounds = createBounds(safeX, safeY, safeWidth, safeHeight)

  return {
    x: safeX,
    y: safeY,
    width: safeWidth,
    height: safeHeight,
    rotation: 0,
    absoluteBounds: bounds,
    parentRelativeBounds: bounds,
    rootRelativeBounds: bounds,
    percentOfRoot: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      right: 0,
      bottom: 0
    },
    hierarchy: {
      parentId: null,
      depth: 0,
      siblingIndex: 0,
      siblingCount: 1
    }
  }
}

function withSerializedGeometry<T extends FigmaSerializedNode>(
  node: T,
  x: number,
  y: number,
  width: number,
  height: number
): T {
  const safeX = roundLayoutNumber(x)
  const safeY = roundLayoutNumber(y)
  const safeWidth = Math.max(1, roundLayoutNumber(width))
  const safeHeight = Math.max(1, roundLayoutNumber(height))
  const bounds = createBounds(safeX, safeY, safeWidth, safeHeight)

  return {
    ...node,
    geometry: {
      ...node.geometry,
      x: safeX,
      y: safeY,
      width: safeWidth,
      height: safeHeight,
      absoluteBounds: bounds,
      parentRelativeBounds: bounds,
      rootRelativeBounds: bounds
    }
  }
}

async function createSceneNodeFromSerializedNode(node: FigmaSerializedNode, isRoot = false): Promise<SceneNode> {
  const sceneNode = await createBaseSceneNode(node)

  applySerializedNodeProperties(sceneNode, node, isRoot)

  if (hasChildren(sceneNode)) {
    for (const child of node.children) {
      const childNode = await createSceneNodeFromSerializedNode(child)

      sceneNode.appendChild(childNode)
    }
  }

  return sceneNode
}

async function createBaseSceneNode(node: FigmaSerializedNode): Promise<SceneNode> {
  if (node.type === "TEXT") {
    const textNode = figma.createText()

    await applySerializedText(textNode, node)

    return textNode
  }

  if (
    node.type === "FRAME" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE" ||
    node.type === "RESPONSIVE_GROUP" ||
    node.responsive?.isVirtualGroup === true ||
    node.children.length > 0
  ) {
    return figma.createFrame()
  }

  if (node.type === "RECTANGLE") {
    return figma.createRectangle()
  }

  return figma.createRectangle()
}

function applySerializedNodeProperties(sceneNode: SceneNode, node: FigmaSerializedNode, isRoot = false) {
  sceneNode.name = node.name
  sceneNode.visible = node.visible
  sceneNode.locked = node.locked
  sceneNode.x = node.geometry.x
  sceneNode.y = node.geometry.y

  if ("rotation" in sceneNode) {
    sceneNode.rotation = node.geometry.rotation
  }

  if (canResize(sceneNode)) {
    sceneNode.resize(
      Math.max(1, node.geometry.width),
      Math.max(1, node.geometry.height)
    )
  }

  if ("opacity" in sceneNode && typeof node.style.opacity === "number") {
    sceneNode.opacity = clampNumber(node.style.opacity, 0, 1)
  }

  if ("fills" in sceneNode) {
    const fills = toFigmaReadonlyArray<Paint>(node.style.fills)

    if (fills != null) {
      sceneNode.fills = fills
    } else if (!isRoot) {
      sceneNode.fills = []
    }
  }

  if ("strokes" in sceneNode) {
    const strokes = toFigmaReadonlyArray<Paint>(node.style.strokes)

    if (strokes != null) {
      sceneNode.strokes = strokes
    }
  }

  if ("strokeWeight" in sceneNode && typeof node.style.strokeWeight === "number") {
    sceneNode.strokeWeight = node.style.strokeWeight
  }

  if ("cornerRadius" in sceneNode && typeof node.style.cornerRadius === "number") {
    ;(sceneNode as unknown as { cornerRadius: number }).cornerRadius = node.style.cornerRadius
  }

  if ("effects" in sceneNode) {
    const effects = toFigmaReadonlyArray<Effect>(node.style.effects)

    if (effects != null) {
      sceneNode.effects = effects
    }
  }

  applySerializedLayout(sceneNode, node)
}

async function applySerializedText(textNode: TextNode, node: FigmaSerializedNode) {
  const fontName = toFigmaFontName(node.text?.fontName) ?? { family: "Inter", style: "Regular" }

  await figma.loadFontAsync(fontName)
  textNode.fontName = fontName
  textNode.characters = node.text?.characters ?? ""

  if (typeof node.text?.fontSize === "number") {
    textNode.fontSize = node.text.fontSize
  }

  if (node.text?.textAlignHorizontal === "LEFT" || node.text?.textAlignHorizontal === "CENTER" || node.text?.textAlignHorizontal === "RIGHT" || node.text?.textAlignHorizontal === "JUSTIFIED") {
    textNode.textAlignHorizontal = node.text.textAlignHorizontal
  }

  if (node.text?.textAlignVertical === "TOP" || node.text?.textAlignVertical === "CENTER" || node.text?.textAlignVertical === "BOTTOM") {
    textNode.textAlignVertical = node.text.textAlignVertical
  }

  const lineHeight = toFigmaLineHeight(node.text?.lineHeight)

  if (lineHeight != null) {
    textNode.lineHeight = lineHeight
  }
}

function applySerializedLayout(sceneNode: SceneNode, node: FigmaSerializedNode) {
  if (hasAutoLayout(sceneNode)) {
    const layoutMode = getSerializedLayoutMode(node.layout.layoutMode)

    setSerializedSceneLayoutMode(sceneNode, layoutMode)

    if (layoutMode !== "NONE") {
      sceneNode.itemSpacing = clampNumber(node.layout.itemSpacing ?? 0, 0, 1000)
      sceneNode.primaryAxisAlignItems = toFigmaAxisAlign(node.layout.primaryAxisAlignItems)
      sceneNode.counterAxisAlignItems = toFigmaCounterAxisAlign(node.layout.counterAxisAlignItems)
      sceneNode.primaryAxisSizingMode = toFigmaAxisSizing(node.layout.primaryAxisSizingMode)
      sceneNode.counterAxisSizingMode = toFigmaAxisSizing(node.layout.counterAxisSizingMode)

      const padding = node.layout.padding

      if (padding != null) {
        sceneNode.paddingTop = padding.top
        sceneNode.paddingRight = padding.right
        sceneNode.paddingBottom = padding.bottom
        sceneNode.paddingLeft = padding.left
      }
    }
  }

  if ("layoutAlign" in sceneNode && (node.layout.layoutAlign === "INHERIT" || node.layout.layoutAlign === "STRETCH")) {
    sceneNode.layoutAlign = node.layout.layoutAlign
  }

  if ("layoutGrow" in sceneNode && typeof node.layout.layoutGrow === "number") {
    sceneNode.layoutGrow = node.layout.layoutGrow
  }

  if ("layoutSizingHorizontal" in sceneNode && isFigmaLayoutSizingMode(node.layout.layoutSizingHorizontal)) {
    sceneNode.layoutSizingHorizontal = node.layout.layoutSizingHorizontal
  }

  if ("layoutSizingVertical" in sceneNode && isFigmaLayoutSizingMode(node.layout.layoutSizingVertical)) {
    sceneNode.layoutSizingVertical = node.layout.layoutSizingVertical
  }
}

function getSerializedLayoutMode(value: string | undefined): SerializedLayoutMode {
  if (value === "HORIZONTAL" || value === "VERTICAL" || value === "GRID") {
    return value
  }

  return "NONE"
}

function setSerializedSceneLayoutMode(sceneNode: SceneNode & AutoLayoutMixin, layoutMode: SerializedLayoutMode) {
  if (layoutMode === "GRID") {
    try {
      ;(sceneNode as unknown as { layoutMode: SerializedLayoutMode }).layoutMode = layoutMode
    } catch (_error) {
      console.warn("This Figma runtime does not support GRID layout mode; created the node without Auto Layout grid.")
      sceneNode.layoutMode = "NONE"
    }
    return
  }

  sceneNode.layoutMode = layoutMode
}

function getNextExportFrameX(width: number): number {
  const selectedNodes = figma.currentPage.selection

  if (selectedNodes.length > 0) {
    return Math.max(...selectedNodes.map((node) => readNumber(node, "x", 0) + readNumber(node, "width", 0))) + 80
  }

  return figma.viewport.center.x - width / 2
}

function toFigmaReadonlyArray<T>(value: FigmaJsonValue | undefined): ReadonlyArray<T> | null {
  if (!Array.isArray(value)) {
    return null
  }

  return value as unknown as ReadonlyArray<T>
}

function toFigmaFontName(value: FigmaJsonValue | undefined): FontName | null {
  const fontName = asJsonObject(value)

  if (fontName == null || typeof fontName.family !== "string" || typeof fontName.style !== "string") {
    return null
  }

  return {
    family: fontName.family,
    style: fontName.style
  }
}

function toFigmaLineHeight(value: FigmaJsonValue | undefined): LineHeight | null {
  const lineHeight = asJsonObject(value)

  if (lineHeight == null || typeof lineHeight.unit !== "string") {
    return null
  }

  if (
    lineHeight.unit === "PIXELS" &&
    typeof lineHeight.value === "number"
  ) {
    return {
      unit: "PIXELS",
      value: lineHeight.value
    }
  }

  if (
    lineHeight.unit === "PERCENT" &&
    typeof lineHeight.value === "number"
  ) {
    return {
      unit: "PERCENT",
      value: lineHeight.value
    }
  }

  if (lineHeight.unit === "AUTO") {
    return {
      unit: "AUTO"
    }
  }

  return null
}

function toFigmaAxisAlign(value: string | undefined): "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN" {
  if (value === "CENTER" || value === "MAX" || value === "SPACE_BETWEEN") {
    return value
  }

  return "MIN"
}

function toFigmaCounterAxisAlign(value: string | undefined): "MIN" | "CENTER" | "MAX" | "BASELINE" {
  if (value === "CENTER" || value === "MAX" || value === "BASELINE") {
    return value
  }

  return "MIN"
}

function toFigmaAxisSizing(value: string | undefined): "FIXED" | "AUTO" {
  return value === "AUTO" ? "AUTO" : "FIXED"
}

function isFigmaLayoutSizingMode(value: string | undefined): value is "FIXED" | "HUG" | "FILL" {
  return value === "FIXED" || value === "HUG" || value === "FILL"
}

function asJsonObject(value: FigmaJsonValue | undefined): { [key: string]: FigmaJsonValue } | null {
  return value != null && !Array.isArray(value) && typeof value === "object"
    ? value
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

  if (sourceNode?.responsive?.replacement != null && isReplacementActive(sourceNode.responsive.replacement, payload.screenWidth)) {
    applyReplacementToSceneNode(node, sourceNode.responsive.replacement)
    return
  }

  if (hasAutoLayout(node)) {
    const nextLayoutMode = getConvertedLayoutMode(node, payload, effectiveRules)

    if (nextLayoutMode != null) {
      node.layoutMode = nextLayoutMode
      node.itemSpacing = clampNumber(effectiveRules.stackGap, 0, 200)
      node.counterAxisAlignItems = getFigmaCounterAxisAlignment(effectiveRules.stackAlignment)
    }

    if (isRootResponsiveNode(node)) {
      const padding = clampNumber(payload.layoutRules.outputPadding, 0, 200)
      node.paddingTop = padding
      node.paddingRight = padding
      node.paddingBottom = padding
      node.paddingLeft = padding
      resizeRootGeneratedFrame(node, payload.screenWidth)
    }

    const activeLayoutMode = nextLayoutMode ?? getCurrentLayoutMode(node)

    if (activeLayoutMode != null) {
      applyConvertedChildSizing(node, activeLayoutMode, effectiveRules.stackAlignment, sourceNode)
      applyResponsiveChildGeometry(node, activeLayoutMode, effectiveRules, sourceNode)
    }

    if (isRootResponsiveNode(node)) {
      resizeRootGeneratedFrame(node, payload.screenWidth)
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

  const widthScale = clampNumber(payload.screenWidth / sourceWidth, 0.5, 2)
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

function applyReplacementToSceneNode(
  node: SceneNode,
  rule: NonNullable<FigmaSerializedNode["responsive"]>["replacement"]
) {
  if (rule == null || rule.preset !== "hamburger") {
    return
  }

  const { width, height } = getSceneReplacementDimensions(node, rule)

  if (hasChildren(node)) {
    while (node.children.length > 0) {
      node.children[0].remove()
    }
  }

  if ("layoutGrow" in node) {
    node.layoutGrow = 0
  }

  if ("layoutAlign" in node) {
    node.layoutAlign = "INHERIT"
  }

  if ("layoutSizingHorizontal" in node) {
    node.layoutSizingHorizontal = "FIXED"
  }

  if ("layoutSizingVertical" in node) {
    node.layoutSizingVertical = "FIXED"
  }

  if (hasAutoLayout(node)) {
    node.layoutMode = "NONE"
    node.primaryAxisSizingMode = "FIXED"
    node.counterAxisSizingMode = "FIXED"
  }

  resizeSceneNode(node, width, height)

  if ("fills" in node) {
    node.fills = [createSolidPaint(1, 1, 1)]
  }

  if ("strokes" in node) {
    node.strokes = [createSolidPaint(0.15, 0.17, 0.2)]
  }

  if ("strokeWeight" in node) {
    node.strokeWeight = 1
  }

  if ("cornerRadius" in node) {
    ;(node as SceneNode & { cornerRadius: number }).cornerRadius = 8
  }

  if (!hasChildren(node)) {
    return
  }

  const lineWidth = Math.max(12, Math.min(width - 12, Math.round(width * 0.5)))
  const lineHeight = Math.max(2, Math.min(4, Math.round(height * 0.08)))
  const gap = Math.max(4, Math.round(height * 0.12))
  const totalLineHeight = lineHeight * 3 + gap * 2
  const startX = Math.max(0, (width - lineWidth) / 2)
  const startY = Math.max(0, (height - totalLineHeight) / 2)

  for (let index = 0; index < 3; index += 1) {
    const line = figma.createRectangle()

    line.name = `Hamburger line ${index + 1}`
    line.x = startX
    line.y = startY + index * (lineHeight + gap)
    line.resize(lineWidth, lineHeight)
    line.fills = [createSolidPaint(0.1, 0.12, 0.16)]
    line.cornerRadius = 999
    node.appendChild(line)
  }
}

function isReplacementActive(
  rule: NonNullable<FigmaSerializedNode["responsive"]>["replacement"],
  screenWidth: number
): boolean {
  if (rule == null || rule.enabled !== true || rule.preset !== "hamburger") {
    return false
  }

  if (rule.trigger === "always") {
    return true
  }

  if (rule.trigger === "never") {
    return false
  }

  return screenWidth <= rule.breakpoint
}

function clampReplacementDimension(value: number): number {
  return Math.min(10000, Math.max(16, Math.round(value)))
}

function getSerializedReplacementDimensions(
  node: FigmaSerializedNode,
  rule: NonNullable<FigmaSerializedNode["responsive"]>["replacement"]
): {
  width: number
  height: number
} {
  const sizeSource = rule?.sizeSource ?? "custom"
  const size = sizeSource === "width"
    ? node.geometry.width
    : sizeSource === "height"
      ? node.geometry.height
      : rule?.width ?? node.geometry.height
  const squareSize = clampReplacementDimension(size)

  return {
    width: squareSize,
    height: squareSize
  }
}

function getSceneReplacementDimensions(
  node: SceneNode,
  rule: NonNullable<FigmaSerializedNode["responsive"]>["replacement"]
): {
  width: number
  height: number
} {
  const sizeSource = rule?.sizeSource ?? "custom"
  const size = sizeSource === "width"
    ? readNumber(node, "width", rule?.width ?? 44)
    : sizeSource === "height"
      ? readNumber(node, "height", rule?.height ?? 44)
      : rule?.width ?? readNumber(node, "height", 44)
  const squareSize = clampReplacementDimension(size)

  return {
    width: squareSize,
    height: squareSize
  }
}

function createSolidPaint(r: number, g: number, b: number): SolidPaint {
  return {
    type: "SOLID",
    visible: true,
    opacity: 1,
    color: {
      r,
      g,
      b
    }
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

  const sourceParentLayoutMode = getSerializedParentLayoutMode(sourceNode) ?? layoutMode

  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index]
    const sourceChild = sourceNode?.children[index]
    const fillsHorizontal = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "horizontal",
      layoutMode === "VERTICAL" && alignment === "stretch",
      layoutMode,
      sourceParentLayoutMode
    )
    const fillsVertical = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "vertical",
      layoutMode === "HORIZONTAL" && alignment === "stretch",
      layoutMode,
      sourceParentLayoutMode
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
      const sizing = fillsHorizontal
        ? "FILL"
        : getSerializedAxisSizingForParent(sourceChild, "horizontal", layoutMode, sourceParentLayoutMode)

      if (sizing != null) {
        child.layoutSizingHorizontal = sizing
      }
    }

    if ("layoutSizingVertical" in child) {
      const sizing = fillsVertical
        ? "FILL"
        : getSerializedAxisSizingForParent(sourceChild, "vertical", layoutMode, sourceParentLayoutMode)

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
  const sourceParentLayoutMode = getSerializedParentLayoutMode(sourceNode) ?? layoutMode

  if (layoutMode === "VERTICAL") {
    resizeVerticalLayoutChildren(node, sourceNode, sourceParentLayoutMode, contentWidth, contentHeight, gap)
    return
  }

  resizeHorizontalLayoutChildren(node, sourceNode, sourceParentLayoutMode, layoutRules, contentWidth, contentHeight, gap)
}

function resizeVerticalLayoutChildren(
  node: SceneNode & AutoLayoutMixin & ChildrenMixin,
  sourceNode: FigmaSerializedNode | undefined,
  sourceParentLayoutMode: "HORIZONTAL" | "VERTICAL",
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
      "VERTICAL",
      sourceParentLayoutMode
    )
    const fillsHeight = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "vertical",
      false,
      "VERTICAL",
      sourceParentLayoutMode
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
  sourceParentLayoutMode: "HORIZONTAL" | "VERTICAL",
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
        "HORIZONTAL",
        sourceParentLayoutMode
      ),
      fillsHeight: shouldFillGeneratedAxis(
        sourceChild,
        child,
        "vertical",
        layoutRules.stackAlignment === "stretch",
        "HORIZONTAL",
        sourceParentLayoutMode
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
  parentLayoutMode: "HORIZONTAL" | "VERTICAL",
  sourceParentLayoutMode: "HORIZONTAL" | "VERTICAL" = parentLayoutMode
): boolean {
  const sourceAxis = getSourceAxisForTargetAxis(axis, parentLayoutMode, sourceParentLayoutMode)
  const serializedSizing = getSerializedAxisSizing(sourceNode, sourceAxis)

  if (serializedSizing != null) {
    return serializedSizing === "FILL"
  }

  if (sourceNode?.layout.layoutAlign === "STRETCH" && axisMatchesCrossAxis(sourceParentLayoutMode, sourceAxis)) {
    return true
  }

  if (
    typeof sourceNode?.layout.layoutGrow === "number" &&
    sourceNode.layout.layoutGrow > 0 &&
    axisMatchesPrimaryParentAxis(sourceParentLayoutMode, sourceAxis)
  ) {
    return true
  }

  const sceneSizing = getSceneAxisSizing(fallbackNode, axis, parentLayoutMode)

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

function getSerializedAxisSizingForParent(
  node: FigmaSerializedNode | undefined,
  axis: "horizontal" | "vertical",
  parentLayoutMode: "HORIZONTAL" | "VERTICAL" | null,
  sourceParentLayoutMode: "HORIZONTAL" | "VERTICAL" | null
): "FILL" | "HUG" | "FIXED" | null {
  return getSerializedAxisSizing(
    node,
    getSourceAxisForTargetAxis(axis, parentLayoutMode, sourceParentLayoutMode)
  )
}

function getSerializedParentLayoutMode(
  node: FigmaSerializedNode | undefined
): "HORIZONTAL" | "VERTICAL" | null {
  return node?.layout.layoutMode === "HORIZONTAL" || node?.layout.layoutMode === "VERTICAL"
    ? node.layout.layoutMode
    : null
}

function getSceneAxisSizing(
  node: SceneNode,
  axis: "horizontal" | "vertical",
  parentLayoutMode: "HORIZONTAL" | "VERTICAL"
): "FILL" | "HUG" | "FIXED" | null {
  if (axis === "horizontal" && "layoutSizingHorizontal" in node) {
    return node.layoutSizingHorizontal
  }

  if (axis === "vertical" && "layoutSizingVertical" in node) {
    return node.layoutSizingVertical
  }

  if ("layoutGrow" in node && node.layoutGrow > 0 && axisMatchesPrimaryParentAxis(parentLayoutMode, axis)) {
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

function getSourceAxisForTargetAxis(
  axis: "horizontal" | "vertical",
  parentLayoutMode: "HORIZONTAL" | "VERTICAL" | null,
  sourceParentLayoutMode: "HORIZONTAL" | "VERTICAL" | null
): "horizontal" | "vertical" {
  if (
    parentLayoutMode == null ||
    sourceParentLayoutMode == null ||
    parentLayoutMode === sourceParentLayoutMode
  ) {
    return axis
  }

  return axisMatchesPrimaryParentAxis(parentLayoutMode, axis)
    ? getParentAxis(sourceParentLayoutMode, "primary")
    : getParentAxis(sourceParentLayoutMode, "cross")
}

function getParentAxis(
  parentLayoutMode: "HORIZONTAL" | "VERTICAL",
  role: "primary" | "cross"
): "horizontal" | "vertical" {
  if (role === "primary") {
    return parentLayoutMode === "HORIZONTAL" ? "horizontal" : "vertical"
  }

  return parentLayoutMode === "HORIZONTAL" ? "vertical" : "horizontal"
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
