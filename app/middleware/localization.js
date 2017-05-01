"use strict";

import configureLocalization from '@config/middleware/localization';

let processDependentModules = (localization, req, res) => {
    // Subdomain-defined locale has highest priority.
    // If not defined, trying to use geolocation locale,
    // and doing nothing for localization default fallback
    let currentLocale =
        req.app.subdomains.userSubdomain ||
        req.app.geolocation.userCountryCode
    ;

    if( currentLocale )
        localization.setRequestResponseLocale(req, res, currentLocale);
};

export default (req, res, next) => {
    let localization = configureLocalization();

    localization.init(req, res);

    processDependentModules(localization, req, res);

    next();
};
