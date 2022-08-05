(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[108],{

/***/ "./node_modules/@arcgis/core/layers/GraphicsLayer.js":
/*!***********************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/GraphicsLayer.js ***!
  \***********************************************************/
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
/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Layer.js */ "./node_modules/@arcgis/core/layers/Layer.js");
/* harmony import */ var _mixins_BlendLayer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mixins/BlendLayer.js */ "./node_modules/@arcgis/core/layers/mixins/BlendLayer.js");
/* harmony import */ var _mixins_ScaleRangeLayer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mixins/ScaleRangeLayer.js */ "./node_modules/@arcgis/core/layers/mixins/ScaleRangeLayer.js");
/* harmony import */ var _support_GraphicsCollection_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../support/GraphicsCollection.js */ "./node_modules/@arcgis/core/support/GraphicsCollection.js");
/* harmony import */ var _symbols_support_ElevationInfo_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../symbols/support/ElevationInfo.js */ "./node_modules/@arcgis/core/symbols/support/ElevationInfo.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
let n=class extends(Object(_mixins_BlendLayer_js__WEBPACK_IMPORTED_MODULE_7__["BlendLayer"])(Object(_mixins_ScaleRangeLayer_js__WEBPACK_IMPORTED_MODULE_8__["ScaleRangeLayer"])(_Layer_js__WEBPACK_IMPORTED_MODULE_6__["default"]))){constructor(r){super(r),this.elevationInfo=null,this.graphics=new _support_GraphicsCollection_js__WEBPACK_IMPORTED_MODULE_9__["default"],this.screenSizePerspectiveEnabled=!0,this.type="graphics",this.internal=!1}destroy(){this.removeAll(),this.graphics.destroy()}add(r){return this.graphics.add(r),this}addMany(r){return this.graphics.addMany(r),this}removeAll(){return this.graphics.removeAll(),this}remove(r){this.graphics.remove(r)}removeMany(r){this.graphics.removeMany(r)}on(r,e){return super.on(r,e)}graphicChanged(r){this.emit("graphic-update",r)}};Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__["property"])({type:_symbols_support_ElevationInfo_js__WEBPACK_IMPORTED_MODULE_10__["default"]})],n.prototype,"elevationInfo",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__["property"])(Object(_support_GraphicsCollection_js__WEBPACK_IMPORTED_MODULE_9__["graphicsCollectionProperty"])())],n.prototype,"graphics",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__["property"])({type:["show","hide"]})],n.prototype,"listMode",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__["property"])()],n.prototype,"screenSizePerspectiveEnabled",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__["property"])({readOnly:!0})],n.prototype,"type",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__["property"])({constructOnly:!0})],n.prototype,"internal",void 0),n=Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_5__["subclass"])("esri.layers.GraphicsLayer")],n);var h=n;/* harmony default export */ __webpack_exports__["default"] = (h);


/***/ }),

