/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../lib/ecs/drawers/drawFPS.js":
/*!*************************************!*\
  !*** ../lib/ecs/drawers/drawFPS.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function FPSPloter(context) {
	this.context = context
	this.time = (new Date()).getTime()
	this.i = 0
	this.fps = 0
}

FPSPloter.prototype.draw = function () {
	this.i++
	var newTime = (new Date()).getTime()
	var deltaT = newTime - this.time
	this.time = newTime
	this.context.font = '14px Verdana'

	if (!(this.i % 30)) this.fps = (Math.round(10000 / deltaT) / 10) + ' fps'
	this.context.beginPath();
	this.context.rect(10, 13, 60, 14);
	this.context.fillStyle = 'gray'
	this.context.fill();
	this.context.fillStyle = 'red'
	this.context.fillText(this.fps, 10, 24)

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FPSPloter);

/***/ }),

/***/ "../lib/ecs/drawers/drawGalaxy.js":
/*!****************************************!*\
  !*** ../lib/ecs/drawers/drawGalaxy.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_vec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/vec.js */ "../lib/math/vec.js");
/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../physics/physics.js */ "../lib/ecs/physics/physics.js");
/* harmony import */ var _physics_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../physics/transform */ "../lib/ecs/physics/transform.js");
/* harmony import */ var _imageData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./imageData */ "../lib/ecs/drawers/imageData.js");





const distance = (point, pointB) => {
	var square = 0
	for (var i = 0; i < point.length; i++)
		square += (point[i] - pointB[i]) * (point[i] - pointB[i])
	return isNaN(square) || square < 1 ? 1 : Math.sqrt(square)
}

function GalaxyPloter(context, manager, colors) {
	this.colors = colors
	this.context = context
	this.imgData = new _imageData__WEBPACK_IMPORTED_MODULE_3__.ImageDataPloter(context, manager)
	this.manager = manager
}

GalaxyPloter.prototype.update = function () {
	this.imgData.update()
}

GalaxyPloter.prototype.draw = function (view) {
	const { x: centerX, y: centerY, scale } = view
	const { context } = this
	var canvasWidth = context.canvas.clientWidth
	var canvasHeight = context.canvas.clientHeight
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	const stepX = 2
	const stepY = 2
	const halfStepX = stepX / 2
	const halfStepY = stepY / 2
	var startx = (centerX + canvasWidthHalf) % stepX
	var starty = (centerY + canvasHeightHalf) % stepY
	var inverseScale = stepY / scale
	const points = this.manager.getEnities(_physics_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics).map(
		(elem) => {
			var physics = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics, elem)[0]
			var transform = this.manager.get(_physics_transform__WEBPACK_IMPORTED_MODULE_2__.Transform, elem)[0]
			return {
				mass: physics.mass,
				positions: transform.positions
			}
		})
	this.imgData.pull()
	var colorCount = new Array(this.colors.length).fill(0)
	for (var x = startx; x <= canvasWidth; x += stepX) {
		var realX = (x - canvasWidthHalf) / scale + centerX
		var realY = (starty - canvasHeightHalf) / scale + centerY
		for (var y = starty; y <= canvasHeight; y += stepY) {
			var sum = 0
			var pointsLength = points.length
			for (var i = 0; i < pointsLength; i++) {
				var point = points[i]
				sum += point.mass / distance([realX, realY], point.positions)
			}
			var colorPosition = Math.max(this.colors.length - sum / 64.0, 0);
			var over = colorPosition % 1
			var index1 = Math.min(this.colors.length - 1, Math.floor(colorPosition))
			var index2 = Math.min(this.colors.length - 1, Math.ceil(colorPosition))
			var color = this.colors[index2]
			let color2 = this.colors[index1]
			colorCount[index1]++
			color = color.map((c, index) => (0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.interpolate)(color2[index], c, over))

			this.imgData.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [color[0], color[1], color[2]])
			realY += inverseScale
		}
	}
	//console.log(colorCount)
	context.putImageData(this.imgData.img, 0, 0)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GalaxyPloter);

/***/ }),

/***/ "../lib/ecs/drawers/drawGass.js":
/*!**************************************!*\
  !*** ../lib/ecs/drawers/drawGass.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_vec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/vec.js */ "../lib/math/vec.js");
/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shapes/circle.js */ "../lib/shapes/circle.js");
/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../physics/physics.js */ "../lib/ecs/physics/physics.js");
/* harmony import */ var _physics_transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../physics/transform */ "../lib/ecs/physics/transform.js");
/* harmony import */ var _imageData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imageData.js */ "../lib/ecs/drawers/imageData.js");






var COLORS = 16 * 16

function GassPloter(context, manager) {
	this.context = context
	this.imgData = new _imageData_js__WEBPACK_IMPORTED_MODULE_4__.ImageDataPloter(context, manager)
	this.update();
	this.manager = manager
}

GassPloter.prototype.update = function () {
	this.width = this.context.canvas.clientWidth
	this.height = this.context.canvas.clientHeight
	this.step = 4
	this.widthSteps = this.width / this.step
	this.heightSteps = this.height / this.step
	this.number = this.widthSteps * this.heightSteps
	this.cells = {
		p: new Float32Array(this.number),
		v: new Float32Array(this.number),
		h: new Float32Array(this.number),
		o: new Uint8Array(this.number),
	}
	this.cells.p.fill(1)
	this.cells.v.fill(0)
	this.cells.h.fill(0)
	this.cells.o.fill(0)
	this.imgData.update()
}

GassPloter.prototype.draw = function (view) {
	const { x: centerX, y: centerY, scale } = view
	const { context } = this
	var canvasWidth = context.canvas.clientWidth
	var canvasHeight = context.canvas.clientHeight
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	const stepX = this.step
	const stepY = this.step
	const halfStepX = stepX / 2
	const halfStepY = stepY / 2
	var startx = (centerX + canvasWidthHalf) % stepX
	var starty = (centerY + canvasHeightHalf) % stepY
	var inverseScale = stepY / scale
	this.imgData.pull()
	const points = this.manager.getEnities(_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics).map(
		(elem) => {
			var transform = this.manager.get(_physics_transform__WEBPACK_IMPORTED_MODULE_3__.Transform, elem)[0]
			var shape = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle, elem)[0]
			var physics = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics, elem)[0]
			return {
				speeds: physics.speeds,
				radius: shape && shape.radius,
				positions: transform.positions
			}
		}).filter(({ radius }) => !!radius)
	//this.cells.o.fill(0)
	for (var x = startx; x <= canvasWidth; x += stepX) {
		var realX = (x - canvasWidthHalf) / scale + centerX
		var realY = (starty - canvasHeightHalf) / scale + centerY
		var realXround = Math.max(Math.round(realX - halfStepX), 0)
		for (var y = starty; y <= canvasHeight; y += stepY) {
			var realYround = Math.max(Math.round(realY - halfStepY), 0)
			var cellId = realXround + realYround * this.widthSteps
			var sum = 0
			var pointsLength = points.length
			for (var i = 0; i < pointsLength; i++) {
				var point = points[i]
				if (point.radius >
					(0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.distance)(point.positions[0],
						point.positions[1],
						realX,
						realY)) {
					this.cells.o[cellId] = 1
				}
			}
			if (this.cells[cellId]) {
				sum += 128
			}
			var colorMin2 = Math.min(sum, COLORS - 1)
			var colorMin = Math.max(Math.min(sum, COLORS - 1) - colorMin2 * colorMin2 * 0.3, 0)
			this.imgData.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [255 - colorMin, 0, 255 - colorMin2])
			realY += inverseScale
		}
	}
	context.putImageData(this.imgData.img, 0, 0)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GassPloter);

/***/ }),

/***/ "../lib/ecs/drawers/drawGrid.js":
/*!**************************************!*\
  !*** ../lib/ecs/drawers/drawGrid.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/view */ "../lib/math/view.js");
/* harmony import */ var _math_vec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../math/vec */ "../lib/math/vec.js");



function GridPloter(ctx, options) {
	this.context = ctx
	this.showCords = options?.showCords
	this.showAxis = options?.showAxis
	this.axisCords = options?.axisCords
	this.axisScale = options?.axisScale || 100
	this.devide = options?.devide || 2
}

