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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction FPSPloter(context) {\n  this.context = context;\n  this.time = new Date().getTime();\n  this.i = 0;\n  this.fps = 0;\n}\n\nFPSPloter.prototype.draw = function () {\n  this.i++;\n  var newTime = new Date().getTime();\n  var deltaT = newTime - this.time;\n  this.time = newTime;\n  this.context.font = '14px Verdana';\n  this.context.fillStyle = 'red';\n  if (!(this.i % 30)) this.fps = Math.round(10000 / deltaT) / 10 + ' fps';\n  this.context.fillText(this.fps, 10, 24);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FPSPloter);\n\n//# sourceURL=webpack://stellar/../lib/drawers/drawFPS.js?");

/***/ }),

/***/ "../lib/drawers/drawGrid.js":
/*!**********************************!*\
  !*** ../lib/drawers/drawGrid.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction GridPloter(ctx, width, height) {\n  this.context = ctx;\n  this.width = width;\n  this.height = height;\n}\n\nGridPloter.prototype.draw = function (sizex, sizey, view) {\n  const {\n    context,\n    width: canvasWidth,\n    height: canvasHeight\n  } = this;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  var gridScale = scale;\n\n  while (gridScale > 2) gridScale /= 2;\n\n  while (gridScale < 1) gridScale *= 2;\n\n  const stepX = sizex * gridScale;\n  const stepY = sizey * gridScale;\n  var startx = (-centerX * scale + canvasWidthHalf) % stepX;\n  var starty = (-centerY * scale + canvasHeightHalf) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(128, 128, 128, 0.5)';\n  context.stroke();\n  var startx = (startx + stepX / 2) % stepX;\n  var starty = (starty + stepY / 2) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'rgba(128, 128, 128, ' + (gridScale - 1.0) + ')';\n  context.stroke();\n  context.font = '10px Arial';\n  context.fillText(Math.round(view.x * 100) / 100 + Number.EPSILON + ',' + Math.round(view.y * 100 + Number.EPSILON) / 100 + ',' + Math.round(view.scale * 100 + Number.EPSILON) / 100, 10, 50);\n};\n\nGridPloter.prototype.line = function (startx, starty, sizex, sizey, color) {\n  this.context.lineWidth = 1;\n  this.context.moveTo(startx, starty);\n  this.context.lineTo(startx + sizex, starty + sizey);\n  this.context.strokeStyle = color;\n  this.context.stroke();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridPloter);\n\n//# sourceURL=webpack://stellar/../lib/drawers/drawGrid.js?");

/***/ }),

