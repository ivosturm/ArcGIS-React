import { Component, ReactNode, createElement } from "react";
import { ValueStatus } from "mendix";
import ArcGISContainer from "./components/ArcGISContainer";
import esriConfig from "@arcgis/core/config.js";

import { ReactArcGISContainerProps } from "../typings/ReactArcGISProps";

import "./ui/ReactArcGIS.css";
import MapView from "@arcgis/core/views/MapView";
import Legend from "@arcgis/core/widgets/Legend";

export type position =
    | "bottom-leading"
    | "bottom-left"
    | "bottom-right"
    | "bottom-trailing"
    | "top-leading"
    | "top-left"
    | "top-right"
    | "top-trailing"
    | "manual";

export const logNode = "React ArcGIS Widget: ";

interface ArcGISContainerProps extends ReactArcGISContainerProps {
    gisObjects: GisObject[];
}

interface ArcGISContainerState {
    isLoaded: boolean;
    view: MapView;
    legend: Legend;
}

// ID field can either be client specific ID (if filled in) or ObjectId
export interface GisObject {
    mxGuid: any;
    ID: number | string;
    layerID: string;
    color: string;
    size: number;
    symbol: string;
    center: number[];
    query: string;
}

export default class ReactArcGIS extends Component<ArcGISContainerProps, ArcGISContainerState> {
    constructor(props: ArcGISContainerProps) {
        super(props);
        this.state = { isLoaded: false, view: {} as MapView, legend: {} as Legend };
    }
    shouldComponentUpdate(nextProps: ArcGISContainerProps, nextState: ArcGISContainerState): boolean {
        // no changes, no reload!
        if (nextState === this.state && nextProps === this.props) {
            console.debug(logNode + "state nor props changed! No rerendering...");
            return false;
        } // props changes, reload only if all configured objects are actually available!
        else if (nextState === this.state && nextProps !== this.props) {
            if (
                ((nextProps.graphicObjects?.status === "available" && nextProps.graphicObjects?.items) ||
                    nextProps.graphicObjects?.status === "unavailable" ||
                    !this.props.graphicObjects) &&
                ((nextProps.dynLayerObject?.status === "available" && nextProps.dynLayerObject?.items) ||
                    nextProps.dynLayerObject?.status === "unavailable" ||
                    !this.props.dynLayerObject)
            ) {
                console.debug(logNode + "props changed, all configured objects now done loading. Rerendering...");
                return true;
            } else {
                console.debug(
                    logNode + "props changed, one, multiple or all configured objects not fully loaded yet. Waiting..."
                );
                return false;
            }
        } // state changed, don't reload if only map was added to state!
        else if (nextState !== this.state && nextProps === this.props) {
            if (!this.state.isLoaded && nextState.isLoaded) {
                console.debug(logNode + "state isLoaded changed!");
                return false;
            } else {
                console.debug(logNode + "state changed!");
                return true;
            }
        } else if (nextState !== this.state && nextProps !== this.props) {
            console.debug(logNode + "state and props changed!");
            return true;
        } // shouldn't occur
        else {
            return false;
        }
    }
    setLoaded(isLoaded: boolean, view: MapView, legend: Legend): void {
        console.debug(logNode + "setting isLoaded on widget to: " + isLoaded);
        this.setState({ isLoaded, view, legend });
    }
    mapPosition(positionSource: string): position {
        if (positionSource === "bottomLeft") {
            return "bottom-left";
        } else if (positionSource === "topLeft") {
            return "top-left";
        } else if (positionSource === "topRight") {
            return "top-right";
        } else if (positionSource === "bottomRight") {
            return "bottom-right";
        }
        return "bottom-right";
    }
    render(): ReactNode {
        // make known to esri where local assests / js files are stored
        esriConfig.assetsPath = "./widgets/valcon/reactarcgis/assets";
        const legendPosition = this.mapPosition(this.props.legendPosition);
        const searchPosition = this.mapPosition(this.props.searchPosition);
        const toggleLayerPosition = this.mapPosition(this.props.toggleLayerPosition);
        const datasource = this.props.graphicObjects;
        const dynLayerSource = this.props.dynLayerObject;

        // show loading div if objects are still loading hence not available yet
        if (!datasource || datasource.status !== ValueStatus.Available || !datasource.items) {
            if (datasource?.status !== ValueStatus.Unavailable) {
                return <div>Loading...</div>;
            }
        }

        if (dynLayerSource) {
            if (dynLayerSource.status !== ValueStatus.Available || !dynLayerSource.items) {
                if (dynLayerSource?.status !== ValueStatus.Unavailable) {
                    return <div>Loading...</div>;
                }
            }
        }

        return (
            <div>
                <ArcGISContainer
                    onLoad={(isLoaded: boolean, view: MapView, legend: Legend) => {
                        this.setLoaded(isLoaded, view, legend);
                    }}
                    mapHeight={this.props.mapHeight}
                    mapWidth={this.props.mapWidth}
                    baseMapID={this.props.baseMapID}
                    defaultZoom={this.props.defaultZoom}
                    objectZoom={this.props.singleObjectZoom}
                    defaultLocation={[this.props.defaultX, this.props.defaultY]}
                    mxObjects={datasource}
                    objectIDAttr={this.props.objectIDAttr}
                    layerIDAttr={this.props.layerIDAttr}
                    colorAttr={this.props.colorAttr}
                    sizeAttr={this.props.sizeAttr}
                    symbolAttr={this.props.symbolAttr}
                    dsShowAllObjects={this.props.dsShowAllObjects}
                    dsHighlightingEnabled={this.props.dsHighlightingEnabled}
                    csDefaultArray={this.props.csDefaultArray}
                    csLegendEntriesArray={this.props.csLegendEntriesArray}
                    dynLayerObjects={dynLayerSource}
                    dynLayerLayerIDAttr={this.props.dynLayerLayerID}
                    dynLayerIndexAttr={this.props.dynLayerIndexAttr}
                    dynLayerServerTypeAttr={this.props.dynLayerServerTypeAttr}
                    dynLayerStaticURLAttr={this.props.dynLayerStaticURLAttr}
                    dynLayerObjectIDAttr={this.props.dynLayerObjectIDAttr}
                    dynLayerVisibilityOnLoadAttr={this.props.dynLayerVisibilityOnLoadAttr}
                    dynLayerCustomStylingEnabledAttr={this.props.dynLayerCustomStylingEnabledAttr}
                    dynLayerClusteringEnabledAttr={this.props.dynLayerEnableClusteringAttr}
                    dynLayerMendixObjectsAttr={this.props.dynLayerMendixObjectsAttr}
                    layerArray={this.props.layerArray}
                    intAttributesArray={this.props.intAttributesArray}
                    intMendixXPathStringr={this.props.intMendixXPathString}
                    intButtonAction={this.props.intButtonAction}
                    intButtonLabel={this.props.intButtonLabel}
                    intButtonClass={this.props.intButtonClass}
                    intButtonIcon={this.props.intButtonIcon}
                    cl_enabled={this.props.cl_enabled}
                    cl_popupTitle={this.props.cl_popupTitle}
                    cl_popupContent={this.props.cl_popupContent}
                    cl_radius={this.props.cl_radius}
                    cl_minSize={this.props.cl_minSize}
                    cl_maxSize={this.props.cl_maxSize}
                    cl_symbolTextColor={this.props.cl_symbolTextColor}
                    cl_symbolTextSize={this.props.cl_symbolTextSize}
                    legendEnabled={this.props.enableLegend}
                    legendStartExpanded={this.props.legendStartExpanded}
                    legendPosition={legendPosition}
                    legendPlaceHolderIndex={this.props.legendPlaceholderIndex}
                    legendTitle={this.props.legendTitle}
                    searchEnabled={this.props.enableSearch}
                    searchStartExpanded={this.props.searchStartExpanded}
                    searchPosition={searchPosition}
                    searchPlaceHolderIndex={this.props.searchPlaceholderIndex}
                    toggleLayerEnabled={this.props.enableToggleLayer}
                    toggleLayerStartExpanded={this.props.toggleLayerStartExpanded}
                    toggleLayerPosition={toggleLayerPosition}
                    toggleLayerPlaceHolderIndex={this.props.toggleLayerPlaceholderIndex}
                    isLoaded={this.state.isLoaded}
                    view={this.state.view}
                    legend={this.state.legend}
                />
            </div>
        );
    }
}
