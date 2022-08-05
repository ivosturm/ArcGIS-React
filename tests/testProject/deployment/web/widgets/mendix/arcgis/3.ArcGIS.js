(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/@arcgis/core/chunks/_commonjsHelpers.js":
/*!**************************************************************!*\
  !*** ./node_modules/@arcgis/core/chunks/_commonjsHelpers.js ***!
  \**************************************************************/
/*! exports provided: a, c, g */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return o; });
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function o(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function n(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../@mendix/pluggable-widgets-tools/node_modules/webpack/buildin/global.js */ "./node_modules/@mendix/pluggable-widgets-tools/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@arcgis/core/views/2d/engine/webgl/SymbolProperties.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/2d/engine/webgl/SymbolProperties.js ***!
  \*****************************************************************************/
/*! exports provided: TextProperties */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextProperties", function() { return h; });
/* harmony import */ var _core_ObjectPool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/ObjectPool.js */ "./node_modules/@arcgis/core/core/ObjectPool.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
class h{constructor(){this.color=[0,0,0,0],this.haloColor=[0,0,0,0],this.haloSize=0,this.size=12,this.angle=0,this.offsetX=0,this.offsetY=0,this.hAnchor=0,this.vAnchor=0}acquire(o,h,s,t,i,l,r,e,c){this.color=o,this.haloColor=h,this.haloSize=s,this.size=t,this.angle=i,this.offsetX=l,this.offsetY=r,this.hAnchor=e,this.vAnchor=c}release(){this.color[0]=this.color[1]=this.color[2]=this.color[3]=0,this.haloColor[0]=this.haloColor[1]=this.haloColor[2]=this.haloColor[3]=0,this.haloSize=0,this.size=0,this.angle=0,this.offsetX=0,this.offsetY=0,this.hAnchor=0,this.vAnchor=0}}h.pool=new _core_ObjectPool_js__WEBPACK_IMPORTED_MODULE_0__["default"](h);


/***/ }),

/***/ "./node_modules/@arcgis/core/views/2d/engine/webgl/Utils.js":
/*!******************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/2d/engine/webgl/Utils.js ***!
  \******************************************************************/
