export type FigmaJsonPrimitive = string | number | boolean | null

export type FigmaJsonValue =
  | FigmaJsonPrimitive
  | FigmaJsonValue[]
  | {
      [key: string]: FigmaJsonValue
    }

export type ResponsiveConversionDirection = "row-to-column" | "column-to-row"
export type ResponsiveConversionMode = "auto" | "always" | "never"
export type ResponsiveStackAlignment = "start" | "center" | "stretch"

export type ResponsiveNodeRule = {
  enabled: boolean
  conversionDirection: ResponsiveConversionDirection
  rowToColumnMode: ResponsiveConversionMode
  rowToColumnBreakpoint: number
  stackGap: number
  stackAlignment: ResponsiveStackAlignment
}

export type ResponsiveReplacementRule = {
  enabled: boolean
  preset: "hamburger"
  trigger: ResponsiveConversionMode
  breakpoint: number
  sizeSource?: "width" | "height" | "custom"
  width: number
  height: number
}

export type SerializedSpacing = {
  top: number
  right: number
  bottom: number
  left: number
}

export type FigmaSerializedNodeV1 = {
  id: string
  originalFigmaId?: string
  name: string
  type: string
  responsive?: {
    isVirtualGroup?: boolean
    groupRole?: "root" | "group"
    conversionRole?: "auto-layout-container" | "manual-layer" | "responsive-group"
    acceptsChildren?: boolean
    createdByUser?: boolean
    nodeRule?: ResponsiveNodeRule
    replacement?: ResponsiveReplacementRule
  }
  visible: boolean
  locked: boolean
  geometry: {
    x: number
    y: number
    width: number
    height: number
    rotation: number
    absoluteBounds: {
      x: number
      y: number
      width: number
      height: number
      right: number
      bottom: number
      centerX: number
      centerY: number
    }
    parentRelativeBounds: {
      x: number
      y: number
      width: number
      height: number
      right: number
      bottom: number
      centerX: number
      centerY: number
    }
    rootRelativeBounds: {
      x: number
      y: number
      width: number
      height: number
      right: number
      bottom: number
      centerX: number
      centerY: number
    }
    percentOfParent?: {
      x: number
      y: number
      width: number
      height: number
      right: number
      bottom: number
    }
    percentOfRoot: {
      x: number
      y: number
      width: number
      height: number
      right: number
      bottom: number
    }
    hierarchy: {
      parentId: string | null
      depth: number
      siblingIndex: number
      siblingCount: number
    }
  }
  layout: {
    isAutoLayout: boolean
    autoLayoutDirection?: "NONE" | "HORIZONTAL" | "VERTICAL" | "GRID"
    constraints?: FigmaJsonValue
    layoutMode?: string
    layoutAlign?: string
    layoutGrow?: number
    layoutSizingHorizontal?: string
    layoutSizingVertical?: string
    itemSpacing?: number
    counterAxisSpacing?: number
    primaryAxisAlignItems?: string
    counterAxisAlignItems?: string
    layoutWrap?: string
    padding?: {
      top: number
      right: number
      bottom: number
      left: number
    }
    margin?: {
      top: number
      right: number
      bottom: number
      left: number
    }
    primaryAxisSizingMode?: string
    counterAxisSizingMode?: string
  }
  style: {
    opacity?: number
    blendMode?: string
    fills?: FigmaJsonValue
    strokes?: FigmaJsonValue
    strokeWeight?: number
    cornerRadius?: number | string
    effects?: FigmaJsonValue
  }
  text?: {
    characters: string
    fontSize?: number | string
    fontName?: FigmaJsonValue
    fontWeight?: number
    textAlignHorizontal?: string
    textAlignVertical?: string
    lineHeight?: FigmaJsonValue
    letterSpacing?: FigmaJsonValue
  }
  component?: FigmaJsonValue
  instance?: FigmaJsonValue
  metadata?: {
    [key: string]: FigmaJsonValue
  }
  children: FigmaSerializedNodeV1[]
}

