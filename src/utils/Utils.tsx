/* eslint-disable linebreak-style */
import { LayerArrayType } from "../../typings/ReactArcGISProps";
import { GisObject, logNode } from "../ReactArcGIS";
import { ArcGISContainerProps, FieldInfo, QueryDefinition } from "../components/ArcGISContainer";
import Geometry from "@arcgis/core/geometry/Geometry";
import Graphic from "@arcgis/core/Graphic";
import { load, project } from "@arcgis/core/geometry/projection";
import MapView from "@arcgis/core/views/MapView";
import { createLegendUniqueValueRender, _createUniqueValueRenderer } from "./CustomStylingUtils";
import { whenFalse, whenFalseOnce, whenTrue } from "@arcgis/core/core/watchUtils";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { createCustomContent } from "./PopupUtils";
import WebMap from "@arcgis/core/WebMap";
import PortalItem from "@arcgis/core/portal/PortalItem";
import Layer from "@arcgis/core/layers/Layer";

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
        let singlePointItem = false;
        if (geometriesReturned && geometriesReturned.length > 1) {
            singleItem = false;
        } else if ((geometriesReturned[0] && geometriesReturned[0].type ==="point") || geometriesReturned.length === 0) {
            singlePointItem = true;
        } 
        if (zoom) {
            const goToOpts2D = {
                animate: true,
                duration: 2000,
                easing: "ease"
            };
            // for multiple items (and single non-point item), GoTo zooms to features with proper zooming
            if (!singleItem || !singlePointItem) {
                promisesGoTo.push(
                    view.goTo({
                        target: geometriesReturned,
                        options: goToOpts2D
                    })
                );
            } // for single point items, GoTo doesn't zoom properly, whereas for PolyLine /Polygon it does.. so adjusting zoom based on Studio Pro setting
            else {
                console.debug(logNode + "zooming to single point using widget setting 'single item zoom level':" + objectZoom);
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
): Promise<any> => {
    return new Promise((resolve, reject) => {
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
                        ).then(resolve);
                    })
                    .catch(error => {
                        console.error(
                            logNode + "failed to get all objects from all layers for zooming and highlighting, " + error
                        );
                        reject(error);
                    });
            } else {
                console.debug(logNode + "no Mendix Layers configured, hence not quering nor zooming..");
            }
        }
    })
};
export const createLoadingIndicators = (
    view: MapView,
    loadingBehavior: string,
    loadingModalMessage: string,
    progressIdRef: any,
    loadingDiv: any,
    blockProgressModalRef: any
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
            else if (loadingBehavior === "modal" && !blockProgressModalRef.current) {
                progressIdRef.current = mx.ui.showProgress(loadingModalMessage, true);
                console.debug(logNode + "updating and showing progress modal with id" + progressIdRef.current);
                //@ts-ignore
                if (view.activeTool) {
                    //@ts-ignore
                    console.debug(logNode + "activeTool.type: " + view.activeTool.type);
                }
            }
            else if (loadingBehavior === "animatedGIF" && loadingDiv.current && !blockProgressModalRef.current) {
                loadingDiv.current.style.visibility = "";
            }
        }
    });
    // hide the loading indicator when the view stops updating
    whenFalse(view, "updating", () => {
        if (loadingBehavior === "modal" && progressIdRef.current) {
            mx.ui.hideProgress(progressIdRef.current);
            progressIdRef.current = undefined;
            // console.debug(logNode + " not updating anymore, so hiding progress modal with id" + progressIdRef.current);
        }
        else if (loadingBehavior === "animatedGIF" && loadingDiv.current) {
            loadingDiv.current.style.visibility = "hidden";
        }
        // console.error(logNode + "updating done..");
    });
}

