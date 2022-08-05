(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/@arcgis/core/core/accessorSupport/originUtils.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@arcgis/core/core/accessorSupport/originUtils.js ***!
  \***********************************************************************/
/*! exports provided: updateOrigins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateOrigins", function() { return r; });
/* harmony import */ var _multiOriginJSONSupportUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../multiOriginJSONSupportUtils.js */ "./node_modules/@arcgis/core/core/multiOriginJSONSupportUtils.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
function r(r){r&&r.writtenProperties&&r.writtenProperties.forEach((r=>{const t=r.target;r.newOrigin&&r.oldOrigin!==r.newOrigin&&Object(_multiOriginJSONSupportUtils_js__WEBPACK_IMPORTED_MODULE_0__["isMultiOriginJSONMixin"])(t)&&t.updateOrigin(r.propName,r.newOrigin)}))}


/***/ }),

/***/ "./node_modules/@arcgis/core/core/multiOriginJSONSupportUtils.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@arcgis/core/core/multiOriginJSONSupportUtils.js ***!
  \***********************************************************************/
/*! exports provided: isMultiOriginJSONMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMultiOriginJSONMixin", function() { return i; });
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
function i(i){return i&&"getAtOrigin"in i&&"originOf"in i}


/***/ }),

/***/ "./node_modules/@arcgis/core/layers/mixins/SceneService.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/mixins/SceneService.js ***!
  \*****************************************************************/
