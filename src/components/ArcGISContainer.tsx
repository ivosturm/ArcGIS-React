/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { useRef, useEffect, useState, createElement, memo } from "react";
import { ObjectItem, ListValue, ListAttributeValue, ListActionValue, DynamicValue, WebIcon } from "mendix";
import Expand from "@arcgis/core/widgets/Expand";
import Basemap from "@arcgis/core/Basemap";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import { whenTrue, whenFalse } from "@arcgis/core/core/watchUtils";
import { union } from "@arcgis/core/geometry/geometryEngineAsync";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Layer from "@arcgis/core/layers/Layer";
import IdentityManager from "@arcgis/core/identity/IdentityManager";
import PortalItem from "@arcgis/core/portal/PortalItem";
import Legend from "@arcgis/core/widgets/Legend";
import Search from "@arcgis/core/widgets/Search";
import LayerList from "@arcgis/core/widgets/LayerList";
import Sketch from "@arcgis/core/widgets/Sketch";
import { GisObject, position, logNode } from "../ReactArcGIS";
import _createQueryDefinitions, { determineIndex, selectFeatures, zoomToGraphics } from "../utils/Utils";
import { createCustomContent, _addButtonToActionArray } from "../utils/PopupUtils";
import {
    CsDefaultArrayType,
    CsLegendEntriesArrayType,
    IntAttributesArrayType,
    LayerArrayType,
    LayerServerTypeEnum
} from "../../typings/ReactArcGISProps";
import Graphic from "@arcgis/core/Graphic";
import { RefreshObject, toggleClearSelectionStyling, _updateMxReferences } from "../utils/SketchUtils";
import { createLegendUniqueValueRender } from "../utils/CustomStylingUtils";

