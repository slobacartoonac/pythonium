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

/***/ "../lib/ecs/drawers/drawFPS.js":
/*!*************************************!*\
  !*** ../lib/ecs/drawers/drawFPS.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction FPSPloter(context) {\n  this.context = context;\n  this.time = new Date().getTime();\n  this.i = 0;\n  this.fps = 0;\n}\n\nFPSPloter.prototype.draw = function () {\n  this.i++;\n  var newTime = new Date().getTime();\n  var deltaT = newTime - this.time;\n  this.time = newTime;\n  this.context.font = '14px Verdana';\n  if (!(this.i % 30)) this.fps = Math.round(10000 / deltaT) / 10 + ' fps';\n  this.context.beginPath();\n  this.context.rect(10, 13, 60, 14);\n  this.context.fillStyle = 'gray';\n  this.context.fill();\n  this.context.fillStyle = 'red';\n  this.context.fillText(this.fps, 10, 24);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (FPSPloter);\n\n//# sourceURL=webpack:///../lib/ecs/drawers/drawFPS.js?");

/***/ }),

/***/ "../lib/ecs/drawers/drawGass.js":
/*!**************************************!*\
  !*** ../lib/ecs/drawers/drawGass.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _math_vec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/vec.js */ \"../lib/math/vec.js\");\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../physics/physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _physics_transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../physics/transform */ \"../lib/ecs/physics/transform.js\");\n\n\n\n\nvar COLORS = 16 * 16;\n\nfunction GassPloter(context, manager) {\n  this.context = context;\n  this.update();\n  this.manager = manager;\n}\n\nGassPloter.prototype.update = function () {\n  this.width = this.context.canvas.clientWidth;\n  this.height = this.context.canvas.clientHeight;\n  this.step = 4;\n  this.widthSteps = this.width / this.step;\n  this.heightSteps = this.height / this.step;\n  this.number = this.widthSteps * this.heightSteps;\n  this.cells = {\n    p: new Float32Array(this.number),\n    v: new Float32Array(this.number),\n    h: new Float32Array(this.number),\n    o: new Uint8Array(this.number)\n  };\n  this.cells.p.fill(1);\n  this.cells.v.fill(0);\n  this.cells.h.fill(0);\n  this.cells.o.fill(0);\n  this.img = this.context.createImageData(this.width, this.height);\n};\n\nGassPloter.prototype.draw = function (view) {\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const {\n    context\n  } = this;\n  var canvasWidth = context.canvas.clientWidth;\n  var canvasHeight = context.canvas.clientHeight;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  const stepX = this.step;\n  const stepY = this.step;\n  const halfStepX = stepX / 2;\n  const halfStepY = stepY / 2;\n  var startx = (centerX + canvasWidthHalf) % stepX;\n  var starty = (centerY + canvasHeightHalf) % stepY;\n  var inverseScale = stepY / scale;\n  this.img = context.getImageData(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);\n  const points = this.manager.getEnities(_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"Physics\"]).map(elem => {\n    var transform = this.manager.get(_physics_transform__WEBPACK_IMPORTED_MODULE_3__[\"Transform\"], elem)[0];\n    var shape = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__[\"ShapeCircle\"], elem)[0];\n    var physics = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"Physics\"], elem)[0];\n    return {\n      speeds: physics.speeds,\n      radius: shape && shape.radius,\n      positions: transform.positions\n    };\n  }).filter(({\n    radius\n  }) => !!radius); //this.cells.o.fill(0)\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    var realX = (x - canvasWidthHalf) / scale + centerX;\n    var realY = (starty - canvasHeightHalf) / scale + centerY;\n    var realXround = Math.max(Math.round(realX - halfStepX), 0);\n\n    for (var y = starty; y <= canvasHeight; y += stepY) {\n      var realYround = Math.max(Math.round(realY - halfStepY), 0);\n      var cellId = realXround + realYround * this.widthSteps;\n      var sum = 0;\n      var pointsLength = points.length;\n\n      for (var i = 0; i < pointsLength; i++) {\n        var point = points[i];\n\n        if (point.radius > Object(_math_vec_js__WEBPACK_IMPORTED_MODULE_0__[\"distance\"])(point.positions[0], point.positions[1], realX, realY)) {\n          this.cells.o[cellId] = 1;\n        }\n      }\n\n      if (this.cells[cellId]) {\n        sum += 128;\n      }\n\n      var colorMin2 = Math.min(sum, COLORS - 1);\n      var colorMin = Math.max(Math.min(sum, COLORS - 1) - colorMin2 * colorMin2 * 0.3, 0);\n      var colorMax = Math.max(colorMin, colorMin2);\n      this.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [255 - colorMin, 0, 255 - colorMin2, colorMax]);\n      realY += inverseScale;\n    }\n  }\n\n  context.putImageData(this.img, 0, 0);\n};\n\nGassPloter.prototype.imgRect = function (x, y, width, height, color) {\n  const realWidth = Math.max(Math.min(width, this.context.canvas.clientWidth - x), 0);\n  const realHeight = Math.max(Math.min(height, this.context.canvas.clientHeight - y), 0);\n  const realX = Math.max(Math.round(x), 0);\n  const realY = Math.max(Math.round(y), 0);\n  const data = this.img.data;\n  const startX = realX * 4;\n  const endX = realWidth * 4 + startX;\n  const rowLength = this.context.canvas.clientWidth * 4;\n  const startY = realY * rowLength;\n  const endY = realHeight * rowLength + startY;\n  const over = color[3] / 255;\n\n  for (var i = startY; i < endY; i += rowLength) {\n    for (var j = startX; j < endX; j += 4) {\n      var ij = i + j;\n      data[ij] = Object(_math_vec_js__WEBPACK_IMPORTED_MODULE_0__[\"interpolate\"])(data[ij], color[0], over);\n      data[ij + 1] = Object(_math_vec_js__WEBPACK_IMPORTED_MODULE_0__[\"interpolate\"])(data[ij + 1], color[1], over);\n      data[ij + 2] = Object(_math_vec_js__WEBPACK_IMPORTED_MODULE_0__[\"interpolate\"])(data[ij + 2], color[2], over);\n      data[ij + 3] = Math.max(color[3], data[ij + 3]);\n    }\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GassPloter);\n\n//# sourceURL=webpack:///../lib/ecs/drawers/drawGass.js?");

/***/ }),

/***/ "../lib/ecs/drawers/drawGrid.js":
/*!**************************************!*\
  !*** ../lib/ecs/drawers/drawGrid.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction GridPloter(ctx, showCords) {\n  this.context = ctx;\n  this.showCords;\n}\n\nGridPloter.prototype.draw = function (sizex, sizey, view) {\n  const {\n    context\n  } = this;\n  var canvasWidth = context.canvas.clientWidth;\n  var canvasHeight = context.canvas.clientHeight;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  var gridScale = scale;\n\n  while (gridScale > 2) gridScale /= 2;\n\n  while (gridScale < 1) gridScale *= 2;\n\n  const stepX = sizex * gridScale;\n  const stepY = sizey * gridScale;\n  var startx = (-centerX * scale + canvasWidthHalf) % stepX;\n  var starty = (-centerY * scale + canvasHeightHalf) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(128, 128, 128, 0.5)';\n  context.stroke();\n  var startx = (startx + stepX / 2) % stepX;\n  var starty = (starty + stepY / 2) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(128, 128, 128, ' + (gridScale - 1.0) + ')';\n  context.stroke();\n\n  if (this.showCords) {\n    context.font = '10px Arial';\n    context.fillText(Math.round(view.x * 100) / 100 + Number.EPSILON + ',' + Math.round(view.y * 100 + Number.EPSILON) / 100 + ',' + Math.round(view.scale * 100 + Number.EPSILON) / 100, 10, 50);\n  }\n};\n\nGridPloter.prototype.line = function (startx, starty, sizex, sizey, color) {\n  this.context.lineWidth = 1;\n  this.context.moveTo(startx, starty);\n  this.context.lineTo(startx + sizex, starty + sizey);\n  this.context.strokeStyle = color;\n  this.context.stroke();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GridPloter);\n\n//# sourceURL=webpack:///../lib/ecs/drawers/drawGrid.js?");

/***/ }),