GridPloter.prototype.draw = function (sizex, sizey, view) {
	const { context } = this
	var canvasWidth = context.canvas.clientWidth
	var canvasHeight = context.canvas.clientHeight
	const { x: centerX, y: centerY, scale } = view
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	var gridScale = scale || 1
	while (gridScale > 2)
		gridScale /= 2
	while (gridScale < 1)
		gridScale *= 2
	const stepX = sizex * gridScale
	const stepY = sizey * gridScale
	var startx = (canvasWidthHalf - centerX * scale) % stepX
	var starty = (canvasHeightHalf - centerY * scale) % stepY
	if (startx < 0) {
		startx += stepX
	}
	if (starty < 0) {
		starty += stepY
	}
	if (this.showAxis) {
		context.beginPath()
		let [scrCenterX, scrCenterY] = (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.worldToScreen)(
			centerX,
			centerY,
			scale,
			canvasWidth,
			canvasHeight,
			0, 0)
		context.lineWidth = 2
		context.moveTo(scrCenterX, 0)
		context.lineTo(scrCenterX, canvasHeight)
		context.moveTo(0, scrCenterY)
		context.lineTo(canvasWidth, scrCenterY)
		context.strokeStyle = 'rgba(0, 0, 0, 1.0)'
		context.stroke()
	}

	context.beginPath()
	for (var x = startx; x <= canvasWidth; x += stepX) {
		context.moveTo(x, 0)
		context.lineTo(x, canvasHeight)
		if (!this.axisCords) continue;
		let cordX = (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.screenToWorld)(
			centerX,
			centerY,
			scale,
			canvasWidth,
			canvasHeight,
			x,
			0
		)[0]
		this.drawCod(cordX, 0, view, context)
	}

	for (var y = starty; y <= canvasHeight; y += stepY) {
		context.moveTo(0, y)
		context.lineTo(canvasWidth, y)
		if (!this.axisCords) continue;
		let cordY = (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.screenToWorld)(
			centerX,
			centerY,
			scale,
			canvasWidth,
			canvasHeight,
			0,
			y
		)[1]
		this.drawCod(0, cordY, view, context)
	}
	context.lineWidth = 2
	context.strokeStyle = 'rgba(128, 128, 128, 0.5)'
	context.stroke()
	for (var i = 0; i < this.devide - 1; i++) {
		var startx = (startx + stepX / this.devide) % stepX
		var starty = (starty + stepY / this.devide) % stepY

		context.beginPath()
		for (var x = startx; x <= canvasWidth; x += stepX) {
			context.moveTo(x, 0)
			context.lineTo(x, canvasHeight)
		}

		for (var y = starty; y <= canvasHeight; y += stepY) {
			context.moveTo(0, y)
			context.lineTo(canvasWidth, y)
		}
		context.lineWidth = 1
		context.strokeStyle = 'rgba(128, 128, 128, ' + (0,_math_vec__WEBPACK_IMPORTED_MODULE_1__.interpolate)(0.25, 0.5, gridScale - 1) + ')'
		context.stroke()
	}
	if (this.showCords) {
		context.font = '10px Arial'
		context.fillText(
			(Math.round(view.x * this.axisScale) / this.axisScale + Number.EPSILON) +
			',' + (Math.round(view.y * this.axisScale + Number.EPSILON) / this.axisScale) +
			',' + (Math.round(view.scale * this.axisScale + Number.EPSILON) / this.axisScale), 10, 50)
	}
}


GridPloter.prototype.drawCod = function (eX, eY, view, context) {
	const { x: centerX, y: centerY, scale } = view
	var canvasWidth = context.canvas.clientWidth
	var canvasHeight = context.canvas.clientHeight
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	var x = (eX - centerX) * scale + canvasWidthHalf
	var y = (eY - centerY) * scale + canvasHeightHalf
	let outOfScreen = false
	if (x < 5 ||
		x > canvasWidth - 19 ||
		y > canvasHeight - 28 ||
		y < 14) {
		outOfScreen = true
	}


	if (x < 5) {
		x = 5
	}
	if (y < 14) {
		y = 14
	}
	if (x > canvasWidth - 19) {
		x = canvasWidth - 19
	}
	if (y > canvasHeight - 28) {
		y = canvasHeight - 28
	}
	context.font = '14px Verdana'
	context.fillStyle = 'rgb(0, 0, 0, 1.0)'
	function trimNum(value) {
		return +parseFloat(value).toFixed(2)
	}

	let text = ""
	let ext = trimNum((eX / this.axisScale))
	let eyt = trimNum((-eY / this.axisScale))
	if (ext) {
		text += ext
	}
	if (eyt) {
		text += eyt
	}
	if (!eyt && !ext && !outOfScreen) {
		text += "0"
	}

	context.fillText(text, x + 5, y + 14)
}

GridPloter.prototype.line = function (startx, starty, sizex, sizey, color) {
	this.context.lineWidth = 1
	this.context.moveTo(startx, starty)
	this.context.lineTo(startx + sizex, starty + sizey)
	this.context.strokeStyle = color
	this.context.stroke()
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridPloter);

/***/ }),

/***/ "../lib/ecs/drawers/drawMass.js":
/*!**************************************!*\
  !*** ../lib/ecs/drawers/drawMass.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/physics.js */ "../lib/ecs/physics/physics.js");
/* harmony import */ var _physics_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../physics/transform */ "../lib/ecs/physics/transform.js");
/* harmony import */ var _imageData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imageData.js */ "../lib/ecs/drawers/imageData.js");




const squareDistance = (point, nodeB) => {
	var square = 0
	for (var i = 0; i < point.length; i++)
		square += Math.pow((point[i] - nodeB.positions[i]), 2)
	return isNaN(square) || square < 1 ? 1 : square
}

var COLORS = 16 * 16

function MassPloter(context, manager) {
	this.context = context
	this.imgData = new _imageData_js__WEBPACK_IMPORTED_MODULE_2__.ImageDataPloter(context, manager)
	this.manager = manager
}

MassPloter.prototype.update = function () {
	this.imgData.update()
}

MassPloter.prototype.draw = function (view) {
	const { x: centerX, y: centerY, scale } = view
	const { context } = this
	var canvasWidth = context.canvas.clientWidth
	var canvasHeight = context.canvas.clientHeight
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	const stepX = 2
	const stepY = 2
	const halfStepX = stepX / 2
	const halfStepY = stepY / 2
	var startx = (centerX + canvasWidthHalf) % stepX
	var starty = (centerY + canvasHeightHalf) % stepY
	var inverseScale = stepY / scale
	const points = this.manager.getEnities(_physics_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics).map(
		(elem) => {
			var physics = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem)[0]
			var transform = this.manager.get(_physics_transform__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0]
			return {
				mass: physics.mass,
				positions: transform.positions
			}
		})
	this.imgData.pull()
	for (var x = startx; x <= canvasWidth; x += stepX) {
		var realX = (x - canvasWidthHalf) / scale + centerX
		var realY = (starty - canvasHeightHalf) / scale + centerY
		for (var y = starty; y <= canvasHeight; y += stepY) {
			var sum = 0
			var pointsLength = points.length
			for (var i = 0; i < pointsLength; i++) {
				var point = points[i]
				sum += 3000 * point.mass / squareDistance([realX, realY], point)
			}
			var colorMin2 = Math.min(sum / 16.0, COLORS - 1)
			var colorMin = Math.max(Math.min(sum, COLORS - 1) - colorMin2 * colorMin2 * 0.3, 0)
			this.imgData.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [colorMin2, 0, colorMin])
			realY += inverseScale
		}
	}
	context.putImageData(this.imgData.img, 0, 0)
}

MassPloter.prototype.imgRect = function (x, y, width, height, color) {

	const realWidth = Math.max(Math.min(width, this.context.canvas.clientWidth - x), 0)
	const realHeight = Math.max(Math.min(height, this.context.canvas.clientHeight - y), 0)
	const realX = Math.max(Math.round(x), 0)
	const realY = Math.max(Math.round(y), 0)
	const data = this.img.data
	const startX = realX * 4
	const endX = realWidth * 4 + startX
	const rowLength = this.context.canvas.clientWidth * 4
	const startY = realY * rowLength
	const endY = realHeight * rowLength + startY
	for (var i = startY; i < endY; i += rowLength) {
		for (var j = startX; j < endX; j += 4) {
			var ij = i + j
			data[ij] = color[0]
			data[ij + 1] = color[1]
			data[ij + 2] = color[2]
			data[ij + 3] = color[3]
		}
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MassPloter);

/***/ }),

/***/ "../lib/ecs/drawers/imageData.js":
/*!***************************************!*\
  !*** ../lib/ecs/drawers/imageData.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageDataPloter": () => (/* binding */ ImageDataPloter)
/* harmony export */ });
/* harmony import */ var _math_vec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/vec.js */ "../lib/math/vec.js");


const distance = (point, pointB) => {
    var square = 0
    for (var i = 0; i < point.length; i++)
        square += (point[i] - pointB[i]) * (point[i] - pointB[i])
    return isNaN(square) || square < 1 ? 1 : Math.sqrt(square)
}

function ImageDataPloter(context, manager) {
    this.context = context
    this.update();
    this.manager = manager
}

ImageDataPloter.prototype.update = function () {
    this.width = this.context.canvas.clientWidth
    this.height = this.context.canvas.clientHeight
    this.img = this.context.createImageData(this.width, this.height)
}
ImageDataPloter.prototype.pull = function () {
    this.img = this.context.getImageData(0, 0,
        this.width, this.height)
}