/***/ "../lib/drawers/drawMass.js":
/*!**********************************!*\
  !*** ../lib/drawers/drawMass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _physics_physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/physics.js */ \"../lib/physics/physics.js\");\n/* harmony import */ var _physics_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../physics/transform */ \"../lib/physics/transform.js\");\n\n\n\nconst squareDistance = (point, nodeB) => {\n  var square = 0;\n\n  for (var i = 0; i < point.length; i++) square += Math.pow(point[i] - nodeB.positions[i], 2);\n\n  return isNaN(square) || square < 1 ? 1 : square;\n};\n\nvar COLORS = 16 * 16;\n\nfunction MassPloter(context, width, height, manager) {\n  this.context = context;\n  this.width = width;\n  this.height = height;\n  this.img = this.context.createImageData(this.width, this.height);\n  this.manager = manager;\n}\n\nMassPloter.prototype.draw = function (view) {\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const {\n    context,\n    width: canvasWidth,\n    height: canvasHeight\n  } = this;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  const stepX = 2;\n  const stepY = 2;\n  const halfStepX = stepX / 2;\n  const halfStepY = stepY / 2;\n  var startx = (centerX + canvasWidthHalf) % stepX;\n  var starty = (centerY + canvasHeightHalf) % stepY;\n  var inverseScale = stepY / scale;\n  const points = this.manager.getEnities(_physics_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics).map(elem => {\n    var physics = this.manager.get(_physics_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem)[0];\n    var transform = this.manager.get(_physics_transform__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0];\n    return {\n      mass: physics.mass,\n      positions: transform.positions\n    };\n  });\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    var realX = (x - canvasWidthHalf) / scale + centerX;\n    var realY = (starty - canvasHeightHalf) / scale + centerY;\n\n    for (var y = starty; y <= canvasHeight; y += stepY) {\n      var sum = 0;\n      var pointsLength = points.length;\n\n      for (var i = 0; i < pointsLength; i++) {\n        var point = points[i];\n        sum += 3000 * point.mass / squareDistance([realX, realY], point);\n      }\n\n      var colorMin2 = Math.min(sum / 16.0, COLORS - 1);\n      var colorMin = Math.max(Math.min(sum, COLORS - 1) - colorMin2 * colorMin2 * 0.3, 0);\n      this.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [colorMin2, 0, colorMin, 255]);\n      realY += inverseScale;\n    }\n  }\n\n  context.putImageData(this.img, 0, 0);\n};\n\nMassPloter.prototype.imgRect = function (x, y, width, height, color) {\n  const realWidth = Math.max(Math.min(width + 1, this.width - x), 0);\n  const realHeight = Math.max(Math.min(height + 1, this.height - y), 0);\n  const realX = Math.max(Math.round(x), 0);\n  const realY = Math.max(Math.round(y), 0);\n  const data = this.img.data;\n  const startX = realX * 4;\n  const endX = realWidth * 4 + startX;\n  const rowLength = this.width * 4;\n  const startY = realY * rowLength;\n  const endY = realHeight * rowLength + startY;\n\n  for (var i = startY; i < endY; i += rowLength) {\n    for (var j = startX; j < endX; j += 4) {\n      var ij = i + j;\n      data[ij] = color[0];\n      data[ij + 1] = color[1];\n      data[ij + 2] = color[2];\n      data[ij + 3] = color[3];\n    }\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MassPloter);\n\n//# sourceURL=webpack://stellar/../lib/drawers/drawMass.js?");

/***/ }),

/***/ "../lib/drawers/ploter.js":
/*!********************************!*\
  !*** ../lib/drawers/ploter.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Ploter(canvas, width, height) {\n  this.canvas = canvas;\n  this.canvas.width = width || 320;\n  this.canvas.height = height || 240;\n  this.context = this.canvas.getContext('2d');\n  this.img = this.context.createImageData(this.canvas.width, this.canvas.height);\n}\n\nPloter.prototype.clear = function () {\n  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n};\n\nPloter.prototype.getCanvas = function () {\n  return this.canvas;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ploter);\n\n//# sourceURL=webpack://stellar/../lib/drawers/ploter.js?");

/***/ }),

/***/ "../lib/drawers/render.js":
/*!********************************!*\
  !*** ../lib/drawers/render.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RenderEngine\": () => (/* binding */ RenderEngine),\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _physics_transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/transform.js */ \"../lib/physics/transform.js\");\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shapes/circle.js */ \"../lib/shapes/circle.js\");\n\n\n\nfunction Renderer(color) {\n  this.color = color;\n}\n\nfunction RenderEngine(context, width, height, manager) {\n  this.context = context;\n  this.width = width;\n  this.height = height;\n  this.manager = manager;\n}\n\nRenderEngine.prototype.draw = function (view) {\n  const {\n    context,\n    width: canvasWidth,\n    height: canvasHeight\n  } = this;\n  const {\n    x: centerX,\n    y: centerY,\n    scale\n  } = view;\n  const canvasWidthHalf = canvasWidth / 2;\n  const canvasHeightHalf = canvasHeight / 2;\n  const points = this.manager.getEnities(Renderer).map(elem => {\n    var renderers = this.manager.get(Renderer, elem)[0];\n    var transform = this.manager.get(_physics_transform_js__WEBPACK_IMPORTED_MODULE_0__.Transform, elem)[0];\n    var circle = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle, elem)[0];\n    return [transform.positions[0], transform.positions[1], circle.radius, renderers.color];\n  });\n  points.forEach(element => {\n    var x = (element[0] - centerX) * scale + canvasWidthHalf;\n    var y = (element[1] - centerY) * scale + canvasHeightHalf;\n    if (x < 0 || y < 0 || x > canvasWidth || y > canvasHeight) return;\n    const elementSize = element[2] * scale > 1 ? element[2] * scale : 1;\n    context.beginPath();\n    context.arc(x, y, elementSize, 0, 2 * Math.PI, false);\n    context.fillStyle = element[3];\n    context.fill();\n    context.lineWidth = 1;\n    context.strokeStyle = '#333333';\n    context.stroke();\n  });\n};\n\n\n\n//# sourceURL=webpack://stellar/../lib/drawers/render.js?");

