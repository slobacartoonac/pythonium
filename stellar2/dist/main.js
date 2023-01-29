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

/***/ "../lib/ecs/drawers/drawFPS.js":
/*!*************************************!*\
  !*** ../lib/ecs/drawers/drawFPS.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction FPSPloter(context) {\r\n\tthis.context = context\r\n\tthis.time = (new Date()).getTime()\r\n\tthis.i = 0\r\n\tthis.fps = 0\r\n}\r\n\r\nFPSPloter.prototype.draw = function () {\r\n\tthis.i++\r\n\tvar newTime = (new Date()).getTime()\r\n\tvar deltaT = newTime - this.time\r\n\tthis.time = newTime\r\n\tthis.context.font = '14px Verdana'\r\n\r\n\tif (!(this.i % 30)) this.fps = (Math.round(10000 / deltaT) / 10) + ' fps'\r\n\tthis.context.beginPath();\r\n\tthis.context.rect(10, 13, 60, 14);\r\n\tthis.context.fillStyle = 'gray'\r\n\tthis.context.fill();\r\n\tthis.context.fillStyle = 'red'\r\n\tthis.context.fillText(this.fps, 10, 24)\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FPSPloter);\n\n//# sourceURL=webpack://stellar2/../lib/ecs/drawers/drawFPS.js?");

/***/ }),

/***/ "../lib/ecs/drawers/drawGalaxy.js":
/*!****************************************!*\
  !*** ../lib/ecs/drawers/drawGalaxy.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _math_vec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/vec.js */ \"../lib/math/vec.js\");\n/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../physics/physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _physics_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../physics/transform */ \"../lib/ecs/physics/transform.js\");\n/* harmony import */ var _imageData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./imageData */ \"../lib/ecs/drawers/imageData.js\");\n\r\n\r\n\r\n\r\n\r\nconst distance = (point, pointB) => {\r\n\tvar square = 0\r\n\tfor (var i = 0; i < point.length; i++)\r\n\t\tsquare += (point[i] - pointB[i]) * (point[i] - pointB[i])\r\n\treturn isNaN(square) || square < 1 ? 1 : Math.sqrt(square)\r\n}\r\n\r\nfunction GalaxyPloter(context, manager, colors) {\r\n\tthis.colors = colors\r\n\tthis.context = context\r\n\tthis.imgData = new _imageData__WEBPACK_IMPORTED_MODULE_3__.ImageDataPloter(context, manager)\r\n\tthis.manager = manager\r\n}\r\n\r\nGalaxyPloter.prototype.update = function () {\r\n\tthis.imgData.update()\r\n}\r\n\r\nGalaxyPloter.prototype.draw = function (view) {\r\n\tconst { x: centerX, y: centerY, scale } = view\r\n\tconst { context } = this\r\n\tvar canvasWidth = context.canvas.clientWidth\r\n\tvar canvasHeight = context.canvas.clientHeight\r\n\tconst canvasWidthHalf = canvasWidth / 2\r\n\tconst canvasHeightHalf = canvasHeight / 2\r\n\tconst stepX = 2\r\n\tconst stepY = 2\r\n\tconst halfStepX = stepX / 2\r\n\tconst halfStepY = stepY / 2\r\n\tvar startx = (centerX + canvasWidthHalf) % stepX\r\n\tvar starty = (centerY + canvasHeightHalf) % stepY\r\n\tvar inverseScale = stepY / scale\r\n\tconst points = this.manager.getEnities(_physics_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics).map(\r\n\t\t(elem) => {\r\n\t\t\tvar physics = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics, elem)[0]\r\n\t\t\tvar transform = this.manager.get(_physics_transform__WEBPACK_IMPORTED_MODULE_2__.Transform, elem)[0]\r\n\t\t\treturn {\r\n\t\t\t\tmass: physics.mass,\r\n\t\t\t\tpositions: transform.positions\r\n\t\t\t}\r\n\t\t})\r\n\tthis.imgData.pull()\r\n\tvar colorCount = new Array(this.colors.length).fill(0)\r\n\tfor (var x = startx; x <= canvasWidth; x += stepX) {\r\n\t\tvar realX = (x - canvasWidthHalf) / scale + centerX\r\n\t\tvar realY = (starty - canvasHeightHalf) / scale + centerY\r\n\t\tfor (var y = starty; y <= canvasHeight; y += stepY) {\r\n\t\t\tvar sum = 0\r\n\t\t\tvar pointsLength = points.length\r\n\t\t\tfor (var i = 0; i < pointsLength; i++) {\r\n\t\t\t\tvar point = points[i]\r\n\t\t\t\tsum += point.mass / distance([realX, realY], point.positions)\r\n\t\t\t}\r\n\t\t\tvar colorPosition = Math.max(this.colors.length - sum / 64.0, 0);\r\n\t\t\tvar over = colorPosition % 1\r\n\t\t\tvar index1 = Math.min(this.colors.length - 1, Math.floor(colorPosition))\r\n\t\t\tvar index2 = Math.min(this.colors.length - 1, Math.ceil(colorPosition))\r\n\t\t\tvar color = this.colors[index2]\r\n\t\t\tlet color2 = this.colors[index1]\r\n\t\t\tcolorCount[index1]++\r\n\t\t\tcolor = color.map((c, index) => (0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.interpolate)(color2[index], c, over))\r\n\r\n\t\t\tthis.imgData.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [color[0], color[1], color[2]])\r\n\t\t\trealY += inverseScale\r\n\t\t}\r\n\t}\r\n\t//console.log(colorCount)\r\n\tcontext.putImageData(this.imgData.img, 0, 0)\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GalaxyPloter);\n\n//# sourceURL=webpack://stellar2/../lib/ecs/drawers/drawGalaxy.js?");

/***/ }),

/***/ "../lib/ecs/drawers/drawGass.js":
/*!**************************************!*\
  !*** ../lib/ecs/drawers/drawGass.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _math_vec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/vec.js */ \"../lib/math/vec.js\");\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../physics/physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _physics_transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../physics/transform */ \"../lib/ecs/physics/transform.js\");\n/* harmony import */ var _imageData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imageData.js */ \"../lib/ecs/drawers/imageData.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nvar COLORS = 16 * 16\r\n\r\nfunction GassPloter(context, manager) {\r\n\tthis.context = context\r\n\tthis.imgData = new _imageData_js__WEBPACK_IMPORTED_MODULE_4__.ImageDataPloter(context, manager)\r\n\tthis.update();\r\n\tthis.manager = manager\r\n}\r\n\r\nGassPloter.prototype.update = function () {\r\n\tthis.width = this.context.canvas.clientWidth\r\n\tthis.height = this.context.canvas.clientHeight\r\n\tthis.step = 4\r\n\tthis.widthSteps = this.width / this.step\r\n\tthis.heightSteps = this.height / this.step\r\n\tthis.number = this.widthSteps * this.heightSteps\r\n\tthis.cells = {\r\n\t\tp: new Float32Array(this.number),\r\n\t\tv: new Float32Array(this.number),\r\n\t\th: new Float32Array(this.number),\r\n\t\to: new Uint8Array(this.number),\r\n\t}\r\n\tthis.cells.p.fill(1)\r\n\tthis.cells.v.fill(0)\r\n\tthis.cells.h.fill(0)\r\n\tthis.cells.o.fill(0)\r\n\tthis.imgData.update()\r\n}\r\n\r\nGassPloter.prototype.draw = function (view) {\r\n\tconst { x: centerX, y: centerY, scale } = view\r\n\tconst { context } = this\r\n\tvar canvasWidth = context.canvas.clientWidth\r\n\tvar canvasHeight = context.canvas.clientHeight\r\n\tconst canvasWidthHalf = canvasWidth / 2\r\n\tconst canvasHeightHalf = canvasHeight / 2\r\n\tconst stepX = this.step\r\n\tconst stepY = this.step\r\n\tconst halfStepX = stepX / 2\r\n\tconst halfStepY = stepY / 2\r\n\tvar startx = (centerX + canvasWidthHalf) % stepX\r\n\tvar starty = (centerY + canvasHeightHalf) % stepY\r\n\tvar inverseScale = stepY / scale\r\n\tthis.imgData.pull()\r\n\tconst points = this.manager.getEnities(_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics).map(\r\n\t\t(elem) => {\r\n\t\t\tvar transform = this.manager.get(_physics_transform__WEBPACK_IMPORTED_MODULE_3__.Transform, elem)[0]\r\n\t\t\tvar shape = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle, elem)[0]\r\n\t\t\tvar physics = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics, elem)[0]\r\n\t\t\treturn {\r\n\t\t\t\tspeeds: physics.speeds,\r\n\t\t\t\tradius: shape && shape.radius,\r\n\t\t\t\tpositions: transform.positions\r\n\t\t\t}\r\n\t\t}).filter(({ radius }) => !!radius)\r\n\t//this.cells.o.fill(0)\r\n\tfor (var x = startx; x <= canvasWidth; x += stepX) {\r\n\t\tvar realX = (x - canvasWidthHalf) / scale + centerX\r\n\t\tvar realY = (starty - canvasHeightHalf) / scale + centerY\r\n\t\tvar realXround = Math.max(Math.round(realX - halfStepX), 0)\r\n\t\tfor (var y = starty; y <= canvasHeight; y += stepY) {\r\n\t\t\tvar realYround = Math.max(Math.round(realY - halfStepY), 0)\r\n\t\t\tvar cellId = realXround + realYround * this.widthSteps\r\n\t\t\tvar sum = 0\r\n\t\t\tvar pointsLength = points.length\r\n\t\t\tfor (var i = 0; i < pointsLength; i++) {\r\n\t\t\t\tvar point = points[i]\r\n\t\t\t\tif (point.radius >\r\n\t\t\t\t\t(0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.distance)(point.positions[0],\r\n\t\t\t\t\t\tpoint.positions[1],\r\n\t\t\t\t\t\trealX,\r\n\t\t\t\t\t\trealY)) {\r\n\t\t\t\t\tthis.cells.o[cellId] = 1\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\tif (this.cells[cellId]) {\r\n\t\t\t\tsum += 128\r\n\t\t\t}\r\n\t\t\tvar colorMin2 = Math.min(sum, COLORS - 1)\r\n\t\t\tvar colorMin = Math.max(Math.min(sum, COLORS - 1) - colorMin2 * colorMin2 * 0.3, 0)\r\n\t\t\tthis.imgData.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [255 - colorMin, 0, 255 - colorMin2])\r\n\t\t\trealY += inverseScale\r\n\t\t}\r\n\t}\r\n\tcontext.putImageData(this.imgData.img, 0, 0)\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GassPloter);\n\n//# sourceURL=webpack://stellar2/../lib/ecs/drawers/drawGass.js?");

/***/ }),

