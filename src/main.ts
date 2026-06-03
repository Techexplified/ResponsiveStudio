import { showUI } from "@create-figma-plugin/utilities"
import type {
  FigmaJsonValue,
  FigmaSerializedFrame,
  FigmaSerializedNode,
  PluginToUiMessage,
  UiToPluginMessage
} from "./frameSchema"

type ImportableFrameNode = FrameNode | ComponentNode | InstanceNode
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
      figma.notify("Responsive generation is not wired up yet.")
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

function isImportableFrameNode(node: SceneNode): node is ImportableFrameNode {
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
