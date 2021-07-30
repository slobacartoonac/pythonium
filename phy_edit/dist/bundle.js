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

/***/ "./src/javascript/chainEngine.js":
/*!***************************************!*\
  !*** ./src/javascript/chainEngine.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ChainLink\": () => (/* binding */ ChainLink),\n/* harmony export */   \"ChainEngine\": () => (/* binding */ ChainEngine)\n/* harmony export */ });\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ \"./src/javascript/physics.js\");\n\n\nfunction ChainLink(connects, distance) {\n  this.connects = connects;\n  this.distance = distance;\n}\n\nfunction computeChainForce(_ref) {\n  var naibor = _ref.naibor,\n      transform = _ref.transform;\n  var ret = [0, 0];\n  naibor.forEach(function (_ref2) {\n    var naiborTranform = _ref2.transform,\n        naiborDistance = _ref2.distance;\n    var distanceX = naiborTranform.positions[0] - transform.positions[0];\n    var distanceY = naiborTranform.positions[1] - transform.positions[1];\n    var distanceAngle = Math.atan2(distanceY, distanceX);\n    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);\n    var distanceNormalised = distance / naiborDistance;\n    var forceIntencity = Math.atan((distanceNormalised - 1) * 5) + Math.pow(distanceNormalised - 1, 3);\n    var forceComponents = {\n      x: Math.cos(distanceAngle) * forceIntencity,\n      y: Math.sin(distanceAngle) * forceIntencity\n    };\n    ret[0] += forceComponents.x;\n    ret[1] += forceComponents.y;\n  });\n  return ret;\n}\n\nfunction ChainEngine(manager) {\n  this.manager = manager;\n}\n\nChainEngine.prototype.compute = function () {\n  var _this = this;\n\n  this.manager.getEnities(ChainLink).map(function (elem) {\n    var chainLinks = _this.manager.get(ChainLink, elem);\n\n    var naibor = chainLinks.map(function (link) {\n      return {\n        transform: _this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Transform, link.connects)[0],\n        distance: link.distance\n      };\n    });\n\n    var transform = _this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Transform, elem)[0];\n\n    var force = computeChainForce({\n      naibor: naibor,\n      transform: transform\n    });\n\n    var physics = _this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem)[0];\n\n    physics.applyForce(force);\n  });\n};\n\n\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/chainEngine.js?");

/***/ }),

/***/ "./src/javascript/colisionEngine.js":
/*!******************************************!*\
  !*** ./src/javascript/colisionEngine.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ColisionEngine\": () => (/* binding */ ColisionEngine)\n/* harmony export */ });\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ \"./src/javascript/physics.js\");\n\n\nfunction ColisionEngine(manager) {\n  this.manager = manager;\n  this.physic_entity = null;\n}\n\nfunction computeColision(compute, naibors) {\n  var ret = [0, 0];\n  naibors.forEach(function (element) {\n    if (element == compute) return;\n    var distanceX = element.positions[0] - compute.positions[0];\n    var distanceY = element.positions[1] - compute.positions[1];\n    var centerDistance = compute.radius + element.radius;\n    if (Math.abs(distanceX) > centerDistance || Math.abs(distanceY) > centerDistance) return;\n    var distanceAngle = Math.atan2(distanceY, distanceX);\n    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);\n    if (distance > centerDistance) return;\n    var distanceNormalised = distance / centerDistance;\n    var forceIntencity = Math.pow(distanceNormalised - 1, 3);\n    var forceComponents = {\n      x: Math.cos(distanceAngle) * forceIntencity,\n      y: Math.sin(distanceAngle) * forceIntencity\n    };\n    ret[0] += forceComponents.x;\n    ret[1] += forceComponents.y;\n  });\n  return ret;\n}\n\nColisionEngine.prototype.compute = function () {\n  var _this = this;\n\n  var physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics).map(function (elem) {\n    var circle = _this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.ShapeCircle, elem)[0];\n\n    var transform = _this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Transform, elem)[0];\n\n    return {\n      e: elem,\n      radius: circle.radius,\n      positions: transform.positions\n    };\n  });\n\n  for (var i = 0; i < physic_entity.length; i++) {\n    var elem = physic_entity[i];\n    var force = computeColision(elem, physic_entity);\n    var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem.e)[0];\n    physics.applyForce(force);\n  }\n};\n\n\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/colisionEngine.js?");