/***/ "../lib/ecs/drawers/drawGrid.js":
/*!**************************************!*\
  !*** ../lib/ecs/drawers/drawGrid.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _math_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/view */ \"../lib/math/view.js\");\n/* harmony import */ var _math_vec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../math/vec */ \"../lib/math/vec.js\");\n\r\n\r\n\r\nfunction GridPloter(ctx, options) {\r\n\tthis.context = ctx\r\n\tthis.showCords = options?.showCords\r\n\tthis.showAxis = options?.showAxis\r\n\tthis.axisCords = options?.axisCords\r\n\tthis.axisScale = options?.axisScale || 100\r\n\tthis.devide = options?.devide || 2\r\n}\r\n\r\nGridPloter.prototype.draw = function (sizex, sizey, view) {\r\n\tconst { context } = this\r\n\tvar canvasWidth = context.canvas.clientWidth\r\n\tvar canvasHeight = context.canvas.clientHeight\r\n\tconst { x: centerX, y: centerY, scale } = view\r\n\tconst canvasWidthHalf = canvasWidth / 2\r\n\tconst canvasHeightHalf = canvasHeight / 2\r\n\tvar gridScale = scale || 1\r\n\twhile (gridScale > 2)\r\n\t\tgridScale /= 2\r\n\twhile (gridScale < 1)\r\n\t\tgridScale *= 2\r\n\tconst stepX = sizex * gridScale\r\n\tconst stepY = sizey * gridScale\r\n\tvar startx = (canvasWidthHalf - centerX * scale) % stepX\r\n\tvar starty = (canvasHeightHalf - centerY * scale) % stepY\r\n\tif (startx < 0) {\r\n\t\tstartx += stepX\r\n\t}\r\n\tif (starty < 0) {\r\n\t\tstarty += stepY\r\n\t}\r\n\tif (this.showAxis) {\r\n\t\tcontext.beginPath()\r\n\t\tlet [scrCenterX, scrCenterY] = (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.worldToScreen)(\r\n\t\t\tcenterX,\r\n\t\t\tcenterY,\r\n\t\t\tscale,\r\n\t\t\tcanvasWidth,\r\n\t\t\tcanvasHeight,\r\n\t\t\t0, 0)\r\n\t\tcontext.lineWidth = 2\r\n\t\tcontext.moveTo(scrCenterX, 0)\r\n\t\tcontext.lineTo(scrCenterX, canvasHeight)\r\n\t\tcontext.moveTo(0, scrCenterY)\r\n\t\tcontext.lineTo(canvasWidth, scrCenterY)\r\n\t\tcontext.strokeStyle = 'rgba(0, 0, 0, 1.0)'\r\n\t\tcontext.stroke()\r\n\t}\r\n\r\n\tcontext.beginPath()\r\n\tfor (var x = startx; x <= canvasWidth; x += stepX) {\r\n\t\tcontext.moveTo(x, 0)\r\n\t\tcontext.lineTo(x, canvasHeight)\r\n\t\tif (!this.axisCords) continue;\r\n\t\tlet cordX = (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.screenToWorld)(\r\n\t\t\tcenterX,\r\n\t\t\tcenterY,\r\n\t\t\tscale,\r\n\t\t\tcanvasWidth,\r\n\t\t\tcanvasHeight,\r\n\t\t\tx,\r\n\t\t\t0\r\n\t\t)[0]\r\n\t\tthis.drawCod(cordX, 0, view, context)\r\n\t}\r\n\r\n\tfor (var y = starty; y <= canvasHeight; y += stepY) {\r\n\t\tcontext.moveTo(0, y)\r\n\t\tcontext.lineTo(canvasWidth, y)\r\n\t\tif (!this.axisCords) continue;\r\n\t\tlet cordY = (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.screenToWorld)(\r\n\t\t\tcenterX,\r\n\t\t\tcenterY,\r\n\t\t\tscale,\r\n\t\t\tcanvasWidth,\r\n\t\t\tcanvasHeight,\r\n\t\t\t0,\r\n\t\t\ty\r\n\t\t)[1]\r\n\t\tthis.drawCod(0, cordY, view, context)\r\n\t}\r\n\tcontext.lineWidth = 2\r\n\tcontext.strokeStyle = 'rgba(128, 128, 128, 0.5)'\r\n\tcontext.stroke()\r\n\tfor (var i = 0; i < this.devide - 1; i++) {\r\n\t\tvar startx = (startx + stepX / this.devide) % stepX\r\n\t\tvar starty = (starty + stepY / this.devide) % stepY\r\n\r\n\t\tcontext.beginPath()\r\n\t\tfor (var x = startx; x <= canvasWidth; x += stepX) {\r\n\t\t\tcontext.moveTo(x, 0)\r\n\t\t\tcontext.lineTo(x, canvasHeight)\r\n\t\t}\r\n\r\n\t\tfor (var y = starty; y <= canvasHeight; y += stepY) {\r\n\t\t\tcontext.moveTo(0, y)\r\n\t\t\tcontext.lineTo(canvasWidth, y)\r\n\t\t}\r\n\t\tcontext.lineWidth = 1\r\n\t\tcontext.strokeStyle = 'rgba(128, 128, 128, ' + (0,_math_vec__WEBPACK_IMPORTED_MODULE_1__.interpolate)(0.25, 0.5, gridScale - 1) + ')'\r\n\t\tcontext.stroke()\r\n\t}\r\n\tif (this.showCords) {\r\n\t\tcontext.font = '10px Arial'\r\n\t\tcontext.fillText(\r\n\t\t\t(Math.round(view.x * this.axisScale) / this.axisScale + Number.EPSILON) +\r\n\t\t\t',' + (Math.round(view.y * this.axisScale + Number.EPSILON) / this.axisScale) +\r\n\t\t\t',' + (Math.round(view.scale * this.axisScale + Number.EPSILON) / this.axisScale), 10, 50)\r\n\t}\r\n}\r\n\r\n\r\nGridPloter.prototype.drawCod = function (eX, eY, view, context) {\r\n\tconst { x: centerX, y: centerY, scale } = view\r\n\tvar canvasWidth = context.canvas.clientWidth\r\n\tvar canvasHeight = context.canvas.clientHeight\r\n\tconst canvasWidthHalf = canvasWidth / 2\r\n\tconst canvasHeightHalf = canvasHeight / 2\r\n\tvar x = (eX - centerX) * scale + canvasWidthHalf\r\n\tvar y = (eY - centerY) * scale + canvasHeightHalf\r\n\tlet outOfScreen = false\r\n\tif (x < 5 ||\r\n\t\tx > canvasWidth - 19 ||\r\n\t\ty > canvasHeight - 28 ||\r\n\t\ty < 14) {\r\n\t\toutOfScreen = true\r\n\t}\r\n\r\n\r\n\tif (x < 5) {\r\n\t\tx = 5\r\n\t}\r\n\tif (y < 14) {\r\n\t\ty = 14\r\n\t}\r\n\tif (x > canvasWidth - 19) {\r\n\t\tx = canvasWidth - 19\r\n\t}\r\n\tif (y > canvasHeight - 28) {\r\n\t\ty = canvasHeight - 28\r\n\t}\r\n\tcontext.font = '14px Verdana'\r\n\tcontext.fillStyle = 'rgb(0, 0, 0, 1.0)'\r\n\tfunction trimNum(value) {\r\n\t\treturn +parseFloat(value).toFixed(2)\r\n\t}\r\n\r\n\tlet text = \"\"\r\n\tlet ext = trimNum((eX / this.axisScale))\r\n\tlet eyt = trimNum((-eY / this.axisScale))\r\n\tif (ext) {\r\n\t\ttext += ext\r\n\t}\r\n\tif (eyt) {\r\n\t\ttext += eyt\r\n\t}\r\n\tif (!eyt && !ext && !outOfScreen) {\r\n\t\ttext += \"0\"\r\n\t}\r\n\r\n\tcontext.fillText(text, x + 5, y + 14)\r\n}\r\n\r\nGridPloter.prototype.line = function (startx, starty, sizex, sizey, color) {\r\n\tthis.context.lineWidth = 1\r\n\tthis.context.moveTo(startx, starty)\r\n\tthis.context.lineTo(startx + sizex, starty + sizey)\r\n\tthis.context.strokeStyle = color\r\n\tthis.context.stroke()\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridPloter);\n\n//# sourceURL=webpack://stellar2/../lib/ecs/drawers/drawGrid.js?");

/***/ }),

/***/ "../lib/ecs/drawers/drawMass.js":
/*!**************************************!*\
  !*** ../lib/ecs/drawers/drawMass.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _physics_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../physics/transform */ \"../lib/ecs/physics/transform.js\");\n/* harmony import */ var _imageData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imageData.js */ \"../lib/ecs/drawers/imageData.js\");\n\r\n\r\n\r\n\r\nconst squareDistance = (point, nodeB) => {\r\n\tvar square = 0\r\n\tfor (var i = 0; i < point.length; i++)\r\n\t\tsquare += Math.pow((point[i] - nodeB.positions[i]), 2)\r\n\treturn isNaN(square) || square < 1 ? 1 : square\r\n}\r\n\r\nvar COLORS = 16 * 16\r\n\r\nfunction MassPloter(context, manager) {\r\n\tthis.context = context\r\n\tthis.imgData = new _imageData_js__WEBPACK_IMPORTED_MODULE_2__.ImageDataPloter(context, manager)\r\n\tthis.manager = manager\r\n}\r\n\r\nMassPloter.prototype.update = function () {\r\n\tthis.imgData.update()\r\n}\r\n\r\nMassPloter.prototype.draw = function (view) {\r\n\tconst { x: centerX, y: centerY, scale } = view\r\n\tconst { context } = this\r\n\tvar canvasWidth = context.canvas.clientWidth\r\n\tvar canvasHeight = context.canvas.clientHeight\r\n\tconst canvasWidthHalf = canvasWidth / 2\r\n\tconst canvasHeightHalf = canvasHeight / 2\r\n\tconst stepX = 2\r\n\tconst stepY = 2\r\n\tconst halfStepX = stepX / 2\r\n\tconst halfStepY = stepY / 2\r\n\tvar startx = (centerX + canvasWidthHalf) % stepX\r\n\tvar starty = (centerY + canvasHeightHalf) % stepY\r\n\tvar inverseScale = stepY / scale\r\n\tconst points = this.manager.getEnities(_physics_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics).map(\r\n\t\t(elem) => {\r\n\t\t\tvar physics = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem)[0]\r\n\t\t\tvar transform = this.manager.get(_physics_transform__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0]\r\n\t\t\treturn {\r\n\t\t\t\tmass: physics.mass,\r\n\t\t\t\tpositions: transform.positions\r\n\t\t\t}\r\n\t\t})\r\n\tthis.imgData.pull()\r\n\tfor (var x = startx; x <= canvasWidth; x += stepX) {\r\n\t\tvar realX = (x - canvasWidthHalf) / scale + centerX\r\n\t\tvar realY = (starty - canvasHeightHalf) / scale + centerY\r\n\t\tfor (var y = starty; y <= canvasHeight; y += stepY) {\r\n\t\t\tvar sum = 0\r\n\t\t\tvar pointsLength = points.length\r\n\t\t\tfor (var i = 0; i < pointsLength; i++) {\r\n\t\t\t\tvar point = points[i]\r\n\t\t\t\tsum += 3000 * point.mass / squareDistance([realX, realY], point)\r\n\t\t\t}\r\n\t\t\tvar colorMin2 = Math.min(sum / 16.0, COLORS - 1)\r\n\t\t\tvar colorMin = Math.max(Math.min(sum, COLORS - 1) - colorMin2 * colorMin2 * 0.3, 0)\r\n\t\t\tthis.imgData.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [colorMin2, 0, colorMin])\r\n\t\t\trealY += inverseScale\r\n\t\t}\r\n\t}\r\n\tcontext.putImageData(this.imgData.img, 0, 0)\r\n}\r\n\r\nMassPloter.prototype.imgRect = function (x, y, width, height, color) {\r\n\r\n\tconst realWidth = Math.max(Math.min(width, this.context.canvas.clientWidth - x), 0)\r\n\tconst realHeight = Math.max(Math.min(height, this.context.canvas.clientHeight - y), 0)\r\n\tconst realX = Math.max(Math.round(x), 0)\r\n\tconst realY = Math.max(Math.round(y), 0)\r\n\tconst data = this.img.data\r\n\tconst startX = realX * 4\r\n\tconst endX = realWidth * 4 + startX\r\n\tconst rowLength = this.context.canvas.clientWidth * 4\r\n\tconst startY = realY * rowLength\r\n\tconst endY = realHeight * rowLength + startY\r\n\tfor (var i = startY; i < endY; i += rowLength) {\r\n\t\tfor (var j = startX; j < endX; j += 4) {\r\n\t\t\tvar ij = i + j\r\n\t\t\tdata[ij] = color[0]\r\n\t\t\tdata[ij + 1] = color[1]\r\n\t\t\tdata[ij + 2] = color[2]\r\n\t\t\tdata[ij + 3] = color[3]\r\n\t\t}\r\n\t}\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MassPloter);\n\n//# sourceURL=webpack://stellar2/../lib/ecs/drawers/drawMass.js?");

/***/ }),