/***/ }),

/***/ "../lib/ecs.js":
/*!*********************!*\
  !*** ../lib/ecs.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Entity\": () => (/* binding */ Entity),\n/* harmony export */   \"EntityManager\": () => (/* binding */ EntityManager)\n/* harmony export */ });\nconst ENTITY_INDEX_BITS = 22;\nconst ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1;\nconst ENTITY_GENERATION_BITS = 8;\nconst ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1;\nconst MINIMUM_FREE_INDICES = 0;\n\nfunction Entity(id) {\n  this.id = id;\n}\n\nEntity.prototype.index = function () {\n  return this.id & ENTITY_INDEX_MASK;\n};\n\nEntity.prototype.generation = function () {\n  return this.id >> ENTITY_INDEX_BITS & ENTITY_GENERATION_MASK;\n};\n\nfunction EntityManager() {\n  this._generation = {};\n  this._free_indices = [];\n  this._entities = {};\n  this._components = {};\n  this.__entities_with_type = {};\n}\n\nEntityManager.prototype.create = function () {\n  var idx = 0;\n\n  if (this._free_indices.length > MINIMUM_FREE_INDICES) {\n    idx = this._free_indices.shift();\n  } else {\n    idx = Object.keys(this._generation).length;\n    this._generation[idx] = 0;\n  }\n\n  var entity = this.make_entity(idx, this._generation[idx]);\n  this._entities[idx] = entity;\n  return entity;\n};\n\nEntityManager.prototype.make_entity = function (idx, generation) {\n  return new Entity(idx + (generation << ENTITY_INDEX_BITS));\n};\n\nEntityManager.prototype.alive = function (e) {\n  return this._generation[e.index()] == e.generation();\n};\n\nEntityManager.prototype.destroy = function (e) {\n  delete this._entities[e.id];\n  ++this._generation[e.index()];\n\n  this._free_indices.push(e.index());\n};\n\nEntityManager.prototype.asign = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    this._components[e.id] = {\n      [component.constructor.name]: [component]\n    };\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    this._components[e.id][component.constructor.name] = [component];\n    return;\n  }\n\n  if (components_of_type && entity_components[component.constructor.name].find(comp => component === comp)) throw Error('Component is allready asiged');\n  entity_components[component.constructor.name].push(component);\n};\n\nEntityManager.prototype.get = function (c_type, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return [];\n  }\n\n  var components_of_type = entity_components[c_type.name];\n\n  if (!components_of_type) {\n    return [];\n  }\n\n  return components_of_type;\n};\n\nEntityManager.prototype.remove = function (component, e) {\n  var entity_components = this._components[e.id];\n\n  if (!entity_components) {\n    return;\n  }\n\n  var components_of_type = entity_components[component.constructor.name];\n\n  if (!components_of_type) {\n    return;\n  }\n\n  entity_components[component.constructor.name] = entity_components[component.constructor.name].filter(function (compon) {\n    return compon !== component;\n  });\n};\n\nEntityManager.prototype.getEnities = function (c_type) {\n  return Object.values(this._entities).filter(entity => {\n    return this.get(c_type, entity).length;\n  });\n};\n\n\n\n//# sourceURL=webpack://stellar/../lib/ecs.js?");

/***/ }),

