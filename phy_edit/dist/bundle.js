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

/***/ "./src/javascript/drawMass.js":
/*!************************************!*\
  !*** ./src/javascript/drawMass.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar squareDistance = function squareDistance(point, nodeB) {\n  var square = 0;\n\n  for (var i = 0; i < point.length; i++) {\n    square += Math.pow(point[i] - nodeB.positions[i], 2);\n  }\n\n  return isNaN(square) || square < 1 ? 1 : square;\n};\n\nvar COLORS = 16 * 16;\n\nfunction MassPloter(context, width, height) {\n  this.context = context;\n  this.width = width;\n  this.height = height;\n  this.img = this.context.createImageData(this.width, this.height);\n}\n\nMassPloter.prototype.draw = function (points, view) {\n  var centerX = view.x,\n      centerY = view.y,\n      scale = view.scale;\n  var context = this.context,\n      canvasWidth = this.width,\n      canvasHeight = this.height;\n  var canvasWidthHalf = canvasWidth / 2;\n  var canvasHeightHalf = canvasHeight / 2;\n  var stepX = 2;\n  var stepY = 2;\n  var halfStepX = stepX / 2;\n  var halfStepY = stepY / 2;\n  var startx = (centerX + canvasWidthHalf) % stepX;\n  var starty = (centerY + canvasHeightHalf) % stepY;\n  var inverseScale = stepY / scale;\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    var realX = (x - canvasWidthHalf) / scale + centerX;\n    var realY = (starty - canvasHeightHalf) / scale + centerY;\n\n    for (var y = starty; y <= canvasHeight; y += stepY) {\n      var sum = 0;\n      var pointsLength = points.length;\n\n      for (var i = 0; i < pointsLength; i++) {\n        var point = points[i];\n        sum += 3000 * point.mass / squareDistance([realX, realY], point);\n      }\n\n      var colorMin2 = Math.min(sum / 16.0, COLORS - 1);\n      var colorMin = Math.max(Math.min(sum, COLORS - 1) - colorMin2 * colorMin2 * 0.3, 0);\n      this.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [colorMin2, 0, colorMin, 255]);\n      realY += inverseScale;\n    }\n  }\n\n  context.putImageData(this.img, 0, 0);\n};\n\nMassPloter.prototype.imgRect = function (x, y, width, height, color) {\n  var realWidth = Math.max(Math.min(width + 1, this.width - x), 0);\n  var realHeight = Math.max(Math.min(height + 1, this.height - y), 0);\n  var realX = Math.max(Math.round(x), 0);\n  var realY = Math.max(Math.round(y), 0);\n  var data = this.img.data;\n  var startX = realX * 4;\n  var endX = realWidth * 4 + startX;\n  var rowLength = this.width * 4;\n  var startY = realY * rowLength;\n  var endY = realHeight * rowLength + startY;\n\n  for (var i = startY; i < endY; i += rowLength) {\n    for (var j = startX; j < endX; j += 4) {\n      var ij = i + j;\n      data[ij] = color[0];\n      data[ij + 1] = color[1];\n      data[ij + 2] = color[2];\n      data[ij + 3] = color[3];\n    }\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MassPloter);\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/drawMass.js?");

/***/ }),