ImageDataPloter.prototype.imgRect = function (x, y, width, height, color) {
    if (color[3] == undefined) {
        color.push(Math.min(distance(color, [0, 0, 0]) * 2, 255))
    }

    const realWidth = Math.max(Math.min(width, this.width - x), 0)
    const realHeight = Math.max(Math.min(height, this.height - y), 0)
    const realX = Math.max(Math.round(x), 0)
    const realY = Math.max(Math.round(y), 0)
    const data = this.img.data
    const startX = realX * 4
    const endX = realWidth * 4 + startX
    const rowLength = this.width * 4
    const startY = realY * rowLength
    const endY = realHeight * rowLength + startY
    const over = color[3] / 255
    for (var i = startY; i < endY; i += rowLength) {
        for (var j = startX; j < endX; j += 4) {
            var ij = i + j
            data[ij] = (0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.interpolate)(data[ij], color[0], over)
            data[ij + 1] = (0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.interpolate)(data[ij + 1], color[1], over)
            data[ij + 2] = (0,_math_vec_js__WEBPACK_IMPORTED_MODULE_0__.interpolate)(data[ij + 2], color[2], over)
            data[ij + 3] = Math.max(color[3], data[ij + 3])
        }
    }
}

/***/ }),

/***/ "../lib/ecs/drawers/ploter.js":
/*!************************************!*\
  !*** ../lib/ecs/drawers/ploter.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../math/view */ "../lib/math/view.js");


function Ploter(canvas) {
	this.canvas = canvas
	this.context = this.canvas.getContext('2d', { willReadFrequently: true })
	this.img = this.context.createImageData(this.canvas.width, this.canvas.height)
}

Ploter.prototype.clear = function () {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Ploter.prototype.getCanvas = function () {
	return this.canvas
}

Ploter.prototype.worldToScreen = function (view, point) {
	const { width: canvasWidth, height: canvasHeight } = this.canvas
	const { x: centerX, y: centerY, scale } = view
	return (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.worldToScreen)(
		centerX,
		centerY,
		scale,
		canvasWidth,
		canvasHeight,
		point[0],
		point[1]
	)
}

Ploter.prototype.screenToWorld = function (view, point) {
	const { width: canvasWidth, height: canvasHeight } = this.canvas
	const { x: centerX, y: centerY, scale } = view
	return (0,_math_view__WEBPACK_IMPORTED_MODULE_0__.screenToWorld)(
		centerX,
		centerY,
		scale,
		canvasWidth,
		canvasHeight,
		point[0],
		point[1]
	)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ploter);

/***/ }),

/***/ "../lib/ecs/drawers/render.js":
/*!************************************!*\
  !*** ../lib/ecs/drawers/render.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderEngine": () => (/* binding */ RenderEngine),
/* harmony export */   "Renderer": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _physics_transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/transform.js */ "../lib/ecs/physics/transform.js");
/* harmony import */ var _shapes_box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shapes/box.js */ "../lib/shapes/box.js");
/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shapes/circle.js */ "../lib/shapes/circle.js");
/* harmony import */ var _shapes_text_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shapes/text.js */ "../lib/shapes/text.js");
/* harmony import */ var _shapes_sprite_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shapes/sprite.js */ "../lib/shapes/sprite.js");
/* harmony import */ var _shapes_rounded_box_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shapes/rounded-box.js */ "../lib/shapes/rounded-box.js");
/* harmony import */ var _physics_transformRotate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../physics/transformRotate.js */ "../lib/ecs/physics/transformRotate.js");
/* harmony import */ var _shapes_noScale_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shapes/noScale.js */ "../lib/shapes/noScale.js");
/* harmony import */ var _shapes_scale_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shapes/scale.js */ "../lib/shapes/scale.js");










function Renderer(color, stroke, layer) {
	this.color = color
	this.stroke = stroke
	this.layer = layer || 0
}

function RenderEngine(context, manager) {
	this.context = context
	this.manager = manager
	this.maxSize = 100
}

function shapeDone(context, renderer) {
	if (renderer.color) {
		context.fillStyle = renderer.color;
		context.fill()
	}
	if (renderer.stroke) {
		context.strokeStyle = renderer.stroke.color;
		context.lineWidth = renderer.stroke.width;
		context.stroke()
	}
}

function roundedRect(context, x, y, width, height, radius) {
	context.moveTo(x, y + radius);
	context.lineTo(x, y + height - radius);
	context.arcTo(x, y + height, x + radius, y + height, radius);
	context.lineTo(x + width - radius, y + height);
	context.arcTo(x + width, y + height, x + width, y + height - radius, radius);
	context.lineTo(x + width, y + radius);
	context.arcTo(x + width, y, x + width - radius, y, radius);
	context.lineTo(x + radius, y);
	context.arcTo(x, y, x, y + radius, radius);
}

RenderEngine.prototype.draw = function (view) {
	const { context } = this
	var canvasWidth = context.canvas.clientWidth
	var canvasHeight = context.canvas.clientHeight
	const { x: centerX, y: centerY, scale, angle } = view
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	const maxSize = this.maxSize * scale;
	if (angle) {
		context.save();
		context.translate(canvasWidthHalf, canvasHeightHalf);
		context.rotate(angle);
		context.translate(-canvasWidthHalf, -canvasHeightHalf);
	}
	this.manager.getEnities(Renderer).map(elem => {
		var renderer = this.manager.get(Renderer, elem)[0]
		return [elem, renderer]
	}).sort(([, a], [, b]) => {
		if (a.layer < b.layer) {
			return -1;
		}
		if (a.layer > b.layer) {
			return 1;
		}
		// a must be equal to b
		return 0;
	}
	).map(
		([elem, renderer]) => {
			var transform = this.manager.get(_physics_transform_js__WEBPACK_IMPORTED_MODULE_0__.Transform, elem)[0]
			var x = (transform.positions[0] - centerX) * scale + canvasWidthHalf
			var y = (transform.positions[1] - centerY) * scale + canvasHeightHalf
			if (x < -maxSize || y < -maxSize || x > canvasWidth || y > canvasHeight)
				return

			let fixed = this.manager.get(_shapes_noScale_js__WEBPACK_IMPORTED_MODULE_7__.ShapeNoScale, elem)[0]
			let selfScale = this.manager.get(_shapes_scale_js__WEBPACK_IMPORTED_MODULE_8__.ShapeScale, elem)[0]
			let scaleWith = fixed ? 1 : scale * (selfScale?.scale || 1)

			let circles = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_2__.ShapeCircle, elem)
			for (let i in circles) {
				let circle = circles[i];
				const elementSize = circle.radius * scaleWith > 1 ? circle.radius * scaleWith : 1
				context.beginPath()
				context.arc(x, y, elementSize, 0, 2 * Math.PI, false)
				shapeDone(context, renderer);
			}
			let boxes = this.manager.get(_shapes_box_js__WEBPACK_IMPORTED_MODULE_1__.ShapeBox, elem)
			let rounded = this.manager.get(_shapes_rounded_box_js__WEBPACK_IMPORTED_MODULE_5__.ShapeRounded, elem)
			let rotate = this.manager.get(_physics_transformRotate_js__WEBPACK_IMPORTED_MODULE_6__.TransformRotate, elem)[0]
			for (let i in boxes) {
				let box = boxes[i];
				const size_x = box.x * scaleWith > 1 ? box.x * scaleWith : 1
				const size_y = box.y * scaleWith > 1 ? box.y * scaleWith : 1
				context.save();
				if (rotate) {
					context.translate(x + size_x / 2, y + size_y / 2);
					context.rotate(rotate.rotate);
					context.translate(-x - size_x / 2, -y - size_y / 2);
				}
				context.beginPath();
				if (rounded[0]) {
					roundedRect(context, x, y, size_x, size_y, rounded[0].radius)
				}
				else {
					context.rect(x, y, size_x, size_y);
				}
				shapeDone(context, renderer);
				context.restore();
			}
			let sprites = this.manager.get(_shapes_sprite_js__WEBPACK_IMPORTED_MODULE_4__.Sprite, elem)
			for (let i in sprites) {
				let sprite = sprites[i];
				let box = boxes[0];
				let spriteWith = box?.x || sprite.image.width
				let spriteHeight = box?.x || sprite.image.height
				const size_x = spriteWith * scaleWith > 1 ? spriteWith * scaleWith + 0.5 : 1
				const size_y = spriteHeight * scaleWith > 1 ? spriteHeight * scaleWith + 0.5 : 1
				context.save();
				if (rotate) {
					context.translate(x + size_x / 2, y + size_y / 2);
					context.rotate(rotate.rotate);
					context.translate(-x - size_x / 2, -y - size_y / 2);
				}
				context.drawImage(sprite.image, x, y, size_x, size_y);
				context.restore();
			}
			let texts = this.manager.get(_shapes_text_js__WEBPACK_IMPORTED_MODULE_3__.ShapeText, elem)
			for (let i in texts) {
				let text = texts[i]
				const size_y = text.font * scaleWith > 1 ? text.font * scaleWith : 1
				context.fillStyle = renderer.color;
				context.font = parseInt(size_y) + 'px serif';
				context.save();
				if (rotate) {
					context.translate(x, y);
					context.rotate(rotate.rotate);
					context.translate(-x, -y);
				}
				context.fillText(text.text, x, y + parseInt(size_y));
				context.restore();
			}
		}
	)
	if (angle) {
		context.restore()
	}
}
RenderEngine.prototype.mesure = function (text) {
	const { context } = this
	context.font = parseInt(text.font) + 'px serif';
	return context.measureText(text.text);
}



