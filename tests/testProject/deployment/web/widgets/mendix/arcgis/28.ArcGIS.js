(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./node_modules/@arcgis/core/layers/support/ElevationQuery.js":
/*!********************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/support/ElevationQuery.js ***!
  \********************************************************************/
/*! exports provided: default, ElevationQuery, GeometryDescriptor, getFinestLodIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElevationQuery", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeometryDescriptor", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFinestLodIndex", function() { return _; });
/* harmony import */ var _core_asyncUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/asyncUtils.js */ "./node_modules/@arcgis/core/core/asyncUtils.js");
/* harmony import */ var _core_Error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Error.js */ "./node_modules/@arcgis/core/core/Error.js");
/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/maybe.js */ "./node_modules/@arcgis/core/core/maybe.js");
/* harmony import */ var _core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/promiseUtils.js */ "./node_modules/@arcgis/core/core/promiseUtils.js");
/* harmony import */ var _core_unitUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/unitUtils.js */ "./node_modules/@arcgis/core/core/unitUtils.js");
/* harmony import */ var _geometry_Multipoint_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../geometry/Multipoint.js */ "./node_modules/@arcgis/core/geometry/Multipoint.js");
/* harmony import */ var _geometry_Point_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../geometry/Point.js */ "./node_modules/@arcgis/core/geometry/Point.js");
/* harmony import */ var _geometry_Polyline_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../geometry/Polyline.js */ "./node_modules/@arcgis/core/geometry/Polyline.js");
/* harmony import */ var _geometry_projection_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../geometry/projection.js */ "./node_modules/@arcgis/core/geometry/projection.js");
/* harmony import */ var _geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../geometry/support/aaBoundingRect.js */ "./node_modules/@arcgis/core/geometry/support/aaBoundingRect.js");
/* harmony import */ var _ElevationSampler_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ElevationSampler.js */ "./node_modules/@arcgis/core/layers/support/ElevationSampler.js");
/* harmony import */ var _ElevationTile_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ElevationTile.js */ "./node_modules/@arcgis/core/layers/support/ElevationTile.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
class T{async queryAll(e,i,o){if(!(e=o&&o.ignoreInvisibleLayers?e.filter((e=>e.visible)):e.slice()).length)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:invalid-layer","Elevation queries require at least one elevation layer to fetch tiles from");const s=v.fromGeometry(i);let l=!1;o&&o.returnSampleInfo||(l=!0);const n={...E,...o,returnSampleInfo:!0},a=await this.query(e[e.length-1],s,n),r=await this._queryAllContinue(e,a,n);return r.geometry=r.geometry.export(),l&&delete r.sampleInfo,r}async query(e,i,o){if(!e)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:invalid-layer","Elevation queries require an elevation layer to fetch tiles from");if(!i||!(i instanceof v)&&"point"!==i.type&&"multipoint"!==i.type&&"polyline"!==i.type)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:invalid-geometry","Only point, polyline and multipoint geometries can be used to query elevation");const s={...E,...o},l=new g(e,i.spatialReference,s),n=s.signal;return await e.load({signal:n}),await this._createGeometryDescriptor(l,i,n),await this._selectTiles(l,n),await this._populateElevationTiles(l,n),this._sampleGeometryWithElevation(l),this._createQueryResult(l,n)}async createSampler(e,i,o){if(!e)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:invalid-layer","Elevation queries require an elevation layer to fetch tiles from");if(!i||"extent"!==i.type)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:invalid-extent","Invalid or undefined extent");const s={...E,...o};return this._createSampler(e,i,s)}async createSamplerAll(e,i,o){if(!(e=o&&o.ignoreInvisibleLayers?e.filter((e=>e.visible)):e.slice()).length)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:invalid-layer","Elevation queries require at least one elevation layer to fetch tiles from");if(!i||"extent"!==i.type)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:invalid-extent","Invalid or undefined extent");const s={...E,...o,returnSampleInfo:!0},l=await this._createSampler(e[e.length-1],i,s);return this._createSamplerAllContinue(e,i,l,s)}async _createSampler(e,t,i,o){const s=i.signal;await e.load({signal:s});const l=t.spatialReference,n=e.tileInfo.spatialReference;l.equals(n)||(await Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_8__["initializeProjection"])([{source:l,dest:n}],{signal:s}),t=Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_8__["project"])(t,n));const a=new w(e,t,i,o);return await this._selectTiles(a,s),await this._populateElevationTiles(a,s),new _ElevationSampler_js__WEBPACK_IMPORTED_MODULE_10__["MultiTileElevationSampler"](a.elevationTiles,a.layer.tileInfo,a.options.noDataValue)}async _createSamplerAllContinue(e,t,i,o){if(e.pop(),!e.length)return i;const s=i.samplers.map((e=>Object(_geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_9__["fromExtent"])(e.extent))),l=await this._createSampler(e[e.length-1],t,o,s);if(0===l.samplers.length)return i;const n=i.samplers.concat(l.samplers),a=new _ElevationSampler_js__WEBPACK_IMPORTED_MODULE_10__["MultiTileElevationSampler"](n,o.noDataValue);return this._createSamplerAllContinue(e,t,a,o)}async _queryAllContinue(e,t,i){const o=e.pop(),s=t.geometry.coordinates,l=[],n=[];for(let c=0;c<s.length;c++){const i=t.sampleInfo[c];i.demResolution>=0?i.source||(i.source=o):e.length&&(l.push(s[c]),n.push(c))}if(!e.length||0===l.length)return t;const a=t.geometry.clone(l),r=await this.query(e[e.length-1],a,i);return n.forEach(((e,i)=>{s[e].z=r.geometry.coordinates[i].z,t.sampleInfo[e].demResolution=r.sampleInfo[i].demResolution})),this._queryAllContinue(e,t,i)}async _createQueryResult(e,t){const i={geometry:(await e.geometry.project(e.outSpatialReference,t)).export(),noDataValue:e.options.noDataValue};return e.options.returnSampleInfo&&(i.sampleInfo=this._extractSampleInfo(e)),e.geometry.coordinates.forEach((e=>{e.tile=null,e.elevationTile=null})),i}async _createGeometryDescriptor(e,i,o){let s;const l=e.layer.tileInfo.spatialReference;if(i instanceof v?s=await i.project(l,o):(await Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_8__["initializeProjection"])([{source:i.spatialReference,dest:l}],{signal:o}),s=Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_8__["project"])(i,l)),!s)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:spatial-reference-mismatch",`Cannot query elevation in '${i.spatialReference.wkid}' on an elevation service in '${l.wkid}'`);e.geometry=v.fromGeometry(s)}async _selectTiles(e,i){const o=e.options.demResolution;if("geometry"===e.type&&this._preselectOutsideLayerExtent(e),"number"==typeof o)this._selectTilesClosestResolution(e);else if("finest-contiguous"===o)await this._selectTilesFinestContiguous(e,i);else{if("auto"!==o)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:invalid-dem-resolution",`Invalid dem resolution value '${o}', expected a number, "finest-contiguous" or "auto"`);await this._selectTilesAuto(e,i)}}_preselectOutsideLayerExtent(e){const t=new _ElevationTile_js__WEBPACK_IMPORTED_MODULE_11__["ElevationTile"](null);t.sample=()=>e.options.noDataValue,e.outsideExtentTile=t;const i=e.layer.fullExtent;e.geometry.coordinates.forEach((e=>{const o=e.x,s=e.y;(o<i.xmin||o>i.xmax||s<i.ymin||s>i.ymax)&&(e.elevationTile=t)}))}_selectTilesClosestResolution(e){const t=e.layer.tileInfo,i=this._findNearestDemResolutionLODIndex(t,e.options.demResolution);e.selectTilesAtLOD(i)}_findNearestDemResolutionLODIndex(e,t){const i=t/Object(_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_4__["getMetersPerUnitForSR"])(e.spatialReference);let o=e.lods[0],s=0;for(let l=1;l<e.lods.length;l++){const t=e.lods[l];Math.abs(t.resolution-i)<Math.abs(o.resolution-i)&&(o=t,s=l)}return s}async _selectTilesFinestContiguous(e,t){const i=_(e.layer.tileInfo,e.options.minDemResolution);await this._selectTilesFinestContiguousAt(e,i,t)}async _selectTilesFinestContiguousAt(e,i,l){const n=e.layer;if(e.selectTilesAtLOD(i),i<0)return;const a=n.tilemapCache,r=e.getTilesToFetch();try{if(a)await Object(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_3__["whenOrAbort"])(Promise.all(r.map((e=>a.fetchAvailability(e.level,e.row,e.col,{signal:l})))),l);else if(await this._populateElevationTiles(e,l),!e.allElevationTilesFetched())throw e.clearElevationTiles(),new _core_Error_js__WEBPACK_IMPORTED_MODULE_1__["default"]("elevation-query:has-unavailable-tiles")}catch(c){Object(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_3__["throwIfAbortError"])(c),await this._selectTilesFinestContiguousAt(e,i-1,l)}}async _populateElevationTiles(e,t){const s=e.getTilesToFetch(),n={},a=e.options.cache,r=e.options.noDataValue,c=s.map((async o=>{const s=`${e.layer.uid}:${o.id}:${r}`,l=Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["isSome"])(a)?a.get(s):null,c=Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["isSome"])(l)?l:await e.layer.fetchTile(o.level,o.row,o.col,{noDataValue:r,signal:t});Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__["isSome"])(a)&&a.put(s,c),n[o.id]=new _ElevationTile_js__WEBPACK_IMPORTED_MODULE_11__["ElevationTile"](o,c)}));await Object(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_3__["whenOrAbort"])(Object(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_3__["eachAlways"])(c),t),e.populateElevationTiles(n)}async _selectTilesAuto(t,i){this._selectTilesAutoFinest(t),this._reduceTilesForMaximumRequests(t);const l=t.layer.tilemapCache;if(!l)return this._selectTilesAutoPrefetchUpsample(t,i);const n=t.getTilesToFetch(),a={},r=n.map((async t=>{const o={id:null,level:0,row:0,col:0,extent:Object(_geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_9__["create"])()},n=await Object(_core_asyncUtils_js__WEBPACK_IMPORTED_MODULE_0__["result"])(l.fetchAvailabilityUpsample(t.level,t.row,t.col,o,{signal:i}));!1===n.ok?Object(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_3__["throwIfAbortError"])(n.error):a[t.id]=o}));await Object(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_3__["whenOrAbort"])(Promise.all(r),i),t.remapTiles(a)}_reduceTilesForMaximumRequests(e){const t=e.layer.tileInfo;let i=0;const o={},s=e=>{e.id in o?o[e.id]++:(o[e.id]=1,i++)},l=e=>{const t=o[e.id];1===t?(delete o[e.id],i--):o[e.id]=t-1};e.forEachTileToFetch(s,l);let n=!0;for(;n&&(n=!1,e.forEachTileToFetch((o=>{i<=e.options.maximumAutoTileRequests||(l(o),t.upsampleTile(o)&&(n=!0),s(o))}),l),n););}_selectTilesAutoFinest(e){const t=_(e.layer.tileInfo,e.options.minDemResolution);e.selectTilesAtLOD(t,e.options.maximumAutoTileRequests)}async _selectTilesAutoPrefetchUpsample(e,t){const i=e.layer.tileInfo;await this._populateElevationTiles(e,t);let o=!1;e.forEachTileToFetch(((e,t)=>{i.upsampleTile(e)?o=!0:t()})),o&&await this._selectTilesAutoPrefetchUpsample(e,t)}_sampleGeometryWithElevation(e){e.geometry.coordinates.forEach((t=>{const i=t.elevationTile;let o=e.options.noDataValue;if(i){const e=i.sample(t.x,t.y);void 0!==e?o=e:t.elevationTile=null}t.z=o}))}_extractSampleInfo(e){const t=e.layer.tileInfo,i=Object(_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_4__["getMetersPerUnitForSR"])(t.spatialReference);return e.geometry.coordinates.map((o=>{let s=-1;if(o.elevationTile&&o.elevationTile!==e.outsideExtentTile){s=t.lodAt(o.elevationTile.tile.level).resolution*i}return{demResolution:s}}))}}class v{export(){return this._exporter(this.coordinates,this.spatialReference)}clone(e){const t=new v;return t.geometry=this.geometry,t.spatialReference=this.spatialReference,t.coordinates=e||this.coordinates.map((e=>this._cloneCoordinate(e))),t._exporter=this._exporter,t}async project(e,t){if(this.spatialReference.equals(e))return this.clone();await Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_8__["initializeProjection"])([{source:this.spatialReference,dest:e}],{signal:t});const i=new _geometry_Multipoint_js__WEBPACK_IMPORTED_MODULE_5__["default"]({spatialReference:this.spatialReference,points:this.coordinates.map((e=>[e.x,e.y]))}),o=Object(_geometry_projection_js__WEBPACK_IMPORTED_MODULE_8__["project"])(i,e);if(!o)return null;const s=this.coordinates.map(((e,t)=>{const i=this._cloneCoordinate(e),s=o.points[t];return i.x=s[0],i.y=s[1],i})),l=this.clone(s);return l.spatialReference=e,l}_cloneCoordinate(e){return{x:e.x,y:e.y,z:e.z,m:e.m,tile:null,elevationTile:null}}static fromGeometry(e){const t=new v;if(t.geometry=e,t.spatialReference=e.spatialReference,e instanceof v)t.coordinates=e.coordinates.map((e=>t._cloneCoordinate(e))),t._exporter=(t,i)=>{const o=e.clone(t);return o.spatialReference=i,o};else switch(e.type){case"point":{const i=e,{hasZ:o,hasM:s}=i;t.coordinates=o&&s?[{x:i.x,y:i.y,z:i.z,m:i.m}]:o?[{x:i.x,y:i.y,z:i.z}]:s?[{x:i.x,y:i.y,m:i.m}]:[{x:i.x,y:i.y}],t._exporter=(t,i)=>e.hasM?new _geometry_Point_js__WEBPACK_IMPORTED_MODULE_6__["default"](t[0].x,t[0].y,t[0].z,t[0].m,i):new _geometry_Point_js__WEBPACK_IMPORTED_MODULE_6__["default"](t[0].x,t[0].y,t[0].z,i);break}case"multipoint":{const i=e,{hasZ:o,hasM:s}=i;t.coordinates=o&&s?i.points.map((e=>({x:e[0],y:e[1],z:e[2],m:e[3]}))):o?i.points.map((e=>({x:e[0],y:e[1],z:e[2]}))):s?i.points.map((e=>({x:e[0],y:e[1],m:e[2]}))):i.points.map((e=>({x:e[0],y:e[1]}))),t._exporter=(t,i)=>e.hasM?new _geometry_Multipoint_js__WEBPACK_IMPORTED_MODULE_5__["default"]({points:t.map((e=>[e.x,e.y,e.z,e.m])),hasZ:!0,hasM:!0,spatiaReference:i}):new _geometry_Multipoint_js__WEBPACK_IMPORTED_MODULE_5__["default"](t.map((e=>[e.x,e.y,e.z])),i);break}case"polyline":{const i=e,o=[],s=[],{hasZ:l,hasM:n}=e;let a=0;for(const e of i.paths)if(s.push([a,a+e.length]),a+=e.length,l&&n)for(const t of e)o.push({x:t[0],y:t[1],z:t[2],m:t[3]});else if(l)for(const t of e)o.push({x:t[0],y:t[1],z:t[2]});else if(n)for(const t of e)o.push({x:t[0],y:t[1],m:t[2]});else for(const t of e)o.push({x:t[0],y:t[1]});t.coordinates=o,t._exporter=(t,i)=>{const o=e.hasM?t.map((e=>[e.x,e.y,e.z,e.m])):t.map((e=>[e.x,e.y,e.z])),l=s.map((e=>o.slice(e[0],e[1])));return new _geometry_Polyline_js__WEBPACK_IMPORTED_MODULE_7__["default"]({paths:l,hasM:e.hasM,hasZ:!0,spatialReference:i})};break}}return t}}class x{constructor(e,t){this.layer=e,this.options=t}}class g extends x{constructor(e,t,i){super(e,i),this.outSpatialReference=t,this.type="geometry"}selectTilesAtLOD(e){if(e<0)this.geometry.coordinates.forEach((e=>e.tile=null));else{const t=this.layer.tileInfo,i=t.lods[e].level;this.geometry.coordinates.forEach((e=>{e.tile=t.tileAt(i,e.x,e.y)}))}}allElevationTilesFetched(){return!this.geometry.coordinates.some((e=>!e.elevationTile))}clearElevationTiles(){for(const e of this.geometry.coordinates)e.elevationTile!==this.outsideExtentTile&&(e.elevationTile=null)}populateElevationTiles(e){for(const t of this.geometry.coordinates)!t.elevationTile&&t.tile&&(t.elevationTile=e[t.tile.id])}remapTiles(e){for(const t of this.geometry.coordinates)t.tile=e[t.tile.id]}getTilesToFetch(){const e={},t=[];for(const i of this.geometry.coordinates){const o=i.tile;i.elevationTile||!i.tile||e[o.id]||(e[o.id]=o,t.push(o))}return t}forEachTileToFetch(e){for(const t of this.geometry.coordinates)t.tile&&!t.elevationTile&&e(t.tile,(()=>t.tile=null))}}class w extends x{constructor(e,t,i,o){super(e,i),this.type="extent",this.elevationTiles=[],this.candidateTiles=[],this.fetchedCandidates=new Set,this.extent=t.intersection(e.fullExtent),this.maskExtents=o}selectTilesAtLOD(e,t){const i=this._maximumLodForRequests(t),o=Math.min(i,e);o<0?this.candidateTiles.length=0:this._selectCandidateTilesCoveringExtentAt(o)}_maximumLodForRequests(e){const t=this.layer.tileInfo;if(!e)return t.lods.length-1;const i=this.extent;for(let o=t.lods.length-1;o>=0;o--){const s=t.lods[o],l=s.resolution*t.size[0],n=s.resolution*t.size[1];if(Math.ceil(i.width/l)*Math.ceil(i.height/n)<=e)return o}return-1}allElevationTilesFetched(){return this.candidateTiles.length===this.elevationTiles.length}clearElevationTiles(){this.elevationTiles.length=0,this.fetchedCandidates.clear()}populateElevationTiles(e){for(const t of this.candidateTiles){const i=e[t.id];i&&(this.fetchedCandidates.add(t),this.elevationTiles.push(i))}}remapTiles(e){this.candidateTiles=this._uniqueNonOverlappingTiles(this.candidateTiles.map((t=>e[t.id])))}getTilesToFetch(){return this.candidateTiles}forEachTileToFetch(e,t){const i=this.candidateTiles;this.candidateTiles=[],i.forEach((i=>{if(this.fetchedCandidates.has(i))return void(t&&t(i));let o=!1;e(i,(()=>o=!0)),o?t&&t(i):this.candidateTiles.push(i)})),this.candidateTiles=this._uniqueNonOverlappingTiles(this.candidateTiles,t)}_uniqueNonOverlappingTiles(e,t){const i={},o=[];for(const l of e)i[l.id]?t&&t(l):(i[l.id]=l,o.push(l));const s=o.sort(((e,t)=>e.level-t.level));return s.filter(((e,i)=>{for(let o=0;o<i;o++)if(Object(_geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_9__["contains"])(s[o].extent,e.extent))return t&&t(e),!1;return!0}))}_selectCandidateTilesCoveringExtentAt(e){this.candidateTiles.length=0;const t=this.layer.tileInfo,i=t.lods[e],o=this.extent,s=t.tileAt(i.level,o.xmin,o.ymin),l=i.resolution*t.size[0],n=i.resolution*t.size[1],a=Math.ceil((o.xmax-s.extent[0])/l),r=Math.ceil((o.ymax-s.extent[1])/n);for(let c=0;c<r;c++)for(let e=0;e<a;e++){const i={id:null,level:s.level,row:s.row-c,col:s.col+e};t.updateTileInfo(i),this._tileIsMasked(i)||this.candidateTiles.push(i)}}_tileIsMasked(e){return!!this.maskExtents&&this.maskExtents.some((t=>Object(_geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_9__["contains"])(t,e.extent)))}}function _(e,t){let i=e.lods.length-1;if(t>0){const o=e.lods.findIndex((e=>e.resolution<t));0===o?i=0:o>0&&(i=o-1)}return i}const E={maximumAutoTileRequests:20,noDataValue:0,returnSampleInfo:!1,demResolution:"auto",minDemResolution:0};/* harmony default export */ __webpack_exports__["default"] = (T);


/***/ }),

