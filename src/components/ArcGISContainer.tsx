/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { useRef, useEffect, useState, createElement, memo } from "react";
import {
    ObjectItem,
    ListValue,
    ListAttributeValue,
    ListActionValue,
    DynamicValue,
    WebIcon,
    ListWidgetValue
} from "mendix";
import Expand from "@arcgis/core/widgets/Expand";
import Basemap from "@arcgis/core/Basemap";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";
import PortalItem from "@arcgis/core/portal/PortalItem";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle"
import Legend from "@arcgis/core/widgets/Legend";
import Search from "@arcgis/core/widgets/Search";
import LayerList from "@arcgis/core/widgets/LayerList";
import { GisObject, position, logNode } from "../ReactArcGIS";
import _createQueryDefinitions, { createLoadingIndicators, zoomToGraphics } from "../utils/Utils";
import {
    CsDefaultArrayType,
    CsLegendEntriesArrayType,
    IntAttributesArrayType,
    LayerArrayType,
    LayerServerTypeEnum
} from "../../typings/ReactArcGISProps";
import { createCustomContent } from "../utils/PopupUtils";
import { createLegendUniqueValueRender } from "../utils/CustomStylingUtils";

export interface ArcGISContainerProps {
    onLoad: (isLoaded: boolean, view: MapView, legend: Legend) => void;
    mapWidth: number;
    mapHeight: number;
    baseMapID: string;
    bmToggleID: string;
    bmToggleEnabled: boolean;
    bmTogglePosition: position;
    bmTogglePlaceHolderIndex: number;
    defaultZoom: number;
    objectZoom: number;
    defaultLocation: number[];
    loadingModal: boolean;
    loadingModalMessage: string;
    mxObjects: ListValue;
    tokenAttr?: ListAttributeValue<string>;
    userIdAttr?: ListAttributeValue<string>;
    expiryDateAttr?: ListAttributeValue<Date>;
    dynLayerObjects?: ListValue;
    dynLayerLayerIDAttr?: ListAttributeValue<string>;
    dynLayerIndexAttr?: ListAttributeValue<BigJs.Big>;
    dynLayerServerTypeAttr?: ListAttributeValue<string>;
    dynLayerStaticURLAttr?: ListAttributeValue<string>;
    dynLayerObjectIDAttr?: ListAttributeValue<string>;
    dynLayerVisibilityOnLoadAttr?: ListAttributeValue<boolean>;
    dynLayerCustomStylingEnabledAttr?: ListAttributeValue<boolean>;
    dynLayerClusteringEnabledAttr?: ListAttributeValue<boolean>;
    dynLayerMendixObjectsAttr?: ListAttributeValue<boolean>;
    objectIDAttr: ListAttributeValue<BigJs.Big | string>;
    layerIDAttr: ListAttributeValue<BigJs.Big | string>;
    colorAttr?: ListAttributeValue<string>;
    sizeAttr?: ListAttributeValue<BigJs.Big>;
    symbolAttr?: ListAttributeValue<string>;
    dsShowAllObjects: boolean;
    dsHighlightingEnabled: boolean;
    csDefaultArray: CsDefaultArrayType[];
    csLegendEntriesArray: CsLegendEntriesArrayType[];
    legendEnabled: boolean;
    legendStartExpanded: boolean;
    legendPosition: position;
    legendTitle: string;
    legendPlaceHolderIndex: number;
    searchEnabled: boolean;
    searchStartExpanded: boolean;
    searchPosition: position;
    searchPlaceHolderIndex: number;
    toggleLayerEnabled: boolean;
    toggleLayerStartExpanded: boolean;
    toggleLayerPosition: position;
    toggleLayerPlaceHolderIndex: number;
    // filterOptions: FilterOption[];
    layerArray: LayerArrayType[];
    intAttributesArray: IntAttributesArrayType[];
    intMendixXPathStringr: string;
    intButtonAction?: ListActionValue;
    intButtonLabel: string;
    intButtonClass: string;
    intButtonIcon?: DynamicValue<WebIcon>;
    infoWindowWidget?: ListWidgetValue;
    cl_enabled: boolean;
    cl_symbolTextColor: string;
    cl_symbolTextSize: number;
    cl_popupTitle: string;
    cl_popupContent: string;
    cl_radius: number;
    cl_minSize: number;
    cl_maxSize: number;
    isLoaded: boolean; // workaround to store isLoaded state of functional component over refreshes
    view: MapView;
    legend: Legend;
}

