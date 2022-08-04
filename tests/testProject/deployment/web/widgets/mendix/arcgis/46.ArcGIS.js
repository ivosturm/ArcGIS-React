(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[46],{

/***/ "./node_modules/@arcgis/core/views/webgl.js":
/*!**************************************************!*\
  !*** ./node_modules/@arcgis/core/views/webgl.js ***!
  \**************************************************/
/*! exports provided: BufferObject, FramebufferObject, Program, ProgramCache, Renderbuffer, RenderingContext, ShaderCompiler, Texture, VertexArrayObject, createProgram, glslifyDefineMap, createContextOrErrorHTML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webgl_BufferObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webgl/BufferObject.js */ "./node_modules/@arcgis/core/views/webgl/BufferObject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BufferObject", function() { return _webgl_BufferObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _webgl_FramebufferObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webgl/FramebufferObject.js */ "./node_modules/@arcgis/core/views/webgl/FramebufferObject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FramebufferObject", function() { return _webgl_FramebufferObject_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _webgl_Program_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webgl/Program.js */ "./node_modules/@arcgis/core/views/webgl/Program.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return _webgl_Program_js__WEBPACK_IMPORTED_MODULE_2__["Program"]; });

/* harmony import */ var _webgl_ProgramCache_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./webgl/ProgramCache.js */ "./node_modules/@arcgis/core/views/webgl/ProgramCache.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgramCache", function() { return _webgl_ProgramCache_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _webgl_Renderbuffer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./webgl/Renderbuffer.js */ "./node_modules/@arcgis/core/views/webgl/Renderbuffer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Renderbuffer", function() { return _webgl_Renderbuffer_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _webgl_RenderingContext_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./webgl/RenderingContext.js */ "./node_modules/@arcgis/core/views/webgl/RenderingContext.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderingContext", function() { return _webgl_RenderingContext_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _webgl_ShaderCompiler_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./webgl/ShaderCompiler.js */ "./node_modules/@arcgis/core/views/webgl/ShaderCompiler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShaderCompiler", function() { return _webgl_ShaderCompiler_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _webgl_Texture_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./webgl/Texture.js */ "./node_modules/@arcgis/core/views/webgl/Texture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Texture", function() { return _webgl_Texture_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _webgl_VertexArrayObject_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./webgl/VertexArrayObject.js */ "./node_modules/@arcgis/core/views/webgl/VertexArrayObject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexArrayObject", function() { return _webgl_VertexArrayObject_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _webgl_programUtils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./webgl/programUtils.js */ "./node_modules/@arcgis/core/views/webgl/programUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return _webgl_programUtils_js__WEBPACK_IMPORTED_MODULE_9__["createProgram"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "glslifyDefineMap", function() { return _webgl_programUtils_js__WEBPACK_IMPORTED_MODULE_9__["glslifyDefineMap"]; });

/* harmony import */ var _webgl_context_util_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./webgl/context-util.js */ "./node_modules/@arcgis/core/views/webgl/context-util.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createContextOrErrorHTML", function() { return _webgl_context_util_js__WEBPACK_IMPORTED_MODULE_10__["createContextOrErrorHTML"]; });

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/



/***/ }),

/***/ "./node_modules/@arcgis/core/views/webgl/ProgramCache.js":
/*!***************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/webgl/ProgramCache.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _programUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./programUtils.js */ "./node_modules/@arcgis/core/views/webgl/programUtils.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
class t{constructor(r){this._programCacheByTemplate=new Map,this._rctx=r}dispose(){this._programCacheByTemplate.forEach((r=>r.programs.forEach((r=>r.dispose())))),this._programCacheByTemplate=null}getProgram(t,a){return this._programCacheByTemplate.has(t)||this.addProgramTemplate(t,(a=>Object(_programUtils_js__WEBPACK_IMPORTED_MODULE_0__["createProgram"])(this._rctx,t,a))),this.getProgramTemplateInstance(t,a)}addProgramTemplate(r,t){this._programCacheByTemplate.set(r,{constructor:t,programs:new Map})}getProgramTemplateInstance(r,t){const a=this._programCacheByTemplate.get(r);if(a){const r=t?JSON.stringify(t):"default";if(!a.programs.has(r)){const e=a.constructor(t);a.programs.set(r,e)}return a.programs.get(r)}return null}}/* harmony default export */ __webpack_exports__["default"] = (t);


/***/ }),

/***/ "./node_modules/@arcgis/core/views/webgl/ShaderCompiler.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/webgl/ShaderCompiler.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
class e{constructor(e){this.readFile=e}resolveIncludes(e){return this.resolve(e)}resolve(e,t=new Map){if(t.has(e))return t.get(e);const r=this.read(e);if(!r)throw new Error(`cannot find shader file ${e}`);const s=/^[^\S\n]*#include\s+<(\S+)>[^\S\n]?/gm;let n=s.exec(r);const l=[];for(;null!=n;)l.push({path:n[1],start:n.index,length:n[0].length}),n=s.exec(r);let a=0,h="";return l.forEach((e=>{h+=r.slice(a,e.start),h+=t.has(e.path)?"":this.resolve(e.path,t),a=e.start+e.length})),h+=r.slice(a),t.set(e,h),h}read(e){return this.readFile(e)}}/* harmony default export */ __webpack_exports__["default"] = (e);


/***/ }),

/***/ "./node_modules/@arcgis/core/views/webgl/Texture.js":
/*!**********************************************************!*\
  !*** ./node_modules/@arcgis/core/views/webgl/Texture.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/mathUtils.js */ "./node_modules/@arcgis/core/core/mathUtils.js");
/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/maybe.js */ "./node_modules/@arcgis/core/core/maybe.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@arcgis/core/views/webgl/enums.js");
/* harmony import */ var _capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./capabilities/isWebGL2Context.js */ "./node_modules/@arcgis/core/views/webgl/capabilities/isWebGL2Context.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const s=4;class r{constructor(t,e,a=null){this._context=t,this.type="texture",this._glName=null,this._descriptor=void 0,this._samplingModeDirty=!1,this._wrapModeDirty=!1,t.instanceCounter.increment(_enums_js__WEBPACK_IMPORTED_MODULE_2__["ResourceType"].Texture,this),this._descriptor={target:3553,samplingMode:9729,wrapMode:10497,flipped:!1,hasMipmap:!1,isOpaque:!1,unpackAlignment:4,preMultiplyAlpha:!1,...e},this.setData(a)}get glName(){return this._glName}get descriptor(){return this._descriptor}dispose(){this._context.gl&&this._glName&&(this._context.unbindTextureAllUnits(this),this._context.gl.deleteTexture(this._glName),this._glName=null,this._context.instanceCounter.decrement(_enums_js__WEBPACK_IMPORTED_MODULE_2__["ResourceType"].Texture,this))}release(){this.dispose()}resize(t,e){const i=this._descriptor;i.width===t&&i.height===e||(i.width=t,i.height=e,this.setData(null))}setData(t){if(!this._context||!this._context.gl)return;const i=this._context.gl;this._glName||(this._glName=i.createTexture()),void 0===t&&(t=null),null===t&&(this._descriptor.width=this._descriptor.width||s,this._descriptor.height=this._descriptor.height||s);const a=this._context.bindTexture(this,r.TEXTURE_UNIT_FOR_UPDATES),p=this._descriptor;r._validateTexture(this._context,p),i.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipped?1:0),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.preMultiplyAlpha?1:0);const n=p.pixelFormat;let h=p.internalFormat?p.internalFormat:n;if(t instanceof ImageData||t instanceof HTMLImageElement||t instanceof HTMLCanvasElement||t instanceof HTMLVideoElement){let e=t.width,a=t.height;t instanceof HTMLVideoElement&&(e=t.videoWidth,a=t.videoHeight),p.width&&p.height,i.texImage2D(i.TEXTURE_2D,0,h,n,p.dataType,t),p.hasMipmap&&this.generateMipmap(),void 0===p.width&&(p.width=e),void 0===p.height&&(p.height=a)}else{null!=p.width&&null!=p.height||console.error("Width and height must be specified!"),i.DEPTH24_STENCIL8&&h===i.DEPTH_STENCIL&&(h=i.DEPTH24_STENCIL8);let a=p.width,s=p.height;if(o(t)){const e=Math.round(Math.log(Math.max(a,s))/Math.LN2)+1;p.hasMipmap=p.hasMipmap&&e===t.levels.length;for(let r=0;;++r){const e=t.levels[Math.min(r,t.levels.length-1)];if(i.compressedTexImage2D(i.TEXTURE_2D,r,h,a,s,0,e),1===a&&1===s||!p.hasMipmap)break;a=Math.max(1,a>>1),s=Math.max(1,s>>1)}}else if(Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__["isSome"])(t))i.texImage2D(i.TEXTURE_2D,0,h,a,s,0,n,p.dataType,t),p.hasMipmap&&this.generateMipmap();else for(let t=0;i.texImage2D(i.TEXTURE_2D,t,h,a,s,0,n,p.dataType,null),(1!==a||1!==s)&&p.hasMipmap;++t)a=Math.max(1,a>>1),s=Math.max(1,s>>1)}r._applySamplingMode(i,this._descriptor),r._applyWrapMode(i,this._descriptor),r._applyAnisotropicFilteringParameters(this._context,this._descriptor),this._context.bindTexture(a,r.TEXTURE_UNIT_FOR_UPDATES)}updateData(t,e,i,a,s,o){o||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");const p=this._context.gl,n=this._descriptor,h=this._context.bindTexture(this,r.TEXTURE_UNIT_FOR_UPDATES);(e<0||i<0||a>n.width||s>n.height||e+a>n.width||i+s>n.height)&&console.error("An attempt to update out of bounds of the texture!"),p.pixelStorei(p.UNPACK_ALIGNMENT,n.unpackAlignment),p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL,n.flipped?1:0),p.pixelStorei(p.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.preMultiplyAlpha?1:0),o instanceof ImageData||o instanceof HTMLImageElement||o instanceof HTMLCanvasElement||o instanceof HTMLVideoElement?p.texSubImage2D(p.TEXTURE_2D,t,e,i,n.pixelFormat,n.dataType,o):p.texSubImage2D(p.TEXTURE_2D,t,e,i,a,s,n.pixelFormat,n.dataType,o),this._context.bindTexture(h,r.TEXTURE_UNIT_FOR_UPDATES)}generateMipmap(){const t=this._descriptor;t.hasMipmap||(t.hasMipmap=!0,this._samplingModeDirty=!0,r._validateTexture(this._context,t)),9729===t.samplingMode?(this._samplingModeDirty=!0,t.samplingMode=9985):9728===t.samplingMode&&(this._samplingModeDirty=!0,t.samplingMode=9984);const e=this._context.bindTexture(this,r.TEXTURE_UNIT_FOR_UPDATES),i=this._context.gl;i.generateMipmap(i.TEXTURE_2D),this._context.bindTexture(e,r.TEXTURE_UNIT_FOR_UPDATES)}setSamplingMode(t){t!==this._descriptor.samplingMode&&(this._descriptor.samplingMode=t,this._samplingModeDirty=!0)}setWrapMode(t){t!==this._descriptor.wrapMode&&(this._descriptor.wrapMode=t,r._validateTexture(this._context,this._descriptor),this._wrapModeDirty=!0)}applyChanges(){const t=this._context.gl,e=this._descriptor;this._samplingModeDirty&&(r._applySamplingMode(t,e),this._samplingModeDirty=!1),this._wrapModeDirty&&(r._applyWrapMode(t,e),this._wrapModeDirty=!1)}static _validateTexture(e,i){(i.width<0||i.height<0)&&console.error("Negative dimension parameters are not allowed!");const s=Object(_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__["isPowerOfTwo"])(i.width)&&Object(_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_0__["isPowerOfTwo"])(i.height);Object(_capabilities_isWebGL2Context_js__WEBPACK_IMPORTED_MODULE_3__["default"])(e.gl)||s||("number"==typeof i.wrapMode?33071!==i.wrapMode&&console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"):33071===i.wrapMode.s&&33071===i.wrapMode.t||console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"),i.hasMipmap&&console.error("Mipmapping requires power-of-two textures!"))}static _applySamplingMode(t,e){let i=e.samplingMode,a=e.samplingMode;9985===i||9987===i?(i=9729,e.hasMipmap||(a=9729)):9984!==i&&9986!==i||(i=9728,e.hasMipmap||(a=9728)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,a)}static _applyWrapMode(t,e){"number"==typeof e.wrapMode?(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,e.wrapMode),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,e.wrapMode)):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,e.wrapMode.s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,e.wrapMode.t))}static _applyAnisotropicFilteringParameters(t,e){var i;const a=t.capabilities.textureFilterAnisotropic;if(!a)return;const s=t.gl;s.texParameterf(s.TEXTURE_2D,a.TEXTURE_MAX_ANISOTROPY,null!=(i=e.maxAnisotropy)?i:1)}}function o(t){return Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__["isSome"])(t)&&"type"in t&&"compressed"===t.type}r.TEXTURE_UNIT_FOR_UPDATES=0;/* harmony default export */ __webpack_exports__["default"] = (r);