/***/ "../lib/physics/gravityEngine.js":
/*!***************************************!*\
  !*** ../lib/physics/gravityEngine.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GravityEngine\": () => (/* binding */ GravityEngine)\n/* harmony export */ });\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./physics.js */ \"../lib/physics/physics.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ \"../lib/physics/transform.js\");\n\n\n\nfunction GravityEngine(manager, interaction) {\n  this.manager = manager;\n  this.interaction = interaction ? interaction : 0.1;\n}\n\nfunction computeAttraction(compute, naibors, interaction) {\n  var ret = [0, 0];\n  naibors.forEach(element => {\n    if (element == compute) return;\n    var distanceX = element.positions[0] - compute.positions[0];\n    var distanceY = element.positions[1] - compute.positions[1];\n    var distance2 = distanceX * distanceX + distanceY * distanceY;\n    var distance = Math.sqrt(distance2);\n    var ascIntencity = element.mass / distance2 * interaction;\n    ret[0] += distanceX / distance * ascIntencity;\n    ret[1] += distanceY / distance * ascIntencity;\n  });\n  return ret;\n}\n\nGravityEngine.prototype.compute = function () {\n  var physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics).map(elem => {\n    var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_0__.Physics, elem)[0];\n    var transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_1__.Transform, elem)[0];\n    return {\n      e: elem,\n      mass: physics.mass,\n      physics,\n      positions: transform.positions\n    };\n  });\n\n  for (var i = 0; i < physic_entity.length; i++) {\n    var elem = physic_entity[i];\n    var asc = computeAttraction(elem, physic_entity, this.interaction);\n    elem.physics.applyAsc(asc);\n  }\n};\n\n\n\n//# sourceURL=webpack://stellar/../lib/physics/gravityEngine.js?");

/***/ }),

/***/ "../lib/physics/physics.js":
/*!*********************************!*\
  !*** ../lib/physics/physics.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PhysicsEngine\": () => (/* binding */ PhysicsEngine),\n/* harmony export */   \"Physics\": () => (/* binding */ Physics)\n/* harmony export */ });\n/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transform */ \"../lib/physics/transform.js\");\n\n\nfunction Physics(speeds, mass, drag) {\n  this.speeds = speeds;\n  this.mass = mass;\n  this.drag = isNaN(drag) ? 0.001 : drag;\n  this.maxSpeed = 100;\n}\n\nPhysics.prototype.applyForce = function (force) {\n  for (var i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] += force[i] / this.mass;\n  }\n};\n\nPhysics.prototype.applyAsc = function (asc) {\n  for (var i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] += asc[i];\n  }\n};\n\nPhysics.prototype.compute = function () {\n  var speedValue = 0;\n  var i;\n\n  for (i = 0; i < this.speeds.length; i++) {\n    speedValue += this.speeds[i] * this.speeds[i];\n  }\n\n  var speedMultipliyer = Math.min(1 - this.drag, this.maxSpeed / speedValue);\n\n  for (i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] *= speedMultipliyer;\n  }\n};\n\nfunction PhysicsEngine(manager, engines) {\n  this.manager = manager;\n  this.engines = engines;\n}\n\nPhysicsEngine.prototype.compute = function () {\n  this.engines.forEach(engine => engine.compute());\n  this.manager.getEnities(Physics).forEach(elem => {\n    var physics = this.manager.get(Physics, elem)[0];\n    physics.compute();\n    var transform = this.manager.get(_transform__WEBPACK_IMPORTED_MODULE_0__.Transform, elem)[0];\n    transform.addSpeeds(physics.speeds);\n  });\n};\n\n\n\n//# sourceURL=webpack://stellar/../lib/physics/physics.js?");

/***/ }),

