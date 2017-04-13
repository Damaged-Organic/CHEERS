/*jshint node:true*/
"use strict";

import path from 'path';
import i18n from 'i18n';

const cookie = 'i18n';

const ukrainianLocalization = {
    'countries': ['ua'],
    'language': 'ua'
};
const russianLocalization = {
    'countries': ['ru', 'by', 'kz'],
    'language': 'ru'
};

i18n.configure({
    locales: ['en', 'ua', 'ru'],
    defaultLocale: 'en',
    cookie: cookie,
    directory: path.join(__dirname, '../locales')
});

i18n.setLocaleWithCookie = function(res, locale) {
    return res.cookie(cookie, locale);
};

i18n.getLocaleWithCookie = function(req) {
    return req.cookies[cookie];
};

i18n.setInitialLocaleByCountryCode = function(req, res, userCountryCode) {
    let currentLocale;

    // New user without locale cookie set
    if( !this.getLocaleWithCookie(req) ) {
        switch(true) {
            case ukrainianLocalization.countries.includes(userCountryCode):
                currentLocale = ukrainianLocalization.language;
                break;
            case russianLocalization.countries.includes(userCountryCode):
                currentLocale = russianLocalization.language;
                break;
            default:
                currentLocale = i18n.defaultLocale;
        }

        // Set cookie
        this.setLocaleWithCookie(res, currentLocale);
        // Set global locale for current cycle
        this.setLocale(req, currentLocale);
    }
};

export default i18n;