/***/ }),

/***/ "./src/javascript/drawFPS.js":
/*!***********************************!*\
  !*** ./src/javascript/drawFPS.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction FPSPloter(context) {\n  this.context = context;\n  this.time = new Date().getTime();\n  this.i = 0;\n  this.fps = 0;\n}\n\nFPSPloter.prototype.draw = function () {\n  this.i++;\n  var newTime = new Date().getTime();\n  var deltaT = newTime - this.time;\n  this.time = newTime;\n  this.context.font = '14px Verdana';\n  this.context.fillStyle = 'red';\n  if (!(this.i % 30)) this.fps = Math.round(10000 / deltaT) / 10 + ' fps';\n  this.context.fillText(this.fps, 10, 24);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FPSPloter);\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/drawFPS.js?");

/***/ }),

/***/ "./src/javascript/drawGrid.js":
/*!************************************!*\
  !*** ./src/javascript/drawGrid.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction GridPloter(ctx, width, height) {\n  this.context = ctx;\n  this.width = width;\n  this.height = height;\n}\n\nGridPloter.prototype.draw = function (sizex, sizey, view) {\n  var context = this.context,\n      canvasWidth = this.width,\n      canvasHeight = this.height;\n  var centerX = view.x,\n      centerY = view.y,\n      scale = view.scale;\n  var canvasWidthHalf = canvasWidth / 2;\n  var canvasHeightHalf = canvasHeight / 2;\n  var gridScale = scale;\n\n  while (gridScale > 2) {\n    gridScale /= 2;\n  }\n\n  while (gridScale < 1) {\n    gridScale *= 2;\n  }\n\n  var stepX = sizex * gridScale;\n  var stepY = sizey * gridScale;\n  var startx = (-centerX * scale + canvasWidthHalf) % stepX;\n  var starty = (-centerY * scale + canvasHeightHalf) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(255, 255, 255, 0.5)';\n  context.stroke();\n  var startx = (startx + stepX / 2) % stepX;\n  var starty = (starty + stepY / 2) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(128, 128, 128, ' + (gridScale - 1.0) + ')';\n  context.stroke();\n  context.font = '10px Arial';\n  context.fillText(Math.round(view.x * 100) / 100 + Number.EPSILON + ',' + Math.round(view.y * 100 + Number.EPSILON) / 100 + ',' + Math.round(view.scale * 100 + Number.EPSILON) / 100, 10, 50);\n};\n\nGridPloter.prototype.line = function (startx, starty, sizex, sizey, color) {\n  this.context.lineWidth = 1;\n  this.context.moveTo(startx, starty);\n  this.context.lineTo(startx + sizex, starty + sizey);\n  this.context.strokeStyle = color;\n  this.context.stroke();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridPloter);\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/drawGrid.js?");

/***/ }),