/*! exports provided: SCENE_SERVICE_ITEM_TYPE, SceneService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCENE_SERVICE_ITEM_TYPE", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneService", function() { return R; });
/* harmony import */ var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../chunks/tslib.es6.js */ "./node_modules/@arcgis/core/chunks/tslib.es6.js");
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../request.js */ "./node_modules/@arcgis/core/request.js");
/* harmony import */ var _core_Error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Error.js */ "./node_modules/@arcgis/core/core/Error.js");
/* harmony import */ var _core_has_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/has.js */ "./node_modules/@arcgis/core/core/has.js");
/* harmony import */ var _core_Logger_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/Logger.js */ "./node_modules/@arcgis/core/core/Logger.js");
/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/maybe.js */ "./node_modules/@arcgis/core/core/maybe.js");
/* harmony import */ var _core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/promiseUtils.js */ "./node_modules/@arcgis/core/core/promiseUtils.js");
/* harmony import */ var _core_urlUtils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/urlUtils.js */ "./node_modules/@arcgis/core/core/urlUtils.js");
/* harmony import */ var _core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/accessorSupport/decorators/property.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js");
/* harmony import */ var _core_accessorSupport_ensureType_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/accessorSupport/ensureType.js */ "./node_modules/@arcgis/core/core/accessorSupport/ensureType.js");
/* harmony import */ var _core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/accessorSupport/decorators/reader.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/reader.js");
/* harmony import */ var _core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/accessorSupport/decorators/subclass.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js");
/* harmony import */ var _core_accessorSupport_decorators_writer_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/accessorSupport/decorators/writer.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/writer.js");
/* harmony import */ var _core_accessorSupport_originUtils_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/accessorSupport/originUtils.js */ "./node_modules/@arcgis/core/core/accessorSupport/originUtils.js");
/* harmony import */ var _geometry_Extent_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../geometry/Extent.js */ "./node_modules/@arcgis/core/geometry/Extent.js");
/* harmony import */ var _geometry_HeightModelInfo_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../geometry/HeightModelInfo.js */ "./node_modules/@arcgis/core/geometry/HeightModelInfo.js");
/* harmony import */ var _geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../geometry/SpatialReference.js */ "./node_modules/@arcgis/core/geometry/SpatialReference.js");
/* harmony import */ var _support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../support/arcgisLayerUrl.js */ "./node_modules/@arcgis/core/layers/support/arcgisLayerUrl.js");
/* harmony import */ var _support_commonProperties_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../support/commonProperties.js */ "./node_modules/@arcgis/core/layers/support/commonProperties.js");
/* harmony import */ var _support_I3SIndexInfo_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../support/I3SIndexInfo.js */ "./node_modules/@arcgis/core/layers/support/I3SIndexInfo.js");
/* harmony import */ var _portal_Portal_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../portal/Portal.js */ "./node_modules/@arcgis/core/portal/Portal.js");
/* harmony import */ var _portal_PortalItem_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../portal/PortalItem.js */ "./node_modules/@arcgis/core/portal/PortalItem.js");
/* harmony import */ var _webdoc_support_saveUtils_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../webdoc/support/saveUtils.js */ "./node_modules/@arcgis/core/webdoc/support/saveUtils.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const N=_core_Logger_js__WEBPACK_IMPORTED_MODULE_4__["default"].getLogger("esri.layers.mixins.SceneService"),R=o=>{let R=class extends o{constructor(){super(...arguments),this.spatialReference=null,this.fullExtent=null,this.heightModelInfo=null,this.minScale=0,this.maxScale=0,this.version={major:Number.NaN,minor:Number.NaN,versionString:""},this.copyright=null,this.sublayerTitleMode="item-title",this.title=null,this.layerId=null,this.indexInfo=null,this._debouncedSaveOperations=Object(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_6__["debounce"])((async(e,t,r)=>{switch(e){case 0:return this._save(t);case 1:return this._saveAs(r,t)}}))}readSpatialReference(e,t){return this._readSpatialReference(t)}_readSpatialReference(e){if(null!=e.spatialReference)return _geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_16__["default"].fromJSON(e.spatialReference);{const t=e.store,r=t.indexCRS||t.geographicCRS,o=r&&parseInt(r.substring(r.lastIndexOf("/")+1,r.length),10);return null!=o?new _geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_16__["default"](o):null}}readFullExtent(e,t,r){if(null!=e&&"object"==typeof e)return _geometry_Extent_js__WEBPACK_IMPORTED_MODULE_14__["default"].fromJSON(e,r);const o=t.store,i=this._readSpatialReference(t);return null==i||null==o||null==o.extent||!Array.isArray(o.extent)||o.extent.some((e=>e<O))?null:new _geometry_Extent_js__WEBPACK_IMPORTED_MODULE_14__["default"]({xmin:o.extent[0],ymin:o.extent[1],xmax:o.extent[2],ymax:o.extent[3],spatialReference:i})}readVersion(e,t){const r=t.store,o=null!=r.version?r.version.toString():"",i={major:Number.NaN,minor:Number.NaN,versionString:o},s=o.split(".");return s.length>=2&&(i.major=parseInt(s[0],10),i.minor=parseInt(s[1],10)),i}readTitlePortalItem(e){return"item-title"!==this.sublayerTitleMode?void 0:e}readTitleService(e,t){const r=this.portalItem&&this.portalItem.title;if("item-title"===this.sublayerTitleMode)return Object(_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_17__["titleFromUrlAndName"])(this.url,t.name);let o=t.name;if(!o&&this.url){const e=Object(_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_17__["parse"])(this.url);Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_5__["isSome"])(e)&&(o=e.title)}return"item-title-and-service-name"===this.sublayerTitleMode&&r&&(o=r+" - "+o),Object(_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_17__["cleanTitle"])(o)}set url(e){const t=Object(_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_17__["sanitizeUrlWithLayerId"])({layer:this,url:e,nonStandardUrlAllowed:!1,logger:N});this._set("url",t.url),null!=t.layerId&&this._set("layerId",t.layerId)}writeUrl(e,t,r,o){Object(_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_17__["writeUrlWithLayerId"])(this,e,"layers",t,o)}get parsedUrl(){const e=this._get("url");if(!e)return null;const t=Object(_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_7__["urlToObject"])(e);return null!=this.layerId&&(t.path=`${t.path}/layers/${this.layerId}`),t}async _fetchIndexAndUpdateExtent(e,t){this.indexInfo=Object(_support_I3SIndexInfo_js__WEBPACK_IMPORTED_MODULE_19__["fetchIndexInfo"])(this.parsedUrl.path,this.rootNode,e,this.apiKey,N,t),null==this.fullExtent||this.fullExtent.hasZ||this._updateExtent(await this.indexInfo)}_updateExtent(e){if("page"===(null==e?void 0:e.type)){var t,o;const i=e.rootIndex%e.pageSize,s=null==(t=e.rootPage)||null==(o=t.nodes)?void 0:o[i];if(null==s||null==s.obb||null==s.obb.center||null==s.obb.halfSize)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__["default"]("sceneservice:invalid-node-page","Invalid node page.");if(s.obb.center[0]<O||null==this.fullExtent||this.fullExtent.hasZ)return;const a=s.obb.halfSize,n=s.obb.center[2],l=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);this.fullExtent.zmin=n-l,this.fullExtent.zmax=n+l}else if("node"===(null==e?void 0:e.type)){var i;const t=null==(i=e.rootNode)?void 0:i.mbs;if(!Array.isArray(t)||4!==t.length||t[0]<O)return;const r=t[2],o=t[3];this.fullExtent.zmin=r-o,this.fullExtent.zmax=r+o}}async _fetchService(e){if(null==this.url)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__["default"]("sceneservice:url-not-set","Scene service can not be loaded without valid portal item or url");if(null==this.layerId&&/SceneServer\/*$/i.test(this.url)){const t=await this._fetchFirstLayerId(e);null!=t&&(this.layerId=t)}return this._fetchServiceLayer(e)}async _fetchFirstLayerId(e){const r=await Object(_request_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.url,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});if(r.data&&Array.isArray(r.data.layers)&&r.data.layers.length>0)return r.data.layers[0].id}async _fetchServiceLayer(e){const r=await Object(_request_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.parsedUrl.path,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});r.ssl&&(this.url=this.url.replace(/^http:/i,"https:"));const o=r.data;this.read(o,{origin:"service",url:this.parsedUrl}),this.validateLayer(o)}async _ensureLoadBeforeSave(){await this.load(),"beforeSave"in this&&"function"==typeof this.beforeSave&&await this.beforeSave()}validateLayer(e){}_updateTypeKeywords(e,t,r){e.typeKeywords||(e.typeKeywords=[]);const o=t.getTypeKeywords();for(const i of o)e.typeKeywords.push(i);e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(((e,t,r)=>r.indexOf(e)===t)),1===r&&(e.typeKeywords=e.typeKeywords.filter((e=>"Hosted Service"!==e))))}async _saveAs(e,t){const o={...E,...t};let i=_portal_PortalItem_js__WEBPACK_IMPORTED_MODULE_21__["default"].from(e);i||(N.error("_saveAs(): requires a portal item parameter"),await Promise.reject(new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__["default"]("sceneservice:portal-item-required","_saveAs() requires a portal item to save to"))),i.id&&(i=i.clone(),i.id=null);const s=i.portal||_portal_Portal_js__WEBPACK_IMPORTED_MODULE_20__["default"].getDefault();await this._ensureLoadBeforeSave(),i.type=T,i.portal=s;const a={origin:"portal-item",url:null,messages:[],portal:s,portalItem:i,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},n={layers:[this.write(null,a)]};return await Promise.all(a.resources.pendingOperations),await this._validateAgainstJSONSchema(n,a,o),i.url=this.url,i.title||(i.title=this.title),this._updateTypeKeywords(i,o,1),await s._signIn(),await s.user.addItem({item:i,folder:o&&o.folder,data:n}),await Object(_webdoc_support_saveUtils_js__WEBPACK_IMPORTED_MODULE_22__["saveResources"])(this.resourceReferences,a,null),this.portalItem=i,Object(_core_accessorSupport_originUtils_js__WEBPACK_IMPORTED_MODULE_13__["updateOrigins"])(a),a.portalItem=i,i}async _save(e){const t={...E,...e};this.portalItem||(N.error("_save(): requires the .portalItem property to be set"),await Promise.reject(new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__["default"]("sceneservice:portal-item-not-set","Portal item to save to has not been set on this SceneService"))),this.portalItem.type!==T&&(N.error("_save(): Non-matching portal item type. Got "+this.portalItem.type+", expected "+T),await Promise.reject(new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__["default"]("sceneservice:portal-item-wrong-type",`Portal item needs to have type "${T}"`))),await this._ensureLoadBeforeSave();const o={origin:"portal-item",url:this.portalItem.itemUrl&&Object(_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_7__["urlToObject"])(this.portalItem.itemUrl),messages:[],portal:this.portalItem.portal||_portal_Portal_js__WEBPACK_IMPORTED_MODULE_20__["default"].getDefault(),portalItem:this.portalItem,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},i={layers:[this.write(null,o)]};return await Promise.all(o.resources.pendingOperations),await this._validateAgainstJSONSchema(i,o,t),this.portalItem.url=this.url,this.portalItem.title||(this.portalItem.title=this.title),this._updateTypeKeywords(this.portalItem,t,0),await this.portalItem.update({data:i}),await Object(_webdoc_support_saveUtils_js__WEBPACK_IMPORTED_MODULE_22__["saveResources"])(this.resourceReferences,o,null),Object(_core_accessorSupport_originUtils_js__WEBPACK_IMPORTED_MODULE_13__["updateOrigins"])(o),this.portalItem}async _validateAgainstJSONSchema(e,t,o){let i=t.messages.filter((e=>"error"===e.type)).map((e=>new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__["default"](e.name,e.message,e.details)));if(o&&o.validationOptions.ignoreUnsupported&&(i=i.filter((e=>"layer:unsupported"!==e.name&&"symbol:unsupported"!==e.name&&"symbol-layer:unsupported"!==e.name&&"property:unsupported"!==e.name&&"url:unsupported"!==e.name&&"scenemodification:unsupported"!==e.name))),o.validationOptions.enabled||U){const t=(await __webpack_require__.e(/*! import() */ 77).then(__webpack_require__.bind(null, /*! ../support/schemaValidator.js */ "./node_modules/@arcgis/core/layers/support/schemaValidator.js"))).validate(e,o.portalItemLayerType);if(t.length>0){const e=`Layer item did not validate:\n${t.join("\n")}`;if(N.error(`_validateAgainstJSONSchema(): ${e}`),"throw"===o.validationOptions.failPolicy){const e=t.map((e=>new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__["default"]("sceneservice:schema-validation",e))).concat(i);throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__["default"]("sceneservice-validate:error","Failed to save layer item due to schema validation, see `details.errors`.",{combined:e})}}}if(i.length>0)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__["default"]("sceneservice:save","Failed to save SceneService due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:i})}};return Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])(_support_commonProperties_js__WEBPACK_IMPORTED_MODULE_18__["id"])],R.prototype,"id",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({type:_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_16__["default"]})],R.prototype,"spatialReference",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_10__["reader"])("spatialReference",["spatialReference","store.indexCRS","store.geographicCRS"])],R.prototype,"readSpatialReference",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({type:_geometry_Extent_js__WEBPACK_IMPORTED_MODULE_14__["default"]})],R.prototype,"fullExtent",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_10__["reader"])("fullExtent",["fullExtent","store.extent","spatialReference","store.indexCRS","store.geographicCRS"])],R.prototype,"readFullExtent",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({readOnly:!0,type:_geometry_HeightModelInfo_js__WEBPACK_IMPORTED_MODULE_15__["default"]})],R.prototype,"heightModelInfo",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({type:Number,json:{name:"layerDefinition.minScale",write:!0,origins:{service:{read:{source:"minScale"},write:!1}}}})],R.prototype,"minScale",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({type:Number,json:{name:"layerDefinition.maxScale",write:!0,origins:{service:{read:{source:"maxScale"},write:!1}}}})],R.prototype,"maxScale",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({readOnly:!0})],R.prototype,"version",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_10__["reader"])("version",["store.version"])],R.prototype,"readVersion",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({type:String,json:{read:{source:"copyrightText"}}})],R.prototype,"copyright",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({type:String,json:{read:!1}})],R.prototype,"sublayerTitleMode",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({type:String})],R.prototype,"title",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_10__["reader"])("portal-item","title")],R.prototype,"readTitlePortalItem",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_10__["reader"])("service","title",["name"])],R.prototype,"readTitleService",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({type:Number,json:{origins:{service:{read:{source:"id"}},"portal-item":{write:{target:"id",isRequired:!0,ignoreOrigin:!0},read:!1}}}})],R.prototype,"layerId",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])(_support_commonProperties_js__WEBPACK_IMPORTED_MODULE_18__["url"])],R.prototype,"url",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_writer_js__WEBPACK_IMPORTED_MODULE_12__["writer"])("url")],R.prototype,"writeUrl",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])()],R.prototype,"parsedUrl",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({readOnly:!0})],R.prototype,"store",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__["property"])({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],R.prototype,"rootNode",void 0),R=Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_11__["subclass"])("esri.layers.mixins.SceneService")],R),R},O=-1e38,U=!1,T="Scene Service",E={getTypeKeywords:()=>[],portalItemLayerType:"unknown",validationOptions:{enabled:!0,ignoreUnsupported:!1,failPolicy:"throw"}};


