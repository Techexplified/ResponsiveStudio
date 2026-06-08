var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_ui();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
function main_default() {
  showUI({
    height: 1e3,
    width: 1400
  });
  figma.ui.onmessage = (message) => {
    if (message.type === "import-selected-frame") {
      importSelectedFrame();
      return;
    }
    if (message.type === "generate-responsive-frame") {
      generateResponsiveFrame(message.payload).catch((error) => {
        const message2 = error instanceof Error ? error.message : "Could not generate responsive frame.";
        figma.notify(message2);
      });
      return;
    }
    if (message.type === "create-export-frame-from-json") {
      createExportFrameFromJson(message.payload).catch((error) => {
        const message2 = error instanceof Error ? error.message : "Could not create export frame from JSON.";
        figma.notify(message2);
      });
    }
  };
}
function importSelectedFrame() {
  const [selectedNode] = figma.currentPage.selection;
  if (selectedNode == null) {
    sendToUi({
      type: "import-error",
      message: "Select a Figma frame, component, or instance first."
    });
    return;
  }
  if (!isImportableFrameNode(selectedNode)) {
    sendToUi({
      type: "import-error",
      message: "The selected layer is not a frame. Select a frame, component, or instance."
    });
    return;
  }
  if (!isAutoLayoutContainer(selectedNode)) {
    sendToUi({
      type: "import-error",
      message: "Select an Auto Layout frame, component, or instance. Responsive conversion needs Figma Auto Layout data."
    });
    return;
  }
  sendToUi({
    type: "frame-imported",
    payload: serializeFrame(selectedNode)
  });
  figma.notify(`Imported "${selectedNode.name}"`);
}
async function generateResponsiveFrame(payload) {
  const sourceNode = await getGenerationSourceNode(payload);
  if (sourceNode == null) {
    figma.notify("Import the source frame again before generating.");
    return;
  }
  const sourceWidth = clampNumber(payload.sourceWidth, 1, 1e4);
  const referenceWidth = clampNumber(payload.screenWidth, 1, 1e4);
  const normalizedPayload = __spreadProps(__spreadValues({}, payload), {
    sourceWidth,
    screenWidth: referenceWidth
  });
  const generatedNode = sourceNode.clone();
  generatedNode.name = `${sourceNode.name} / ${getDeviceLabel(payload.targetDevice)}`;
  generatedNode.x = sourceNode.x + sourceNode.width + 80;
  generatedNode.y = sourceNode.y;
  await applyResponsiveRules(
    generatedNode,
    normalizedPayload,
    sourceWidth,
    createSourceNodeLookup(payload.sourceFrame),
    ""
  );
  figma.currentPage.selection = [generatedNode];
  figma.viewport.scrollAndZoomIntoView([generatedNode]);
  figma.notify(`Generated ${getDeviceLabel(payload.targetDevice)} responsive frame from ${Math.round(referenceWidth)}px reference.`);
}
async function getGenerationSourceNode(payload) {
  if (payload.sourceFrame != null) {
    const importedSourceNode = await figma.getNodeByIdAsync(payload.sourceFrame.id);
    if (importedSourceNode != null && isImportableFrameNode(importedSourceNode)) {
      return importedSourceNode;
    }
  }
  const [selectedNode] = figma.currentPage.selection;
  return selectedNode != null && isImportableFrameNode(selectedNode) ? selectedNode : null;
}
async function createExportFrameFromJson(payload) {
  const materializedFrame = materializeExactExportFrame(payload.frame);
  const exportFrame = await createSceneNodeFromSerializedNode(materializedFrame, true);
  if (!isImportableFrameNode(exportFrame)) {
    figma.notify("JSON export must resolve to a frame.");
    return;
  }
  exportFrame.name = materializedFrame.name;
  exportFrame.x = getNextExportFrameX(materializedFrame.geometry.width);
  exportFrame.y = figma.viewport.center.y - materializedFrame.geometry.height / 2;
  figma.currentPage.appendChild(exportFrame);
  figma.currentPage.selection = [exportFrame];
  figma.viewport.scrollAndZoomIntoView([exportFrame]);
  figma.notify(`Created export frame "${exportFrame.name}" from JSON.`);
}
function materializeExactExportFrame(frame) {
  return __spreadProps(__spreadValues({}, withSerializedGeometry(
    __spreadProps(__spreadValues({}, frame), {
      layout: getStaticSerializedLayout(frame),
      children: frame.children.map((child) => materializeExactExportNode(child))
    }),
    0,
    0,
    frame.geometry.width,
    frame.geometry.height
  )), {
    type: frame.type,
    schemaVersion: 1,
    importedAt: frame.importedAt
  });
}
function materializeExactExportNode(node) {
  return withSerializedGeometry(
    __spreadProps(__spreadValues({}, node), {
      layout: getStaticSerializedLayout(node),
      children: node.children.map((child) => materializeExactExportNode(child))
    }),
    node.geometry.x,
    node.geometry.y,
    node.geometry.width,
    node.geometry.height
  );
}
function getStaticSerializedLayout(node) {
  return __spreadProps(__spreadValues({}, node.layout), {
    isAutoLayout: false,
    autoLayoutDirection: "NONE",
    layoutMode: "NONE",
    layoutAlign: "INHERIT",
    layoutGrow: 0,
    layoutSizingHorizontal: "FIXED",
    layoutSizingVertical: "FIXED"
  });
}
function withSerializedGeometry(node, x, y, width, height) {
  const safeX = roundLayoutNumber(x);
  const safeY = roundLayoutNumber(y);
  const safeWidth = Math.max(1, roundLayoutNumber(width));
  const safeHeight = Math.max(1, roundLayoutNumber(height));
  const bounds = createBounds(safeX, safeY, safeWidth, safeHeight);
  return __spreadProps(__spreadValues({}, node), {
    geometry: __spreadProps(__spreadValues({}, node.geometry), {
      x: safeX,
      y: safeY,
      width: safeWidth,
      height: safeHeight,
      absoluteBounds: bounds,
      parentRelativeBounds: bounds,
      rootRelativeBounds: bounds
    })
  });
}
async function createSceneNodeFromSerializedNode(node, isRoot = false) {
  const sceneNode = await createBaseSceneNode(node);
  applySerializedNodeProperties(sceneNode, node, isRoot);
  if (hasChildren(sceneNode)) {
    for (const child of node.children) {
      const childNode = await createSceneNodeFromSerializedNode(child);
      sceneNode.appendChild(childNode);
    }
  }
  return sceneNode;
}
async function createBaseSceneNode(node) {
  var _a;
  if (node.type === "TEXT") {
    const textNode = figma.createText();
    await applySerializedText(textNode, node);
    return textNode;
  }
  if (node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE" || node.type === "RESPONSIVE_GROUP" || ((_a = node.responsive) == null ? void 0 : _a.isVirtualGroup) === true || node.children.length > 0) {
    return figma.createFrame();
  }
  if (node.type === "RECTANGLE") {
    return figma.createRectangle();
  }
  return figma.createRectangle();
}
function applySerializedNodeProperties(sceneNode, node, isRoot = false) {
  sceneNode.name = node.name;
  sceneNode.visible = node.visible;
  sceneNode.locked = node.locked;
  sceneNode.x = node.geometry.x;
  sceneNode.y = node.geometry.y;
  if ("rotation" in sceneNode) {
    sceneNode.rotation = node.geometry.rotation;
  }
  if (canResize(sceneNode)) {
    sceneNode.resize(
      Math.max(1, node.geometry.width),
      Math.max(1, node.geometry.height)
    );
  }
  if ("opacity" in sceneNode && typeof node.style.opacity === "number") {
    sceneNode.opacity = clampNumber(node.style.opacity, 0, 1);
  }
  if ("fills" in sceneNode) {
    const fills = toFigmaReadonlyArray(node.style.fills);
    if (fills != null) {
      sceneNode.fills = fills;
    } else if (!isRoot) {
      sceneNode.fills = [];
    }
  }
  if ("strokes" in sceneNode) {
    const strokes = toFigmaReadonlyArray(node.style.strokes);
    if (strokes != null) {
      sceneNode.strokes = strokes;
    }
  }
  if ("strokeWeight" in sceneNode && typeof node.style.strokeWeight === "number") {
    sceneNode.strokeWeight = node.style.strokeWeight;
  }
  if ("cornerRadius" in sceneNode && typeof node.style.cornerRadius === "number") {
    ;
    sceneNode.cornerRadius = node.style.cornerRadius;
  }
  if ("effects" in sceneNode) {
    const effects = toFigmaReadonlyArray(node.style.effects);
    if (effects != null) {
      sceneNode.effects = effects;
    }
  }
  applySerializedLayout(sceneNode, node);
}
async function applySerializedText(textNode, node) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const fontName = (_b = toFigmaFontName((_a = node.text) == null ? void 0 : _a.fontName)) != null ? _b : { family: "Inter", style: "Regular" };
  await figma.loadFontAsync(fontName);
  textNode.fontName = fontName;
  textNode.characters = (_d = (_c = node.text) == null ? void 0 : _c.characters) != null ? _d : "";
  if (typeof ((_e = node.text) == null ? void 0 : _e.fontSize) === "number") {
    textNode.fontSize = node.text.fontSize;
  }
  if (((_f = node.text) == null ? void 0 : _f.textAlignHorizontal) === "LEFT" || ((_g = node.text) == null ? void 0 : _g.textAlignHorizontal) === "CENTER" || ((_h = node.text) == null ? void 0 : _h.textAlignHorizontal) === "RIGHT" || ((_i = node.text) == null ? void 0 : _i.textAlignHorizontal) === "JUSTIFIED") {
    textNode.textAlignHorizontal = node.text.textAlignHorizontal;
  }
  if (((_j = node.text) == null ? void 0 : _j.textAlignVertical) === "TOP" || ((_k = node.text) == null ? void 0 : _k.textAlignVertical) === "CENTER" || ((_l = node.text) == null ? void 0 : _l.textAlignVertical) === "BOTTOM") {
    textNode.textAlignVertical = node.text.textAlignVertical;
  }
  const lineHeight = toFigmaLineHeight((_m = node.text) == null ? void 0 : _m.lineHeight);
  if (lineHeight != null) {
    textNode.lineHeight = lineHeight;
  }
}
function applySerializedLayout(sceneNode, node) {
  var _a;
  if (hasAutoLayout(sceneNode)) {
    const layoutMode = getSerializedLayoutMode(node.layout.layoutMode);
    setSerializedSceneLayoutMode(sceneNode, layoutMode);
    if (layoutMode !== "NONE") {
      sceneNode.itemSpacing = clampNumber((_a = node.layout.itemSpacing) != null ? _a : 0, 0, 1e3);
      sceneNode.primaryAxisAlignItems = toFigmaAxisAlign(node.layout.primaryAxisAlignItems);
      sceneNode.counterAxisAlignItems = toFigmaCounterAxisAlign(node.layout.counterAxisAlignItems);
      sceneNode.primaryAxisSizingMode = toFigmaAxisSizing(node.layout.primaryAxisSizingMode);
      sceneNode.counterAxisSizingMode = toFigmaAxisSizing(node.layout.counterAxisSizingMode);
      const padding = node.layout.padding;
      if (padding != null) {
        sceneNode.paddingTop = padding.top;
        sceneNode.paddingRight = padding.right;
        sceneNode.paddingBottom = padding.bottom;
        sceneNode.paddingLeft = padding.left;
      }
    }
  }
  if ("layoutAlign" in sceneNode && (node.layout.layoutAlign === "INHERIT" || node.layout.layoutAlign === "STRETCH")) {
    sceneNode.layoutAlign = node.layout.layoutAlign;
  }
  if ("layoutGrow" in sceneNode && typeof node.layout.layoutGrow === "number") {
    sceneNode.layoutGrow = node.layout.layoutGrow;
  }
  if ("layoutSizingHorizontal" in sceneNode && isFigmaLayoutSizingMode(node.layout.layoutSizingHorizontal)) {
    sceneNode.layoutSizingHorizontal = node.layout.layoutSizingHorizontal;
  }
  if ("layoutSizingVertical" in sceneNode && isFigmaLayoutSizingMode(node.layout.layoutSizingVertical)) {
    sceneNode.layoutSizingVertical = node.layout.layoutSizingVertical;
  }
}
function getSerializedLayoutMode(value) {
  if (value === "HORIZONTAL" || value === "VERTICAL" || value === "GRID") {
    return value;
  }
  return "NONE";
}
function setSerializedSceneLayoutMode(sceneNode, layoutMode) {
  if (layoutMode === "GRID") {
    try {
      ;
      sceneNode.layoutMode = layoutMode;
    } catch (_error) {
      console.warn("This Figma runtime does not support GRID layout mode; created the node without Auto Layout grid.");
      sceneNode.layoutMode = "NONE";
    }
    return;
  }
  sceneNode.layoutMode = layoutMode;
}
function getNextExportFrameX(width) {
  const selectedNodes = figma.currentPage.selection;
  if (selectedNodes.length > 0) {
    return Math.max(...selectedNodes.map((node) => readNumber(node, "x", 0) + readNumber(node, "width", 0))) + 80;
  }
  return figma.viewport.center.x - width / 2;
}
function toFigmaReadonlyArray(value) {
  if (!Array.isArray(value)) {
    return null;
  }
  return value;
}
function toFigmaFontName(value) {
  const fontName = asJsonObject(value);
  if (fontName == null || typeof fontName.family !== "string" || typeof fontName.style !== "string") {
    return null;
  }
  return {
    family: fontName.family,
    style: fontName.style
  };
}
function toFigmaLineHeight(value) {
  const lineHeight = asJsonObject(value);
  if (lineHeight == null || typeof lineHeight.unit !== "string") {
    return null;
  }
  if (lineHeight.unit === "PIXELS" && typeof lineHeight.value === "number") {
    return {
      unit: "PIXELS",
      value: lineHeight.value
    };
  }
  if (lineHeight.unit === "PERCENT" && typeof lineHeight.value === "number") {
    return {
      unit: "PERCENT",
      value: lineHeight.value
    };
  }
  if (lineHeight.unit === "AUTO") {
    return {
      unit: "AUTO"
    };
  }
  return null;
}
function toFigmaAxisAlign(value) {
  if (value === "CENTER" || value === "MAX" || value === "SPACE_BETWEEN") {
    return value;
  }
  return "MIN";
}
function toFigmaCounterAxisAlign(value) {
  if (value === "CENTER" || value === "MAX" || value === "BASELINE") {
    return value;
  }
  return "MIN";
}
function toFigmaAxisSizing(value) {
  return value === "AUTO" ? "AUTO" : "FIXED";
}
function isFigmaLayoutSizingMode(value) {
  return value === "FIXED" || value === "HUG" || value === "FILL";
}
function asJsonObject(value) {
  return value != null && !Array.isArray(value) && typeof value === "object" ? value : null;
}
async function applyResponsiveRules(node, payload, sourceWidth, sourceNodeLookup, nodePath) {
  var _a;
  const sourceNode = sourceNodeLookup.get(nodePath);
  const effectiveRules = getEffectiveGenerationRules(payload, (_a = sourceNode == null ? void 0 : sourceNode.responsive) == null ? void 0 : _a.nodeRule);
  if (hasAutoLayout(node)) {
    const nextLayoutMode = getConvertedLayoutMode(node, payload, effectiveRules);
    if (nextLayoutMode != null) {
      node.layoutMode = nextLayoutMode;
      node.itemSpacing = clampNumber(effectiveRules.stackGap, 0, 200);
      node.counterAxisAlignItems = getFigmaCounterAxisAlignment(effectiveRules.stackAlignment);
    }
    const activeLayoutMode = nextLayoutMode != null ? nextLayoutMode : getCurrentLayoutMode(node);
    if (activeLayoutMode != null) {
      applyConvertedChildSizing(node, activeLayoutMode, effectiveRules.stackAlignment, sourceNode);
      applyResponsiveChildGeometry(node, activeLayoutMode, effectiveRules, sourceNode);
    }
    if (isRootResponsiveNode(node)) {
      const padding = clampNumber(payload.layoutRules.outputPadding, 0, 200);
      node.paddingTop = padding;
      node.paddingRight = padding;
      node.paddingBottom = padding;
      node.paddingLeft = padding;
    }
  }
  if (node.type === "TEXT") {
    await applyResponsiveTextRules(node, payload, sourceWidth);
  }
  if (hasChildren(node)) {
    for (let index = 0; index < node.children.length; index += 1) {
      const child = node.children[index];
      await applyResponsiveRules(
        child,
        payload,
        sourceWidth,
        sourceNodeLookup,
        nodePath === "" ? String(index) : `${nodePath}/${index}`
      );
    }
  }
}
async function applyResponsiveTextRules(node, payload, sourceWidth) {
  if (typeof node.fontSize !== "number") {
    return;
  }
  await loadTextFonts(node);
  const widthScale = clampNumber(payload.screenWidth / sourceWidth, 0.5, 1);
  const scaledSize = node.fontSize * widthScale;
  const minimumTextSize = clampNumber(payload.layoutRules.minimumTextSize, 8, 48);
  if (payload.layoutRules.textScaleMode === "scale") {
    node.fontSize = Math.max(minimumTextSize, scaledSize);
  } else if (payload.layoutRules.textScaleMode === "clamp") {
    node.fontSize = Math.max(minimumTextSize, Math.min(node.fontSize, scaledSize));
  }
  if (payload.layoutRules.tightenLineHeight && node.lineHeight !== figma.mixed) {
    node.lineHeight = {
      unit: "PERCENT",
      value: 115
    };
  }
}
async function loadTextFonts(node) {
  if (node.fontName !== figma.mixed) {
    await figma.loadFontAsync(node.fontName);
  }
}
function getConvertedLayoutMode(node, payload, layoutRules) {
  if (layoutRules.rowToColumnMode === "always") {
    return getTargetLayoutMode(node, layoutRules);
  }
  if (layoutRules.rowToColumnMode === "never") {
    return null;
  }
  const shouldConvert = layoutRules.conversionDirection === "row-to-column" ? payload.screenWidth <= layoutRules.rowToColumnBreakpoint : payload.screenWidth >= layoutRules.rowToColumnBreakpoint;
  return shouldConvert ? getTargetLayoutMode(node, layoutRules) : null;
}
function getTargetLayoutMode(node, layoutRules) {
  if (!hasAutoLayout(node)) {
    return null;
  }
  if (layoutRules.conversionDirection === "row-to-column") {
    return node.layoutMode === "HORIZONTAL" ? "VERTICAL" : null;
  }
  return node.layoutMode === "VERTICAL" ? "HORIZONTAL" : null;
}
function getCurrentLayoutMode(node) {
  if (node.layoutMode === "HORIZONTAL" || node.layoutMode === "VERTICAL") {
    return node.layoutMode;
  }
  return null;
}
function getEffectiveGenerationRules(payload, nodeRule) {
  if ((nodeRule == null ? void 0 : nodeRule.enabled) === true) {
    return {
      conversionDirection: nodeRule.conversionDirection,
      rowToColumnMode: nodeRule.rowToColumnMode,
      rowToColumnBreakpoint: nodeRule.rowToColumnBreakpoint,
      stackGap: nodeRule.stackGap,
      stackAlignment: nodeRule.stackAlignment
    };
  }
  return {
    conversionDirection: payload.layoutRules.conversionDirection,
    rowToColumnMode: payload.layoutRules.rowToColumnMode,
    rowToColumnBreakpoint: payload.layoutRules.rowToColumnBreakpoint,
    stackGap: payload.layoutRules.stackGap,
    stackAlignment: payload.layoutRules.stackAlignment
  };
}
function createSourceNodeLookup(sourceFrame) {
  const sourceNodeLookup = /* @__PURE__ */ new Map();
  if (sourceFrame == null) {
    return sourceNodeLookup;
  }
  collectSourceNodes(sourceFrame, "", sourceNodeLookup);
  return sourceNodeLookup;
}
function collectSourceNodes(node, nodePath, sourceNodeLookup) {
  sourceNodeLookup.set(nodePath, node);
  node.children.forEach((child, index) => {
    collectSourceNodes(
      child,
      nodePath === "" ? String(index) : `${nodePath}/${index}`,
      sourceNodeLookup
    );
  });
}
function getFigmaCounterAxisAlignment(alignment) {
  if (alignment === "center") {
    return "CENTER";
  }
  return "MIN";
}
function applyConvertedChildSizing(node, layoutMode, alignment, sourceNode) {
  if (!hasChildren(node)) {
    return;
  }
  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index];
    const sourceChild = sourceNode == null ? void 0 : sourceNode.children[index];
    const fillsHorizontal = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "horizontal",
      layoutMode === "VERTICAL" && alignment === "stretch",
      layoutMode
    );
    const fillsVertical = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "vertical",
      layoutMode === "HORIZONTAL" && alignment === "stretch",
      layoutMode
    );
    const fillsMainAxis = layoutMode === "HORIZONTAL" ? fillsHorizontal : fillsVertical;
    const fillsCrossAxis = layoutMode === "HORIZONTAL" ? fillsVertical : fillsHorizontal;
    if (!("layoutAlign" in child)) {
      continue;
    }
    child.layoutAlign = fillsCrossAxis ? "STRETCH" : "INHERIT";
    if ("layoutGrow" in child) {
      child.layoutGrow = fillsMainAxis ? 1 : 0;
    }
    if ("layoutSizingHorizontal" in child) {
      const sizing = fillsHorizontal ? "FILL" : getSerializedAxisSizing(sourceChild, "horizontal");
      if (sizing != null) {
        child.layoutSizingHorizontal = sizing;
      }
    }
    if ("layoutSizingVertical" in child) {
      const sizing = fillsVertical ? "FILL" : getSerializedAxisSizing(sourceChild, "vertical");
      if (sizing != null) {
        child.layoutSizingVertical = sizing;
      }
    }
  }
}
function applyResponsiveChildGeometry(node, layoutMode, layoutRules, sourceNode) {
  var _a;
  if (!hasChildren(node)) {
    return;
  }
  const padding = getNodePadding(node);
  const contentWidth = Math.max(1, node.width - padding.left - padding.right);
  const contentHeight = Math.max(1, node.height - padding.top - padding.bottom);
  const gap = clampNumber((_a = node.itemSpacing) != null ? _a : layoutRules.stackGap, 0, 200);
  if (layoutMode === "VERTICAL") {
    resizeVerticalLayoutChildren(node, sourceNode, contentWidth, contentHeight, gap);
    return;
  }
  resizeHorizontalLayoutChildren(node, sourceNode, layoutRules, contentWidth, contentHeight, gap);
}
function resizeVerticalLayoutChildren(node, sourceNode, contentWidth, contentHeight, gap) {
  const metrics = node.children.map((child, index) => {
    const sourceChild = sourceNode == null ? void 0 : sourceNode.children[index];
    const fillsWidth = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "horizontal",
      true,
      "VERTICAL"
    );
    const fillsHeight = shouldFillGeneratedAxis(
      sourceChild,
      child,
      "vertical",
      false,
      "VERTICAL"
    );
    const nextWidth = fillsWidth ? contentWidth : Math.min(readNumber(child, "width", contentWidth), contentWidth);
    return {
      child,
      fillsHeight,
      nextWidth
    };
  });
  const totalGap = gap * Math.max(0, metrics.length - 1);
  const fixedHeightTotal = metrics.reduce((total, metric) => {
    return metric.fillsHeight ? total : total + readNumber(metric.child, "height", 0);
  }, 0);
  const fillHeightCount = metrics.filter((metric) => metric.fillsHeight).length;
  const fillHeight = fillHeightCount === 0 ? 0 : Math.max(1, (contentHeight - totalGap - fixedHeightTotal) / fillHeightCount);
  for (const metric of metrics) {
    const nextHeight = metric.fillsHeight ? fillHeight : readNumber(metric.child, "height", 1);
    resizeSceneNode(metric.child, metric.nextWidth, nextHeight);
  }
}
function resizeHorizontalLayoutChildren(node, sourceNode, layoutRules, contentWidth, contentHeight, gap) {
  const metrics = node.children.map((child, index) => {
    const sourceChild = sourceNode == null ? void 0 : sourceNode.children[index];
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
    };
  });
  const totalGap = gap * Math.max(0, metrics.length - 1);
  const fixedWidthTotal = metrics.reduce((total, metric) => {
    return metric.fillsWidth ? total : total + readNumber(metric.child, "width", 0);
  }, 0);
  const fillWidthCount = metrics.filter((metric) => metric.fillsWidth).length;
  const fillWidth = fillWidthCount === 0 ? 0 : Math.max(1, (contentWidth - totalGap - fixedWidthTotal) / fillWidthCount);
  for (const metric of metrics) {
    const currentWidth = readNumber(metric.child, "width", 1);
    const currentHeight = readNumber(metric.child, "height", 1);
    const nextWidth = metric.fillsWidth ? fillWidth : currentWidth;
    const nextHeight = metric.fillsHeight ? contentHeight : currentHeight;
    resizeSceneNode(metric.child, nextWidth, nextHeight);
  }
}
function getNodePadding(node) {
  return {
    top: clampNumber(node.paddingTop, 0, 1e4),
    right: clampNumber(node.paddingRight, 0, 1e4),
    bottom: clampNumber(node.paddingBottom, 0, 1e4),
    left: clampNumber(node.paddingLeft, 0, 1e4)
  };
}
function resizeSceneNode(node, width, height) {
  if (!canResize(node)) {
    return;
  }
  const nextWidth = Math.max(1, Math.round(width * 1e3) / 1e3);
  const nextHeight = Math.max(1, Math.round(height * 1e3) / 1e3);
  if (Math.abs(readNumber(node, "width", nextWidth) - nextWidth) < 0.01 && Math.abs(readNumber(node, "height", nextHeight) - nextHeight) < 0.01) {
    return;
  }
  try {
    node.resize(nextWidth, nextHeight);
  } catch (_error) {
  }
}
function shouldFillGeneratedAxis(sourceNode, fallbackNode, axis, defaultFill, parentLayoutMode) {
  const serializedSizing = getSerializedAxisSizing(sourceNode, axis);
  if (serializedSizing != null) {
    return serializedSizing === "FILL";
  }
  if ((sourceNode == null ? void 0 : sourceNode.layout.layoutAlign) === "STRETCH" && axisMatchesCrossAxis(parentLayoutMode, axis)) {
    return true;
  }
  if (typeof (sourceNode == null ? void 0 : sourceNode.layout.layoutGrow) === "number" && sourceNode.layout.layoutGrow > 0 && axisMatchesPrimaryParentAxis(parentLayoutMode, axis)) {
    return true;
  }
  const sceneSizing = getSceneAxisSizing(fallbackNode, axis, parentLayoutMode);
  if (sceneSizing != null) {
    return sceneSizing === "FILL";
  }
  return isSceneStretchedOnAxis(fallbackNode, axis, parentLayoutMode) || defaultFill;
}
function getSerializedAxisSizing(node, axis) {
  if (node == null) {
    return null;
  }
  const layoutSizing = axis === "horizontal" ? node.layout.layoutSizingHorizontal : node.layout.layoutSizingVertical;
  if (layoutSizing === "FILL" || layoutSizing === "HUG" || layoutSizing === "FIXED") {
    return layoutSizing;
  }
  const axisSizing = axisMatchesPrimaryAxis(node, axis) ? node.layout.primaryAxisSizingMode : node.layout.counterAxisSizingMode;
  if (axisSizing === "AUTO") {
    return "HUG";
  }
  if (axisSizing === "FIXED") {
    return "FIXED";
  }
  return null;
}
function getSceneAxisSizing(node, axis, parentLayoutMode) {
  if (axis === "horizontal" && "layoutSizingHorizontal" in node) {
    return node.layoutSizingHorizontal;
  }
  if (axis === "vertical" && "layoutSizingVertical" in node) {
    return node.layoutSizingVertical;
  }
  if ("layoutGrow" in node && node.layoutGrow > 0 && axisMatchesPrimaryParentAxis(parentLayoutMode, axis)) {
    return "FILL";
  }
  return null;
}
function axisMatchesPrimaryAxis(node, axis) {
  return axis === "horizontal" ? node.layout.layoutMode === "HORIZONTAL" : node.layout.layoutMode === "VERTICAL";
}
function axisMatchesPrimaryParentAxis(parentLayoutMode, axis) {
  return axis === "horizontal" ? parentLayoutMode === "HORIZONTAL" : parentLayoutMode === "VERTICAL";
}
function axisMatchesCrossAxis(parentLayoutMode, axis) {
  return axis === "horizontal" ? parentLayoutMode === "VERTICAL" : parentLayoutMode === "HORIZONTAL";
}
function isSceneStretchedOnAxis(node, axis, parentLayoutMode) {
  return "layoutAlign" in node && node.layoutAlign === "STRETCH" && axisMatchesCrossAxis(parentLayoutMode, axis);
}
function isRootResponsiveNode(node) {
  return isImportableFrameNode(node) && node.parent === figma.currentPage;
}
function hasAutoLayout(node) {
  return "layoutMode" in node;
}
function canResize(node) {
  return "resize" in node && typeof node.resize === "function";
}
function getDeviceLabel(targetDevice) {
  if (targetDevice === "mobile") {
    return "Mobile";
  }
  if (targetDevice === "tablet") {
    return "Tablet";
  }
  if (targetDevice === "desktop") {
    return "Desktop";
  }
  return "Custom";
}
function serializeFrame(node) {
  const rootBounds = getAbsoluteBounds(node);
  return __spreadProps(__spreadValues({}, serializeNode({
    node,
    isRoot: true,
    rootBounds,
    parentBounds: null,
    parentId: null,
    depth: 0,
    siblingIndex: 0,
    siblingCount: 1
  })), {
    type: node.type,
    schemaVersion: 1,
    importedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
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
}) {
  const absoluteBounds = getAbsoluteBounds(node);
  const parentRelativeBounds = getRelativeBounds(absoluteBounds, parentBounds != null ? parentBounds : absoluteBounds);
  const rootRelativeBounds = getRelativeBounds(absoluteBounds, rootBounds);
  const percentOfParent = parentBounds == null ? void 0 : getPercentBounds(parentRelativeBounds, parentBounds);
  const percentOfRoot = getPercentBounds(rootRelativeBounds, rootBounds);
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
    text: node.type === "TEXT" ? serializeText(node) : void 0,
    children: hasChildren(node) ? node.children.map((child, index) => serializeNode({
      node: child,
      rootBounds,
      parentBounds: absoluteBounds,
      parentId: node.id,
      depth: depth + 1,
      siblingIndex: index,
      siblingCount: node.children.length
    })) : []
  };
}
function serializeLayout(node) {
  const layout = {
    isAutoLayout: isAutoLayoutContainer(node)
  };
  if ("constraints" in node) {
    layout.constraints = toJsonValue(node.constraints);
  }
  if ("layoutMode" in node) {
    layout.layoutMode = node.layoutMode;
    layout.autoLayoutDirection = node.layoutMode;
  }
  if ("layoutAlign" in node) {
    layout.layoutAlign = node.layoutAlign;
  }
  if ("layoutGrow" in node) {
    layout.layoutGrow = node.layoutGrow;
  }
  if ("layoutSizingHorizontal" in node) {
    layout.layoutSizingHorizontal = node.layoutSizingHorizontal;
  }
  if ("layoutSizingVertical" in node) {
    layout.layoutSizingVertical = node.layoutSizingVertical;
  }
  if ("itemSpacing" in node) {
    layout.itemSpacing = node.itemSpacing;
  }
  if ("counterAxisSpacing" in node && node.counterAxisSpacing != null) {
    layout.counterAxisSpacing = node.counterAxisSpacing;
  }
  if ("primaryAxisAlignItems" in node) {
    layout.primaryAxisAlignItems = node.primaryAxisAlignItems;
  }
  if ("counterAxisAlignItems" in node) {
    layout.counterAxisAlignItems = node.counterAxisAlignItems;
  }
  if ("layoutWrap" in node) {
    layout.layoutWrap = node.layoutWrap;
  }
  if ("paddingTop" in node && "paddingRight" in node && "paddingBottom" in node && "paddingLeft" in node) {
    layout.padding = {
      top: node.paddingTop,
      right: node.paddingRight,
      bottom: node.paddingBottom,
      left: node.paddingLeft
    };
  }
  if ("primaryAxisSizingMode" in node) {
    layout.primaryAxisSizingMode = node.primaryAxisSizingMode;
  }
  if ("counterAxisSizingMode" in node) {
    layout.counterAxisSizingMode = node.counterAxisSizingMode;
  }
  return layout;
}
function serializeResponsiveMetadata(node, isRoot) {
  const isAutoLayout = isAutoLayoutContainer(node);
  return {
    groupRole: isRoot ? "root" : void 0,
    conversionRole: isAutoLayout ? "auto-layout-container" : "manual-layer",
    acceptsChildren: hasChildren(node)
  };
}
function serializeStyle(node) {
  const style = {};
  if ("opacity" in node) {
    style.opacity = node.opacity;
  }
  if ("blendMode" in node) {
    style.blendMode = node.blendMode;
  }
  if ("fills" in node && node.fills !== figma.mixed) {
    style.fills = toJsonValue(node.fills);
  }
  if ("strokes" in node) {
    style.strokes = toJsonValue(node.strokes);
  }
  if ("strokeWeight" in node && node.strokeWeight !== figma.mixed) {
    style.strokeWeight = node.strokeWeight;
  }
  if ("cornerRadius" in node) {
    style.cornerRadius = node.cornerRadius === figma.mixed ? "mixed" : node.cornerRadius;
  }
  if ("effects" in node) {
    style.effects = toJsonValue(node.effects);
  }
  return style;
}
function serializeText(node) {
  return {
    characters: node.characters,
    fontSize: node.fontSize === figma.mixed ? "mixed" : node.fontSize,
    fontName: toJsonValue(node.fontName),
    fontWeight: node.fontWeight === figma.mixed ? void 0 : node.fontWeight,
    textAlignHorizontal: node.textAlignHorizontal,
    textAlignVertical: node.textAlignVertical,
    lineHeight: toJsonValue(node.lineHeight),
    letterSpacing: toJsonValue(node.letterSpacing)
  };
}
function isImportableFrameNode(node) {
  return node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE";
}
function isAutoLayoutContainer(node) {
  return "layoutMode" in node && node.layoutMode !== "NONE";
}
function hasChildren(node) {
  return "children" in node;
}
function readNumber(node, key, fallback) {
  const value = node[key];
  return typeof value === "number" ? value : fallback;
}
function readBoolean(node, key, fallback) {
  const value = node[key];
  return typeof value === "boolean" ? value : fallback;
}
function getAbsoluteBounds(node) {
  var _a, _b, _c, _d;
  const absoluteBoundingBox = "absoluteBoundingBox" in node ? node.absoluteBoundingBox : null;
  const x = (_a = absoluteBoundingBox == null ? void 0 : absoluteBoundingBox.x) != null ? _a : readNumber(node, "x", 0);
  const y = (_b = absoluteBoundingBox == null ? void 0 : absoluteBoundingBox.y) != null ? _b : readNumber(node, "y", 0);
  const width = (_c = absoluteBoundingBox == null ? void 0 : absoluteBoundingBox.width) != null ? _c : readNumber(node, "width", 0);
  const height = (_d = absoluteBoundingBox == null ? void 0 : absoluteBoundingBox.height) != null ? _d : readNumber(node, "height", 0);
  return createBounds(x, y, width, height);
}
function getRelativeBounds(bounds, origin) {
  return createBounds(
    bounds.x - origin.x,
    bounds.y - origin.y,
    bounds.width,
    bounds.height
  );
}
function getPercentBounds(bounds, container) {
  return {
    x: toPercent(bounds.x, container.width),
    y: toPercent(bounds.y, container.height),
    width: toPercent(bounds.width, container.width),
    height: toPercent(bounds.height, container.height),
    right: toPercent(bounds.right, container.width),
    bottom: toPercent(bounds.bottom, container.height)
  };
}
function createBounds(x, y, width, height) {
  const roundedX = roundLayoutNumber(x);
  const roundedY = roundLayoutNumber(y);
  const roundedWidth = roundLayoutNumber(width);
  const roundedHeight = roundLayoutNumber(height);
  return {
    x: roundedX,
    y: roundedY,
    width: roundedWidth,
    height: roundedHeight,
    right: roundLayoutNumber(roundedX + roundedWidth),
    bottom: roundLayoutNumber(roundedY + roundedHeight),
    centerX: roundLayoutNumber(roundedX + roundedWidth / 2),
    centerY: roundLayoutNumber(roundedY + roundedHeight / 2)
  };
}
function toPercent(value, total) {
  return total === 0 ? 0 : roundLayoutNumber(value / total * 100);
}
function roundLayoutNumber(value) {
  return Math.round(value * 1e3) / 1e3;
}
function clampNumber(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, value));
}
function toJsonValue(value) {
  if (value === figma.mixed) {
    return "mixed";
  }
  if (value == null) {
    return null;
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => toJsonValue(item));
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, toJsonValue(entry)])
    );
  }
  return String(value);
}
function sendToUi(message) {
  figma.ui.postMessage(message);
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