/***/ "../lib/ecs/drawers/imageData.js":
/*!***************************************!*\
  !*** ../lib/ecs/drawers/imageData.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ImageDataPloter\": () => (/* binding */ ImageDataPloter)\n/* harmony export */ });\n/* harmony import */ var _math_vec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/vec.js */ \"../lib/math/vec.js\");\n\n\nconst distance = (point, pointB) => {\n    var square = 0\n    for (var i = 0; i < point.length; i++)\n        square += (point[i] - pointB[i]) * (point[i] - pointB[i])\n    return isNaN(square) || square < 1 ? 1 : Math.sqrt(square)\n}\n\nfunction ImageDataPloter(context, manager) {\n    this.context = context\n    this.update();\n    this.manager = manager\n}\n\nImageDataPloter.prototype.update = function () {\n    this.width = this.context.canvas.clientWidth\n    this.height = this.context.canvas.clientHeight\n    this.img = this.context.createImageData(this.width, this.height)\n}\nImageDataPloter.prototype.pull = function () {\n    this.img = this.context.getImageData(0, 0,\n        this.width, this.height)\n}\n\nImageDataPloter.prototype.imgRect = function (x, y, width, height, color) {\n    if (color[3] == undefined) {\n        color.push(Math.min(distance(color, [0, 0, 0]) * 2, 255))\n    }\n\n    const realWidth = Math.max(Math.min(width, this.width - x), 0)\n    const realHeight = Math.max(Math.min(height, this.height - y), 0)\n    const realX = Math.max(Math.round(x), 0)\n    const realY = Math.max(Math.round(y), 0)\n    const data = this.img.data\n    const startX = realX * 4\n    const endX = realWidth * 4 + startX\n    const rowLength = this.width * 4\n    const startY = realY * rowLength\n    const endY = realHeight * rowLength + startY\n    const over = color[3] / 255\n    for (var i = startY; i < endY; i += rowLength) {\n        for (var j = startX; j < endX; j += 4) {\n            var ij = i + j\n            data[ij] = (0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.interpolate)(data[ij], color[0], over)\n            data[ij + 1] = (0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.interpolate)(data[ij + 1], color[1], over)\n            data[ij + 2] = (0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.interpolate)(data[ij + 2], color[2], over)\n            data[ij + 3] = Math.max(color[3], data[ij + 3])\n        }\n    }\n}\n\n//# sourceURL=webpack://stellar2/../lib/ecs/drawers/imageData.js?");

/***/ }),

/***/ "../lib/ecs/drawers/ploter.js":
/*!************************************!*\
  !*** ../lib/ecs/drawers/ploter.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _math_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/view */ \"../lib/math/view.js\");\n\r\n\r\nfunction Ploter(canvas) {\r\n\tthis.canvas = canvas\r\n\tthis.context = this.canvas.getContext('2d', { willReadFrequently: true })\r\n\tthis.img = this.context.createImageData(this.canvas.width, this.canvas.height)\r\n}\r\n\r\nPloter.prototype.clear = function () {\r\n\tthis.context.clearRect(0, 0, this.canvas.width, this.canvas.height)\r\n}\r\n\r\nPloter.prototype.getCanvas = function () {\r\n\treturn this.canvas\r\n}\r\n\r\nPloter.prototype.worldToScreen = function (view, point) {\r\n\tconst { width: canvasWidth, height: canvasHeight } = this.canvas\r\n\tconst { x: centerX, y: centerY, scale } = view\r\n\treturn (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.worldToScreen)(\r\n\t\tcenterX,\r\n\t\tcenterY,\r\n\t\tscale,\r\n\t\tcanvasWidth,\r\n\t\tcanvasHeight,\r\n\t\tpoint[0],\r\n\t\tpoint[1]\r\n\t)\r\n}\r\n\r\nPloter.prototype.screenToWorld = function (view, point) {\r\n\tconst { width: canvasWidth, height: canvasHeight } = this.canvas\r\n\tconst { x: centerX, y: centerY, scale } = view\r\n\treturn (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.screenToWorld)(\r\n\t\tcenterX,\r\n\t\tcenterY,\r\n\t\tscale,\r\n\t\tcanvasWidth,\r\n\t\tcanvasHeight,\r\n\t\tpoint[0],\r\n\t\tpoint[1]\r\n\t)\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ploter);\n\n//# sourceURL=webpack://stellar2/../lib/ecs/drawers/ploter.js?");

/***/ }),

/***/ "../lib/ecs/drawers/render.js":
/*!************************************!*\
  !*** ../lib/ecs/drawers/render.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RenderEngine\": () => (/* binding */ RenderEngine),\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _physics_transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/transform.js */ \"../lib/ecs/physics/transform.js\");\n/* harmony import */ var _shapes_box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shapes/box.js */ \"../lib/shapes/box.js\");\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _shapes_text_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shapes/text.js */ \"../lib/shapes/text.js\");\n/* harmony import */ var _shapes_sprite_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shapes/sprite.js */ \"../lib/shapes/sprite.js\");\n/* harmony import */ var _shapes_rounded_box_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shapes/rounded-box.js */ \"../lib/shapes/rounded-box.js\");\n/* harmony import */ var _physics_transformRotate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../physics/transformRotate.js */ \"../lib/ecs/physics/transformRotate.js\");\n/* harmony import */ var _shapes_noScale_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shapes/noScale.js */ \"../lib/shapes/noScale.js\");\n/* harmony import */ var _shapes_scale_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shapes/scale.js */ \"../lib/shapes/scale.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction Renderer(color, stroke, layer) {\r\n\tthis.color = color\r\n\tthis.stroke = stroke\r\n\tthis.layer = layer || 0\r\n}\r\n\r\nfunction RenderEngine(context, manager) {\r\n\tthis.context = context\r\n\tthis.manager = manager\r\n\tthis.maxSize = 100\r\n}\r\n\r\nfunction shapeDone(context, renderer) {\r\n\tif (renderer.color) {\r\n\t\tcontext.fillStyle = renderer.color;\r\n\t\tcontext.fill()\r\n\t}\r\n\tif (renderer.stroke) {\r\n\t\tcontext.strokeStyle = renderer.stroke.color;\r\n\t\tcontext.lineWidth = renderer.stroke.width;\r\n\t\tcontext.stroke()\r\n\t}\r\n}\r\n\r\nfunction roundedRect(context, x, y, width, height, radius) {\r\n\tcontext.moveTo(x, y + radius);\r\n\tcontext.lineTo(x, y + height - radius);\r\n\tcontext.arcTo(x, y + height, x + radius, y + height, radius);\r\n\tcontext.lineTo(x + width - radius, y + height);\r\n\tcontext.arcTo(x + width, y + height, x + width, y + height - radius, radius);\r\n\tcontext.lineTo(x + width, y + radius);\r\n\tcontext.arcTo(x + width, y, x + width - radius, y, radius);\r\n\tcontext.lineTo(x + radius, y);\r\n\tcontext.arcTo(x, y, x, y + radius, radius);\r\n}\r\n\r\nRenderEngine.prototype.draw = function (view) {\r\n\tconst { context } = this\r\n\tvar canvasWidth = context.canvas.clientWidth\r\n\tvar canvasHeight = context.canvas.clientHeight\r\n\tconst { x: centerX, y: centerY, scale, angle } = view\r\n\tconst canvasWidthHalf = canvasWidth / 2\r\n\tconst canvasHeightHalf = canvasHeight / 2\r\n\tconst maxSize = this.maxSize * scale;\r\n\tif (angle) {\r\n\t\tcontext.save();\r\n\t\tcontext.translate(canvasWidthHalf, canvasHeightHalf);\r\n\t\tcontext.rotate(angle);\r\n\t\tcontext.translate(-canvasWidthHalf, -canvasHeightHalf);\r\n\t}\r\n\tthis.manager.getEnities(Renderer).map(elem => {\r\n\t\tvar renderer = this.manager.get(Renderer, elem)[0]\r\n\t\treturn [elem, renderer]\r\n\t}).sort(([, a], [, b]) => {\r\n\t\tif (a.layer < b.layer) {\r\n\t\t\treturn -1;\r\n\t\t}\r\n\t\tif (a.layer > b.layer) {\r\n\t\t\treturn 1;\r\n\t\t}\r\n\t\t// a must be equal to b\r\n\t\treturn 0;\r\n\t}\r\n\t).map(\r\n\t\t([elem, renderer]) => {\r\n\t\t\tvar transform = this.manager.get(_physics_transform_js__WEBPACK_IMPORTED_MODULE_0__.Transform, elem)[0]\r\n\t\t\tvar x = (transform.positions[0] - centerX) * scale + canvasWidthHalf\r\n\t\t\tvar y = (transform.positions[1] - centerY) * scale + canvasHeightHalf\r\n\t\t\tif (x < -maxSize || y < -maxSize || x > canvasWidth || y > canvasHeight)\r\n\t\t\t\treturn\r\n\r\n\t\t\tlet fixed = this.manager.get(_shapes_noScale_js__WEBPACK_IMPORTED_MODULE_7__.ShapeNoScale, elem)[0]\r\n\t\t\tlet selfScale = this.manager.get(_shapes_scale_js__WEBPACK_IMPORTED_MODULE_8__.ShapeScale, elem)[0]\r\n\t\t\tlet scaleWith = fixed ? 1 : scale * (selfScale?.scale || 1)\r\n\r\n\t\t\tlet circles = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_2__.ShapeCircle, elem)\r\n\t\t\tfor (let i in circles) {\r\n\t\t\t\tlet circle = circles[i];\r\n\t\t\t\tconst elementSize = circle.radius * scaleWith > 1 ? circle.radius * scaleWith : 1\r\n\t\t\t\tcontext.beginPath()\r\n\t\t\t\tcontext.arc(x, y, elementSize, 0, 2 * Math.PI, false)\r\n\t\t\t\tshapeDone(context, renderer);\r\n\t\t\t}\r\n\t\t\tlet boxes = this.manager.get(_shapes_box_js__WEBPACK_IMPORTED_MODULE_1__.ShapeBox, elem)\r\n\t\t\tlet rounded = this.manager.get(_shapes_rounded_box_js__WEBPACK_IMPORTED_MODULE_5__.ShapeRounded, elem)\r\n\t\t\tlet rotate = this.manager.get(_physics_transformRotate_js__WEBPACK_IMPORTED_MODULE_6__.TransformRotate, elem)[0]\r\n\t\t\tfor (let i in boxes) {\r\n\t\t\t\tlet box = boxes[i];\r\n\t\t\t\tconst size_x = box.x * scaleWith > 1 ? box.x * scaleWith : 1\r\n\t\t\t\tconst size_y = box.y * scaleWith > 1 ? box.y * scaleWith : 1\r\n\t\t\t\tcontext.save();\r\n\t\t\t\tif (rotate) {\r\n\t\t\t\t\tcontext.translate(x + size_x / 2, y + size_y / 2);\r\n\t\t\t\t\tcontext.rotate(rotate.rotate);\r\n\t\t\t\t\tcontext.translate(-x - size_x / 2, -y - size_y / 2);\r\n\t\t\t\t}\r\n\t\t\t\tcontext.beginPath();\r\n\t\t\t\tif (rounded[0]) {\r\n\t\t\t\t\troundedRect(context, x, y, size_x, size_y, rounded[0].radius)\r\n\t\t\t\t}\r\n\t\t\t\telse {\r\n\t\t\t\t\tcontext.rect(x, y, size_x, size_y);\r\n\t\t\t\t}\r\n\t\t\t\tshapeDone(context, renderer);\r\n\t\t\t\tcontext.restore();\r\n\t\t\t}\r\n\t\t\tlet sprites = this.manager.get(_shapes_sprite_js__WEBPACK_IMPORTED_MODULE_4__.Sprite, elem)\r\n\t\t\tfor (let i in sprites) {\r\n\t\t\t\tlet sprite = sprites[i];\r\n\t\t\t\tlet box = boxes[0];\r\n\t\t\t\tlet spriteWith = box?.x || sprite.image.width\r\n\t\t\t\tlet spriteHeight = box?.x || sprite.image.height\r\n\t\t\t\tconst size_x = spriteWith * scaleWith > 1 ? spriteWith * scaleWith + 0.5 : 1\r\n\t\t\t\tconst size_y = spriteHeight * scaleWith > 1 ? spriteHeight * scaleWith + 0.5 : 1\r\n\t\t\t\tcontext.save();\r\n\t\t\t\tif (rotate) {\r\n\t\t\t\t\tcontext.translate(x + size_x / 2, y + size_y / 2);\r\n\t\t\t\t\tcontext.rotate(rotate.rotate);\r\n\t\t\t\t\tcontext.translate(-x - size_x / 2, -y - size_y / 2);\r\n\t\t\t\t}\r\n\t\t\t\tcontext.drawImage(sprite.image, x, y, size_x, size_y);\r\n\t\t\t\tcontext.restore();\r\n\t\t\t}\r\n\t\t\tlet texts = this.manager.get(_shapes_text_js__WEBPACK_IMPORTED_MODULE_3__.ShapeText, elem)\r\n\t\t\tfor (let i in texts) {\r\n\t\t\t\tlet text = texts[i]\r\n\t\t\t\tconst size_y = text.font * scaleWith > 1 ? text.font * scaleWith : 1\r\n\t\t\t\tcontext.fillStyle = renderer.color;\r\n\t\t\t\tcontext.font = parseInt(size_y) + 'px serif';\r\n\t\t\t\tcontext.save();\r\n\t\t\t\tif (rotate) {\r\n\t\t\t\t\tcontext.translate(x, y);\r\n\t\t\t\t\tcontext.rotate(rotate.rotate);\r\n\t\t\t\t\tcontext.translate(-x, -y);\r\n\t\t\t\t}\r\n\t\t\t\tcontext.fillText(text.text, x, y + parseInt(size_y));\r\n\t\t\t\tcontext.restore();\r\n\t\t\t}\r\n\t\t}\r\n\t)\r\n\tif (angle) {\r\n\t\tcontext.restore()\r\n\t}\r\n}\r\nRenderEngine.prototype.mesure = function (text) {\r\n\tconst { context } = this\r\n\tcontext.font = parseInt(text.font) + 'px serif';\r\n\treturn context.measureText(text.text);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://stellar2/../lib/ecs/drawers/render.js?");

