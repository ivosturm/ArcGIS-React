/* eslint-disable linebreak-style */
import { createElement } from "react";
import ReactDOM from "react-dom";
import { IntAttributesArrayType, LayerArrayType } from "../../typings/ReactArcGISProps";
import { logNode } from "../ReactArcGIS";
import CustomPopup from "../components/CustomPopup";

/**
 *
 * In case of a FeatureLayer dynamic content, based out of both attributes owned in Mendix as well as
 * in ArcGIS can be created. For this also a separate Class 'CustomPopup' has been created
 */
export const createCustomContent = (
    feature: any,
    mendixLayerAttr: IntAttributesArrayType[],
    mendixLayer: LayerArrayType,
    intMendixXPathString: string
): Promise<HTMLElement | undefined> => {
    const div = document.createElement("div");
    ReactDOM.render(<CustomPopup attributes={mendixLayerAttr} />, div);
    let ArcGISDID = feature.graphic.getAttribute(mendixLayer.objectIDAttr);
    let ArcGISIDIDName = mendixLayer.objectIDAttr;
    if (mendixLayer.clientIDAttr) {
        if (mendixLayer.clientIDAttrType === "String") {
            ArcGISDID = "'" + feature.graphic.getAttribute(mendixLayer.clientIDAttr) + "'";
        } else {
            ArcGISDID = feature.graphic.getAttribute(mendixLayer.clientIDAttr);
        }
        ArcGISIDIDName = mendixLayer.clientIDAttr;
    }
    console.debug(ArcGISIDIDName + " " + ArcGISDID + " clicked! Retrieving Mendix object:");
    return (
        new Promise((resolve, reject) => {
            // eslint-disable-next-line no-undef
            mx.data.get({
                xpath: "//" + intMendixXPathString + "=" + ArcGISDID + "]",
                callback: objs => resolve(objs[0]),
                error: error => reject(error)
            });
        })
            // eslint-disable-next-line no-undef
            .then((mxObject: mendix.lib.MxObject) => {
                if (div) {
                    const dataTDElements = Array.from(div.getElementsByClassName("esri-feature-fields__field-data"));
                    // console.dir(dataTDElements);
                    dataTDElements.forEach(dataTDelement => {
                        // console.debug(dataTDelement.id);
                        const attribute = mendixLayerAttr.filter(attr => {
                            // console.debug("popup_" + attr.intAttributeName);
                            return "popup_" + attr.intAttributeName === dataTDelement.id;
                        })[0];
                        if (attribute) {
                            let attributeValue = "";
                            if (!attribute.intAttributeMendix) {
                                attributeValue = feature.graphic.getAttribute(attribute.intAttributeName);
                            } else {
                                /* console.debug(
                                    "attribute " + attribute.intAttributeName + " needs to be retrieved from Mendix!"
                                );*/
                                if (mxObject) {
                                    attributeValue = String(mxObject.get(attribute.intAttributeName));
                                } else {
                                    console.error(
                                        "attribute " +
                                            attribute.intAttributeName +
                                            " couldnt be retrieved, because mxObject not found!"
                                    );
                                }
                            }
                            if (attributeValue && attributeValue !== "") {
                                dataTDelement.innerHTML = attributeValue;
                            } else {
                                dataTDelement.innerHTML = " ";
                            }
                        }
                    });
                    return div;
                }
            })
            .catch(err => {
                console.error(
                    logNode +
                        " error getting Mendix object based on unique Esri identifier " +
                        mendixLayer.objectIDAttr +
                        ". Error: " +
                        err
                );
                return undefined;
            })
    );
};

export function _addButtonToActionArray(
    number: number,
    buttonIcon: any,
    buttonLabel: string,
    buttonClass: string,
    actionArray: any[],
    layerID: string
): void {
    if (buttonLabel === "DISABLE") {
        return;
    }
    const btnId = "pop-mx-action-" + number + "-" + layerID;
    let intButtonIconClass = "";
    if (buttonIcon?.value?.type === "glyph") {
        intButtonIconClass = " glyphicon " + buttonIcon.value.iconClass;
    }
    actionArray.push({
        title: buttonLabel,
        id: btnId,
        className: buttonClass + intButtonIconClass,
        type: "button"
    });
}
