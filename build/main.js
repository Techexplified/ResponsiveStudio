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
var __restKey = (key) => typeof key === "symbol" ? key : key + "";
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
  serializeFrame(selectedNode).then((payload) => {
    sendToUi({
      type: "frame-imported",
      payload
    });
    figma.notify(`Imported "${selectedNode.name}"`);
  }).catch((error) => {
    const message = error instanceof Error ? error.message : "Could not import selected frame.";
    sendToUi({
      type: "import-error",
      message
    });
  });
}
async function generateResponsiveFrame(payload) {
  var _a;
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
  const sourceFrame = (_a = payload.sourceFrame) != null ? _a : await serializeFrame(sourceNode);
  const materializedFrame = materializeExportPreviewFrame({
    frame: sourceFrame,
    screenWidth: referenceWidth,
    layoutRules: normalizedPayload.layoutRules
  });
  const generatedNode = await createSceneNodeFromSerializedNode(materializedFrame, true);
  if (!isImportableFrameNode(generatedNode)) {
    figma.notify("Generated responsive output must resolve to a frame.");
    return;
  }
  generatedNode.name = `${sourceNode.name} / ${getDeviceLabel(payload.targetDevice)}`;
  generatedNode.x = sourceNode.x + sourceNode.width + 80;
  generatedNode.y = sourceNode.y;
  figma.currentPage.appendChild(generatedNode);
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
  const materializedFrame = materializeExportPreviewFrame(payload);
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
function materializeExportPreviewFrame(payload) {
  const reviewWidth = Number.isFinite(payload.screenWidth) && payload.screenWidth > 0 ? payload.screenWidth : payload.frame.geometry.width;
  const exportGroups = createJsonExportReviewGroups(payload.frame, reviewWidth, payload.layoutRules);
  const reviewHeight = Math.max(
    Math.min(payload.frame.geometry.height, 760),
    exportGroups.reduce((bottom, group) => Math.max(bottom, group.y + group.height), 0) + 24
  );
  return __spreadProps(__spreadValues({}, withSerializedGeometry(
    __spreadProps(__spreadValues({}, payload.frame), {
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
    }),
    0,
    0,
    reviewWidth,
    reviewHeight
  )), {
    type: payload.frame.type,
    schemaVersion: 1,
    importedAt: payload.frame.importedAt
  });
}
function createJsonExportReviewGroups(frame, reviewWidth, layoutRules) {
  const outerPadding = layoutRules.outputPadding;
  const rootReplacement = materializeJsonExportReplacementNode(frame, reviewWidth);
  if (rootReplacement != null) {
    return [{
      node: rootReplacement,
      x: outerPadding,
      y: outerPadding,
      width: rootReplacement.geometry.width,
      height: rootReplacement.geometry.height,
      sourceBounds: rootReplacement.geometry,
      scale: 1
    }];
  }
  const contentWidth = Math.max(1, reviewWidth - outerPadding * 2);
  const visibleChildren = frame.children.filter((child) => child.visible).map((child) => {
    var _a;
    return (_a = materializeJsonExportReplacementNode(child, reviewWidth)) != null ? _a : child;
  }).sort((first, second) => first.geometry.y - second.geometry.y || first.geometry.x - second.geometry.x);
  let nextY = outerPadding;
  return visibleChildren.map((child) => {
    const sourceBounds = child.geometry;
    const fitScale = contentWidth / Math.max(sourceBounds.width, 1);
    const scale = hasSerializedImageFill(child) ? Math.min(1, fitScale) : fitScale;
    const width = hasSerializedImageFill(child) ? Math.max(1, sourceBounds.width * scale) : contentWidth;
    const height = Math.max(1, getJsonExportNodeHeight(child, layoutRules, reviewWidth) * scale);
    const group = {
      node: child,
      x: outerPadding + Math.max(0, (contentWidth - width) / 2),
      y: nextY,
      width,
      height,
      sourceBounds,
      scale
    };
    nextY += height + layoutRules.stackGap;
    return group;
  });
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
}) {
  const arrangedChildren = arrangeJsonExportChildren(node, layoutRules, reviewWidth);
  const text = node.text == null ? void 0 : __spreadProps(__spreadValues({}, node.text), {
    fontSize: typeof node.text.fontSize === "number" ? getJsonExportFontSize(node.text.fontSize, scale, layoutRules) : node.text.fontSize,
    lineHeight: scaleJsonExportLineHeight(node.text.lineHeight, scale)
  });
  const style = __spreadProps(__spreadValues({}, node.style), {
    fills: fitSerializedImageFills(node.style.fills),
    strokeWeight: typeof node.style.strokeWeight === "number" ? node.style.strokeWeight * scale : node.style.strokeWeight,
    cornerRadius: typeof node.style.cornerRadius === "number" ? node.style.cornerRadius * scale : node.style.cornerRadius
  });
  return withSerializedGeometry(
    __spreadProps(__spreadValues({}, node), {
      layout: getStaticSerializedLayout(node),
      style,
      text,
      children: arrangedChildren.filter((child) => child.node.visible).map((child) => materializeJsonExportNode({
        node: child.node,
        origin: { x: 0, y: 0 },
        scale,
        layoutRules,
        reviewWidth
      }))
    }),
    x,
    y,
    width,
    height
  );
}
function materializeJsonExportReplacementNode(node, reviewWidth) {
  var _a;
  const rule = (_a = node.responsive) == null ? void 0 : _a.replacement;
  if (!isReplacementActive(rule, reviewWidth)) {
    return null;
  }
  const { width, height } = getSerializedReplacementDimensions(node, rule);
  const lineWidth = Math.max(12, Math.min(width - 12, Math.round(width * 0.5)));
  const lineHeight = Math.max(2, Math.min(4, Math.round(height * 0.08)));
  const gap = Math.max(4, Math.round(height * 0.12));
  const totalLineHeight = lineHeight * 3 + gap * 2;
  const startX = Math.max(0, (width - lineWidth) / 2);
  const startY = Math.max(0, (height - totalLineHeight) / 2);
  return __spreadProps(__spreadValues({}, withSerializedGeometry(node, node.geometry.x, node.geometry.y, width, height)), {
    name: `${node.name} / hamburger`,
    layout: getStaticSerializedLayout(node),
    style: __spreadProps(__spreadValues({}, node.style), {
      fills: [createSerializedSolidPaint(1, 1, 1)],
      strokes: [createSerializedSolidPaint(0.15, 0.17, 0.2)],
      strokeWeight: 1,
      cornerRadius: 8
    }),
    text: void 0,
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
  });
}
function createSerializedSolidPaint(r, g, b) {
  return {
    type: "SOLID",
    visible: true,
    opacity: 1,
    color: {
      r,
      g,
      b
    }
  };
}
function getJsonExportNodeHeight(node, layoutRules, reviewWidth) {
  var _a;
  const replacementNode = materializeJsonExportReplacementNode(node, reviewWidth);
  if (replacementNode != null) {
    return replacementNode.geometry.height;
  }
  if (node.children.length === 0) {
    return node.geometry.height;
  }
  const arrangedChildren = arrangeJsonExportChildren(node, layoutRules, reviewWidth);
  const childrenBottom = arrangedChildren.reduce((bottom, child) => {
    return Math.max(
      bottom,
      child.node.geometry.y + getJsonExportNodeHeight(child.node, layoutRules, reviewWidth)
    );
  }, 0);
  const padding = (_a = node.layout.padding) != null ? _a : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  if (getJsonExportNodeAxisSizing(node, "vertical") === "HUG") {
    return Math.max(1, childrenBottom + padding.bottom);
  }
  return Math.max(node.geometry.height, childrenBottom);
}
function arrangeJsonExportChildren(node, layoutRules, reviewWidth) {
  var _a;
  const layoutNode = __spreadProps(__spreadValues({}, node), {
    children: node.children.map((child) => {
      var _a2;
      return (_a2 = materializeJsonExportReplacementNode(child, reviewWidth)) != null ? _a2 : child;
    })
  });
  const effectiveRules = getEffectiveJsonExportRules(layoutNode, layoutRules);
  const convertedLayoutMode = getConvertedJsonExportLayoutMode(layoutNode, effectiveRules, reviewWidth);
  const activeLayoutMode = convertedLayoutMode != null ? convertedLayoutMode : getNativeJsonExportLayoutMode(layoutNode);
  const sourceParentLayoutMode = (_a = getNativeJsonExportLayoutMode(layoutNode)) != null ? _a : activeLayoutMode;
  const activeRules = convertedLayoutMode == null ? getNativeJsonExportLayoutRules(layoutNode, effectiveRules) : effectiveRules;
  if (activeLayoutMode == null) {
    return layoutNode.children.map((child) => ({ node: child }));
  }
  if (activeLayoutMode === "HORIZONTAL") {
    return arrangeJsonExportChildrenHorizontally(layoutNode, layoutRules, activeRules, reviewWidth, sourceParentLayoutMode);
  }
  return arrangeJsonExportChildrenVertically(layoutNode, layoutRules, activeRules, reviewWidth, sourceParentLayoutMode);
}
function arrangeJsonExportChildrenVertically(node, layoutRules, effectiveRules, reviewWidth, sourceParentLayoutMode) {
  var _a;
  const padding = (_a = node.layout.padding) != null ? _a : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right);
  const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom);
  const childLayouts = node.children.map((child) => {
    const childWidth = shouldFillJsonExportAxis(
      child,
      "horizontal",
      effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH",
      "VERTICAL",
      sourceParentLayoutMode
    ) ? contentWidth : Math.min(child.geometry.width, contentWidth);
    const childForWidth = withSerializedGeometry(
      child,
      child.geometry.x,
      child.geometry.y,
      childWidth,
      child.geometry.height
    );
    return {
      child,
      childWidth,
      baseHeight: getJsonExportNodeHeight(childForWidth, layoutRules, reviewWidth),
      fillsHeight: shouldFillJsonExportAxis(child, "vertical", false, "VERTICAL", sourceParentLayoutMode)
    };
  });
  const justify = getJsonExportMainAxisAlign(node);
  const align = getJsonExportCrossAxisAlign(node, effectiveRules);
  const baseGap = effectiveRules.stackGap;
  const baseGapTotal = baseGap * Math.max(0, childLayouts.length - 1);
  const fillHeightCount = childLayouts.filter((child) => child.fillsHeight).length;
  const fixedHeightTotal = childLayouts.reduce((total, child) => {
    return child.fillsHeight ? total : total + child.baseHeight;
  }, 0);
  const fillHeight = fillHeightCount === 0 ? 0 : Math.max(1, (contentHeight - baseGapTotal - fixedHeightTotal) / fillHeightCount);
  const totalChildrenHeight = childLayouts.reduce((total, child) => {
    return total + (child.fillsHeight ? fillHeight : child.baseHeight);
  }, 0);
  const mainUsed = totalChildrenHeight + baseGapTotal;
  const dynamicGap = getJsonExportDynamicMainAxisGap(justify, baseGap, contentHeight, totalChildrenHeight, childLayouts.length);
  let nextY = padding.top + getJsonExportMainAxisOffset(justify, contentHeight, mainUsed);
  return childLayouts.map((childLayout) => {
    const child = childLayout.child;
    const childWidth = childLayout.childWidth;
    const childHeight = childLayout.fillsHeight ? fillHeight : childLayout.baseHeight;
    const childX = padding.left + getJsonExportCrossAxisOffset(align, contentWidth, childWidth);
    const nextChild = withSerializedGeometry(
      child,
      childX,
      nextY,
      childWidth,
      childHeight
    );
    nextY += childHeight + dynamicGap;
    return {
      node: nextChild
    };
  });
}
function arrangeJsonExportChildrenHorizontally(node, _layoutRules, effectiveRules, _reviewWidth, sourceParentLayoutMode) {
  var _a;
  const padding = (_a = node.layout.padding) != null ? _a : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  const contentWidth = Math.max(0, node.geometry.width - padding.left - padding.right);
  const contentHeight = Math.max(0, node.geometry.height - padding.top - padding.bottom);
  const childLayouts = node.children.map((child) => ({
    child,
    fillsWidth: shouldFillJsonExportAxis(child, "horizontal", false, "HORIZONTAL", sourceParentLayoutMode),
    childHeight: shouldFillJsonExportAxis(
      child,
      "vertical",
      effectiveRules.stackAlignment === "stretch" || child.layout.layoutAlign === "STRETCH",
      "HORIZONTAL",
      sourceParentLayoutMode
    ) ? contentHeight : child.geometry.height
  }));
  const justify = getJsonExportMainAxisAlign(node);
  const align = getJsonExportCrossAxisAlign(node, effectiveRules);
  const baseGap = effectiveRules.stackGap;
  const baseGapTotal = baseGap * Math.max(0, childLayouts.length - 1);
  const fillWidthCount = childLayouts.filter((child) => child.fillsWidth).length;
  const fixedWidthTotal = childLayouts.reduce((total, child) => {
    return child.fillsWidth ? total : total + child.child.geometry.width;
  }, 0);
  const fillChildWidth = fillWidthCount === 0 ? 0 : Math.max(1, (contentWidth - baseGapTotal - fixedWidthTotal) / fillWidthCount);
  const totalChildrenWidth = childLayouts.reduce((total, child) => {
    return total + (child.fillsWidth ? fillChildWidth : child.child.geometry.width);
  }, 0);
  const mainUsed = totalChildrenWidth + baseGapTotal;
  const dynamicGap = getJsonExportDynamicMainAxisGap(justify, baseGap, contentWidth, totalChildrenWidth, childLayouts.length);
  let nextX = padding.left + getJsonExportMainAxisOffset(justify, contentWidth, mainUsed);
  return childLayouts.map((childLayout) => {
    const child = childLayout.child;
    const childWidth = childLayout.fillsWidth ? fillChildWidth : child.geometry.width;
    const childHeight = childLayout.childHeight;
    const childY = padding.top + getJsonExportCrossAxisOffset(align, contentHeight, childHeight);
    const nextChild = withSerializedGeometry(
      child,
      nextX,
      childY,
      childWidth,
      childHeight
    );
    nextX += childWidth + dynamicGap;
    return {
      node: nextChild
    };
  });
}
function getConvertedJsonExportLayoutMode(node, layoutRules, reviewWidth) {
  if (layoutRules.rowToColumnMode === "always") {
    return getTargetJsonExportLayoutMode(node, layoutRules);
  }
  if (layoutRules.rowToColumnMode === "never") {
    return null;
  }
  const shouldConvert = layoutRules.conversionDirection === "row-to-column" ? reviewWidth <= layoutRules.rowToColumnBreakpoint : reviewWidth >= layoutRules.rowToColumnBreakpoint;
  return shouldConvert ? getTargetJsonExportLayoutMode(node, layoutRules) : null;
}
function getTargetJsonExportLayoutMode(node, layoutRules) {
  if (layoutRules.conversionDirection === "row-to-column") {
    return node.layout.layoutMode === "HORIZONTAL" ? "VERTICAL" : null;
  }
  return node.layout.layoutMode === "VERTICAL" ? "HORIZONTAL" : null;
}
function getNativeJsonExportLayoutMode(node) {
  if (node.layout.layoutMode === "HORIZONTAL" || node.layout.layoutMode === "VERTICAL") {
    return node.layout.layoutMode;
  }
  return null;
}
function getNativeJsonExportLayoutRules(node, fallbackRules) {
  var _a;
  return __spreadProps(__spreadValues({}, fallbackRules), {
    stackGap: (_a = node.layout.itemSpacing) != null ? _a : fallbackRules.stackGap,
    stackAlignment: getNativeJsonExportStackAlignment(node)
  });
}
function getNativeJsonExportStackAlignment(node) {
  if (node.layout.counterAxisAlignItems === "CENTER" || node.layout.counterAxisAlignItems === "BASELINE") {
    return "center";
  }
  return "start";
}
function getEffectiveJsonExportRules(node, layoutRules) {
  var _a;
  const nodeRule = (_a = node.responsive) == null ? void 0 : _a.nodeRule;
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
    conversionDirection: layoutRules.conversionDirection,
    rowToColumnMode: layoutRules.rowToColumnMode,
    rowToColumnBreakpoint: layoutRules.rowToColumnBreakpoint,
    stackGap: layoutRules.stackGap,
    stackAlignment: layoutRules.stackAlignment
  };
}
function shouldFillJsonExportAxis(node, axis, defaultFill, parentLayoutMode = null, sourceParentLayoutMode = parentLayoutMode) {
  const sizingMode = getJsonExportNodeAxisSizingForParent(node, axis, parentLayoutMode, sourceParentLayoutMode);
  return sizingMode === "FILL" || sizingMode == null && defaultFill;
}
function getJsonExportNodeAxisSizingForParent(node, axis, parentLayoutMode, sourceParentLayoutMode) {
  return getJsonExportNodeAxisSizing(
    node,
    getSourceAxisForTargetAxis(axis, parentLayoutMode, sourceParentLayoutMode),
    sourceParentLayoutMode
  );
}
function getJsonExportNodeAxisSizing(node, axis, parentLayoutMode = null) {
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
  if (parentLayoutMode != null && node.layout.layoutAlign === "STRETCH" && axisMatchesCrossAxis(parentLayoutMode, axis)) {
    return "FILL";
  }
  if (parentLayoutMode != null && typeof node.layout.layoutGrow === "number" && node.layout.layoutGrow > 0 && axisMatchesPrimaryParentAxis(parentLayoutMode, axis)) {
    return "FILL";
  }
  return null;
}
function getJsonExportFontSize(fontSize, scale, layoutRules) {
  const scaledSize = fontSize * scale;
  if (layoutRules.textScaleMode === "preserve") {
    return Math.max(8, scaledSize);
  }
  if (layoutRules.textScaleMode === "scale") {
    return Math.max(layoutRules.minimumTextSize, scaledSize);
  }
  return Math.max(layoutRules.minimumTextSize, Math.min(fontSize, scaledSize));
}
function scaleJsonExportLineHeight(lineHeight, scale) {
  const lineHeightObject = asJsonObject(lineHeight);
  if (lineHeightObject != null && lineHeightObject.unit === "PIXELS" && typeof lineHeightObject.value === "number") {
    return __spreadProps(__spreadValues({}, lineHeightObject), {
      value: lineHeightObject.value * scale
    });
  }
  return lineHeight;
}
function getJsonExportMainAxisAlign(node) {
  return typeof node.layout.primaryAxisAlignItems === "string" ? node.layout.primaryAxisAlignItems : "MIN";
}
function getJsonExportCrossAxisAlign(node, layoutRules) {
  if (typeof node.layout.counterAxisAlignItems === "string") {
    return node.layout.counterAxisAlignItems;
  }
  if (layoutRules.stackAlignment === "center") {
    return "CENTER";
  }
  return "MIN";
}
function getJsonExportDynamicMainAxisGap(justify, baseGap, mainSize, totalChildrenMainSize, childCount) {
  return justify === "SPACE_BETWEEN" && childCount > 1 ? Math.max(baseGap, (mainSize - totalChildrenMainSize) / (childCount - 1)) : baseGap;
}
function getJsonExportMainAxisOffset(justify, mainSize, mainUsed) {
  const remaining = Math.max(0, mainSize - mainUsed);
  if (justify === "CENTER") {
    return remaining / 2;
  }
  if (justify === "MAX") {
    return remaining;
  }
  return 0;
}
function getJsonExportCrossAxisOffset(align, crossSize, childCrossSize) {
  const remaining = Math.max(0, crossSize - childCrossSize);
  if (align === "CENTER" || align === "BASELINE") {
    return remaining / 2;
  }
  if (align === "MAX") {
    return remaining;
  }
  return 0;
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
function createSerializedGeometry(x, y, width, height) {
  const safeX = roundLayoutNumber(x);
  const safeY = roundLayoutNumber(y);
  const safeWidth = Math.max(1, roundLayoutNumber(width));
  const safeHeight = Math.max(1, roundLayoutNumber(height));
  const bounds = createBounds(safeX, safeY, safeWidth, safeHeight);
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
  };
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
  await applySerializedNodeProperties(sceneNode, node, isRoot);
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
async function applySerializedNodeProperties(sceneNode, node, isRoot = false) {
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
    const fills = await toFigmaPaintArray(node.style.fills);
    if (fills != null) {
      sceneNode.fills = fills;
    } else if (!isRoot) {
      sceneNode.fills = [];
    }
  }
  if ("strokes" in sceneNode) {
    const strokes = await toFigmaPaintArray(node.style.strokes);
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
async function toFigmaPaintArray(value) {
  if (!Array.isArray(value)) {
    return null;
  }
  const paints = await Promise.all(value.map((paint) => toFigmaPaint(paint)));
  return paints.filter((paint) => paint != null);
}
async function toFigmaPaint(value) {
  const paint = asJsonObject(value);
  if (paint == null) {
    return null;
  }
  const sanitizedPaint = stripSerializedImageMetadata(paint);
  if (paint.type === "IMAGE" && typeof paint[serializedImageBytesKey] === "string") {
    try {
      const bytes = base64ToBytes(paint[serializedImageBytesKey]);
      const image = figma.createImage(bytes);
      return __spreadProps(__spreadValues({}, sanitizedPaint), {
        imageHash: image.hash
      });
    } catch (_error) {
      return sanitizedPaint;
    }
  }
  return sanitizedPaint;
}
function stripSerializedImageMetadata(paint) {
  const _a = paint, {
    [serializedImageBytesKey]: _bytes,
    [serializedImageMimeKey]: _mime
  } = _a, rest = __objRest(_a, [
    __restKey(serializedImageBytesKey),
    __restKey(serializedImageMimeKey)
  ]);
  return rest;
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
function isReplacementActive(rule, screenWidth) {
  if (rule == null || rule.enabled !== true || rule.preset !== "hamburger") {
    return false;
  }
  if (rule.trigger === "always") {
    return true;
  }
  if (rule.trigger === "never") {
    return false;
  }
  return screenWidth <= rule.breakpoint;
}
function clampReplacementDimension(value) {
  return Math.min(1e4, Math.max(16, Math.round(value)));
}
function getSerializedReplacementDimensions(node, rule) {
  var _a, _b;
  const sizeSource = (_a = rule == null ? void 0 : rule.sizeSource) != null ? _a : "custom";
  const size = sizeSource === "width" ? node.geometry.width : sizeSource === "height" ? node.geometry.height : (_b = rule == null ? void 0 : rule.width) != null ? _b : node.geometry.height;
  const squareSize = clampReplacementDimension(size);
  return {
    width: squareSize,
    height: squareSize
  };
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
function getSourceAxisForTargetAxis(axis, parentLayoutMode, sourceParentLayoutMode) {
  if (parentLayoutMode == null || sourceParentLayoutMode == null || parentLayoutMode === sourceParentLayoutMode) {
    return axis;
  }
  return axisMatchesPrimaryParentAxis(parentLayoutMode, axis) ? getParentAxis(sourceParentLayoutMode, "primary") : getParentAxis(sourceParentLayoutMode, "cross");
}
function getParentAxis(parentLayoutMode, role) {
  if (role === "primary") {
    return parentLayoutMode === "HORIZONTAL" ? "horizontal" : "vertical";
  }
  return parentLayoutMode === "HORIZONTAL" ? "vertical" : "horizontal";
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
async function serializeFrame(node) {
  const rootBounds = getAbsoluteBounds(node);
  const serializedRoot = await serializeNode({
    node,
    isRoot: true,
    rootBounds,
    parentBounds: null,
    parentId: null,
    depth: 0,
    siblingIndex: 0,
    siblingCount: 1
  });
  return __spreadProps(__spreadValues({}, serializedRoot), {
    type: node.type,
    schemaVersion: 1,
    importedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
}
async function serializeNode({
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
  const children = hasChildren(node) ? await Promise.all(node.children.map((child, index) => serializeNode({
    node: child,
    rootBounds,
    parentBounds: absoluteBounds,
    parentId: node.id,
    depth: depth + 1,
    siblingIndex: index,
    siblingCount: node.children.length
  }))) : [];
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
    style: await serializeStyle(node),
    text: node.type === "TEXT" ? serializeText(node) : void 0,
    children
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
async function serializeStyle(node) {
  const style = {};
  if ("opacity" in node) {
    style.opacity = node.opacity;
  }
  if ("blendMode" in node) {
    style.blendMode = node.blendMode;
  }
  if ("fills" in node && node.fills !== figma.mixed) {
    style.fills = await serializePaintArray(node.fills);
  }
  if ("strokes" in node) {
    style.strokes = await serializePaintArray(node.strokes);
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
async function serializePaintArray(paints) {
  const serializedPaints = await Promise.all(paints.map((paint) => serializePaint(paint)));
  return serializedPaints;
}
async function serializePaint(paint) {
  const serializedPaint = toJsonValue(paint);
  if (paint.type !== "IMAGE" || typeof paint.imageHash !== "string") {
    return serializedPaint;
  }
  const record = asJsonObject(serializedPaint);
  if (record == null) {
    return serializedPaint;
  }
  try {
    const image = figma.getImageByHash(paint.imageHash);
    if (image == null) {
      return serializedPaint;
    }
    const bytes = await image.getBytesAsync();
    return __spreadProps(__spreadValues({}, record), {
      [serializedImageBytesKey]: bytesToBase64(bytes),
      [serializedImageMimeKey]: getImageMimeType(bytes)
    });
  } catch (_error) {
    return serializedPaint;
  }
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
function hasSerializedImageFill(node) {
  return Array.isArray(node.style.fills) && node.style.fills.some((paint) => {
    const record = asJsonObject(paint);
    return (record == null ? void 0 : record.type) === "IMAGE";
  });
}
function fitSerializedImageFills(value) {
  if (!Array.isArray(value)) {
    return value;
  }
  return value.map((paint) => {
    const record = asJsonObject(paint);
    if ((record == null ? void 0 : record.type) !== "IMAGE") {
      return paint;
    }
    const _a = record, {
      imageTransform: _imageTransform,
      cropTransform: _cropTransform
    } = _a, rest = __objRest(_a, [
      "imageTransform",
      "cropTransform"
    ]);
    return __spreadProps(__spreadValues({}, rest), {
      scaleMode: "FIT"
    });
  });
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
function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 32768;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}
function base64ToBytes(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
function getImageMimeType(bytes) {
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) {
    return "image/jpeg";
  }
  if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) {
    return "image/png";
  }
  if (bytes[0] === 71 && bytes[1] === 73 && bytes[2] === 70) {
    return "image/gif";
  }
  return "image/png";
}
function sendToUi(message) {
  figma.ui.postMessage(message);
}
var serializedImageBytesKey, serializedImageMimeKey;
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
    serializedImageBytesKey = "__responsiveImageBytes";
    serializedImageMimeKey = "__responsiveImageMime";
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