/***/ }),

/***/ "./node_modules/@arcgis/core/layers/support/I3SIndexInfo.js":
/*!******************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/support/I3SIndexInfo.js ***!
  \******************************************************************/
/*! exports provided: fetchIndexInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchIndexInfo", function() { return n; });
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request.js */ "./node_modules/@arcgis/core/request.js");
/* harmony import */ var _core_Error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Error.js */ "./node_modules/@arcgis/core/core/Error.js");
/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/maybe.js */ "./node_modules/@arcgis/core/core/maybe.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
async function n(n,t,s,a,i,d){let l=null;if(Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["isSome"])(s)){const o=`${n}/nodepages/`,t=o+Math.floor(s.rootIndex/s.nodesPerPage);try{return{type:"page",rootPage:(await Object(_request_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t,{query:{f:"json",token:a},responseType:"json",signal:d})).data,rootIndex:s.rootIndex,pageSize:s.nodesPerPage,lodMetric:s.lodSelectionMetricType,urlPrefix:o}}catch(f){Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["isSome"])(i)&&i.warn("#fetchIndexInfo()","Failed to load root node page. Falling back to node documents.",t,f),l=f}}if(!t)return null;const p=`${n}/nodes/`,c=p+(t&&t.split("/").pop());try{return{type:"node",rootNode:(await Object(_request_js__WEBPACK_IMPORTED_MODULE_0__["default"])(c,{query:{f:"json",token:a},responseType:"json",signal:d})).data,urlPrefix:p}}catch(f){throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("sceneservice:root-node-missing","Root node missing.",{pageError:l,nodeError:f,url:c})}}