/***/ }),

/***/ "../lib/ecs/index.js":
/*!***************************!*\
  !*** ../lib/ecs/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Entity": () => (/* binding */ Entity),
/* harmony export */   "EntityManager": () => (/* binding */ EntityManager)
/* harmony export */ });
const ENTITY_INDEX_BITS = 22
const ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1

const ENTITY_GENERATION_BITS = 8
const ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1
const MINIMUM_FREE_INDICES = 0

function Entity(id) {
	this.id = id
}
Entity.prototype.index = function () {
	return this.id & ENTITY_INDEX_MASK
}
Entity.prototype.generation = function () {
	return (this.id >> ENTITY_INDEX_BITS) & ENTITY_GENERATION_MASK
}

function EntityManager() {
	this._generation = {}
	this._free_indices = []
	this._entities = {}
	this._components = {}
	this.__entities_with_type = {}
}

EntityManager.prototype.create = function () {
	var idx = 0
	if (this._free_indices.length > MINIMUM_FREE_INDICES) {
		idx = this._free_indices.shift()
	} else {
		idx = Object.keys(this._generation).length
		this._generation[idx] = 0
	}
	var entity = this.make_entity(idx, this._generation[idx])
	this._entities[idx] = entity
	return entity
}

EntityManager.prototype.make_entity = function (idx, generation) {
	return new Entity(idx + (generation << ENTITY_INDEX_BITS))
}

EntityManager.prototype.alive = function (e) {
	return this._generation[e.index()] == e.generation()
}

EntityManager.prototype.destroy = function (e) {
	this._components[e.id] = undefined
	this._entities[e.id] = undefined
	++this._generation[e.index()]
	this._free_indices.push(e.index())
}

EntityManager.prototype.asign = function (component, e) {
	var entity_components = this._components[e.id]
	if (!entity_components) {
		this._components[e.id] = {
			[component.constructor.name]: [component]
		}
		return
	}
	var components_of_type = entity_components[component.constructor.name]
	if (!components_of_type) {
		this._components[e.id][component.constructor.name] = [component]
		return
	}
	if (components_of_type &&
		entity_components[component.constructor.name].find(comp => component === comp)
	)
		throw Error('Component is allready asiged')
	entity_components[component.constructor.name].push(component)
}

EntityManager.prototype.get = function (c_type, e) {
	var entity_components = this._components[e.id]
	if (!entity_components) {
		return []
	}
	var components_of_type = entity_components[c_type.name]
	if (!components_of_type) {
		return []
	}
	return components_of_type
}

EntityManager.prototype.remove = function (component, e) {
	var entity_components = this._components[e.id]
	if (!entity_components) {
		return
	}
	var components_of_type = entity_components[component.constructor.name]
	if (!components_of_type) {
		return
	}
	entity_components[component.constructor.name] = entity_components[component.constructor.name].filter(function (compon) {
		return compon !== component
	})
}

EntityManager.prototype.getEnities = function (c_type) {
	return Object.values(this._entities).filter(
		(entity) => {
			return entity && this.get(c_type, entity).length
		}
	)
}




/***/ }),

/***/ "../lib/ecs/physics/chainEngine.js":
/*!*****************************************!*\
  !*** ../lib/ecs/physics/chainEngine.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChainEngine": () => (/* binding */ ChainEngine),
/* harmony export */   "ChainLink": () => (/* binding */ ChainLink)
/* harmony export */ });
/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ "../lib/ecs/physics/physics.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ "../lib/ecs/physics/transform.js");



function ChainLink(connects, distance) {
	this.connects = connects
	this.distance = distance
}

function computeChainForce(
	naibor,
	transform,
) {
	var ret = [0, 0]
	naibor.forEach(({ transform: naiborTranform, distance: naiborDistance }) => {
		var distanceX = (naiborTranform.positions[0] - transform.positions[0])
		var distanceY = (naiborTranform.positions[1] - transform.positions[1])
		var distanceAngle = Math.atan2(distanceY, distanceX)
		var distance = Math.sqrt(
			distanceX * distanceX
			+ distanceY * distanceY)
		var distanceNormalised = distance / naiborDistance
		var forceIntencity = (Math.atan((distanceNormalised - 1) * 5) + Math.pow(distanceNormalised - 1, 3))
		var forceComponents = {
			x: Math.cos(distanceAngle) * forceIntencity,
			y: Math.sin(distanceAngle) * forceIntencity
		}
		ret[0] += forceComponents.x
		ret[1] += forceComponents.y
	})
	return ret
}

function ChainEngine(manager) {
	this.manager = manager

}

ChainEngine.prototype.compute = function () {
	this.manager.getEnities(ChainLink).map(
		(elem) => {
			var chainLinks = this.manager.get(ChainLink, elem)
			var naibor = chainLinks.map(link => ({ transform: this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__.Transform, link.connects)[0], distance: link.distance }))
			var transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0]
			var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem)[0]
			var force = computeChainForce(
				naibor,
				transform
			)
			physics.applyForce(force)
		}
	)
}



/***/ }),

/***/ "../lib/ecs/physics/gravityEngine.js":
/*!*******************************************!*\
  !*** ../lib/ecs/physics/gravityEngine.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GravityEngine": () => (/* binding */ GravityEngine)
/* harmony export */ });
/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ "../lib/ecs/physics/physics.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ "../lib/ecs/physics/transform.js");



function GravityEngine(manager, interaction) {
	this.manager = manager
	this.interaction = interaction ? interaction : 0.1
}

function computeAttraction(
	compute,
	naibors,
	interaction
) {
	var ret = [0, 0]
	naibors.forEach(element => {
		if (element == compute) return
		var distanceX = (element.positions[0] - compute.positions[0])
		var distanceY = (element.positions[1] - compute.positions[1])

		var distance2 = distanceX * distanceX + distanceY * distanceY
		var distance = Math.sqrt(distance2)

		var ascIntencity = element.mass / distance2 * interaction
		ret[0] += distanceX / distance * ascIntencity
		ret[1] += distanceY / distance * ascIntencity
	})
	return ret
}

GravityEngine.prototype.compute = function () {

	var physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics)
		.map((elem) => {
			var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem)[0]
			var transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0]
			return {
				e: elem,
				mass: physics.mass,
				physics,
				positions: transform.positions
			}
		})

	for (var i = 0; i < physic_entity.length; i++) {
		var elem = physic_entity[i]
		var asc = computeAttraction(
			elem,
			physic_entity, this.interaction)
		elem.physics.applyAsc(asc)
	}
}



/***/ }),

/***/ "../lib/ecs/physics/physics.js":
/*!*************************************!*\
  !*** ../lib/ecs/physics/physics.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Physics": () => (/* binding */ Physics),
/* harmony export */   "PhysicsEngine": () => (/* binding */ PhysicsEngine)
/* harmony export */ });
/* harmony import */ var _shapes_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/vector */ "../lib/shapes/vector.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform */ "../lib/ecs/physics/transform.js");


function Physics(speeds, mass, drag) {
	this.speeds = new _shapes_vector__WEBPACK_IMPORTED_MODULE_0__.Vector(speeds)
	this.mass = mass
	this.drag = isNaN(drag) ? 0.001 : drag
	this.maxSpeed = 100
}


Physics.prototype.applyForce = function (force) {
	for (var i = 0; i < this.speeds.length; i++) {
		if (isNaN(force[i])) throw new Error("Physics.prototype.applyForce got NnN")
		this.speeds[i] += force[i] / this.mass
	}
}

Physics.prototype.applyAsc = function (asc) {
	for (var i = 0; i < this.speeds.length; i++) {
		if (isNaN(asc[i])) throw new Error("Physics.prototype.applyAsc got NnN")
		this.speeds[i] += asc[i]
	}
}

Physics.prototype.compute = function () {
	var speedValue = 0
	var i
	for (i = 0; i < this.speeds.length; i++) {
		speedValue += this.speeds[i] * this.speeds[i]
	}

	var speedMultipliyer = Math.min(1 - this.drag, this.maxSpeed / speedValue)

	for (i = 0; i < this.speeds.length; i++) {
		this.speeds[i] *= speedMultipliyer
	}
}

function PhysicsEngine(manager, engines) {
	this.manager = manager
	this.engines = engines
}

PhysicsEngine.prototype.compute = function () {
	this.engines.forEach(engine => engine.compute())
	this.manager.getEnities(Physics).forEach(elem => {
		var physics = this.manager.get(Physics, elem)[0]
		physics.compute()
		var transform = this.manager.get(_transform__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0]
		transform.positions = transform.positions.add(physics.speeds)
	})
}



/***/ }),

/***/ "../lib/ecs/physics/plasticColisionEngine.js":
/*!***************************************************!*\
  !*** ../lib/ecs/physics/plasticColisionEngine.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlasticBody": () => (/* binding */ PlasticBody),
