const assert = require("node:assert/strict")
const test = require("node:test")

const {
  denormalizeFigmaJson,
  deserializeNormalizedJson,
  migrateV1ToV2,
  normalizeFigmaJson,
  serializeNormalizedJson,
  validateNormalizedJson
} = require("../.tmp/schema-tests/src/normalizedFrameSchema.js")

test("normalizes a desktop frame and removes derivable fields", () => {
  const frame = createDesktopFrame()
  const normalized = normalizeFigmaJson(frame)
  const json = JSON.stringify(normalized)

  assert.equal(normalized.schemaVersion, 2)
  assert.equal(normalized.root.geometry.width, 1440)
  assert.equal(normalized.root.layout.mode, "VERTICAL")
  assert.equal(normalized.root.layout.gap, 24)
  assert.ok(json.length < JSON.stringify(frame).length)
  assert.equal(json.includes("absoluteBounds"), false)
  assert.equal(json.includes("parentRelativeBounds"), false)
  assert.equal(json.includes("rootRelativeBounds"), false)
  assert.equal(json.includes("percentOfParent"), false)
  assert.equal(json.includes("percentOfRoot"), false)
  assert.equal(hasDerivedGeometryKeys(normalized.root), false)
  assert.equal(json.includes("layoutMode"), false)
  assert.equal(json.includes("autoLayoutDirection"), false)
  assert.equal(json.includes("constraints"), false)
  assert.equal(json.includes("counterAxisSpacing"), false)
  assert.equal(json.includes("primaryAxisSizingMode"), false)
  assert.equal(json.includes("counterAxisSizingMode"), false)
  assert.equal(json.includes("importedAt"), false)
})

test("normalizes a mobile frame", () => {
  const frame = createMobileFrame()
  const normalized = normalizeFigmaJson(frame)

  assert.equal(normalized.root.geometry.width, 375)
  assert.equal(normalized.root.geometry.height, 1000)
  assert.equal(normalized.root.layout.mode, "VERTICAL")
  assert.equal(normalized.root.layout.padding.top, 16)
})

test("preserves nested Auto Layout behavior", () => {
  const frame = createDesktopFrame()
  const normalized = normalizeFigmaJson(frame)
  const row = normalized.root.children[0]
  const column = row.children[1]
  const denormalized = denormalizeFigmaJson(normalized)

  assert.equal(row.layout.mode, "HORIZONTAL")
  assert.equal(row.layout.gap, 12)
  assert.equal(column.layout.mode, "VERTICAL")
  assert.equal(column.layout.gap, 8)
  assert.equal(denormalized.children[0].layout.layoutMode, "HORIZONTAL")
  assert.equal(denormalized.children[0].children[1].layout.layoutMode, "VERTICAL")
})

test("preserves text nodes and typography", () => {
  const frame = createDesktopFrame()
  const textNode = normalizeFigmaJson(frame).root.children[0].children[1].children[0]

  assert.equal(textNode.type, "TEXT")
  assert.equal(textNode.text.characters, "Responsive title")
  assert.equal(textNode.text.fontSize, 32)
  assert.deepEqual(textNode.text.fontName, {
    family: "Inter",
    style: "Bold"
  })
})

test("preserves fills and strokes", () => {
  const frame = createDesktopFrame()
  const normalizedCard = normalizeFigmaJson(frame).root.children[0]
  const denormalizedCard = denormalizeFigmaJson(normalizeFigmaJson(frame)).children[0]

  assert.equal(Array.isArray(normalizedCard.style.fills), true)
  assert.equal(Array.isArray(normalizedCard.style.strokes), true)
  assert.equal(normalizedCard.style.fills[0].visible, undefined)
  assert.equal(normalizedCard.style.fills[0].opacity, undefined)
  assert.equal(denormalizedCard.style.fills[0].visible, true)
  assert.equal(denormalizedCard.style.fills[0].opacity, 1)
  assert.equal(normalizedCard.style.strokeWeight, 2)
  assert.equal(normalizedCard.style.cornerRadius, 12)
})

test("removes empty style objects", () => {
  const normalizedColumn = normalizeFigmaJson(createDesktopFrame()).root.children[0].children[1]

  assert.equal(normalizedColumn.style, undefined)
})

test("preserves hidden nodes", () => {
  const frame = createDesktopFrame()
  const hidden = createNode({
    id: "117:hidden",
    name: "Hidden badge",
    visible: false
  })

  frame.children.push(hidden)

  const normalized = normalizeFigmaJson(frame)
  const denormalized = denormalizeFigmaJson(normalized)

  assert.equal(normalized.root.children.at(-1).visible, false)
  assert.equal(denormalized.children.at(-1).visible, false)
})

