"use strict";
(self["webpackChunkstellar2"] = self["webpackChunkstellar2"] || []).push([["gravity_calc_pkg_index_js"],{

/***/ "../gravity_calc/pkg/index.js":
/*!************************************!*\
  !*** ../gravity_calc/pkg/index.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gravity": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.Gravity),
/* harmony export */   "View": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.View),
/* harmony export */   "__wbindgen_throw": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_throw)
/* harmony export */ });
/* harmony import */ var _index_bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_bg.js */ "../gravity_calc/pkg/index_bg.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_bg_js__WEBPACK_IMPORTED_MODULE_0__]);
_index_bg_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "../gravity_calc/pkg/index_bg.js":
/*!***************************************!*\
  !*** ../gravity_calc/pkg/index_bg.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gravity": () => (/* binding */ Gravity),
/* harmony export */   "View": () => (/* binding */ View),
/* harmony export */   "__wbindgen_throw": () => (/* binding */ __wbindgen_throw)
/* harmony export */ });
/* harmony import */ var _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_bg.wasm */ "../gravity_calc/pkg/index_bg.wasm");
/* module decorator */ module = __webpack_require__.hmd(module);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__]);
_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0;
function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedFloat32Memory0;
function getFloat32Memory0() {
    if (cachedFloat32Memory0.byteLength === 0) {
        cachedFloat32Memory0 = new Float32Array(_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);
    }
    return cachedFloat32Memory0;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getFloat32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
*/
class Gravity {

    static __wrap(ptr) {
        const obj = Object.create(Gravity.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_gravity_free(ptr);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @returns {Gravity}
    */
    static new(width, height) {
        const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.gravity_new(width, height);
        return Gravity.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    width() {
        const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.gravity_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    height() {
        const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.gravity_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} scale
    */
    set_view(x, y, scale) {
        _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.gravity_set_view(this.ptr, x, y, scale);
    }
    /**
    * @param {Uint8Array} data
    * @param {Float32Array} planets
    * @param {number} planets_length
    * @param {Float32Array} view
    */
    draw_planets(data, planets, planets_length, view) {
        try {
            var ptr0 = passArray8ToWasm0(data, _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayF32ToWasm0(planets, _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passArrayF32ToWasm0(view, _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc);
            const len2 = WASM_VECTOR_LEN;
            _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.gravity_draw_planets(this.ptr, ptr0, len0, ptr1, len1, planets_length, ptr2, len2);
        } finally {
            data.set(getUint8Memory0().subarray(ptr0 / 1, ptr0 / 1 + len0));
            _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(ptr0, len0 * 1);
        }
    }
    /**
    * @param {Uint8Array} data
    * @param {number} length
    */
    mutate_data(data, length) {
        try {
            var ptr0 = passArray8ToWasm0(data, _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.gravity_mutate_data(this.ptr, ptr0, len0, length);
        } finally {
            data.set(getUint8Memory0().subarray(ptr0 / 1, ptr0 / 1 + len0));
            _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(ptr0, len0 * 1);
        }
    }
}
/**
*/
class View {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_view_free(ptr);
    }
    /**
    */
    get x() {
        const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_get_view_x(this.ptr);
        return ret >>> 0;
    }
    /**
    */
    set x(arg0) {
        _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_view_x(this.ptr, arg0);
    }
    /**
    */
    get y() {
        const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_get_view_y(this.ptr);
        return ret >>> 0;
    }
    /**
    */
    set y(arg0) {
        _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_view_y(this.ptr, arg0);
    }
    /**
    */
    get scale() {
        const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_get_view_scale(this.ptr);
        return ret;
    }
    /**
    */
    set scale(arg0) {
        _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_view_scale(this.ptr, arg0);
    }
}

function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

cachedFloat32Memory0 = new Float32Array(_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);
cachedUint8Memory0 = new Uint8Array(_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "../gravity_calc/pkg/index_bg.wasm":
/*!*****************************************!*\
  !*** ../gravity_calc/pkg/index_bg.wasm ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

var __webpack_instantiate__ = ([WEBPACK_IMPORTED_MODULE_0]) => {
	return __webpack_require__.v(exports, module.id, "42ba973150fbd72cee34", {
		"./index_bg.js": {
			"__wbindgen_throw": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw
		}
	});
}
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => {
	try {
	/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./index_bg.js */ "../gravity_calc/pkg/index_bg.js");
	var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([WEBPACK_IMPORTED_MODULE_0]);
	var [WEBPACK_IMPORTED_MODULE_0] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;
	await __webpack_require__.v(exports, module.id, "42ba973150fbd72cee34", {
		"./index_bg.js": {
			"__wbindgen_throw": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw
		}
	});
	__webpack_async_result__();
	} catch(e) { __webpack_async_result__(e); }
}, 1);

/***/ })

}]);
//# sourceMappingURL=gravity_calc_pkg_index_js.bundle.js.map