/* harmony export */   "PlasticColisionEngine": () => (/* binding */ PlasticColisionEngine)
/* harmony export */ });
/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/circle.js */ "../lib/shapes/circle.js");
/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./physics.js */ "../lib/ecs/physics/physics.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transform.js */ "../lib/ecs/physics/transform.js");





function PlasticBody() { }

function PlasticColisionEngine(manager) {
	this.manager = manager
	this.physic_entity = null
}

function squareDistance(nodeA, nodeB) {
	var square = 0
	for (var i = 0; i < nodeA.positions.length; i++)
		square += Math.pow((nodeA.positions[i] - nodeB.positions[i]), 2)
	return square
}

function computeColision(
	compute,
	naibors
) {
	var collisions = []
	naibors.forEach(element => {
		if (element == compute) return
		var distanceX = (element.positions[0] - compute.positions[0])
		var distanceY = (element.positions[1] - compute.positions[1])
		var centerDistance = compute.radius + element.radius
		if (Math.abs(distanceX) > centerDistance || Math.abs(distanceY) > centerDistance)
			return

		var distance2 = squareDistance(compute, element)
		if (distance2 > Math.pow(centerDistance, 2))
			return
		if (compute.radius > element.radius)
			collisions.push(element)
	})
	return collisions
}

PlasticColisionEngine.prototype.compute = function () {

	var physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics).filter(elem =>
		this.manager.get(PlasticBody, elem)[0]
	).map((elem) => {
		var circle = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__.ShapeCircle, elem)[0]
		var transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_2__.Transform, elem)[0]
		var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics, elem)[0]
		return {
			e: elem,
			radius: circle.radius,
			circle,
			positions: transform.positions,
			speeds: physics.speeds,
			physics
		}
	})

	for (var i = 0; i < physic_entity.length; i++) {

		var elem = physic_entity[i]
		if (!this.manager.alive(elem.e))
			continue
		var colisions = computeColision(
			elem,
			physic_entity)
		for (var collisionIndex in colisions) {
			var collision = colisions[collisionIndex]
			if (!this.manager.alive(collision.e))
				continue
			this.manager.destroy(collision.e)
			this.merge(elem, collision)
		}
	}
}

PlasticColisionEngine.prototype.merge = function (nodeA, nodeB) {
	var cubeRadiusA = Math.pow(nodeA.radius, 3);
	var cubeRadiusB = Math.pow(nodeB.radius, 3);
	var newRadious = Math.cbrt(cubeRadiusA + cubeRadiusB);

	nodeA.circle.radius = newRadious
	var massA = nodeA.physics.mass
	var massB = nodeB.physics.mass
	nodeA.physics.mass = massA + massB

	for (var i = 0; i < nodeA.speeds.length; i++) {
		nodeA.speeds[i] = (nodeA.speeds[i] * massA + nodeB.speeds[i] * massB) / (massA + massB)
	}
}



/***/ }),

/***/ "../lib/ecs/physics/transform.js":
/*!***************************************!*\
  !*** ../lib/ecs/physics/transform.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transform": () => (/* binding */ Transform)
/* harmony export */ });
/* harmony import */ var _shapes_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/vector */ "../lib/shapes/vector.js");


function Transform(positions) {
	this.positions = new _shapes_vector__WEBPACK_IMPORTED_MODULE_0__.Vector(positions)
}



/***/ }),

/***/ "../lib/ecs/physics/transformRotate.js":
/*!*********************************************!*\
  !*** ../lib/ecs/physics/transformRotate.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransformRotate": () => (/* binding */ TransformRotate)
/* harmony export */ });
/* harmony import */ var _shapes_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shapes/vector */ "../lib/shapes/vector.js");


function TransformRotate(rotate) {
	this.rotate = rotate
}


/***/ }),

/***/ "../lib/fe/touch.js":
/*!**************************!*\
  !*** ../lib/fe/touch.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// written by Slobodan Zivkovic slobacartoonac@gmail.com
function distance2d(a, b) {
	return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
}

function len2d(a) {
	return Math.sqrt(a.x * a.x + a.y * a.y)
}

function getDelta(p1, n1, p2, n2) {
	if (!n2) {
		return { x: n1.x - p1.x, y: n1.y - p1.y }
	}
	return { x: ((n1.x - p1.x) + (n2.x - p2.x)) / 2, y: ((n1.y - p1.y) + (n2.y - p2.y)) / 2 }
}

function getZoom(p1, n1, p2, n2) {
	if (!n2) {
		return 1
	}
	if (!p2) {
		return 1
	}
	let initialDistance = distance2d(p1, p2);
	let newDistance = distance2d(n1, n2);
	if (initialDistance < 0.01)
		return 1
	else
		return newDistance / initialDistance
}

function getAngleDelta(p1, n1, p2, n2) {
	if (!n2) {
		return 0
	}
	let angle1 = getAngle(p1, p2)
	let angle2 = getAngle(n1, n2)
	return angle2 - angle1
}

function getAngle(p1, n1) {
	let delta = getDelta(p1, n1)
	let angle = Math.atan2(delta.y, delta.x)
	return angle
}

function Touch(div, deadzone) {
	this.deadzone = deadzone
	this.clear()
	let startPosition = null
	let startMoveSecound = null
	let position = null
	let thisMoveSecound = null
	let mouseDown = 0;
	let click = true;
	let touch = false;
	let touchSecound = false;
	this.centerPosition = { x: 0, y: 0 };
	this.debug = false;
	this.console_error = false;
	this.throw_error = false;
	this.last_error = ''
	const moveTouchT = (e) => {
		e.preventDefault()
		const { top, left } = e.target.getBoundingClientRect()
		if (e.touches[1] && e.touches[0]) {
			let first = { x: e.touches[0].clientX - left, y: e.touches[0].clientY - top }
			let secound = { x: e.touches[1].clientX - left, y: e.touches[1].clientY - top }
			this.centerPosition = { x: (first.x + secound.x) / 2, y: (first.y + secound.y) / 2 }
			return moveTouch(first, secound)
		}
		if (e.touches[0]) {
			let first = { x: e.touches[0].clientX - left, y: e.touches[0].clientY - top }
			this.centerPosition = { x: first.x, y: first.y }
			return moveTouch(first)
		}
	}
	const moveTouchM = (e) => {
		e.preventDefault()
		const { top, left } = e.target.getBoundingClientRect()
		this.centerPosition = { x: e.clientX - left, y: e.clientY - top }
		if (mouseDown) moveTouch({ x: e.clientX - left, y: e.clientY - top })
	}

	const moveTouch = (e, secound) => {
		touch = true;
		if (startPosition == null) {
			startPosition = { x: e.x, y: e.y }
			position = { x: e.x, y: e.y }
			this.triger('start', position)
			click = true
			return;
		}
		if (secound && startMoveSecound == null) {
			touchSecound = true;
			if (distance2d(startPosition, secound) < distance2d(startPosition, e)) {
				//switched touches
				startPosition = { x: e.x, y: e.y };
				position = { x: e.x, y: e.y };
			}
			startMoveSecound = { x: secound.x, y: secound.y }
			thisMoveSecound = { x: secound.x, y: secound.y }
			return;
		}
		if (!secound && startMoveSecound) {
			touchSecound = false;
			startMoveSecound = null
			thisMoveSecound = null
			return;
		}


		let delta = getDelta(position, e, thisMoveSecound, secound)
		let deltaZoom = getZoom(position, e, thisMoveSecound, secound)
		let deltaAngle = getAngleDelta(position, e, thisMoveSecound, secound)
		position = { x: e.x, y: e.y }
		thisMoveSecound = secound ? { x: secound.x, y: secound.y } : null
		let direction = getDelta(startPosition, position, startMoveSecound, thisMoveSecound)
		let zoom = getZoom(startPosition, position, startMoveSecound, thisMoveSecound)
		let distance = len2d(direction)
		let angle = getAngleDelta(startPosition, position, startMoveSecound, thisMoveSecound)
		let debug = this.debug && `${startPosition && 'Start: ' + JSON.stringify(startPosition)},
		${position && 'This: ' + JSON.stringify(position)}, 
		${startMoveSecound && 'Start secound: ' + JSON.stringify(startMoveSecound)}, 
		${thisMoveSecound && 'Start this: ' + JSON.stringify(thisMoveSecound)},
		${delta && 'Delta: ' + JSON.stringify(delta)},
		${'Zoom: ' + zoom},
		${'DZoom: ' + deltaZoom}
		${'Angle: ' + angle}
		${'DAngle: ' + deltaAngle}
		${'isPrimary: ' + ((!touchSecound && mouseDown == 0) || mouseDown == 1)}
		${this.last_error}`
		let addition = {
			delta,
			direction,
			startPosition,
			position,
			distance,
			click,
			isClick: click,
			mouseDown,
			zoom,
			deltaZoom,
			touchSecound,
			angle,
			deltaAngle,
			isPrimary: ((!touchSecound && mouseDown == 0) || mouseDown == 1),
			debug,
			centerPosition: this.centerPosition
		}

		this.triger('force', addition)
		if (distance > this.deadzone) {
			click = false
			if (Math.abs(direction.x) > Math.abs(direction.y)) {
				if (direction.x > 0) {
					this.triger('right', addition)
				} else {
					this.triger('left', addition)
				}
			} else if (direction.y > 0) {
				this.triger('down', addition)
			} else {
				this.triger('up', addition)
			}
		}
	}
	//= {up:[],down:[],left:[],right:[],stop:[],click:[],force:[]}
	const stopTouch = (e) => {
		e.preventDefault()
		if (touch == false) {
			return
		}
		let delta = { x: 0, y: 0 }
		let deltaZoom = 0
		let deltaAngle = 0
		let direction = getDelta(startPosition, position, startMoveSecound, thisMoveSecound)
		let zoom = getZoom(startPosition, position, startMoveSecound, thisMoveSecound)
		let angle = getAngleDelta(startPosition, position, startMoveSecound, thisMoveSecound)
		let distance = len2d(direction)
		let debug = this.debug && `${startPosition && 'Start: ' + JSON.stringify(startPosition)},
		${position && 'This: ' + JSON.stringify(position)}, 
		${startMoveSecound && 'Start secound: ' + JSON.stringify(startMoveSecound)}, 
		${thisMoveSecound && 'Start this: ' + JSON.stringify(thisMoveSecound)},
		${delta && 'Delta: ' + JSON.stringify(delta)},
		${'Zoom: ' + zoom},
		${'DZoom: ' + deltaZoom}
		${'Angle: ' + angle}
		${'DAngle: ' + deltaAngle}
		${'isPrimary: ' + ((!touchSecound && mouseDown == 0) || mouseDown == 1)}
		${this.last_error}`
		const addition = {
			x: startPosition.x,
			y: startPosition.y,
			delta,
			direction,
			startPosition,
			position,
			distance,
			click,
			isClick: click,
			mouseDown,
			zoom,
			deltaZoom,
			touchSecound,
			angle,
			deltaAngle,
			isPrimary: ((!touchSecound && mouseDown == 0) || mouseDown == 1),
			debug,
			centerPosition: this.centerPosition
		}
		touch = false
		touchSecound = false;
		let saveMove = startPosition;

		if (click) {
			if (e.button) {
				if (e.button === 1) this.triger('bmiddle', addition)
				if (e.button === 2) this.triger('bright', addition)
			} else if (saveMove) {
				this.triger('click', addition)
			}
		}
		this.triger('stop', addition)
		startPosition = null
		position = null
		startMoveSecound = null
		thisMoveSecound = null
		mouseDown = 0
	}
	div.addEventListener(
		'touchstart',
		e => {
			e.preventDefault()
		},
		false,
	)
	div.addEventListener('touchmove', moveTouchT, false)
	div.addEventListener('touchend', stopTouch, false)
	div.addEventListener('touchstart', moveTouchT, false)
	div.addEventListener('mouseleave', stopTouch, false)
	div.addEventListener('mousemove', moveTouchM)
	div.addEventListener('mouseup', stopTouch)
	div.addEventListener('mousedown', e => {
		mouseDown = 1 + e.button;
		moveTouchM(e)
	})
}
/*eslint-disable */
Touch.prototype.sub = function (ev, func) {
	if (this.events[ev]) this.events[ev].push(func)
}