/***/ "../lib/ecs/drawers/drawMass.js":
/*!**************************************!*\
  !*** ../lib/ecs/drawers/drawMass.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _physics_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../physics/transform */ \"../lib/ecs/physics/transform.js\");\n\n\n\nconst squareDistance = (point, nodeB) => {\n  var square = 0;\n\n  for (var i = 0; i < point.length; i++) square += Math.pow(point[i] - nodeB.positions[i], 2);\n\n  return isNaN(square) || square < 1 ? 1 : square;\n};\n\nvar COLORS = 16 * 16;\n\nfunction MassPloter(context, manager) {\n  this.context = context;\n  this.update();\n  this.manager = manager;\n}\n\nMassPloter.prototype.update = function () {\n  this.img = this.context.createImageData(this.context.canvas.clientWidth, this.context.canvas.clientHeight);\n};\n\nMassPloter.prototype.draw = function (view) {\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const {\n    context\n  } = this;\n  var canvasWidth = context.canvas.clientWidth;\n  var canvasHeight = context.canvas.clientHeight;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  const stepX = 4;\n  const stepY = 4;\n  const halfStepX = stepX / 2;\n  const halfStepY = stepY / 2;\n  var startx = (centerX + canvasWidthHalf) % stepX;\n  var starty = (centerY + canvasHeightHalf) % stepY;\n  var inverseScale = stepY / scale;\n  const points = this.manager.getEnities(_physics_physics_js__WEBPACK_IMPORTED_MODULE_0__[\"Physics\"]).map(elem => {\n    var physics = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_0__[\"Physics\"], elem)[0];\n    var transform = this.manager.get(_physics_transform__WEBPACK_IMPORTED_MODULE_1__[\"Transform\"], elem)[0];\n    return {\n      mass: physics.mass,\n      positions: transform.positions\n    };\n  });\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    var realX = (x - canvasWidthHalf) / scale + centerX;\n    var realY = (starty - canvasHeightHalf) / scale + centerY;\n\n    for (var y = starty; y <= canvasHeight; y += stepY) {\n      var sum = 0;\n      var pointsLength = points.length;\n\n      for (var i = 0; i < pointsLength; i++) {\n        var point = points[i];\n        sum += 3000 * point.mass / squareDistance([realX, realY], point);\n      }\n\n      var colorMin2 = Math.min(sum / 16.0, COLORS - 1);\n      var colorMin = Math.max(Math.min(sum, COLORS - 1) - colorMin2 * colorMin2 * 0.3, 0);\n      this.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [colorMin2, 0, colorMin, 255]);\n      realY += inverseScale;\n    }\n  }\n\n  context.putImageData(this.img, 0, 0);\n};\n\nMassPloter.prototype.imgRect = function (x, y, width, height, color) {\n  const realWidth = Math.max(Math.min(width, this.context.canvas.clientWidth - x), 0);\n  const realHeight = Math.max(Math.min(height, this.context.canvas.clientHeight - y), 0);\n  const realX = Math.max(Math.round(x), 0);\n  const realY = Math.max(Math.round(y), 0);\n  const data = this.img.data;\n  const startX = realX * 4;\n  const endX = realWidth * 4 + startX;\n  const rowLength = this.context.canvas.clientWidth * 4;\n  const startY = realY * rowLength;\n  const endY = realHeight * rowLength + startY;\n\n  for (var i = startY; i < endY; i += rowLength) {\n    for (var j = startX; j < endX; j += 4) {\n      var ij = i + j;\n      data[ij] = color[0];\n      data[ij + 1] = color[1];\n      data[ij + 2] = color[2];\n      data[ij + 3] = color[3];\n    }\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MassPloter);\n\n//# sourceURL=webpack:///../lib/ecs/drawers/drawMass.js?");

/***/ }),

/***/ "../lib/ecs/drawers/gravityColorEngine.js":
/*!************************************************!*\
  !*** ../lib/ecs/drawers/gravityColorEngine.js ***!
  \************************************************/
/*! exports provided: GravityColorEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GravityColorEngine\", function() { return GravityColorEngine; });\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ \"../lib/ecs/drawers/render.js\");\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../physics/physics.js */ \"../lib/ecs/physics/physics.js\");\n\n\n\n\nfunction GravityColorEngine(manager) {\n  this.manager = manager;\n}\n\nGravityColorEngine.prototype.compute = function () {\n  this.manager.getEnities(_render_js__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"]).map(elem => {\n    var renderers = this.manager.get(_render_js__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"], elem)[0];\n    var mass = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"Physics\"], elem)[0].mass;\n    var volume = Math.pow(this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__[\"ShapeCircle\"], elem)[0].radius, 3) * Math.PI;\n    var dencity = mass / volume * 10 * Math.PI;\n\n    if (dencity < 1) {\n      renderers.color = '##00fffb';\n    } else if (dencity < 2) {\n      renderers.color = '#001eff';\n    } else if (dencity < 3) {\n      renderers.color = '#995500';\n    } else if (dencity < 4) {\n      renderers.color = '#ff8c00';\n    } else {\n      renderers.color = '#fffb00';\n    }\n  });\n};\n\n\n\n//# sourceURL=webpack:///../lib/ecs/drawers/gravityColorEngine.js?");

/***/ }),

/***/ "../lib/ecs/drawers/ploter.js":
/*!************************************!*\
  !*** ../lib/ecs/drawers/ploter.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction Ploter(canvas) {\n  this.canvas = canvas;\n  this.context = this.canvas.getContext('2d', {\n    willReadFrequently: true\n  });\n  this.img = this.context.createImageData(this.canvas.width, this.canvas.height);\n}\n\nPloter.prototype.clear = function () {\n  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n};\n\nPloter.prototype.getCanvas = function () {\n  return this.canvas;\n};\n\nPloter.prototype.worldToScreen = function (view, point) {\n  const {\n    width: canvasWidth,\n    height: canvasHeight\n  } = this.canvas;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  var screenX = (point[0] - centerX) * scale + canvasWidthHalf;\n  var screenY = (point[1] - centerY) * scale + canvasHeightHalf;\n  return [screenX, screenY];\n};\n\nPloter.prototype.screenToWorld = function (view, point) {\n  const {\n    width: canvasWidth,\n    height: canvasHeight\n  } = this.canvas;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  var worldX = (point[0] - canvasWidthHalf) / scale + centerX;\n  var worldY = (point[1] - canvasHeightHalf) / scale + centerY;\n  return [worldX, worldY];\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ploter);\n\n//# sourceURL=webpack:///../lib/ecs/drawers/ploter.js?");

/***/ }),

/***/ "../lib/ecs/drawers/render.js":
/*!************************************!*\
  !*** ../lib/ecs/drawers/render.js ***!
  \************************************/