test("preserves locked nodes", () => {
  const frame = createDesktopFrame()

  frame.children[0].locked = true

  const normalized = normalizeFigmaJson(frame)
  const denormalized = denormalizeFigmaJson(normalized)

  assert.equal(normalized.root.children[0].locked, true)
  assert.equal(denormalized.children[0].locked, true)
})

test("merges duplicate IDs in the same children array and warns", () => {
  const frame = createDesktopFrame()
  const warnings = []
  const originalWarn = console.warn

  frame.children = [
    createNode({
      id: "117:duplicate",
      name: "First duplicate",
      metadata: {
        source: "first"
      }
    }),
    createNode({
      id: "117:duplicate",
      name: "Second duplicate",
      metadata: {
        note: "merged"
      }
    })
  ]
  console.warn = (message) => warnings.push(String(message))

  try {
    const normalized = normalizeFigmaJson(frame)

    assert.equal(normalized.root.children.length, 1)
    assert.equal(normalized.root.children[0].name, "First duplicate")
    assert.deepEqual(normalized.root.children[0].metadata, {
      source: "first",
      note: "merged"
    })
    assert.equal(warnings.some((warning) => warning.includes("Duplicate node id")), true)
    assert.equal(warnings.some((warning) => warning.includes("conflict")), true)
  } finally {
    console.warn = originalWarn
  }
})

test("omits empty children arrays and restores them on read", () => {
  const frame = createMobileFrame()

  frame.children = []

  const normalized = normalizeFigmaJson(frame)
  const denormalized = denormalizeFigmaJson(normalized)

  assert.equal(Object.hasOwn(normalized.root, "children"), false)
  assert.deepEqual(denormalized.children, [])
})

test("treats missing mode as NONE", () => {
  const result = deserializeNormalizedJson({
    schemaVersion: 2,
    root: {
      id: "119:0",
      name: "Static frame",
      type: "FRAME",
      geometry: {
        x: 0,
        y: 0,
        width: 320,
        height: 240
      }
    }
  })

  assert.equal(result.ok, true)
  assert.equal(result.value.root.layout.mode, "NONE")
  assert.equal(denormalizeFigmaJson(result.value).layout.layoutMode, "NONE")
})

test("preserves GRID mode", () => {
  const frame = createFrame({
    id: "120:0",
    name: "Grid frame",
    width: 640,
    height: 420,
    layout: autoLayout("GRID", {
      gap: 20,
      horizontalSizing: "HUG",
      verticalSizing: "FIXED"
    }),
    children: [
      createNode({
        id: "120:1",
        name: "Grid child",
        x: 0,
        y: 0,
        width: 120,
        height: 80
      })
    ]
  })
  const normalized = normalizeFigmaJson(frame)
  const denormalized = denormalizeFigmaJson(normalized)

  assert.equal(normalized.root.layout.mode, "GRID")
  assert.equal(denormalized.layout.layoutMode, "GRID")
  assert.equal(denormalized.layout.autoLayoutDirection, "GRID")
  assert.equal(denormalized.layout.layoutSizingHorizontal, "HUG")
  assert.equal(denormalized.layout.primaryAxisSizingMode, "AUTO")
})

test("restores omitted sizing from node-specific defaults", () => {
  const document = {
    schemaVersion: 2,
    root: {
      id: "121:0",
      name: "Vertical parent",
      type: "FRAME",
      geometry: {
        x: 0,
        y: 0,
        width: 320,
        height: 480
      },
      layout: {
        mode: "VERTICAL"
      },
      children: [
        {
          id: "121:1",
          name: "Stretch child",
          type: "FRAME",
          geometry: {
            x: 0,
            y: 0,
            width: 300,
            height: 120
          },
          layout: {
            align: "STRETCH"
          }
        },
        {
          id: "121:2",
          name: "Grow child",
          type: "FRAME",
          geometry: {
            x: 0,
            y: 128,
            width: 300,
            height: 120
          },
          layout: {
            grow: 1
          }
        },
        {
          id: "121:3",
          name: "Hug row",
          type: "FRAME",
          geometry: {
            x: 0,
            y: 256,
            width: 300,
            height: 120
          },
          layout: {
            mode: "HORIZONTAL",
            primarySizing: "AUTO"
          }
        }
      ]
    }
  }
  const denormalized = denormalizeFigmaJson(deserializeOk(document))

  assert.equal(denormalized.children[0].layout.layoutSizingHorizontal, "FILL")
  assert.equal(denormalized.children[0].layout.layoutSizingVertical, "FIXED")
  assert.equal(denormalized.children[1].layout.layoutSizingHorizontal, "FIXED")
  assert.equal(denormalized.children[1].layout.layoutSizingVertical, "FILL")
  assert.equal(denormalized.children[2].layout.layoutSizingHorizontal, "HUG")
  assert.equal(denormalized.children[2].layout.layoutSizingVertical, "FIXED")
})