Touch.prototype.onClick = function (func) {
	this.events.click.push(func)
}
Touch.prototype.onForce = function (func) {
	this.events.force.push(func)
}
Touch.prototype.onStop = function (func) {
	this.events.stop.push(func)
}
Touch.prototype.onUp = function (func) {
	this.events.up.push(func)
}
Touch.prototype.onDown = function (func) {
	this.events.down.push(func)
}
Touch.prototype.onLeft = function (func) {
	this.events.left.push(func)
}
Touch.prototype.onRight = function (func) {
	this.events.right.push(func)
}

Touch.prototype.unsub = function (ev, func) {
	if (this.events[ev])
		this.events[ev] = this.events[ev].filter(fu => fu !== func)
}
Touch.prototype.clearEvlent = function (ev) {
	if (this.events[ev]) this.events[ev] = []
}
Touch.prototype.clear = function () {
	this.events = {
		up: [],
		down: [],
		left: [],
		right: [],
		stop: [],
		start: [],
		click: [],
		force: [],
		bmiddle: [],
		bright: [],
	}
}
Touch.prototype.triger = function (ev, args) {
	if (this.events[ev])
		this.events[ev].forEach(func => {
			try {
				func(args)
			}
			catch (e) {
				if (this.console_error) console.log(e)
				this.last_error = 'Error: ' + e.name +
					' ' + e.foo +
					' ' + e.message +
					' ' + e.stack
				if (this.throw_error) throw e
			}
		})
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Touch);

/***/ }),

/***/ "../lib/math/vec.js":
/*!**************************!*\
  !*** ../lib/math/vec.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "interpolate": () => (/* binding */ interpolate),
/* harmony export */   "interpolateVecs": () => (/* binding */ interpolateVecs),
/* harmony export */   "lineCollision": () => (/* binding */ lineCollision),
/* harmony export */   "magnitude": () => (/* binding */ magnitude),
/* harmony export */   "perpDot": () => (/* binding */ perpDot),
/* harmony export */   "pointInTriangle": () => (/* binding */ pointInTriangle),
/* harmony export */   "sign": () => (/* binding */ sign)
/* harmony export */ });
function sign(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function pointInTriangle(pt, v1, v2, v3) {
    var b1 = sign(pt, v1, v2) < 0.0;
    var b2 = sign(pt, v2, v3) < 0.0;
    var b3 = sign(pt, v3, v1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
}

function dot(a, b) { return (a.x * b.x) + (a.y * b.y); }

function perpDot(a, b) { return (a.y * b.x) - (a.x * b.y); }

function lineCollision(A1, A2,
    B1, B2) {
    var a = { x: A2.x - A1.x, y: A2.y - A1.y };
    var b = { x: B2.x - B1.x, y: B2.y - B1.y };

    var f = perpDot(a, b);
    if (!f)      // lines are parallel
        return false;

    var c = { x: B2.x - A2.x, y: B2.y - A2.y };
    var aa = perpDot(a, c);
    var bb = perpDot(b, c);

    if (f < 0) {
        if (aa > 0) return false;
        if (bb > 0) return false;
        if (aa < f) return false;
        if (bb < f) return false;
    }
    else {
        if (aa < 0) return false;
        if (bb < 0) return false;
        if (aa > f) return false;
        if (bb > f) return false;
    }
    return true;
}

function interpolateVecs(vecA, vecB, over) {
    let left = 1 - over
    return { x: vecA.x * left + vecB.x * over, y: vecA.y * left + vecB.y * over }
}
function interpolate(vecA, vecB, over) {
    let left = 1 - over
    return vecA * left + vecB * over
}
function magnitude(aX, aY) {
    return Math.sqrt(aX * aX, aY * aY)
}

function distance(aX, aY, bX, bY) {
    return magnitude(aX - bX, aY - bY)
}



/***/ }),

/***/ "../lib/math/view.js":
/*!***************************!*\
  !*** ../lib/math/view.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "screenToWorld": () => (/* binding */ screenToWorld),
/* harmony export */   "worldToScreen": () => (/* binding */ worldToScreen)
/* harmony export */ });
function worldToScreen(
    viewCenterX,
    viewCenterY,
    viewScale,
    screenW,
    screenH,
    pointX,
    pointY) {
    const widthHalf = screenW / 2
    const heightHalf = screenH / 2
    var screenX = (pointX - viewCenterX) * viewScale + widthHalf
    var screenY = (pointY - viewCenterY) * viewScale + heightHalf
    return [screenX, screenY]
}

function screenToWorld(
    viewCenterX,
    viewCenterY,
    viewScale,
    screenW,
    screenH,
    pointX,
    pointY) {
    const widthHalf = screenW / 2
    const heightHalf = screenH / 2
    var worldX = (pointX - widthHalf) / viewScale + viewCenterX
    var worldY = (pointY - heightHalf) / viewScale + viewCenterY
    return [worldX, worldY]
}

/***/ }),

/***/ "../lib/shapes/box.js":
/*!****************************!*\
  !*** ../lib/shapes/box.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeBox": () => (/* binding */ ShapeBox)
/* harmony export */ });
function ShapeBox(size_x, size_y) {
	this.x = size_x;
	this.y = size_y;
}



/***/ }),

/***/ "../lib/shapes/circle.js":
/*!*******************************!*\
  !*** ../lib/shapes/circle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeCircle": () => (/* binding */ ShapeCircle)
/* harmony export */ });
function ShapeCircle(radius){
	this.radius = radius
}



/***/ }),

/***/ "../lib/shapes/noScale.js":
/*!********************************!*\
  !*** ../lib/shapes/noScale.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeNoScale": () => (/* binding */ ShapeNoScale)
/* harmony export */ });
function ShapeNoScale() {
    this.noscale = true
}



/***/ }),

/***/ "../lib/shapes/rounded-box.js":
/*!************************************!*\
  !*** ../lib/shapes/rounded-box.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeRounded": () => (/* binding */ ShapeRounded)
