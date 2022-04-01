/* eslint-disable linebreak-style */
import Color from "@arcgis/core/Color";
import { CsDefaultArrayType, CsLegendEntriesArrayType, LayerArrayType } from "../../typings/ReactArcGISProps";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { GisObject, logNode } from "../ReactArcGIS";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import ReactDOM from "react-dom";
// import CustomLegend from "../components/CustomLegend";
// import { createElement } from "react";

export function _createUniqueValueRenderer(
    layer: LayerArrayType,
    gisObjects: GisObject[],
    csDefaultArray: CsDefaultArrayType,
    layerArcGIS: FeatureLayer
): UniqueValueRenderer {
    let field = layer.objectIDAttr;
    let fieldTypeIsNumber = true;
    if (layer.clientIDAttr && layer.clientIDAttr !== "") {
        field = layer.clientIDAttr;
        fieldTypeIsNumber = false;
    }
    let defaultSymbol = layerArcGIS.renderer.get("symbol");
    // if csDefaultArray configured, use that symbol to overrule default symbol for layer
    if (csDefaultArray) {
        defaultSymbol = _createSimpleMarkerSymbol(
            csDefaultArray.csDefaultArraySymbol,
            csDefaultArray.csDefaultArrayColor,
            csDefaultArray.csDefaultArraySize
        );
    }
    const uniqueValueRenderer: any = {
        type: "unique-value",
        field,
        defaultSymbol,
        uniqueValueInfos: [],
        legendOptions: {
            title: ""
        }
    };
    gisObjects.forEach(gisObject => {
        const color = gisObject.color;
        const symbol = gisObject.symbol;
        const size = gisObject.size;
        if (color) {
            uniqueValueRenderer.uniqueValueInfos.push({
                // in Mendix user has total freedom to assign color to GISObject based on Mendix logic
                value: _createRendererValue(fieldTypeIsNumber, gisObject.ID),
                symbol: _createSimpleMarkerSymbol(symbol, color, size)
            });
        }
    });
    return uniqueValueRenderer;
}

function _createSimpleMarkerSymbol(markerSymbol: string, color: string, size: number): SimpleMarkerSymbol {
    const simpleMarkerSymbol = new SimpleMarkerSymbol();
    // default to circle
    simpleMarkerSymbol.style = "circle";
    switch (markerSymbol) {
        case "cross":
            simpleMarkerSymbol.style = "cross";
            break;
        case "diamond":
            simpleMarkerSymbol.style = "diamond";
            break;
        case "square":
            simpleMarkerSymbol.style = "square";
            break;
        case "x":
            simpleMarkerSymbol.style = "x";
            break;
    }
    simpleMarkerSymbol.color = new Color(color);
    simpleMarkerSymbol.size = size;
    return simpleMarkerSymbol;
}
function _createRendererValue(fieldTypeIsNumber: boolean, ID: string | number): string | number {
    if (fieldTypeIsNumber) {
        return Number(ID);
    } else {
        return String(ID);
    }
}

export function createLegendUniqueValueRender(
    csLegendEntriesArray: CsLegendEntriesArrayType[],
    layer: LayerArrayType
): UniqueValueRenderer {
    console.log(logNode + "custom styling: updating legend for layer" + layer.layerID);
    const csLegendEntries = csLegendEntriesArray.filter(legendEntry => {
        return legendEntry.csLegendEntryLayerID === layer.layerID;
    });
    const uniqueLegendValueRenderer: any = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        legendOptions: {
            title: " "
        },
        field: "ObjectID",
        uniqueValueInfos: []
    };
    csLegendEntries.forEach(csLegendEntry => {
        const color = csLegendEntry.csLegendEntryColor;
        const symbol = csLegendEntry.csLegendEntrySymbol;
        const size = csLegendEntry.csLegendEntrySize;
        if (color) {
            uniqueLegendValueRenderer.uniqueValueInfos.push({
                // in Mendix user has total freedom to assign color to GISObject based on Mendix logic
                value: csLegendEntry.csLegendEntryName,
                symbol: _createSimpleMarkerSymbol(symbol, color, size),
                label: csLegendEntry.csLegendEntryName
            });
        }
    });

    return uniqueLegendValueRenderer;
}