/*! exports provided: RenderEngine, Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RenderEngine\", function() { return RenderEngine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return Renderer; });\n/* harmony import */ var _physics_transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/transform.js */ \"../lib/ecs/physics/transform.js\");\n/* harmony import */ var _shapes_box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shapes/box.js */ \"../lib/shapes/box.js\");\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _shapes_text_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shapes/text.js */ \"../lib/shapes/text.js\");\n/* harmony import */ var _shapes_sprite_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shapes/sprite.js */ \"../lib/shapes/sprite.js\");\n/* harmony import */ var _shapes_rounded_box_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shapes/rounded-box.js */ \"../lib/shapes/rounded-box.js\");\n/* harmony import */ var _physics_transformRotate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../physics/transformRotate.js */ \"../lib/ecs/physics/transformRotate.js\");\n\n\n\n\n\n\n\n\nfunction Renderer(color, stroke, layer) {\n  this.color = color;\n  this.stroke = stroke;\n  this.layer = layer || 0;\n}\n\nfunction RenderEngine(context, manager) {\n  this.context = context;\n  this.manager = manager;\n  this.maxSize = 100;\n}\n\nfunction shapeDone(context, renderer) {\n  if (renderer.color) {\n    context.fillStyle = renderer.color;\n    context.fill();\n  }\n\n  if (renderer.stroke) {\n    context.strokeStyle = renderer.stroke.color;\n    context.lineWidth = renderer.stroke.width;\n    context.stroke();\n  }\n}\n\nfunction roundedRect(context, x, y, width, height, radius) {\n  context.moveTo(x, y + radius);\n  context.lineTo(x, y + height - radius);\n  context.arcTo(x, y + height, x + radius, y + height, radius);\n  context.lineTo(x + width - radius, y + height);\n  context.arcTo(x + width, y + height, x + width, y + height - radius, radius);\n  context.lineTo(x + width, y + radius);\n  context.arcTo(x + width, y, x + width - radius, y, radius);\n  context.lineTo(x + radius, y);\n  context.arcTo(x, y, x, y + radius, radius);\n}\n\nRenderEngine.prototype.draw = function (view) {\n  const {\n    context\n  } = this;\n  var canvasWidth = context.canvas.clientWidth;\n  var canvasHeight = context.canvas.clientHeight;\n  const {\n    x: centerX,\n    y: centerY,\n    scale,\n    angle\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  const maxSize = this.maxSize * scale;\n\n  if (angle) {\n    context.save();\n    context.translate(canvasWidthHalf, canvasHeightHalf);\n    context.rotate(angle);\n    context.translate(-canvasWidthHalf, -canvasHeightHalf);\n  }\n\n  this.manager.getEnities(Renderer).map(elem => {\n    var renderer = this.manager.get(Renderer, elem)[0];\n    return [elem, renderer];\n  }).sort(([, a], [, b]) => {\n    if (a.layer < b.layer) {\n      return -1;\n    }\n\n    if (a.layer > b.layer) {\n      return 1;\n    } // a must be equal to b\n\n\n    return 0;\n  }).map(([elem, renderer]) => {\n    var transform = this.manager.get(_physics_transform_js__WEBPACK_IMPORTED_MODULE_0__[\"Transform\"], elem)[0];\n    var x = (transform.positions[0] - centerX) * scale + canvasWidthHalf;\n    var y = (transform.positions[1] - centerY) * scale + canvasHeightHalf;\n    if (x < -maxSize || y < -maxSize || x > canvasWidth || y > canvasHeight) return;\n    let circles = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_2__[\"ShapeCircle\"], elem);\n\n    for (let i in circles) {\n      let circle = circles[i];\n      const elementSize = circle.radius * scale > 1 ? circle.radius * scale : 1;\n      context.beginPath();\n      context.arc(x, y, elementSize, 0, 2 * Math.PI, false);\n      shapeDone(context, renderer);\n    }\n\n    let boxes = this.manager.get(_shapes_box_js__WEBPACK_IMPORTED_MODULE_1__[\"ShapeBox\"], elem);\n    let rounded = this.manager.get(_shapes_rounded_box_js__WEBPACK_IMPORTED_MODULE_5__[\"ShapeRounded\"], elem);\n    let rotate = this.manager.get(_physics_transformRotate_js__WEBPACK_IMPORTED_MODULE_6__[\"TransformRotate\"], elem)[0];\n\n    for (let i in boxes) {\n      let box = boxes[i];\n      const size_x = box.x * scale > 1 ? box.x * scale : 1;\n      const size_y = box.y * scale > 1 ? box.y * scale : 1;\n      context.save();\n\n      if (rotate) {\n        context.translate(x + size_x / 2, y + size_y / 2);\n        context.rotate(rotate.rotate);\n        context.translate(-x - size_x / 2, -y - size_y / 2);\n      }\n\n      context.beginPath();\n\n      if (rounded[0]) {\n        roundedRect(context, x, y, size_x, size_y, rounded[0].radius);\n      } else {\n        context.rect(x, y, size_x, size_y);\n      }\n\n      shapeDone(context, renderer);\n      context.restore();\n    }\n\n    let sprites = this.manager.get(_shapes_sprite_js__WEBPACK_IMPORTED_MODULE_4__[\"Sprite\"], elem);\n\n    for (let i in sprites) {\n      let sprite = sprites[i];\n      let box = boxes[0];\n\n      if (!box) {\n        break;\n      }\n\n      const size_x = box.x * scale > 1 ? box.x * scale + 0.5 : 1;\n      const size_y = box.y * scale > 1 ? box.y * scale + 0.5 : 1;\n      context.save();\n\n      if (rotate) {\n        context.translate(x + size_x / 2, y + size_y / 2);\n        context.rotate(rotate.rotate);\n        context.translate(-x - size_x / 2, -y - size_y / 2);\n      }\n\n      context.drawImage(sprite.image, x, y, size_x, size_y);\n      context.restore();\n    }\n\n    let texts = this.manager.get(_shapes_text_js__WEBPACK_IMPORTED_MODULE_3__[\"ShapeText\"], elem);\n\n    for (let i in texts) {\n      let text = texts[i];\n      const size_y = text.font * scale > 1 ? text.font * scale : 1;\n      context.fillStyle = renderer.color;\n      context.font = parseInt(size_y) + 'px serif';\n      context.save();\n\n      if (rotate) {\n        context.translate(x, y);\n        context.rotate(rotate.rotate);\n        context.translate(-x, -y);\n      }\n\n      context.fillText(text.text, x, y + parseInt(size_y));\n      context.restore();\n    }\n  });\n\n  if (angle) {\n    context.restore();\n  }\n};\n\nRenderEngine.prototype.mesure = function (text) {\n  const {\n    context\n  } = this;\n  context.font = parseInt(text.font) + 'px serif';\n  return context.measureText(text.text);\n};\n\n\n\n//# sourceURL=webpack:///../lib/ecs/drawers/render.js?");

/***/ }),

/***/ "../lib/ecs/index.js":
/*!***************************!*\
  !*** ../lib/ecs/index.js ***!
  \***************************/
