/*jshint node:true*/
"use strict";

import configureI18n from '@config/localization';

const i18n = configureI18n();

let processDependentModules = (i18n, req, res) => {
    let userCountryCode = req.app.geolocation.userCountryCode;
    if( userCountryCode )
        i18n.setInitialLocaleByCountryCode(req, res, userCountryCode);
};

export default (req, res, next) => {
    i18n.init(req, res);

    processDependentModules(i18n, req, res);

    next();
};
