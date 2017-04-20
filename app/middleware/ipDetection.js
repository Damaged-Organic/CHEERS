/*jshint node:true*/
"use strict";

import ipware from 'ipware';

let getClientIp = (req) => {
    let clientIp = ipware().get_ip(req).clientIp;

    if( !clientIp )
        return false;

    return clientIp;
};

let processDependentModules = (ipware, req, res) => {
    req.app.ipDetection = {};

    let clientIp;
    if( (clientIp = getClientIp(req)) )
        req.app.ipDetection.clientIp = clientIp;
};

export default (req, res, next) => {
    processDependentModules(ipware, req, res);

    next();
};
