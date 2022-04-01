import React, { Component, ReactNode, createElement } from "react";
import { ValueStatus } from "mendix";
import ArcGISContainer from "./components/ArcGISContainer";
import esriConfig from "@arcgis/core/config.js";

import { ReactArcGISContainerProps } from "../typings/ReactArcGISProps";

import "./ui/ReactArcGIS.css";
import MapView from "@arcgis/core/views/MapView";

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
// ID field can either be client specific ID (if filled in) or ObjectId
export interface GisObject {
    mxGuid: any;
    ID: number | string;
    legendName: string;
    layerID: string;
    color: string;
    size: number;
    symbol: string;
    center: number[];
    query: string;
}

interface ArcGISContainerState {
    isLoaded: boolean;
    view: MapView;
}

export default class ReactArcGIS extends Component<ArcGISContainerProps, ArcGISContainerState> {
    constructor(props: ArcGISContainerProps) {
        super(props);
        this.state = { isLoaded: false, view: {} as MapView };
    }
    setLoaded(isLoaded: boolean, view: MapView): void {
        console.debug(logNode + "setting isLoaded on widget to: " + isLoaded);
        this.setState({ isLoaded, view });
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
    shouldComponentUpdate(nextProps: ArcGISContainerProps, nextState: ArcGISContainerState): boolean {
        // no changes, no reload!
        if (nextState === this.state && nextProps === this.props) {
            console.debug(logNode + "state nor props changed! No rerendering...");
            return false;
        } // props changes, reload only if all configured objects are actually available!
        else if (nextState === this.state && nextProps !== this.props) {
            if (
                ((nextProps.graphicObjects?.status === "available" && nextProps.graphicObjects?.items) ||
                    !this.props.graphicObjects) &&
                ((nextProps.tokenObject?.status === "available" && nextProps.tokenObject?.items) ||
                    !this.props.tokenObject) &&
                ((nextProps.dynLayerObject?.status === "available" && nextProps.dynLayerObject?.items) ||
                    !this.props.dynLayerObject) &&
                ((nextProps.sketchParentObject?.status === "available" && nextProps.sketchParentObject?.items) ||
                    !this.props.sketchParentObject)
            ) {
                console.debug(logNode + "props changed, all configured objects now available. Rerendering...");
                return true;
            } else {
                console.debug(
                    logNode + "props changed, one, multiple or all configured objects not available yet. Waiting..."
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
    render(): ReactNode {
        // make known to esri where local assests / js files are stored
        esriConfig.assetsPath = "./widgets/first consulting/reactarcgis/assets";
        const legendPosition = this.mapPosition(this.props.legendPosition);
        const searchPosition = this.mapPosition(this.props.searchPosition);
        const toggleLayerPosition = this.mapPosition(this.props.toggleLayerPosition);
        const sketchPosition = this.mapPosition(this.props.sketchPosition);
        const datasource = this.props.graphicObjects;
        const tokenSource = this.props.tokenObject;
        const dynLayerSource = this.props.dynLayerObject;
        const sketchDataSource = this.props.sketchParentObject;
        // console.debug(logNode + "constructing reactArcGIS widget");

        // abort if mx objects or tokenobject isn't retrieved
        if (!datasource || datasource.status !== ValueStatus.Available || !datasource.items) {
            if (!tokenSource || tokenSource.status !== ValueStatus.Available || !tokenSource.items) {
                return <div>Loading...</div>;
            } else {
                // return <div>Loading...</div>;
            }
        }
        // or if token is configured but not available yet
        else if (tokenSource) {
            if (tokenSource.status !== ValueStatus.Available || !tokenSource.items) {
                return <div>Loading...</div>;
            }
        }

        if (dynLayerSource) {
            if (dynLayerSource.status !== ValueStatus.Available || !dynLayerSource.items) {
                return <div>Loading...</div>;
            }
        }
        if (sketchDataSource) {
            if (sketchDataSource.status !== ValueStatus.Available || !sketchDataSource.items) {
                return <div>Loading...</div>;
            }
        }
        return (
            <div>
                <React.StrictMode>
                    <ArcGISContainer
                        APIKey={this.props.APIKey}
                        onLoad={(isLoaded: boolean, view: MapView) => {
                            this.setLoaded(isLoaded, view);
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
                        csLegendTypeAttr={this.props.csLegendTypeAttr}
                        dsShowAllObjects={this.props.dsShowAllObjects}
                        dsHighlightingEnabled={this.props.dsHighlightingEnabled}
                        csDefaultArray={this.props.csDefaultArray}
                        csLegendEntriesArray={this.props.csLegendEntriesArray}
                        tokenObjects={tokenSource}
                        tokenAttr={this.props.tokenAttr}
                        userIdAttr={this.props.userIdAttr}
                        expiryDateAttr={this.props.expiryDateAttr}
                        dynLayerObjects={dynLayerSource}
                        dynLayerLayerIDAttr={this.props.dynLayerLayerID}
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
                        intButtonActionTwo={this.props.intButtonActionTwo}
                        intButtonLabelTwo={this.props.intButtonLabelTwo}
                        intButtonClassTwo={this.props.intButtonClassTwo}
                        intButtonIconTwo={this.props.intButtonIconTwo}
                        intButtonActionThree={this.props.intButtonActionThree}
                        intButtonLabelThree={this.props.intButtonLabelThree}
                        intButtonClassThree={this.props.intButtonClassThree}
                        intButtonIconThree={this.props.intButtonIconThree}
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
                        sketchEnabled={this.props.sketchEnabled}
                        sketchReversalEnabled={this.props.sketchReversalEnabled}
                        sketchLayerID={this.props.sketchLayerID}
                        sketchPosition={sketchPosition}
                        sketchPlaceHolderIndex={this.props.sketchPlaceholderIndex}
                        sketchParentObject={sketchDataSource}
                        sketchParentAssociationName={this.props.sketchParentAssociationName}
                        isLoaded={this.state.isLoaded}
                        view={this.state.view}
                    />
                </React.StrictMode>
            </div>
        );
    }
}