/***/ "../lib/physics/plasticColisionEngine.js":
/*!***********************************************!*\
  !*** ../lib/physics/plasticColisionEngine.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PlasticColisionEngine\": () => (/* binding */ PlasticColisionEngine)\n/* harmony export */ });\n/* harmony import */ var _shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var _physics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./physics.js */ \"../lib/physics/physics.js\");\n/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transform.js */ \"../lib/physics/transform.js\");\n\n\n\n\nfunction PlasticColisionEngine(manager) {\n  this.manager = manager;\n  this.physic_entity = null;\n}\n\nfunction squareDistance(nodeA, nodeB) {\n  var square = 0;\n\n  for (var i = 0; i < nodeA.positions.length; i++) square += Math.pow(nodeA.positions[i] - nodeB.positions[i], 2);\n\n  return square;\n}\n\nfunction computeColision(compute, naibors) {\n  var collisions = [];\n  naibors.forEach(element => {\n    if (element == compute) return;\n    var distanceX = element.positions[0] - compute.positions[0];\n    var distanceY = element.positions[1] - compute.positions[1];\n    var centerDistance = compute.radius + element.radius;\n    if (Math.abs(distanceX) > centerDistance || Math.abs(distanceY) > centerDistance) return;\n    var distance2 = squareDistance(compute, element);\n    if (distance2 > Math.pow(centerDistance, 2)) return;\n    if (compute.radius > element.radius) collisions.push(element);\n  });\n  return collisions;\n}\n\nPlasticColisionEngine.prototype.compute = function () {\n  var physic_entity = this.manager.getEnities(_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics).map(elem => {\n    var circle = this.manager.get(_shapes_circle_js__WEBPACK_IMPORTED_MODULE_0__.ShapeCircle, elem)[0];\n    var transform = this.manager.get(_transform_js__WEBPACK_IMPORTED_MODULE_2__.Transform, elem)[0];\n    var physics = this.manager.get(_physics_js__WEBPACK_IMPORTED_MODULE_1__.Physics, elem)[0];\n    return {\n      e: elem,\n      radius: circle.radius,\n      circle,\n      positions: transform.positions,\n      speeds: physics.speeds,\n      physics\n    };\n  });\n\n  for (var i = 0; i < physic_entity.length; i++) {\n    var elem = physic_entity[i];\n    if (!this.manager.alive(elem.e)) continue;\n    var colisions = computeColision(elem, physic_entity);\n\n    for (var collisionIndex in colisions) {\n      var collision = colisions[collisionIndex];\n      if (!this.manager.alive(collision.e)) continue;\n      this.manager.destroy(collision.e);\n      this.merge(elem, collision);\n    }\n  }\n};\n\nPlasticColisionEngine.prototype.merge = function (nodeA, nodeB) {\n  var cubeRadiusA = Math.pow(nodeA.radius, 3);\n  var cubeRadiusB = Math.pow(nodeB.radius, 3);\n  var newRadious = Math.cbrt(cubeRadiusA + cubeRadiusB);\n  nodeA.circle.radius = newRadious;\n  var massA = nodeA.physics.mass;\n  var massB = nodeB.physics.mass;\n  nodeA.physics.mass = massA + massB;\n\n  for (var i = 0; i < nodeA.speeds.length; i++) {\n    nodeA.speeds[i] = (nodeA.speeds[i] * massA + nodeB.speeds[i] * massB) / (massA + massB);\n  }\n};\n\n\n\n//# sourceURL=webpack://stellar/../lib/physics/plasticColisionEngine.js?");

/***/ }),

/***/ "../lib/physics/transform.js":
/*!***********************************!*\
  !*** ../lib/physics/transform.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Transform\": () => (/* binding */ Transform)\n/* harmony export */ });\nfunction Transform(positions) {\n  this.positions = positions;\n}\n\nTransform.prototype.addSpeeds = function (speeds) {\n  for (var k = 0; k < this.positions.length; k++) {\n    this.positions[k] += speeds[k];\n  }\n};\n\n\n\n//# sourceURL=webpack://stellar/../lib/physics/transform.js?");

/***/ }),

/***/ "../lib/shapes/circle.js":
/*!*******************************!*\
  !*** ../lib/shapes/circle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeCircle\": () => (/* binding */ ShapeCircle)\n/* harmony export */ });\nfunction ShapeCircle(radius) {\n  this.radius = radius;\n}\n\n\n\n//# sourceURL=webpack://stellar/../lib/shapes/circle.js?");