/***/ "./src/javascript/drawPoints.js":
/*!**************************************!*\
  !*** ./src/javascript/drawPoints.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction PointsPloter(context, width, height) {\n  this.context = context;\n  this.width = width;\n  this.height = height;\n}\n\nPointsPloter.prototype.draw = function (points, view) {\n  var context = this.context,\n      canvasWidth = this.width,\n      canvasHeight = this.height;\n  var centerX = view.x,\n      centerY = view.y,\n      scale = view.scale;\n  var canvasWidthHalf = canvasWidth / 2;\n  var canvasHeightHalf = canvasHeight / 2;\n  points.forEach(function (element) {\n    var x = (element[0] - centerX) * scale + canvasWidthHalf;\n    var y = (element[1] - centerY) * scale + canvasHeightHalf;\n    if (x < 0 || y < 0 || x > canvasWidth || y > canvasHeight) return;\n    var elementSize = element[2] * scale > 1 ? element[2] * scale : 1;\n    context.beginPath();\n    context.arc(x, y, elementSize, 0, 2 * Math.PI, false);\n    context.fillStyle = element[3];\n    context.fill();\n    context.lineWidth = 1;\n    context.strokeStyle = '#333333';\n    context.stroke();\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PointsPloter);\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/drawPoints.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ploter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ploter.js */ \"./src/javascript/ploter.js\");\n/* harmony import */ var _touch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./touch.js */ \"./src/javascript/touch.js\");\n/* harmony import */ var _drawFPS_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawFPS.js */ \"./src/javascript/drawFPS.js\");\n/* harmony import */ var _drawPoints_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawPoints.js */ \"./src/javascript/drawPoints.js\");\n/* harmony import */ var _ropeNode_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ropeNode.js */ \"./src/javascript/ropeNode.js\");\n/* harmony import */ var _drawMass_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./drawMass.js */ \"./src/javascript/drawMass.js\");\n/* harmony import */ var _drawGrid_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./drawGrid.js */ \"./src/javascript/drawGrid.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nvar canvas = document.getElementById('phy_canvas');\nvar draw = new _ploter_js__WEBPACK_IMPORTED_MODULE_0__.default(canvas, 640, 480);\nvar position = {\n  x: 0,\n  y: 0,\n  scale: 1\n};\nwindow.addEventListener('mousewheel', function (e) {\n  position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88;\n});\nvar fps = new _drawFPS_js__WEBPACK_IMPORTED_MODULE_2__.default(draw.context);\nvar points = new _drawPoints_js__WEBPACK_IMPORTED_MODULE_3__.default(draw.context, 640, 480);\nvar mass = new _drawMass_js__WEBPACK_IMPORTED_MODULE_5__.default(draw.context, 640, 480);\nvar grid = new _drawGrid_js__WEBPACK_IMPORTED_MODULE_6__.default(draw.context, 640, 480);\ndocument.body.appendChild(canvas);\nvar touch = new _touch_js__WEBPACK_IMPORTED_MODULE_1__.default(canvas, 100);\ntouch.sub('force', function (_ref) {\n  var delta = _ref.delta;\n  position = _objectSpread({}, position, {\n    x: position.x - delta.x / position.scale,\n    y: position.y - delta.y / position.scale\n  });\n});\nvar all = [];\nvar stabilex = 0;\nvar stabiley = 200;\nvar stabileDistance = 12;\n\nfor (var i = 0; i < 100; i++) {\n  all.push(new _ropeNode_js__WEBPACK_IMPORTED_MODULE_4__.default([stabilex, stabiley], [0, 0], 5, all, i));\n  var prewa = Math.atan2(-1, 50 * Math.cos(i / 4.0));\n  stabilex += Math.cos(prewa) * stabileDistance;\n  stabiley += Math.sin(prewa) * stabileDistance;\n}\n\nvar pullNode = new _ropeNode_js__WEBPACK_IMPORTED_MODULE_4__.default([stabilex, stabiley], [-0.2, -2], 2, [], i);\npullNode.drag = 0;\nall.push(pullNode);\n\nfunction work() {\n  draw.clear(); //mass.draw(all,position)\n\n  grid.draw(100, 100, position);\n  if (pullNode.positions[1] < stabiley - 300) pullNode.speeds[1] = 0.9;\n  points.draw(all.map(function (elem) {\n    return [elem.positions[0], elem.positions[1], elem.radius, elem.radius > 7 ? '#ff9933' : '#aaffbb'];\n  }), position);\n  fps.draw();\n\n  for (var z = 0; z < 20; z++) {\n    all.forEach(function (e) {\n      e.compute();\n    });\n    all.forEach(function (e) {\n      e.move();\n    });\n  }\n\n  setTimeout(work, 30);\n}\n\nwork();\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/index.js?");

/***/ }),