/***/ }),

/***/ "./node_modules/@arcgis/core/portal/support/resourceUtils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@arcgis/core/portal/support/resourceUtils.js ***!
  \*******************************************************************/
/*! exports provided: addOrUpdateResource, contentToBlob, fetchResources, getSiblingOfSameType, getSiblingOfSameTypeI, removeAllResources, removeResource, splitPrefixFileNameAndExtension */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOrUpdateResource", function() { return u; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contentToBlob", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchResources", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSiblingOfSameType", function() { return f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSiblingOfSameTypeI", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAllResources", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeResource", function() { return i; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitPrefixFileNameAndExtension", function() { return d; });
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request.js */ "./node_modules/@arcgis/core/request.js");
/* harmony import */ var _core_Error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Error.js */ "./node_modules/@arcgis/core/core/Error.js");
/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/maybe.js */ "./node_modules/@arcgis/core/core/maybe.js");
/* harmony import */ var _core_urlUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/urlUtils.js */ "./node_modules/@arcgis/core/core/urlUtils.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
async function c(e,t={},a){await e.load(a);const o=Object(_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_3__["join"])(e.itemUrl,"resources"),{start:n=1,num:c=10,sortOrder:u="asc",sortField:i="created"}=t,l={query:{start:n,num:c,sortOrder:u,sortField:i,token:e.apiKey},signal:Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["get"])(a,"signal")},p=await e.portal._request(o,l);return{total:p.total,nextStart:p.nextStart,resources:p.resources.map((({created:t,size:r,resource:a})=>({created:new Date(t),size:r,resource:e.resourceFromPath(a)})))}}async function u(e,o,n,c){if(!e.hasPath())throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"](`portal-item-resource-${o}:invalid-path`,"Resource does not have a valid path");const u=e.portalItem;await u.load(c);const i=Object(_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_3__["join"])(u.userItemUrl,"add"===o?"addResources":"updateResources"),[l,d]=p(e.path),m=await h(n),f=new FormData;return l&&"."!==l&&f.append("resourcesPrefix",l),f.append("fileName",d),f.append("file",m,d),f.append("f","json"),Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["isSome"])(c)&&c.access&&f.append("access",c.access),await u.portal._request(i,{method:"post",body:f,signal:Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["get"])(c,"signal")}),e}async function i(e,a,o){if(!a.hasPath())throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("portal-item-resources-remove:invalid-path","Resource does not have a valid path");await e.load(o);const n=Object(_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_3__["join"])(e.userItemUrl,"removeResources");await e.portal._request(n,{method:"post",query:{resource:a.path},signal:Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["get"])(o,"signal")}),a.portalItem=null}async function l(e,t){await e.load(t);const a=Object(_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_3__["join"])(e.userItemUrl,"removeResources");return e.portal._request(a,{method:"post",query:{deleteAll:!0},signal:Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["get"])(t,"signal")})}function p(e){const t=e.lastIndexOf("/");return-1===t?[".",e]:[e.slice(0,t),e.slice(t+1)]}function d(e){const[t,r]=m(e),[a,o]=p(t);return[a,o,r]}function m(e){const t=Object(_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_3__["getPathExtension"])(e);return Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["isNone"])(t)?[e,""]:[e.slice(0,e.length-t.length-1),`.${t}`]}async function h(t){if(t instanceof Blob)return t;return(await Object(_request_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t.url,{responseType:"blob"})).data}function f(e,t){if(!e.hasPath())return null;const[r,,a]=d(e.path);return e.portalItem.resourceFromPath(Object(_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_3__["join"])(r,t+a))}function w(e,t){if(!e.hasPath())return null;const[r,,a]=d(e.path);return e.portalItem.resourceFromPath(Object(_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_3__["join"])(r,t+a))}


/***/ }),

