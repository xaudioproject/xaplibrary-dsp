//
//  Copyright 2019 - 2020 The XOrange Studio. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.md file.
//

//
//  Imports.
//

//  Imported modules.
const XaError = require("./../error");

//  Imported classes.
const XAPDspParameterError = XaError.XAPDspParameterError;

//
//  Constants.
//

//  Default threshold value.
const DEFAULT_THRESHOLD = 8;

//
//  Public functions.
//

/**
 *  Trim mute audio from an audio data.
 * 
 *  @throws {XAPDspParameterError}
 *      - 'threshold' is negative.
 *  @param {Number[]} input 
 *      - Input data.
 *  @param {Boolean} [trimLeft] 
 *      - True if left-hand side mute data should be trimmed.
 *  @param {Boolean} [trimRight] 
 *      - True if right-hand side mute data should be trimmed.
 *  @param {Number} [threshold] 
 *      - Threshold.
 *  @return {Number[]}
 *      - Output data.
 */
function Trim(
    input,
    trimLeft=true,
    trimRight=true,
    threshold=DEFAULT_THRESHOLD
) {
    let output = [];

    //  Check the threshold.
    if (threshold < 0) {
        throw new XAPDspParameterError("Negative threshold value.");
    }

    //  Get the left edge.
    let edgeL = 0;
    if (trimLeft) {
        while (
            edgeL < input.length && 
            Math.abs(input[edgeL]) <= threshold
        ) {
            ++edgeL;
        }
    }

    //  Get the right edge.
    let edgeR = input.length;
    if (trimRight) {
        while (
            edgeR > 0 && 
            Math.abs(input[edgeR - 1]) <= threshold
        ) {
            --edgeR;
        }
    }

    //  Trim data.
    for (let i = edgeL; i < edgeR; ++i) {
        output.push(input[i]);
    }

    return output;
}

//  Export public APIs.
module.exports = {
    "Trim": Trim
};