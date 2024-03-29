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
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle"
import Legend from "@arcgis/core/widgets/Legend";
import Search from "@arcgis/core/widgets/Search";
import LayerList from "@arcgis/core/widgets/LayerList";
import { GisObject, position, logNode } from "../ReactArcGIS";
import _createQueryDefinitions, { createLoadingIndicators, loadLayer, zoomToGraphics } from "../utils/Utils";
import {
    CsDefaultArrayType,
    CsLegendEntriesArrayType,
    IntAttributesArrayType,
    LayerArrayType,
    LayerServerTypeEnum
} from "../../typings/ReactArcGISProps";
import ServerInfo from "@arcgis/core/identity/ServerInfo";
import IdentityManager from "@arcgis/core/identity/IdentityManager";

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
    loadingBehavior: string;
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
    authPortalURL: string;
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

export interface FieldInfo {
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
    const [blockProgressModal] = useState<boolean>(false);
    const blockProgressModalRef = useRef(blockProgressModal); 

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
		let objectChange = false;
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
			const messagePostfix = "Amount of objects changed from " + mxObjectsRef.current.length + " to " + newGisObjects.length 
            // there are 3 scenario's which should trigger a reload
            // scenario 1: object amount changed
            if (newMxObjects.length !== mxObjectsRef.current.length) {
                console.debug(logNode + "reloading scenario 1: " + messagePostfix);
                objectChange = true;
            } else if (mxObjectsRef.current.length === newMxObjects.length && newMxObjects.length >= 1) {
                // Same amount of ojects after reload
                // scenario 2/3: check if object changes, so if ID's and appearance (color, size, symbol) are still the same
                for (var i = 0; i <  newGisObjects.length ; i++) {
                    const gisObjectFound = gisObjectsRef.current.filter(oldGisObject => 
                        oldGisObject.ID === newGisObjects[i].ID && 
                        oldGisObject.color === newGisObjects[i].color &&
                        oldGisObject.size === newGisObjects[i].size &&
                        oldGisObject.symbol=== newGisObjects[i].symbol
                    )
                    if (gisObjectFound.length === 0){
                        objectChange = true;
                        console.debug(logNode + "reloading scenario 2/3: " + messagePostfix +  " (amount of objects same but id's or appearance changed)");
                        break;
                    }
                }
            }
			if (!objectChange){
                console.debug(logNode + "reloading scenario 4: " + messagePostfix + " (no object amount, id,nor appearance changed. No new zooming... )"); 
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
            let serverInfo = new ServerInfo();
            serverInfo.server = props.authPortalURL;
            serverInfo.tokenServiceUrl = props.authPortalURL + "/arcgis/tokens/generateToken";
            serverInfo.hasServer = true;
            IdentityManager.registerServers([serverInfo]);
            
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
                createLoadingIndicators(view,props.loadingBehavior,props.loadingModalMessage,progressIdRef,loadingDiv, blockProgressModalRef);

                const mendixLayerpromises: Array<Promise<any>> = [];
                const mendixLayers = props.layerArray.filter(layer => {
                    return layer.mendixLayer;
                });
                // load Mendix layers first
                mendixLayers.forEach(mendixLayerObj => {
                    loadLayer(props, mendixLayerObj, queryDefinitions, mendixLayersRef, webMap, view, mendixLayerpromises);
                });
                // and trigger zooming for Mendix layers
                Promise.all(mendixLayerpromises).then(() => {
                    console.debug(logNode +"Initial load: all Mendix Layer views loaded");
                    if (gisObjects && gisObjects.length && gisObjects.length > 0) {
                        const zoomDonePromise = zoomToGraphics(view, gisObjects, queryDefinitions, props, highlights);
                        zoomDonePromise.then(()=> {
                            console.debug(logNode +"Initial load: Zoomed to Mendix objects, blocking loading indicator and loading other layers now...")
                            blockProgressModalRef.current = true;
                            if (progressIdRef && progressIdRef.current){
                                mx.ui.hideProgress(progressIdRef.current);
                                progressIdRef.current = undefined;
                            }
                            
                            // and afterwards load other layers
                            const otherLayers = props.layerArray.filter(layer => {
                                return !layer.mendixLayer;
                            });
                            if (otherLayers.length > 0) {
                                const otherLayerpromises: Array<Promise<any>> = [];
                                otherLayers.forEach(otherLayerObj => {
                                    loadLayer(props, otherLayerObj, queryDefinitions, mendixLayersRef, webMap, view, otherLayerpromises);
                                });
                                Promise.all(otherLayerpromises).then(() => {
                                    console.debug(logNode +"Initial load: all other layer views loaded, removing block on loading indicator...");
                                    blockProgressModalRef.current = false;
                                });
                            } else {
                                console.debug(logNode +"Initial load: no other layers than Mendix layers, removing block on loading indicator...");
                                blockProgressModalRef.current = false;
                            }
                        })
                    }
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
        } else if (objectChange) {
            console.debug(logNode + "useEffect hook triggered after initial load with object change!");
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
            {props.loadingBehavior === "animatedGIF" ? (
                <div id="loading" ref={loadingDiv}>
                    <img src="./widgets/valcon/reactarcgis/assets/custom/loading.gif" />
                </div>
            ) : null}
        </div>
    );
});

export default ArcGISContainer;