/* harmony export */ });
function ShapeRounded(radius) {
	this.radius = radius;
}



/***/ }),

/***/ "../lib/shapes/scale.js":
/*!******************************!*\
  !*** ../lib/shapes/scale.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeScale": () => (/* binding */ ShapeScale)
/* harmony export */ });
function ShapeScale(scale) {
    this.scale = scale
}



/***/ }),

/***/ "../lib/shapes/sprite.js":
/*!*******************************!*\
  !*** ../lib/shapes/sprite.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprite": () => (/* binding */ Sprite)
/* harmony export */ });
function Sprite(image) {
	this.image = image
}



/***/ }),

/***/ "../lib/shapes/text.js":
/*!*****************************!*\
  !*** ../lib/shapes/text.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeText": () => (/* binding */ ShapeText)
/* harmony export */ });
function ShapeText(font, text){
	this.font = font;
	this.text = text;
}



/***/ }),

/***/ "../lib/shapes/vector.js":
/*!*******************************!*\
  !*** ../lib/shapes/vector.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector": () => (/* binding */ Vector)
/* harmony export */ });
function Vector(...array) {
	Array.call(this)
	if (array.length == 1) {
		var item = array[0]
		var arr = Object.values(item)
		if (Object.hasOwnProperty.call(item, 'length') &&
			item.length !== arr.length) {
			arr.pop()
		}
		this.push(...arr)
	} else {
		this.push(...Object.values(array))
	}

	Object.defineProperty(this, 'x', {
		get() {
			return this[0];
		},
		set(value) {
			this[0] = value;
		}
	});
	Object.defineProperty(this, 'y', {
		get() {
			return this[1];
		},
		set(value) {
			this[1] = value;
		}
	});
	Object.defineProperty(this, 'z', {
		get() {
			return this[2];
		},
		set(value) {
			this[2] = value;
		}
	});
}

Vector.prototype.x = 0;
Vector.prototype.y = 0;
Vector.prototype.z = 0;

Vector.prototype = Object.create(Array.prototype, {
	constructor: {
		value: Vector,
		enumerable: false, // Make it non-enumerable, so it won't appear in `for...in` loop
		writable: true,
		configurable: true,
	}
})

Vector.prototype.add = function (toAdd) {
	let ret = this.copy()
	for (var k = 0; k < ret.length; k++) {
		if (!Object.hasOwnProperty.call(ret, k)) {
			continue;
		}
		if (!Object.hasOwnProperty.call(toAdd, k)) {
			continue;
		}
		ret[k] += toAdd[k]
	}
	return ret
}

Vector.prototype.update = function (newValues) {
	for (var k = 0; k < this.length; k++) {
		if (!Object.hasOwnProperty.call(this, k)) {
			continue;
		}
		if (!Object.hasOwnProperty.call(newValues, k)) {
			continue;
		}
		this[k] = newValues[k]
	}
}

Vector.prototype.negate = function () {
	let ret = this.copy()
	for (var k = 0; k < ret.length; k++) {
		if (!Object.hasOwnProperty.call(ret, k)) {
			continue;
		}
		ret[k] = -ret[k]
	}
	return ret
}
Vector.prototype.substract = function (toAdd) {
	return this.add(toAdd.negate())
}
Vector.prototype.magnitude = function () {
	let magnitude = 0;
	for (var k = 0; k < this.length; k++) {
		if (!Object.hasOwnProperty.call(this, k)) {
			continue;
		}
		magnitude += this[k] * this[k]
	}
	return Math.sqrt(magnitude);
}
Vector.prototype.normalise = function (toAdd) {
	let magnitude = this.magnitude()
	return this.scale(1 / magnitude)
}
Vector.prototype.scale = function (scale) {
	let ret = this.copy()
	for (var k = 0; k < ret.length; k++) {
		if (!Object.hasOwnProperty.call(ret, k)) {
			continue;
		}
		ret[k] *= scale
	}
	return ret
}

Vector.prototype.copy = function () {
	return new this.constructor(this)
}



/***/ }),

/***/ "./src/colors.js":
/*!***********************!*\
  !*** ./src/colors.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "skyColors": () => (/* binding */ skyColors)
/* harmony export */ });
const skyColors = [
    [0xFF, 0xFF, 0xFF],
    [0x6F, 0xC4, 0xA5],
    [0xA3, 0x7B, 0xAD],
    [0x93, 0x6C, 0xA1],
    [0x2C, 0x4E, 0x8A],
    [0x3E, 0x1B, 0x9C],
    [0x64, 0x18, 0x1D],
    [0x15, 0x05, 0x22],
    [0x0A, 0x0C, 0x1D],
    [0x00, 0x00, 0x00]
]

/***/ }),

/***/ "./src/gravityColorEngine.js":
/*!***********************************!*\
  !*** ./src/gravityColorEngine.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GravityColorEngine": () => (/* binding */ GravityColorEngine)
/* harmony export */ });
/* harmony import */ var _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/ecs/drawers/render.js */ "../lib/ecs/drawers/render.js");
/* harmony import */ var _lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/shapes/circle.js */ "../lib/shapes/circle.js");
/* harmony import */ var _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/ecs/physics/physics.js */ "../lib/ecs/physics/physics.js");




function GravityColorEngine(manager) {
	this.manager = manager
}

const planetColors = [
	[245, 202, 117],
	[254, 255, 188],
	[200, 141, 110],
]

GravityColorEngine.prototype.compute = function () {
	this.manager.getEnities(_lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_0__.Renderer).map(
		(elem) => {
			var renderers = this.manager.get(_lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_0__.Renderer, elem)[0]
			var mass = this.manager.get(_lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics, elem)[0].mass
			var volume = Math.pow(this.manager.get(_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle, elem)[0].radius, 3) * Math.PI
			var dencity = mass / volume * planetColors.length * 3
			var index = Math.min(Math.round(dencity), planetColors.length - 1);
			renderers.color = '#' + toHex(planetColors[index][0]) +
				toHex(planetColors[index][1]) +
				toHex(planetColors[index][2])
		}
	)
}
function toHex(num) {
	let out = num.toString(16)
	return out.length - 1 ? out : '0' + out
}



/***/ }),

/***/ "./src/rustimpl/index.js":
/*!*******************************!*\
  !*** ./src/rustimpl/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MassRust": () => (/* binding */ MassRust)
/* harmony export */ });
/* harmony import */ var _lib_ecs_drawers_imageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/ecs/drawers/imageData */ "../lib/ecs/drawers/imageData.js");
/* harmony import */ var _lib_ecs_physics_physics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/ecs/physics/physics */ "../lib/ecs/physics/physics.js");
/* harmony import */ var _lib_ecs_physics_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/ecs/physics/transform */ "../lib/ecs/physics/transform.js");




