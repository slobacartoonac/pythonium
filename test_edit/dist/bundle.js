/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../lib/drawers/drawFPS.js":
/*!*********************************!*\
  !*** ../lib/drawers/drawFPS.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction FPSPloter(context) {\n  this.context = context;\n  this.time = new Date().getTime();\n  this.i = 0;\n  this.fps = 0;\n}\n\nFPSPloter.prototype.draw = function () {\n  this.i++;\n  var newTime = new Date().getTime();\n  var deltaT = newTime - this.time;\n  this.time = newTime;\n  this.context.font = '14px Verdana';\n  this.context.fillStyle = 'red';\n  if (!(this.i % 30)) this.fps = Math.round(10000 / deltaT) / 10 + ' fps';\n  this.context.fillText(this.fps, 10, 24);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FPSPloter);\n\n//# sourceURL=webpack://chain_mould_effect/../lib/drawers/drawFPS.js?");

/***/ }),

/***/ "../lib/drawers/drawGrid.js":
/*!**********************************!*\
  !*** ../lib/drawers/drawGrid.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction GridPloter(ctx, width, height) {\n  this.context = ctx;\n  this.width = width;\n  this.height = height;\n}\n\nGridPloter.prototype.draw = function (sizex, sizey, view) {\n  const {\n    context,\n    width: canvasWidth,\n    height: canvasHeight\n  } = this;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  var gridScale = scale;\n\n  while (gridScale > 2) gridScale /= 2;\n\n  while (gridScale < 1) gridScale *= 2;\n\n  const stepX = sizex * gridScale;\n  const stepY = sizey * gridScale;\n  var startx = (-centerX * scale + canvasWidthHalf) % stepX;\n  var starty = (-centerY * scale + canvasHeightHalf) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(128, 128, 128, 0.5)';\n  context.stroke();\n  var startx = (startx + stepX / 2) % stepX;\n  var starty = (starty + stepY / 2) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(128, 128, 128, ' + (gridScale - 1.0) + ')';\n  context.stroke();\n  context.font = '10px Arial';\n  context.fillText(Math.round(view.x * 100) / 100 + Number.EPSILON + ',' + Math.round(view.y * 100 + Number.EPSILON) / 100 + ',' + Math.round(view.scale * 100 + Number.EPSILON) / 100, 10, 50);\n};\n\nGridPloter.prototype.line = function (startx, starty, sizex, sizey, color) {\n  this.context.lineWidth = 1;\n  this.context.moveTo(startx, starty);\n  this.context.lineTo(startx + sizex, starty + sizey);\n  this.context.strokeStyle = color;\n  this.context.stroke();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridPloter);\n\n//# sourceURL=webpack://chain_mould_effect/../lib/drawers/drawGrid.js?");

/***/ }),

/***/ "../lib/drawers/ploter.js":
/*!********************************!*\
  !*** ../lib/drawers/ploter.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Ploter(canvas, width, height) {\n  this.canvas = canvas;\n  this.canvas.width = width || 320;\n  this.canvas.height = height || 240;\n  this.context = this.canvas.getContext('2d');\n  this.img = this.context.createImageData(this.canvas.width, this.canvas.height);\n}\n\nPloter.prototype.clear = function () {\n  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n};\n\nPloter.prototype.getCanvas = function () {\n  return this.canvas;\n};\n\nPloter.prototype.worldToScreen = function (view, point) {\n  const {\n    width: canvasWidth,\n    height: canvasHeight\n  } = this.canvas;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  var screenX = (point[0] - centerX) * scale + canvasWidthHalf;\n  var screenY = (point[1] - centerY) * scale + canvasHeightHalf;\n  return [screenX, screenY];\n};\n\nPloter.prototype.screenToWorld = function (view, point) {\n  const {\n    width: canvasWidth,\n    height: canvasHeight\n  } = this.canvas;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  var worldX = (point[0] - canvasWidthHalf) / scale + centerX;\n  var worldY = (point[1] - canvasHeightHalf) / scale + centerY;\n  return [worldX, worldY];\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ploter);\n\n//# sourceURL=webpack://chain_mould_effect/../lib/drawers/ploter.js?");

/***/ }),