/***/ "./src/javascript/ploter.js":
/*!**********************************!*\
  !*** ./src/javascript/ploter.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Ploter(canvas, width, height) {\n  this.canvas = canvas;\n  this.canvas.width = width || 320;\n  this.canvas.height = height || 240;\n  this.context = this.canvas.getContext('2d');\n  this.img = this.context.createImageData(this.canvas.width, this.canvas.height);\n}\n\nPloter.prototype.clear = function () {\n  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n};\n\nPloter.prototype.getCanvas = function () {\n  return this.canvas;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ploter);\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/ploter.js?");

/***/ }),

/***/ "./src/javascript/ropeNode.js":
/*!************************************!*\
  !*** ./src/javascript/ropeNode.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction RNode(positions, speeds, radius, inputs, index) {\n  this.radius = radius;\n  this.positions = positions ? positions : [];\n  this.speeds = speeds ? speeds : [];\n  this.inputs = inputs ? inputs : [];\n  this.invalid = null;\n  this.massVolume = 5;\n  this.interaction = 20;\n  this.colisionInteraction = 300;\n  this.distance = 12;\n  this.g = 0.0001;\n  this.drag = 0.001;\n  this.index = index;\n  this.mass = this.computeMass();\n}\n\nRNode.prototype.computeMass = function () {\n  return Math.pow(this.radius, 3) * Math.PI * this.massVolume;\n};\n\nRNode.prototype.computeRope = function (compute, naibor) {\n  var _this = this;\n\n  var ret = [0, 0];\n  naibor.forEach(function (element) {\n    var distanceX = element.positions[0] - compute.positions[0];\n    var distanceY = element.positions[1] - compute.positions[1];\n    var distanceAngle = Math.atan2(distanceY, distanceX);\n    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);\n    var distanceNormalised = distance / _this.distance;\n    var forceIntencity = Math.atan((distanceNormalised - 1) * 5) + Math.pow(distanceNormalised - 1, 3);\n    var forceComponents = {\n      x: Math.cos(distanceAngle) * forceIntencity,\n      y: Math.sin(distanceAngle) * forceIntencity\n    };\n    ret[0] += forceComponents.x;\n    ret[1] += forceComponents.y;\n  });\n  return ret;\n};\n\nRNode.prototype.adjustColision = function (compute, naibor) {\n  var _this2 = this;\n\n  var ret = [0, 0];\n  naibor.forEach(function (element) {\n    if (element == _this2) return;\n    var distanceX = element.positions[0] - compute.positions[0];\n    var distanceY = element.positions[1] - compute.positions[1];\n    var distanceAngle = Math.atan2(distanceY, distanceX);\n    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);\n    if (distance > _this2.radius + element.radius) return;\n    var distanceNormalised = distance / (_this2.radius + element.radius);\n    var forceIntencity = Math.pow(distanceNormalised - 1, 3);\n    var forceComponents = {\n      x: Math.cos(distanceAngle) * forceIntencity,\n      y: Math.sin(distanceAngle) * forceIntencity\n    };\n    ret[0] += forceComponents.x;\n    ret[1] += forceComponents.y;\n  });\n  return ret;\n};\n\nRNode.prototype.compute = function () {\n  var _this3 = this;\n\n  if (this.invalid) return;\n  var naibor = this.inputs.filter(function (element) {\n    return Math.abs(element.index - _this3.index) == 1;\n  });\n  var computed = this.computeRope(this, naibor);\n  var computedC = this.adjustColision(this, this.inputs);\n  var interaction = this.interaction / this.mass;\n  var colisionInteraction = this.colisionInteraction / this.mass;\n\n  for (var i = 0; i < this.positions.length; i++) {\n    this.speeds[i] += interaction * computed[i] + computedC[i] * colisionInteraction;\n    this.speeds[i] *= 1 - this.drag;\n  }\n\n  this.speeds[1] += this.g;\n\n  if (Math.abs(this.positions[0]) < 100 && this.positions[1] + this.speeds[1] > 200 && this.positions[1] < 200) {\n    this.speeds[1] = -this.speeds[1];\n  }\n};\n\nRNode.prototype.move = function () {\n  for (var k = 0; k < this.positions.length; k++) {\n    this.positions[k] += this.speeds[k];\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RNode);\n\n//# sourceURL=webpack://chain_mould_effect/./src/javascript/ropeNode.js?");

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