/*! exports provided: C_FILL_STRIDE_SPEC, C_FILL_STRIDE_SPEC_DD, C_FILL_VERTEX_DEF, C_FILL_VERTEX_DEF_DD, C_ICON_STRIDE_SPEC, C_ICON_VERTEX_DEF, C_LABEL_STRIDE_SPEC, C_LABEL_VERTEX_DEF, C_LINE_STRIDE_SPEC, C_LINE_VERTEX_DEF, C_TEXT_STRIDE_SPEC, C_TEXT_VERTEX_DEF, C_VBO_GEOMETRY, C_VBO_INFO, C_VBO_PERINSTANCE, C_VBO_PERINSTANCE_VV, allocateTypedArrayBuffer, allocateTypedArrayBufferwithData, copyMeshData, createGeometryData, createProgramDescriptor, createTextureFromTexelData, forEachGeometryType, geometryToMappedGeometry, getBytes, getCapType, getJoinType, getNamedBuffers, getPixelArrayCtor, getPixelBytes, getStrides, getTextProperties, getTransformParams, getVVType, isDefined, isNumber, strideToPackingFactor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_FILL_STRIDE_SPEC", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_FILL_STRIDE_SPEC_DD", function() { return I; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_FILL_VERTEX_DEF", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_FILL_VERTEX_DEF_DD", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_ICON_STRIDE_SPEC", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_ICON_VERTEX_DEF", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_LABEL_STRIDE_SPEC", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_LABEL_VERTEX_DEF", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_LINE_STRIDE_SPEC", function() { return E; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_LINE_VERTEX_DEF", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_TEXT_STRIDE_SPEC", function() { return b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_TEXT_VERTEX_DEF", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_VBO_GEOMETRY", function() { return f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_VBO_INFO", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_VBO_PERINSTANCE", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C_VBO_PERINSTANCE_VV", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allocateTypedArrayBuffer", function() { return R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allocateTypedArrayBufferwithData", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyMeshData", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGeometryData", function() { return D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgramDescriptor", function() { return te; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextureFromTexelData", function() { return k; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEachGeometryType", function() { return re; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geometryToMappedGeometry", function() { return J; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBytes", function() { return Y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCapType", function() { return P; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getJoinType", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNamedBuffers", function() { return j; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPixelArrayCtor", function() { return H; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPixelBytes", function() { return G; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStrides", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTextProperties", function() { return $; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTransformParams", function() { return Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVVType", function() { return X; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return N; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return K; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strideToPackingFactor", function() { return C; });
/* harmony import */ var _core_Error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/Error.js */ "./node_modules/@arcgis/core/core/Error.js");
/* harmony import */ var _core_Logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/Logger.js */ "./node_modules/@arcgis/core/core/Logger.js");
/* harmony import */ var _core_mathUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/mathUtils.js */ "./node_modules/@arcgis/core/core/mathUtils.js");
/* harmony import */ var _core_screenUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/screenUtils.js */ "./node_modules/@arcgis/core/core/screenUtils.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./color.js */ "./node_modules/@arcgis/core/views/2d/engine/webgl/color.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@arcgis/core/views/2d/engine/webgl/enums.js");
/* harmony import */ var _SymbolProperties_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SymbolProperties.js */ "./node_modules/@arcgis/core/views/2d/engine/webgl/SymbolProperties.js");
/* harmony import */ var _webgl_Texture_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../webgl/Texture.js */ "./node_modules/@arcgis/core/views/webgl/Texture.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const u=_core_Logger_js__WEBPACK_IMPORTED_MODULE_1__["default"].getLogger("esri.views.2d.engine.webgl.Utils"),f="geometry",l="per_instance",d="per_instance_vv",m=[{name:f,strideInBytes:36,divisor:0}],p=[{name:f,strideInBytes:36,divisor:0}],h=[{name:f,strideInBytes:12,divisor:0}],w=[{name:f,strideInBytes:40,divisor:0}],v=[{name:f,strideInBytes:36,divisor:0}],y=[{name:f,strideInBytes:36,divisor:0}];function g(e){const t={};for(const r of e)t[r.name]=r.strideInBytes;return t}const A=g(m),L=g(p),I=g(h),E=g(w),b=g(v),M=g(y);function T(e,t){switch(e){case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].MARKER:return A;case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].FILL:return t?I:L;case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].LINE:return E;case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].TEXT:return b;case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].LABEL:return M}}const x=[f],U=[f],B=[f],F=[f],z=[f];function j(e){switch(e){case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].MARKER:return x;case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].FILL:return U;case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].LINE:return B;case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].TEXT:return F;case _enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].LABEL:return z}}function C(e){switch(e%4){case 0:case 2:return 4;case 1:case 3:return 1}}function R(e,t){switch(t%4){case 0:case 2:return new Uint32Array(Math.floor(e*t/4));case 1:case 3:return new Uint8Array(e*t)}}function O(e,t){switch(t%4){case 0:case 2:return new Uint32Array(e);case 1:case 3:return new Uint8Array(e)}}function $(e){return _SymbolProperties_js__WEBPACK_IMPORTED_MODULE_6__["TextProperties"].pool.acquire(e.color?Object(_color_js__WEBPACK_IMPORTED_MODULE_4__["copyAndPremultiply"])(e.color):[255,255,255,255],e.haloColor?Object(_color_js__WEBPACK_IMPORTED_MODULE_4__["copyAndPremultiply"])(e.haloColor):[255,255,255,255],Object(_core_screenUtils_js__WEBPACK_IMPORTED_MODULE_3__["pt2px"])(e.haloSize),Object(_core_screenUtils_js__WEBPACK_IMPORTED_MODULE_3__["pt2px"])(e.font.size),e.angle*Math.PI/180,e.xoffset/e.font.size,e.yoffset/e.font.size,"left"===e.horizontalAlignment?0:"right"===e.horizontalAlignment?1:.5,"top"===e.verticalAlignment?0:"bottom"===e.verticalAlignment?1:.5)}function N(e){return null!=e}function K(e){return"number"==typeof e}function P(t){switch(t){case"butt":return 0;case"round":return 1;case"square":return 2;default:return u.error(new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__["default"]("mapview-invalid-type",`Cap type ${t} is not a valid option. Defaulting to round`)),1}}function S(t){switch(t){case"miter":return 2;case"bevel":return 0;case"round":return 1;default:return u.error(new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__["default"]("mapview-invalid-type",`Join type ${t} is not a valid option. Defaulting to round`)),1}}function X(e){switch(e){case"opacity":return _enums_js__WEBPACK_IMPORTED_MODULE_5__["VVType"].OPACITY;case"color":return _enums_js__WEBPACK_IMPORTED_MODULE_5__["VVType"].COLOR;case"rotation":return _enums_js__WEBPACK_IMPORTED_MODULE_5__["VVType"].ROTATION;case"size":return _enums_js__WEBPACK_IMPORTED_MODULE_5__["VVType"].SIZE;default:return u.error(`Cannot interpret unknown vv: ${e}`),null}}function Z(e){const{transform:t,hasZ:r,hasM:n}=e;return{transform:t,hasZ:r,hasM:n}}function _(e,t,r,n,o,s,i){for(const c in s){const t=s[c].stride,n=C(t),i=s[c].data,a=r[c].data,u=t*o.vertexCount/n,f=t*e/n,l=t*o.vertexFrom/n;for(let e=0;e<u;++e)a[e+f]=i[e+l]}const a=o.indexCount;for(let c=0;c<a;++c)n[c+t]=i[c+o.indexFrom]-o.vertexFrom+e}const q={[f]:35044};function D(e,t){const r=[];for(let n=0;n<5;++n){const o=j(n),s={};for(const e of o)s[e]={data:t(n,e)};r.push({data:e(n),buffers:s})}return r}function k(e,t){let n,o;return Object(_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_2__["isPowerOfTwo"])(t.width)&&Object(_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_2__["isPowerOfTwo"])(t.height)?(n=!0,o=9987):(n=!1,o=9729),new _webgl_Texture_js__WEBPACK_IMPORTED_MODULE_7__["default"](e,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,hasMipmap:n,samplingMode:o,wrapMode:33071,flipped:!0},t)}function J(e){return{vertexFrom:void 0,vertexTo:void 0,geometry:e}}function Y(e){switch(e){case 5120:case 5121:return 1;case 5122:case 5123:return 2;case 5126:case 5124:case 5125:return 4}}function G(t){switch(t){case 5121:return 1;case 32819:return 2;case 5126:return 4;default:return void u.error(new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__["default"]("webgl-utils",`Unable to handle type ${t}`))}}function H(t){switch(t){case 5121:return Uint8Array;case 32819:return Uint16Array;case 5126:return Float32Array;default:return void u.error(new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__["default"]("webgl-utils",`Unable to handle type ${t}`))}}function Q(e){const t={};for(const r in e){const n=e[r];let o=0;t[r]=n.map((e=>{const t={...e,normalized:e.normalized||!1,divisor:e.divisor||0,offset:o,stride:0};return o+=e.count*Y(e.type),t})),t[r].forEach((e=>e.stride=o))}return t}const V=e=>{const t=new Map;for(const r in e)for(const n of e[r])t.set(n.name,n.location);return t},W=e=>{const t={};for(const r in e){const n=e[r];t[r]=n.length?n[0].stride:0}return t},ee=new Map,te=(e,t)=>{if(!ee.has(e)){const r=Q(t),n={strides:W(r),bufferLayouts:r,attributes:V(t)};ee.set(e,n)}return ee.get(e)};function re(e){e(_enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].FILL),e(_enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].LINE),e(_enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].MARKER),e(_enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].TEXT),e(_enums_js__WEBPACK_IMPORTED_MODULE_5__["WGLGeometryType"].LABEL)}