/***/ "../lib/drawers/render.js":
/*!********************************!*\
  !*** ../lib/drawers/render.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RenderEngine\": () => (/* binding */ RenderEngine),\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _physics_transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/transform.js */ \"../lib/physics/transform.js\");\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shapes/circle.js */ \"../lib/shapes/circle.js\");\n\n\n\nfunction Renderer(color) {\n  this.color = color;\n}\n\nfunction RenderEngine(context, width, height, manager) {\n  this.context = context;\n  this.width = width;\n  this.height = height;\n  this.manager = manager;\n}\n\nRenderEngine.prototype.draw = function (view) {\n  const {\n    context,\n    width: canvasWidth,\n    height: canvasHeight\n  } = this;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  const points = this.manager.getEnities(Renderer).map(elem => {\n    var renderers = this.manager.get(Renderer, elem)[0];\n    var transform = this.manager.get(_physics_transform_js__WEBPACK_IMPORTED_MODULE_0__.Transform, elem)[0];\n    var circle = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle, elem)[0];\n    return [transform.positions[0], transform.positions[1], circle.radius, renderers.color];\n  });\n  points.forEach(element => {\n    var x = (element[0] - centerX) * scale + canvasWidthHalf;\n    var y = (element[1] - centerY) * scale + canvasHeightHalf;\n    if (x < 0 || y < 0 || x > canvasWidth || y > canvasHeight) return;\n    const elementSize = element[2] * scale > 1 ? element[2] * scale : 1;\n    context.beginPath();\n    context.arc(x, y, elementSize, 0, 2 * Math.PI, false);\n    context.fillStyle = element[3];\n    context.fill();\n    context.lineWidth = 1;\n    context.strokeStyle = '#333333';\n    context.stroke();\n  });\n};\n\n\n\n//# sourceURL=webpack://chain_mould_effect/../lib/drawers/render.js?");

/***/ }),

/***/ "../lib/ecs.js":
/*!*********************!*\
  !*** ../lib/ecs.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Entity\": () => (/* binding */ Entity),\n/* harmony export */   \"EntityManager\": () => (/* binding */ EntityManager)\n/* harmony export */ });\nconst ENTITY_INDEX_BITS = 22;\nconst ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1;\nconst ENTITY_GENERATION_BITS = 8;\nconst ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1;\nconst MINIMUM_FREE_INDICES = 0;\n\nfunction Entity(id) {\n  this.id = id;\n}\n\nEntity.prototype.index = function () {\n  return this.id & ENTITY_INDEX_MASK;\n};\n\nEntity.prototype.generation = function () {\n  return this.id >> ENTITY_INDEX_BITS & ENTITY_GENERATION_MASK;\n};\n\nfunction EntityManager() {\n  this._generation = {};\n  this._free_indices = [];\n  this._entities = {};\n  this._components = {};\n  this.__entities_with_type = {};\n}\n\nEntityManager.prototype.create = function () {\n  var idx = 0;\n\n  if (this._free_indices.length > MINIMUM_FREE_INDICES) {\n    idx = this._free_indices.shift();\n  } else {\n    idx = Object.keys(this._generation).length;\n    this._generation[idx] = 0;\n  }\n\n  var entity = this.make_entity(idx, this._generation[idx]);\n  this._entities[idx] = entity;\n  return entity;\n};\n\nEntityManager.prototype.make_entity = function (idx, generation) {\n  return new Entity(idx + (generation << ENTITY_INDEX_BITS));\n};\n\nEntityManager.prototype.alive = function (e) {\n  return this._generation[e.index()] == e.generation();\n};\n\nEntityManager.prototype.destroy = function (e) {\n  delete this._entities[e.id];\n  ++this._generation[e.index()];\n\n  this._free_indices.push(e.index());\n};\n\nEntityManager.prototype.asign = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    this._components[e.id] = {\n      [component.constructor.name]: [component]\n    };\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    this._components[e.id][component.constructor.name] = [component];\n    return;\n  }\n\n  if (components_of_type && entity_components[component.constructor.name].find(comp => component === comp)) throw Error('Component is allready asiged');\n  entity_components[component.constructor.name].push(component);\n};\n\nEntityManager.prototype.get = function (c_type, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return [];\n  }\n\n  var components_of_type = entity_components[c_type.name];\n\n  if (!components_of_type) {\n    return [];\n  }\n\n  return components_of_type;\n};\n\nEntityManager.prototype.remove = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    return;\n  }\n\n  entity_components[component.constructor.name] = entity_components[component.constructor.name].filter(function (compon) {\n    return compon !== component;\n  });\n};\n\nEntityManager.prototype.getEnities = function (c_type) {\n  return Object.values(this._entities).filter(entity => {\n    return this.get(c_type, entity).length;\n  });\n};\n\n\n\n//# sourceURL=webpack://chain_mould_effect/../lib/ecs.js?");

