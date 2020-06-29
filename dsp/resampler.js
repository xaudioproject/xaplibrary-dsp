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
//  Public functions.
//

/**
 *  Resample an audio data.
 * 
 *  @throws {XAPDspParameterError}
 *      - 'fromRate' or 'toRate' is lower than 1.
 *  @param {Number[]} input
 *      - Input data. 
 *  @param {Number} fromRate 
 *      - Sample rate of the input data (unit: Hz).
 *  @param {Number} toRate 
 *      - Sample rate of the output data (unit: Hz).
 *  @param {Boolean} [rounding]
 *      - True if element of the output data should be rounded to integer.
 *  @return {Number[]}
 *      - Output data.
 */
function Resample(input, fromRate, toRate, rounding=false) {
    //  Check source sample rate.
    if (fromRate < 1) {
        throw new XAPDspParameterError("Invalid source sample rate.");
    }

    //  Check destination sample rate.
    if (toRate < 1) {
        throw new XAPDspParameterError("Invalid destination sample rate.");
    }

    //  Nothing should be done if the sample count is less than 2.
    if (input.length < 2) {
        let forked = [];
        for (let i = 0; i < input.length; ++i) {
            forked.push(input[i]);
        }
        return forked;
    }

    //  Get the time per sample.
    let tpsFrom = 1000000 / fromRate; /*  us.  */
    let tpsTo   = 1000000 / toRate;   /*  us.  */

    //  Create the output array.
    let out = [];

    //  Initialize source segment properties.
    let fromSegment = 0;
    let fromTimeBegin = 0;
    let fromTimeEnd = tpsFrom;
    let fromK = ((input[1] - input[0]) / tpsFrom);

    //  Initialize the output sample time.
    let time = 0;

    while (true) {
        //  Get the proper source segment at current output sample time.
        let found = false;
        while (fromSegment < input.length - 1) {
            if (time >= fromTimeBegin && time <= fromTimeEnd) {
                //  Found.
                found = true;
                break;
            } else {
                //  Not current segment, go to the next source segment.
                ++fromSegment;
                fromTimeBegin += tpsFrom;
                fromTimeEnd   += tpsFrom;
                fromK = (input[fromSegment + 1] - input[fromSegment]) / tpsFrom;
            }
        }
        if (!found) {
            break;
        }

        //  Get the resampled value.
        let incr = fromK * (time - fromTimeBegin);
        let value = input[fromSegment] + incr;
        if (rounding) {
            value = Math.round(value);
        }

        //  Insert the resampled value to the output array.
        out.push(value);

        //  Move to the next output sample.
        time += tpsTo;
    }

    return out;
}

//  Export public APIs.
module.exports = {
    "Resample": Resample
};