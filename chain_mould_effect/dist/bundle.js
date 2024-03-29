/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/javascript/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../lib/drawers/drawFPS.js":
/*!*********************************!*\
  !*** ../lib/drawers/drawFPS.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction FPSPloter(context) {\n  this.context = context;\n  this.time = new Date().getTime();\n  this.i = 0;\n  this.fps = 0;\n}\n\nFPSPloter.prototype.draw = function () {\n  this.i++;\n  var newTime = new Date().getTime();\n  var deltaT = newTime - this.time;\n  this.time = newTime;\n  this.context.font = '14px Verdana';\n  this.context.fillStyle = 'red';\n  if (!(this.i % 30)) this.fps = Math.round(10000 / deltaT) / 10 + ' fps';\n  this.context.fillText(this.fps, 10, 24);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (FPSPloter);\n\n//# sourceURL=webpack:///../lib/drawers/drawFPS.js?");

/***/ }),

/***/ "../lib/drawers/drawGrid.js":
/*!**********************************!*\
  !*** ../lib/drawers/drawGrid.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction GridPloter(ctx, width, height) {\n  this.context = ctx;\n  this.width = width;\n  this.height = height;\n}\n\nGridPloter.prototype.draw = function (sizex, sizey, view) {\n  const {\n    context,\n    width: canvasWidth,\n    height: canvasHeight\n  } = this;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  var gridScale = scale;\n\n  while (gridScale > 2) gridScale /= 2;\n\n  while (gridScale < 1) gridScale *= 2;\n\n  const stepX = sizex * gridScale;\n  const stepY = sizey * gridScale;\n  var startx = (-centerX * scale + canvasWidthHalf) % stepX;\n  var starty = (-centerY * scale + canvasHeightHalf) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(255, 255, 255, 0.5)';\n  context.stroke();\n  var startx = (startx + stepX / 2) % stepX;\n  var starty = (starty + stepY / 2) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(128, 128, 128, ' + (gridScale - 1.0) + ')';\n  context.stroke();\n  context.font = '10px Arial';\n  context.fillText(Math.round(view.x * 100) / 100 + Number.EPSILON + ',' + Math.round(view.y * 100 + Number.EPSILON) / 100 + ',' + Math.round(view.scale * 100 + Number.EPSILON) / 100, 10, 50);\n};\n\nGridPloter.prototype.line = function (startx, starty, sizex, sizey, color) {\n  this.context.lineWidth = 1;\n  this.context.moveTo(startx, starty);\n  this.context.lineTo(startx + sizex, starty + sizey);\n  this.context.strokeStyle = color;\n  this.context.stroke();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GridPloter);\n\n//# sourceURL=webpack:///../lib/drawers/drawGrid.js?");

/***/ }),

/***/ "../lib/drawers/ploter.js":
/*!********************************!*\
  !*** ../lib/drawers/ploter.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction Ploter(canvas, width, height) {\n  this.canvas = canvas;\n  this.canvas.width = width || 320;\n  this.canvas.height = height || 240;\n  this.context = this.canvas.getContext('2d');\n  this.img = this.context.createImageData(this.canvas.width, this.canvas.height);\n}\n\nPloter.prototype.clear = function () {\n  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n};\n\nPloter.prototype.getCanvas = function () {\n  return this.canvas;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ploter);\n\n//# sourceURL=webpack:///../lib/drawers/ploter.js?");

/***/ }),

/***/ "../lib/drawers/render.js":
/*!********************************!*\
  !*** ../lib/drawers/render.js ***!
  \********************************/
