//
//  Copyright 2019 - 2020 The XOrange Studio. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.md file.
//

//
//  Imports.
//

//  Imported modules.
const Util = require("util");

//
//  Classes.
//

/**
 *  XAP error.
 * 
 *  @constructor
 *  @extends {Error}
 *  @param {String} [message] - The message.
 */
function XAPDspError(message = "") {
    //  Let parent class initialize.
    Error.call(this, message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
}

/**
 *  XAP parameter error.
 * 
 *  @constructor
 *  @extends {XAPSpecError}
 *  @param {String} [message] - The message.
 */
function XAPDspParameterError(message = "") {
    //  Let parent class initialize.
    XAPDspError.call(this, message);
}

//
//  Inheritances.
//
Util.inherits(XAPDspError, Error);
Util.inherits(XAPDspParameterError, XAPDspError);

//  Export public APIs.
module.exports = {
    "XAPDspError": XAPDspError,
    "XAPDspParameterError": XAPDspParameterError
};