/***/ "./src/javascript/ecs.js":
/*!*******************************!*\
  !*** ./src/javascript/ecs.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Entity\": () => (/* binding */ Entity),\n/* harmony export */   \"EntityManager\": () => (/* binding */ EntityManager)\n/* harmony export */ });\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar ENTITY_INDEX_BITS = 22;\nvar ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1;\nvar ENTITY_GENERATION_BITS = 8;\nvar ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1;\nvar MINIMUM_FREE_INDICES = 0;\n\nfunction Entity(id) {\n  this.id = id;\n}\n\nEntity.prototype.index = function () {\n  return this.id & ENTITY_INDEX_MASK;\n};\n\nEntity.prototype.generation = function () {\n  return this.id >> ENTITY_INDEX_BITS & ENTITY_GENERATION_MASK;\n};\n\nfunction EntityManager() {\n  this._generation = {};\n  this._free_indices = [];\n  this._entities = {};\n  this._components = {};\n  this.__entities_with_type = {};\n}\n\nEntityManager.prototype.create = function () {\n  var idx = 0;\n\n  if (this._free_indices.length > MINIMUM_FREE_INDICES) {\n    idx = this._free_indices.shift();\n  } else {\n    idx = Object.keys(this._generation).length;\n    this._generation[idx] = 0;\n  }\n\n  var entity = this.make_entity(idx, this._generation[idx]);\n  this._entities[idx] = entity;\n  return entity;\n};\n\nEntityManager.prototype.make_entity = function (idx, generation) {\n  return new Entity(idx + (generation << ENTITY_INDEX_BITS));\n};\n\nEntityManager.prototype.alive = function (e) {\n  return this._generation[e.index()] == e.generation();\n};\n\nEntityManager.prototype.destroy = function (e) {\n  delete this._entities[e.id];\n  ++this._generation[e.index()];\n\n  this._free_indices.push(e.index());\n};\n\nEntityManager.prototype.asign = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    this._components[e.id] = _defineProperty({}, component.constructor.name, [component]);\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    this._components[e.id][component.constructor.name] = [component];\n    return;\n  }\n\n  if (components_of_type && entity_components[component.constructor.name].find(function (comp) {\n    return component === comp;\n  })) throw Error('Component is allready asiged');\n  entity_components[component.constructor.name].push(component);\n};\n\nEntityManager.prototype.get = function (c_type, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return [];\n  }\n\n  var components_of_type = entity_components[c_type.name];\n\n  if (!components_of_type) {\n    return [];\n  }\n\n  return components_of_type;\n};\n\nEntityManager.prototype.remove = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    return;\n  }\n\n  entity_components[component.constructor.name] = entity_components[component.constructor.name].filter(function (compon) {\n    return compon !== component;\n  });\n};\n\nEntityManager.prototype.getEnities = function (c_type) {\n  var _this = this;\n\n  return Object.values(this._entities).filter(function (entity) {\n    return _this.get(c_type, entity).length;\n  });\n};\n\n\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/ecs.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ploter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ploter.js */ \"./src/javascript/ploter.js\");\n/* harmony import */ var _touch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./touch.js */ \"./src/javascript/touch.js\");\n/* harmony import */ var _drawFPS_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawFPS.js */ \"./src/javascript/drawFPS.js\");\n/* harmony import */ var _drawGrid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawGrid.js */ \"./src/javascript/drawGrid.js\");\n/* harmony import */ var _ecs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ecs.js */ \"./src/javascript/ecs.js\");\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./physics.js */ \"./src/javascript/physics.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./render.js */ \"./src/javascript/render.js\");\n/* harmony import */ var _chainEngine_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chainEngine.js */ \"./src/javascript/chainEngine.js\");\n/* harmony import */ var _colisionEngine_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./colisionEngine.js */ \"./src/javascript/colisionEngine.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n //import MassPloter from './drawMass.js'\n\n\n\n\n\n\n\nvar canvas = document.getElementById('phy_canvas');\nvar draw = new _ploter_js__WEBPACK_IMPORTED_MODULE_0__.default(canvas, 640, 480);\nvar position = {\n  x: 0,\n  y: 0,\n  scale: 1\n};\nwindow.addEventListener('mousewheel', function (e) {\n  position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88;\n});\nvar fps = new _drawFPS_js__WEBPACK_IMPORTED_MODULE_2__.default(draw.context);\nvar grid = new _drawGrid_js__WEBPACK_IMPORTED_MODULE_3__.default(draw.context, 640, 480);\nvar manager = new _ecs_js__WEBPACK_IMPORTED_MODULE_4__.EntityManager();\nvar points = new _render_js__WEBPACK_IMPORTED_MODULE_6__.RenderEngine(draw.context, 640, 480, manager);\nvar chainEngine = new _chainEngine_js__WEBPACK_IMPORTED_MODULE_7__.ChainEngine(manager);\nvar colisionEngine = new _colisionEngine_js__WEBPACK_IMPORTED_MODULE_8__.ColisionEngine(manager);\nvar physics = new _physics_js__WEBPACK_IMPORTED_MODULE_5__.PhysicsEngine(manager, [chainEngine, colisionEngine]); //const mass = new MassPloter(draw.context, 640, 480, manager)\n\ndocument.body.appendChild(canvas);\nvar touch = new _touch_js__WEBPACK_IMPORTED_MODULE_1__.default(canvas, 100);\ntouch.sub('force', function (_ref) {\n  var delta = _ref.delta;\n  position = _objectSpread({}, position, {\n    x: position.x - delta.x / position.scale,\n    y: position.y - delta.y / position.scale\n  });\n});\nvar all = [];\nvar stabilex = 0;\nvar stabiley = 200;\nvar stabileDistance = 12;\nvar prevEntity = null;\nvar entity = null;\n\nfor (var i = 0; i < 2500; i++) {\n  entity = manager.create();\n  manager.asign(new _physics_js__WEBPACK_IMPORTED_MODULE_5__.Transform([stabilex, stabiley]), entity);\n  manager.asign(new _physics_js__WEBPACK_IMPORTED_MODULE_5__.Physics([0, 0], 5), entity);\n  manager.asign(new _physics_js__WEBPACK_IMPORTED_MODULE_5__.ShapeCircle(5), entity);\n  manager.asign(new _render_js__WEBPACK_IMPORTED_MODULE_6__.Render('#aaffbb'), entity);\n\n  if (prevEntity) {\n    manager.asign(new _chainEngine_js__WEBPACK_IMPORTED_MODULE_7__.ChainLink(prevEntity, stabileDistance), entity);\n    manager.asign(new _chainEngine_js__WEBPACK_IMPORTED_MODULE_7__.ChainLink(entity, stabileDistance), prevEntity);\n  }\n\n  prevEntity = entity;\n  all.push(entity);\n  var prewa = Math.atan2(-1, 50 * Math.cos(i / 4.0));\n  stabilex += Math.cos(prewa) * stabileDistance;\n  stabiley += Math.sin(prewa) * stabileDistance;\n}\n\nentity = manager.create();\nmanager.asign(new _physics_js__WEBPACK_IMPORTED_MODULE_5__.Transform([stabilex, stabiley]), entity);\nmanager.asign(new _physics_js__WEBPACK_IMPORTED_MODULE_5__.Physics([0, -5], 5), entity);\nmanager.asign(new _physics_js__WEBPACK_IMPORTED_MODULE_5__.ShapeCircle(3), entity);\nmanager.asign(new _render_js__WEBPACK_IMPORTED_MODULE_6__.Render('#aaffbb'), entity);\n\nif (prevEntity) {\n  manager.asign(new _chainEngine_js__WEBPACK_IMPORTED_MODULE_7__.ChainLink(entity, stabileDistance), prevEntity);\n}\n\nmanager.get(_physics_js__WEBPACK_IMPORTED_MODULE_5__.Physics, entity)[0].drag = 0;\nall.push(entity);\n\nfunction work() {\n  draw.clear(); //mass.draw(position)\n\n  grid.draw(100, 100, position);\n  points.draw(position);\n  fps.draw();\n  physics.compute();\n  setTimeout(work, 0);\n}\n\nwork();\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/index.js?");

