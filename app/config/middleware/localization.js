"use strict";

import path from 'path';

import Localization from '@services/localization/Localization';

const locales = [
    process.env.LOCALE_EN, process.env.LOCALE_UA, process.env.LOCALE_RU
];

const localizations = {
    ua: {
        countries: ['ua'],
        language: process.env.LOCALE_UA
    },
    ru: {
        countries: ['ru', 'by', 'kz'],
        language: process.env.LOCALE_RU
    }
};

const directory = path.resolve(
    process.env.DIR_BASE,
    process.env.DIR_APP,
    'services/localization/locales'
);

const cookie = process.env.COOKIE_LOCALE;

let instance = null;

let configure = () => {
    let localization = instance = new Localization(
        locales, localizations, directory, cookie
    );

    return localization;
};

export { configure as default, instance };
