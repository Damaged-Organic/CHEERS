/*jshint node:true*/
"use strict";

import geoip from 'geoip-ultralight';

let setClientCountryCode = (req, clientIp) => {
    let countryCode = geoip.lookupCountry(clientIp);
    if( countryCode ) {
        countryCode = countryCode.toLowerCase();
        req.app.geolocation.userCountryCode = countryCode;
    }
};

let processDependentModules = (geoip, req, res) => {
    req.app.geolocation = {};

    let clientIp = req.app.ipDetection.clientIp;
    if( clientIp )
        setClientCountryCode(req, clientIp);
};

export default (req, res, next) => {
    processDependentModules(geoip, req, res);

    next();
};