/***/ }),

/***/ "./node_modules/@arcgis/core/views/2d/engine/webgl/color.js":
/*!******************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/2d/engine/webgl/color.js ***!
  \******************************************************************/
/*! exports provided: copyAndPremultiply, premultiplyAlpha, premultiplyAlphaRGBA, premultiplyAlphaRGBAArray, premultiplyAlphaUint32, white */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyAndPremultiply", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "premultiplyAlpha", function() { return o; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "premultiplyAlphaRGBA", function() { return i; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "premultiplyAlphaRGBAArray", function() { return f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "premultiplyAlphaUint32", function() { return e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "white", function() { return n; });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ "./node_modules/@arcgis/core/views/2d/engine/webgl/number.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const n=[255,255,255,1],t=[0,0,0,0];function u(r,n){return Array.isArray(n)?(r[0]=n[0],r[1]=n[1],r[2]=n[2],r[3]=n[3]):(r[0]=n.r,r[1]=n.g,r[2]=n.b,r[3]=n.a),r}function o(r,n=0,t=!1){const u=r[n+3];return r[n+0]*=u,r[n+1]*=u,r[n+2]*=u,t||(r[n+3]*=255),r}function c(r){return o(u([],r))}function e(n){return o(u(t,n)),Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["i8888to32"])(t[0],t[1],t[2],t[3])}function i(n){if(!n)return 0;const{r:t,g:u,b:o,a:c}=n;return Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["i8888to32"])(t*c,u*c,o*c,255*c)}function f(n){if(!n)return 0;const[t,u,o,c]=n;return Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["i8888to32"])(t*(c/255),u*(c/255),o*(c/255),c)}


