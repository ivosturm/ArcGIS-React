/* eslint-disable linebreak-style */
import { LayerArrayType } from "../../typings/ReactArcGISProps";
import { GisObject, logNode } from "../ReactArcGIS";
import { ArcGISContainerProps, QueryDefinition } from "../components/ArcGISContainer";
import Geometry from "@arcgis/core/geometry/Geometry";
import Graphic from "@arcgis/core/Graphic";
import { load, project } from "@arcgis/core/geometry/projection";
import MapView from "@arcgis/core/views/MapView";
import { _createUniqueValueRenderer } from "./CustomStylingUtils";
import { whenFalse, whenFalseOnce, whenTrue } from "@arcgis/core/core/watchUtils";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export interface QueryFeaturesResult {
    layerName: string;
    layerView: any;
    arcGISObjectIDAttr: string;
    result: any;
}

/**
 *
 * @param layerObj the layer object from Mendix
 * @param gisObjects the gisObjects loaded from the data source
 * @returns a specific query definition with all ArcGIS id's so layer can be constrained on these.
 */
export function _createQueryDefinition(layerObj: LayerArrayType, gisObjects: GisObject[]): string {
    let queryDefinition = "";
    let layerArcGISIDField = layerObj.objectIDAttr;
    let layerArcGISIDFieldType = "Number";
    if (layerObj.clientIDAttr) {
        layerArcGISIDField = layerObj.clientIDAttr;
        if (layerObj.clientIDAttrType === "String") {
            layerArcGISIDFieldType = "String";
        }
    }
    // create query definition if there are Mendix objects, but less than 4000 are selected / fed to ArcGIS. More than 4000 will give weird results.
    if (gisObjects.length > 0 && gisObjects.length < 4000 && layerObj.mendixLayer) {
        let firstIteration = true;

        const gisObjectsInLayer = gisObjects.filter(gisObject => {
            if (gisObject.layerID) {
                return gisObject.layerID === layerObj.layerID;
            }
            return null;
        });

        if (gisObjectsInLayer && gisObjectsInLayer.length > 0) {
            // create an IN statement for all retrieved objects
            queryDefinition = layerArcGISIDField + " IN (";
        }

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let q = 0; q < gisObjects.length; q++) {
            const ArcGISID = String(gisObjects[q].ID);

            if (ArcGISID) {
                // only first time no postfix , should be added
                if (!firstIteration) {
                    queryDefinition += ",";
                }
                if (firstIteration) {
                    firstIteration = false;
                }
                if (layerArcGISIDFieldType === "String") {
                    queryDefinition += "'" + ArcGISID + "'";
                } else {
                    queryDefinition += ArcGISID;
                }
            }
        }

        if (gisObjectsInLayer && gisObjectsInLayer.length > 0) {
            // properly close the IN statement
            queryDefinition += ")";
        }
        console.debug(logNode + "queryDefinition for layer: " + layerObj.layerID + " : " + queryDefinition);
    } else {
        // in case of non Mendix layers, always load all objects since identifier is not known in Mendix!
        queryDefinition = "1=1";
    }
    return queryDefinition;
}

export default function _createQueryDefinitions(
    queryDefinitions: QueryDefinition[],
    layerArray: LayerArrayType[],
    gisObjects: GisObject[]
): void {
    if (layerArray) {
        if (queryDefinitions.length === 0) {
            layerArray.forEach(layer => {
                // only create new definitions at first load. after this should be updated
                // via handleDefinitionArrayUpdate
                const gisObjectsLayer = gisObjects.filter(gisObject => {
                    return layer.layerID === gisObject.layerID;
                });
                const queryDefinitionOriginal = _createQueryDefinition(layer, gisObjectsLayer);
                queryDefinitions.push({
                    layerID: layer.layerID,
                    layerURL: layer.layerURLStatic,
                    queryDefinitionOriginal,
                    queryDefinition: queryDefinitionOriginal
                });
            });
        }
    }
}
/**
 * @param view the view on which sketching is done
 * @param geometry of all graphics of the sketched rectangle in the layer
 * @returns Promise that will only resolve if all graphics are available
 */
