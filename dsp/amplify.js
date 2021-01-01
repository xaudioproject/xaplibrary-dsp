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
 *  Amplify an audio.
 * 
 *  @throws {XAPDspParameterError}
 *      - 'threshold', 'ampMinValue' or 'ampMaxValue' is invalid.
 *  @param {Number[]} input 
 *      - The audio to be amplified.
 *  @param {Number} threshold
 *      - The silent threshold (must be non-negative).
 *  @param {Number} ampMinValue
 *      - The minimum amplified value (must be negative).
 *  @param {Number} ampMaxValue
 *      - The maximum amplified value (must be positive).
 *  @return {Number[]}
 *      - The amplified audio data.
 */
function Amplify(
    input,
    threshold,
    ampMinValue,
    ampMaxValue,
    rounding=false
) {
    //  Check 'threshold' parameter.
    if (threshold < 0) {
        throw new XAPDspParameterError("Invalid silent threshold.");
    }

    //  Check 'ampMinValue' parameter.
    if (ampMinValue >= 0) {
        throw new XAPDspParameterError("Invalid minimum amplified value.");
    }

    //  Check 'ampMaxValue' parameter.
    if (ampMaxValue <= 0) {
        throw new XAPDspParameterError("Invalid maximum amplified value.");
    }

    //  Fast path for empty audio.
    if (input.length == 0) {
        return [];
    }

    //  Get the min/max sample audio.
    let silent = true;
    let iMinValue = input[0];
    let iMaxValue = input[0];
    for (let i = 1; i < input.length; ++i) {
        let value = input[i];
        if (silent) {
            if (Math.abs(value) >= threshold) {
                silent = false;
            }
        }
        if (value < iMinValue) {
            iMinValue = value;
        } else if (value > iMaxValue) {
            iMaxValue = value;
        }
    }

    //  Do NOT amplify if the audio is silent.
    if (silent) {
        let output = [];
        for (let i = 0; i < input.length; ++i) {
            output.push(input[i]);
        }
        return output;
    }

    //  Get the amplify ratio.
    let ratio = null;
    if (iMaxValue > 0) {
        ratio = ampMaxValue / iMaxValue;
    }
    if (iMinValue < 0) {
        let ratioNeg = ampMinValue / iMinValue;
        if (ratio === null || ratioNeg < ratio) {
            ratio = ratioNeg;
        }
    }
    if (ratio === null) {
        ratio = 1;
    }

    //  Do amplification.
    let output = [];
    for (let i = 0; i < input.length; ++i) {
        let value = input[i] * ratio;
        if (rounding) {
            value = Math.round(value);
        }
        if (value < ampMinValue) {
            value = ampMinValue;
        } else if (value > ampMaxValue) {
            value = ampMaxValue;
        }
        output.push(value);
    }

    return output;
}

//  Export public APIs.
module.exports = {
    "Amplify": Amplify
};