/*! exports provided: RenderEngine, Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RenderEngine\", function() { return RenderEngine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return Renderer; });\n/* harmony import */ var _physics_transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/transform.js */ \"../lib/physics/transform.js\");\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shapes/circle.js */ \"../lib/shapes/circle.js\");\n\n\n\nfunction Renderer(color) {\n  this.color = color;\n}\n\nfunction RenderEngine(context, width, height, manager) {\n  this.context = context;\n  this.width = width;\n  this.height = height;\n  this.manager = manager;\n}\n\nRenderEngine.prototype.draw = function (view) {\n  const {\n    context,\n    width: canvasWidth,\n    height: canvasHeight\n  } = this;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  const points = this.manager.getEnities(Renderer).map(elem => {\n    var renderers = this.manager.get(Renderer, elem)[0];\n    var transform = this.manager.get(_physics_transform_js__WEBPACK_IMPORTED_MODULE_0__[\"Transform\"], elem)[0];\n    var circle = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__[\"ShapeCircle\"], elem)[0];\n    return [transform.positions[0], transform.positions[1], circle.radius, renderers.color];\n  });\n  points.forEach(element => {\n    var x = (element[0] - centerX) * scale + canvasWidthHalf;\n    var y = (element[1] - centerY) * scale + canvasHeightHalf;\n    if (x < 0 || y < 0 || x > canvasWidth || y > canvasHeight) return;\n    const elementSize = element[2] * scale > 1 ? element[2] * scale : 1;\n    context.beginPath();\n    context.arc(x, y, elementSize, 0, 2 * Math.PI, false);\n    context.fillStyle = element[3];\n    context.fill();\n    context.lineWidth = 1;\n    context.strokeStyle = '#333333';\n    context.stroke();\n  });\n};\n\n\n\n//# sourceURL=webpack:///../lib/drawers/render.js?");

/***/ }),

/***/ "../lib/ecs.js":
/*!*********************!*\
  !*** ../lib/ecs.js ***!
  \*********************/
/*! exports provided: Entity, EntityManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EntityManager\", function() { return EntityManager; });\nconst ENTITY_INDEX_BITS = 22;\nconst ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1;\nconst ENTITY_GENERATION_BITS = 8;\nconst ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1;\nconst MINIMUM_FREE_INDICES = 0;\n\nfunction Entity(id) {\n  this.id = id;\n}\n\nEntity.prototype.index = function () {\n  return this.id & ENTITY_INDEX_MASK;\n};\n\nEntity.prototype.generation = function () {\n  return this.id >> ENTITY_INDEX_BITS & ENTITY_GENERATION_MASK;\n};\n\nfunction EntityManager() {\n  this._generation = {};\n  this._free_indices = [];\n  this._entities = {};\n  this._components = {};\n  this.__entities_with_type = {};\n}\n\nEntityManager.prototype.create = function () {\n  var idx = 0;\n\n  if (this._free_indices.length > MINIMUM_FREE_INDICES) {\n    idx = this._free_indices.shift();\n  } else {\n    idx = Object.keys(this._generation).length;\n    this._generation[idx] = 0;\n  }\n\n  var entity = this.make_entity(idx, this._generation[idx]);\n  this._entities[idx] = entity;\n  return entity;\n};\n\nEntityManager.prototype.make_entity = function (idx, generation) {\n  return new Entity(idx + (generation << ENTITY_INDEX_BITS));\n};\n\nEntityManager.prototype.alive = function (e) {\n  return this._generation[e.index()] == e.generation();\n};\n\nEntityManager.prototype.destroy = function (e) {\n  delete this._entities[e.id];\n  ++this._generation[e.index()];\n\n  this._free_indices.push(e.index());\n};\n\nEntityManager.prototype.asign = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    this._components[e.id] = {\n      [component.constructor.name]: [component]\n    };\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    this._components[e.id][component.constructor.name] = [component];\n    return;\n  }\n\n  if (components_of_type && entity_components[component.constructor.name].find(comp => component === comp)) throw Error('Component is allready asiged');\n  entity_components[component.constructor.name].push(component);\n};\n\nEntityManager.prototype.get = function (c_type, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return [];\n  }\n\n  var components_of_type = entity_components[c_type.name];\n\n  if (!components_of_type) {\n    return [];\n  }\n\n  return components_of_type;\n};\n\nEntityManager.prototype.remove = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    return;\n  }\n\n  entity_components[component.constructor.name] = entity_components[component.constructor.name].filter(function (compon) {\n    return compon !== component;\n  });\n};\n\nEntityManager.prototype.getEnities = function (c_type) {\n  return Object.values(this._entities).filter(entity => {\n    return this.get(c_type, entity).length;\n  });\n};\n\n\n\n//# sourceURL=webpack:///../lib/ecs.js?");

/***/ }),