/***/ "./node_modules/@arcgis/core/webdoc/support/saveUtils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@arcgis/core/webdoc/support/saveUtils.js ***!
  \***************************************************************/
/*! exports provided: saveResources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveResources", function() { return a; });
/* harmony import */ var _core_asyncUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/asyncUtils.js */ "./node_modules/@arcgis/core/core/asyncUtils.js");
/* harmony import */ var _core_Error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Error.js */ "./node_modules/@arcgis/core/core/Error.js");
/* harmony import */ var _core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/promiseUtils.js */ "./node_modules/@arcgis/core/core/promiseUtils.js");
/* harmony import */ var _core_uuid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/uuid.js */ "./node_modules/@arcgis/core/core/uuid.js");
/* harmony import */ var _portal_support_resourceUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../portal/support/resourceUtils.js */ "./node_modules/@arcgis/core/portal/support/resourceUtils.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
async function a(r,a,u){if(!a||!a.resources)return;const h=a.portalItem===r.portalItem?new Set(r.paths):new Set;r.paths.length=0,r.portalItem=a.portalItem;const i=new Set(a.resources.toKeep.map((r=>r.resource.path))),f=new Set,m=[];i.forEach((e=>{h.delete(e),r.paths.push(e)}));for(const e of a.resources.toUpdate)if(h.delete(e.resource.path),i.has(e.resource.path)||f.has(e.resource.path)){const{resource:o,content:t,finish:a,error:p}=e,h=Object(_portal_support_resourceUtils_js__WEBPACK_IMPORTED_MODULE_4__["getSiblingOfSameTypeI"])(o,Object(_core_uuid_js__WEBPACK_IMPORTED_MODULE_3__["generateUUID"])());r.paths.push(h.path),m.push(n({resource:h,content:t,finish:a,error:p},u))}else r.paths.push(e.resource.path),m.push(p(e,u)),f.add(e.resource.path);for(const e of a.resources.toAdd)m.push(n(e,u)),r.paths.push(e.resource.path);if(h.forEach((r=>{const e=a.portalItem.resourceFromPath(r);m.push(e.portalItem.removeResource(e).catch((()=>{})))})),0===m.length)return;const l=await Object(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__["eachAlways"])(m);Object(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_2__["throwIfAborted"])(u);const d=l.filter((r=>"error"in r)).map((r=>r.error));if(d.length>0)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("save:resources","Failed to save one or more resources",{errors:d})}async function n(e,o){const t=await Object(_core_asyncUtils_js__WEBPACK_IMPORTED_MODULE_0__["result"])(e.resource.portalItem.addResource(e.resource,e.content,o));if(!0!==t.ok)throw e.error&&e.error(t.error),t.error;e.finish&&e.finish(e.resource)}async function p(e,o){const t=await Object(_core_asyncUtils_js__WEBPACK_IMPORTED_MODULE_0__["result"])(e.resource.update(e.content,o));if(!0!==t.ok)throw e.error(t.error),t.error;e.finish(e.resource)}


/***/ })

}]);
//# sourceMappingURL=26.ArcGIS.js.map