export type FigmaSerializedFrameV1 = FigmaSerializedNodeV1 & {
  type: "FRAME" | "COMPONENT" | "INSTANCE"
  schemaVersion: 1
  importedAt: string
}

export type FigmaSerializedNode = FigmaSerializedNodeV1
export type FigmaSerializedFrame = FigmaSerializedFrameV1

export type NormalizedLayoutMode = "NONE" | "HORIZONTAL" | "VERTICAL" | "GRID"

export type NormalizedNodeGeometry = {
  x: number
  y: number
  width: number
  height: number
  rotation?: number
}

export type NormalizedNodeLayout = {
  isAutoLayout?: boolean
  /** Omitted mode is the normalized representation of Figma layoutMode NONE. */
  mode?: NormalizedLayoutMode
  constraints?: FigmaJsonValue
  horizontalSizing?: string
  verticalSizing?: string
  grow?: number
  align?: string
  gap?: number
  counterGap?: number
  primaryAlign?: string
  counterAlign?: string
  wrap?: boolean
  padding?: SerializedSpacing
  margin?: SerializedSpacing
  primarySizing?: string
  counterSizing?: string
}

export type NormalizedNodeStyle = {
  opacity?: number
  blendMode?: string
  fills?: FigmaJsonValue
  strokes?: FigmaJsonValue
  strokeWeight?: number
  cornerRadius?: number | string
  effects?: FigmaJsonValue
}

export type NormalizedFigmaNode = {
  id: string
  originalFigmaId?: string
  name: string
  type: string
  visible?: boolean
  locked?: boolean
  geometry: NormalizedNodeGeometry
  layout?: NormalizedNodeLayout
  style?: NormalizedNodeStyle
  styleRef?: string
  text?: FigmaSerializedNodeV1["text"] | null
  responsive?: FigmaSerializedNodeV1["responsive"]
  component?: FigmaJsonValue
  instance?: FigmaJsonValue
  metadata?: {
    [key: string]: FigmaJsonValue
  }
  children?: NormalizedFigmaNode[]
}

export type NormalizedFigmaFrame = NormalizedFigmaNode & {
  type: "FRAME" | "COMPONENT" | "INSTANCE"
}

export type NormalizedFigmaDocument = {
  schemaVersion: 2
  root: NormalizedFigmaFrame
  styles?: {
    [key: string]: NormalizedNodeStyle
  }
}

export type ValidationIssue = {
  path: string
  message: string
}

export type ValidationResult<T> =
  | {
      ok: true
      value: T
      warnings: string[]
    }
  | {
      ok: false
      errors: ValidationIssue[]
      warnings: string[]
    }

export type PluginToUiMessage =
  | {
      type: "frame-imported"
      payload: FigmaSerializedFrame
    }
  | {
      type: "import-error"
      message: string
    }

export type UiToPluginMessage =
  | {
      type: "import-selected-frame"
    }
  | {
      type: "generate-responsive-frame"
      payload: {
        targetDevice: "mobile" | "tablet" | "desktop" | "custom"
        sourceWidth: number
        screenWidth: number
        sourceFrame: FigmaSerializedFrame | null
        layoutRules: {
          conversionDirection: ResponsiveConversionDirection
          rowToColumnMode: ResponsiveConversionMode
          rowToColumnBreakpoint: number
          stackGap: number
          outputPadding: number
          stackAlignment: ResponsiveStackAlignment
          textScaleMode: "preserve" | "scale"
          minimumTextSize: number
          tightenLineHeight: boolean
        }
        options: Array<{
          id: string
          label: string
          description: string
          enabled: boolean
        }>
      }
    }
  | {
      type: "create-export-frame-from-json"
      payload: {
        frame: FigmaSerializedFrame
        screenWidth: number
        layoutRules: {
          conversionDirection: ResponsiveConversionDirection
          rowToColumnMode: ResponsiveConversionMode
          rowToColumnBreakpoint: number
          stackGap: number
          outputPadding: number
          stackAlignment: ResponsiveStackAlignment
          textScaleMode: "preserve" | "scale"
          minimumTextSize: number
          tightenLineHeight: boolean
        }
      }
    }