/***/ "../lib/physics/chainEngine.js":
/*!*************************************!*\
  !*** ../lib/physics/chainEngine.js ***!
  \*************************************/
/*! exports provided: ChainLink, ChainEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ChainLink\", function() { return ChainLink; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ChainEngine\", function() { return ChainEngine; });\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ \"../lib/physics/physics.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ \"../lib/physics/transform.js\");\n\n\n\nfunction ChainLink(connects, distance) {\n  this.connects = connects;\n  this.distance = distance;\n}\n\nfunction computeChainForce(naibor, transform) {\n  var ret = [0, 0];\n  naibor.forEach(({\n    transform: naiborTranform,\n    distance: naiborDistance\n  }) => {\n    var distanceX = naiborTranform.positions[0] - transform.positions[0];\n    var distanceY = naiborTranform.positions[1] - transform.positions[1];\n    var distanceAngle = Math.atan2(distanceY, distanceX);\n    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);\n    var distanceNormalised = distance / naiborDistance;\n    var forceIntencity = Math.atan((distanceNormalised - 1) * 5) + Math.pow(distanceNormalised - 1, 3);\n    var forceComponents = {\n      x: Math.cos(distanceAngle) * forceIntencity,\n      y: Math.sin(distanceAngle) * forceIntencity\n    };\n    ret[0] += forceComponents.x;\n    ret[1] += forceComponents.y;\n  });\n  return ret;\n}\n\nfunction ChainEngine(manager) {\n  this.manager = manager;\n}\n\nChainEngine.prototype.compute = function () {\n  this.manager.getEnities(ChainLink).map(elem => {\n    var chainLinks = this.manager.get(ChainLink, elem);\n    var naibor = chainLinks.map(link => ({\n      transform: this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__[\"Transform\"], link.connects)[0],\n      distance: link.distance\n    }));\n    var transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__[\"Transform\"], elem)[0];\n    var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__[\"Physics\"], elem)[0];\n    var force = computeChainForce(naibor, transform);\n    physics.applyForce(force);\n  });\n};\n\n\n\n//# sourceURL=webpack:///../lib/physics/chainEngine.js?");

/***/ }),

/***/ "../lib/physics/colisionEngine.js":
/*!****************************************!*\
  !*** ../lib/physics/colisionEngine.js ***!
  \****************************************/
/*! exports provided: ColisionEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColisionEngine\", function() { return ColisionEngine; });\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./physics.js */ \"../lib/physics/physics.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transform.js */ \"../lib/physics/transform.js\");\n\n\n\n\nfunction ColisionEngine(manager) {\n  this.manager = manager;\n  this.physic_entity = null;\n}\n\nfunction computeColision(compute, naibors) {\n  var ret = [0, 0];\n  naibors.forEach(element => {\n    if (element == compute) return;\n    var distanceX = element.positions[0] - compute.positions[0];\n    var distanceY = element.positions[1] - compute.positions[1];\n    var centerDistance = compute.radius + element.radius;\n    if (Math.abs(distanceX) > centerDistance || Math.abs(distanceY) > centerDistance) return;\n    var distanceAngle = Math.atan2(distanceY, distanceX);\n    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);\n    if (distance > centerDistance) return;\n    var distanceNormalised = distance / centerDistance;\n    var forceIntencity = Math.pow(distanceNormalised - 1, 3);\n    var forceComponents = {\n      x: Math.cos(distanceAngle) * forceIntencity,\n      y: Math.sin(distanceAngle) * forceIntencity\n    };\n    ret[0] += forceComponents.x;\n    ret[1] += forceComponents.y;\n  });\n  return ret;\n}\n\nColisionEngine.prototype.compute = function () {\n  var physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_1__[\"Physics\"]).map(elem => {\n    var circle = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__[\"ShapeCircle\"], elem)[0];\n    var transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_2__[\"Transform\"], elem)[0];\n    return {\n      e: elem,\n      radius: circle.radius,\n      positions: transform.positions\n    };\n  });\n\n  for (var i = 0; i < physic_entity.length; i++) {\n    var elem = physic_entity[i];\n    var force = computeColision(elem, physic_entity);\n    var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_1__[\"Physics\"], elem.e)[0];\n    physics.applyForce(force);\n  }\n};\n\n\n\n//# sourceURL=webpack:///../lib/physics/colisionEngine.js?");