/***/ }),

/***/ "./src/javascript/physics.js":
/*!***********************************!*\
  !*** ./src/javascript/physics.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PhysicsEngine\": () => (/* binding */ PhysicsEngine),\n/* harmony export */   \"Physics\": () => (/* binding */ Physics),\n/* harmony export */   \"ShapeCircle\": () => (/* binding */ ShapeCircle),\n/* harmony export */   \"Transform\": () => (/* binding */ Transform)\n/* harmony export */ });\nfunction Physics(speeds, mass) {\n  this.speeds = speeds;\n  this.mass = mass;\n  this.drag = 0.001;\n}\n\nPhysics.prototype.applyForce = function (force) {\n  for (var i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] += force[i];\n    this.speeds[i] *= 1 - this.drag;\n  }\n};\n\nfunction PhysicsEngine(manager, engines) {\n  this.manager = manager;\n  this.engines = engines;\n}\n\nPhysicsEngine.prototype.compute = function () {\n  var _this = this;\n\n  this.engines.forEach(function (engine) {\n    return engine.compute();\n  });\n  this.manager.getEnities(Physics).forEach(function (elem) {\n    var physics = _this.manager.get(Physics, elem)[0];\n\n    var transform = _this.manager.get(Transform, elem)[0];\n\n    for (var k = 0; k < transform.positions.length; k++) {\n      transform.positions[k] += physics.speeds[k];\n    }\n  });\n};\n\nfunction ShapeCircle(radius) {\n  this.radius = radius;\n}\n\nfunction Transform(positions) {\n  this.positions = positions;\n}\n\n\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/physics.js?");

