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

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sunNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sunNode.js */ \"./src/javascript/sunNode.js\");\n/* harmony import */ var _ploter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ploter.js */ \"./src/javascript/ploter.js\");\n/* harmony import */ var _touch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./touch */ \"./src/javascript/touch.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar draw = new _ploter_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](800, 600);\nvar position = {\n  x: 0,\n  y: 0,\n  scale: 1\n};\nwindow.addEventListener('mousewheel', function (e) {\n  position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88;\n});\nvar canvas = draw.getCanvas();\ndocument.body.appendChild(canvas);\nvar touch = new _touch__WEBPACK_IMPORTED_MODULE_2__[\"default\"](canvas, 100);\ntouch.sub('force', function (_ref) {\n  var delta = _ref.delta;\n  position = _objectSpread({}, position, {\n    x: position.x - delta.x / position.scale,\n    y: position.y - delta.y / position.scale\n  });\n});\nvar all = [];\nall.push(new _sunNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([0, 0], [0, 0], 14, all));\nall.push(new _sunNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([100, 0], [0, 1], 3, all));\nall.push(new _sunNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([300, 0], [0, 0.8], 4, all));\nall.push(new _sunNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([600, 0], [0, 0.8], 6, all));\nall.push(new _sunNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([-450, 0], [0, -0.8], 8, all));\nall.push(new _sunNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([0, 800], [-0.5, 0], 5, all));\n\nvar generateItem = function generateItem(size) {\n  var angle = Math.random() * 2 * Math.PI;\n  var radius = 200 + Math.random() * 2000;\n  var x = Math.sin(angle) * radius;\n  var y = Math.cos(angle) * radius;\n  var tan = Math.atan2(x, y) + Math.PI / 2;\n  var el = new _sunNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([x, y], [(4 * Math.sin(tan) + Math.random() * 6 - 3) * 0.1, (4 * Math.cos(tan) + Math.random() * 6 - 3) * 0.1], size || 0.1 + Math.random(), all);\n  all.push(el);\n};\n\nsetInterval(function () {\n  all.length < 300 && generateItem();\n}, 200);\n\nfor (var i = 0; i < 100; i++) {\n  generateItem();\n}\n\nfunction work() {\n  draw.clear();\n  draw.drawMass(all, position); //draw.grid(100,100,position)\n\n  draw.points(all.map(function (elem) {\n    return [elem.positions[0], elem.positions[1], elem.radius, elem.radius > 7 ? '#ff9933' : '#aaffbb'];\n  }), position);\n  all.forEach(function (e) {\n    e.compute();\n  });\n  var allLength = all.length;\n\n  for (i = 0; i < allLength; i++) {\n    var first = all.shift();\n    if (!first.invalid) all.push(first);\n  }\n\n  all.forEach(function (e) {\n    e.move();\n  });\n  setTimeout(work, 30);\n}\n\nwork();\n\n//# sourceURL=webpack:///./src/javascript/index.js?");

/***/ }),