/***/ }),

/***/ "../lib/physics/physics.js":
/*!*********************************!*\
  !*** ../lib/physics/physics.js ***!
  \*********************************/
/*! exports provided: PhysicsEngine, Physics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PhysicsEngine\", function() { return PhysicsEngine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Physics\", function() { return Physics; });\n/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transform */ \"../lib/physics/transform.js\");\n\n\nfunction Physics(speeds, mass) {\n  this.speeds = speeds;\n  this.mass = mass;\n  this.drag = 0.001;\n  this.maxSpeed = 100;\n}\n\nPhysics.prototype.applyForce = function (force) {\n  for (var i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] += force[i] / this.mass;\n  }\n};\n\nPhysics.prototype.compute = function () {\n  var speedValue = 0;\n  var i;\n\n  for (i = 0; i < this.speeds.length; i++) {\n    speedValue += this.speeds[i] * this.speeds[i];\n  }\n\n  var speedMultipliyer = Math.min(1 - this.drag, this.maxSpeed / speedValue);\n\n  for (i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] *= speedMultipliyer;\n  }\n};\n\nfunction PhysicsEngine(manager, engines) {\n  this.manager = manager;\n  this.engines = engines;\n}\n\nPhysicsEngine.prototype.compute = function () {\n  this.engines.forEach(engine => engine.compute());\n  this.manager.getEnities(Physics).forEach(elem => {\n    var physics = this.manager.get(Physics, elem)[0];\n    physics.compute();\n    var transform = this.manager.get(_transform__WEBPACK_IMPORTED_MODULE_0__[\"Transform\"], elem)[0];\n    transform.addSpeeds(physics.speeds);\n  });\n};\n\n\n\n//# sourceURL=webpack:///../lib/physics/physics.js?");

/***/ }),

/***/ "../lib/physics/transform.js":
/*!***********************************!*\
  !*** ../lib/physics/transform.js ***!
  \***********************************/
/*! exports provided: Transform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Transform\", function() { return Transform; });\nfunction Transform(positions) {\n  this.positions = positions;\n}\n\nTransform.prototype.addSpeeds = function (speeds) {\n  for (var k = 0; k < this.positions.length; k++) {\n    this.positions[k] += speeds[k];\n  }\n};\n\n\n\n//# sourceURL=webpack:///../lib/physics/transform.js?");

/***/ }),

/***/ "../lib/shapes/circle.js":
/*!*******************************!*\
  !*** ../lib/shapes/circle.js ***!
  \*******************************/
/*! exports provided: ShapeCircle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShapeCircle\", function() { return ShapeCircle; });\nfunction ShapeCircle(radius) {\n  this.radius = radius;\n}\n\n\n\n//# sourceURL=webpack:///../lib/shapes/circle.js?");

/***/ }),