export async function selectFeatures(view: any, geometry: any): Promise<any> {
    if (view) {
        // create a query and set its geometry parameter to the
        // rectangle that was drawn on the view
        const query = {
            geometry,
            outFields: ["*"]
        };
        // query graphics from the csv layer view. Geometry set for the query
        // can be polygon for point features and only intersecting geometries are returned
        let resultfeatures: any;

        await view.queryFeatures(query).then((result: any) => {
            resultfeatures = result;
        });
        return resultfeatures;
    }
}
/**
 * @param highlights array of highlighted features
 * @param result array of graphics needing highlighting
 * @param view which is active
 * @param layerView of the layer eing skected in
 * @param objectIDAttr of the Mendix object containing the ArcGIS ID
 * @param objectZoom the zoom number to use once highlighting
 * @param zoom decides whether to zoom (true) or not (false)
 * @param highlightEnabled decides whether to use highlighting of mx objects (true) or not (false)
 */
export function highlightAndZoom(
    highlights: any,
    QFResults: QueryFeaturesResult[],
    view: MapView,
    objectZoom: number,
    zoom: boolean,
    highlightEnabled: boolean
): Array<Promise<any>> {
    const promisesGoTo: Array<Promise<any>> = [];
    const newHighlights = highlights;
    if (highlightEnabled) {
        if (newHighlights.length > 0) {
            newHighlights.forEach((highlight: any) => {
                highlight.remove();
            });
        }
    }
    const geometriesReturned: Geometry[] = [];
    // the projection module is loaded. Geometries can be re-projected.
    load().then(() => {
        QFResults.forEach(QFResult => {
            const result = QFResult.result;
            let projectNeeded = false;
            const geometriesLayer: Geometry[] = [];
            if (result.features && result.features.length && result.features.length > 0) {
                // from QueryDefinition geometry is returned, from selection via rectangle on map they aren't, hence skip in that scenario
                if (result.features[0] && result.features[0].geometry) {
                    const spatRefGraphic = result.features[0].geometry.spatialReference.wkid;
                    if (spatRefGraphic !== view.spatialReference.wkid) {
                        projectNeeded = true;
                        console.debug(
                            logNode +
                                "spatial reference of graphics (" +
                                spatRefGraphic +
                                ") from layer " +
                                QFResult.layerName +
                                " is different from spatial reference from view (" +
                                view.spatialReference.wkid +
                                ")"
                        );
                    }
                }
                result.features.forEach((graphic: Graphic) => {
                    if (projectNeeded) {
                        // project returns Geometry | Geometry[]; TypeScript doesn't like this
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        graphic.geometry = project(graphic.geometry, view.spatialReference);
                    }
                    geometriesLayer.push(graphic.geometry);
                    if (highlightEnabled) {
                        // highlighting can only be done on actual ArcGIS esriID
                        const highlight = QFResult.layerView.highlight(graphic.attributes[QFResult.arcGISObjectIDAttr]);
                        newHighlights.push(highlight);
                    }
                });

                geometriesReturned.push(...geometriesLayer);
            }
        });
        if (highlightEnabled) {
            highlights = newHighlights;
        }
        let singleItem = true;
        if (geometriesReturned && geometriesReturned.length > 1) {
            singleItem = false;
        }
        if (zoom) {
            const goToOpts2D = {
                animate: true,
                duration: 2000,
                easing: "ease"
            };
            // for multiple items, API zooms to features with proper zooming
            if (!singleItem) {
                promisesGoTo.push(
                    view.goTo({
                        target: geometriesReturned,
                        options: goToOpts2D
                    })
                );
            } // for single items, ArcGIS doesn't zoom properly, so adjusting zoom based on Studio Pro setting
            else {
                console.debug(logNode + "zooming to single object using single item zoom setting");
                promisesGoTo.push(
                    view.goTo({
                        target: geometriesReturned,
                        zoom: objectZoom,
                        options: goToOpts2D
                    })
                );
            }
        }
    });
    return promisesGoTo;
}

/**
 * a function that, based on the querydefinitions of each layer loaded, zooms to the objects in the Mendix layers.
 * It also adds highlighting to the objects, in case all other objects are also shown still, to make explicit which
 * objects are selected
 */
