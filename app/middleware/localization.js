"use strict";

import configuredI18n from '@config/middleware/localization';

let processDependentModules = (i18n, req, res) => {
    // Subdomain-defined locale has highest priority.
    // If not defined, trying to use geolocation locale,
    // and doing nothing for i18n default fallback
    let currentLocale =
        req.app.subdomains.userSubdomain ||
        req.app.geolocation.userCountryCode
    ;

    if( currentLocale )
        i18n.setRequestResponseLocale(req, res, currentLocale);
};

export default (req, res, next) => {
    const i18n = configuredI18n();

    i18n.init(req, res);

    processDependentModules(i18n, req, res);

    next();
};