/***/ }),

/***/ "../lib/ecs/index.js":
/*!***************************!*\
  !*** ../lib/ecs/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Entity\": () => (/* binding */ Entity),\n/* harmony export */   \"EntityManager\": () => (/* binding */ EntityManager)\n/* harmony export */ });\nconst ENTITY_INDEX_BITS = 22\r\nconst ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1\r\n\r\nconst ENTITY_GENERATION_BITS = 8\r\nconst ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1\r\nconst MINIMUM_FREE_INDICES = 0\r\n\r\nfunction Entity(id) {\r\n\tthis.id = id\r\n}\r\nEntity.prototype.index = function () {\r\n\treturn this.id & ENTITY_INDEX_MASK\r\n}\r\nEntity.prototype.generation = function () {\r\n\treturn (this.id >> ENTITY_INDEX_BITS) & ENTITY_GENERATION_MASK\r\n}\r\n\r\nfunction EntityManager() {\r\n\tthis._generation = {}\r\n\tthis._free_indices = []\r\n\tthis._entities = {}\r\n\tthis._components = {}\r\n\tthis.__entities_with_type = {}\r\n}\r\n\r\nEntityManager.prototype.create = function () {\r\n\tvar idx = 0\r\n\tif (this._free_indices.length > MINIMUM_FREE_INDICES) {\r\n\t\tidx = this._free_indices.shift()\r\n\t} else {\r\n\t\tidx = Object.keys(this._generation).length\r\n\t\tthis._generation[idx] = 0\r\n\t}\r\n\tvar entity = this.make_entity(idx, this._generation[idx])\r\n\tthis._entities[idx] = entity\r\n\treturn entity\r\n}\r\n\r\nEntityManager.prototype.make_entity = function (idx, generation) {\r\n\treturn new Entity(idx + (generation << ENTITY_INDEX_BITS))\r\n}\r\n\r\nEntityManager.prototype.alive = function (e) {\r\n\treturn this._generation[e.index()] == e.generation()\r\n}\r\n\r\nEntityManager.prototype.destroy = function (e) {\r\n\tthis._components[e.id] = undefined\r\n\tthis._entities[e.id] = undefined\r\n\t++this._generation[e.index()]\r\n\tthis._free_indices.push(e.index())\r\n}\r\n\r\nEntityManager.prototype.asign = function (component, e) {\r\n\tvar entity_components = this._components[e.id]\r\n\tif (!entity_components) {\r\n\t\tthis._components[e.id] = {\r\n\t\t\t[component.constructor.name]: [component]\r\n\t\t}\r\n\t\treturn\r\n\t}\r\n\tvar components_of_type = entity_components[component.constructor.name]\r\n\tif (!components_of_type) {\r\n\t\tthis._components[e.id][component.constructor.name] = [component]\r\n\t\treturn\r\n\t}\r\n\tif (components_of_type &&\r\n\t\tentity_components[component.constructor.name].find(comp => component === comp)\r\n\t)\r\n\t\tthrow Error('Component is allready asiged')\r\n\tentity_components[component.constructor.name].push(component)\r\n}\r\n\r\nEntityManager.prototype.get = function (c_type, e) {\r\n\tvar entity_components = this._components[e.id]\r\n\tif (!entity_components) {\r\n\t\treturn []\r\n\t}\r\n\tvar components_of_type = entity_components[c_type.name]\r\n\tif (!components_of_type) {\r\n\t\treturn []\r\n\t}\r\n\treturn components_of_type\r\n}\r\n\r\nEntityManager.prototype.remove = function (component, e) {\r\n\tvar entity_components = this._components[e.id]\r\n\tif (!entity_components) {\r\n\t\treturn\r\n\t}\r\n\tvar components_of_type = entity_components[component.constructor.name]\r\n\tif (!components_of_type) {\r\n\t\treturn\r\n\t}\r\n\tentity_components[component.constructor.name] = entity_components[component.constructor.name].filter(function (compon) {\r\n\t\treturn compon !== component\r\n\t})\r\n}\r\n\r\nEntityManager.prototype.getEnities = function (c_type) {\r\n\treturn Object.values(this._entities).filter(\r\n\t\t(entity) => {\r\n\t\t\treturn entity && this.get(c_type, entity).length\r\n\t\t}\r\n\t)\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://stellar2/../lib/ecs/index.js?");

/***/ }),

/***/ "../lib/ecs/physics/chainEngine.js":
/*!*****************************************!*\
  !*** ../lib/ecs/physics/chainEngine.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ChainEngine\": () => (/* binding */ ChainEngine),\n/* harmony export */   \"ChainLink\": () => (/* binding */ ChainLink)\n/* harmony export */ });\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ \"../lib/ecs/physics/transform.js\");\n\r\n\r\n\r\nfunction ChainLink(connects, distance) {\r\n\tthis.connects = connects\r\n\tthis.distance = distance\r\n}\r\n\r\nfunction computeChainForce(\r\n\tnaibor,\r\n\ttransform,\r\n) {\r\n\tvar ret = [0, 0]\r\n\tnaibor.forEach(({ transform: naiborTranform, distance: naiborDistance }) => {\r\n\t\tvar distanceX = (naiborTranform.positions[0] - transform.positions[0])\r\n\t\tvar distanceY = (naiborTranform.positions[1] - transform.positions[1])\r\n\t\tvar distanceAngle = Math.atan2(distanceY, distanceX)\r\n\t\tvar distance = Math.sqrt(\r\n\t\t\tdistanceX * distanceX\r\n\t\t\t+ distanceY * distanceY)\r\n\t\tvar distanceNormalised = distance / naiborDistance\r\n\t\tvar forceIntencity = (Math.atan((distanceNormalised - 1) * 5) + Math.pow(distanceNormalised - 1, 3))\r\n\t\tvar forceComponents = {\r\n\t\t\tx: Math.cos(distanceAngle) * forceIntencity,\r\n\t\t\ty: Math.sin(distanceAngle) * forceIntencity\r\n\t\t}\r\n\t\tret[0] += forceComponents.x\r\n\t\tret[1] += forceComponents.y\r\n\t})\r\n\treturn ret\r\n}\r\n\r\nfunction ChainEngine(manager) {\r\n\tthis.manager = manager\r\n\r\n}\r\n\r\nChainEngine.prototype.compute = function () {\r\n\tthis.manager.getEnities(ChainLink).map(\r\n\t\t(elem) => {\r\n\t\t\tvar chainLinks = this.manager.get(ChainLink, elem)\r\n\t\t\tvar naibor = chainLinks.map(link => ({ transform: this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__.Transform, link.connects)[0], distance: link.distance }))\r\n\t\t\tvar transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0]\r\n\t\t\tvar physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem)[0]\r\n\t\t\tvar force = computeChainForce(\r\n\t\t\t\tnaibor,\r\n\t\t\t\ttransform\r\n\t\t\t)\r\n\t\t\tphysics.applyForce(force)\r\n\t\t}\r\n\t)\r\n}\r\n\r\n\n\n//# sourceURL=webpack://stellar2/../lib/ecs/physics/chainEngine.js?");

/***/ }),

/***/ "../lib/ecs/physics/gravityEngine.js":
/*!*******************************************!*\
  !*** ../lib/ecs/physics/gravityEngine.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GravityEngine\": () => (/* binding */ GravityEngine)\n/* harmony export */ });\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ \"../lib/ecs/physics/transform.js\");\n\r\n\r\n\r\nfunction GravityEngine(manager, interaction) {\r\n\tthis.manager = manager\r\n\tthis.interaction = interaction ? interaction : 0.1\r\n}\r\n\r\nfunction computeAttraction(\r\n\tcompute,\r\n\tnaibors,\r\n\tinteraction\r\n) {\r\n\tvar ret = [0, 0]\r\n\tnaibors.forEach(element => {\r\n\t\tif (element == compute) return\r\n\t\tvar distanceX = (element.positions[0] - compute.positions[0])\r\n\t\tvar distanceY = (element.positions[1] - compute.positions[1])\r\n\r\n\t\tvar distance2 = distanceX * distanceX + distanceY * distanceY\r\n\t\tvar distance = Math.sqrt(distance2)\r\n\r\n\t\tvar ascIntencity = element.mass / distance2 * interaction\r\n\t\tret[0] += distanceX / distance * ascIntencity\r\n\t\tret[1] += distanceY / distance * ascIntencity\r\n\t})\r\n\treturn ret\r\n}\r\n\r\nGravityEngine.prototype.compute = function () {\r\n\r\n\tvar physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics)\r\n\t\t.map((elem) => {\r\n\t\t\tvar physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem)[0]\r\n\t\t\tvar transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0]\r\n\t\t\treturn {\r\n\t\t\t\te: elem,\r\n\t\t\t\tmass: physics.mass,\r\n\t\t\t\tphysics,\r\n\t\t\t\tpositions: transform.positions\r\n\t\t\t}\r\n\t\t})\r\n\r\n\tfor (var i = 0; i < physic_entity.length; i++) {\r\n\t\tvar elem = physic_entity[i]\r\n\t\tvar asc = computeAttraction(\r\n\t\t\telem,\r\n\t\t\tphysic_entity, this.interaction)\r\n\t\telem.physics.applyAsc(asc)\r\n\t}\r\n}\r\n\r\n\n\n//# sourceURL=webpack://stellar2/../lib/ecs/physics/gravityEngine.js?");

/***/ }),