/***/ "./node_modules/@arcgis/core/layers/support/ElevationSampler.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/support/ElevationSampler.js ***!
  \**********************************************************************/
/*! exports provided: ElevationSamplerBase, MultiTileElevationSampler, TileElevationSampler, updateGeometryElevation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElevationSamplerBase", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiTileElevationSampler", function() { return u; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileElevationSampler", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateGeometryElevation", function() { return h; });
/* harmony import */ var _geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../geometry.js */ "./node_modules/@arcgis/core/geometry.js");
/* harmony import */ var _core_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/has.js */ "./node_modules/@arcgis/core/core/has.js");
/* harmony import */ var _core_Logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Logger.js */ "./node_modules/@arcgis/core/core/Logger.js");
/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/maybe.js */ "./node_modules/@arcgis/core/core/maybe.js");
/* harmony import */ var _core_unitUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/unitUtils.js */ "./node_modules/@arcgis/core/core/unitUtils.js");
/* harmony import */ var _geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../geometry/support/aaBoundingRect.js */ "./node_modules/@arcgis/core/geometry/support/aaBoundingRect.js");
/* harmony import */ var _geometry_support_contains_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../geometry/support/contains.js */ "./node_modules/@arcgis/core/geometry/support/contains.js");
/* harmony import */ var _geometry_support_webMercatorUtils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../geometry/support/webMercatorUtils.js */ "./node_modules/@arcgis/core/geometry/support/webMercatorUtils.js");
/* harmony import */ var _geometry_Point_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../geometry/Point.js */ "./node_modules/@arcgis/core/geometry/Point.js");
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
const c=_core_Logger_js__WEBPACK_IMPORTED_MODULE_2__["default"].getLogger("esri.layers.support.ElevationSampler");class m{queryElevation(e){return h(e.clone(),this)}on(){return g}projectIfRequired(e,t){return f(e,t)}}class p extends m{constructor(e,t,i){super(),this.tile=e,this.noDataValue=i,this.extent=Object(_geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_5__["toExtent"])(e.tile.extent,t.spatialReference);const o=Object(_core_unitUtils_js__WEBPACK_IMPORTED_MODULE_4__["getMetersPerUnitForSR"])(t.spatialReference),r=t.lodAt(e.tile.level).resolution*o;this.demResolution={min:r,max:r}}get spatialReference(){return this.extent.spatialReference}contains(e){const t=this.projectIfRequired(e,this.spatialReference);return Object(_geometry_support_contains_js__WEBPACK_IMPORTED_MODULE_6__["extentContainsPoint"])(this.extent,t)}elevationAt(e){const t=this.projectIfRequired(e,this.spatialReference);if(!t)return null;if(!this.contains(e)){const t=this.extent,n=`${t.xmin}, ${t.ymin}, ${t.xmax}, ${t.ymax}`;c.warn("#elevationAt()",`Point used to sample elevation (${e.x}, ${e.y}) is outside of the sampler extent (${n})`)}return this.tile.sample(t.x,t.y)}}class u extends m{constructor(e,t,n){let o;super(),"number"==typeof t?(this.noDataValue=t,o=null):(o=t,this.noDataValue=n),this.samplers=o?e.map((e=>new p(e,o,this.noDataValue))):e;const r=this.samplers[0];if(r){this.extent=r.extent.clone();const{min:e,max:t}=r.demResolution;this.demResolution={min:e,max:t};for(let n=1;n<this.samplers.length;n++){const e=this.samplers[n];this.extent.union(e.extent),this.demResolution.min=Math.min(this.demResolution.min,e.demResolution.min),this.demResolution.max=Math.max(this.demResolution.max,e.demResolution.max)}}else this.extent=Object(_geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_5__["toExtent"])(Object(_geometry_support_aaBoundingRect_js__WEBPACK_IMPORTED_MODULE_5__["create"])(),o.spatialReference),this.demResolution={min:0,max:0}}get spatialReference(){return this.extent.spatialReference}elevationAt(e){const t=this.projectIfRequired(e,this.spatialReference);if(!t)return null;for(const n of this.samplers)if(n.contains(t))return n.elevationAt(t);return c.warn("#elevationAt()",`Point used to sample elevation (${e.x}, ${e.y}) is outside of the sampler`),null}}function h(e,t){const n=f(e,t.spatialReference);if(!n)return null;switch(e.type){case"point":x(e,n,t);break;case"polyline":R(e,n,t);break;case"multipoint":d(e,n,t)}return e}function f(e,t){const n=e.spatialReference;return n.equals(t)?e:Object(_geometry_support_webMercatorUtils_js__WEBPACK_IMPORTED_MODULE_7__["canProject"])(n,t)?Object(_geometry_support_webMercatorUtils_js__WEBPACK_IMPORTED_MODULE_7__["project"])(e,t):(c.error(`Cannot project geometry spatial reference (wkid:${n.wkid}) to elevation sampler spatial reference (wkid:${t.wkid})`),null)}function x(e,n,s){e.z=Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__["unwrapOr"])(s.elevationAt(n),0)}function R(e,n,s){y.spatialReference=n.spatialReference;const i=e.hasM&&!e.hasZ;for(let o=0;o<e.paths.length;o++){const r=e.paths[o],a=n.paths[o];for(let e=0;e<r.length;e++){const n=r[e],o=a[e];y.x=o[0],y.y=o[1],i&&(n[3]=n[2]),n[2]=Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__["unwrapOr"])(s.elevationAt(y),0)}}e.hasZ=!0}function d(e,n,s){y.spatialReference=n.spatialReference;const i=e.hasM&&!e.hasZ;for(let o=0;o<e.points.length;o++){const r=e.points[o],a=n.points[o];y.x=a[0],y.y=a[1],i&&(r[3]=r[2]),r[2]=Object(_core_maybe_js__WEBPACK_IMPORTED_MODULE_3__["unwrapOr"])(s.elevationAt(y),0)}e.hasZ=!0}const y=new _geometry_Point_js__WEBPACK_IMPORTED_MODULE_8__["default"],g={remove(){}};