/***/ }),

/***/ "./src/javascript/ploter.js":
/*!**********************************!*\
  !*** ./src/javascript/ploter.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Ploter(canvas, width, height) {\n  this.canvas = canvas;\n  this.canvas.width = width || 320;\n  this.canvas.height = height || 240;\n  this.context = this.canvas.getContext('2d');\n  this.img = this.context.createImageData(this.canvas.width, this.canvas.height);\n}\n\nPloter.prototype.clear = function () {\n  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n};\n\nPloter.prototype.getCanvas = function () {\n  return this.canvas;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ploter);\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/ploter.js?");

/***/ }),

/***/ "./src/javascript/render.js":
/*!**********************************!*\
  !*** ./src/javascript/render.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RenderEngine\": () => (/* binding */ RenderEngine),\n/* harmony export */   \"Render\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ \"./src/javascript/physics.js\");\n\n\nfunction Renderer(color) {\n  this.color = color;\n}\n\nfunction RenderEngine(context, width, height, manager) {\n  this.context = context;\n  this.width = width;\n  this.height = height;\n  this.manager = manager;\n}\n\nRenderEngine.prototype.draw = function (view) {\n  var _this = this;\n\n  var context = this.context,\n      canvasWidth = this.width,\n      canvasHeight = this.height;\n  var centerX = view.x,\n      centerY = view.y,\n      scale = view.scale;\n  var canvasWidthHalf = canvasWidth / 2;\n  var canvasHeightHalf = canvasHeight / 2;\n  var points = this.manager.getEnities(Renderer).map(function (elem) {\n    var renderers = _this.manager.get(Renderer, elem)[0];\n\n    var transform = _this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Transform, elem)[0];\n\n    var circle = _this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.ShapeCircle, elem)[0];\n\n    return [transform.positions[0], transform.positions[1], circle.radius, renderers.color];\n  });\n  points.forEach(function (element) {\n    var x = (element[0] - centerX) * scale + canvasWidthHalf;\n    var y = (element[1] - centerY) * scale + canvasHeightHalf;\n    if (x < 0 || y < 0 || x > canvasWidth || y > canvasHeight) return;\n    var elementSize = element[2] * scale > 1 ? element[2] * scale : 1;\n    context.beginPath();\n    context.arc(x, y, elementSize, 0, 2 * Math.PI, false);\n    context.fillStyle = element[3];\n    context.fill();\n    context.lineWidth = 1;\n    context.strokeStyle = '#333333';\n    context.stroke();\n  });\n};\n\n\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/render.js?");

/***/ }),