/*! exports provided: Entity, EntityManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EntityManager\", function() { return EntityManager; });\nconst ENTITY_INDEX_BITS = 22;\nconst ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1;\nconst ENTITY_GENERATION_BITS = 8;\nconst ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1;\nconst MINIMUM_FREE_INDICES = 0;\n\nfunction Entity(id) {\n  this.id = id;\n}\n\nEntity.prototype.index = function () {\n  return this.id & ENTITY_INDEX_MASK;\n};\n\nEntity.prototype.generation = function () {\n  return this.id >> ENTITY_INDEX_BITS & ENTITY_GENERATION_MASK;\n};\n\nfunction EntityManager() {\n  this._generation = {};\n  this._free_indices = [];\n  this._entities = {};\n  this._components = {};\n  this.__entities_with_type = {};\n}\n\nEntityManager.prototype.create = function () {\n  var idx = 0;\n\n  if (this._free_indices.length > MINIMUM_FREE_INDICES) {\n    idx = this._free_indices.shift();\n  } else {\n    idx = Object.keys(this._generation).length;\n    this._generation[idx] = 0;\n  }\n\n  var entity = this.make_entity(idx, this._generation[idx]);\n  this._entities[idx] = entity;\n  return entity;\n};\n\nEntityManager.prototype.make_entity = function (idx, generation) {\n  return new Entity(idx + (generation << ENTITY_INDEX_BITS));\n};\n\nEntityManager.prototype.alive = function (e) {\n  return this._generation[e.index()] == e.generation();\n};\n\nEntityManager.prototype.destroy = function (e) {\n  this._components[e.id] = undefined;\n  this._entities[e.id] = undefined;\n  ++this._generation[e.index()];\n\n  this._free_indices.push(e.index());\n};\n\nEntityManager.prototype.asign = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    this._components[e.id] = {\n      [component.constructor.name]: [component]\n    };\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    this._components[e.id][component.constructor.name] = [component];\n    return;\n  }\n\n  if (components_of_type && entity_components[component.constructor.name].find(comp => component === comp)) throw Error('Component is allready asiged');\n  entity_components[component.constructor.name].push(component);\n};\n\nEntityManager.prototype.get = function (c_type, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return [];\n  }\n\n  var components_of_type = entity_components[c_type.name];\n\n  if (!components_of_type) {\n    return [];\n  }\n\n  return components_of_type;\n};\n\nEntityManager.prototype.remove = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    return;\n  }\n\n  entity_components[component.constructor.name] = entity_components[component.constructor.name].filter(function (compon) {\n    return compon !== component;\n  });\n};\n\nEntityManager.prototype.getEnities = function (c_type) {\n  return Object.values(this._entities).filter(entity => {\n    return entity && this.get(c_type, entity).length;\n  });\n};\n\n\n\n//# sourceURL=webpack:///../lib/ecs/index.js?");

/***/ }),

/***/ "../lib/ecs/physics/gravityEngine.js":
/*!*******************************************!*\
  !*** ../lib/ecs/physics/gravityEngine.js ***!
  \*******************************************/
/*! exports provided: GravityEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GravityEngine\", function() { return GravityEngine; });\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ \"../lib/ecs/physics/transform.js\");\n\n\n\nfunction GravityEngine(manager, interaction) {\n  this.manager = manager;\n  this.interaction = interaction ? interaction : 0.1;\n}\n\nfunction computeAttraction(compute, naibors, interaction) {\n  var ret = [0, 0];\n  naibors.forEach(element => {\n    if (element == compute) return;\n    var distanceX = element.positions[0] - compute.positions[0];\n    var distanceY = element.positions[1] - compute.positions[1];\n    var distance2 = distanceX * distanceX + distanceY * distanceY;\n    var distance = Math.sqrt(distance2);\n    var ascIntencity = element.mass / distance2 * interaction;\n    ret[0] += distanceX / distance * ascIntencity;\n    ret[1] += distanceY / distance * ascIntencity;\n  });\n  return ret;\n}\n\nGravityEngine.prototype.compute = function () {\n  var physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_0__[\"Physics\"]).map(elem => {\n    var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__[\"Physics\"], elem)[0];\n    var transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__[\"Transform\"], elem)[0];\n    return {\n      e: elem,\n      mass: physics.mass,\n      physics,\n      positions: transform.positions\n    };\n  });\n\n  for (var i = 0; i < physic_entity.length; i++) {\n    var elem = physic_entity[i];\n    var asc = computeAttraction(elem, physic_entity, this.interaction);\n    elem.physics.applyAsc(asc);\n  }\n};\n\n\n\n//# sourceURL=webpack:///../lib/ecs/physics/gravityEngine.js?");

/***/ }),

/***/ "../lib/ecs/physics/physics.js":
/*!*************************************!*\
  !*** ../lib/ecs/physics/physics.js ***!
  \*************************************/
/*! exports provided: PhysicsEngine, Physics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PhysicsEngine\", function() { return PhysicsEngine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Physics\", function() { return Physics; });\n/* harmony import */ var _shapes_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/vector */ \"../lib/shapes/vector.js\");\n/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ \"../lib/ecs/physics/transform.js\");\n\n\n\nfunction Physics(speeds, mass, drag) {\n  this.speeds = new _shapes_vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"](speeds);\n  this.mass = mass;\n  this.drag = isNaN(drag) ? 0.001 : drag;\n  this.maxSpeed = 100;\n}\n\nPhysics.prototype.applyForce = function (force) {\n  for (var i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] += force[i] / this.mass;\n  }\n};\n\nPhysics.prototype.applyAsc = function (asc) {\n  for (var i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] += asc[i];\n  }\n};\n\nPhysics.prototype.compute = function () {\n  var speedValue = 0;\n  var i;\n\n  for (i = 0; i < this.speeds.length; i++) {\n    speedValue += this.speeds[i] * this.speeds[i];\n  }\n\n  var speedMultipliyer = Math.min(1 - this.drag, this.maxSpeed / speedValue);\n\n  for (i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] *= speedMultipliyer;\n  }\n};\n\nfunction PhysicsEngine(manager, engines) {\n  this.manager = manager;\n  this.engines = engines;\n}\n\nPhysicsEngine.prototype.compute = function () {\n  this.engines.forEach(engine => engine.compute());\n  this.manager.getEnities(Physics).forEach(elem => {\n    var physics = this.manager.get(Physics, elem)[0];\n    physics.compute();\n    var transform = this.manager.get(_transform__WEBPACK_IMPORTED_MODULE_1__[\"Transform\"], elem)[0];\n    transform.positions = transform.positions.add(physics.speeds);\n  });\n};\n\n\n\n//# sourceURL=webpack:///../lib/ecs/physics/physics.js?");

/***/ }),

/***/ "../lib/ecs/physics/plasticColisionEngine.js":
/*!***************************************************!*\
  !*** ../lib/ecs/physics/plasticColisionEngine.js ***!
  \***************************************************/
/*! exports provided: PlasticColisionEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PlasticColisionEngine\", function() { return PlasticColisionEngine; });\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transform.js */ \"../lib/ecs/physics/transform.js\");\n\n\n\n\nfunction PlasticColisionEngine(manager) {\n  this.manager = manager;\n  this.physic_entity = null;\n}\n\nfunction squareDistance(nodeA, nodeB) {\n  var square = 0;\n\n  for (var i = 0; i < nodeA.positions.length; i++) square += Math.pow(nodeA.positions[i] - nodeB.positions[i], 2);\n\n  return square;\n}\n\nfunction computeColision(compute, naibors) {\n  var collisions = [];\n  naibors.forEach(element => {\n    if (element == compute) return;\n    var distanceX = element.positions[0] - compute.positions[0];\n    var distanceY = element.positions[1] - compute.positions[1];\n    var centerDistance = compute.radius + element.radius;\n    if (Math.abs(distanceX) > centerDistance || Math.abs(distanceY) > centerDistance) return;\n    var distance2 = squareDistance(compute, element);\n    if (distance2 > Math.pow(centerDistance, 2)) return;\n    if (compute.radius > element.radius) collisions.push(element);\n  });\n  return collisions;\n}\n\nPlasticColisionEngine.prototype.compute = function () {\n  var physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_1__[\"Physics\"]).map(elem => {\n    var circle = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__[\"ShapeCircle\"], elem)[0];\n    var transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_2__[\"Transform\"], elem)[0];\n    var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_1__[\"Physics\"], elem)[0];\n    return {\n      e: elem,\n      radius: circle.radius,\n      circle,\n      positions: transform.positions,\n      speeds: physics.speeds,\n      physics\n    };\n  });\n\n  for (var i = 0; i < physic_entity.length; i++) {\n    var elem = physic_entity[i];\n    if (!this.manager.alive(elem.e)) continue;\n    var colisions = computeColision(elem, physic_entity);\n\n    for (var collisionIndex in colisions) {\n      var collision = colisions[collisionIndex];\n      if (!this.manager.alive(collision.e)) continue;\n      this.manager.destroy(collision.e);\n      this.merge(elem, collision);\n    }\n  }\n};\n\nPlasticColisionEngine.prototype.merge = function (nodeA, nodeB) {\n  var cubeRadiusA = Math.pow(nodeA.radius, 3);\n  var cubeRadiusB = Math.pow(nodeB.radius, 3);\n  var newRadious = Math.cbrt(cubeRadiusA + cubeRadiusB);\n  nodeA.circle.radius = newRadious;\n  var massA = nodeA.physics.mass;\n  var massB = nodeB.physics.mass;\n  nodeA.physics.mass = massA + massB;\n\n  for (var i = 0; i < nodeA.speeds.length; i++) {\n    nodeA.speeds[i] = (nodeA.speeds[i] * massA + nodeB.speeds[i] * massB) / (massA + massB);\n  }\n};\n\n\n\n//# sourceURL=webpack:///../lib/ecs/physics/plasticColisionEngine.js?");

/***/ }),