/***/ }),

/***/ "./node_modules/@arcgis/core/views/webgl/capabilities/isWebGL2Context.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/webgl/capabilities/isWebGL2Context.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
function n(n){return window.WebGL2RenderingContext&&n instanceof window.WebGL2RenderingContext}/* harmony default export */ __webpack_exports__["default"] = (n);


/***/ }),

/***/ "./node_modules/@arcgis/core/views/webgl/enums.js":
/*!********************************************************!*\
  !*** ./node_modules/@arcgis/core/views/webgl/enums.js ***!
  \********************************************************/
/*! exports provided: BASE_TEXTURE_UNIT, DepthStencilAttachment, ResourceType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASE_TEXTURE_UNIT", function() { return r; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepthStencilAttachment", function() { return f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceType", function() { return e; });
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const r=33984;var e;!function(r){r[r.Texture=0]="Texture",r[r.Buffer=1]="Buffer",r[r.VAO=2]="VAO",r[r.Program=3]="Program",r[r.Framebuffer=4]="Framebuffer",r[r.Renderbuffer=5]="Renderbuffer",r[r.COUNT=6]="COUNT"}(e||(e={}));const f=33306;


/***/ }),

/***/ "./node_modules/@arcgis/core/views/webgl/programUtils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/webgl/programUtils.js ***!
  \***************************************************************/
/*! exports provided: createProgram, glslifyDefineMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return t; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glslifyDefineMap", function() { return n; });
/* harmony import */ var _Program_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Program.js */ "./node_modules/@arcgis/core/views/webgl/Program.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
function n(e){let n="";for(const t in e){const o=e[t];if("boolean"==typeof o)o&&(n+=`#define ${t}\n`);else if("number"==typeof o)n+=`#define ${t} ${o.toFixed()}\n`;else if("object"==typeof o){const e=o.options;let r=0;for(const t in e)n+=`#define ${e[t]} ${(r++).toFixed()}\n`;n+=`#define ${t} ${e[o.value]}\n`}}return n}function t(n,t,o,r){o=o||{},r=r||"";const f="function"==typeof t.shaders?t.shaders(o):t.shaders;return new _Program_js__WEBPACK_IMPORTED_MODULE_0__["Program"](n,r+f.vertexShader,r+f.fragmentShader,t.attributes)}


/***/ })

}]);
//# sourceMappingURL=46.ArcGIS.js.map