"use strict";

import path from 'path';

import I18n from '@helpers/extensions/localization';

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
    'locales'
);

const cookie = process.env.COOKIE_LOCALE;

let instance = null;

let configure = () => {
    let i18n = instance = new I18n(
        locales, localizations, directory, cookie
    );

    return i18n;
};

let getInstance = () => {
    return instance;
}

export default configure;

export { getInstance };