/***/ }),

/***/ "./node_modules/@arcgis/core/views/2d/engine/webgl/definitions.js":
/*!************************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/2d/engine/webgl/definitions.js ***!
  \************************************************************************/
/*! exports provided: ANGLE_FACTOR_256, ATTRIBUTE_DATA_ANIMATION, ATTRIBUTE_DATA_DD0, ATTRIBUTE_DATA_DD1, ATTRIBUTE_DATA_FILTER_FLAGS, ATTRIBUTE_DATA_VV, ATTRIBUTE_STORE_TEXTURE_SIZE, AVERAGE_GLYPH_MOSAIC_ITEM, BUFFER_DATA_MINIMUM_SIZE, BUFFER_DATA_POOL_SIZE, COLLISION_BOX_PADDING, COLLISION_BUCKET_SIZE, COLLISION_EARLY_REJECT_BUCKET_SIZE, COLLISION_MAX_ZOOM_DELTA, COLLISION_PLACEMENT_PADDING, COLLISION_TILE_BOX_SIZE, DEBUG_LABELS, DISPLAY_RECORD_INT_PER_ELEMENT, DOT_DENSITY_MAX_FIELDS, EFFECT_FLAG_0, ENABLE_EARLY_LABEL_DISCARD, EXTRUDE_SCALE, FILTER_FLAG_0, GLYPH_SIZE, HEURISTIC_GLYPHS_PER_FEATURE, HEURISTIC_GLYPHS_PER_LINE, HIGHLIGHT_FLAG, HITTEST_SEARCH_SIZE, MAGIC_LABEL_LINE_HEIGHT, MAX_FILTERS, MAX_GPU_UPLOADS_PER_FRAME, MIN_MAX_ZOOM_PRECISION_FACTOR, NAN_MAGIC_NUMBER, PATCH_PIXEL_BUFFER_ALLOC_SIZE, PICTURE_FILL_COLOR, RASTER_TILE_SIZE, SPRITE_PADDING, TEXTURE_BINDING_ATTRIBUTE_DATA_0, TEXTURE_BINDING_ATTRIBUTE_DATA_1, TEXTURE_BINDING_ATTRIBUTE_DATA_2, TEXTURE_BINDING_ATTRIBUTE_DATA_3, TEXTURE_BINDING_BITMAP, TEXTURE_BINDING_GLYPH_ATLAS, TEXTURE_BINDING_HIGHLIGHT_0, TEXTURE_BINDING_HIGHLIGHT_1, TEXTURE_BINDING_RENDERER_0, TEXTURE_BINDING_RENDERER_1, TEXTURE_BINDING_SPRITE_ATLAS, TEXT_PLACEMENT_PADDING, THIN_LINE_HALF_WIDTH_THRESHOLD, TILE_SIZE, VTL_HIGH_RES_CUTOFF, VTL_TEXTURE_BINDING_UNIT_GLYPHS, VTL_TEXTURE_BINDING_UNIT_SPRITES, WEBGL_MAX_INNER_STOPS, WEBGL_MAX_STOPS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANGLE_FACTOR_256", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_DATA_ANIMATION", function() { return J; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_DATA_DD0", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_DATA_DD1", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_DATA_FILTER_FLAGS", function() { return I; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_DATA_VV", function() { return K; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTRIBUTE_STORE_TEXTURE_SIZE", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AVERAGE_GLYPH_MOSAIC_ITEM", function() { return k; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUFFER_DATA_MINIMUM_SIZE", function() { return tt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUFFER_DATA_POOL_SIZE", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLLISION_BOX_PADDING", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLLISION_BUCKET_SIZE", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLLISION_EARLY_REJECT_BUCKET_SIZE", function() { return g; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLLISION_MAX_ZOOM_DELTA", function() { return f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLLISION_PLACEMENT_PADDING", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLLISION_TILE_BOX_SIZE", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEBUG_LABELS", function() { return n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_RECORD_INT_PER_ELEMENT", function() { return Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOT_DENSITY_MAX_FIELDS", function() { return r; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EFFECT_FLAG_0", function() { return Q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENABLE_EARLY_LABEL_DISCARD", function() { return R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTRUDE_SCALE", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_FLAG_0", function() { return P; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLYPH_SIZE", function() { return b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEURISTIC_GLYPHS_PER_FEATURE", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEURISTIC_GLYPHS_PER_LINE", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIGHLIGHT_FLAG", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HITTEST_SEARCH_SIZE", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAGIC_LABEL_LINE_HEIGHT", function() { return s; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_FILTERS", function() { return N; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_GPU_UPLOADS_PER_FRAME", function() { return X; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_MAX_ZOOM_PRECISION_FACTOR", function() { return et; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAN_MAGIC_NUMBER", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_PIXEL_BUFFER_ALLOC_SIZE", function() { return $; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PICTURE_FILL_COLOR", function() { return i; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RASTER_TILE_SIZE", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPRITE_PADDING", function() { return Y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_ATTRIBUTE_DATA_0", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_ATTRIBUTE_DATA_1", function() { return B; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_ATTRIBUTE_DATA_2", function() { return C; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_ATTRIBUTE_DATA_3", function() { return D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_BITMAP", function() { return z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_GLYPH_ATLAS", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_HIGHLIGHT_0", function() { return E; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_HIGHLIGHT_1", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_RENDERER_0", function() { return G; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_RENDERER_1", function() { return H; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_SPRITE_ATLAS", function() { return u; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_PLACEMENT_PADDING", function() { return j; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "THIN_LINE_HALF_WIDTH_THRESHOLD", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TILE_SIZE", function() { return o; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VTL_HIGH_RES_CUTOFF", function() { return W; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VTL_TEXTURE_BINDING_UNIT_GLYPHS", function() { return V; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VTL_TEXTURE_BINDING_UNIT_SPRITES", function() { return U; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEBGL_MAX_INNER_STOPS", function() { return e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEBGL_MAX_STOPS", function() { return t; });
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const t=8,e=t-2,c=1e-30,h=64,i=4294967295,o=512,a=256,d=256/360,n=!1,p=128,r=8,s=29,f=1,g=16,l=16,m=o/p,v=8,w=50,x=10,b=24,j=8,k={metrics:{width:15,height:17,left:0,top:-7,advance:14}},q=1024,u=0,y=0,z=0,A=1,B=2,C=3,D=4,E=5,F=6,G=5,H=6,I=0,J=1,K=2,L=3,M=3,N=2,O=1,P=2,Q=4,R=!1,S=1.05,T=6,U=5,V=6,W=1.15,X=2,Y=2,Z=7,$=500,_=4,tt=128,et=10;


/***/ }),