test("migrates schemaVersion 1 immutably", () => {
  const frame = createDesktopFrame()
  const originalJson = JSON.stringify(frame)
  const result = migrateV1ToV2(frame)

  assert.equal(result.ok, true)
  assert.equal(result.value.schemaVersion, 2)
  assert.equal(result.value.root.id, frame.id)
  assert.equal(JSON.stringify(frame), originalJson)
  assert.equal(frame.schemaVersion, 1)
  assert.ok(frame.geometry.absoluteBounds)
})

test("round trips normalize to denormalize", () => {
  const frame = createDesktopFrame()
  const roundTripped = denormalizeFigmaJson(normalizeFigmaJson(frame))

  assert.deepEqual(toRequiredRendererSnapshot(roundTripped), toRequiredRendererSnapshot(frame))
})

test("does not change visible layout after round trip", () => {
  const frame = createDesktopFrame()
  const roundTripped = denormalizeFigmaJson(normalizeFigmaJson(frame))

  assert.deepEqual(toVisibleLayoutSnapshot(roundTripped), toVisibleLayoutSnapshot(frame))
})

test("deserializes v2 JSON with restored defaults", () => {
  const serialized = serializeNormalizedJson(createDesktopFrame())
  const result = deserializeNormalizedJson(serialized)

  assert.equal(result.ok, true)
  assert.equal(result.value.root.visible, true)
  assert.equal(result.value.root.locked, false)
  assert.equal(result.value.root.geometry.rotation, 0)
  assert.equal(result.value.root.style.opacity, 1)
  assert.equal(result.value.root.style.blendMode, "PASS_THROUGH")
})

test("returns validation errors for malformed normalized JSON", () => {
  const result = validateNormalizedJson({
    schemaVersion: 2,
    root: {
      id: "bad",
      name: "Bad",
      type: "FRAME",
      geometry: {
        x: 0,
        y: 0,
        width: "wide",
        height: 100
      },
      children: []
    }
  })

  assert.equal(result.ok, false)
  assert.equal(result.errors.some((error) => error.path === "$.root.geometry.width"), true)
})

function createDesktopFrame() {
  const title = createNode({
    id: "117:4",
    name: "Title",
    type: "TEXT",
    x: 0,
    y: 0,
    width: 420,
    height: 48,
    text: {
      characters: "Responsive title",
      fontSize: 32,
      fontName: {
        family: "Inter",
        style: "Bold"
      },
      fontWeight: 700,
      textAlignHorizontal: "LEFT",
      textAlignVertical: "TOP",
      lineHeight: {
        unit: "PIXELS",
        value: 40
      },
      letterSpacing: {
        unit: "PIXELS",
        value: 0
      }
    },
    style: {
      ...baseStyle(),
      fills: [solidPaint(0.08, 0.1, 0.15)]
    }
  })
  const body = createNode({
    id: "117:5",
    name: "Body copy",
    type: "TEXT",
    x: 0,
    y: 56,
    width: 420,
    height: 52,
    text: {
      characters: "Nested Auto Layout and text survive normalization.",
      fontSize: 16,
      fontName: {
        family: "Inter",
        style: "Regular"
      },
      textAlignHorizontal: "LEFT",
      textAlignVertical: "TOP",
      lineHeight: {
        unit: "PERCENT",
        value: 140
      }
    },
    style: {
      ...baseStyle(),
      fills: [solidPaint(0.32, 0.35, 0.4)]
    }
  })
  const textColumn = createNode({
    id: "117:3",
    name: "Text column",
    x: 112,
    y: 32,
    width: 420,
    height: 120,
    layout: autoLayout("VERTICAL", {
      gap: 8,
      horizontalSizing: "FIXED",
      verticalSizing: "HUG"
    }),
    children: [title, body]
  })
  const image = createNode({
    id: "117:2",
    name: "Image block",
    x: 32,
    y: 32,
    width: 80,
    height: 80,
    style: {
      ...baseStyle(),
      fills: [solidPaint(0.1, 0.55, 0.45)]
    }
  })
  const card = createNode({
    id: "117:1",
    name: "Hero card",
    x: 64,
    y: 80,
    width: 560,
    height: 184,
    layout: autoLayout("HORIZONTAL", {
      gap: 12,
      padding: {
        top: 32,
        right: 32,
        bottom: 32,
        left: 32
      }
    }),
    style: {
      opacity: 0.92,
      blendMode: "PASS_THROUGH",
      fills: [solidPaint(1, 1, 1)],
      strokes: [solidPaint(0.9, 0.91, 0.94)],
      strokeWeight: 2,
      cornerRadius: 12,
      effects: [{
        type: "DROP_SHADOW",
        visible: true,
        color: {
          r: 0,
          g: 0,
          b: 0,
          a: 0.18
        },
        offset: {
          x: 0,
          y: 8
        },
        radius: 24,
        spread: 0,
        blendMode: "NORMAL"
      }]
    },
    children: [image, textColumn]
  })

  return createFrame({
    id: "117:0",
    name: "Desktop layout panel",
    width: 1440,
    height: 900,
    layout: autoLayout("VERTICAL", {
      gap: 24,
      padding: {
        top: 40,
        right: 64,
        bottom: 40,
        left: 64
      }
    }),
    style: {
      ...baseStyle(),
      fills: [solidPaint(0.97, 0.98, 1)]
    },
    children: [card]
  })
}

