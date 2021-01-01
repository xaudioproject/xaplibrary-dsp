//
//  Copyright 2019 - 2021 The XOrange Studio. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.md file.
//

//
//  Public functions.
//

/**
 *  Read PCM data (signed, little-endian, 16-bits) to audio sample data.
 * 
 *  @param {Buffer} data 
 *      - The PCM data.
 *  @return {Number[]}
 *      - The audio sample data.
 */
function ReadDataS16LE(
    data
) {
    let output = [];
    for (let i = 0; i < data.length; i += 2) {
        output.push(data.readInt16LE(i));
    }
    return output;
}

/**
 *  Write audio sample data to PCM data (signed, little-endian, 16-bits).
 * 
 *  @param {Number[]} samples 
 *      - The audio sample data.
 *  @return {Buffer}
 *      - The PCM data.
 */
function WriteDataS16LE(
    samples
) {
    let output = Buffer.allocUnsafe(samples.length * 2);
    for (let i = 0; i < samples.length; ++i) {
        let sample = samples[i];
        if (!Number.isInteger(sample)) {
            sample = Math.round(sample);
        }
        if (sample < -32768) {
            sample = -32768;
        } else if (sample > 32767) {
            sample = 32767;
        }
        output.writeInt16LE(sample, (i << 1));
    }
    return output;
}

//  Export public APIs.
module.exports = {
    "ReadDataS16LE": ReadDataS16LE,
    "WriteDataS16LE": WriteDataS16LE
};