/***/ "../lib/ecs/physics/transform.js":
/*!***************************************!*\
  !*** ../lib/ecs/physics/transform.js ***!
  \***************************************/
/*! exports provided: Transform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Transform\", function() { return Transform; });\n/* harmony import */ var _shapes_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/vector */ \"../lib/shapes/vector.js\");\n\n\nfunction Transform(positions) {\n  this.positions = new _shapes_vector__WEBPACK_IMPORTED_MODULE_0__[\"Vector\"](positions);\n}\n\n\n\n//# sourceURL=webpack:///../lib/ecs/physics/transform.js?");

/***/ }),

/***/ "../lib/ecs/physics/transformRotate.js":
/*!*********************************************!*\
  !*** ../lib/ecs/physics/transformRotate.js ***!
  \*********************************************/
/*! exports provided: TransformRotate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TransformRotate\", function() { return TransformRotate; });\n/* harmony import */ var _shapes_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/vector */ \"../lib/shapes/vector.js\");\n\n\nfunction TransformRotate(rotate) {\n  this.rotate = rotate;\n}\n\n\n\n//# sourceURL=webpack:///../lib/ecs/physics/transformRotate.js?");

/***/ }),

/***/ "../lib/fe/touch.js":
/*!**************************!*\
  !*** ../lib/fe/touch.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// written by Slobodan Zivkovic slobacartoonac@gmail.com\nfunction distance2d(a, b) {\n  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));\n}\n\nfunction len2d(a) {\n  return Math.sqrt(a.x * a.x + a.y * a.y);\n}\n\nfunction getDelta(p1, n1, p2, n2) {\n  if (!n2) {\n    return {\n      x: n1.x - p1.x,\n      y: n1.y - p1.y\n    };\n  }\n\n  return {\n    x: (n1.x - p1.x + (n2.x - p2.x)) / 2,\n    y: (n1.y - p1.y + (n2.y - p2.y)) / 2\n  };\n}\n\nfunction getZoom(p1, n1, p2, n2) {\n  if (!n2) {\n    return 1;\n  }\n\n  if (!p2) {\n    return 1;\n  }\n\n  let initialDistance = distance2d(p1, p2);\n  let newDistance = distance2d(n1, n2);\n  if (initialDistance < 0.01) return 1;else return newDistance / initialDistance;\n}\n\nfunction getAngleDelta(p1, n1, p2, n2) {\n  if (!n2) {\n    return 0;\n  }\n\n  let angle1 = getAngle(p1, p2);\n  let angle2 = getAngle(n1, n2);\n  return angle2 - angle1;\n}\n\nfunction getAngle(p1, n1) {\n  let delta = getDelta(p1, n1);\n  let angle = Math.atan2(delta.y, delta.x);\n  return angle;\n}\n\nfunction Touch(div, deadzone) {\n  this.deadzone = deadzone;\n  this.clear();\n  let startPosition = null;\n  let startMoveSecound = null;\n  let position = null;\n  let thisMoveSecound = null;\n  let mouseDown = 0;\n  let click = true;\n  let touch = false;\n  let touchSecound = false;\n  this.mousePosition = {\n    x: 0,\n    y: 0\n  };\n  this.debug = false;\n  this.console_error = false;\n  this.throw_error = false;\n  this.last_error = '';\n\n  const moveTouchT = e => {\n    e.preventDefault();\n    const {\n      top,\n      left\n    } = e.target.getBoundingClientRect();\n\n    if (e.touches[1] && e.touches[0]) {\n      let first = {\n        x: e.touches[0].clientX - left,\n        y: e.touches[0].clientY - top\n      };\n      let secound = {\n        x: e.touches[1].clientX - left,\n        y: e.touches[1].clientY - top\n      };\n      this.mousePosition = {\n        x: (first.x + secound.x) / 2,\n        y: (first.y + secound.y) / 2\n      };\n      return moveTouch(first, secound);\n    }\n\n    if (e.touches[0]) {\n      let first = {\n        x: e.touches[0].clientX - left,\n        y: e.touches[0].clientY - top\n      };\n      this.mousePosition = {\n        x: first.x,\n        y: first.y\n      };\n      return moveTouch(first);\n    }\n  };\n\n  const moveTouchM = e => {\n    e.preventDefault();\n    const {\n      top,\n      left\n    } = e.target.getBoundingClientRect();\n    this.mousePosition = {\n      x: e.clientX - left,\n      y: e.clientY - top\n    };\n    if (mouseDown) moveTouch({\n      x: e.clientX - left,\n      y: e.clientY - top\n    });\n  };\n\n  const moveTouch = (e, secound) => {\n    touch = true;\n\n    if (startPosition == null) {\n      startPosition = {\n        x: e.x,\n        y: e.y\n      };\n      position = {\n        x: e.x,\n        y: e.y\n      };\n      this.triger('start', position);\n      click = true;\n      return;\n    }\n\n    if (secound && startMoveSecound == null) {\n      touchSecound = true;\n\n      if (distance2d(startPosition, secound) < distance2d(startPosition, e)) {\n        //switched touches\n        startPosition = {\n          x: e.x,\n          y: e.y\n        };\n        position = {\n          x: e.x,\n          y: e.y\n        };\n      }\n\n      startMoveSecound = {\n        x: secound.x,\n        y: secound.y\n      };\n      thisMoveSecound = {\n        x: secound.x,\n        y: secound.y\n      };\n      return;\n    }\n\n    if (!secound && startMoveSecound) {\n      touchSecound = false;\n      startMoveSecound = null;\n      thisMoveSecound = null;\n      return;\n    }\n\n    let delta = getDelta(position, e, thisMoveSecound, secound);\n    let deltaZoom = getZoom(position, e, thisMoveSecound, secound);\n    let deltaAngle = getAngleDelta(position, e, thisMoveSecound, secound);\n    position = {\n      x: e.x,\n      y: e.y\n    };\n    thisMoveSecound = secound ? {\n      x: secound.x,\n      y: secound.y\n    } : null;\n    let direction = getDelta(startPosition, position, startMoveSecound, thisMoveSecound);\n    let zoom = getZoom(startPosition, position, startMoveSecound, thisMoveSecound);\n    let distance = len2d(direction);\n    let angle = getAngleDelta(startPosition, position, startMoveSecound, thisMoveSecound);\n    let debug = this.debug && `${startPosition && 'Start: ' + JSON.stringify(startPosition)},\n\t\t${position && 'This: ' + JSON.stringify(position)}, \n\t\t${startMoveSecound && 'Start secound: ' + JSON.stringify(startMoveSecound)}, \n\t\t${thisMoveSecound && 'Start this: ' + JSON.stringify(thisMoveSecound)},\n\t\t${delta && 'Delta: ' + JSON.stringify(delta)},\n\t\t${'Zoom: ' + zoom},\n\t\t${'DZoom: ' + deltaZoom}\n\t\t${'Angle: ' + angle}\n\t\t${'DAngle: ' + deltaAngle}\n\t\t${'isPrimary: ' + (!touchSecound && mouseDown == 0 || mouseDown == 1)}\n\t\t${this.last_error}`;\n    let addition = {\n      delta,\n      direction,\n      startPosition,\n      position,\n      distance,\n      click,\n      isClick: click,\n      mouseDown,\n      zoom,\n      deltaZoom,\n      touchSecound,\n      angle,\n      deltaAngle,\n      isPrimary: !touchSecound && mouseDown == 0 || mouseDown == 1,\n      debug\n    };\n    this.triger('force', addition);\n\n    if (distance > this.deadzone) {\n      click = false;\n\n      if (Math.abs(direction.x) > Math.abs(direction.y)) {\n        if (direction.x > 0) {\n          this.triger('right', addition);\n        } else {\n          this.triger('left', addition);\n        }\n      } else if (direction.y > 0) {\n        this.triger('down', addition);\n      } else {\n        this.triger('up', addition);\n      }\n    }\n  }; //= {up:[],down:[],left:[],right:[],stop:[],click:[],force:[]}\n\n\n  const stopTouch = e => {\n    e.preventDefault();\n\n    if (touch == false) {\n      return;\n    }\n\n    let delta = {\n      x: 0,\n      y: 0\n    };\n    let deltaZoom = 0;\n    let deltaAngle = 0;\n    let direction = getDelta(startPosition, position, startMoveSecound, thisMoveSecound);\n    let zoom = getZoom(startPosition, position, startMoveSecound, thisMoveSecound);\n    let angle = getAngleDelta(startPosition, position, startMoveSecound, thisMoveSecound);\n    let distance = len2d(direction);\n    let debug = this.debug && `${startPosition && 'Start: ' + JSON.stringify(startPosition)},\n\t\t${position && 'This: ' + JSON.stringify(position)}, \n\t\t${startMoveSecound && 'Start secound: ' + JSON.stringify(startMoveSecound)}, \n\t\t${thisMoveSecound && 'Start this: ' + JSON.stringify(thisMoveSecound)},\n\t\t${delta && 'Delta: ' + JSON.stringify(delta)},\n\t\t${'Zoom: ' + zoom},\n\t\t${'DZoom: ' + deltaZoom}\n\t\t${'Angle: ' + angle}\n\t\t${'DAngle: ' + deltaAngle}\n\t\t${'isPrimary: ' + (!touchSecound && mouseDown == 0 || mouseDown == 1)}\n\t\t${this.last_error}`;\n    const addition = {\n      x: startPosition.x,\n      y: startPosition.y,\n      delta,\n      direction,\n      startPosition,\n      position,\n      distance,\n      click,\n      isClick: click,\n      mouseDown,\n      zoom,\n      deltaZoom,\n      touchSecound,\n      angle,\n      deltaAngle,\n      isPrimary: !touchSecound && mouseDown == 0 || mouseDown == 1,\n      debug\n    };\n    touch = false;\n    touchSecound = false;\n    let saveMove = startPosition;\n\n    if (click) {\n      if (e.button) {\n        if (e.button === 1) this.triger('bmiddle', addition);\n        if (e.button === 2) this.triger('bright', addition);\n      } else if (saveMove) {\n        this.triger('click', addition);\n      }\n    }\n\n    this.triger('stop', addition);\n    startPosition = null;\n    position = null;\n    startMoveSecound = null;\n    thisMoveSecound = null;\n    mouseDown = 0;\n  };\n\n  div.addEventListener('touchstart', e => {\n    e.preventDefault();\n  }, false);\n  div.addEventListener('touchmove', moveTouchT, false);\n  div.addEventListener('touchend', stopTouch, false);\n  div.addEventListener('touchstart', moveTouchT, false);\n  div.addEventListener('mouseleave', stopTouch, false);\n  div.addEventListener('mousemove', moveTouchM);\n  div.addEventListener('mouseup', stopTouch);\n  div.addEventListener('mousedown', e => {\n    mouseDown = 1 + e.button;\n    moveTouchM(e);\n  });\n}\n/*eslint-disable */\n\n\nTouch.prototype.sub = function (ev, func) {\n  if (this.events[ev]) this.events[ev].push(func);\n};\n\nTouch.prototype.onClick = function (func) {\n  this.events.click.push(func);\n};\n\nTouch.prototype.onForce = function (func) {\n  this.events.force.push(func);\n};\n\nTouch.prototype.onStop = function (func) {\n  this.events.stop.push(func);\n};\n\nTouch.prototype.onUp = function (func) {\n  this.events.up.push(func);\n};\n\nTouch.prototype.onDown = function (func) {\n  this.events.down.push(func);\n};\n\nTouch.prototype.onLeft = function (func) {\n  this.events.left.push(func);\n};\n\nTouch.prototype.onRight = function (func) {\n  this.events.right.push(func);\n};\n\nTouch.prototype.unsub = function (ev, func) {\n  if (this.events[ev]) this.events[ev] = this.events[ev].filter(fu => fu !== func);\n};\n\nTouch.prototype.clearEvlent = function (ev) {\n  if (this.events[ev]) this.events[ev] = [];\n};\n\nTouch.prototype.clear = function () {\n  this.events = {\n    up: [],\n    down: [],\n    left: [],\n    right: [],\n    stop: [],\n    start: [],\n    click: [],\n    force: [],\n    bmiddle: [],\n    bright: []\n  };\n};\n\nTouch.prototype.triger = function (ev, args) {\n  if (this.events[ev]) this.events[ev].forEach(func => {\n    try {\n      func(args);\n    } catch (e) {\n      if (this.console_error) console.log(e);\n      this.last_error = 'Error: ' + e.name + ' ' + e.foo + ' ' + e.message + ' ' + e.stack;\n      if (this.throw_error) throw e;\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Touch);\n\n//# sourceURL=webpack:///../lib/fe/touch.js?");

/***/ }),

/***/ "../lib/math/vec.js":
/*!**************************!*\
  !*** ../lib/math/vec.js ***!
  \**************************/
/*! exports provided: pointInTriangle, dot, perpDot, lineCollision, sign, interpolateVecs, interpolate, distance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pointInTriangle\", function() { return pointInTriangle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dot\", function() { return dot; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"perpDot\", function() { return perpDot; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lineCollision\", function() { return lineCollision; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sign\", function() { return sign; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"interpolateVecs\", function() { return interpolateVecs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"interpolate\", function() { return interpolate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"distance\", function() { return distance; });\nfunction sign(p1, p2, p3) {\n  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);\n}\n\nfunction pointInTriangle(pt, v1, v2, v3) {\n  var b1 = sign(pt, v1, v2) < 0.0;\n  var b2 = sign(pt, v2, v3) < 0.0;\n  var b3 = sign(pt, v3, v1) < 0.0;\n  return b1 == b2 && b2 == b3;\n}\n\nfunction dot(a, b) {\n  return a.x * b.x + a.y * b.y;\n}\n\nfunction perpDot(a, b) {\n  return a.y * b.x - a.x * b.y;\n}\n\nfunction lineCollision(A1, A2, B1, B2) {\n  var a = {\n    x: A2.x - A1.x,\n    y: A2.y - A1.y\n  };\n  var b = {\n    x: B2.x - B1.x,\n    y: B2.y - B1.y\n  };\n  var f = perpDot(a, b);\n  if (!f) // lines are parallel\n    return false;\n  var c = {\n    x: B2.x - A2.x,\n    y: B2.y - A2.y\n  };\n  var aa = perpDot(a, c);\n  var bb = perpDot(b, c);\n\n  if (f < 0) {\n    if (aa > 0) return false;\n    if (bb > 0) return false;\n    if (aa < f) return false;\n    if (bb < f) return false;\n  } else {\n    if (aa < 0) return false;\n    if (bb < 0) return false;\n    if (aa > f) return false;\n    if (bb > f) return false;\n  }\n\n  return true;\n}\n\nfunction interpolateVecs(vecA, vecB, over) {\n  let left = 1 - over;\n  return {\n    x: vecA.x * left + vecB.x * over,\n    y: vecA.y * left + vecB.y * over\n  };\n}\n\nfunction interpolate(vecA, vecB, over) {\n  let left = 1 - over;\n  return vecA * left + vecB * over;\n}\n\nfunction magnitude(aX, aY) {\n  return Math.sqrt(aX * aX, aY * aY);\n}\n\nfunction distance(aX, aY, bX, bY) {\n  return magnitude(aX - bX, aY - bY);\n}\n\n\n\n//# sourceURL=webpack:///../lib/math/vec.js?");

/***/ }),