class MassRust {
	constructor(context, manager) {
		this.manager = manager
		this.context = context
		this.positionArray = new Float32Array([0, 0, 1])
		this.planetsArray = new Float32Array([]);
		this.imgData = new _lib_ecs_drawers_imageData__WEBPACK_IMPORTED_MODULE_0__.ImageDataPloter(context, manager)
		this.update()
	}
	update() {
		this.imgData.update()
		this.width = this.context.canvas.clientWidth
		this.height = this.context.canvas.clientHeight
		this.gravity = null
		__webpack_require__.e(/*! import() */ "gravity_calc_pkg_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../../gravity_calc/pkg */ "../gravity_calc/pkg/index.js")).then(({ Gravity }) => {
			this.gravity = Gravity.new(this.width, this.height)
		})
	}

	drawAll(position) {
		if (!this.gravity) return
		var gravity = this.gravity
		var all = this.manager.getEnities(_lib_ecs_physics_physics__WEBPACK_IMPORTED_MODULE_1__.Physics)
		var planetsDataLength = all.length * 3
		if (this.planetsArray.length !== planetsDataLength)
			this.planetsArray = new Float32Array(all.length * 3);
		var bufferIndex = 0;
		all.forEach((el) => {
			var transform = this.manager.get(_lib_ecs_physics_transform__WEBPACK_IMPORTED_MODULE_2__.Transform, el)[0]
			var physic = this.manager.get(_lib_ecs_physics_physics__WEBPACK_IMPORTED_MODULE_1__.Physics, el)[0]
			this.planetsArray[bufferIndex] = transform.positions[0]
			this.planetsArray[bufferIndex + 1] = transform.positions[1]
			this.planetsArray[bufferIndex + 2] = physic.mass
			bufferIndex += 3
		})
		this.positionArray[0] = position.x
		this.positionArray[1] = position.y
		this.positionArray[2] = position.scale
		this.imgData.pull()
		gravity.draw_planets(
			this.imgData.img.data,
			this.planetsArray,
			planetsDataLength,
			this.positionArray
		);
		this.context.putImageData(this.imgData.img, 0, 0);
	}
}

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
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
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
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
/******/ 	/* webpack/runtime/wasm loading */
/******/ 	(() => {
/******/ 		__webpack_require__.v = (exports, wasmModuleId, wasmModuleHash, importsObj) => {
/******/ 			var req = fetch(__webpack_require__.p + "" + wasmModuleHash + ".module.wasm");
/******/ 			if (typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 				return WebAssembly.instantiateStreaming(req, importsObj)
/******/ 					.then((res) => (Object.assign(exports, res.instance.exports)));
/******/ 			}
/******/ 			return req
/******/ 				.then((x) => (x.arrayBuffer()))
/******/ 				.then((bytes) => (WebAssembly.instantiate(bytes, importsObj)))
/******/ 				.then((res) => (Object.assign(exports, res.instance.exports)));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/home/sloba/pythonium/stellar2/public/build";
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/ecs */ "../lib/ecs/index.js");
/* harmony import */ var _lib_fe_touch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/fe/touch */ "../lib/fe/touch.js");
/* harmony import */ var _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/ecs/physics/physics.js */ "../lib/ecs/physics/physics.js");
/* harmony import */ var _lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/shapes/circle.js */ "../lib/shapes/circle.js");
/* harmony import */ var _lib_ecs_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/ecs/physics/plasticColisionEngine */ "../lib/ecs/physics/plasticColisionEngine.js");
/* harmony import */ var _lib_ecs_physics_gravityEngine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/ecs/physics/gravityEngine */ "../lib/ecs/physics/gravityEngine.js");
/* harmony import */ var _gravityColorEngine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gravityColorEngine */ "./src/gravityColorEngine.js");
/* harmony import */ var _lib_ecs_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/ecs/physics/transform.js */ "../lib/ecs/physics/transform.js");
/* harmony import */ var _lib_ecs_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/ecs/drawers/ploter.js */ "../lib/ecs/drawers/ploter.js");
/* harmony import */ var _lib_ecs_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawFPS.js */ "../lib/ecs/drawers/drawFPS.js");
/* harmony import */ var _lib_ecs_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawGrid.js */ "../lib/ecs/drawers/drawGrid.js");
/* harmony import */ var _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../lib/ecs/drawers/render.js */ "../lib/ecs/drawers/render.js");
/* harmony import */ var _lib_ecs_drawers_drawMass_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawMass.js */ "../lib/ecs/drawers/drawMass.js");
/* harmony import */ var _lib_ecs_drawers_drawGalaxy__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawGalaxy */ "../lib/ecs/drawers/drawGalaxy.js");
/* harmony import */ var _lib_ecs_drawers_drawGass_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../lib/ecs/drawers/drawGass.js */ "../lib/ecs/drawers/drawGass.js");
/* harmony import */ var _lib_ecs_physics_chainEngine_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../lib/ecs/physics/chainEngine.js */ "../lib/ecs/physics/chainEngine.js");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./colors */ "./src/colors.js");
/* harmony import */ var _rustimpl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./rustimpl */ "./src/rustimpl/index.js");
























const canvas = document.getElementById('phy_canvas')
const toolokInput = document.getElementById('tolook_value')
const drawMass = document.getElementById('draw_mass')
const drawMassRust = document.getElementById('draw_mass_rust')
const drawGalaxy = document.getElementById('draw_galaxy')
const drawGass = document.getElementById('draw_gass')
const drawGrid = document.getElementById('draw_grid')
const drawFPS = document.getElementById('draw_fps')
const fullSpeed = document.getElementById('full_speed')
const drawPlanets = document.getElementById('draw_planets')
const maxPlanets = document.getElementById('max_planets')

var draw = new _lib_ecs_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_8__["default"](canvas)

canvas.width = 640
canvas.height = 480

var position = { x: 0, y: 0, scale: 0.2 }

window.addEventListener('mousewheel', function (e) {
	position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88
})

const fps = new _lib_ecs_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_9__["default"](draw.context)
const grid = new _lib_ecs_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_10__["default"](draw.context)

var manager = new _lib_ecs__WEBPACK_IMPORTED_MODULE_0__.EntityManager()


const points = new _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__.RenderEngine(draw.context, manager)
const mass = new _lib_ecs_drawers_drawMass_js__WEBPACK_IMPORTED_MODULE_12__["default"](draw.context, manager)
const massRust = new _rustimpl__WEBPACK_IMPORTED_MODULE_17__.MassRust(draw.context, manager)
const galaxy = new _lib_ecs_drawers_drawGalaxy__WEBPACK_IMPORTED_MODULE_13__["default"](draw.context, manager, _colors__WEBPACK_IMPORTED_MODULE_16__.skyColors)
const gass = new _lib_ecs_drawers_drawGass_js__WEBPACK_IMPORTED_MODULE_14__["default"](draw.context, manager)
const gravityEngine = new _lib_ecs_physics_gravityEngine__WEBPACK_IMPORTED_MODULE_5__.GravityEngine(manager)
const colisionEngine = new _lib_ecs_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__.PlasticColisionEngine(manager)
const gravityColorEngine = new _gravityColorEngine__WEBPACK_IMPORTED_MODULE_6__.GravityColorEngine(manager)
const chainEngine = new _lib_ecs_physics_chainEngine_js__WEBPACK_IMPORTED_MODULE_15__.ChainEngine(manager)
const physics = new _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.PhysicsEngine(manager, [gravityEngine,
	colisionEngine,
	gravityColorEngine,
	chainEngine
])
var touch = new _lib_fe_touch__WEBPACK_IMPORTED_MODULE_1__["default"](canvas, 100)
touch.sub('force', ({ delta, deltaZoom }) => {
	position = {
		...position, scale: position.scale * deltaZoom, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale
	}
})

var entity = null

var all = []

function calculateMass(radius) {
	var massVolume = 0.2 + Math.tanh((radius - 50) * 0.2) * 0.05 + Math.tanh((20 - radius) * 0.2) * 0.1
	console.log("mrt")
	return Math.pow(radius, 3) * Math.PI * massVolume
}

function createSnode(positions, speeds, radius) {
	entity = manager.create()
	manager.asign(new _lib_ecs_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__.Transform(positions), entity)
	manager.asign(new _lib_ecs_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics(speeds, calculateMass(radius), 0), entity)
	manager.asign(new _lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__.ShapeCircle(radius), entity)
	manager.asign(new _lib_ecs_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__.Renderer('#aaffbb'), entity)
	manager.asign(new _lib_ecs_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__.PlasticBody(), entity)
	return entity
}





all.push(createSnode([0, 0], [0, 0], 55, all, 'Sun'))


all.push(createSnode([255, 0], [0, 5], 3, all, 'Mercury'))
all.push(createSnode([300, 0], [0, 5], 4, all, 'Venus'))
all.push(createSnode([450, 0], [0, 4], 7, all, 'Earth'))
all.push(createSnode([600, 0], [0, 4], 4, all, 'Mars'))
let yupiter = createSnode([1400, 0], [0, 2.5], 35, all, 'Jupiter')
all.push(yupiter)
all.push(createSnode([1440, 0], [0, 6], 2, all, 'Europa'))
all.push(createSnode([1450, 0], [0, 6], 2, all, 'Europa'))
all.push(createSnode([2800, 0], [0, 2.5], 5, all, 'Saturn'))


const generateItem = (size) => {
	var angle = Math.random() * 2 * Math.PI
	var radius = 200 + Math.random() * 2000
	var x = Math.sin(angle) * radius
	var y = Math.cos(angle) * radius
	var tan = Math.atan2(x, y) - Math.PI / 2

	var el = createSnode(
		[x, y],
		[(10 * Math.sin(tan) + Math.random() * 14 - 7), (10 * Math.cos(tan) + Math.random() * 14 - 7)],
		size || (0.1 + Math.random()), all)
	all.push(el)
}



setInterval(() => {
	let max = parseInt(maxPlanets.value) || 100
	if (all.length < max - 10) {
		for (let i = 0; i < 10; i++) generateItem(1)
	}
	all.forEach((el, index) => (index > max) &&
		manager.destroy(el)
	)
}, 50)





function work() {
	var numb = parseInt(toolokInput.value) - 1
	if (!isNaN(numb) && numb >= 0) {
		var toLookEntity = all[numb % all.length]
		var toLookTransform = manager.get(_lib_ecs_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__.Transform, toLookEntity)[0]
		position.x = toLookTransform.positions[0]
		position.y = toLookTransform.positions[1]
	}
	draw.clear()

	if (drawGrid.checked)
		grid.draw(100, 100, position)
	if (drawMass.checked)
		mass.draw(position)
	if (drawMassRust.checked)
		massRust.drawAll(position)
	if (drawGass.checked)
		gass.draw(position)
	if (drawGalaxy.checked) {
		galaxy.draw(position)
	}
	if (drawPlanets.checked)
		points.draw(position)
	if (drawFPS.checked)
		fps.draw()
	physics.compute()

	all = all.filter(function (e, index) {
		var alive = manager.alive(e)
		if (!alive && !isNaN(numb) && numb >= index) {
			toolokInput.value = numb - 1
		}
		return alive
	})
	if (numb >= all.length) {
		toolokInput.value = all.length - 1
	}
	setTimeout(work, fullSpeed.checked ? 0 : 15)
}
work()
})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map