/***/ "../lib/ecs/physics/physics.js":
/*!*************************************!*\
  !*** ../lib/ecs/physics/physics.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Physics\": () => (/* binding */ Physics),\n/* harmony export */   \"PhysicsEngine\": () => (/* binding */ PhysicsEngine)\n/* harmony export */ });\n/* harmony import */ var _shapes_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/vector */ \"../lib/shapes/vector.js\");\n/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ \"../lib/ecs/physics/transform.js\");\n\r\n\r\nfunction Physics(speeds, mass, drag) {\r\n\tthis.speeds = new _shapes_vector__WEBPACK_IMPORTED_MODULE_0__.Vector(speeds)\r\n\tthis.mass = mass\r\n\tthis.drag = isNaN(drag) ? 0.001 : drag\r\n\tthis.maxSpeed = 100\r\n}\r\n\r\n\r\nPhysics.prototype.applyForce = function (force) {\r\n\tfor (var i = 0; i < this.speeds.length; i++) {\r\n\t\tif (isNaN(force[i])) throw new Error(\"Physics.prototype.applyForce got NnN\")\r\n\t\tthis.speeds[i] += force[i] / this.mass\r\n\t}\r\n}\r\n\r\nPhysics.prototype.applyAsc = function (asc) {\r\n\tfor (var i = 0; i < this.speeds.length; i++) {\r\n\t\tif (isNaN(asc[i])) throw new Error(\"Physics.prototype.applyAsc got NnN\")\r\n\t\tthis.speeds[i] += asc[i]\r\n\t}\r\n}\r\n\r\nPhysics.prototype.compute = function () {\r\n\tvar speedValue = 0\r\n\tvar i\r\n\tfor (i = 0; i < this.speeds.length; i++) {\r\n\t\tspeedValue += this.speeds[i] * this.speeds[i]\r\n\t}\r\n\r\n\tvar speedMultipliyer = Math.min(1 - this.drag, this.maxSpeed / speedValue)\r\n\r\n\tfor (i = 0; i < this.speeds.length; i++) {\r\n\t\tthis.speeds[i] *= speedMultipliyer\r\n\t}\r\n}\r\n\r\nfunction PhysicsEngine(manager, engines) {\r\n\tthis.manager = manager\r\n\tthis.engines = engines\r\n}\r\n\r\nPhysicsEngine.prototype.compute = function () {\r\n\tthis.engines.forEach(engine => engine.compute())\r\n\tthis.manager.getEnities(Physics).forEach(elem => {\r\n\t\tvar physics = this.manager.get(Physics, elem)[0]\r\n\t\tphysics.compute()\r\n\t\tvar transform = this.manager.get(_transform__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0]\r\n\t\ttransform.positions = transform.positions.add(physics.speeds)\r\n\t})\r\n}\r\n\r\n\n\n//# sourceURL=webpack://stellar2/../lib/ecs/physics/physics.js?");

/***/ }),

/***/ "../lib/ecs/physics/plasticColisionEngine.js":
/*!***************************************************!*\
  !*** ../lib/ecs/physics/plasticColisionEngine.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PlasticBody\": () => (/* binding */ PlasticBody),\n/* harmony export */   \"PlasticColisionEngine\": () => (/* binding */ PlasticColisionEngine)\n/* harmony export */ });\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transform.js */ \"../lib/ecs/physics/transform.js\");\n\r\n\r\n\r\n\r\n\r\nfunction PlasticBody() { }\r\n\r\nfunction PlasticColisionEngine(manager) {\r\n\tthis.manager = manager\r\n\tthis.physic_entity = null\r\n}\r\n\r\nfunction squareDistance(nodeA, nodeB) {\r\n\tvar square = 0\r\n\tfor (var i = 0; i < nodeA.positions.length; i++)\r\n\t\tsquare += Math.pow((nodeA.positions[i] - nodeB.positions[i]), 2)\r\n\treturn square\r\n}\r\n\r\nfunction computeColision(\r\n\tcompute,\r\n\tnaibors\r\n) {\r\n\tvar collisions = []\r\n\tnaibors.forEach(element => {\r\n\t\tif (element == compute) return\r\n\t\tvar distanceX = (element.positions[0] - compute.positions[0])\r\n\t\tvar distanceY = (element.positions[1] - compute.positions[1])\r\n\t\tvar centerDistance = compute.radius + element.radius\r\n\t\tif (Math.abs(distanceX) > centerDistance || Math.abs(distanceY) > centerDistance)\r\n\t\t\treturn\r\n\r\n\t\tvar distance2 = squareDistance(compute, element)\r\n\t\tif (distance2 > Math.pow(centerDistance, 2))\r\n\t\t\treturn\r\n\t\tif (compute.radius > element.radius)\r\n\t\t\tcollisions.push(element)\r\n\t})\r\n\treturn collisions\r\n}\r\n\r\nPlasticColisionEngine.prototype.compute = function () {\r\n\r\n\tvar physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics).filter(elem =>\r\n\t\tthis.manager.get(PlasticBody, elem)[0]\r\n\t).map((elem) => {\r\n\t\tvar circle = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__.ShapeCircle, elem)[0]\r\n\t\tvar transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_2__.Transform, elem)[0]\r\n\t\tvar physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics, elem)[0]\r\n\t\treturn {\r\n\t\t\te: elem,\r\n\t\t\tradius: circle.radius,\r\n\t\t\tcircle,\r\n\t\t\tpositions: transform.positions,\r\n\t\t\tspeeds: physics.speeds,\r\n\t\t\tphysics\r\n\t\t}\r\n\t})\r\n\r\n\tfor (var i = 0; i < physic_entity.length; i++) {\r\n\r\n\t\tvar elem = physic_entity[i]\r\n\t\tif (!this.manager.alive(elem.e))\r\n\t\t\tcontinue\r\n\t\tvar colisions = computeColision(\r\n\t\t\telem,\r\n\t\t\tphysic_entity)\r\n\t\tfor (var collisionIndex in colisions) {\r\n\t\t\tvar collision = colisions[collisionIndex]\r\n\t\t\tif (!this.manager.alive(collision.e))\r\n\t\t\t\tcontinue\r\n\t\t\tthis.manager.destroy(collision.e)\r\n\t\t\tthis.merge(elem, collision)\r\n\t\t}\r\n\t}\r\n}\r\n\r\nPlasticColisionEngine.prototype.merge = function (nodeA, nodeB) {\r\n\tvar cubeRadiusA = Math.pow(nodeA.radius, 3);\r\n\tvar cubeRadiusB = Math.pow(nodeB.radius, 3);\r\n\tvar newRadious = Math.cbrt(cubeRadiusA + cubeRadiusB);\r\n\r\n\tnodeA.circle.radius = newRadious\r\n\tvar massA = nodeA.physics.mass\r\n\tvar massB = nodeB.physics.mass\r\n\tnodeA.physics.mass = massA + massB\r\n\r\n\tfor (var i = 0; i < nodeA.speeds.length; i++) {\r\n\t\tnodeA.speeds[i] = (nodeA.speeds[i] * massA + nodeB.speeds[i] * massB) / (massA + massB)\r\n\t}\r\n}\r\n\r\n\n\n//# sourceURL=webpack://stellar2/../lib/ecs/physics/plasticColisionEngine.js?");

/***/ }),

/***/ "../lib/ecs/physics/transform.js":
/*!***************************************!*\
  !*** ../lib/ecs/physics/transform.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Transform\": () => (/* binding */ Transform)\n/* harmony export */ });\n/* harmony import */ var _shapes_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/vector */ \"../lib/shapes/vector.js\");\n\r\n\r\nfunction Transform(positions) {\r\n\tthis.positions = new _shapes_vector__WEBPACK_IMPORTED_MODULE_0__.Vector(positions)\r\n}\r\n\r\n\n\n//# sourceURL=webpack://stellar2/../lib/ecs/physics/transform.js?");

/***/ }),

/***/ "../lib/ecs/physics/transformRotate.js":
/*!*********************************************!*\
  !*** ../lib/ecs/physics/transformRotate.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TransformRotate\": () => (/* binding */ TransformRotate)\n/* harmony export */ });\n/* harmony import */ var _shapes_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/vector */ \"../lib/shapes/vector.js\");\n\r\n\r\nfunction TransformRotate(rotate) {\r\n\tthis.rotate = rotate\r\n}\r\n\n\n//# sourceURL=webpack://stellar2/../lib/ecs/physics/transformRotate.js?");

/***/ }),

