import { render } from "@create-figma-plugin/ui"
import { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import "!./output.css"
import ExportFramePanel, { type ExportFrameSnapshot } from "./components/ExportFramePanel"
import { defaultLayoutRules, type LayoutRulesState } from "./components/LayoutRules"
import ResponsiveSidebar, {
  createDefaultConversionOptions,
  type ConversionOption,
  type ResponsiveGenerationSettings,
  type TargetDevice
} from "./components/ResponsiveSidebar"
import Editor from "./components/Editor"
import type { FigmaSerializedFrame, FigmaSerializedNode, PluginToUiMessage } from "./frameSchema"

function Plugin() {
  const [importedFrame, setImportedFrame] = useState<FigmaSerializedFrame | null>(null)
  const [frameSource, setFrameSource] = useState<"figma" | "json" | null>(null)
  const [importError, setImportError] = useState("")
  const [targetDevice, setTargetDevice] = useState<TargetDevice>("mobile")
  const [sourceWidth, setSourceWidth] = useState("")
  const [screenWidth, setScreenWidth] = useState("")
  const [layoutRules, setLayoutRules] = useState<LayoutRulesState>(defaultLayoutRules)
  const [exportSnapshot, setExportSnapshot] = useState<ExportFrameSnapshot | null>(null)
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false)
  const [jsonImportError, setJsonImportError] = useState("")
  const [undoStack, setUndoStack] = useState<FigmaSerializedFrame[]>([])
  const [redoStack, setRedoStack] = useState<FigmaSerializedFrame[]>([])

  function clearImportedFrame() {
    setImportedFrame(null)
    setFrameSource(null)
    setSourceWidth("")
    setScreenWidth("")
    setImportError("")
    setJsonImportError("")
    setUndoStack([])
    setRedoStack([])
    setExportSnapshot(null)
    setIsExportPanelOpen(false)
  }

  function changeImportedFrame(nextFrame: FigmaSerializedFrame) {
    if (importedFrame != null) {
      setUndoStack((currentStack) => trimHistory([...currentStack, cloneFrame(importedFrame)]))
    }

    setRedoStack([])
    setImportedFrame(nextFrame)
    syncExportSnapshotFrame(nextFrame)
  }

  function undoFrameChange() {
    if (importedFrame == null || undoStack.length === 0) {
      return
    }

    const previousFrame = undoStack[undoStack.length - 1]

    setUndoStack((currentStack) => currentStack.slice(0, -1))
    setRedoStack((currentStack) => trimHistory([...currentStack, cloneFrame(importedFrame)]))
    setImportedFrame(cloneFrame(previousFrame))
    syncExportSnapshotFrame(previousFrame)
  }

  function redoFrameChange() {
    if (redoStack.length === 0) {
      return
    }

    const nextFrame = redoStack[redoStack.length - 1]

    setRedoStack((currentStack) => currentStack.slice(0, -1))
    if (importedFrame != null) {
      setUndoStack((currentStack) => trimHistory([...currentStack, cloneFrame(importedFrame)]))
    }
    setImportedFrame(cloneFrame(nextFrame))
    syncExportSnapshotFrame(nextFrame)
  }

  function syncExportSnapshotFrame(nextFrame: FigmaSerializedFrame) {
    setExportSnapshot((currentSnapshot) => currentSnapshot == null
      ? null
      : {
          ...currentSnapshot,
          frame: cloneFrame(nextFrame)
        })
  }

  function handleGenerate(settings: ResponsiveGenerationSettings) {
    setTargetDevice(settings.targetDevice)
    setSourceWidth(String(settings.sourceWidth))
    setScreenWidth(String(settings.screenWidth))
    setLayoutRules(settings.layoutRules)

    if (importedFrame == null) {
      return
    }

    setExportSnapshot({
      id: `export-${Date.now()}`,
      appliedAt: new Date().toISOString(),
      settings,
      frame: JSON.parse(JSON.stringify(importedFrame)) as FigmaSerializedFrame
    })
    setIsExportPanelOpen(true)
  }

  function importJson(value: string): boolean {
    const result = parseJsonImport(value)

    if ("error" in result) {
      setJsonImportError(result.error)
      return false
    }

    const importedWidth = result.sourceWidth ?? Math.round(result.frame.geometry.width)
    const referenceWidth = result.screenWidth ?? importedWidth
    const nextTargetDevice = result.targetDevice ?? targetDevice
    const nextLayoutRules = result.layoutRules ?? layoutRules
    const nextOptions = result.options ?? createDefaultConversionOptions()
    const settings: ResponsiveGenerationSettings = {
      targetDevice: nextTargetDevice,
      sourceWidth: importedWidth,
      screenWidth: referenceWidth,
      sourceFrame: null,
      layoutRules: nextLayoutRules,
      options: nextOptions
    }

    setImportedFrame(result.frame)
    setFrameSource("json")
    setImportError("")
    setJsonImportError("")
    setUndoStack([])
    setRedoStack([])
    setTargetDevice(nextTargetDevice)
    setSourceWidth(String(importedWidth))
    setScreenWidth(String(referenceWidth))
    setLayoutRules(nextLayoutRules)
    setExportSnapshot({
      id: `json-import-${Date.now()}`,
      appliedAt: result.appliedAt ?? new Date().toISOString(),
      settings,
      frame: cloneFrame(result.frame)
    })
    setIsExportPanelOpen(true)
    createExportFrameFromJson(result.frame, settings)

    return true
  }

  useEffect(() => {
    function handleMessage(event: MessageEvent<{ pluginMessage?: PluginToUiMessage }>) {
      const message = event.data.pluginMessage

      if (message == null) {
        return
      }

      if (message.type === "frame-imported") {
        const importedWidth = String(Math.round(message.payload.geometry.width))

        setImportedFrame(message.payload)
        setFrameSource("figma")
        setSourceWidth(importedWidth)
        setScreenWidth(importedWidth)
        setImportError("")
        setJsonImportError("")
        setUndoStack([])
        setRedoStack([])
        setExportSnapshot(null)
        return
      }

      if (message.type === "import-error") {
        setImportError(message.message)
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  return (
    <main class="h-screen w-screen overflow-hidden bg-[#f6f7fb] text-[#111827] flex">
      <ResponsiveSidebar
        importedFrame={importedFrame}
        importError={importError}
        jsonImportError={jsonImportError}
        isJsonImportedFrame={frameSource === "json"}
        targetDevice={targetDevice}
        sourceWidth={sourceWidth}
        screenWidth={screenWidth}
        layoutRules={layoutRules}
        onTargetDeviceChange={setTargetDevice}
        onSourceWidthChange={setSourceWidth}
        onScreenWidthChange={setScreenWidth}
        onLayoutRulesChange={setLayoutRules}
        onClearFrame={clearImportedFrame}
        onImportJson={importJson}
        onGenerate={handleGenerate}
      />
      <Editor
        frame={importedFrame}
        targetDevice={targetDevice}
        screenWidth={Number(screenWidth)}
        layoutRules={layoutRules}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
        onUndo={undoFrameChange}
        onRedo={redoFrameChange}
        onFrameChange={changeImportedFrame}
      />
      <ExportFramePanel
        snapshot={exportSnapshot}
        isOpen={isExportPanelOpen}
        onClose={() => setIsExportPanelOpen(false)}
      />
    </main>
  )
}

const historyLimit = 40

type JsonImportResult =
  | {
      frame: FigmaSerializedFrame
      appliedAt?: string
      targetDevice?: TargetDevice
      sourceWidth?: number
      screenWidth?: number
      layoutRules?: LayoutRulesState
      options?: ConversionOption[]
    }
  | {
      error: string
    }

function parseJsonImport(value: string): JsonImportResult {
  let parsed: unknown

  try {
    parsed = JSON.parse(value)
  } catch (_error) {
    return {
      error: "Paste valid JSON."
    }
  }

  const root = asRecord(parsed)

  if (root == null) {
    return {
      error: "JSON must be an object."
    }
  }

  const frameCandidate = isFigmaSerializedFrame(parsed)
    ? parsed
    : isFigmaSerializedFrame(root.frame)
      ? root.frame
      : null

  if (frameCandidate == null) {
    return {
      error: "JSON must include a serialized frame."
    }
  }

  const settings = asRecord(root.settings)
  const target = asRecord(root.target)
  const source = asRecord(root.source)

  return {
    frame: cloneFrame(frameCandidate),
    appliedAt: readString(root.appliedAt),
    targetDevice: readTargetDevice(settings?.targetDevice ?? target?.device),
    sourceWidth: readPositiveNumber(settings?.sourceWidth ?? source?.importedWidth),
    screenWidth: readPositiveNumber(settings?.screenWidth ?? target?.referenceWidth ?? target?.width),
    layoutRules: readLayoutRules(settings?.layoutRules),
    options: readConversionOptions(settings?.options ?? root.appliedOptions)
  }
}

function cloneFrame(frame: FigmaSerializedFrame): FigmaSerializedFrame {
  return JSON.parse(JSON.stringify(frame)) as FigmaSerializedFrame
}

function trimHistory(stack: FigmaSerializedFrame[]): FigmaSerializedFrame[] {
  return stack.length > historyLimit ? stack.slice(stack.length - historyLimit) : stack
}

function createExportFrameFromJson(frame: FigmaSerializedFrame, settings: ResponsiveGenerationSettings) {
  parent.postMessage(
    {
      pluginMessage: {
        type: "create-export-frame-from-json",
        payload: {
          frame,
          screenWidth: settings.screenWidth,
          layoutRules: settings.layoutRules
        }
      }
    },
    "*"
  )
}

function isFigmaSerializedFrame(value: unknown): value is FigmaSerializedFrame {
  const record = asRecord(value)

  return record != null &&
    (record.type === "FRAME" || record.type === "COMPONENT" || record.type === "INSTANCE") &&
    record.schemaVersion === 1 &&
    typeof record.importedAt === "string" &&
    isFigmaSerializedNode(record)
}

function isFigmaSerializedNode(value: unknown): value is FigmaSerializedNode {
  const record = asRecord(value)
  const geometry = asRecord(record?.geometry)

  return record != null &&
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    typeof record.type === "string" &&
    typeof record.visible === "boolean" &&
    typeof record.locked === "boolean" &&
    geometry != null &&
    typeof geometry.width === "number" &&
    typeof geometry.height === "number" &&
    asRecord(record.layout) != null &&
    asRecord(record.style) != null &&
    Array.isArray(record.children) &&
    record.children.every((child) => isFigmaSerializedNode(child))
}

function readTargetDevice(value: unknown): TargetDevice | undefined {
  if (value === "mobile" || value === "tablet" || value === "desktop" || value === "custom") {
    return value
  }

  return undefined
}

function readLayoutRules(value: unknown): LayoutRulesState | undefined {
  const record = asRecord(value)

  if (record == null) {
    return undefined
  }

  return {
    conversionDirection: record.conversionDirection === "column-to-row" ? "column-to-row" : "row-to-column",
    rowToColumnMode: readMode(record.rowToColumnMode),
    rowToColumnBreakpoint: readBoundedNumber(record.rowToColumnBreakpoint, defaultLayoutRules.rowToColumnBreakpoint, 1, 10000),
    stackGap: readBoundedNumber(record.stackGap, defaultLayoutRules.stackGap, 0, 1000),
    outputPadding: readBoundedNumber(record.outputPadding, defaultLayoutRules.outputPadding, 0, 1000),
    stackAlignment: readStackAlignment(record.stackAlignment),
    textScaleMode: readTextScaleMode(record.textScaleMode),
    minimumTextSize: readBoundedNumber(record.minimumTextSize, defaultLayoutRules.minimumTextSize, 1, 200),
    tightenLineHeight: typeof record.tightenLineHeight === "boolean"
      ? record.tightenLineHeight
      : defaultLayoutRules.tightenLineHeight
  }
}

function readConversionOptions(value: unknown): ConversionOption[] | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }

  const options = value.flatMap((option) => {
    const record = asRecord(option)

    if (
      record == null ||
      typeof record.id !== "string" ||
      typeof record.label !== "string" ||
      typeof record.description !== "string"
    ) {
      return []
    }

    return [{
      id: record.id,
      label: record.label,
      description: record.description,
      enabled: typeof record.enabled === "boolean" ? record.enabled : true
    }]
  })

  return options.length === 0 ? undefined : options
}

function readMode(value: unknown): LayoutRulesState["rowToColumnMode"] {
  if (value === "always" || value === "never") {
    return value
  }

  return "auto"
}

function readStackAlignment(value: unknown): LayoutRulesState["stackAlignment"] {
  if (value === "start" || value === "center" || value === "stretch") {
    return value
  }

  return defaultLayoutRules.stackAlignment
}

function readTextScaleMode(value: unknown): LayoutRulesState["textScaleMode"] {
  if (value === "preserve" || value === "scale" || value === "clamp") {
    return value
  }

  return defaultLayoutRules.textScaleMode
}

function readBoundedNumber(value: unknown, fallback: number, min: number, max: number): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback
}

function readPositiveNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : undefined
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value != null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null
}

export default render(Plugin)
