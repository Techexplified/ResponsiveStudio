import { h } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"
import type { FigmaSerializedFrame, FigmaSerializedNode } from "../frameSchema"
import {
  getChildrenBounds,
  getCornerRadius,
  getSolidFillColor,
  getTextFontFamily,
  getTextFontWeight,
  getTextHorizontalAlign,
  getTextLineHeight,
  getTextVerticalJustify,
  isVirtualGroup
} from "./editorModel"

type FramePreviewProps = {
  frame: FigmaSerializedFrame
  selectedNodeId: string | null
  onSelect: (nodeId: string) => void
}

export default function FramePreview({
  frame,
  selectedNodeId,
  onSelect
}: FramePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewportSize, setViewportSize] = useState({
    width: 720,
    height: 560
  })
  const backgroundColor = getSolidFillColor(frame.style.fills) ?? "#ffffff"
  const isSelected = selectedNodeId === frame.id
  const fitPadding = 48
  const reservedRightRail = 56
  const reservedBottomRail = 56
  const availableWidth = Math.max(120, viewportSize.width - fitPadding - reservedRightRail)
  const availableHeight = Math.max(120, viewportSize.height - fitPadding - reservedBottomRail)
  const scale = Math.min(
    1,
    availableWidth / Math.max(frame.geometry.width, 1),
    availableHeight / Math.max(frame.geometry.height, 1)
  )
  const previewWidth = Math.max(1, frame.geometry.width * scale)
  const previewHeight = Math.max(1, frame.geometry.height * scale)

  useEffect(() => {
    const container = containerRef.current

    if (container == null) {
      return
    }

    function updateViewportSize() {
      const currentContainer = containerRef.current

      if (currentContainer == null) {
        return
      }

      const rect = currentContainer.getBoundingClientRect()

      setViewportSize({
        width: rect.width,
        height: rect.height
      })
    }

    updateViewportSize()

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateViewportSize)

      return () => window.removeEventListener("resize", updateViewportSize)
    }

    const observer = new ResizeObserver(updateViewportSize)
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} class="h-full min-h-[240px] overflow-hidden p-6">
      <div
        class="flex h-full items-center justify-center"
        style={{
          width: `${availableWidth}px`,
          height: `${availableHeight}px`
        }}
      >
        <div
          class="relative overflow-hidden rounded border border-[#d1d5db] shadow-sm"
          onClick={() => onSelect(frame.id)}
          style={{
            width: `${previewWidth}px`,
            height: `${previewHeight}px`,
            backgroundColor,
            outline: isSelected ? "2px solid #0f766e" : undefined,
            outlineOffset: isSelected ? "-2px" : undefined
          }}
        >
          {frame.children.map((child) => (
            <PreviewNode
              key={child.id}
              node={child}
              scale={scale}
              selectedNodeId={selectedNodeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function PreviewNode({
  node,
  scale,
  selectedNodeId,
  onSelect
}: {
  node: FigmaSerializedNode
  scale: number
  selectedNodeId: string | null
  onSelect: (nodeId: string) => void
}) {
  if (!node.visible) {
    return null
  }

  if (isVirtualGroup(node)) {
    const isSelected = selectedNodeId === node.id
    const box = getChildrenBounds(node.children)
    const width = Math.max(node.geometry.width, box?.width ?? 0)
    const height = Math.max(node.geometry.height, box?.height ?? 0)

    return (
      <div
        class="absolute cursor-pointer overflow-visible"
        title={node.name}
        onClick={(event) => {
          event.stopPropagation()
          onSelect(node.id)
        }}
        style={{
          left: `${node.geometry.x * scale}px`,
          top: `${node.geometry.y * scale}px`,
          width: `${Math.max(1, width * scale)}px`,
          height: `${Math.max(1, height * scale)}px`,
          outline: isSelected ? "2px solid #0f766e" : "1px dashed rgba(15, 118, 110, 0.5)",
          outlineOffset: isSelected ? "-2px" : "-1px"
        }}
      >
        {node.children.map((child) => (
          <PreviewNode
            key={child.id}
            node={child}
            scale={scale}
            selectedNodeId={selectedNodeId}
            onSelect={onSelect}
          />
        ))}
      </div>
    )
  }

  const fillColor = getSolidFillColor(node.style.fills)
  const isTextNode = node.text != null
  const backgroundColor = isTextNode ? undefined : fillColor
  const textColor = isTextNode ? fillColor : undefined
  const borderColor = getSolidFillColor(node.style.strokes)
  const borderWidth = borderColor == null
    ? 0
    : Math.max(1, (node.style.strokeWeight ?? 1) * scale)
  const isSelected = selectedNodeId === node.id

  return (
    <div
      class="absolute cursor-pointer overflow-hidden"
      title={node.name}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(node.id)
      }}
      style={{
        left: `${node.geometry.x * scale}px`,
        top: `${node.geometry.y * scale}px`,
        width: `${node.geometry.width * scale}px`,
        height: `${node.geometry.height * scale}px`,
        opacity: node.style.opacity,
        backgroundColor,
        borderColor,
        borderStyle: borderColor == null ? undefined : "solid",
        borderWidth: `${borderWidth}px`,
        borderRadius: getCornerRadius(node.style.cornerRadius, scale),
        outline: isSelected ? "2px solid #0f766e" : undefined,
        outlineOffset: isSelected ? "-2px" : undefined
      }}
    >
      {node.text != null && (
        <div
          class="h-full w-full overflow-hidden"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: getTextVerticalJustify(node),
            fontSize: typeof node.text.fontSize === "number"
              ? `${node.text.fontSize * scale}px`
              : undefined,
            fontFamily: getTextFontFamily(node),
            fontWeight: getTextFontWeight(node),
            lineHeight: getTextLineHeight(node, scale),
            color: textColor ?? "#1f2937",
            textAlign: getTextHorizontalAlign(node),
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }}
        >
          {node.text.characters}
        </div>
      )}

      {node.children.map((child) => (
        <PreviewNode
          key={child.id}
          node={child}
          scale={scale}
          selectedNodeId={selectedNodeId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