/***/ "./src/javascript/ploter.js":
/*!**********************************!*\
  !*** ./src/javascript/ploter.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar squareDistance = function squareDistance(point, nodeB) {\n  var square = 0;\n\n  for (var i = 0; i < point.length; i++) {\n    square += Math.pow(point[i] - nodeB.positions[i], 2);\n  }\n\n  return isNaN(square) ? 0 : square;\n};\n\nvar COLORS = 16 * 16;\n\nfunction Ploter(width, height) {\n  this.canvas = document.createElement('canvas');\n  this.canvas.width = width || 320;\n  this.canvas.height = height || 240;\n  this.context = this.canvas.getContext('2d');\n}\n\nPloter.prototype.points = function (points, view) {\n  var context = this.context,\n      _this$canvas = this.canvas,\n      canvasWidth = _this$canvas.width,\n      canvasHeight = _this$canvas.height;\n  var centerX = view.x,\n      centerY = view.y,\n      scale = view.scale;\n  var canvasWidthHalf = canvasWidth / 2;\n  var canvasHeightHalf = canvasHeight / 2;\n  points.forEach(function (element) {\n    var x = (element[0] - centerX) * scale + canvasWidthHalf;\n    var y = (element[1] - centerY) * scale + canvasHeightHalf;\n    if (x < 0 || y < 0 || x > canvasWidth || y > canvasHeight) return;\n    var elementSize = element[2] * scale > 1 ? element[2] * scale : 1;\n    context.beginPath();\n    context.arc(x, y, elementSize, 0, 2 * Math.PI, false);\n    context.fillStyle = element[3];\n    context.fill();\n    context.lineWidth = 1;\n    context.strokeStyle = '#333333';\n    context.stroke();\n  });\n};\n\nPloter.prototype.drawMass = function (points, view) {\n  var centerX = view.x,\n      centerY = view.y,\n      scale = view.scale;\n  var context = this.context,\n      _this$canvas2 = this.canvas,\n      canvasWidth = _this$canvas2.width,\n      canvasHeight = _this$canvas2.height;\n  var canvasWidthHalf = canvasWidth / 2;\n  var canvasHeightHalf = canvasHeight / 2;\n  var stepX = 10;\n  var stepY = 10;\n  var halfStepX = stepX / 2;\n  var halfStepY = stepY / 2;\n  var startx = (centerX + canvasWidthHalf) % stepX;\n  var starty = (centerY + canvasHeightHalf) % stepY;\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    for (var y = starty; y <= canvasHeight; y += stepY) {\n      var realX = (x - canvasWidthHalf) / scale + centerX; //(element[0]-centerX)*scale + canvasWidthHalf\n\n      var realY = (y - canvasHeightHalf) / scale + centerY;\n      var sum = points.reduce(function (sum, point) {\n        var dist = squareDistance([realX, realY], point);\n        if (!dist) return sum;\n        return sum + 3000 * point.mass / dist;\n      }, 0);\n      var colorMin = Math.min(Math.round(sum), COLORS);\n      var colorMin2 = Math.min(Math.round(sum / 16.0), COLORS);\n      if (colorMin < 5 && colorMin2 < 5) continue;\n      var color = Math.round(colorMin).toString(16);\n      var color2 = Math.round(colorMin2).toString(16);\n      context.beginPath();\n      context.rect(x - halfStepX, y - halfStepY, stepX + 1, stepY + 1);\n      context.fillStyle = '#' + _toConsumableArray(Array(2)).map(function (_, i) {\n        return color2[i + color2.length - 2] || '0';\n      }).join('') + '00' + _toConsumableArray(Array(2)).map(function (_, i) {\n        return color[i + color.length - 2] || '0';\n      }).join('');\n      context.fill();\n    }\n  }\n};\n\nPloter.prototype.clear = function () {\n  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n};\n\nPloter.prototype.grid = function (sizex, sizey, view) {\n  var context = this.context,\n      _this$canvas3 = this.canvas,\n      canvasWidth = _this$canvas3.width,\n      canvasHeight = _this$canvas3.height;\n  var centerX = view.x,\n      centerY = view.y,\n      scale = view.scale;\n  var canvasWidthHalf = canvasWidth / 2;\n  var canvasHeightHalf = canvasHeight / 2;\n  var gridScale = scale;\n  var stepX = sizex * gridScale;\n  var stepY = sizey * gridScale;\n  var startx = (centerX * gridScale + canvasWidthHalf) % stepX;\n  var starty = (centerY * gridScale + canvasHeightHalf) % stepY;\n  context.beginPath();\n\n  for (var x = startx; x <= canvasWidth; x += stepX) {\n    context.moveTo(x, 0);\n    context.lineTo(x, canvasHeight);\n  }\n\n  for (var y = starty; y <= canvasHeight; y += stepY) {\n    context.moveTo(0, y);\n    context.lineTo(canvasWidth, y);\n  }\n\n  context.lineWidth = 2;\n  context.strokeStyle = 'gray';\n  context.stroke();\n  context.font = '10px Arial';\n  context.fillText(Math.round(view.x * 100) / 100 + Number.EPSILON + ',' + Math.round(view.y * 100 + Number.EPSILON) / 100 + ',' + Math.round(view.scale * 100 + Number.EPSILON) / 100, 10, 50);\n};\n\nPloter.prototype.line = function (startx, starty, sizex, sizey, color) {\n  this.context.lineWidth = 1;\n  this.context.moveTo(startx, starty);\n  this.context.lineTo(startx + sizex, starty + sizey);\n  this.context.strokeStyle = color;\n  this.context.stroke();\n};\n\nPloter.prototype.getCanvas = function () {\n  return this.canvas;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ploter);\n\n//# sourceURL=webpack:///./src/javascript/ploter.js?");

/***/ }),

