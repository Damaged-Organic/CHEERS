/*jshint node:true*/
"use strict";

import ipware from 'ipware';

let setClientIp = (req) => {
    let clientIp = ipware().get_ip(req).clientIp;
    if( clientIp )
        req.app.ipDetection.clientIp = clientIp;
};

let processDependentModules = (ipware, req, res) => {
    req.app.ipDetection = {};

    setClientIp(req);
};

export default (req, res, next) => {
    processDependentModules(ipware, req, res);

    next();
};