/***/ "../lib/fe/touch.js":
/*!**************************!*\
  !*** ../lib/fe/touch.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// written by Slobodan Zivkovic slobacartoonac@gmail.com\r\nfunction distance2d(a, b) {\r\n\treturn Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))\r\n}\r\n\r\nfunction len2d(a) {\r\n\treturn Math.sqrt(a.x * a.x + a.y * a.y)\r\n}\r\n\r\nfunction getDelta(p1, n1, p2, n2) {\r\n\tif (!n2) {\r\n\t\treturn { x: n1.x - p1.x, y: n1.y - p1.y }\r\n\t}\r\n\treturn { x: ((n1.x - p1.x) + (n2.x - p2.x)) / 2, y: ((n1.y - p1.y) + (n2.y - p2.y)) / 2 }\r\n}\r\n\r\nfunction getZoom(p1, n1, p2, n2) {\r\n\tif (!n2) {\r\n\t\treturn 1\r\n\t}\r\n\tif (!p2) {\r\n\t\treturn 1\r\n\t}\r\n\tlet initialDistance = distance2d(p1, p2);\r\n\tlet newDistance = distance2d(n1, n2);\r\n\tif (initialDistance < 0.01)\r\n\t\treturn 1\r\n\telse\r\n\t\treturn newDistance / initialDistance\r\n}\r\n\r\nfunction getAngleDelta(p1, n1, p2, n2) {\r\n\tif (!n2) {\r\n\t\treturn 0\r\n\t}\r\n\tlet angle1 = getAngle(p1, p2)\r\n\tlet angle2 = getAngle(n1, n2)\r\n\treturn angle2 - angle1\r\n}\r\n\r\nfunction getAngle(p1, n1) {\r\n\tlet delta = getDelta(p1, n1)\r\n\tlet angle = Math.atan2(delta.y, delta.x)\r\n\treturn angle\r\n}\r\n\r\nfunction Touch(div, deadzone) {\r\n\tthis.deadzone = deadzone\r\n\tthis.clear()\r\n\tlet startPosition = null\r\n\tlet startMoveSecound = null\r\n\tlet position = null\r\n\tlet thisMoveSecound = null\r\n\tlet mouseDown = 0;\r\n\tlet click = true;\r\n\tlet touch = false;\r\n\tlet touchSecound = false;\r\n\tthis.centerPosition = { x: 0, y: 0 };\r\n\tthis.debug = false;\r\n\tthis.console_error = false;\r\n\tthis.throw_error = false;\r\n\tthis.last_error = ''\r\n\tconst moveTouchT = (e) => {\r\n\t\te.preventDefault()\r\n\t\tconst { top, left } = e.target.getBoundingClientRect()\r\n\t\tif (e.touches[1] && e.touches[0]) {\r\n\t\t\tlet first = { x: e.touches[0].clientX - left, y: e.touches[0].clientY - top }\r\n\t\t\tlet secound = { x: e.touches[1].clientX - left, y: e.touches[1].clientY - top }\r\n\t\t\tthis.centerPosition = { x: (first.x + secound.x) / 2, y: (first.y + secound.y) / 2 }\r\n\t\t\treturn moveTouch(first, secound)\r\n\t\t}\r\n\t\tif (e.touches[0]) {\r\n\t\t\tlet first = { x: e.touches[0].clientX - left, y: e.touches[0].clientY - top }\r\n\t\t\tthis.centerPosition = { x: first.x, y: first.y }\r\n\t\t\treturn moveTouch(first)\r\n\t\t}\r\n\t}\r\n\tconst moveTouchM = (e) => {\r\n\t\te.preventDefault()\r\n\t\tconst { top, left } = e.target.getBoundingClientRect()\r\n\t\tthis.centerPosition = { x: e.clientX - left, y: e.clientY - top }\r\n\t\tif (mouseDown) moveTouch({ x: e.clientX - left, y: e.clientY - top })\r\n\t}\r\n\r\n\tconst moveTouch = (e, secound) => {\r\n\t\ttouch = true;\r\n\t\tif (startPosition == null) {\r\n\t\t\tstartPosition = { x: e.x, y: e.y }\r\n\t\t\tposition = { x: e.x, y: e.y }\r\n\t\t\tthis.triger('start', position)\r\n\t\t\tclick = true\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tif (secound && startMoveSecound == null) {\r\n\t\t\ttouchSecound = true;\r\n\t\t\tif (distance2d(startPosition, secound) < distance2d(startPosition, e)) {\r\n\t\t\t\t//switched touches\r\n\t\t\t\tstartPosition = { x: e.x, y: e.y };\r\n\t\t\t\tposition = { x: e.x, y: e.y };\r\n\t\t\t}\r\n\t\t\tstartMoveSecound = { x: secound.x, y: secound.y }\r\n\t\t\tthisMoveSecound = { x: secound.x, y: secound.y }\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tif (!secound && startMoveSecound) {\r\n\t\t\ttouchSecound = false;\r\n\t\t\tstartMoveSecound = null\r\n\t\t\tthisMoveSecound = null\r\n\t\t\treturn;\r\n\t\t}\r\n\r\n\r\n\t\tlet delta = getDelta(position, e, thisMoveSecound, secound)\r\n\t\tlet deltaZoom = getZoom(position, e, thisMoveSecound, secound)\r\n\t\tlet deltaAngle = getAngleDelta(position, e, thisMoveSecound, secound)\r\n\t\tposition = { x: e.x, y: e.y }\r\n\t\tthisMoveSecound = secound ? { x: secound.x, y: secound.y } : null\r\n\t\tlet direction = getDelta(startPosition, position, startMoveSecound, thisMoveSecound)\r\n\t\tlet zoom = getZoom(startPosition, position, startMoveSecound, thisMoveSecound)\r\n\t\tlet distance = len2d(direction)\r\n\t\tlet angle = getAngleDelta(startPosition, position, startMoveSecound, thisMoveSecound)\r\n\t\tlet debug = this.debug && `${startPosition && 'Start: ' + JSON.stringify(startPosition)},\r\n\t\t${position && 'This: ' + JSON.stringify(position)}, \r\n\t\t${startMoveSecound && 'Start secound: ' + JSON.stringify(startMoveSecound)}, \r\n\t\t${thisMoveSecound && 'Start this: ' + JSON.stringify(thisMoveSecound)},\r\n\t\t${delta && 'Delta: ' + JSON.stringify(delta)},\r\n\t\t${'Zoom: ' + zoom},\r\n\t\t${'DZoom: ' + deltaZoom}\r\n\t\t${'Angle: ' + angle}\r\n\t\t${'DAngle: ' + deltaAngle}\r\n\t\t${'isPrimary: ' + ((!touchSecound && mouseDown == 0) || mouseDown == 1)}\r\n\t\t${this.last_error}`\r\n\t\tlet addition = {\r\n\t\t\tdelta,\r\n\t\t\tdirection,\r\n\t\t\tstartPosition,\r\n\t\t\tposition,\r\n\t\t\tdistance,\r\n\t\t\tclick,\r\n\t\t\tisClick: click,\r\n\t\t\tmouseDown,\r\n\t\t\tzoom,\r\n\t\t\tdeltaZoom,\r\n\t\t\ttouchSecound,\r\n\t\t\tangle,\r\n\t\t\tdeltaAngle,\r\n\t\t\tisPrimary: ((!touchSecound && mouseDown == 0) || mouseDown == 1),\r\n\t\t\tdebug,\r\n\t\t\tcenterPosition: this.centerPosition\r\n\t\t}\r\n\r\n\t\tthis.triger('force', addition)\r\n\t\tif (distance > this.deadzone) {\r\n\t\t\tclick = false\r\n\t\t\tif (Math.abs(direction.x) > Math.abs(direction.y)) {\r\n\t\t\t\tif (direction.x > 0) {\r\n\t\t\t\t\tthis.triger('right', addition)\r\n\t\t\t\t} else {\r\n\t\t\t\t\tthis.triger('left', addition)\r\n\t\t\t\t}\r\n\t\t\t} else if (direction.y > 0) {\r\n\t\t\t\tthis.triger('down', addition)\r\n\t\t\t} else {\r\n\t\t\t\tthis.triger('up', addition)\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t//= {up:[],down:[],left:[],right:[],stop:[],click:[],force:[]}\r\n\tconst stopTouch = (e) => {\r\n\t\te.preventDefault()\r\n\t\tif (touch == false) {\r\n\t\t\treturn\r\n\t\t}\r\n\t\tlet delta = { x: 0, y: 0 }\r\n\t\tlet deltaZoom = 0\r\n\t\tlet deltaAngle = 0\r\n\t\tlet direction = getDelta(startPosition, position, startMoveSecound, thisMoveSecound)\r\n\t\tlet zoom = getZoom(startPosition, position, startMoveSecound, thisMoveSecound)\r\n\t\tlet angle = getAngleDelta(startPosition, position, startMoveSecound, thisMoveSecound)\r\n\t\tlet distance = len2d(direction)\r\n\t\tlet debug = this.debug && `${startPosition && 'Start: ' + JSON.stringify(startPosition)},\r\n\t\t${position && 'This: ' + JSON.stringify(position)}, \r\n\t\t${startMoveSecound && 'Start secound: ' + JSON.stringify(startMoveSecound)}, \r\n\t\t${thisMoveSecound && 'Start this: ' + JSON.stringify(thisMoveSecound)},\r\n\t\t${delta && 'Delta: ' + JSON.stringify(delta)},\r\n\t\t${'Zoom: ' + zoom},\r\n\t\t${'DZoom: ' + deltaZoom}\r\n\t\t${'Angle: ' + angle}\r\n\t\t${'DAngle: ' + deltaAngle}\r\n\t\t${'isPrimary: ' + ((!touchSecound && mouseDown == 0) || mouseDown == 1)}\r\n\t\t${this.last_error}`\r\n\t\tconst addition = {\r\n\t\t\tx: startPosition.x,\r\n\t\t\ty: startPosition.y,\r\n\t\t\tdelta,\r\n\t\t\tdirection,\r\n\t\t\tstartPosition,\r\n\t\t\tposition,\r\n\t\t\tdistance,\r\n\t\t\tclick,\r\n\t\t\tisClick: click,\r\n\t\t\tmouseDown,\r\n\t\t\tzoom,\r\n\t\t\tdeltaZoom,\r\n\t\t\ttouchSecound,\r\n\t\t\tangle,\r\n\t\t\tdeltaAngle,\r\n\t\t\tisPrimary: ((!touchSecound && mouseDown == 0) || mouseDown == 1),\r\n\t\t\tdebug,\r\n\t\t\tcenterPosition: this.centerPosition\r\n\t\t}\r\n\t\ttouch = false\r\n\t\ttouchSecound = false;\r\n\t\tlet saveMove = startPosition;\r\n\r\n\t\tif (click) {\r\n\t\t\tif (e.button) {\r\n\t\t\t\tif (e.button === 1) this.triger('bmiddle', addition)\r\n\t\t\t\tif (e.button === 2) this.triger('bright', addition)\r\n\t\t\t} else if (saveMove) {\r\n\t\t\t\tthis.triger('click', addition)\r\n\t\t\t}\r\n\t\t}\r\n\t\tthis.triger('stop', addition)\r\n\t\tstartPosition = null\r\n\t\tposition = null\r\n\t\tstartMoveSecound = null\r\n\t\tthisMoveSecound = null\r\n\t\tmouseDown = 0\r\n\t}\r\n\tdiv.addEventListener(\r\n\t\t'touchstart',\r\n\t\te => {\r\n\t\t\te.preventDefault()\r\n\t\t},\r\n\t\tfalse,\r\n\t)\r\n\tdiv.addEventListener('touchmove', moveTouchT, false)\r\n\tdiv.addEventListener('touchend', stopTouch, false)\r\n\tdiv.addEventListener('touchstart', moveTouchT, false)\r\n\tdiv.addEventListener('mouseleave', stopTouch, false)\r\n\tdiv.addEventListener('mousemove', moveTouchM)\r\n\tdiv.addEventListener('mouseup', stopTouch)\r\n\tdiv.addEventListener('mousedown', e => {\r\n\t\tmouseDown = 1 + e.button;\r\n\t\tmoveTouchM(e)\r\n\t})\r\n}\r\n/*eslint-disable */\r\nTouch.prototype.sub = function (ev, func) {\r\n\tif (this.events[ev]) this.events[ev].push(func)\r\n}\r\n\r\nTouch.prototype.onClick = function (func) {\r\n\tthis.events.click.push(func)\r\n}\r\nTouch.prototype.onForce = function (func) {\r\n\tthis.events.force.push(func)\r\n}\r\nTouch.prototype.onStop = function (func) {\r\n\tthis.events.stop.push(func)\r\n}\r\nTouch.prototype.onUp = function (func) {\r\n\tthis.events.up.push(func)\r\n}\r\nTouch.prototype.onDown = function (func) {\r\n\tthis.events.down.push(func)\r\n}\r\nTouch.prototype.onLeft = function (func) {\r\n\tthis.events.left.push(func)\r\n}\r\nTouch.prototype.onRight = function (func) {\r\n\tthis.events.right.push(func)\r\n}\r\n\r\nTouch.prototype.unsub = function (ev, func) {\r\n\tif (this.events[ev])\r\n\t\tthis.events[ev] = this.events[ev].filter(fu => fu !== func)\r\n}\r\nTouch.prototype.clearEvlent = function (ev) {\r\n\tif (this.events[ev]) this.events[ev] = []\r\n}\r\nTouch.prototype.clear = function () {\r\n\tthis.events = {\r\n\t\tup: [],\r\n\t\tdown: [],\r\n\t\tleft: [],\r\n\t\tright: [],\r\n\t\tstop: [],\r\n\t\tstart: [],\r\n\t\tclick: [],\r\n\t\tforce: [],\r\n\t\tbmiddle: [],\r\n\t\tbright: [],\r\n\t}\r\n}\r\nTouch.prototype.triger = function (ev, args) {\r\n\tif (this.events[ev])\r\n\t\tthis.events[ev].forEach(func => {\r\n\t\t\ttry {\r\n\t\t\t\tfunc(args)\r\n\t\t\t}\r\n\t\t\tcatch (e) {\r\n\t\t\t\tif (this.console_error) console.log(e)\r\n\t\t\t\tthis.last_error = 'Error: ' + e.name +\r\n\t\t\t\t\t' ' + e.foo +\r\n\t\t\t\t\t' ' + e.message +\r\n\t\t\t\t\t' ' + e.stack\r\n\t\t\t\tif (this.throw_error) throw e\r\n\t\t\t}\r\n\t\t})\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Touch);\n\n//# sourceURL=webpack://stellar2/../lib/fe/touch.js?");

/***/ }),

/***/ "../lib/math/vec.js":
/*!**************************!*\
  !*** ../lib/math/vec.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"distance\": () => (/* binding */ distance),\n/* harmony export */   \"dot\": () => (/* binding */ dot),\n/* harmony export */   \"interpolate\": () => (/* binding */ interpolate),\n/* harmony export */   \"interpolateVecs\": () => (/* binding */ interpolateVecs),\n/* harmony export */   \"lineCollision\": () => (/* binding */ lineCollision),\n/* harmony export */   \"magnitude\": () => (/* binding */ magnitude),\n/* harmony export */   \"perpDot\": () => (/* binding */ perpDot),\n/* harmony export */   \"pointInTriangle\": () => (/* binding */ pointInTriangle),\n/* harmony export */   \"sign\": () => (/* binding */ sign)\n/* harmony export */ });\nfunction sign(p1, p2, p3) {\n    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);\n}\n\nfunction pointInTriangle(pt, v1, v2, v3) {\n    var b1 = sign(pt, v1, v2) < 0.0;\n    var b2 = sign(pt, v2, v3) < 0.0;\n    var b3 = sign(pt, v3, v1) < 0.0;\n\n    return ((b1 == b2) && (b2 == b3));\n}\n\nfunction dot(a, b) { return (a.x * b.x) + (a.y * b.y); }\n\nfunction perpDot(a, b) { return (a.y * b.x) - (a.x * b.y); }\n\nfunction lineCollision(A1, A2,\n    B1, B2) {\n    var a = { x: A2.x - A1.x, y: A2.y - A1.y };\n    var b = { x: B2.x - B1.x, y: B2.y - B1.y };\n\n    var f = perpDot(a, b);\n    if (!f)      // lines are parallel\n        return false;\n\n    var c = { x: B2.x - A2.x, y: B2.y - A2.y };\n    var aa = perpDot(a, c);\n    var bb = perpDot(b, c);\n\n    if (f < 0) {\n        if (aa > 0) return false;\n        if (bb > 0) return false;\n        if (aa < f) return false;\n        if (bb < f) return false;\n    }\n    else {\n        if (aa < 0) return false;\n        if (bb < 0) return false;\n        if (aa > f) return false;\n        if (bb > f) return false;\n    }\n    return true;\n}\n\nfunction interpolateVecs(vecA, vecB, over) {\n    let left = 1 - over\n    return { x: vecA.x * left + vecB.x * over, y: vecA.y * left + vecB.y * over }\n}\nfunction interpolate(vecA, vecB, over) {\n    let left = 1 - over\n    return vecA * left + vecB * over\n}\nfunction magnitude(aX, aY) {\n    return Math.sqrt(aX * aX, aY * aY)\n}\n\nfunction distance(aX, aY, bX, bY) {\n    return magnitude(aX - bX, aY - bY)\n}\n\n\n\n//# sourceURL=webpack://stellar2/../lib/math/vec.js?");

