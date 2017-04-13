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
    let clientIp = req.app.ipware.clientIp;
    if( clientIp )
        setClientCountryCode(req, clientIp);
};

export default (req, res, next) => {
    req.app.geolocation = {};

    processDependentModules(geoip, req, res);

    next();
};