/***/ }),

/***/ "../lib/physics/transform.js":
/*!***********************************!*\
  !*** ../lib/physics/transform.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Transform\": () => (/* binding */ Transform)\n/* harmony export */ });\nfunction Transform(positions) {\n  this.positions = positions;\n}\n\nTransform.prototype.addSpeeds = function (speeds) {\n  for (var k = 0; k < this.positions.length; k++) {\n    this.positions[k] += speeds[k];\n  }\n};\n\n\n\n//# sourceURL=webpack://chain_mould_effect/../lib/physics/transform.js?");

/***/ }),

/***/ "../lib/shapes/circle.js":
/*!*******************************!*\
  !*** ../lib/shapes/circle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeCircle\": () => (/* binding */ ShapeCircle)\n/* harmony export */ });\nfunction ShapeCircle(radius) {\n  this.radius = radius;\n}\n\n\n\n//# sourceURL=webpack://chain_mould_effect/../lib/shapes/circle.js?");

/***/ }),

/***/ "../lib/touch.js":
/*!***********************!*\
  !*** ../lib/touch.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// written by Slobodan Zivkovic slobacartoonac@gmail.com\nfunction Touch(div, deadzone) {\n  const link = this;\n  this.deadzone = deadzone;\n  this.clear();\n\n  function distance2d(a, b) {\n    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));\n  }\n\n  this.distance = distance2d;\n  let startMove = null;\n  let thisMove = null;\n  let mouseDown = false;\n  let click = true;\n\n  function moveTouchT(e) {\n    e.preventDefault();\n    const {\n      top,\n      left\n    } = e.target.getBoundingClientRect();\n    moveTouch({\n      x: e.touches[0].clientX - left,\n      y: e.touches[0].clientY - top\n    });\n  }\n\n  function moveTouchM(e) {\n    e.preventDefault();\n    const {\n      top,\n      left\n    } = e.target.getBoundingClientRect();\n    if (mouseDown) moveTouch({\n      x: e.clientX - left,\n      y: e.clientY - top\n    });\n  }\n\n  function moveTouch(e) {\n    if (startMove == null) {\n      startMove = {\n        x: e.x,\n        y: e.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      link.triger('start', thisMove);\n      click = true;\n    } else {\n      const delta = {\n        x: e.x - thisMove.x,\n        y: e.y - thisMove.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      const direction = {\n        x: thisMove.x - startMove.x,\n        y: thisMove.y - startMove.y\n      };\n      link.triger('force', {\n        delta,\n        direction,\n        startPosition: startMove,\n        position: thisMove,\n        distance: distance2d(startMove, thisMove),\n        click\n      });\n\n      if (distance2d(startMove, thisMove) > link.deadzone) {\n        click = false;\n\n        if (Math.abs(direction.x) > Math.abs(direction.y)) {\n          if (direction.x > 0) {\n            link.triger('left');\n          } else {\n            link.triger('right');\n          }\n        } else if (direction.y > 0) {\n          link.triger('down');\n        } else {\n          link.triger('up');\n        }\n      }\n    }\n  } //= {up:[],down:[],left:[],right:[],stop:[],click:[],force:[]}\n\n\n  function stopTouch(e) {\n    e.preventDefault();\n\n    if (click) {\n      if (e.button) {\n        if (e.button === 1) link.triger('bmiddle');\n        if (e.button === 2) link.triger('bright');\n      } else if (startMove) {\n        link.triger('click', startMove);\n      }\n    }\n\n    link.triger('stop');\n    startMove = null;\n    thisMove = null;\n    mouseDown = false;\n  }\n\n  div.addEventListener('touchstart', e => {\n    e.preventDefault();\n  }, false);\n  div.addEventListener('touchmove', moveTouchT, false);\n  div.addEventListener('touchend', stopTouch, false);\n  div.addEventListener('touchstart', moveTouchT, false);\n  div.addEventListener('mouseleave', stopTouch, false);\n  div.addEventListener('mousemove', moveTouchM);\n  div.addEventListener('mouseup', stopTouch);\n  div.addEventListener('mousedown', e => {\n    mouseDown = true;\n    moveTouchM(e);\n  });\n}\n/*eslint-disable */\n\n\nTouch.prototype.sub = function (ev, func) {\n  if (this.events[ev]) this.events[ev].push(func);\n};\n\nTouch.prototype.unsub = function (ev, func) {\n  if (this.events[ev]) this.events[ev] = this.events[ev].filter(fu => fu !== func);\n};\n\nTouch.prototype.clearEvlent = function (ev) {\n  if (this.events[ev]) this.events[ev] = [];\n};\n\nTouch.prototype.clear = function () {\n  this.events = {\n    up: [],\n    down: [],\n    left: [],\n    right: [],\n    stop: [],\n    start: [],\n    click: [],\n    force: [],\n    bmiddle: [],\n    bright: []\n  };\n};\n\nTouch.prototype.triger = function (ev, args) {\n  if (this.events[ev]) this.events[ev].forEach(func => {\n    func(args);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Touch);\n\n//# sourceURL=webpack://chain_mould_effect/../lib/touch.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var my_lib_touch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! my_lib/touch.js */ \"../lib/touch.js\");\n/* harmony import */ var my_lib_ecs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! my_lib/ecs.js */ \"../lib/ecs.js\");\n/* harmony import */ var my_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! my_lib/shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! my_lib/physics/transform.js */ \"../lib/physics/transform.js\");\n/* harmony import */ var my_lib_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! my_lib/drawers/ploter.js */ \"../lib/drawers/ploter.js\");\n/* harmony import */ var my_lib_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! my_lib/drawers/drawFPS.js */ \"../lib/drawers/drawFPS.js\");\n/* harmony import */ var my_lib_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! my_lib/drawers/drawGrid.js */ \"../lib/drawers/drawGrid.js\");\n/* harmony import */ var my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! my_lib/drawers/render.js */ \"../lib/drawers/render.js\");\n/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./select.js */ \"./src/javascript/select.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\nvar canvas = document.getElementById('phy_canvas');\nvar selectionTool = document.getElementById('selection_tool');\nvar draw = new my_lib_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_4__.default(canvas, 640, 480);\nvar position = {\n  x: 0,\n  y: 0,\n  scale: 1\n};\nwindow.addEventListener('mousewheel', function (e) {\n  position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88;\n});\nvar fps = new my_lib_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_5__.default(draw.context);\nvar grid = new my_lib_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_6__.default(draw.context, 640, 480);\nvar manager = new my_lib_ecs_js__WEBPACK_IMPORTED_MODULE_1__.EntityManager();\nvar points = new my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_7__.RenderEngine(draw.context, 640, 480, manager);\ndocument.body.appendChild(canvas);\nvar selection = new _select_js__WEBPACK_IMPORTED_MODULE_8__.default();\nvar touch = new my_lib_touch_js__WEBPACK_IMPORTED_MODULE_0__.default(canvas, 5);\nvar selectStartPosition = null;\nvar selectPosition = null;\ntouch.sub('force', function (_ref) {\n  var delta = _ref.delta,\n      startPosition = _ref.startPosition,\n      mousePositon = _ref.position,\n      click = _ref.click;\n\n  if (!selectionTool.checked) {\n    position = _objectSpread({}, position, {\n      x: position.x - delta.x / position.scale,\n      y: position.y - delta.y / position.scale\n    });\n    return;\n  } // select tool selection\n\n\n  selectStartPosition = startPosition;\n  selectPosition = mousePositon;\n});\ntouch.sub('stop', function () {\n  if (selectStartPosition) {\n    var startX = selectStartPosition.x < selectPosition.x ? selectStartPosition.x : selectPosition.x;\n    var startY = selectStartPosition.y < selectPosition.y ? selectStartPosition.y : selectPosition.y;\n    var endX = selectStartPosition.x > selectPosition.x ? selectStartPosition.x : selectPosition.x;\n    var endY = selectStartPosition.y > selectPosition.y ? selectStartPosition.y : selectPosition.y;\n    var pointStart = draw.screenToWorld(position, [startX, startY]);\n    var pointEnd = draw.screenToWorld(position, [endX, endY]);\n\n    var _points = manager.getEnities(my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform).map(function (elem) {\n      var transform = manager.get(my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform, elem)[0];\n      return transform.positions;\n    });\n\n    console.log(selection.areaSelect(pointStart, pointEnd, _points));\n    selectPosition = null;\n    selectStartPosition = null;\n  }\n});\ntouch.sub('click', function (_ref2) {\n  var x = _ref2.x,\n      y = _ref2.y;\n  var point = draw.screenToWorld(position, [x, y]);\n  var points = manager.getEnities(my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform).map(function (elem) {\n    var transform = manager.get(my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform, elem)[0];\n    return transform.positions;\n  });\n  console.log(selection.pointSelect(point, points, 10));\n});\nvar all = [];\nvar entity = null;\n\nfunction createObject(x, y, radius) {\n  entity = manager.create();\n  manager.asign(new my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform([x, y]), entity);\n  manager.asign(new my_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_2__.ShapeCircle(radius), entity);\n  manager.asign(new my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_7__.Renderer('#aaffbb'), entity);\n  all.push(entity);\n}\n\nfor (var i = 0; i < 10; i++) {\n  var angle = Math.random() * 2 * Math.PI;\n  var radius = 30 + Math.random() * 200;\n  var x = Math.sin(angle) * radius;\n  var y = Math.cos(angle) * radius;\n  var radius = 5;\n  createObject(x, y, radius);\n}\n\nfunction work() {\n  draw.clear();\n  grid.draw(100, 100, position);\n  points.draw(position);\n  fps.draw();\n  setTimeout(work, 0);\n}\n\nwork();\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/index.js?");

/***/ }),

