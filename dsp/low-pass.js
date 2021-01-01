//
//  Copyright 2019 - 2021 The XOrange Studio. All rights reserved.
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
//  Public functions.
//

/**
 *  Do low-pass filter to audio data.
 * 
 *  @throws {XAPDspParameterError}
 *      - 'rate' is non-positive or 'frequency' is non-positive.
 *  @param {Number[]} input 
 *      - The audio data.
 *  @param {Number} rate 
 *      - The audio sample rate.
 *  @param {Number} frequency 
 *      - The cut-off frequency.
 *  @param {Boolean} [rounding]
 *      - True if element of the output data should be rounded to integer.
 *  @return {Number[]}
 *      - The filtered audio data.
 */
function LowPass(
    input,
    rate,
    frequency,
    rounding=false
) {
    //  Check sample rate.
    if (rate <= 0) {
        throw new XAPDspParameterError("Invalid sample rate.");
    }

    //  Check cut-off frequency.
    if (frequency <= 0) {
        throw new XAPDspParameterError("Invalid cut-off frequency.");
    }

    //  Fast path for empty input:
    if (input.length == 0) {
        return [];
    }

    /**
     *  Here is the derivation process:
     * 
     *  For a discrete low-pass filter:
     * 
     *                   1 - a
     *    [1] RC = dt * -------          ... (1)
     *                     a
     * 
     *               dt
     *    [2] a = ---------              ... (2)
     *             RC + dt
     * 
     *                 1
     *    [3] fc = ---------             ... (3)
     *              2π * RC
     * 
     *  For audio data:
     * 
     *               1
     *    [4] dt = ------                ... (4)
     *              rate
     * 
     *  Do transformation to formula (3):
     * 
     *                 1
     *    [5] RC = ---------             ... (5)
     *              2π * fc
     * 
     *  Bring (1), (4), (5) to formula (2):
     * 
     *                 2π * fc
     *    [6] a = ----------------
     *             2π * fc + rate
     * 
     */
    let pifc2 = 2 * Math.PI * frequency;
    let a = pifc2 / (pifc2 + rate);
    let oneMinusA = (1 - a);

    //  Do filtering.
    let pre = input[0];
    let output = [pre];
    for (let i = 1; i < input.length; ++i) {
        let value = a * input[i] + oneMinusA * pre;
        pre = value;
        if (rounding) {
            value = Math.round(value);
        }
        output.push(value);
    }

    return output;
}

//  Export public APIs.
module.exports = {
    "LowPass": LowPass
};