(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[167],{

/***/ "./node_modules/@arcgis/core/rest/route.js":
/*!*************************************************!*\
  !*** ./node_modules/@arcgis/core/rest/route.js ***!
  \*************************************************/
/*! exports provided: solve */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "solve", function() { return m; });
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../request.js */ "./node_modules/@arcgis/core/request.js");
/* harmony import */ var _core_queryUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/queryUtils.js */ "./node_modules/@arcgis/core/core/queryUtils.js");
/* harmony import */ var _geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../geometry/support/normalizeUtils.js */ "./node_modules/@arcgis/core/geometry/support/normalizeUtils.js");
/* harmony import */ var _networkService_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./networkService.js */ "./node_modules/@arcgis/core/rest/networkService.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@arcgis/core/rest/utils.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const p=Object(_core_queryUtils_js__WEBPACK_IMPORTED_MODULE_1__["createQueryParamsHelper"])({accumulateAttributes:{name:"accumulateAttributeNames"},attributeParameterValues:!0,directionsTimeAttribute:{name:"directionsTimeAttributeName"},impedanceAttribute:{name:"impedanceAttributeName"},outSpatialReference:{name:"outSR",getter:e=>e.outSpatialReference.wkid},pointBarriers:{name:"barriers"},polylineBarriers:!0,polygonBarriers:!0,restrictionAttributes:{name:"restrictionAttributeNames"},stops:!0,travelMode:!0});async function m(r,m,l){const c=[],f=[],y={},B={},h=Object(_utils_js__WEBPACK_IMPORTED_MODULE_4__["parseUrl"])(r);return m.stops&&m.stops.features&&Object(_networkService_js__WEBPACK_IMPORTED_MODULE_3__["collectGeometries"])(m.stops.features,f,"stops.features",y),m.pointBarriers&&m.pointBarriers.features&&Object(_networkService_js__WEBPACK_IMPORTED_MODULE_3__["collectGeometries"])(m.pointBarriers.features,f,"pointBarriers.features",y),m.polylineBarriers&&m.polylineBarriers.features&&Object(_networkService_js__WEBPACK_IMPORTED_MODULE_3__["collectGeometries"])(m.polylineBarriers.features,f,"polylineBarriers.features",y),m.polygonBarriers&&m.polygonBarriers.features&&Object(_networkService_js__WEBPACK_IMPORTED_MODULE_3__["collectGeometries"])(m.polygonBarriers.features,f,"polygonBarriers.features",y),Object(_geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_2__["normalizeCentralMeridian"])(f).then((e=>{for(const r in y){const t=y[r];c.push(r),B[r]=e.slice(t[0],t[1])}return Object(_networkService_js__WEBPACK_IMPORTED_MODULE_3__["isInputGeometryZAware"])(B,c)?Object(_networkService_js__WEBPACK_IMPORTED_MODULE_3__["fetchServiceDescription"])(h.path):Promise.resolve({dontCheck:!0})})).then((r=>{("dontCheck"in r?r.dontCheck:r.hasZ)||Object(_networkService_js__WEBPACK_IMPORTED_MODULE_3__["dropZValuesOffInputGeometry"])(B,c);for(const e in B)B[e].forEach(((r,t)=>{m.get(e)[t].geometry=r}));const t={...l,query:{...h.query,...p.toQueryParams(m),f:"json"}},{path:s}=h,o="/solve",i=s.endsWith(o)?s:s+o;return Object(_request_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i,t)})).then((e=>Object(_networkService_js__WEBPACK_IMPORTED_MODULE_3__["handleSolveResponse"])(e)))}


/***/ }),

/***/ "./node_modules/@arcgis/core/tasks/RouteTask.js":
/*!******************************************************!*\
  !*** ./node_modules/@arcgis/core/tasks/RouteTask.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chunks/tslib.es6.js */ "./node_modules/@arcgis/core/chunks/tslib.es6.js");
/* harmony import */ var _core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/accessorSupport/decorators/property.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js");
/* harmony import */ var _core_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/has.js */ "./node_modules/@arcgis/core/core/has.js");
/* harmony import */ var _core_accessorSupport_ensureType_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/accessorSupport/ensureType.js */ "./node_modules/@arcgis/core/core/accessorSupport/ensureType.js");
/* harmony import */ var _core_Logger_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/Logger.js */ "./node_modules/@arcgis/core/core/Logger.js");
/* harmony import */ var _core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/accessorSupport/decorators/subclass.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js");
/* harmony import */ var _rest_route_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../rest/route.js */ "./node_modules/@arcgis/core/rest/route.js");
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Task.js */ "./node_modules/@arcgis/core/tasks/Task.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
let t=class extends _Task_js__WEBPACK_IMPORTED_MODULE_7__["default"]{constructor(r){super(r)}solve(r,s){return Object(_rest_route_js__WEBPACK_IMPORTED_MODULE_6__["solve"])(this.url,r,s)}};t=Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__["subclass"])("esri.tasks.RouteTask")],t);var p=t;/* harmony default export */ __webpack_exports__["default"] = (p);


/***/ })

}]);
//# sourceMappingURL=167.ArcGIS.js.map