/***/ "./src/javascript/sunNode.js":
/*!***********************************!*\
  !*** ./src/javascript/sunNode.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nif (!Math.cbrt) {\n  Math.cbrt = function (x) {\n    var y = Math.pow(Math.abs(x), 1 / 3);\n    return x < 0 ? -y : y;\n  };\n}\n\nfunction SNode(positions, speeds, radius, inputs) {\n  this.radius = radius;\n  this.positions = positions ? positions : [];\n  this.speeds = speeds ? speeds : [];\n  this.inputs = inputs ? inputs : [];\n  this.invalid = null;\n  this.massVolume = 0.1;\n  this.interaction = 0.001;\n  this.mass = this.computeMass();\n}\n\nSNode.prototype.computeMass = function () {\n  return Math.pow(this.radius, 3) * Math.PI * this.massVolume;\n};\n\nSNode.prototype.compute = function () {\n  if (this.invalid) return;\n  this.inputs.forEach(function (element) {\n    if (this == element || element.invalid) return;\n    var squareDist = this.squareDistance(element);\n    var realDist = Math.sqrt(squareDist);\n\n    if (realDist < this.radius + element.radius && this.radius > element.radius) {\n      element.invalid = true;\n      this.merge(element);\n      return;\n    }\n\n    var asc = this.interaction * element.mass / squareDist;\n\n    for (var i = 0; i < this.positions.length; i++) {\n      this.speeds[i] += asc * (element.positions[i] - this.positions[i]);\n    }\n  }, this);\n};\n\nSNode.prototype.merge = function (testNode) {\n  var massA = this.mass;\n  var massB = testNode.mass;\n  var newRadious = Math.cbrt((massA + massB) / Math.PI / this.massVolume);\n\n  for (var i = 0; i < this.speeds.length; i++) {\n    this.speeds[i] = (this.speeds[i] * massA + testNode.speeds[i] * massB) / (massA + massB);\n  }\n\n  this.radius = newRadious;\n  this.mass = this.computeMass();\n};\n\nSNode.prototype.squareDistance = function (testNode) {\n  var square = 0;\n\n  for (var i = 0; i < testNode.positions.length; i++) {\n    square += Math.pow(testNode.positions[i] - this.positions[i], 2);\n  }\n\n  return square;\n};\n\nSNode.prototype.move = function () {\n  for (var k = 0; k < this.positions.length; k++) {\n    this.positions[k] += this.speeds[k];\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SNode);\n\n//# sourceURL=webpack:///./src/javascript/sunNode.js?");

/***/ }),