export const loadLayer = (props: ArcGISContainerProps, layerObj: LayerArrayType, queryDefinitions: QueryDefinition[], mendixLayersRef: any, webMap: WebMap,
    view: MapView, promises: Promise<any>[]): void => {
    console.debug(logNode + "processing " + layerObj.layerServerType + " : " + layerObj.layerID);
    if (layerObj.layerServerType === "FeatureServer" || layerObj.layerServerType === "MapServer") {
        const layerID = layerObj.layerID;
        // console.debug(logNode + "start building layer: " + layerID);
        // get queryDefinition for layer based on layerID of MxObjects
        const queryDefinitionObj = queryDefinitions.filter(queryDefinition => {
            return queryDefinition.layerID === layerID;
        })[0];
        let queryDefinition = queryDefinitionObj.queryDefinition;
        // if all objects needs to be shown, don't use querydefinition when building the layer
        // but only for highligting these objects after all are loaded
        if (props.dsShowAllObjects) {
            queryDefinition = "1=1";
        }

        // console.debug(logNode + "Layer: " + layerID + " queryDefinition: " + queryDefinition);

        // get interaction attributes for layer based on layerID of MxObjects
        const intAttributesArrayLayer = props.intAttributesArray.filter(intAttribute => {
            if (intAttribute.intAttributeLayerID === layerID) {
                return {
                    fieldName: intAttribute.intAttributeName,
                    visible: true,
                    label: intAttribute.intAttributeLabel,
                    format: {
                        places: intAttribute.intAttributeDecimalPlaces,
                        digitSeparator: intAttribute.intAttributeDecimalSeparator
                    }
                };
            }
            return null;
        });
        const fieldInfos: FieldInfo[] = [];
        let inAttributeTitle = "";
        intAttributesArrayLayer.forEach(intAttribute => {
            const fieldInfo: FieldInfo = {
                fieldName: intAttribute.intAttributeName,
                visible: true,
                label: intAttribute.intAttributeLabel
            };
            fieldInfos.push(fieldInfo);
            if (intAttribute.intAttributeIsTitle) {
                inAttributeTitle = intAttribute.intAttributeName;
            }
        });
        // console.debug(logNode + "fieldinfos for layer " + layerID);
        // console.dir(fieldInfos);
        const btnId = "pop-mx-action-default-" + layerID;
        let intButtonIconClass = "";
        if (props.intButtonIcon?.value?.type === "glyph") {
            intButtonIconClass = " glyphicon " + props.intButtonIcon.value.iconClass;
        }
        // console.debug(logNode + "button icon:" + intButtonIconClass);
        // if (layerObj.layerServerType === "FeatureServer") {
        const actionArray = [];
        actionArray.push({
            title: props.intButtonLabel,
            id: btnId,
            className: props.intButtonClass + intButtonIconClass,
            type: "button"
        });

        let featureLayerSettings = {};
        // clustering needs to be enabled generically and on layer
        if (props.cl_enabled && layerObj.clusteringEnabled) {
            const featureReduction = {
                type: "cluster",
                clusterRadius: props.cl_radius + "px",
                // {cluster_count} is an aggregate field containing
                // the number of features comprised by the cluster
                popupTemplate: {
                    title: props.cl_popupTitle,
                    content: props.cl_popupContent,
                    fieldInfos: [
                        {
                            fieldName: "cluster_count",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }
                    ]
                },
                clusterMinSize: props.cl_minSize + "px",
                clusterMaxSize: props.cl_maxSize + "px",
                labelingInfo: [
                    {
                        deconflictionStrategy: "none",
                        labelExpressionInfo: {
                            expression: "Text($feature.cluster_count, '#,###')"
                        },
                        symbol: {
                            type: "text",
                            color: props.cl_symbolTextColor,
                            font: {
                                weight: "bold",
                                family: "Noto Sans",
                                size: props.cl_symbolTextSize + "px"
                            }
                        },
                        labelPlacement: "center-center"
                    }
                ]
            };
            featureLayerSettings = {
                // URL to the service
                url: layerObj.layerURLStatic,
                definitionExpression: queryDefinition,
                featureReduction,
                popupTemplate: {
                    title: "{" + inAttributeTitle + "}",
                    content: [
                        {
                            type: "fields", // FieldsContentElement
                            fieldInfos
                        }
                    ],
                    actions: actionArray
                },
                outFields: ["*"]
            };
        } else if (layerObj.mendixLayer) {
            // if connected to Mendix objects enabled, dynamically populate popup with possibly Mendix attributes as well
            // if custom styling enabled, legend needs to be built up with a dummy extra layer,
            // because of shortcoming in unqiquevaluerenderer, generating duplicate legend entries.
            let legendEnabled = true;
            if (layerObj.customStylingEnabled) {
                legendEnabled = false;
            }
            featureLayerSettings = {
                // URL to the service
                url: layerObj.layerURLStatic,
                definitionExpression: queryDefinition,
                legendEnabled,
                popupTemplate: {
                    title: "{" + inAttributeTitle + "}",
                    outFields: ["*"],
                    content: (feature: any) => {
                        if (mendixLayersRef && mendixLayersRef.current) {
                            return createCustomContent(
                                feature,
                                intAttributesArrayLayer,
                                layerObj,
                                props.intMendixXPathStringr
                            );
                        }
                    },
                    actions: actionArray,
                    fieldInfos
                },
                outFields: ["*"]
            };
        } else {
            featureLayerSettings = {
                // URL to the service
                url: layerObj.layerURLStatic,
                definitionExpression: queryDefinition,
                popupTemplate: {
                    title: "{" + inAttributeTitle + "}",
                    outFields: ["*"],
                    content: [
                        {
                            type: "fields", // FieldsContentElement
                            fieldInfos
                        }
                    ],
                    actions: [],
                    fieldInfos
                },
                outFields: ["*"]
            };
        }

        // console.debug(logNode + layerObj.layerID + " : " + layerObj.layerServerType);
        const featureLayer = new FeatureLayer(featureLayerSettings);
        featureLayer.visible = layerObj.visibilityOnLoad;
        webMap.add(featureLayer, layerObj.layerIndex);
        if (layerObj.mendixLayer) {
            if (layerObj.customStylingEnabled) {
                const featureLayerLegendDummy = new FeatureLayer({
                    title: layerObj.layerID,
                    id: "Dummy",
                    source: [], // add no graphics as it is a dummy layer only used for adding legend of layers with custom styling
                    fields: [
                        {
                            name: "ObjectID",
                            alias: "ObjectID",
                            type: "oid"
                        },
                        {
                            name: "Name",
                            alias: "Name",
                            type: "string"
                        },
                        {
                            name: "Type",
                            alias: "Type",
                            type: "string"
                        }
                    ],
                    objectIdField: "ObjectID",
                    geometryType: "point",
                    spatialReference: { wkid: 4326 },
                    renderer: createLegendUniqueValueRender(props.csLegendEntriesArray, layerObj)
                });
                webMap.add(featureLayerLegendDummy, 0);
            }
            // need to wrap in promise to make sure layer is fully loaded when zooming, applying custom styling etc.
            const promiseLayer = new Promise(resolve => {
                view.whenLayerView(featureLayer).then(() => {
                    console.debug(
                        logNode + "loaded " + layerObj.layerServerType + " : " + layerObj.layerID
                    );
                    resolve(featureLayer);
                });
            });
            promises.push(promiseLayer);
        }
    } else if (layerObj.layerServerType === "PortalItem") {
        console.debug(logNode + "loading PortalItem with id: " + layerObj.portalItemID);
        Layer.fromPortalItem({
            portalItem: new PortalItem({
                id: layerObj.portalItemID // "dbd30266193b470a9adf795a38935bab"
            })
        }).then(layer => {
            // add the layer to the map
            webMap.add(layer, layerObj.layerIndex);
            layer.visible = layerObj.visibilityOnLoad;
        });
    }
}
