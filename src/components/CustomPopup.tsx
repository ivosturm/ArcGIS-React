/* eslint-disable linebreak-style */
import { Component, createElement, ReactNode } from "react";
import { IntAttributesArrayType } from "../../typings/ReactArcGISProps";

export interface CustomPopupProps {
    attributes: IntAttributesArrayType[];
}

export default class CustomPopup extends Component<CustomPopupProps> {
    render(): ReactNode {
        return (
            <div
                id="esri-popup-table"
                className="esri-feature__content-element"
                style={{ display: "block" }}
                title="popup table"
            >
                <div className="esri-feature-fields">
                    <div className={"esri-feature-element-info"}></div>
                    <table className={"esri-widget__table"} summary={"Lijst met attributen en waarden"}>
                        <tbody>
                            {this.props.attributes.map(
                                (intAttribute, index) => (
                                    <tr key={index}>
                                        <th className={"esri-feature-fields__field-header"}>
                                            {intAttribute.intAttributeLabel}
                                        </th>
                                        <td
                                            className={"esri-feature-fields__field-data"}
                                            id={"popup_" + intAttribute.intAttributeName}
                                        ></td>
                                    </tr>
                                )
                                // )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
