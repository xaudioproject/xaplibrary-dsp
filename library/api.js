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
const DspAmplify = require("./../dsp/amplify");
const DspHighPass = require("./../dsp/high-pass");
const DspIO = require("./../dsp/io");
const DspLowPass = require("./../dsp/low-pass");
const DspResampler = require("./../dsp/resampler");
const DspTrimmer = require("./../dsp/trimmer");

//  Export public APIs.
module.exports = {
    "Core": {
        "Amplify": DspAmplify.Amplify,
        "HighPass": DspHighPass.HighPass,
        "ReadDataS16LE": DspIO.ReadDataS16LE,
        "WriteDataS16LE": DspIO.WriteDataS16LE,
        "LowPass": DspLowPass.LowPass,
        "Resample": DspResampler.Resample,
        "Trim": DspTrimmer.Trim,
    },
    "Error": {
        "XAPDspError": XaError.XAPDspError,
        "XAPDspParameterError": XaError.XAPDspParameterError
    }
};