/***/ }),

/***/ "../lib/touch.js":
/*!***********************!*\
  !*** ../lib/touch.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// written by Slobodan Zivkovic slobacartoonac@gmail.com\nfunction Touch(div, deadzone) {\n  const link = this;\n  this.deadzone = deadzone;\n  this.clear();\n\n  function distance2d(a, b) {\n    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));\n  }\n\n  this.distance = distance2d;\n  let startMove = null;\n  let thisMove = null;\n  let mouseDown = false;\n  let click = true;\n\n  function moveTouchT(e) {\n    e.preventDefault();\n    const {\n      top,\n      left\n    } = e.target.getBoundingClientRect();\n    moveTouch({\n      x: e.touches[0].clientX - left,\n      y: e.touches[0].clientY - top\n    });\n  }\n\n  function moveTouchM(e) {\n    e.preventDefault();\n    const {\n      top,\n      left\n    } = e.target.getBoundingClientRect();\n    if (mouseDown) moveTouch({\n      x: e.clientX - left,\n      y: e.clientY - top\n    });\n  }\n\n  function moveTouch(e) {\n    if (startMove == null) {\n      startMove = {\n        x: e.x,\n        y: e.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      link.triger('start', thisMove);\n      click = true;\n    } else {\n      const delta = {\n        x: e.x - thisMove.x,\n        y: e.y - thisMove.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      const direction = {\n        x: thisMove.x - startMove.x,\n        y: thisMove.y - startMove.y\n      };\n      link.triger('force', {\n        delta,\n        direction,\n        startPosition: startMove,\n        position: thisMove,\n        distance: distance2d(startMove, thisMove),\n        click\n      });\n\n      if (distance2d(startMove, thisMove) > link.deadzone) {\n        click = false;\n\n        if (Math.abs(direction.x) > Math.abs(direction.y)) {\n          if (direction.x > 0) {\n            link.triger('left');\n          } else {\n            link.triger('right');\n          }\n        } else if (direction.y > 0) {\n          link.triger('down');\n        } else {\n          link.triger('up');\n        }\n      }\n    }\n  } //= {up:[],down:[],left:[],right:[],stop:[],click:[],force:[]}\n\n\n  function stopTouch(e) {\n    e.preventDefault();\n\n    if (click) {\n      if (e.button) {\n        if (e.button === 1) link.triger('bmiddle');\n        if (e.button === 2) link.triger('bright');\n      } else link.triger('click', startMove);\n    }\n\n    link.triger('stop');\n    startMove = null;\n    thisMove = null;\n    mouseDown = false;\n  }\n\n  div.addEventListener('touchstart', e => {\n    e.preventDefault();\n  }, false);\n  div.addEventListener('touchmove', moveTouchT, false);\n  div.addEventListener('touchend', stopTouch, false);\n  div.addEventListener('touchstart', moveTouchT, false);\n  div.addEventListener('mouseleave', stopTouch, false);\n  div.addEventListener('mousemove', moveTouchM);\n  div.addEventListener('mouseup', stopTouch);\n  div.addEventListener('mousedown', e => {\n    mouseDown = true;\n    moveTouchM(e);\n  });\n}\n/*eslint-disable */\n\n\nTouch.prototype.sub = function (ev, func) {\n  if (this.events[ev]) this.events[ev].push(func);\n};\n\nTouch.prototype.unsub = function (ev, func) {\n  if (this.events[ev]) this.events[ev] = this.events[ev].filter(fu => fu !== func);\n};\n\nTouch.prototype.clearEvlent = function (ev) {\n  if (this.events[ev]) this.events[ev] = [];\n};\n\nTouch.prototype.clear = function () {\n  this.events = {\n    up: [],\n    down: [],\n    left: [],\n    right: [],\n    stop: [],\n    start: [],\n    click: [],\n    force: [],\n    bmiddle: [],\n    bright: []\n  };\n};\n\nTouch.prototype.triger = function (ev, args) {\n  if (this.events[ev]) this.events[ev].forEach(func => {\n    func(args);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Touch);\n\n//# sourceURL=webpack://stellar/../lib/touch.js?");

/***/ }),