/***/ }),

/***/ "./node_modules/@arcgis/core/layers/support/ElevationTile.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/support/ElevationTile.js ***!
  \*******************************************************************/
/*! exports provided: default, ElevationTile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElevationTile", function() { return t; });
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
class t{constructor(t,a){if(this.tile=t,!a)return void(this.samplerData=null);const e=this.tile.extent;this.samplerData={pixelData:a.values,width:a.width,height:a.height,safeWidth:.99999999*(a.width-1),noDataValue:a.noDataValue,dx:(a.width-1)/(e[2]-e[0]),dy:(a.width-1)/(e[3]-e[1]),x0:e[0],y1:e[3]}}sample(t,e){if(this.samplerData)return a(this.samplerData,t,e)}}function a(t,a,i){const{safeWidth:h,width:s,pixelData:l,noDataValue:r}=t,n=e(t.dy*(t.y1-i),0,h),o=e(t.dx*(a-t.x0),0,h),d=Math.floor(n),u=Math.floor(o),f=d*s+u,p=f+s,x=l[f],D=l[p],c=l[f+1],w=l[p+1];if(x!==r&&D!==r&&c!==r&&w!==r){const t=o-u,a=x+(c-x)*t;return a+(D+(w-D)*t-a)*(n-d)}}function e(t,a,e){return t<a?a:t>e?e:t}/* harmony default export */ __webpack_exports__["default"] = (t);


/***/ })

}]);
//# sourceMappingURL=28.ArcGIS.js.map