/***/ "./node_modules/@arcgis/core/views/2d/engine/webgl/enums.js":
/*!******************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/2d/engine/webgl/enums.js ***!
  \******************************************************************/
/*! exports provided: MosaicType, VVType, WGLDrawPhase, WGLGeometryTransactionStatus, WGLGeometryType, WGLVVFlag, WGLVVTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MosaicType", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VVType", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WGLDrawPhase", function() { return I; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WGLGeometryTransactionStatus", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WGLGeometryType", function() { return E; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WGLVVFlag", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WGLVVTarget", function() { return _; });
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
var E,T,I,L,A,_,O;!function(E){E[E.FILL=0]="FILL",E[E.LINE=1]="LINE",E[E.MARKER=2]="MARKER",E[E.TEXT=3]="TEXT",E[E.LABEL=4]="LABEL"}(E||(E={})),function(E){E[E.SUCCEEDED=0]="SUCCEEDED",E[E.FAILED_OUT_OF_MEMORY=1]="FAILED_OUT_OF_MEMORY"}(T||(T={})),function(E){E[E.NONE=0]="NONE",E[E.MAP=1]="MAP",E[E.LABEL=2]="LABEL",E[E.LABEL_ALPHA=4]="LABEL_ALPHA",E[E.HITTEST=8]="HITTEST",E[E.HIGHLIGHT=16]="HIGHLIGHT",E[E.CLIP=32]="CLIP",E[E.DEBUG=64]="DEBUG",E[E.NUM_DRAW_PHASES=9]="NUM_DRAW_PHASES"}(I||(I={})),function(E){E[E.SIZE=0]="SIZE",E[E.COLOR=1]="COLOR",E[E.OPACITY=2]="OPACITY",E[E.ROTATION=3]="ROTATION"}(L||(L={})),function(E){E[E.NONE=0]="NONE",E[E.OPACITY=1]="OPACITY",E[E.COLOR=2]="COLOR",E[E.ROTATION=4]="ROTATION",E[E.SIZE_MINMAX_VALUE=8]="SIZE_MINMAX_VALUE",E[E.SIZE_SCALE_STOPS=16]="SIZE_SCALE_STOPS",E[E.SIZE_FIELD_STOPS=32]="SIZE_FIELD_STOPS",E[E.SIZE_UNIT_VALUE=64]="SIZE_UNIT_VALUE"}(A||(A={})),function(E){E[E.MINMAX_TARGETS_OUTLINE=128]="MINMAX_TARGETS_OUTLINE",E[E.SCALE_TARGETS_OUTLINE=256]="SCALE_TARGETS_OUTLINE",E[E.FIELD_TARGETS_OUTLINE=512]="FIELD_TARGETS_OUTLINE",E[E.UNIT_TARGETS_OUTLINE=1024]="UNIT_TARGETS_OUTLINE"}(_||(_={})),function(E){E[E.SPRITE=0]="SPRITE",E[E.GLYPH=1]="GLYPH"}(O||(O={}));


/***/ }),