/***/ "./src/javascript/gravityColorEngine.js":
/*!**********************************************!*\
  !*** ./src/javascript/gravityColorEngine.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GravityColorEngine\": () => (/* binding */ GravityColorEngine)\n/* harmony export */ });\n/* harmony import */ var my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! my_lib/drawers/render.js */ \"../lib/drawers/render.js\");\n/* harmony import */ var my_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! my_lib/shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! my_lib/physics/physics.js */ \"../lib/physics/physics.js\");\n\n\n\n\nfunction GravityColorEngine(manager) {\n  this.manager = manager;\n}\n\nGravityColorEngine.prototype.compute = function (view) {\n  var _this = this;\n\n  var points = this.manager.getEnities(my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_0__.Renderer).map(function (elem) {\n    var renderers = _this.manager.get(my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_0__.Renderer, elem)[0];\n\n    var mass = _this.manager.get(my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics, elem)[0].mass;\n\n    var volume = Math.pow(_this.manager.get(my_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle, elem)[0].radius, 3) * Math.PI;\n    var dencity = mass / volume * 10 * Math.PI;\n\n    if (dencity < 1) {\n      renderers.color = '##00fffb';\n    } else if (dencity < 2) {\n      renderers.color = '#001eff';\n    } else if (dencity < 3) {\n      renderers.color = '#995500';\n    } else if (dencity < 4) {\n      renderers.color = '#ff8c00';\n    } else {\n      renderers.color = '#fffb00';\n    }\n  });\n};\n\n\n\n//# sourceURL=webpack://stellar/./src/javascript/gravityColorEngine.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var my_lib_touch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! my_lib/touch.js */ \"../lib/touch.js\");\n/* harmony import */ var my_lib_ecs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! my_lib/ecs.js */ \"../lib/ecs.js\");\n/* harmony import */ var my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! my_lib/physics/physics.js */ \"../lib/physics/physics.js\");\n/* harmony import */ var my_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! my_lib/shapes/circle.js */ \"../lib/shapes/circle.js\");\n/* harmony import */ var my_lib_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! my_lib/physics/plasticColisionEngine */ \"../lib/physics/plasticColisionEngine.js\");\n/* harmony import */ var my_lib_physics_gravityEngine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! my_lib/physics/gravityEngine */ \"../lib/physics/gravityEngine.js\");\n/* harmony import */ var _gravityColorEngine_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gravityColorEngine.js */ \"./src/javascript/gravityColorEngine.js\");\n/* harmony import */ var my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! my_lib/physics/transform.js */ \"../lib/physics/transform.js\");\n/* harmony import */ var my_lib_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! my_lib/drawers/ploter.js */ \"../lib/drawers/ploter.js\");\n/* harmony import */ var my_lib_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! my_lib/drawers/drawFPS.js */ \"../lib/drawers/drawFPS.js\");\n/* harmony import */ var my_lib_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! my_lib/drawers/drawGrid.js */ \"../lib/drawers/drawGrid.js\");\n/* harmony import */ var my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! my_lib/drawers/render.js */ \"../lib/drawers/render.js\");\n/* harmony import */ var my_lib_drawers_drawMass_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! my_lib/drawers/drawMass.js */ \"../lib/drawers/drawMass.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar canvas = document.getElementById('phy_canvas');\nvar toolokInput = document.getElementById('tolook_value');\nvar drawMass = document.getElementById('draw_mass');\nvar drawGrid = document.getElementById('draw_grid');\nvar drawFPS = document.getElementById('draw_fps');\nvar fullSpeed = document.getElementById('full_speed');\nvar draw = new my_lib_drawers_ploter_js__WEBPACK_IMPORTED_MODULE_8__.default(canvas, 640, 480);\nvar position = {\n  x: 0,\n  y: 0,\n  scale: 1\n};\nwindow.addEventListener('mousewheel', function (e) {\n  position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88;\n});\nvar fps = new my_lib_drawers_drawFPS_js__WEBPACK_IMPORTED_MODULE_9__.default(draw.context);\nvar grid = new my_lib_drawers_drawGrid_js__WEBPACK_IMPORTED_MODULE_10__.default(draw.context, 640, 480);\nvar manager = new my_lib_ecs_js__WEBPACK_IMPORTED_MODULE_1__.EntityManager();\nvar points = new my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__.RenderEngine(draw.context, 640, 480, manager);\nvar mass = new my_lib_drawers_drawMass_js__WEBPACK_IMPORTED_MODULE_12__.default(draw.context, 640, 480, manager);\nvar gravityEngine = new my_lib_physics_gravityEngine__WEBPACK_IMPORTED_MODULE_5__.GravityEngine(manager);\nvar colisionEngine = new my_lib_physics_plasticColisionEngine__WEBPACK_IMPORTED_MODULE_4__.PlasticColisionEngine(manager);\nvar gravityColorEngine = new _gravityColorEngine_js__WEBPACK_IMPORTED_MODULE_6__.GravityColorEngine(manager);\nvar physics = new my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.PhysicsEngine(manager, [gravityEngine, colisionEngine, gravityColorEngine]);\nvar touch = new my_lib_touch_js__WEBPACK_IMPORTED_MODULE_0__.default(canvas, 100);\ntouch.sub('force', function (_ref) {\n  var delta = _ref.delta;\n  position = _objectSpread({}, position, {\n    x: position.x - delta.x / position.scale,\n    y: position.y - delta.y / position.scale\n  });\n});\nvar all = [];\nvar entity = null;\n\nfor (var i = 0; i < 450; i++) {\n  var angle = Math.random() * 2 * Math.PI;\n  var radius = 50 + Math.random() * 600;\n  var x = Math.sin(angle) * radius;\n  var y = Math.cos(angle) * radius;\n  var tan = Math.atan2(x, y) + Math.PI / 2;\n  var speedX = Math.sin(tan) / 2 + Math.random() * 2 - 1;\n  var speedY = Math.cos(tan) / 2 + Math.random() * 2 - 1;\n  var radius = 1 + Math.random() * 3;\n  entity = manager.create();\n  manager.asign(new my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__.Transform([x, y]), entity);\n  manager.asign(new my_lib_physics_physics_js__WEBPACK_IMPORTED_MODULE_2__.Physics([speedX, speedY], 2 + 5 * Math.abs(3 - radius), 0), entity);\n  manager.asign(new my_lib_shapes_circle_js__WEBPACK_IMPORTED_MODULE_3__.ShapeCircle(radius), entity);\n  manager.asign(new my_lib_drawers_render_js__WEBPACK_IMPORTED_MODULE_11__.Renderer('#aaffbb'), entity);\n  all.push(entity);\n}\n\nfunction work() {\n  var numb = parseInt(toolokInput.value);\n\n  if (!isNaN(numb)) {\n    var toLookEntity = all[numb % all.length];\n    var toLookTransform = manager.get(my_lib_physics_transform_js__WEBPACK_IMPORTED_MODULE_7__.Transform, toLookEntity)[0];\n    position.x = toLookTransform.positions[0];\n    position.y = toLookTransform.positions[1];\n  }\n\n  draw.clear();\n  if (drawMass.checked) mass.draw(position);\n  if (drawGrid.checked) grid.draw(100, 100, position);\n  points.draw(position);\n  if (drawFPS.checked) fps.draw();\n  physics.compute();\n  all = all.filter(function (e, index) {\n    var alive = manager.alive(e);\n\n    if (!alive && !isNaN(numb) && numb >= index) {\n      toolokInput.value = numb - 1;\n    }\n\n    return alive;\n  });\n\n  if (numb >= all.length) {\n    toolokInput.value = all.length - 1;\n  }\n\n  setTimeout(work, fullSpeed.checked ? 0 : 15);\n}\n\nwork();\n\n//# sourceURL=webpack://stellar/./src/javascript/index.js?");

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