export const zoomToGraphics = (
    view: MapView,
    gisObjects: GisObject[],
    queryDefinitions: QueryDefinition[],
    props: ArcGISContainerProps,
    highlights: any[]
): void => {
    console.debug(logNode + "zooming to objects from data source..");
    // let definitionExpression: any = {};
    if (gisObjects && gisObjects.length > 0) {
        // assume all Mendix Layers should be queried
        const mendixLayers = props.layerArray.filter(layer => {
            return layer.mendixLayer;
        });
        if (mendixLayers && mendixLayers.length > 0) {
            const promisesLayerQuery: Array<Promise<any>> = [];

            mendixLayers.forEach(layer => {
                // get all objects from that layer
                const gisObjectsLayer = gisObjects.filter(gisObject => {
                    return layer.layerID === gisObject.layerID;
                });
                // only highlight and zoom if any objects are returned
                if (gisObjectsLayer.length > 0) {
                    // get querydefinition to translate from layerID to layerURL also stored in layerview
                    const queryDef = queryDefinitions.filter(queryDef => {
                        return queryDef.layerID === layer.layerID;
                    })[0];

                    if (queryDef) {
                        queryDef.queryDefinitionOriginal = _createQueryDefinition(layer, gisObjectsLayer);
                    }
                    const objectIdAttribute = layer.objectIDAttr;
                    // iterate over layerviews, comparing layer url property
                    // filtering out the one layer which is connected to Mendix objects
                    if (view && queryDef) {
                        let layerViewCurrent: any = {};
                        view.layerViews.forEach(layerView => {
                            const layerViewURL = String(layerView.layer.get("url")) + "/" + String(layerView.layer.get("layerId"));
                            // console.debug(logNode + "Query definition: " + queryDef.layerURL + ". Matching with layers of view being iterated over, URL: " + layerViewURL);
                            if (queryDef.layerURL === layerViewURL) {
                                layerViewCurrent = layerView;
                                // console.debug(logNode + "MATCH! Query definition: " + queryDef.layerURL + ". Matching with layers of view being iterated over, URL: " + layerViewURL);
                            
                            }
                        });
                        if (layerViewCurrent && layerViewCurrent.layer) {
                            const featureLayer: FeatureLayer = layerViewCurrent.layer;
                            // reset the query definition when the Mendix Layer is done loading for the first time,
                            // to make sure scenario of feeding new MxObjects to widget when loading previous MxObjects is covered
                            if (!props.dsShowAllObjects) {
                                console.debug(
                                    logNode +
                                        "setting definitionExpression on layer " +
                                        featureLayer.id +
                                        " to " +
                                        queryDef.queryDefinitionOriginal
                                );
                                featureLayer.definitionExpression = queryDef.queryDefinitionOriginal;

                                console.debug(
                                    logNode + "layerview " + featureLayer.id + " resetting definition expression.."
                                );
                            }
                            // if custom styling enabled and Mendix objects found for that layer, check if gisobjects need specific coloring
                            if (
                                layer.customStylingEnabled &&
                                gisObjectsLayer &&
                                gisObjectsLayer.length &&
                                gisObjectsLayer.length > 0
                            ) {
                                // get default Color / Symbol settings for this layer
                                const csDefaultArrayLayer = props.csDefaultArray.filter(csDefaultArrayInstance => {
                                    return layer.layerID === csDefaultArrayInstance.csDefaultArrayLayerID;
                                })[0];
                                console.debug(logNode + "applying custom styling to layer " + layer.layerID);
                                const renderer = _createUniqueValueRenderer(
                                    layer,
                                    gisObjectsLayer,
                                    csDefaultArrayLayer,
                                    layerViewCurrent.layer
                                );
                                featureLayer.renderer = renderer;
                                /* if (esriConfig && esriConfig.request && esriConfig.request.interceptors) {
                                    esriConfig.request.interceptors.push({
                                        urls: featureLayer.url + "/45",
                                        after(response) {
                                            console.dir(response);
                                             response.data.layers[0].legend.forEach((l: any) => {
                                                l.label = "not " + l.label;
                                            }); 
                                        }
                                    });
                                }*/
                                console.debug(
                                    logNode +
                                        "layerview " +
                                        featureLayer.id +
                                        " done updating for first time. Resetting renderer.."
                                );
                            }
                            const query = featureLayer.createQuery();
                            query.where = queryDef.queryDefinitionOriginal;

                            // if it is unwanted to show non-highlighted properties, set queryDefinition on layer to hide all non-selected objects
                            // eslint-disable-next-line no-unused-vars
                            const promiseQuery = new Promise((resolve, reject) => {
                                featureLayer
                                    .queryFeatures(query)
                                    .then((result: any) => {
                                        const qfResult: QueryFeaturesResult = {
                                            layerName: layer.layerID,
                                            layerView: layerViewCurrent,
                                            arcGISObjectIDAttr: objectIdAttribute,
                                            result
                                        };
                                        whenFalseOnce(layerViewCurrent, "updating", () => {
                                            console.debug(logNode + qfResult.layerName + " layer updated after load"
                                            );
                                            resolve(qfResult);
                                        });
                                    })
                                    .catch((error: any) => reject(error));
                            });
                            promisesLayerQuery.push(promiseQuery);
                        }
                    }
                }
            });
            Promise.all(promisesLayerQuery)
                .then(results => {
                    console.debug(logNode + "all Query promises resolved, calling highlightAndZoom with " + results.length + " QF results");
                    Promise.all(
                        highlightAndZoom(highlights, results, view, props.objectZoom, true, props.dsHighlightingEnabled)
                    ).then(() => {
                        // only if zoom to is done, refresh
                        console.debug(logNode + "highlightAndZoom GoTo promises resolved, map done updating");
                    });
                })
                .catch(error => {
                    console.error(
                        logNode + "failed to get all objects from all layers for zooming and highlighting, " + error
                    );
                });
        } else {
            console.debug(logNode + "no Mendix Layers configured, hence not quering nor zooming..");
        }
    }
};
export const createLoadingIndicators = (
    view: MapView,
    loadingModal: boolean,
    loadingModalMessage: string,
    progressIdRef: any,
    loadingDiv: any

): void => {
    // display the loading indicator when the view is updating
    whenTrue(view, "updating", () => {
        const messagePrefix = logNode + "updating view: " ;
        if (view.interacting || view.navigating){
            if (view.interacting) {
                console.debug(messagePrefix + "interacting (zooming)...");
            } else {
                console.debug(messagePrefix + "navigating...");
            }
        } else {
            //@ts-ignore
            if (view.activeTool && view.activeTool.type ==="draw-2d") {
                // undocumented feature. If a tool is activated it will be added to the view. if not, it doesn't exist, hence .type will give undefined error
                // do not add loading modal if actively drawing something...
                console.debug(messagePrefix + "drawing (selection tool)...");
            } //@ts-ignore
            else if (view.activeTool && view.activeTool._drawActive) {
                // undocumented feature. If a tool is activated it will be added to the view. if not, it doesn't exist, hence .type will give undefined error
                // do not add loading modal if actively drawing something...
                console.debug(messagePrefix + "measuring distance...");
            }
            else if (loadingModal) {
                progressIdRef.current = mx.ui.showProgress(loadingModalMessage, true);
                console.debug(logNode + "updating, so showing progress modal with id" + progressIdRef.current + ". view.stationary: " + view.stationary);
                //@ts-ignore
                if (view.activeTool) {
                    //@ts-ignore
                    console.debug(logNode + "activeTool.type: " + view.activeTool.type);
                }
            }
            else if (!loadingModal && loadingDiv.current) {
                loadingDiv.current.style.visibility = "";
            }
        }
    });
    // hide the loading indicator when the view stops updating
    whenFalse(view, "updating", () => {
        if (loadingModal && progressIdRef.current) {
            mx.ui.hideProgress(progressIdRef.current);
            progressIdRef.current = undefined;
            // console.debug(logNode + " not updating anymore, so hiding progress modal with id" + progressIdRef.current);
        }
        else if (!loadingModal && loadingDiv.current) {
            loadingDiv.current.style.visibility = "hidden";
        }
        // console.error(logNode + "updating done..");
    });
}