function createMobileFrame() {
  return createFrame({
    id: "118:0",
    name: "Mobile layout panel",
    width: 375,
    height: 1000,
    layout: autoLayout("VERTICAL", {
      gap: 16,
      padding: {
        top: 16,
        right: 16,
        bottom: 16,
        left: 16
      }
    }),
    children: [
      createNode({
        id: "118:1",
        name: "Mobile card",
        x: 16,
        y: 16,
        width: 343,
        height: 160
      })
    ]
  })
}

function createFrame(options) {
  return {
    ...createNode({
      ...options,
      type: "FRAME"
    }),
    type: "FRAME",
    schemaVersion: 1,
    importedAt: "2026-06-08T00:00:00.000Z"
  }
}

function createNode(options = {}) {
  const x = options.x ?? 0
  const y = options.y ?? 0
  const width = options.width ?? 100
  const height = options.height ?? 80

  return {
    id: options.id ?? "node-id",
    originalFigmaId: options.originalFigmaId,
    name: options.name ?? "Node",
    type: options.type ?? "RECTANGLE",
    responsive: options.responsive ?? {
      conversionRole: options.layout?.isAutoLayout ? "auto-layout-container" : "manual-layer",
      acceptsChildren: (options.children ?? []).length > 0
    },
    visible: options.visible ?? true,
    locked: options.locked ?? false,
    geometry: createGeometry(x, y, width, height, options.rotation ?? 0),
    layout: options.layout ?? staticLayout(),
    style: options.style ?? baseStyle(),
    text: options.text,
    component: options.component,
    instance: options.instance,
    metadata: options.metadata,
    children: options.children ?? []
  }
}

function staticLayout() {
  return {
    isAutoLayout: false,
    autoLayoutDirection: "NONE",
    constraints: {
      horizontal: "MIN",
      vertical: "MIN"
    },
    layoutMode: "NONE",
    layoutAlign: "INHERIT",
    layoutGrow: 0,
    layoutSizingHorizontal: "FIXED",
    layoutSizingVertical: "FIXED",
    itemSpacing: 0,
    counterAxisSpacing: 0,
    primaryAxisAlignItems: "MIN",
    counterAxisAlignItems: "MIN",
    layoutWrap: "NO_WRAP",
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    primaryAxisSizingMode: "FIXED",
    counterAxisSizingMode: "FIXED"
  }
}

function autoLayout(mode, options = {}) {
  const horizontalSizing = options.horizontalSizing ?? "FIXED"
  const verticalSizing = options.verticalSizing ?? "FIXED"

  return {
    ...staticLayout(),
    isAutoLayout: true,
    autoLayoutDirection: mode,
    layoutMode: mode,
    layoutSizingHorizontal: horizontalSizing,
    layoutSizingVertical: verticalSizing,
    itemSpacing: options.gap ?? 0,
    primaryAxisAlignItems: options.primaryAlign ?? "MIN",
    counterAxisAlignItems: options.counterAlign ?? "MIN",
    padding: options.padding ?? {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    primaryAxisSizingMode: mode === "HORIZONTAL" || mode === "GRID"
      ? toAxisSizingMode(horizontalSizing)
      : toAxisSizingMode(verticalSizing),
    counterAxisSizingMode: mode === "HORIZONTAL" || mode === "GRID"
      ? toAxisSizingMode(verticalSizing)
      : toAxisSizingMode(horizontalSizing)
  }
}

function toAxisSizingMode(sizing) {
  return sizing === "HUG" ? "AUTO" : "FIXED"
}

function baseStyle() {
  return {
    opacity: 1,
    blendMode: "PASS_THROUGH",
    fills: [],
    strokes: [],
    strokeWeight: 1,
    cornerRadius: 0,
    effects: []
  }
}

function solidPaint(r, g, b, opacity = 1) {
  return {
    type: "SOLID",
    visible: true,
    opacity,
    color: {
      r,
      g,
      b
    }
  }
}

function createGeometry(x, y, width, height, rotation) {
  const currentBounds = bounds(x, y, width, height)

  return {
    x,
    y,
    width,
    height,
    rotation,
    absoluteBounds: currentBounds,
    parentRelativeBounds: currentBounds,
    rootRelativeBounds: currentBounds,
    percentOfParent: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100
    },
    percentOfRoot: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100
    },
    hierarchy: {
      parentId: null,
      depth: 0,
      siblingIndex: 0,
      siblingCount: 1
    }
  }
}