/***/ "./src/javascript/select.js":
/*!**********************************!*\
  !*** ./src/javascript/select.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n// written by Slobodan Zivkovic slobacartoonac@gmail.com\nfunction Select() {\n  this.selection = [];\n}\n\nSelect.prototype.findGeoMean = function () {\n  var prodX = 1;\n  var prodY = 1;\n  var len = this.selection.length;\n  this.selection.forEach(function (point) {\n    prodX *= point[0];\n    prodY *= point[1];\n  });\n  var geomeanX = Math.pow(prodX, 1.0 / len);\n  var geomeanY = Math.pow(prodY, 1.0 / len);\n  return [geomeanX, geomeanY];\n};\n\nSelect.prototype.orderValue = function (geomean, point, shiftAngle) {\n  shiftAngle = shiftAngle ? shiftAngle : 0;\n  var tempAngle = Math.atan2(geomean[1] - point[1], geomean[0] - point[0]) - shiftAngle; // shift range to [0, 2PI) making start point first\n\n  if (tempAngle < 0) {\n    tempAngle += Math.PI * 2;\n  }\n\n  return tempAngle;\n};\n\nSelect.prototype.sort = function () {\n  var _this = this;\n\n  var geomean = this.findGeoMean();\n  var shiftAngle = Math.atan2(geomean[1] - this.selection[0][1], geomean[0] - this.selection[0][0]); // make array of elements with order values\n\n  var tempArray = this.selection.map(function (point) {\n    return [_this.orderValue(geomean, point, shiftAngle), point];\n  });\n  tempArray.sort(function (a, b) {\n    return a[0] - b[0];\n  }); //extract ordered original array elements\n\n  this.selection = tempArray.map(function (el) {\n    return el[1];\n  });\n};\n\nSelect.prototype.proccesSelection = function (selectedPoints) {\n  if (!selectedPoints.length) {\n    this.selection = []; //selected empty space, deselect evrything\n\n    return this.selection;\n  }\n\n  this.selection = _toConsumableArray(new Set(this.selection.concat(selectedPoints))); // remove duplicates\n\n  this.sort();\n  return this.selection;\n};\n\nSelect.prototype.pointSelect = function (point, pointSpace, precision) {\n  var precisionSq = precision * precision;\n  var selectedPoints = pointSpace.filter(function (testPoint) {\n    var difX = testPoint[0] - point[0];\n    var difY = testPoint[1] - point[1];\n    var difSq = difX * difX + difY * difY; // square diffrence\n\n    return difSq < precisionSq; //squares are compared to avoid sqrt\n  });\n  return this.proccesSelection(selectedPoints);\n};\n\nSelect.prototype.areaSelect = function (pointStart, pointEnd, pointSpace) {\n  var selectedPoints = pointSpace.filter(function (testPoint) {\n    return testPoint[0] > pointStart[0] && testPoint[1] > pointStart[1] && testPoint[0] < pointEnd[0] && testPoint[1] < pointEnd[1];\n  });\n  return this.proccesSelection(selectedPoints);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Select);\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/select.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/javascript/index.js");
/******/ 	
/******/ })()
;