/***/ "./node_modules/@arcgis/core/views/2d/engine/webgl/number.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/2d/engine/webgl/number.js ***!
  \*******************************************************************/
/*! exports provided: i16, i1616to32, i32, i8, i8816to32, i8888to32, numTo32, toFloat32, toUint32, u16, u32, u32to4Xu8, u8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i16", function() { return e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i1616to32", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i32", function() { return o; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i8", function() { return u; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i8816to32", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i8888to32", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numTo32", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toFloat32", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUint32", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u16", function() { return i; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u32", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u32to4Xu8", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u8", function() { return f; });
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const n=new Float32Array(1),r=new Uint32Array(n.buffer);function t(n,r,t){return Math.round(Math.max(Math.min(n,t),r))}function u(n){return t(n,-128,127)}function e(n){return t(n,-32768,32767)}function o(n){return t(n,-2147483648,2147483647)}function f(n){return t(n,0,255)}function i(n){return t(n,0,65535)}function c(n){return t(n,0,4294967295)}function a(t){return n[0]=t,r[0]}function h(t){return r[0]=t,n[0]}function M(n){return[255&n,(65280&n)>>>8,(16711680&n)>>>16,(4278190080&n)>>>24]}function m(n,r){return 65535&n|r<<16}function w(n,r,t,u){return 255&n|(255&r)<<8|(255&t)<<16|u<<24}function x(n,r,t){return 255&n|(255&r)<<8|t<<16}function y(n){return 0|n}


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


/***/ })

}]);
//# sourceMappingURL=3.ArcGIS.js.map