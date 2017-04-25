"use strict";

import geoip from 'geoip-ultralight';

let getUserCountryCode = (req, clientIp) => {
    let countryCode = geoip.lookupCountry(clientIp);

    if( !countryCode )
        return false;

    countryCode = countryCode.toLowerCase();

    return countryCode;
};

let processDependentModules = (geoip, req, res) => {
    req.app.geolocation = {};

    let clientIp = req.app.ipDetection.clientIp;
    if( clientIp ) {
        let countryCode;
        if( (countryCode = getUserCountryCode(req, clientIp)) )
            req.app.geolocation.userCountryCode = countryCode;
    }
};

export default (req, res, next) => {
    processDependentModules(geoip, req, res);

    next();
};
