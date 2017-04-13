/*jshint node:true*/
"use strict";

import ipware from 'ipware';

let getClientIp = (req) => {
    return ipware().get_ip(req).clientIp;
};

export default (req, res, next) => {
    req.app.ipware = {};

    let clientIp = getClientIp(req);
    if( clientIp )
        req.app.ipware.clientIp = clientIp;

    next();
};
