/* eslint-disable linebreak-style */

import { logNode } from "../ReactArcGIS";

/**
 * @param guid from a Mendix object
 * @returns a promise which will force a refresh in client of a Mendix object for given guid
 */
export async function RefreshObject(guid: string): Promise<boolean> {
    if (!guid) {
        return Promise.reject(new Error("guid parameter for async function RefreshObject is required!"));
    }
    return new Promise(() => {
        mx.data.update({
            guid
        });
    });
}
export function _updateMxReferences(
    sketchParentAssociationName: string,
    guidArrayToProcess: string[],
    removeReferences: boolean,
    parentMxGuid: string
): Promise<mendix.lib.MxObject[]> {
    console.debug(logNode + "updating Mendix references selection");
    let processingText = "added to";
    if (removeReferences) {
        processingText = " removing from ";
    }

    return new Promise((resolve, reject) => {
        mx.data.get({
            guid: parentMxGuid,
            callback(obj) {
                console.debug(
                    logNode +
                        "Sketching MxParent " +
                        obj.getGuid() +
                        " retrieved, starting retrieve of MxObject children to be " +
                        processingText +
                        " sketching parent!"
                );
                mx.data.get({
                    guids: guidArrayToProcess,
                    // eslint-disable-next-line no-undef
                    callback(objs: mendix.lib.MxObject[]) {
                        objs.forEach(obj => {
                            let refProcessed = false;
                            if (removeReferences) {
                                refProcessed = obj.removeReferences(sketchParentAssociationName, [parentMxGuid]);
                            } else {
                                refProcessed = obj.addReferences(sketchParentAssociationName, [parentMxGuid]);
                            }
                            let success = "NOT";
                            if (refProcessed) {
                                success = "";
                            }
                            console.debug(
                                logNode +
                                    "association of mxObject with guid " +
                                    obj.getGuid() +
                                    +" " +
                                    success +
                                    processingText +
                                    " parent guid " +
                                    parentMxGuid
                            );
                        });
                        RefreshObject(parentMxGuid);
                        resolve(objs);
                    },
                    error(error) {
                        reject(error.message);
                    }
                });
            }
        });
    });
}
export function toggleClearSelectionStyling(enabled: boolean): void {
    console.debug(logNode + "toggle clear-selection button to " + enabled);
    const revertButton = document.getElementById("clear-selection");
    // change revert button styling so users knows it is activated
    if (revertButton) {
        let backgroundColor = "#DDD";
        let cursor = "default";

        if (enabled) {
            backgroundColor = "#FFF";
            cursor = "pointer";
        }
        revertButton.style.backgroundColor = backgroundColor;
        revertButton.style.cursor = cursor;
    }
}