/***/ }),

/***/ "../lib/math/view.js":
/*!***************************!*\
  !*** ../lib/math/view.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"screenToWorld\": () => (/* binding */ screenToWorld),\n/* harmony export */   \"worldToScreen\": () => (/* binding */ worldToScreen)\n/* harmony export */ });\nfunction worldToScreen(\n    viewCenterX,\n    viewCenterY,\n    viewScale,\n    screenW,\n    screenH,\n    pointX,\n    pointY) {\n    const widthHalf = screenW / 2\n    const heightHalf = screenH / 2\n    var screenX = (pointX - viewCenterX) * viewScale + widthHalf\n    var screenY = (pointY - viewCenterY) * viewScale + heightHalf\n    return [screenX, screenY]\n}\n\nfunction screenToWorld(\n    viewCenterX,\n    viewCenterY,\n    viewScale,\n    screenW,\n    screenH,\n    pointX,\n    pointY) {\n    const widthHalf = screenW / 2\n    const heightHalf = screenH / 2\n    var worldX = (pointX - widthHalf) / viewScale + viewCenterX\n    var worldY = (pointY - heightHalf) / viewScale + viewCenterY\n    return [worldX, worldY]\n}\n\n//# sourceURL=webpack://stellar2/../lib/math/view.js?");

/***/ }),

/***/ "../lib/shapes/box.js":
/*!****************************!*\
  !*** ../lib/shapes/box.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeBox\": () => (/* binding */ ShapeBox)\n/* harmony export */ });\nfunction ShapeBox(size_x, size_y) {\n\tthis.x = size_x;\n\tthis.y = size_y;\n}\n\n\n\n//# sourceURL=webpack://stellar2/../lib/shapes/box.js?");

/***/ }),

/***/ "../lib/shapes/circle.js":
/*!*******************************!*\
  !*** ../lib/shapes/circle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeCircle\": () => (/* binding */ ShapeCircle)\n/* harmony export */ });\nfunction ShapeCircle(radius){\r\n\tthis.radius = radius\r\n}\r\n\r\n\n\n//# sourceURL=webpack://stellar2/../lib/shapes/circle.js?");

/***/ }),

/***/ "../lib/shapes/noScale.js":
/*!********************************!*\
  !*** ../lib/shapes/noScale.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeNoScale\": () => (/* binding */ ShapeNoScale)\n/* harmony export */ });\nfunction ShapeNoScale() {\n    this.noscale = true\n}\n\n\n\n//# sourceURL=webpack://stellar2/../lib/shapes/noScale.js?");

/***/ }),

/***/ "../lib/shapes/rounded-box.js":
/*!************************************!*\
  !*** ../lib/shapes/rounded-box.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeRounded\": () => (/* binding */ ShapeRounded)\n/* harmony export */ });\nfunction ShapeRounded(radius) {\n\tthis.radius = radius;\n}\n\n\n\n//# sourceURL=webpack://stellar2/../lib/shapes/rounded-box.js?");

/***/ }),

/***/ "../lib/shapes/scale.js":
/*!******************************!*\
  !*** ../lib/shapes/scale.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeScale\": () => (/* binding */ ShapeScale)\n/* harmony export */ });\nfunction ShapeScale(scale) {\n    this.scale = scale\n}\n\n\n\n//# sourceURL=webpack://stellar2/../lib/shapes/scale.js?");

/***/ }),

/***/ "../lib/shapes/sprite.js":
/*!*******************************!*\
  !*** ../lib/shapes/sprite.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Sprite\": () => (/* binding */ Sprite)\n/* harmony export */ });\nfunction Sprite(image) {\n\tthis.image = image\n}\n\n\n\n//# sourceURL=webpack://stellar2/../lib/shapes/sprite.js?");

/***/ }),

/***/ "../lib/shapes/text.js":
/*!*****************************!*\
  !*** ../lib/shapes/text.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeText\": () => (/* binding */ ShapeText)\n/* harmony export */ });\nfunction ShapeText(font, text){\n\tthis.font = font;\n\tthis.text = text;\n}\n\n\n\n//# sourceURL=webpack://stellar2/../lib/shapes/text.js?");

/***/ }),

/***/ "../lib/shapes/vector.js":
/*!*******************************!*\
  !*** ../lib/shapes/vector.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector\": () => (/* binding */ Vector)\n/* harmony export */ });\nfunction Vector(...array) {\n\tArray.call(this)\n\tif (array.length == 1) {\n\t\tvar item = array[0]\n\t\tvar arr = Object.values(item)\n\t\tif (Object.hasOwnProperty.call(item, 'length') &&\n\t\t\titem.length !== arr.length) {\n\t\t\tarr.pop()\n\t\t}\n\t\tthis.push(...arr)\n\t} else {\n\t\tthis.push(...Object.values(array))\n\t}\n\n\tObject.defineProperty(this, 'x', {\n\t\tget() {\n\t\t\treturn this[0];\n\t\t},\n\t\tset(value) {\n\t\t\tthis[0] = value;\n\t\t}\n\t});\n\tObject.defineProperty(this, 'y', {\n\t\tget() {\n\t\t\treturn this[1];\n\t\t},\n\t\tset(value) {\n\t\t\tthis[1] = value;\n\t\t}\n\t});\n\tObject.defineProperty(this, 'z', {\n\t\tget() {\n\t\t\treturn this[2];\n\t\t},\n\t\tset(value) {\n\t\t\tthis[2] = value;\n\t\t}\n\t});\n}\n\nVector.prototype.x = 0;\nVector.prototype.y = 0;\nVector.prototype.z = 0;\n\nVector.prototype = Object.create(Array.prototype, {\n\tconstructor: {\n\t\tvalue: Vector,\n\t\tenumerable: false, // Make it non-enumerable, so it won't appear in `for...in` loop\n\t\twritable: true,\n\t\tconfigurable: true,\n\t}\n})\n\nVector.prototype.add = function (toAdd) {\n\tlet ret = this.copy()\n\tfor (var k = 0; k < ret.length; k++) {\n\t\tif (!Object.hasOwnProperty.call(ret, k)) {\n\t\t\tcontinue;\n\t\t}\n\t\tif (!Object.hasOwnProperty.call(toAdd, k)) {\n\t\t\tcontinue;\n\t\t}\n\t\tret[k] += toAdd[k]\n\t}\n\treturn ret\n}\n\nVector.prototype.update = function (newValues) {\n\tfor (var k = 0; k < this.length; k++) {\n\t\tif (!Object.hasOwnProperty.call(this, k)) {\n\t\t\tcontinue;\n\t\t}\n\t\tif (!Object.hasOwnProperty.call(newValues, k)) {\n\t\t\tcontinue;\n\t\t}\n\t\tthis[k] = newValues[k]\n\t}\n}\n\nVector.prototype.negate = function () {\n\tlet ret = this.copy()\n\tfor (var k = 0; k < ret.length; k++) {\n\t\tif (!Object.hasOwnProperty.call(ret, k)) {\n\t\t\tcontinue;\n\t\t}\n\t\tret[k] = -ret[k]\n\t}\n\treturn ret\n}\nVector.prototype.substract = function (toAdd) {\n\treturn this.add(toAdd.negate())\n}\nVector.prototype.magnitude = function () {\n\tlet magnitude = 0;\n\tfor (var k = 0; k < this.length; k++) {\n\t\tif (!Object.hasOwnProperty.call(this, k)) {\n\t\t\tcontinue;\n\t\t}\n\t\tmagnitude += this[k] * this[k]\n\t}\n\treturn Math.sqrt(magnitude);\n}\nVector.prototype.normalise = function (toAdd) {\n\tlet magnitude = this.magnitude()\n\treturn this.scale(1 / magnitude)\n}\nVector.prototype.scale = function (scale) {\n\tlet ret = this.copy()\n\tfor (var k = 0; k < ret.length; k++) {\n\t\tif (!Object.hasOwnProperty.call(ret, k)) {\n\t\t\tcontinue;\n\t\t}\n\t\tret[k] *= scale\n\t}\n\treturn ret\n}\n\nVector.prototype.copy = function () {\n\treturn new this.constructor(this)\n}\n\n\n\n//# sourceURL=webpack://stellar2/../lib/shapes/vector.js?");

/***/ }),

/***/ "./src/colors.js":
/*!***********************!*\
  !*** ./src/colors.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"skyColors\": () => (/* binding */ skyColors)\n/* harmony export */ });\nconst skyColors = [\n    [0xFF, 0xFF, 0xFF],\n    [0x6F, 0xC4, 0xA5],\n    [0xA3, 0x7B, 0xAD],\n    [0x93, 0x6C, 0xA1],\n    [0x2C, 0x4E, 0x8A],\n    [0x3E, 0x1B, 0x9C],\n    [0x64, 0x18, 0x1D],\n    [0x15, 0x05, 0x22],\n    [0x0A, 0x0C, 0x1D],\n    [0x00, 0x00, 0x00]\n]\n\n//# sourceURL=webpack://stellar2/./src/colors.js?");

/***/ }),