export interface QueryDefinition {
    layerID: string;
    layerURL: string;
    queryDefinitionOriginal: string;
    queryDefinition: string;
}

interface FieldInfo {
    fieldName: string;
    visible: boolean;
    label: string;
}

const ArcGISContainer = memo((props: ArcGISContainerProps) => {
    const [queryDefinitions] = useState<QueryDefinition[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(props.isLoaded);
    // const [view, setView] = useState<MapView>(props.view);
    let [gisObjects] = useState<GisObject[]>([]);
    const [mendixLayer] = useState<LayerArrayType[]>([]);
    const mendixLayersRef = useRef(mendixLayer);
    const [mendixLayerAttr] = useState<IntAttributesArrayType[]>([]);
    const mendixLayersAttrRef = useRef(mendixLayerAttr);
    const [mxObjects, setMxObjects] = useState<ObjectItem[]>([]);
    const [highlights] = useState<any[]>([]);
    const gisObjectsRef = useRef(gisObjects);
    const mxObjectsRef = useRef(mxObjects);
    // console.debug(logNode + "rendering ArcGISContainer");

    // see: https://stackoverflow.com/questions/58017215/what-typescript-type-do-i-use-with-useref-hook-when-setting-current-manually
    const mapDiv = useRef<HTMLDivElement | null>(null);
    const loadingDiv = useRef<HTMLDivElement | null>(null);
    const [progressId] = useState<number>();
    const progressIdRef = useRef(progressId); 

    // console.warn(logNode + " isLoaded boolean: " + props.isLoaded);

    // only load dynamic layers at first render!
    if (!isLoaded) {
        if (props.dynLayerObjects && props.dynLayerObjects.items) {
            // console.debug(logNode + "token source:");
            // console.dir(props.tokenObjects);
            // eslint-disable-next-line array-callback-return
            props.dynLayerObjects.items.map(dynLayerObj => {
                if (props.dynLayerLayerIDAttr && props.dynLayerStaticURLAttr && props.dynLayerObjectIDAttr) {
                    let dynServerType: LayerServerTypeEnum = "FeatureServer";
                    let dynMendixLayer = false;
                    let dynVisibilityOnLoad = true;
                    let dynCustomStylingEnabled = false;
                    let dynClusteringEnabled = false;
                    let dynIndex = 1;
                    if (props.dynLayerServerTypeAttr) {
                        // @ts-ignore
                        if (String(props.dynLayerServerTypeAttr.get(dynLayerObj).value) === "MapServer") {
                            dynServerType = "MapServer";
                            // @ts-ignore
                        } else if (String(props.dynLayerServerTypeAttr.get(dynLayerObj).value) === "PortalItem") {
                            dynServerType = "PortalItem";
                        }
                    }
                    if (props.dynLayerMendixObjectsAttr) {
                        // @ts-ignore
                        if (props.dynLayerMendixObjectsAttr.get(dynLayerObj).value) {
                            dynMendixLayer = true;
                        }
                    }
                    if (props.dynLayerIndexAttr) {
                        // @ts-ignore
                        if (props.dynLayerIndexAttr.get(dynLayerObj).value) {
                            // @ts-ignore
                            dynIndex = props.dynLayerIndexAttr.get(dynLayerObj).value;
                        }
                    }
                    if (props.dynLayerVisibilityOnLoadAttr) {
                        // @ts-ignore
                        dynVisibilityOnLoad = props.dynLayerVisibilityOnLoadAttr.get(dynLayerObj).value;
                    }
                    if (props.dynLayerCustomStylingEnabledAttr) {
                        // @ts-ignore
                        dynCustomStylingEnabled = props.dynLayerCustomStylingEnabledAttr.get(dynLayerObj).value;
                    }
                    if (props.dynLayerClusteringEnabledAttr) {
                        // @ts-ignore
                        dynClusteringEnabled = props.dynLayerClusteringEnabledAttr.get(dynLayerObj).value;
                    }
                    const dynamicLayer: LayerArrayType = {
                        // @ts-ignore
                        layerID: String(props.dynLayerLayerIDAttr.get(dynLayerObj).value),
                        // @ts-ignore
                        layerURLStatic: String(props.dynLayerStaticURLAttr.get(dynLayerObj).value),
                        // @ts-ignore
                        objectIDAttr: String(props.dynLayerObjectIDAttr.get(dynLayerObj).value),
                        layerIndex: dynIndex,
                        layerServerType: dynServerType,
                        clientIDAttr: "",
                        clientIDAttrType: "String",
                        opacity: "0",
                        showAttribution: true,
                        mendixLayer: dynMendixLayer,
                        featureLayerID: "0",
                        visibilityOnLoad: dynVisibilityOnLoad,
                        customStylingEnabled: dynCustomStylingEnabled,
                        clusteringEnabled: dynClusteringEnabled,
                        visibleLayerIndexes: "",
                        // @ts-ignore
                        portalItemID: String(props.dynLayerLayerIDAttr.get(dynLayerObj).value)
                    };
                    const dynamicLayerExisting = props.layerArray.find(obj => {
                        return obj.layerID === dynamicLayer.layerID;
                    });
                    if (!dynamicLayerExisting) {
                        props.layerArray.push(dynamicLayer);
                    }
                }
            });
        }

        // make sure the mendixLayer is loaded last, so it is loaded on top of supporting layer content
        props.layerArray.sort((layer, layerAdj) => {
            // false values first
            return layer.mendixLayer === layerAdj.mendixLayer ? 0 : layer.mendixLayer ? 1 : -1;
        });
        // add all Mendix Layers to Ref to access later on
        mendixLayersRef.current = props.layerArray.filter(layer => {
            return layer.mendixLayer;
        });
        // add all attributes configured for Mendix layers to Ref as well
        const intAttributesArray: IntAttributesArrayType[] = [];
        props.layerArray.forEach(layer => {
            props.intAttributesArray.forEach(intAttributes => {
                if (intAttributes.intAttributeLayerID === layer.layerID) {
                    intAttributesArray.push(intAttributes);
                }
            });
        });
        mendixLayersAttrRef.current = intAttributesArray;
    }

    useEffect(() => {
        const newGisObjects: GisObject[] = [];
        let newMxObjects: ObjectItem[] = [];
        if (props.mxObjects && props.mxObjects.items) {
            // if (!mxObjectsRef.current || mxObjectsRef.current.length === 0) {
            newMxObjects = props.mxObjects.items;
            /* } else {
                newMxObjects = mxObjectsRef.current;
            }*/
        }
        if (newMxObjects) {
            // console.debug(logNode + "data source of map objects:");
            // eslint-disable-next-line array-callback-return
            newMxObjects.map(mxObject => {
                // @ts-ignore
                const ID = String(props.objectIDAttr.get(mxObject).value);
                // @ts-ignore
                const layerID = String(props.layerIDAttr.get(mxObject).value);
                let color = "FF0000";
                let size = 8;
                let symbol = "circle";
                if (props.colorAttr) {
                    // @ts-ignore
                    color = String(props.colorAttr.get(mxObject).value);
                }
                if (props.sizeAttr) {
                    // @ts-ignore
                    size = Number(props.sizeAttr.get(mxObject).value);
                }
                if (props.symbolAttr) {
                    // @ts-ignore
                    symbol = String(props.symbolAttr.get(mxObject).value);
                }
                const gisObject = {
                    ID,
                    layerID,
                    color,
                    size,
                    symbol,
                    mxGuid: mxObject.id
                } as GisObject;
                newGisObjects.push(gisObject);
            });
        }
        // console.debug("gisobjects");
        // console.dir(gisObjects);
        if (isLoaded) {
            if (newMxObjects.length !== mxObjects.length) {
                console.debug(
                    logNode +
                        "setting mxObjects because amount of objects changed from " +
                        mxObjects.length +
                        " to " +
                        newMxObjects.length
                );
            } else if (mxObjects.length === newMxObjects.length && newMxObjects.length === 1) {
                if (mxObjects[0].id !== newMxObjects[0].id) {
                    console.debug(logNode + "setting mxObjects because guid changed");
                }
            }
        }        
        // update the new references for usage AFTER all data loading checks
        gisObjects = newGisObjects;
        gisObjectsRef.current = gisObjects;
        mxObjectsRef.current = newMxObjects;
        setMxObjects(mxObjects);

        if (!isLoaded) {
            console.debug(logNode + "useEffect hook triggered on initial load!");
            // esriConfig.apiKey = props.APIKey;

            // generate query definitions for all layers based on loaded mx objects
            _createQueryDefinitions(queryDefinitions, props.layerArray, gisObjects);
            if (mapDiv.current != null) {
                // Initialize map dimensions
                if (props.mapWidth === 10000) {
                    mapDiv.current.style.width = "100%";
                } else {
                    mapDiv.current.style.width = props.mapWidth + "px";
                }
                if (props.mapHeight === 10000) {
                    mapDiv.current.style.height = "100vh";
                } else {
                    mapDiv.current.style.height = props.mapHeight + "px";
                }
                // load the base map as basis map
                const webMap = new WebMap({
                    basemap: Basemap.fromId(props.baseMapID)
                });

                const view = new MapView({
                    container: mapDiv.current,
                    map: webMap,
                    zoom: props.defaultZoom,
                    center: props.defaultLocation
                });

                if (props.bmToggleEnabled) {
                    // 1 - Create the widget
                    const toggle = new BasemapToggle({
                        // 2 - Set properties
                        view: view, // view that provides access to the map's 'topo-vector' basemap
                        nextBasemap: props.bmToggleID // allows for toggling to the 'hybrid' basemap
                    });

                    // Add widget to the bottom right corner of the view
                    view.ui.add(toggle, {
                        position: props.bmTogglePosition,
                        index: props.bmTogglePlaceHolderIndex
                    });
                }

                // either creating loading indicator (spinning round) or progress modal based on widget settings
                createLoadingIndicators(view,props.loadingModal,props.loadingModalMessage,progressIdRef,loadingDiv);

                const promises: Array<Promise<any>> = [];
                props.layerArray.forEach(layerObj => {
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
                });

                Promise.all(promises).then(() => {
                    console.debug(logNode + "all layerViews loaded, zooming to graphics now..");
                    zoomToGraphics(view, gisObjects, queryDefinitions, props, highlights);
                });

                // Event handler that fires each time an action is clicked.
                view.popup.on("trigger-action", event => {
                    // console.dir(event.action);
                    // get identifier of grapic in layer
                    // console.debug(logNode + " selected feature from popup:");
                    // console.dir(view.popup.selectedFeature);
                    if (mxObjectsRef.current && mendixLayersRef.current) {
                        const feature = view.popup.selectedFeature;
                        // get Mendix layer equivalent where graphic belong to via shared URL attribute
                        const layerURL = String(feature.layer.get("url")) + "/" + String(feature.layer.get("layerId"));
                        // console.dir(logNode + "URL of layer clicked: " + layerURL);
                        const layer = props.layerArray.filter(layer => {
                            return layer.layerURLStatic === layerURL;
                        })[0];

                        const graphicID = view.popup.selectedFeature.getAttribute(layer.objectIDAttr);
                        // console.debug("mxObjectsRef.current");
                        // console.dir(mxObjectsRef.current);
                        const mxObject = mxObjectsRef.current.filter(mxObject => {
                            // console.debug("Mendix Object Value:" + String(props.objectIDAttr(mxObject).value));
                            // console.debug("ArcGIS Graphic value:" + String(graphicID));
                            // @ts-ignore
                            return String(props.objectIDAttr.get(mxObject).value) === String(graphicID);
                        })[0];
                        // console.debug("mxObject");
                        // console.dir(mxObject);
                        // Execute the measureThis() function if the measure-this action is clicked
                        if (event.action.id === "pop-mx-action-default-" + layer.layerID) {
                            if (mxObject && props.intButtonAction) {
                                console.debug(
                                    logNode +
                                        "triggering on click action for graphic with " +
                                        layer.objectIDAttr +
                                        " " +
                                        graphicID +
                                        " of layer " +
                                        layer.layerID
                                );
                                // @ts-ignore
                                props.intButtonAction.get(mxObject).execute();
                            }
                        } else {
                            console.debug(
                                logNode + event.action.id + " clicked with Mendix Context Object ID: " + mxObject.id
                            );
                        }
                    }
                });
                let legend: Legend;
                view.when(() => {
                    if (props.legendEnabled) {
                        // get the first layer in the collection of operational layers in the WebMap
                        // when the resources in the MapView have loaded.
                        const webLayers = webMap.layers;
                        const layerInfos: any[] = [];
                        // TODO: 20210905 - Ivo Sturm: getting the Mendix layer should not be needed anymore if we store layerInfos in cache.
                        webLayers.forEach(webLayer => {
                            // console.debug(logNode + featureLayer.title);
                            // console.dir(featureLayer);
                            const layerMendix = props.layerArray.filter(layer => {
                                // console.debug(logNode + layer.layerServerType + " : " + layer.layerID);
                                if (
                                    layer.layerServerType === "FeatureServer" ||
                                    layer.layerServerType === "MapServer"
                                ) {
                                    return (
                                        layer.layerURLStatic ===
                                        String(webLayer.get("url")) + "/" + String(webLayer.get("layerId"))
                                    );
                                } /* else if (layer.layerServerType === "MapServer") {
                                    return layer.layerURLStatic === String(featureLayer.get("url"));
                                } */ else if (
                                    layer.layerServerType === "PortalItem"
                                ) {
                                    const portalItem: any = webLayer.get("portalItem");
                                    return portalItem && layer.layerID === portalItem.id;
                                } else {
                                    return false;
                                }
                            })[0];
                            let title = "";
                            if (layerMendix) {
                                title = layerMendix.layerID;
                                // for a portalItem get the name from the Portal Item itself instead of from Mendix
                                if (layerMendix.layerServerType === "PortalItem") {
                                    const portalItem: any = webLayer.get("portalItem");
                                    title = portalItem.title;
                                    // for a PortalItem, the layer needs to be loaded first to get access to the legend
                                    webLayer.visible = layerMendix.visibilityOnLoad;
                                    console.error(
                                        logNode +
                                            title +
                                            "setting visibility on load to:" +
                                            layerMendix.visibilityOnLoad
                                    );
                                }
                            } else {
                                // dummy legend layer used for showing legend for layers with custom styling
                                title = webLayer.title;
                            }
                            layerInfos.push({
                                layer: webLayer,
                                title: webLayer.title,
                                hideLayers: []
                            });
                        });
                        if (webLayers) {
                            legend = new Legend({
                                view,
                                layerInfos
                            });
                            const legendExpand = new Expand({
                                view,
                                content: legend,
                                expanded: props.legendStartExpanded
                            });
                            // Add widget to the bottom right corner of the view
                            view.ui.add(legendExpand, {
                                position: props.legendPosition,
                                index: props.legendPlaceHolderIndex
                            });
                        }
                    }
                    if (props.searchEnabled) {
                        // get the first layer in the collection of operational layers in the WebMap
                        // when the resources in the MapView have loaded.
                        const searchWidget = new Search({
                            view
                        });

                        if (searchWidget) {
                            const searchExpand = new Expand({
                                view,
                                content: searchWidget,
                                expanded: props.searchStartExpanded
                            });
                            // Add widget to the bottom right corner of the view
                            view.ui.add(searchExpand, {
                                position: props.searchPosition,
                                index: props.searchPlaceHolderIndex
                            });
                        }
                    }
                    // eslint-disable-next-line no-constant-condition
                    if (props.toggleLayerEnabled) {
                        // don't show dummy layers, created only for showing legend of layers with custom styling
                        const dummyLayers = view.map.layers
                            /* .flatten(item => {
                                return item.layers || item.sublayers;
                            }) */
                            .filter(layer => {
                                return layer.id === "Dummy";
                            });
                        dummyLayers.forEach(dummyLayer => {
                            dummyLayer.listMode = "hide";
                        });
                        const layerList = new LayerList({
                            view
                        });
                        const layerListExpand = new Expand({
                            view,
                            content: layerList,
                            expanded: props.toggleLayerStartExpanded
                        });
                        // Add widget to the bottom right corner of the view
                        view.ui.add(layerListExpand, {
                            position: props.toggleLayerPosition,
                            index: props.toggleLayerPlaceHolderIndex
                        });
                    }
                    // add view and legend to parent state, so it can be accessed after reload of parent
                    // add view to state, so it can be accessed after reload
                    props.onLoad(true, view, legend);
                    setIsLoaded(true);
                    // setView(view);
                    setMxObjects(mxObjects);
                });
            }
        } else {
            console.debug(logNode + "useEffect hook triggered after initial load!");
            if (props.view) {
                // if at initial load no mxobjects where available, possible in listen to grid scenario
                // then querydefinitions need to be built still
                // generate query definitions for all layers based on loaded mx objects
                if (queryDefinitions.length === 0) {
                    _createQueryDefinitions(queryDefinitions, props.layerArray, gisObjects);
                }
                // after intial load, only zoom to objects since all setup should already be done at initial load
                zoomToGraphics(props.view, gisObjects, queryDefinitions, props, highlights);
            }
        }
    }, [queryDefinitions, props.mxObjects, highlights]);
    return (
        <div className="mapDiv" ref={mapDiv}>
            {!props.loadingModal ? (
                <div id="loading" ref={loadingDiv}>
                    <img src="./widgets/valcon/reactarcgis/assets/custom/loading.gif" />
                </div>
            ) : null}
        </div>
    );
});

export default ArcGISContainer;
