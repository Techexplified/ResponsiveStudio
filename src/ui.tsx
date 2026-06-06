import { render } from "@create-figma-plugin/ui"
import { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import "!./output.css"
import ExportFramePanel, { type ExportFrameSnapshot } from "./components/ExportFramePanel"
import { defaultLayoutRules, type LayoutRulesState } from "./components/LayoutRules"
import ResponsiveSidebar, {
  type ResponsiveGenerationSettings,
  type TargetDevice
} from "./components/ResponsiveSidebar"
import Editor from "./components/Editor"
import type { FigmaSerializedFrame, PluginToUiMessage } from "./frameSchema"

function Plugin() {
  const [importedFrame, setImportedFrame] = useState<FigmaSerializedFrame | null>(null)
  const [importError, setImportError] = useState("")
  const [targetDevice, setTargetDevice] = useState<TargetDevice>("mobile")
  const [sourceWidth, setSourceWidth] = useState("")
  const [screenWidth, setScreenWidth] = useState("375")
  const [layoutRules, setLayoutRules] = useState<LayoutRulesState>(defaultLayoutRules)
  const [exportSnapshot, setExportSnapshot] = useState<ExportFrameSnapshot | null>(null)
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false)

  function clearImportedFrame() {
    setImportedFrame(null)
    setSourceWidth("")
    setImportError("")
    setIsExportPanelOpen(false)
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

  useEffect(() => {
    function handleMessage(event: MessageEvent<{ pluginMessage?: PluginToUiMessage }>) {
      const message = event.data.pluginMessage

      if (message == null) {
        return
      }

      if (message.type === "frame-imported") {
        setImportedFrame(message.payload)
        setSourceWidth(String(Math.round(message.payload.geometry.width)))
        setImportError("")
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
        targetDevice={targetDevice}
        sourceWidth={sourceWidth}
        screenWidth={screenWidth}
        layoutRules={layoutRules}
        onTargetDeviceChange={setTargetDevice}
        onSourceWidthChange={setSourceWidth}
        onScreenWidthChange={setScreenWidth}
        onLayoutRulesChange={setLayoutRules}
        onClearFrame={clearImportedFrame}
        onGenerate={handleGenerate}
      />
      <Editor
        frame={importedFrame}
        targetDevice={targetDevice}
        screenWidth={Number(screenWidth)}
        layoutRules={layoutRules}
        onFrameChange={setImportedFrame}
      />
      <ExportFramePanel
        snapshot={exportSnapshot}
        isOpen={isExportPanelOpen}
        onClose={() => setIsExportPanelOpen(false)}
      />
    </main>
  )
}

export default render(Plugin)