/***/ "./node_modules/@arcgis/core/layers/MapNotesLayer.js":
/*!***********************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/MapNotesLayer.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chunks/tslib.es6.js */ "./node_modules/@arcgis/core/chunks/tslib.es6.js");
/* harmony import */ var _geometry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry.js */ "./node_modules/@arcgis/core/geometry.js");
/* harmony import */ var _Graphic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Graphic.js */ "./node_modules/@arcgis/core/Graphic.js");
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../symbols.js */ "./node_modules/@arcgis/core/symbols.js");
/* harmony import */ var _core_Collection_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/Collection.js */ "./node_modules/@arcgis/core/core/Collection.js");
/* harmony import */ var _core_Error_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/Error.js */ "./node_modules/@arcgis/core/core/Error.js");
/* harmony import */ var _core_lang_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/lang.js */ "./node_modules/@arcgis/core/core/lang.js");
/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/maybe.js */ "./node_modules/@arcgis/core/core/maybe.js");
/* harmony import */ var _core_MultiOriginJSONSupport_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/MultiOriginJSONSupport.js */ "./node_modules/@arcgis/core/core/MultiOriginJSONSupport.js");
/* harmony import */ var _core_object_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/object.js */ "./node_modules/@arcgis/core/core/object.js");
/* harmony import */ var _core_Warning_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/Warning.js */ "./node_modules/@arcgis/core/core/Warning.js");
/* harmony import */ var _core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/accessorSupport/decorators/property.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js");
/* harmony import */ var _core_accessorSupport_ensureType_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/accessorSupport/ensureType.js */ "./node_modules/@arcgis/core/core/accessorSupport/ensureType.js");
/* harmony import */ var _core_has_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../core/has.js */ "./node_modules/@arcgis/core/core/has.js");
/* harmony import */ var _core_Logger_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/Logger.js */ "./node_modules/@arcgis/core/core/Logger.js");
/* harmony import */ var _core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../core/accessorSupport/decorators/reader.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/reader.js");
/* harmony import */ var _core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../core/accessorSupport/decorators/subclass.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js");
/* harmony import */ var _core_accessorSupport_decorators_writer_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../core/accessorSupport/decorators/writer.js */ "./node_modules/@arcgis/core/core/accessorSupport/decorators/writer.js");
/* harmony import */ var _geometry_projection_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../geometry/projection.js */ "./node_modules/@arcgis/core/geometry/projection.js");
/* harmony import */ var _geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../geometry/support/normalizeUtils.js */ "./node_modules/@arcgis/core/geometry/support/normalizeUtils.js");
/* harmony import */ var _geometry_support_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../geometry/support/spatialReferenceUtils.js */ "./node_modules/@arcgis/core/geometry/support/spatialReferenceUtils.js");
/* harmony import */ var _FeatureLayer_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./FeatureLayer.js */ "./node_modules/@arcgis/core/layers/FeatureLayer.js");
/* harmony import */ var _GraphicsLayer_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./GraphicsLayer.js */ "./node_modules/@arcgis/core/layers/GraphicsLayer.js");
/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Layer.js */ "./node_modules/@arcgis/core/layers/Layer.js");
/* harmony import */ var _graphics_objectIdUtils_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./graphics/objectIdUtils.js */ "./node_modules/@arcgis/core/layers/graphics/objectIdUtils.js");
/* harmony import */ var _mixins_BlendLayer_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./mixins/BlendLayer.js */ "./node_modules/@arcgis/core/layers/mixins/BlendLayer.js");
/* harmony import */ var _mixins_OperationalLayer_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./mixins/OperationalLayer.js */ "./node_modules/@arcgis/core/layers/mixins/OperationalLayer.js");
/* harmony import */ var _mixins_PortalLayer_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./mixins/PortalLayer.js */ "./node_modules/@arcgis/core/layers/mixins/PortalLayer.js");
/* harmony import */ var _mixins_ScaleRangeLayer_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./mixins/ScaleRangeLayer.js */ "./node_modules/@arcgis/core/layers/mixins/ScaleRangeLayer.js");
/* harmony import */ var _support_Field_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./support/Field.js */ "./node_modules/@arcgis/core/layers/support/Field.js");
/* harmony import */ var _symbols_SimpleFillSymbol_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../symbols/SimpleFillSymbol.js */ "./node_modules/@arcgis/core/symbols/SimpleFillSymbol.js");
/* harmony import */ var _symbols_SimpleLineSymbol_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../symbols/SimpleLineSymbol.js */ "./node_modules/@arcgis/core/symbols/SimpleLineSymbol.js");
/* harmony import */ var _symbols_SimpleMarkerSymbol_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../symbols/SimpleMarkerSymbol.js */ "./node_modules/@arcgis/core/symbols/SimpleMarkerSymbol.js");
/* harmony import */ var _symbols_TextSymbol_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../symbols/TextSymbol.js */ "./node_modules/@arcgis/core/symbols/TextSymbol.js");
/* harmony import */ var _geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../geometry/SpatialReference.js */ "./node_modules/@arcgis/core/geometry/SpatialReference.js");
/* harmony import */ var _geometry_Extent_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../geometry/Extent.js */ "./node_modules/@arcgis/core/geometry/Extent.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
function F(e){return e.layers.some((e=>null!=e.layerDefinition.visibilityField))}const G=new _support_Field_js__WEBPACK_IMPORTED_MODULE_29__["default"]({name:"OBJECTID",alias:"OBJECTID",type:"oid",nullable:!1,editable:!1}),_=new _support_Field_js__WEBPACK_IMPORTED_MODULE_29__["default"]({name:"title",alias:"Title",type:"string",nullable:!0,editable:!0});let P=class extends _GraphicsLayer_js__WEBPACK_IMPORTED_MODULE_22__["default"]{constructor(){super(...arguments),this.visibilityMode="inherited"}initialize(){for(const e of this.graphics)e.sourceLayer=this.layer;this.graphics.on("after-add",(e=>{e.item.sourceLayer=this.layer})),this.graphics.on("after-remove",(e=>{e.item.sourceLayer=null}))}get sublayers(){return this.graphics}};Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0})],P.prototype,"sublayers",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])()],P.prototype,"layer",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0})],P.prototype,"visibilityMode",void 0),P=Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_16__["subclass"])("esri.layers.MapNotesLayer.MapNotesSublayer")],P);const k=[{geometryType:"polygon",geometryTypeJSON:"esriGeometryPolygon",layerId:"polygonLayer",title:"Polygons",identifyingSymbol:(new _symbols_SimpleFillSymbol_js__WEBPACK_IMPORTED_MODULE_30__["default"]).toJSON()},{geometryType:"polyline",geometryTypeJSON:"esriGeometryPolyline",layerId:"polylineLayer",title:"Polylines",identifyingSymbol:(new _symbols_SimpleLineSymbol_js__WEBPACK_IMPORTED_MODULE_31__["default"]).toJSON()},{geometryType:"multipoint",geometryTypeJSON:"esriGeometryMultipoint",layerId:"multipointLayer",title:"Multipoints",identifyingSymbol:(new _symbols_SimpleMarkerSymbol_js__WEBPACK_IMPORTED_MODULE_32__["default"]).toJSON()},{geometryType:"point",geometryTypeJSON:"esriGeometryPoint",layerId:"pointLayer",title:"Points",identifyingSymbol:(new _symbols_SimpleMarkerSymbol_js__WEBPACK_IMPORTED_MODULE_32__["default"]).toJSON()},{geometryType:"point",geometryTypeJSON:"esriGeometryPoint",layerId:"textLayer",title:"Text",identifyingSymbol:(new _symbols_TextSymbol_js__WEBPACK_IMPORTED_MODULE_33__["default"]).toJSON()}];let z=class extends(Object(_mixins_BlendLayer_js__WEBPACK_IMPORTED_MODULE_25__["BlendLayer"])(Object(_mixins_ScaleRangeLayer_js__WEBPACK_IMPORTED_MODULE_28__["ScaleRangeLayer"])(Object(_mixins_OperationalLayer_js__WEBPACK_IMPORTED_MODULE_26__["OperationalLayer"])(Object(_mixins_PortalLayer_js__WEBPACK_IMPORTED_MODULE_27__["PortalLayer"])(Object(_core_MultiOriginJSONSupport_js__WEBPACK_IMPORTED_MODULE_8__["MultiOriginJSONMixin"])(_Layer_js__WEBPACK_IMPORTED_MODULE_23__["default"])))))){constructor(e){super(e),this.capabilities={operations:{supportsMapNotesEditing:!0}},this.featureCollections=null,this.featureCollectionJSON=null,this.featureCollectionType="notes",this.legendEnabled=!1,this.minScale=0,this.maxScale=0,this.spatialReference=_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_34__["default"].WGS84,this.sublayers=new _core_Collection_js__WEBPACK_IMPORTED_MODULE_4__["default"](k.map((e=>new P({id:e.layerId,title:e.title,layer:this})))),this.title="Map Notes",this.type="map-notes",this.visibilityMode="inherited"}readCapabilities(e,t,r){return{operations:{supportsMapNotesEditing:!F(t)&&"portal-item"!==(null==r?void 0:r.origin)}}}readFeatureCollections(e,t,o){if(!F(t))return null;const i=t.layers.map((e=>{const t=new _FeatureLayer_js__WEBPACK_IMPORTED_MODULE_21__["default"];return t.read(e,o),t}));return new _core_Collection_js__WEBPACK_IMPORTED_MODULE_4__["default"]({items:i})}readLegacyfeatureCollectionJSON(e,t){return F(t)?Object(_core_lang_js__WEBPACK_IMPORTED_MODULE_6__["clone"])(t.featureCollection):null}readFullExtent(e,t){if(!t.layers.length)return new _geometry_Extent_js__WEBPACK_IMPORTED_MODULE_35__["default"]({xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_34__["default"].WGS84});const r=_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_34__["default"].fromJSON(t.layers[0].layerDefinition.spatialReference);return t.layers.reduce(((e,t)=>{const r=t.layerDefinition.extent;return r?_geometry_Extent_js__WEBPACK_IMPORTED_MODULE_35__["default"].fromJSON(r).union(e):e}),new _geometry_Extent_js__WEBPACK_IMPORTED_MODULE_35__["default"]({spatialReference:r}))}readMinScale(e,t){for(const r of t.layers)if(null!=r.layerDefinition.minScale)return r.layerDefinition.minScale;return 0}readMaxScale(e,t){for(const r of t.layers)if(null!=r.layerDefinition.maxScale)return r.layerDefinition.maxScale;return 0}get multipointLayer(){return this._findSublayer("multipointLayer")}get pointLayer(){return this._findSublayer("pointLayer")}get polygonLayer(){return this._findSublayer("polygonLayer")}get polylineLayer(){return this._findSublayer("polylineLayer")}readSpatialReference(e,t){return t.layers.length?_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_34__["default"].fromJSON(t.layers[0].layerDefinition.spatialReference):_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_34__["default"].WGS84}readSublayers(e,o,i){if(F(o))return null;const l=[];for(let r=0;r<o.layers.length;r++){var a;const{layerDefinition:e,featureSet:i}=o.layers[r],n=null!=(a=e.geometryType)?a:i.geometryType,s=k.find((t=>{var r,o,i;return n===t.geometryTypeJSON&&(null==(r=e.drawingInfo)||null==(o=r.renderer)||null==(i=o.symbol)?void 0:i.type)===t.identifyingSymbol.type}));if(s){const r=new P({id:s.layerId,title:e.name,layer:this,graphics:i.features.map((({geometry:e,symbol:r,attributes:o,popupInfo:i})=>_Graphic_js__WEBPACK_IMPORTED_MODULE_2__["default"].fromJSON({attributes:o,geometry:e,symbol:r,popupTemplate:i})))});l.push(r)}}return new _core_Collection_js__WEBPACK_IMPORTED_MODULE_4__["default"](l)}writeSublayers(e,t,r,i){const{minScale:n,maxScale:p}=this;if(Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isNone"])(e))return;const y=e.some((e=>e.graphics.length>0));if(!this.capabilities.operations.supportsMapNotesEditing){var m;if(y)null==i||null==(m=i.messages)||m.push(new _core_Error_js__WEBPACK_IMPORTED_MODULE_5__["default"]("map-notes-layer:editing-not-supported","New map notes cannot be added to this layer"));return}const u=[];let c=this.spatialReference.toJSON();e:for(const o of e)for(const e of o.graphics)if(Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isSome"])(e.geometry)){c=e.geometry.spatialReference.toJSON();break e}for(const o of k){const t=e.find((e=>o.layerId===e.id));this._writeMapNoteSublayer(u,t,o,n,p,c,i)}Object(_core_object_js__WEBPACK_IMPORTED_MODULE_9__["setDeepValue"])("featureCollection.layers",u,t)}get textLayer(){return this._findSublayer("textLayer")}load(e){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Feature Collection"]},e)),Promise.resolve(this)}read(e,t){"featureCollection"in e&&(e=Object(_core_lang_js__WEBPACK_IMPORTED_MODULE_6__["clone"])(e),Object.assign(e,e.featureCollection)),super.read(e,t)}async beforeSave(){if(Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isNone"])(this.sublayers))return;let e=null;const t=[];for(const o of this.sublayers)for(const r of o.graphics)if(Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isSome"])(r.geometry)){const o=r.geometry;e?Object(_geometry_support_spatialReferenceUtils_js__WEBPACK_IMPORTED_MODULE_20__["equals"])(o.spatialReference,e)||(Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_18__["canProjectWithoutEngine"])(o.spatialReference,e)||Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_18__["isLoaded"])()||await Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_18__["load"])(),r.geometry=Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_18__["project"])(o,e)):e=o.spatialReference,t.push(r)}const r=await Object(_geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_19__["normalizeCentralMeridian"])(t.map((e=>e.geometry)));t.forEach(((e,t)=>e.geometry=r[t]))}_findSublayer(e){var t,r;return Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isNone"])(this.sublayers)?null:null!=(t=null==(r=this.sublayers)?void 0:r.find((t=>t.id===e)))?t:null}_writeMapNoteSublayer(e,t,r,o,a,n,s){const p=[];if(!Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isNone"])(t)){for(const e of t.graphics)this._writeMapNote(p,e,r.geometryType,s);this._normalizeObjectIds(p,G),e.push({layerDefinition:{name:t.title,drawingInfo:{renderer:{type:"simple",symbol:Object(_core_lang_js__WEBPACK_IMPORTED_MODULE_6__["clone"])(r.identifyingSymbol)}},geometryType:r.geometryTypeJSON,minScale:o,maxScale:a,objectIdField:"OBJECTID",fields:[G.toJSON(),_.toJSON()],spatialReference:n},featureSet:{features:p,geometryType:r.geometryTypeJSON}})}}_writeMapNote(e,t,r,o){if(Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isNone"])(t))return;const{geometry:i,symbol:n,popupTemplate:s}=t;if(Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isNone"])(i))return;var y,m;if(i.type!==r)return void(null==o||null==(y=o.messages)||y.push(new _core_Warning_js__WEBPACK_IMPORTED_MODULE_10__["default"]("map-notes-layer:invalid-geometry-type",`Geometry "${i.type}" cannot be saved in "${r}" layer`,{graphic:t})));if(Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isNone"])(n))return void(null==o||null==(m=o.messages)||m.push(new _core_Warning_js__WEBPACK_IMPORTED_MODULE_10__["default"]("map-notes-layer:no-symbol","Skipping map notes with no symbol",{graphic:t})));const u={attributes:{...t.attributes},geometry:i.toJSON(),symbol:n.toJSON()};Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_7__["isSome"])(s)&&(u.popupInfo=s.toJSON()),e.push(u)}_normalizeObjectIds(e,t){const r=t.name;let o=Object(_graphics_objectIdUtils_js__WEBPACK_IMPORTED_MODULE_24__["findLastObjectIdFromFeatures"])(r,e)+1;const i=new Set;for(const l of e){l.attributes||(l.attributes={});const{attributes:e}=l;(null==e[r]||i.has(e[r]))&&(e[r]=o++),i.add(e[r])}}};Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0})],z.prototype,"capabilities",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_15__["reader"])(["portal-item","web-map"],"capabilities",["layers"])],z.prototype,"readCapabilities",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0})],z.prototype,"featureCollections",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_15__["reader"])(["web-map","portal-item"],"featureCollections",["layers"])],z.prototype,"readFeatureCollections",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0,json:{origins:{"web-map":{write:{enabled:!0,target:"featureCollection"}}}}})],z.prototype,"featureCollectionJSON",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_15__["reader"])(["web-map","portal-item"],"featureCollectionJSON",["featureCollection"])],z.prototype,"readLegacyfeatureCollectionJSON",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0,json:{read:!1,write:{enabled:!0,ignoreOrigin:!0}}})],z.prototype,"featureCollectionType",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({json:{write:!1}})],z.prototype,"fullExtent",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_15__["reader"])(["web-map","portal-item"],"fullExtent",["layers"])],z.prototype,"readFullExtent",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0,json:{origins:{"web-map":{write:{target:"featureCollection.showLegend",overridePolicy(){return{enabled:null!=this.featureCollectionJSON}}}}}}})],z.prototype,"legendEnabled",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({type:["show","hide"]})],z.prototype,"listMode",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({type:Number,nonNullable:!0,json:{write:!1}})],z.prototype,"minScale",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_15__["reader"])(["web-map","portal-item"],"minScale",["layers"])],z.prototype,"readMinScale",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({type:Number,nonNullable:!0,json:{write:!1}})],z.prototype,"maxScale",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_15__["reader"])(["web-map","portal-item"],"maxScale",["layers"])],z.prototype,"readMaxScale",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0})],z.prototype,"multipointLayer",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({value:"ArcGISFeatureLayer",type:["ArcGISFeatureLayer"]})],z.prototype,"operationalLayerType",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0})],z.prototype,"pointLayer",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0})],z.prototype,"polygonLayer",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0})],z.prototype,"polylineLayer",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({type:_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_34__["default"]})],z.prototype,"spatialReference",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_15__["reader"])(["web-map","portal-item"],"spatialReference",["layers"])],z.prototype,"readSpatialReference",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0,json:{origins:{"web-map":{write:{ignoreOrigin:!0}}}}})],z.prototype,"sublayers",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_15__["reader"])("web-map","sublayers",["layers"])],z.prototype,"readSublayers",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_writer_js__WEBPACK_IMPORTED_MODULE_17__["writer"])("web-map","sublayers")],z.prototype,"writeSublayers",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0})],z.prototype,"textLayer",null),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])()],z.prototype,"title",void 0),Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_11__["property"])({readOnly:!0,json:{read:!1}})],z.prototype,"type",void 0),z=Object(_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__["_"])([Object(_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_16__["subclass"])("esri.layers.MapNotesLayer")],z);var B=z;/* harmony default export */ __webpack_exports__["default"] = (B);


/***/ }),

/***/ "./node_modules/@arcgis/core/layers/graphics/objectIdUtils.js":
/*!********************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/graphics/objectIdUtils.js ***!
  \********************************************************************/
/*! exports provided: findLastObjectIdFromFeatures, initialObjectId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findLastObjectIdFromFeatures", function() { return n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialObjectId", function() { return t; });
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const t=1;function n(t,n){let o=0;for(const r of n){var e;const n=null==(e=r.attributes)?void 0:e[t];"number"==typeof n&&isFinite(n)&&(o=Math.max(o,n))}return o}


/***/ })

}]);
//# sourceMappingURL=108.ArcGIS.js.map