export interface ArcGISContainerProps {
    APIKey: string;
    onLoad: (isLoaded: boolean, view: MapView) => void;
    mapWidth: number;
    mapHeight: number;
    baseMapID: string;
    defaultZoom: number;
    objectZoom: number;
    defaultLocation: number[];
    mxObjects?: ListValue;
    tokenObjects?: ListValue;
    tokenAttr?: ListAttributeValue<string>;
    userIdAttr?: ListAttributeValue<string>;
    expiryDateAttr?: ListAttributeValue<Date>;
    dynLayerObjects?: ListValue;
    dynLayerLayerIDAttr?: ListAttributeValue<string>;
    dynLayerServerTypeAttr?: ListAttributeValue<string>;
    dynLayerStaticURLAttr?: ListAttributeValue<string>;
    dynLayerObjectIDAttr?: ListAttributeValue<string>;
    dynLayerVisibilityOnLoadAttr?: ListAttributeValue<boolean>;
    dynLayerCustomStylingEnabledAttr?: ListAttributeValue<boolean>;
    dynLayerClusteringEnabledAttr?: ListAttributeValue<boolean>;
    dynLayerMendixObjectsAttr?: ListAttributeValue<boolean>;
    // eslint-disable-next-line no-undef
    objectIDAttr: ListAttributeValue<BigJs.Big | string>;
    // eslint-disable-next-line no-undef
    layerIDAttr: ListAttributeValue<BigJs.Big | string>;
    colorAttr?: ListAttributeValue<string>;
    sizeAttr?: ListAttributeValue<BigJs.Big>;
    symbolAttr?: ListAttributeValue<string>;
    csLegendTypeAttr?: ListAttributeValue<string>;
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
    sketchEnabled: boolean;
    sketchReversalEnabled: boolean;
    sketchLayerID: string;
    sketchPosition: position;
    sketchPlaceHolderIndex: number;
    sketchParentObject?: ListValue;
    sketchParentAssociationName: string;
    // filterOptions: FilterOption[];
    layerArray: LayerArrayType[];
    intAttributesArray: IntAttributesArrayType[];
    intMendixXPathStringr: string;
    intButtonAction?: ListActionValue;
    intButtonLabel: string;
    intButtonClass: string;
    intButtonIcon?: DynamicValue<WebIcon>;
    intButtonActionTwo?: ListActionValue;
    intButtonLabelTwo: string;
    intButtonClassTwo: string;
    intButtonIconTwo?: DynamicValue<WebIcon>;
    intButtonActionThree?: ListActionValue;
    intButtonLabelThree: string;
    intButtonClassThree: string;
    intButtonIconThree?: DynamicValue<WebIcon>;
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

export interface SketchHistoryStep {
    gisObjectsRemovedFromRef: GisObject[];
    mxObjectsRemovedFromRef: ObjectItem[];
    mxObjectsRemovedClientAPI: mendix.lib.MxObject[];
}

const ArcGISContainer = memo((props: ArcGISContainerProps) => {
    const [queryDefinitions] = useState<QueryDefinition[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(props.isLoaded);
    const [view, setView] = useState<MapView>(props.view);
    let [gisObjects] = useState<GisObject[]>([]);
    const [mendixLayer] = useState<LayerArrayType>();
    const mendixLayerRef = useRef(mendixLayer);
    const [mendixLayerAttr] = useState<IntAttributesArrayType[]>([]);
    const mendixLayerAttrRef = useRef(mendixLayerAttr);
    const [mxObjects, setMxObjects] = useState<ObjectItem[]>([]);
    const [highlights] = useState<any[]>([]);
    const gisObjectsRef = useRef(gisObjects);
    const mxObjectsRef = useRef(mxObjects);
    const [parentMxObject] = useState<ObjectItem>();
    const parentMxObjectRef = useRef(parentMxObject);
    const [sketchHistory] = useState<SketchHistoryStep[]>([]);
    const sketchHistoryRef = useRef(sketchHistory);
    const [legend] = useState<Legend>();
    const legendRef = useRef(legend);
    // console.debug(logNode + "constructing ArcGISContainer");
    // see: https://stackoverflow.com/questions/58017215/what-typescript-type-do-i-use-with-useref-hook-when-setting-current-manually
    const mapDiv = useRef<HTMLDivElement | null>(null);
    const loadingDiv = useRef<HTMLDivElement | null>(null);

    // console.warn(logNode + " isLoaded from state: " + isLoaded);

    let token = "";
    let userId = "";
    let expiryDateTime = 7200;

    // only load token and dynamic layers at first render!
    if (!isLoaded) {
        if (props.tokenObjects && props.tokenObjects.items) {
            // console.debug(logNode + "token source:");
            // console.dir(props.tokenObjects);
            // eslint-disable-next-line array-callback-return
            props.tokenObjects.items.map(tokenObj => {
                if (props.tokenAttr && props.userIdAttr && props.expiryDateAttr) {
                    // @ts-ignore
                    token = String(props.tokenAttr.get(tokenObj).value);
                    // @ts-ignore
                    userId = String(props.userIdAttr.get(tokenObj).value);
                    // From ArcGIS docs: Token expiration time specified as number of milliseconds since 1 January 1970 00:00:00 UTC.
                    // @ts-ignore
                    expiryDateTime = Number(props.expiryDateAttr.get(tokenObj).value);
                }
            });
        }

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

        mendixLayerRef.current = props.layerArray.filter(layer => {
            return layer.mendixLayer;
        })[0];

        mendixLayerAttrRef.current = props.intAttributesArray.filter(intAttributes => {
            return (
                mendixLayerRef &&
                mendixLayerRef.current &&
                intAttributes.intAttributeLayerID === mendixLayerRef.current.layerID
            );
        });
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
            if (props.sketchParentObject && props.sketchParentObject.items) {
                // save parent Mx Object for later usage
                // eslint-disable-next-line array-callback-return
                props.sketchParentObject.items.map(parentObject => {
                    parentMxObjectRef.current = parentObject;
                    // console.debug(logNode + "data source guid of parent: " + parentMxObjectRef.current.id.toString());
                });
            }
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
                let legendName = "other";
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
                if (props.csLegendTypeAttr) {
                    // @ts-ignore
                    legendName = String(props.csLegendTypeAttr.get(mxObject).value);
                }
                const gisObject = {
                    ID,
                    layerID,
                    color,
                    legendName,
                    mxGuid: mxObject.id,
                    size,
                    symbol
                } as GisObject;
                newGisObjects.push(gisObject);
            });
        }
        /* console.dir(mxObjectsRef.current);
        console.dir(newMxObjects);
        console.dir(gisObjectsRef.current);
        console.dir(newGisObjects);*/

        if (isLoaded) {
            if (newMxObjects.length !== mxObjectsRef.current.length) {
                console.debug(
                    logNode +
                        "setting mxObjects because amount of objects changed from " +
                        mxObjectsRef.current.length +
                        " to " +
                        newGisObjects.length
                );
            } else if (mxObjectsRef.current.length === newMxObjects.length && newMxObjects.length === 1) {
                if (mxObjects[0].id !== newMxObjects[0].id) {
                    console.debug(logNode + "setting mxObjects because guid changed");
                }
            } else {
                console.debug(
                    logNode + "setting " + newMxObjects.length + "mxObjects but no apparent object change..."
                );
            }
            gisObjects = newGisObjects;
            gisObjectsRef.current = gisObjects;
            mxObjectsRef.current = newMxObjects;
            setMxObjects(newMxObjects);
        }
        if (!isLoaded) {
            console.debug(logNode + "useEffect hook triggered on initial load!");
            // esriConfig.apiKey = props.APIKey;*/
            /**
             * Create the ArcGIS token and subscribe to Esri identity manager, so in every call to ArcGIS
             * This token is appended
             */
            const arcGISToken = {
                server: "https://offerd-clients.maps.arcgis.com/sharing/rest",
                userId,
                token,
                ssl: true,
                expires: expiryDateTime
            };

            IdentityManager.registerToken(arcGISToken);

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

                // display the loading indicator when the view is updating
                whenTrue(view, "updating", () => {
                    if (loadingDiv.current) {
                        loadingDiv.current.style.visibility = "";
                    }
                    // console.error(logNode + "updating..");
                });
                // hide the loading indicator when the view stops updating
                whenFalse(view, "updating", () => {
                    if (loadingDiv.current) {
                        loadingDiv.current.style.visibility = "hidden";
                    }
                    // console.error(logNode + "updating done..");
                });

                // let filterOptionAdded = false;
                const promises: Array<Promise<any>> = [];
                props.layerArray.forEach(layerObj => {
                    console.debug(logNode + "processing " + layerObj.layerServerType + " : " + layerObj.layerID);
                    if (layerObj.layerServerType === "FeatureServer" || layerObj.layerServerType === "MapServer") {
                        const layerID = layerObj.layerID;
                        // console.debug(logNode + "start building layer: " + layerID);
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
                        const actionArray: any[] = [];
                        _addButtonToActionArray(
                            1,
                            props.intButtonIcon,
                            props.intButtonLabel,
                            props.intButtonClass,
                            actionArray,
                            layerID
                        );
                        _addButtonToActionArray(
                            2,
                            props.intButtonIconTwo,
                            props.intButtonLabelTwo,
                            props.intButtonClassTwo,
                            actionArray,
                            layerID
                        );
                        _addButtonToActionArray(
                            3,
                            props.intButtonIconThree,
                            props.intButtonLabelThree,
                            props.intButtonClassThree,
                            actionArray,
                            layerID
                        );
                        let featureLayerSettings = {};
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
                                legendEnabled,
                                popupTemplate: {
                                    title: "{" + inAttributeTitle + "}",
                                    outFields: ["*"],
                                    content: (feature: any) => {
                                        if (mendixLayerRef && mendixLayerRef.current) {
                                            return createCustomContent(
                                                feature,
                                                mendixLayerAttrRef.current,
                                                mendixLayerRef.current,
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

                        webMap.add(featureLayer, determineIndex(layerObj));
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
                            const promiseLayer = new Promise(resolve => {
                                view.whenLayerView(featureLayer).then(layerView => {
                                    // console.debug(logNode + "featurelayer " + layerView.layer.id + " ready loading!");
                                    if (props.sketchEnabled && props.sketchLayerID === layerObj.layerID) {
                                        const graphicsLayer = new GraphicsLayer();
                                        // create a new sketch widget and set its layer
                                        const sketch = new Sketch({
                                            view,
                                            layer: graphicsLayer,
                                            creationMode: "single",
                                            visibleElements: {
                                                createTools: {
                                                    point: false,
                                                    circle: false
                                                },
                                                selectionTools: {
                                                    "lasso-selection": true
                                                }
                                            }
                                        });
                                        // add the select by rectangle button the view
                                        view.ui.add("select-by-lasso", props.sketchPosition);
                                        const selectButton = document.getElementById("select-by-lasso");
                                        // click event for the select by rectangle button
                                        if (selectButton) {
                                            selectButton.addEventListener("click", () => {
                                                // view.popup.close();
                                                sketch.create("polygon", { mode: "freehand" });
                                            });
                                        }
                                        // Once user is done drawing a rectangle on the map
                                        // use the rectangle to select features on the map and table
                                        sketch.on("create", async event => {
                                            if (event.state === "complete") {
                                                // this polygon will be used to query features that intersect it
                                                const geometries = graphicsLayer.graphics.map(graphic => {
                                                    return graphic.geometry;
                                                });
                                                const queryGeometry = await union(geometries.toArray());
                                                selectFeatures(layerView, queryGeometry).then(result => {
                                                    const graphics = result.features;
                                                    const gisObjectsSelected: GisObject[] = [];
                                                    // really need to use Ref here, else will possibly get previous version of gisObject
                                                    // get all GisObjects already loaded
                                                    graphics.forEach((graphic: Graphic) => {
                                                        gisObjectsRef.current.forEach((gisObj: GisObject) => {
                                                            if (layerObj.clientIDAttr && layerObj.clientIDAttr !== "") {
                                                                if (
                                                                    gisObj.ID ===
                                                                    graphic.attributes[layerObj.clientIDAttr]
                                                                ) {
                                                                    gisObjectsSelected.push(gisObj);
                                                                    /* console.debug("matched on client ID");
                                                                    console.debug(
                                                                        "gisObj.ID=" +
                                                                            gisObj.ID +
                                                                            " / graphic client ID=" +
                                                                            graphic.attributes[layerObj.clientIDAttr]
                                                                    );*/
                                                                }
                                                            } else {
                                                                if (
                                                                    gisObj.ID ===
                                                                    graphic.attributes[layerObj.objectIDAttr]
                                                                ) {
                                                                    /* console.debug("matched on Object ID");
                                                                    console.debug(
                                                                        "gisObj.ID=" +
                                                                            gisObj.ID +
                                                                            " / graphic Object ID=" +
                                                                            graphic.attributes[layerObj.objectIDAttr]
                                                                    );*/
                                                                    gisObjectsSelected.push(gisObj);
                                                                }
                                                            }
                                                        });
                                                    });
                                                    if (gisObjectsSelected.length > 0) {
                                                        const guidArraySelected: string[] = [];
                                                        gisObjectsSelected.forEach((gisObject: GisObject) => {
                                                            guidArraySelected.push(gisObject.mxGuid);
                                                        });
                                                        if (props.sketchParentObject && parentMxObjectRef.current) {
                                                            const guidArrayAll: string[] = [];
                                                            // look for all mx object ids which reference to data view need to be removed
                                                            gisObjectsRef.current.forEach((gisObject: GisObject) => {
                                                                guidArrayAll.push(gisObject.mxGuid);
                                                            });
                                                            const guidArrayNotSelected: string[] = guidArrayAll.filter(
                                                                n => !guidArraySelected.includes(n)
                                                            );
                                                            // also store GisObjects removed by selection to being able to revert again
                                                            const gisObjectsToBeRemoved: GisObject[] = gisObjectsRef.current.filter(
                                                                n => !gisObjectsSelected.includes(n)
                                                            );
                                                            const parentMxGuid = parentMxObjectRef.current.id.toString();

                                                            _updateMxReferences(
                                                                props.sketchParentAssociationName,
                                                                guidArrayNotSelected,
                                                                true,
                                                                parentMxGuid
                                                            )
                                                                .catch(errorMessage => {
                                                                    console.error(
                                                                        logNode +
                                                                            "mx.data.get failed! Error: " +
                                                                            errorMessage
                                                                    );
                                                                })
                                                                .then(objs => {
                                                                    const newMxObjects: ObjectItem[] = [];
                                                                    mxObjectsRef.current.forEach(mxObject => {
                                                                        guidArraySelected.forEach(guidSelected => {
                                                                            if (
                                                                                mxObject.id.toString() === guidSelected
                                                                            ) {
                                                                                newMxObjects.push(mxObject);
                                                                            }
                                                                        });
                                                                    });
                                                                    const mxObjectsToBeRemovedFromRef: ObjectItem[] = mxObjectsRef.current.filter(
                                                                        n => !newMxObjects.includes(n)
                                                                    );

                                                                    // if sketch history exists, add current state
                                                                    if (
                                                                        sketchHistoryRef.current &&
                                                                        objs instanceof Object
                                                                    ) {
                                                                        // add situation before sketching to history so it can be reverted
                                                                        const newSketchHistoryStep: SketchHistoryStep = {
                                                                            gisObjectsRemovedFromRef: gisObjectsToBeRemoved,
                                                                            mxObjectsRemovedFromRef: mxObjectsToBeRemovedFromRef,
                                                                            mxObjectsRemovedClientAPI: objs
                                                                        };
                                                                        sketchHistoryRef.current.push(
                                                                            newSketchHistoryStep
                                                                        );
                                                                        console.debug(
                                                                            logNode +
                                                                                "Added sketchHistory step. Now " +
                                                                                sketchHistoryRef.current.length +
                                                                                " history steps available!"
                                                                        );
                                                                        console.dir(newSketchHistoryStep);
                                                                        if (sketchHistoryRef.current.length === 1) {
                                                                            toggleClearSelectionStyling(true);
                                                                        }
                                                                    }
                                                                    gisObjects = gisObjectsSelected;
                                                                    RefreshObject(parentMxGuid);
                                                                });
                                                        }
                                                    }
                                                });
                                                // rectangle is added to graphicslayer. Needs to be removed if user wants to draw rectangle again
                                                graphicsLayer.graphics.removeAll();
                                            }
                                        });

                                        // add the clear selection button to the view
                                        view.ui.add("clear-selection", props.sketchPosition);
                                        const clearSelectButton = document.getElementById("clear-selection");
                                        // click event for the select by rectangle button
                                        if (clearSelectButton) {
                                            clearSelectButton.addEventListener("click", () => {
                                                const lastSketchHistoryObject = sketchHistoryRef.current.slice(-1)[0];
                                                if (
                                                    lastSketchHistoryObject &&
                                                    parentMxObjectRef &&
                                                    parentMxObjectRef.current
                                                ) {
                                                    console.debug(
                                                        logNode +
                                                            "Reverting to last sketchHistory step, restoring association for " +
                                                            lastSketchHistoryObject.mxObjectsRemovedFromRef.length +
                                                            " mx objects. Now " +
                                                            sketchHistoryRef.current.length +
                                                            " history steps available! Full history object used for reverting:"
                                                    );
                                                    console.dir(lastSketchHistoryObject);
                                                    if (lastSketchHistoryObject && parentMxObjectRef.current) {
                                                        const parentMxGuid = parentMxObjectRef.current.id.toString();

                                                        const mxObjectsRefArrayPreviouslyRemoved =
                                                            lastSketchHistoryObject.mxObjectsRemovedFromRef;
                                                        const mxObjectsClientAPIPreviouslyRemoved =
                                                            lastSketchHistoryObject.mxObjectsRemovedClientAPI;
                                                        const guidArraySelected: string[] = [];
                                                        mxObjectsClientAPIPreviouslyRemoved.forEach(mxObjectRemoved => {
                                                            guidArraySelected.push(mxObjectRemoved.getGuid());
                                                        });

                                                        _updateMxReferences(
                                                            props.sketchParentAssociationName,
                                                            guidArraySelected,
                                                            false,
                                                            parentMxGuid
                                                        )
                                                            .catch(errorMessage => {
                                                                console.error(
                                                                    logNode +
                                                                        "mx.data.get failed! Error: " +
                                                                        errorMessage
                                                                );
                                                            })
                                                            .then(() => {
                                                                // once references are added again, update Refs and refresh parent object to trigger a page refresh
                                                                const gisObjectsArrayCurrent = gisObjectsRef.current;
                                                                const gisObjectsArrayPreviouslyRemoved =
                                                                    lastSketchHistoryObject.gisObjectsRemovedFromRef;
                                                                gisObjectsArrayPreviouslyRemoved.forEach(
                                                                    gisObjectRemoved => {
                                                                        gisObjectsArrayCurrent.push(gisObjectRemoved);
                                                                    }
                                                                );
                                                                // revert to previous MxObjectsRef
                                                                const mxObjectsArrayCurrent = mxObjectsRef.current;

                                                                mxObjectsRefArrayPreviouslyRemoved.forEach(
                                                                    mxObjectRemoved => {
                                                                        mxObjectsArrayCurrent.push(mxObjectRemoved);
                                                                    }
                                                                );
                                                                gisObjects = gisObjectsArrayCurrent;

                                                                // remove last history step from Ref
                                                                sketchHistoryRef.current = sketchHistoryRef.current.slice(
                                                                    0,
                                                                    sketchHistoryRef.current.length - 1
                                                                );
                                                                // if no history left, disable revert selection icon
                                                                if (sketchHistoryRef.current.length === 0) {
                                                                    toggleClearSelectionStyling(false);
                                                                }
                                                            });
                                                    }
                                                }
                                            });
                                        }
                                    }
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
                            webMap.add(layer, determineIndex(layerObj));
                            layer.visible = layerObj.visibilityOnLoad;
                            // add the portal item to the legend. loading of portal item typically finishes AFTER legend was already loaded, hence need to update via useRef hook
                            if (legendRef && legendRef.current) {
                                // get title from portalitem. use get, since TypeScript layer doesn't recognize optional object
                                const portalItem: any = layer.get("portalItem");
                                const title = portalItem.title;
                                legendRef.current.layerInfos.push({
                                    layer,
                                    title
                                });
                            }
                        });
                    }
                });

                Promise.all(promises).then(() => {
                    console.debug(logNode + "all layerViews loaded, zooming to graphics now..");
                    if (gisObjects && gisObjects.length && gisObjects.length > 0) {
                        zoomToGraphics(view, gisObjects, queryDefinitions, props, highlights);
                    }
                });

                // Event handler that fires each time an action is clicked.
                view.popup.on("trigger-action", event => {
                    // console.dir(event.action);
                    // get identifier of grapic in layer
                    // console.debug(logNode + " selected feature from popup:");
                    // console.dir(view.popup.selectedFeature);
                    if (mxObjectsRef.current && mendixLayerRef.current) {
                        const graphicID = view.popup.selectedFeature.getAttribute(mendixLayerRef.current.clientIDAttr);
                        // console.debug("mxObjectsRef.current");
                        // console.dir(mxObjectsRef.current);
                        const mxObject = mxObjectsRef.current.filter(mxObject => {
                            // console.debug("Mendix Object Value:" + String(props.objectIDAttr(mxObject).value));
                            // console.debug("ÄrcGIS Graphic value:" + String(graphicID));
                            // @ts-ignore
                            return String(props.objectIDAttr.get(mxObject).value) === String(graphicID);
                        })[0];
                        // console.debug("mxObject");
                        // console.dir(mxObject);
                        // Execute the measureThis() function if the measure-this action is clicked
                        if (
                            event.action.id === "pop-mx-action-1-" + mendixLayerRef.current.layerID ||
                            event.action.id === "pop-mx-action-2-" + mendixLayerRef.current.layerID ||
                            event.action.id === "pop-mx-action-3-" + mendixLayerRef.current.layerID
                        ) {
                            if (mxObject && props.intButtonAction) {
                                console.debug(
                                    logNode +
                                        "triggering on click action for graphic with id " +
                                        graphicID +
                                        " of layer " +
                                        mendixLayerRef.current.layerID
                                );
                                if (event.action.id === "pop-mx-action-1-" + mendixLayerRef.current.layerID) {
                                    // @ts-ignore
                                    props.intButtonAction.get(mxObject).execute();
                                } else if (event.action.id === "pop-mx-action-2-" + mendixLayerRef.current.layerID) {
                                    // @ts-ignore
                                    props.intButtonActionTwo.get(mxObject).execute();
                                } else if (event.action.id === "pop-mx-action-3-" + mendixLayerRef.current.layerID) {
                                    // @ts-ignore
                                    props.intButtonActionThree.get(mxObject).execute();
                                }
                            }
                        } else {
                            console.debug(
                                logNode + event.action.id + " clicked with Mendix Context Object ID: " + mxObject.id
                            );
                        }
                    }
                });

                view.when(() => {
                    // get the first layer in the collection of operational layers in the WebMap
                    // when the resources in the MapView have loaded.
                    const webLayers = webMap.layers;
                    const layerInfos: any[] = [];
                    let featureLayerMendix: any = {};
                    // TODO: 20210905 - Ivo Sturm: getting the Mendix layer should not be needed anymore if we store layerInfos in cache.
                    webLayers.forEach(webLayer => {
                        // console.debug(logNode + featureLayer.title);
                        // console.dir(featureLayer);
                        const layerMendix = props.layerArray.filter(layer => {
                            // console.debug(logNode + layer.layerServerType + " : " + layer.layerID);
                            if (layer.layerServerType === "FeatureServer" || layer.layerServerType === "MapServer") {
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
                            // if Mendix representation of Layer found and layer is marked as Mendix Layer, store layer!
                            if (layerMendix.mendixLayer) {
                                featureLayerMendix = webLayer;
                            }
                            // for a portalItem get the name from the Portal Item itself insted of from Mendix
                            if (layerMendix.layerServerType === "PortalItem") {
                                const portalItem: any = webLayer.get("portalItem");
                                title = portalItem.title;
                                // for a PortalItem, the layer needs to be loaded first to get access to the legend
                                webLayer.visible = layerMendix.visibilityOnLoad;
                                console.error(
                                    logNode + title + "setting visibility on load to:" + layerMendix.visibilityOnLoad
                                );
                            }
                        }
                        // custom styling uses Mendix attribute and UniqueValueRenderer. Since we need objectid field it will generate duplicate entries
                        else {
                            // dummy legend layer used for showing legend for layers with custom styling
                            title = webLayer.title;
                        }
                        layerInfos.push({
                            layer: webLayer,
                            title: webLayer.title,
                            hideLayers: []
                        });
                    });
                    if (props.legendEnabled) {
                        if (webLayers) {
                            const legend = new Legend({
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
                            // store legend as ref so it can later on be updated easily, for instance once the portalitems have loaded. This happens AFTER loading of the view, so once Legend has already loaded
                            legendRef.current = legend;
                        }
                    }
                    if (props.searchEnabled) {
                        // get the first layer in the collection of operational layers in the WebMap
                        // when the resources in the MapView have loaded.
                        const sources = [
                            {
                                layer: featureLayerMendix,
                                placeholder: "Property Name",
                                maxResults: 5,
                                exactMatch: false,
                                searchFields: ["col_2", "col_3"],
                                suggestionsEnabled: true,
                                suggestionTemplate: "{col_2}, {col_3}",
                                name: "Property Search"
                            }
                        ];

                        const searchWidget = new Search({
                            view,
                            sources,
                            activeSourceIndex: 1
                        });

                        searchWidget.defaultSources.forEach(defaultSource => {
                            defaultSource.name = "Address Search";
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
                });
                // add view to parent state, so it can be accessed after reload of parent
                gisObjects = newGisObjects;
                gisObjectsRef.current = gisObjects;
                mxObjectsRef.current = newMxObjects;
                props.onLoad(true, view);
                setIsLoaded(true);
                setView(view);
                setMxObjects(mxObjects);
            }
        } else {
            console.debug(logNode + "useEffect hook triggered after initial load!");
            if (view) {
                // if at initial load no mxobjects where available, possible in listen to grid scenario
                // then querydefinitions needs to be built still
                // generate query definitions for all layers based on loaded mx objects
                if (queryDefinitions.length === 0) {
                    _createQueryDefinitions(queryDefinitions, props.layerArray, gisObjects);
                }
                // after intial load, only zoom to objects since all setup should already be done at initial load
                zoomToGraphics(view, gisObjects, queryDefinitions, props, highlights);
            }
        }
    }, [queryDefinitions, props.mxObjects, highlights]);
    return (
        <div className="mapDiv" ref={mapDiv}>
            <div id="loading" ref={loadingDiv}>
                <img src="./widgets/first consulting/reactarcgis/assets/custom/loading.gif" />
            </div>
            {props.sketchEnabled ? (
                <div>
                    <div
                        id="select-by-lasso"
                        className="esri-widget esri-widget--button esri-widget esri-interactive"
                        title="Select features by lasso"
                    >
                        <span className="esri-icon-lasso"></span>
                    </div>
                    {props.sketchReversalEnabled ? (
                        <div
                            id="clear-selection"
                            className="esri-widget esri-widget--button esri-widget esri-interactive disabled"
                            title="Undo selection"
                            style={{ backgroundColor: "#DDD", cursor: "default" }}
                        >
                            <span className="esri-icon-undo"></span>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
});

export default ArcGISContainer;