/***/ "../lib/shapes/box.js":
/*!****************************!*\
  !*** ../lib/shapes/box.js ***!
  \****************************/
/*! exports provided: ShapeBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShapeBox\", function() { return ShapeBox; });\nfunction ShapeBox(size_x, size_y) {\n  this.x = size_x;\n  this.y = size_y;\n}\n\n\n\n//# sourceURL=webpack:///../lib/shapes/box.js?");

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

/***/ "../lib/shapes/rounded-box.js":
/*!************************************!*\
  !*** ../lib/shapes/rounded-box.js ***!
  \************************************/
/*! exports provided: ShapeRounded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShapeRounded\", function() { return ShapeRounded; });\nfunction ShapeRounded(radius) {\n  this.radius = radius;\n}\n\n\n\n//# sourceURL=webpack:///../lib/shapes/rounded-box.js?");

/***/ }),

/***/ "../lib/shapes/sprite.js":
/*!*******************************!*\
  !*** ../lib/shapes/sprite.js ***!
  \*******************************/
/*! exports provided: Sprite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Sprite\", function() { return Sprite; });\nfunction Sprite(image) {\n  this.image = image;\n}\n\n\n\n//# sourceURL=webpack:///../lib/shapes/sprite.js?");

/***/ }),

/***/ "../lib/shapes/text.js":
/*!*****************************!*\
  !*** ../lib/shapes/text.js ***!
  \*****************************/