/***/ "./src/javascript/touch.js":
/*!*********************************!*\
  !*** ./src/javascript/touch.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// written by Slobodan Zivkovic slobacartoonac@gmail.com\nfunction Touch(div, deadzone) {\n  var link = this;\n  this.deadzone = deadzone;\n  this.clear();\n\n  function distance2d(a, b) {\n    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));\n  }\n\n  this.distance = distance2d;\n  var startMove = null;\n  var thisMove = null;\n  var mouseDown = false;\n  var click = true;\n\n  function moveTouchT(e) {\n    e.preventDefault();\n\n    var _e$target$getBounding = e.target.getBoundingClientRect(),\n        top = _e$target$getBounding.top,\n        left = _e$target$getBounding.left;\n\n    moveTouch({\n      x: e.touches[0].clientX - left,\n      y: e.touches[0].clientY - top\n    });\n  }\n\n  function moveTouchM(e) {\n    e.preventDefault();\n\n    var _e$target$getBounding2 = e.target.getBoundingClientRect(),\n        top = _e$target$getBounding2.top,\n        left = _e$target$getBounding2.left;\n\n    if (mouseDown) moveTouch({\n      x: e.clientX - left,\n      y: e.clientY - top\n    });\n  }\n\n  function moveTouch(e) {\n    if (startMove == null) {\n      startMove = {\n        x: e.x,\n        y: e.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      link.triger('start', thisMove);\n      click = true;\n    } else {\n      var delta = {\n        x: e.x - thisMove.x,\n        y: e.y - thisMove.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      var direction = {\n        x: thisMove.x - startMove.x,\n        y: thisMove.y - startMove.y\n      };\n      link.triger('force', {\n        delta: delta,\n        direction: direction,\n        startPosition: startMove,\n        position: thisMove,\n        distance: distance2d(startMove, thisMove),\n        click: click\n      });\n\n      if (distance2d(startMove, thisMove) > link.deadzone) {\n        click = false;\n\n        if (Math.abs(direction.x) > Math.abs(direction.y)) {\n          if (direction.x > 0) {\n            link.triger('left');\n          } else {\n            link.triger('right');\n          }\n        } else if (direction.y > 0) {\n          link.triger('down');\n        } else {\n          link.triger('up');\n        }\n      }\n    }\n  } //= {up:[],down:[],left:[],right:[],stop:[],click:[],force:[]}\n\n\n  function stopTouch(e) {\n    e.preventDefault();\n\n    if (click) {\n      if (e.button) {\n        if (e.button === 1) link.triger('bmiddle');\n        if (e.button === 2) link.triger('bright');\n      } else link.triger('click', startMove);\n    }\n\n    link.triger('stop');\n    startMove = null;\n    thisMove = null;\n    mouseDown = false;\n  }\n\n  div.addEventListener('touchstart', function (e) {\n    e.preventDefault();\n  }, false);\n  div.addEventListener('touchmove', moveTouchT, false);\n  div.addEventListener('touchend', stopTouch, false);\n  div.addEventListener('touchstart', moveTouchT, false);\n  div.addEventListener('mouseleave', stopTouch, false);\n  div.addEventListener('mousemove', moveTouchM);\n  div.addEventListener('mouseup', stopTouch);\n  div.addEventListener('mousedown', function (e) {\n    mouseDown = true;\n    moveTouchM(e);\n  });\n}\n/*eslint-disable */\n\n\nTouch.prototype.sub = function (ev, func) {\n  if (this.events[ev]) this.events[ev].push(func);\n};\n\nTouch.prototype.unsub = function (ev, func) {\n  if (this.events[ev]) this.events[ev] = this.events[ev].filter(function (fu) {\n    return fu !== func;\n  });\n};\n\nTouch.prototype.clearEvlent = function (ev) {\n  if (this.events[ev]) this.events[ev] = [];\n};\n\nTouch.prototype.clear = function () {\n  this.events = {\n    up: [],\n    down: [],\n    left: [],\n    right: [],\n    stop: [],\n    start: [],\n    click: [],\n    force: [],\n    bmiddle: [],\n    bright: []\n  };\n};\n\nTouch.prototype.triger = function (ev, args) {\n  if (this.events[ev]) this.events[ev].forEach(function (func) {\n    func(args);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Touch);\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/touch.js?");

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