function bounds(x, y, width, height) {
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

function toRequiredRendererSnapshot(node) {
  return {
    id: node.id,
    originalFigmaId: node.originalFigmaId,
    name: node.name,
    type: node.type,
    visible: node.visible,
    locked: node.locked,
    geometry: {
      x: node.geometry.x,
      y: node.geometry.y,
      width: node.geometry.width,
      height: node.geometry.height,
      rotation: node.geometry.rotation
    },
    layout: {
      isAutoLayout: node.layout.isAutoLayout,
      layoutMode: node.layout.layoutMode,
      autoLayoutDirection: node.layout.autoLayoutDirection,
      layoutAlign: node.layout.layoutAlign,
      layoutGrow: node.layout.layoutGrow,
      layoutSizingHorizontal: node.layout.layoutSizingHorizontal,
      layoutSizingVertical: node.layout.layoutSizingVertical,
      itemSpacing: node.layout.itemSpacing,
      primaryAxisAlignItems: node.layout.primaryAxisAlignItems,
      counterAxisAlignItems: node.layout.counterAxisAlignItems,
      layoutWrap: node.layout.layoutWrap,
      padding: node.layout.padding,
      primaryAxisSizingMode: node.layout.primaryAxisSizingMode,
      counterAxisSizingMode: node.layout.counterAxisSizingMode
    },
    style: {
      opacity: node.style.opacity,
      blendMode: node.style.blendMode,
      fills: nonEmptyArray(node.style.fills),
      strokes: nonEmptyArray(node.style.strokes),
      strokeWeight: node.style.strokeWeight,
      cornerRadius: node.style.cornerRadius,
      effects: nonEmptyArray(node.style.effects)
    },
    text: node.text,
    component: node.component,
    instance: node.instance,
    metadata: node.metadata,
    children: node.children.map((child) => toRequiredRendererSnapshot(child))
  }
}

function toVisibleLayoutSnapshot(node) {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
    visible: node.visible,
    locked: node.locked,
    geometry: {
      x: node.geometry.x,
      y: node.geometry.y,
      width: node.geometry.width,
      height: node.geometry.height,
      rotation: node.geometry.rotation
    },
    layoutMode: node.layout.layoutMode,
    gap: node.layout.itemSpacing,
    padding: node.layout.padding,
    horizontalSizing: node.layout.layoutSizingHorizontal,
    verticalSizing: node.layout.layoutSizingVertical,
    align: node.layout.layoutAlign,
    grow: node.layout.layoutGrow,
    fills: nonEmptyArray(node.style.fills),
    strokes: nonEmptyArray(node.style.strokes),
    opacity: node.style.opacity,
    cornerRadius: node.style.cornerRadius,
    text: node.text,
    children: node.children.map((child) => toVisibleLayoutSnapshot(child))
  }
}

function hasDerivedGeometryKeys(node) {
  const geometry = node.geometry

  if (
    Object.hasOwn(geometry, "right") ||
    Object.hasOwn(geometry, "bottom") ||
    Object.hasOwn(geometry, "centerX") ||
    Object.hasOwn(geometry, "centerY") ||
    Object.hasOwn(geometry, "absoluteBounds") ||
    Object.hasOwn(geometry, "parentRelativeBounds") ||
    Object.hasOwn(geometry, "rootRelativeBounds") ||
    Object.hasOwn(geometry, "percentOfParent") ||
    Object.hasOwn(geometry, "percentOfRoot")
  ) {
    return true
  }

  return (node.children ?? []).some((child) => hasDerivedGeometryKeys(child))
}

function nonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0 ? value : undefined
}

function deserializeOk(value) {
  const result = deserializeNormalizedJson(value)

  assert.equal(result.ok, true)

  return result.value
}