/*! exports provided: ShapeText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShapeText\", function() { return ShapeText; });\nfunction ShapeText(font, text) {\n  this.font = font;\n  this.text = text;\n}\n\n\n\n//# sourceURL=webpack:///../lib/shapes/text.js?");

/***/ }),

/***/ "../lib/shapes/vector.js":
/*!*******************************!*\
  !*** ../lib/shapes/vector.js ***!
  \*******************************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vector\", function() { return Vector; });\nfunction Vector(...array) {\n  Array.call(this);\n\n  if (array.length == 1) {\n    var item = array[0];\n    var arr = Object.values(item);\n\n    if (Object.hasOwnProperty.call(item, 'length') && item.length !== arr.length) {\n      arr.pop();\n    }\n\n    this.push(...arr);\n  } else {\n    this.push(...Object.values(array));\n  }\n\n  Object.defineProperty(this, 'x', {\n    get() {\n      return this[0];\n    },\n\n    set(value) {\n      this[0] = value;\n    }\n\n  });\n  Object.defineProperty(this, 'y', {\n    get() {\n      return this[1];\n    },\n\n    set(value) {\n      this[1] = value;\n    }\n\n  });\n  Object.defineProperty(this, 'z', {\n    get() {\n      return this[2];\n    },\n\n    set(value) {\n      this[2] = value;\n    }\n\n  });\n}\n\nVector.prototype.x = 0;\nVector.prototype.y = 0;\nVector.prototype.z = 0;\nVector.prototype = Object.create(Array.prototype, {\n  constructor: {\n    value: Vector,\n    enumerable: false,\n    // Make it non-enumerable, so it won't appear in `for...in` loop\n    writable: true,\n    configurable: true\n  }\n});\n\nVector.prototype.add = function (toAdd) {\n  let ret = this.copy();\n\n  for (var k = 0; k < ret.length; k++) {\n    if (!Object.hasOwnProperty.call(ret, k)) {\n      continue;\n    }\n\n    if (!Object.hasOwnProperty.call(toAdd, k)) {\n      continue;\n    }\n\n    ret[k] += toAdd[k];\n  }\n\n  return ret;\n};\n\nVector.prototype.update = function (newValues) {\n  for (var k = 0; k < this.length; k++) {\n    if (!Object.hasOwnProperty.call(this, k)) {\n      continue;\n    }\n\n    if (!Object.hasOwnProperty.call(newValues, k)) {\n      continue;\n    }\n\n    this[k] = newValues[k];\n  }\n};\n\nVector.prototype.negate = function () {\n  let ret = this.copy();\n\n  for (var k = 0; k < ret.length; k++) {\n    if (!Object.hasOwnProperty.call(ret, k)) {\n      continue;\n    }\n\n    ret[k] = -ret[k];\n  }\n\n  return ret;\n};\n\nVector.prototype.substract = function (toAdd) {\n  return this.add(toAdd.negate());\n};\n\nVector.prototype.magnitude = function () {\n  let magnitude = 0;\n\n  for (var k = 0; k < this.length; k++) {\n    if (!Object.hasOwnProperty.call(this, k)) {\n      continue;\n    }\n\n    magnitude += this[k] * this[k];\n  }\n\n  return Math.sqrt(magnitude);\n};\n\nVector.prototype.normalise = function (toAdd) {\n  let magnitude = this.magnitude();\n  return this.scale(1 / magnitude);\n};\n\nVector.prototype.scale = function (scale) {\n  let ret = this.copy();\n\n  for (var k = 0; k < ret.length; k++) {\n    if (!Object.hasOwnProperty.call(ret, k)) {\n      continue;\n    }\n\n    ret[k] *= scale;\n  }\n\n  return ret;\n};\n\nVector.prototype.copy = function () {\n  return new this.constructor(this);\n};\n\n\n\n//# sourceURL=webpack:///../lib/shapes/vector.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/ecs */ \"../lib/ecs/index.js\");\n/* harmony import */ var _lib_fe_touch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/fe/touch */ \"../lib/fe/touch.js\");\n/* harmony import */ var _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/ecs/physics/physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _lib_ecs_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../lib/ecs/physics/plasticColisionEngine */ \"../lib/ecs/physics/plasticColisionEngine.js\");\n/* harmony import */ var _lib_ecs_physics_gravityEngine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/ecs/physics/gravityEngine */ \"../lib/ecs/physics/gravityEngine.js\");\n/* harmony import */ var _lib_ecs_drawers_gravityColorEngine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../lib/ecs/drawers/gravityColorEngine */ \"../lib/ecs/drawers/gravityColorEngine.js\");\n/* harmony import */ var _lib_ecs_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../lib/ecs/physics/transform.js */ \"../lib/ecs/physics/transform.js\");\n/* harmony import */ var _lib_ecs_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../lib/ecs/drawers/ploter.js */ \"../lib/ecs/drawers/ploter.js\");\n/* harmony import */ var _lib_ecs_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../lib/ecs/drawers/drawFPS.js */ \"../lib/ecs/drawers/drawFPS.js\");\n/* harmony import */ var _lib_ecs_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../lib/ecs/drawers/drawGrid.js */ \"../lib/ecs/drawers/drawGrid.js\");\n/* harmony import */ var _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../lib/ecs/drawers/render.js */ \"../lib/ecs/drawers/render.js\");\n/* harmony import */ var _lib_ecs_drawers_drawMass_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../lib/ecs/drawers/drawMass.js */ \"../lib/ecs/drawers/drawMass.js\");\n/* harmony import */ var _lib_ecs_drawers_drawGass_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../lib/ecs/drawers/drawGass.js */ \"../lib/ecs/drawers/drawGass.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar canvas = document.getElementById('phy_canvas');\nvar toolokInput = document.getElementById('tolook_value');\nvar drawMass = document.getElementById('draw_mass');\nvar drawGass = document.getElementById('draw_gass');\nvar drawGrid = document.getElementById('draw_grid');\nvar drawFPS = document.getElementById('draw_fps');\nvar fullSpeed = document.getElementById('full_speed');\nvar draw = new _lib_ecs_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"](canvas);\ncanvas.width = 640;\ncanvas.height = 480;\nvar position = {\n  x: 0,\n  y: 0,\n  scale: 0.2\n};\nwindow.addEventListener('mousewheel', function (e) {\n  position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88;\n});\nvar fps = new _lib_ecs_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"](draw.context);\nvar grid = new _lib_ecs_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"](draw.context);\nvar manager = new _lib_ecs__WEBPACK_IMPORTED_MODULE_0__[\"EntityManager\"]();\nvar points = new _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__[\"RenderEngine\"](draw.context, manager);\nvar mass = new _lib_ecs_drawers_drawMass_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"](draw.context, manager);\nvar gass = new _lib_ecs_drawers_drawGass_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"](draw.context, manager);\nvar gravityEngine = new _lib_ecs_physics_gravityEngine__WEBPACK_IMPORTED_MODULE_5__[\"GravityEngine\"](manager);\nvar colisionEngine = new _lib_ecs_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__[\"PlasticColisionEngine\"](manager);\nvar gravityColorEngine = new _lib_ecs_drawers_gravityColorEngine__WEBPACK_IMPORTED_MODULE_6__[\"GravityColorEngine\"](manager);\nvar physics = new _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"PhysicsEngine\"](manager, [gravityEngine, colisionEngine, gravityColorEngine]);\nvar touch = new _lib_fe_touch__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas, 100);\ntouch.sub('force', function (_ref) {\n  var delta = _ref.delta,\n      deltaZoom = _ref.deltaZoom;\n  position = _objectSpread({}, position, {\n    scale: position.scale * deltaZoom,\n    x: position.x - delta.x / position.scale,\n    y: position.y - delta.y / position.scale\n  });\n});\nvar entity = null;\nvar all = [];\n\nfunction calculateMass(radius) {\n  var massVolume = 0.1;\n  return Math.pow(radius, 3) * Math.PI * massVolume;\n}\n\nfunction createSnode(positions, speeds, radius) {\n  entity = manager.create();\n  manager.asign(new _lib_ecs_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__[\"Transform\"](positions), entity);\n  manager.asign(new _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__[\"Physics\"](speeds, calculateMass(radius), 0), entity);\n  manager.asign(new _lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__[\"ShapeCircle\"](radius), entity);\n  manager.asign(new _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__[\"Renderer\"]('#aaffbb'), entity);\n  return entity;\n}\n\nall.push(createSnode([0, 0], [0, 0], 65, all, 'Sun'));\nall.push(createSnode([255, 0], [0, 5], 3, all, 'Mercury'));\nall.push(createSnode([300, 0], [0, 5], 4, all, 'Venus'));\nall.push(createSnode([450, 0], [0, 4], 7, all, 'Earth'));\nall.push(createSnode([600, 0], [0, 4], 4, all, 'Mars'));\nall.push(createSnode([1400, 0], [0, 2.5], 25, all, 'Jupiter'));\nall.push(createSnode([1440, 0], [0, 6], 2, all, 'Europa'));\nall.push(createSnode([1450, 0], [0, 6], 2, all, 'Europa'));\nall.push(createSnode([2800, 0], [0, 2.5], 5, all, 'Saturn'));\n\nvar generateItem = function generateItem(size) {\n  var angle = Math.random() * 2 * Math.PI;\n  var radius = 200 + Math.random() * 2000;\n  var x = Math.sin(angle) * radius;\n  var y = Math.cos(angle) * radius;\n  var tan = Math.atan2(x, y) - Math.PI / 2;\n  var el = createSnode([x, y], [10 * Math.sin(tan) + Math.random() * 14 - 7, 10 * Math.cos(tan) + Math.random() * 14 - 7], size || 0.1 + Math.random(), all);\n  all.push(el);\n};\n\nsetInterval(function () {\n  all.length < 30 && generateItem();\n}, 200);\n\nfunction work() {\n  var numb = parseInt(toolokInput.value);\n\n  if (!isNaN(numb)) {\n    var toLookEntity = all[numb % all.length];\n    var toLookTransform = manager.get(_lib_ecs_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__[\"Transform\"], toLookEntity)[0];\n    position.x = toLookTransform.positions[0];\n    position.y = toLookTransform.positions[1];\n  }\n\n  draw.clear();\n  if (drawMass.checked) mass.draw(position);\n  if (drawGass.checked) gass.draw(position);\n  if (drawGrid.checked) grid.draw(100, 100, position);\n  points.draw(position);\n  if (drawFPS.checked) fps.draw();\n  physics.compute();\n  all = all.filter(function (e, index) {\n    var alive = manager.alive(e);\n\n    if (!alive && !isNaN(numb) && numb >= index) {\n      toolokInput.value = numb - 1;\n    }\n\n    return alive;\n  });\n\n  if (numb >= all.length) {\n    toolokInput.value = all.length - 1;\n  }\n\n  setTimeout(work, fullSpeed.checked ? 0 : 15);\n}\n\nwork();\n\n//# sourceURL=webpack:///./src/javascript/index.js?");

/***/ })

/******/ });