import { render } from "@create-figma-plugin/ui"
import { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import "!./output.css"
import ExportFramePanel, { type ExportFrameSnapshot } from "./components/ExportFramePanel"
import { defaultLayoutRules, type LayoutRulesState } from "./components/LayoutRules"
import ResponsiveSidebar, {
  createDefaultConversionOptions,
  getTargetDeviceWidth,
  type ConversionOption,
  type ResponsiveGenerationSettings,
  type TargetDevice
} from "./components/ResponsiveSidebar"
import Editor from "./components/Editor"
import type { FigmaSerializedFrame, PluginToUiMessage } from "./frameSchema"
import { denormalizeFigmaJson, deserializeNormalizedJson } from "./normalizedFrameSchema"

function Plugin() {
  const [importedFrame, setImportedFrame] = useState<FigmaSerializedFrame | null>(null)
  const [workingFrame, setWorkingFrame] = useState<FigmaSerializedFrame | null>(null)
  const [frameSource, setFrameSource] = useState<"figma" | "json" | null>(null)
  const [importError, setImportError] = useState("")
  const [targetDevice, setTargetDevice] = useState<TargetDevice>("mobile")
  const [layoutRules, setLayoutRules] = useState<LayoutRulesState>(defaultLayoutRules)
  const [exportSnapshot, setExportSnapshot] = useState<ExportFrameSnapshot | null>(null)
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false)
  const [jsonImportError, setJsonImportError] = useState("")
  const [undoStack, setUndoStack] = useState<FigmaSerializedFrame[]>([])
  const [redoStack, setRedoStack] = useState<FigmaSerializedFrame[]>([])

  function clearImportedFrame() {
    setImportedFrame(null)
    setWorkingFrame(null)
    setFrameSource(null)
    setImportError("")
    setJsonImportError("")
    setUndoStack([])
    setRedoStack([])
    setExportSnapshot(null)
    setIsExportPanelOpen(false)
  }

  function changeWorkingFrame(nextFrame: FigmaSerializedFrame) {
    if (workingFrame != null) {
      setUndoStack((currentStack) => trimHistory([...currentStack, cloneFrame(workingFrame)]))
    }

    setRedoStack([])
    setWorkingFrame(nextFrame)
    syncExportSnapshotFrame(nextFrame)
  }

  function undoFrameChange() {
    if (workingFrame == null || undoStack.length === 0) {
      return
    }

    const previousFrame = undoStack[undoStack.length - 1]

    setUndoStack((currentStack) => currentStack.slice(0, -1))
    setRedoStack((currentStack) => trimHistory([...currentStack, cloneFrame(workingFrame)]))
    setWorkingFrame(cloneFrame(previousFrame))
    syncExportSnapshotFrame(previousFrame)
  }

  function redoFrameChange() {
    if (redoStack.length === 0) {
      return
    }

    const nextFrame = redoStack[redoStack.length - 1]

    setRedoStack((currentStack) => currentStack.slice(0, -1))
    if (workingFrame != null) {
      setUndoStack((currentStack) => trimHistory([...currentStack, cloneFrame(workingFrame)]))
    }
    setWorkingFrame(cloneFrame(nextFrame))
    syncExportSnapshotFrame(nextFrame)
  }

  function syncExportSnapshotFrame(nextFrame: FigmaSerializedFrame) {
    const importedWidth = getImportedFrameWidth(nextFrame)

    setExportSnapshot((currentSnapshot) => currentSnapshot == null
      ? null
      : {
          ...currentSnapshot,
          settings: {
            ...currentSnapshot.settings,
            sourceWidth: importedWidth,
            screenWidth: getTargetDeviceWidth(currentSnapshot.settings.targetDevice, importedWidth)
          },
          frame: cloneFrame(nextFrame)
        })
  }

  function handleGenerate(settings: ResponsiveGenerationSettings) {
    setTargetDevice(settings.targetDevice)
    setLayoutRules(settings.layoutRules)

    if (workingFrame == null) {
      return
    }

    setExportSnapshot({
      id: `export-${Date.now()}`,
      appliedAt: new Date().toISOString(),
      settings,
      frame: cloneFrame(workingFrame)
    })
    setIsExportPanelOpen(true)
  }

  function importJson(value: string): boolean {
    const result = parseJsonImport(value)

    if ("error" in result) {
      setJsonImportError(result.error)
      return false
    }

    const nextTargetDevice = result.targetDevice ?? targetDevice
    const importedWidth = getImportedFrameWidth(result.frame)
    const referenceWidth = getTargetDeviceWidth(nextTargetDevice, importedWidth)
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

    setImportedFrame(cloneFrame(result.frame))
    setWorkingFrame(cloneFrame(result.frame))
    setFrameSource("json")
    setImportError("")
    setJsonImportError("")
    setUndoStack([])
    setRedoStack([])
    setTargetDevice(nextTargetDevice)
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
        setImportedFrame(cloneFrame(message.payload))
        setWorkingFrame(cloneFrame(message.payload))
        setFrameSource("figma")
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
        workingFrame={workingFrame}
        importError={importError}
        jsonImportError={jsonImportError}
        isJsonImportedFrame={frameSource === "json"}
        targetDevice={targetDevice}
        layoutRules={layoutRules}
        onTargetDeviceChange={setTargetDevice}
        onLayoutRulesChange={setLayoutRules}
        onClearFrame={clearImportedFrame}
        onImportJson={importJson}
        onGenerate={handleGenerate}
      />
      <Editor
        sourceFrame={importedFrame}
        frame={workingFrame}
        targetDevice={targetDevice}
        screenWidth={getTargetDeviceWidth(targetDevice, getImportedFrameWidth(importedFrame))}
        layoutRules={layoutRules}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
        onUndo={undoFrameChange}
        onRedo={redoFrameChange}
        onFrameChange={changeWorkingFrame}
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

  const frameResult = deserializeNormalizedJson(parsed)

  if (!frameResult.ok) {
    return {
      error: frameResult.errors.length === 0
        ? "JSON must include a serialized frame."
        : `JSON frame is invalid: ${frameResult.errors[0].path} ${frameResult.errors[0].message}`
    }
  }

  const settings = asRecord(root.settings)
  const target = asRecord(root.target)

  return {
    frame: denormalizeFigmaJson(frameResult.value),
    appliedAt: readString(root.appliedAt),
    targetDevice: readTargetDevice(settings?.targetDevice ?? target?.device),
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

function getImportedFrameWidth(frame: FigmaSerializedFrame | null): number {
  if (frame == null) {
    return 1
  }

  return Math.max(1, Math.round(frame.geometry.width))
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

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value != null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null
}

export default render(Plugin)
