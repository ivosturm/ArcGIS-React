/**
 * This file was generated from ReactArcGIS.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListActionValue, ListAttributeValue, WebIcon } from "mendix";

export type BmTogglePositionEnum = "bottomRight" | "bottomLeft" | "topRight" | "topLeft";

export type LegendPositionEnum = "bottomRight" | "bottomLeft" | "topRight" | "topLeft";

export type SearchPositionEnum = "bottomRight" | "bottomLeft" | "topRight" | "topLeft";

export type ToggleLayerPositionEnum = "bottomRight" | "bottomLeft" | "topRight" | "topLeft";

export type LayerServerTypeEnum = "MapServer" | "FeatureServer" | "PortalItem";

export type ClientIDAttrTypeEnum = "String" | "Number";

export interface LayerArrayType {
    layerServerType: LayerServerTypeEnum;
    layerURLStatic: string;
    layerObjects?: ListValue;
    urlAttr?: ListAttributeValue<string>;
    layerID: string;
    layerIndex: number;
    objectIDAttr: string;
    clientIDAttr: string;
    clientIDAttrType: ClientIDAttrTypeEnum;
    featureLayerID: string;
    mendixLayer: boolean;
    portalItemID: string;
    visibleLayerIndexes: string;
    visibilityOnLoad: boolean;
    clusteringEnabled: boolean;
    customStylingEnabled: boolean;
    showAttribution: boolean;
    opacity: string;
}

export type CsDefaultArraySymbolEnum = "circle" | "cross" | "diamond" | "square" | "x";

export interface CsDefaultArrayType {
    csDefaultArrayLayerID: string;
    csDefaultArrayColor: string;
    csDefaultArraySize: number;
    csDefaultArraySymbol: CsDefaultArraySymbolEnum;
}

export type CsLegendEntrySymbolEnum = "circle" | "cross" | "diamond" | "square" | "x";

export interface CsLegendEntriesArrayType {
    csLegendEntryLayerID: string;
    csLegendEntryName: string;
    csLegendEntryColor: string;
    csLegendEntrySize: number;
    csLegendEntrySymbol: CsLegendEntrySymbolEnum;
}

export interface IntAttributesArrayType {
    intAttributeName: string;
    intAttributeMendix: boolean;
    intAttributeLabel: string;
    intAttributeLayerID: string;
    intAttributeIsTitle: boolean;
    intAttributeDecimalPlaces: number;
    intAttributeDecimalSeparator: string;
}

export interface LayerArrayPreviewType {
    layerServerType: LayerServerTypeEnum;
    layerURLStatic: string;
    layerObjects: {} | null;
    urlAttr: string;
    layerID: string;
    layerIndex: number | null;
    objectIDAttr: string;
    clientIDAttr: string;
    clientIDAttrType: ClientIDAttrTypeEnum;
    featureLayerID: string;
    mendixLayer: boolean;
    portalItemID: string;
    visibleLayerIndexes: string;
    visibilityOnLoad: boolean;
    clusteringEnabled: boolean;
    customStylingEnabled: boolean;
    showAttribution: boolean;
    opacity: string;
}

export interface CsDefaultArrayPreviewType {
    csDefaultArrayLayerID: string;
    csDefaultArrayColor: string;
    csDefaultArraySize: number | null;
    csDefaultArraySymbol: CsDefaultArraySymbolEnum;
}

export interface CsLegendEntriesArrayPreviewType {
    csLegendEntryLayerID: string;
    csLegendEntryName: string;
    csLegendEntryColor: string;
    csLegendEntrySize: number | null;
    csLegendEntrySymbol: CsLegendEntrySymbolEnum;
}

export interface IntAttributesArrayPreviewType {
    intAttributeName: string;
    intAttributeMendix: boolean;
    intAttributeLabel: string;
    intAttributeLayerID: string;
    intAttributeIsTitle: boolean;
    intAttributeDecimalPlaces: number | null;
    intAttributeDecimalSeparator: string;
}

export interface ReactArcGISContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    mapHeight: number;
    mapWidth: number;
    baseMapID: string;
    bmToggleEnabled: boolean;
    bmToggleID: string;
    bmTogglePosition: BmTogglePositionEnum;
    bmTogglePlaceHolderIndex: number;
    defaultY: number;
    defaultX: number;
    defaultZoom: number;
    singleObjectZoom: number;
    graphicObjects?: ListValue;
    objectIDAttr: ListAttributeValue<BigJs.Big | string>;
    layerIDAttr: ListAttributeValue<BigJs.Big | string>;
    colorAttr?: ListAttributeValue<string>;
    sizeAttr?: ListAttributeValue<BigJs.Big>;
    symbolAttr?: ListAttributeValue<string>;
    dsShowAllObjects: boolean;
    dsHighlightingEnabled: boolean;
    loadingModal: boolean;
    loadingModalMessage: string;
    enableLegend: boolean;
    legendStartExpanded: boolean;
    legendTitle: string;
    legendPosition: LegendPositionEnum;
    legendPlaceholderIndex: number;
    enableSearch: boolean;
    searchStartExpanded: boolean;
    searchPosition: SearchPositionEnum;
    searchPlaceholderIndex: number;
    enableToggleLayer: boolean;
    toggleLayerStartExpanded: boolean;
    toggleLayerPosition: ToggleLayerPositionEnum;
    toggleLayerPlaceholderIndex: number;
    layerArray: LayerArrayType[];
    dynLayerObject?: ListValue;
    dynLayerLayerID?: ListAttributeValue<string>;
    dynLayerServerTypeAttr?: ListAttributeValue<string>;
    dynLayerVisibilityOnLoadAttr?: ListAttributeValue<boolean>;
    dynLayerEnableClusteringAttr?: ListAttributeValue<boolean>;
    dynLayerCustomStylingEnabledAttr?: ListAttributeValue<boolean>;
    dynLayerStaticURLAttr?: ListAttributeValue<string>;
    dynLayerObjectIDAttr?: ListAttributeValue<string>;
    dynLayerIndexAttr?: ListAttributeValue<BigJs.Big>;
    dynLayerMendixObjectsAttr?: ListAttributeValue<boolean>;
    csDefaultArray: CsDefaultArrayType[];
    csLegendEntriesArray: CsLegendEntriesArrayType[];
    intAttributesArray: IntAttributesArrayType[];
    intMendixXPathString: string;
    intButtonAction?: ListActionValue;
    intButtonLabel: string;
    intButtonClass: string;
    intButtonIcon?: DynamicValue<WebIcon>;
    cl_enabled: boolean;
    cl_symbolTextColor: string;
    cl_symbolTextSize: number;
    cl_popupTitle: string;
    cl_popupContent: string;
    cl_radius: number;
    cl_minSize: number;
    cl_maxSize: number;
}

export interface ReactArcGISPreviewProps {
    class: string;
    style: string;
    mapHeight: number | null;
    mapWidth: number | null;
    baseMapID: string;
    bmToggleEnabled: boolean;
    bmToggleID: string;
    bmTogglePosition: BmTogglePositionEnum;
    bmTogglePlaceHolderIndex: number | null;
    defaultY: number | null;
    defaultX: number | null;
    defaultZoom: number | null;
    singleObjectZoom: number | null;
    graphicObjects: {} | null;
    objectIDAttr: string;
    layerIDAttr: string;
    colorAttr: string;
    sizeAttr: string;
    symbolAttr: string;
    dsShowAllObjects: boolean;
    dsHighlightingEnabled: boolean;
    loadingModal: boolean;
    loadingModalMessage: string;
    enableLegend: boolean;
    legendStartExpanded: boolean;
    legendTitle: string;
    legendPosition: LegendPositionEnum;
    legendPlaceholderIndex: number | null;
    enableSearch: boolean;
    searchStartExpanded: boolean;
    searchPosition: SearchPositionEnum;
    searchPlaceholderIndex: number | null;
    enableToggleLayer: boolean;
    toggleLayerStartExpanded: boolean;
    toggleLayerPosition: ToggleLayerPositionEnum;
    toggleLayerPlaceholderIndex: number | null;
    layerArray: LayerArrayPreviewType[];
    dynLayerObject: {} | null;
    dynLayerLayerID: string;
    dynLayerServerTypeAttr: string;
    dynLayerVisibilityOnLoadAttr: string;
    dynLayerEnableClusteringAttr: string;
    dynLayerCustomStylingEnabledAttr: string;
    dynLayerStaticURLAttr: string;
    dynLayerObjectIDAttr: string;
    dynLayerIndexAttr: string;
    dynLayerMendixObjectsAttr: string;
    csDefaultArray: CsDefaultArrayPreviewType[];
    csLegendEntriesArray: CsLegendEntriesArrayPreviewType[];
    intAttributesArray: IntAttributesArrayPreviewType[];
    intMendixXPathString: string;
    intButtonAction: {} | null;
    intButtonLabel: string;
    intButtonClass: string;
    intButtonIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    cl_enabled: boolean;
    cl_symbolTextColor: string;
    cl_symbolTextSize: number | null;
    cl_popupTitle: string;
    cl_popupContent: string;
    cl_radius: number | null;
    cl_minSize: number | null;
    cl_maxSize: number | null;
}