/***/ "./src/javascript/touch.js":
/*!*********************************!*\
  !*** ./src/javascript/touch.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// written by Slobodan Zivkovic slobacartoonac@gmail.com\nfunction Touch(div, deadzone) {\n  var link = this;\n  this.deadzone = deadzone;\n  this.clear();\n\n  function distance2d(a, b) {\n    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));\n  }\n\n  this.distance = distance2d;\n  var startMove = null;\n  var thisMove = null;\n  var mouseDown = false;\n  var click = true;\n\n  function moveTouchT(e) {\n    e.preventDefault();\n\n    var _e$target$getBounding = e.target.getBoundingClientRect(),\n        top = _e$target$getBounding.top,\n        left = _e$target$getBounding.left;\n\n    moveTouch({\n      x: e.touches[0].clientX - left,\n      y: e.touches[0].clientY - top\n    });\n  }\n\n  function moveTouchM(e) {\n    e.preventDefault();\n\n    var _e$target$getBounding2 = e.target.getBoundingClientRect(),\n        top = _e$target$getBounding2.top,\n        left = _e$target$getBounding2.left;\n\n    if (mouseDown) moveTouch({\n      x: e.clientX - left,\n      y: e.clientY - top\n    });\n  }\n\n  function moveTouch(e) {\n    if (startMove == null) {\n      startMove = {\n        x: e.x,\n        y: e.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      link.triger('start', thisMove);\n      click = true;\n    } else {\n      var delta = {\n        x: e.x - thisMove.x,\n        y: e.y - thisMove.y\n      };\n      thisMove = {\n        x: e.x,\n        y: e.y\n      };\n      var direction = {\n        x: thisMove.x - startMove.x,\n        y: thisMove.y - startMove.y\n      };\n      link.triger('force', {\n        delta: delta,\n        direction: direction,\n        startPosition: startMove,\n        position: thisMove,\n        distance: distance2d(startMove, thisMove),\n        click: click\n      });\n\n      if (distance2d(startMove, thisMove) > link.deadzone) {\n        click = false;\n\n        if (Math.abs(direction.x) > Math.abs(direction.y)) {\n          if (direction.x > 0) {\n            link.triger('left');\n          } else {\n            link.triger('right');\n          }\n        } else if (direction.y > 0) {\n          link.triger('down');\n        } else {\n          link.triger('up');\n        }\n      }\n    }\n  } //= {up:[],down:[],left:[],right:[],stop:[],click:[],force:[]}\n\n\n  function stopTouch(e) {\n    e.preventDefault();\n\n    if (click) {\n      if (e.button) {\n        if (e.button === 1) link.triger('bmiddle');\n        if (e.button === 2) link.triger('bright');\n      } else link.triger('click', startMove);\n    }\n\n    link.triger('stop');\n    startMove = null;\n    thisMove = null;\n    mouseDown = false;\n  }\n\n  div.addEventListener('touchstart', function (e) {\n    e.preventDefault();\n  }, false);\n  div.addEventListener('touchmove', moveTouchT, false);\n  div.addEventListener('touchend', stopTouch, false);\n  div.addEventListener('touchstart', moveTouchT, false);\n  div.addEventListener('mouseleave', stopTouch, false);\n  div.addEventListener('mousemove', moveTouchM);\n  div.addEventListener('mouseup', stopTouch);\n  div.addEventListener('mousedown', function (e) {\n    mouseDown = true;\n    moveTouchM(e);\n  });\n}\n/*eslint-disable */\n\n\nTouch.prototype.sub = function (ev, func) {\n  if (this.events[ev]) this.events[ev].push(func);\n};\n\nTouch.prototype.unsub = function (ev, func) {\n  if (this.events[ev]) this.events[ev] = this.events[ev].filter(function (fu) {\n    return fu !== func;\n  });\n};\n\nTouch.prototype.clearEvlent = function (ev) {\n  if (this.events[ev]) this.events[ev] = [];\n};\n\nTouch.prototype.clear = function () {\n  this.events = {\n    up: [],\n    down: [],\n    left: [],\n    right: [],\n    stop: [],\n    start: [],\n    click: [],\n    force: [],\n    bmiddle: [],\n    bright: []\n  };\n};\n\nTouch.prototype.triger = function (ev, args) {\n  if (this.events[ev]) this.events[ev].forEach(function (func) {\n    func(args);\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Touch);\n\n//# sourceURL=webpack:///./src/javascript/touch.js?");

/***/ })

/******/ });