/***/ "./src/gravityColorEngine.js":
/*!***********************************!*\
  !*** ./src/gravityColorEngine.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GravityColorEngine\": () => (/* binding */ GravityColorEngine)\n/* harmony export */ });\n/* harmony import */ var _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/ecs/drawers/render.js */ \"../lib/ecs/drawers/render.js\");\n/* harmony import */ var _lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/ecs/physics/physics.js */ \"../lib/ecs/physics/physics.js\");\n\r\n\r\n\r\n\r\nfunction GravityColorEngine(manager) {\r\n\tthis.manager = manager\r\n}\r\n\r\nconst planetColors = [\r\n\t[245, 202, 117],\r\n\t[254, 255, 188],\r\n\t[200, 141, 110],\r\n]\r\n\r\nGravityColorEngine.prototype.compute = function () {\r\n\tthis.manager.getEnities(_lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_0__.Renderer).map(\r\n\t\t(elem) => {\r\n\t\t\tvar renderers = this.manager.get(_lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_0__.Renderer, elem)[0]\r\n\t\t\tvar mass = this.manager.get(_lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics, elem)[0].mass\r\n\t\t\tvar volume = Math.pow(this.manager.get(_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle, elem)[0].radius, 3) * Math.PI\r\n\t\t\tvar dencity = mass / volume * planetColors.length * 3\r\n\t\t\tvar index = Math.min(Math.round(dencity), planetColors.length - 1);\r\n\t\t\trenderers.color = '#' + toHex(planetColors[index][0]) +\r\n\t\t\t\ttoHex(planetColors[index][1]) +\r\n\t\t\t\ttoHex(planetColors[index][2])\r\n\t\t}\r\n\t)\r\n}\r\nfunction toHex(num) {\r\n\tlet out = num.toString(16)\r\n\treturn out.length - 1 ? out : '0' + out\r\n}\r\n\r\n\n\n//# sourceURL=webpack://stellar2/./src/gravityColorEngine.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/ecs */ \"../lib/ecs/index.js\");\n/* harmony import */ var _lib_fe_touch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/fe/touch */ \"../lib/fe/touch.js\");\n/* harmony import */ var _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/ecs/physics/physics.js */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _lib_ecs_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/ecs/physics/plasticColisionEngine */ \"../lib/ecs/physics/plasticColisionEngine.js\");\n/* harmony import */ var _lib_ecs_physics_gravityEngine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/ecs/physics/gravityEngine */ \"../lib/ecs/physics/gravityEngine.js\");\n/* harmony import */ var _gravityColorEngine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gravityColorEngine */ \"./src/gravityColorEngine.js\");\n/* harmony import */ var _lib_ecs_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/ecs/physics/transform.js */ \"../lib/ecs/physics/transform.js\");\n/* harmony import */ var _lib_ecs_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/ecs/drawers/ploter.js */ \"../lib/ecs/drawers/ploter.js\");\n/* harmony import */ var _lib_ecs_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawFPS.js */ \"../lib/ecs/drawers/drawFPS.js\");\n/* harmony import */ var _lib_ecs_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawGrid.js */ \"../lib/ecs/drawers/drawGrid.js\");\n/* harmony import */ var _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../lib/ecs/drawers/render.js */ \"../lib/ecs/drawers/render.js\");\n/* harmony import */ var _lib_ecs_drawers_drawMass_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawMass.js */ \"../lib/ecs/drawers/drawMass.js\");\n/* harmony import */ var _lib_ecs_drawers_drawGalaxy__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawGalaxy */ \"../lib/ecs/drawers/drawGalaxy.js\");\n/* harmony import */ var _lib_ecs_drawers_drawGass_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawGass.js */ \"../lib/ecs/drawers/drawGass.js\");\n/* harmony import */ var _lib_ecs_physics_chainEngine_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../lib/ecs/physics/chainEngine.js */ \"../lib/ecs/physics/chainEngine.js\");\n/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./colors */ \"./src/colors.js\");\n/* harmony import */ var _rustimpl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./rustimpl */ \"./src/rustimpl/index.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst canvas = document.getElementById('phy_canvas')\r\nconst toolokInput = document.getElementById('tolook_value')\r\nconst drawMass = document.getElementById('draw_mass')\r\nconst drawMassRust = document.getElementById('draw_mass_rust')\r\nconst drawGalaxy = document.getElementById('draw_galaxy')\r\nconst drawGass = document.getElementById('draw_gass')\r\nconst drawGrid = document.getElementById('draw_grid')\r\nconst drawFPS = document.getElementById('draw_fps')\r\nconst fullSpeed = document.getElementById('full_speed')\r\nconst drawPlanets = document.getElementById('draw_planets')\r\nconst maxPlanets = document.getElementById('max_planets')\r\n\r\nvar draw = new _lib_ecs_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"](canvas)\r\n\r\ncanvas.width = 640\r\ncanvas.height = 480\r\n\r\nvar position = { x: 0, y: 0, scale: 0.2 }\r\n\r\nwindow.addEventListener('mousewheel', function (e) {\r\n\tposition.scale *= e.wheelDelta > 0 ? 1.1 : 0.88\r\n})\r\n\r\nconst fps = new _lib_ecs_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"](draw.context)\r\nconst grid = new _lib_ecs_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"](draw.context)\r\n\r\nvar manager = new _lib_ecs__WEBPACK_IMPORTED_MODULE_0__.EntityManager()\r\n\r\n\r\nconst points = new _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__.RenderEngine(draw.context, manager)\r\nconst mass = new _lib_ecs_drawers_drawMass_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"](draw.context, manager)\r\nconst massRust = new _rustimpl__WEBPACK_IMPORTED_MODULE_17__.MassRust(draw.context, manager)\r\nconst galaxy = new _lib_ecs_drawers_drawGalaxy__WEBPACK_IMPORTED_MODULE_13__[\"default\"](draw.context, manager, _colors__WEBPACK_IMPORTED_MODULE_16__.skyColors)\r\nconst gass = new _lib_ecs_drawers_drawGass_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"](draw.context, manager)\r\nconst gravityEngine = new _lib_ecs_physics_gravityEngine__WEBPACK_IMPORTED_MODULE_5__.GravityEngine(manager)\r\nconst colisionEngine = new _lib_ecs_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__.PlasticColisionEngine(manager)\r\nconst gravityColorEngine = new _gravityColorEngine__WEBPACK_IMPORTED_MODULE_6__.GravityColorEngine(manager)\r\nconst chainEngine = new _lib_ecs_physics_chainEngine_js__WEBPACK_IMPORTED_MODULE_15__.ChainEngine(manager)\r\nconst physics = new _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.PhysicsEngine(manager, [gravityEngine,\r\n\tcolisionEngine,\r\n\tgravityColorEngine,\r\n\tchainEngine\r\n])\r\nvar touch = new _lib_fe_touch__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas, 100)\r\ntouch.sub('force', ({ delta, deltaZoom }) => {\r\n\tposition = {\r\n\t\t...position, scale: position.scale * deltaZoom, x: position.x - delta.x / position.scale,\r\n\t\ty: position.y - delta.y / position.scale\r\n\t}\r\n})\r\n\r\nvar entity = null\r\n\r\nvar all = []\r\n\r\nfunction calculateMass(radius) {\r\n\tvar massVolume = 0.2 + Math.tanh((radius - 50) * 0.2) * 0.05 + Math.tanh((20 - radius) * 0.2) * 0.1\r\n\tconsole.log(\"tr\")\r\n\treturn Math.pow(radius, 3) * Math.PI * massVolume\r\n}\r\n\r\nfunction createSnode(positions, speeds, radius) {\r\n\tentity = manager.create()\r\n\tmanager.asign(new _lib_ecs_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__.Transform(positions), entity)\r\n\tmanager.asign(new _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics(speeds, calculateMass(radius), 0), entity)\r\n\tmanager.asign(new _lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__.ShapeCircle(radius), entity)\r\n\tmanager.asign(new _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__.Renderer('#aaffbb'), entity)\r\n\tmanager.asign(new _lib_ecs_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__.PlasticBody(), entity)\r\n\treturn entity\r\n}\r\n\r\n\r\n\r\n\r\n\r\nall.push(createSnode([0, 0], [0, 0], 55, all, 'Sun'))\r\n\r\n\r\nall.push(createSnode([255, 0], [0, 5], 3, all, 'Mercury'))\r\nall.push(createSnode([300, 0], [0, 5], 4, all, 'Venus'))\r\nall.push(createSnode([450, 0], [0, 4], 7, all, 'Earth'))\r\nall.push(createSnode([600, 0], [0, 4], 4, all, 'Mars'))\r\nlet yupiter = createSnode([1400, 0], [0, 2.5], 35, all, 'Jupiter')\r\nall.push(yupiter)\r\nall.push(createSnode([1440, 0], [0, 6], 2, all, 'Europa'))\r\nall.push(createSnode([1450, 0], [0, 6], 2, all, 'Europa'))\r\nall.push(createSnode([2800, 0], [0, 2.5], 5, all, 'Saturn'))\r\n\r\n\r\nconst generateItem = (size) => {\r\n\tvar angle = Math.random() * 2 * Math.PI\r\n\tvar radius = 200 + Math.random() * 2000\r\n\tvar x = Math.sin(angle) * radius\r\n\tvar y = Math.cos(angle) * radius\r\n\tvar tan = Math.atan2(x, y) - Math.PI / 2\r\n\r\n\tvar el = createSnode(\r\n\t\t[x, y],\r\n\t\t[(10 * Math.sin(tan) + Math.random() * 14 - 7), (10 * Math.cos(tan) + Math.random() * 14 - 7)],\r\n\t\tsize || (0.1 + Math.random()), all)\r\n\tall.push(el)\r\n}\r\n\r\n\r\n\r\nsetInterval(() => {\r\n\tlet max = parseInt(maxPlanets.value) || 100\r\n\tif (all.length < max - 10) {\r\n\t\tfor (let i = 0; i < 10; i++) generateItem(1)\r\n\t}\r\n\tall.forEach((el, index) => (index > max) &&\r\n\t\tmanager.destroy(el)\r\n\t)\r\n}, 50)\r\n\r\n\r\n\r\n\r\n\r\nfunction work() {\r\n\tvar numb = parseInt(toolokInput.value) - 1\r\n\tif (!isNaN(numb) && numb >= 0) {\r\n\t\tvar toLookEntity = all[numb % all.length]\r\n\t\tvar toLookTransform = manager.get(_lib_ecs_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__.Transform, toLookEntity)[0]\r\n\t\tposition.x = toLookTransform.positions[0]\r\n\t\tposition.y = toLookTransform.positions[1]\r\n\t}\r\n\tdraw.clear()\r\n\r\n\tif (drawGrid.checked)\r\n\t\tgrid.draw(100, 100, position)\r\n\tif (drawMass.checked)\r\n\t\tmass.draw(position)\r\n\tif (drawMassRust.checked)\r\n\t\tmassRust.drawAll(position)\r\n\tif (drawGass.checked)\r\n\t\tgass.draw(position)\r\n\tif (drawGalaxy.checked) {\r\n\t\tgalaxy.draw(position)\r\n\t}\r\n\tif (drawPlanets.checked)\r\n\t\tpoints.draw(position)\r\n\tif (drawFPS.checked)\r\n\t\tfps.draw()\r\n\tphysics.compute()\r\n\r\n\tall = all.filter(function (e, index) {\r\n\t\tvar alive = manager.alive(e)\r\n\t\tif (!alive && !isNaN(numb) && numb >= index) {\r\n\t\t\ttoolokInput.value = numb - 1\r\n\t\t}\r\n\t\treturn alive\r\n\t})\r\n\tif (numb >= all.length) {\r\n\t\ttoolokInput.value = all.length - 1\r\n\t}\r\n\tsetTimeout(work, fullSpeed.checked ? 0 : 15)\r\n}\r\nwork()\n\n//# sourceURL=webpack://stellar2/./src/index.js?");

/***/ }),

/***/ "./src/rustimpl/index.js":
/*!*******************************!*\
  !*** ./src/rustimpl/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MassRust\": () => (/* binding */ MassRust)\n/* harmony export */ });\n/* harmony import */ var _lib_ecs_drawers_imageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/ecs/drawers/imageData */ \"../lib/ecs/drawers/imageData.js\");\n/* harmony import */ var _lib_ecs_physics_physics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/ecs/physics/physics */ \"../lib/ecs/physics/physics.js\");\n/* harmony import */ var _lib_ecs_physics_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/ecs/physics/transform */ \"../lib/ecs/physics/transform.js\");\n\n\n\n\nclass MassRust {\n\tconstructor(context, manager) {\n\t\tthis.manager = manager\n\t\tthis.context = context\n\t\tthis.positionArray = new Float32Array([0, 0, 1])\n\t\tthis.planetsArray = new Float32Array([]);\n\t\tthis.imgData = new _lib_ecs_drawers_imageData__WEBPACK_IMPORTED_MODULE_0__.ImageDataPloter(context, manager)\n\t\tthis.update()\n\t}\n\tupdate() {\n\t\tthis.imgData.update()\n\t\tthis.width = this.context.canvas.clientWidth\n\t\tthis.height = this.context.canvas.clientHeight\n\t\tthis.gravity = null\n\t\t__webpack_require__.e(/*! import() */ \"gravity_calc_pkg_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../../../gravity_calc/pkg */ \"../gravity_calc/pkg/index.js\")).then(({ Gravity }) => {\n\t\t\tthis.gravity = Gravity.new(this.width, this.height)\n\t\t})\n\t}\n\n\tdrawAll(position) {\n\t\tif (!this.gravity) return\n\t\tvar gravity = this.gravity\n\t\tvar all = this.manager.getEnities(_lib_ecs_physics_physics__WEBPACK_IMPORTED_MODULE_1__.Physics)\n\t\tvar planetsDataLength = all.length * 3\n\t\tif (this.planetsArray.length !== planetsDataLength)\n\t\t\tthis.planetsArray = new Float32Array(all.length * 3);\n\t\tvar bufferIndex = 0;\n\t\tall.forEach((el) => {\n\t\t\tvar transform = this.manager.get(_lib_ecs_physics_transform__WEBPACK_IMPORTED_MODULE_2__.Transform, el)[0]\n\t\t\tvar physic = this.manager.get(_lib_ecs_physics_physics__WEBPACK_IMPORTED_MODULE_1__.Physics, el)[0]\n\t\t\tthis.planetsArray[bufferIndex] = transform.positions[0]\n\t\t\tthis.planetsArray[bufferIndex + 1] = transform.positions[1]\n\t\t\tthis.planetsArray[bufferIndex + 2] = physic.mass\n\t\t\tbufferIndex += 3\n\t\t})\n\t\tthis.positionArray[0] = position.x\n\t\tthis.positionArray[1] = position.y\n\t\tthis.positionArray[2] = position.scale\n\t\tthis.imgData.pull()\n\t\tgravity.draw_planets(\n\t\t\tthis.imgData.img.data,\n\t\t\tthis.planetsArray,\n\t\t\tplanetsDataLength,\n\t\t\tthis.positionArray\n\t\t);\n\t\tthis.context.putImageData(this.imgData.img, 0, 0);\n\t}\n}\n\n//# sourceURL=webpack://stellar2/./src/rustimpl/index.js?");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "stellar2:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkstellar2"] = self["webpackChunkstellar2"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;