/***/ "../lib/touch.js":
/*!***********************!*\
  !*** ../lib/touch.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// written by Slobodan Zivkovic slobacartoonac@gmail.com\nfunction Touch(div, deadzone) {\n  const link = this;\n  this.deadzone = deadzone;\n  this.clear();\n\n  function distance2d(a, b) {\n    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));\n  }\n\n  this.distance = distance2d;\n  let startMove = null;\n  let thisMove = null;\n  let mouseDown = false;\n  let click = true;\n\n  function moveTouchT(e) {\n    e.preventDefault();\n    const {\n      top,\n      left\n    } = e.target.getBoundingClientRect();\n    moveTouch({\n      x: e.touches[0].clientX - left,\n      y: e.touches[0].clientY - top\n    });\n  }\n\n  function moveTouchM(e) {\n    e.preventDefault();\n    const {\n      top,\n      left\n    } = e.target.getBoundingClientRect();\n    if (mouseDown) moveTouch({\n      x: e.clientX - left,\n      y: e.clientY - top\n    });\n  }\n\n  function moveTouch(e) {\n    if (startMove == null) {\n      startMove = {\n        x: e.x,\n        y: e.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      link.triger('start', thisMove);\n      click = true;\n    } else {\n      const delta = {\n        x: e.x - thisMove.x,\n        y: e.y - thisMove.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      const direction = {\n        x: thisMove.x - startMove.x,\n        y: thisMove.y - startMove.y\n      };\n      link.triger('force', {\n        delta,\n        direction,\n        startPosition: startMove,\n        position: thisMove,\n        distance: distance2d(startMove, thisMove),\n        click\n      });\n\n      if (distance2d(startMove, thisMove) > link.deadzone) {\n        click = false;\n\n        if (Math.abs(direction.x) > Math.abs(direction.y)) {\n          if (direction.x > 0) {\n            link.triger('left');\n          } else {\n            link.triger('right');\n          }\n        } else if (direction.y > 0) {\n          link.triger('down');\n        } else {\n          link.triger('up');\n        }\n      }\n    }\n  } //= {up:[],down:[],left:[],right:[],stop:[],click:[],force:[]}\n\n\n  function stopTouch(e) {\n    e.preventDefault();\n\n    if (click) {\n      if (e.button) {\n        if (e.button === 1) link.triger('bmiddle');\n        if (e.button === 2) link.triger('bright');\n      } else link.triger('click', startMove);\n    }\n\n    link.triger('stop');\n    startMove = null;\n    thisMove = null;\n    mouseDown = false;\n  }\n\n  div.addEventListener('touchstart', e => {\n    e.preventDefault();\n  }, false);\n  div.addEventListener('touchmove', moveTouchT, false);\n  div.addEventListener('touchend', stopTouch, false);\n  div.addEventListener('touchstart', moveTouchT, false);\n  div.addEventListener('mouseleave', stopTouch, false);\n  div.addEventListener('mousemove', moveTouchM);\n  div.addEventListener('mouseup', stopTouch);\n  div.addEventListener('mousedown', e => {\n    mouseDown = true;\n    moveTouchM(e);\n  });\n}\n/*eslint-disable */\n\n\nTouch.prototype.sub = function (ev, func) {\n  if (this.events[ev]) this.events[ev].push(func);\n};\n\nTouch.prototype.unsub = function (ev, func) {\n  if (this.events[ev]) this.events[ev] = this.events[ev].filter(fu => fu !== func);\n};\n\nTouch.prototype.clearEvlent = function (ev) {\n  if (this.events[ev]) this.events[ev] = [];\n};\n\nTouch.prototype.clear = function () {\n  this.events = {\n    up: [],\n    down: [],\n    left: [],\n    right: [],\n    stop: [],\n    start: [],\n    click: [],\n    force: [],\n    bmiddle: [],\n    bright: []\n  };\n};\n\nTouch.prototype.triger = function (ev, args) {\n  if (this.events[ev]) this.events[ev].forEach(func => {\n    func(args);\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Touch);\n\n//# sourceURL=webpack:///../lib/touch.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var my_lib_touch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! my_lib/touch.js */ \"../lib/touch.js\");\n/* harmony import */ var my_lib_ecs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! my_lib/ecs.js */ \"../lib/ecs.js\");\n/* harmony import */ var my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! my_lib/physics/physics.js */ \"../lib/physics/physics.js\");\n/* harmony import */ var my_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! my_lib/shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! my_lib/physics/transform.js */ \"../lib/physics/transform.js\");\n/* harmony import */ var my_lib_physics_chainEngine_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! my_lib/physics/chainEngine.js */ \"../lib/physics/chainEngine.js\");\n/* harmony import */ var my_lib_physics_colisionEngine_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! my_lib/physics/colisionEngine.js */ \"../lib/physics/colisionEngine.js\");\n/* harmony import */ var my_lib_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! my_lib/drawers/ploter.js */ \"../lib/drawers/ploter.js\");\n/* harmony import */ var my_lib_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! my_lib/drawers/drawFPS.js */ \"../lib/drawers/drawFPS.js\");\n/* harmony import */ var my_lib_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! my_lib/drawers/drawGrid.js */ \"../lib/drawers/drawGrid.js\");\n/* harmony import */ var my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! my_lib/drawers/render.js */ \"../lib/drawers/render.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\n\nvar canvas = document.getElementById('phy_canvas');\nvar draw = new my_lib_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"](canvas, 640, 480);\nvar position = {\n  x: 0,\n  y: 0,\n  scale: 1\n};\nwindow.addEventListener('mousewheel', function (e) {\n  position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88;\n});\nvar fps = new my_lib_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"](draw.context);\nvar grid = new my_lib_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"](draw.context, 640, 480);\nvar manager = new my_lib_ecs_js__WEBPACK_IMPORTED_MODULE_1__[\"EntityManager\"]();\nvar points = new my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_10__[\"RenderEngine\"](draw.context, 640, 480, manager);\nvar chainEngine = new my_lib_physics_chainEngine_js__WEBPACK_IMPORTED_MODULE_5__[\"ChainEngine\"](manager);\nvar colisionEngine = new my_lib_physics_colisionEngine_js__WEBPACK_IMPORTED_MODULE_6__[\"ColisionEngine\"](manager);\nvar physics = new my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"PhysicsEngine\"](manager, [chainEngine, colisionEngine]); //const mass = new MassPloter(draw.context, 640, 480, manager)\n\ndocument.body.appendChild(canvas);\nvar touch = new my_lib_touch_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, 100);\ntouch.sub('force', function (_ref) {\n  var delta = _ref.delta;\n  position = _objectSpread({}, position, {\n    x: position.x - delta.x / position.scale,\n    y: position.y - delta.y / position.scale\n  });\n});\nvar all = [];\nvar stabilex = 0;\nvar stabiley = 200;\nvar stabileDistance = 12;\nvar prevEntity = null;\nvar entity = null;\n\nfor (var i = 0; i < 396; i++) {\n  entity = manager.create();\n  manager.asign(new my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_4__[\"Transform\"]([stabilex, stabiley]), entity);\n  manager.asign(new my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"Physics\"]([0, 0], 5), entity);\n  manager.asign(new my_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__[\"ShapeCircle\"](5), entity);\n  manager.asign(new my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_10__[\"Renderer\"]('#aaffbb'), entity);\n\n  if (prevEntity) {\n    manager.asign(new my_lib_physics_chainEngine_js__WEBPACK_IMPORTED_MODULE_5__[\"ChainLink\"](prevEntity, stabileDistance), entity);\n    manager.asign(new my_lib_physics_chainEngine_js__WEBPACK_IMPORTED_MODULE_5__[\"ChainLink\"](entity, stabileDistance), prevEntity);\n  }\n\n  prevEntity = entity;\n  all.push(entity);\n  var prewa = Math.atan2(-0.3, 50 * Math.cos(i / 10.0));\n  stabilex += Math.cos(prewa) * stabileDistance;\n  stabiley += Math.sin(prewa) * stabileDistance;\n}\n\nentity = manager.create();\nmanager.asign(new my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_4__[\"Transform\"]([stabilex, stabiley]), entity);\nmanager.asign(new my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"Physics\"]([0, -50], 5), entity);\nmanager.asign(new my_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__[\"ShapeCircle\"](3), entity);\nmanager.asign(new my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_10__[\"Renderer\"]('#aaffbb'), entity);\n\nif (prevEntity) {\n  manager.asign(new my_lib_physics_chainEngine_js__WEBPACK_IMPORTED_MODULE_5__[\"ChainLink\"](entity, stabileDistance), prevEntity);\n}\n\nmanager.get(my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"Physics\"], entity)[0].drag = 0;\nall.push(entity);\nvar frame = 0;\n\nfunction work() {\n  frame++;\n\n  if (frame == 180) {\n    manager.get(my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"Physics\"], entity)[0].speeds = [5, 0];\n  }\n\n  if (frame == 240) {\n    manager.get(my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"Physics\"], entity)[0].speeds = [0, 20];\n  }\n\n  draw.clear(); //mass.draw(position)\n\n  grid.draw(100, 100, position);\n  points.draw(position);\n  fps.draw();\n  physics.compute();\n  setTimeout(work, 0);\n}\n\nwork();\n\n//# sourceURL=webpack:///./src/javascript/index.js?");

/***/ })

/******/ });