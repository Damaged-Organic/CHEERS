/*jshint node:true*/
"use strict";

const localizations = {
    ua: {
        countries: ['ua'],
        language: 'ua'
    },
    ru: {
        countries: ['ru', 'by', 'kz'],
        language: 'ru'
    }
};

// Directly set i18n locale cookie
let setLocaleWithCookie = (cookie) => {
    return function(res, locale) {
        return res.cookie(cookie, locale);
    };
};

let getLocaleWithCookie = (cookie) => {
    return function getLocaleWithCookie(req) {
        return req.cookies[cookie];
    };
};

let setInitialLocaleByCountryCode = (i18n) => {
    return function setInitialLocaleByCountryCode(req, res, userCountryCode) {
        let currentLocale;

        // New user without locale cookie set
        if( !i18n.getLocaleWithCookie(req) ) {
            switch(true) {
                case localizations.ua.countries.includes(userCountryCode):
                    currentLocale = localizations.ua.language;
                    break;
                case localizations.ru.countries.includes(userCountryCode):
                    currentLocale = localizations.ru.language;
                    break;
                default:
                    currentLocale = i18n.defaultLocale;
            }

            // Set cookie
            i18n.setLocaleWithCookie(res, currentLocale);
            // Set global locale for current cycle
            i18n.setLocale(req, currentLocale);
        }
    };
};

export default (i18n) => {
    i18n.setLocaleWithCookie = setLocaleWithCookie(i18n.cookie);
    i18n.getLocaleWithCookie = getLocaleWithCookie(i18n.cookie);

    i18n.setInitialLocaleByCountryCode = setInitialLocaleByCountryCode(i18n);
};
