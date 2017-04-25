"use strict";

import path from 'path';
import i18n from 'i18n';

import extend from '@helpers/extensions/i18n';

let configure = () => {
    let localePath = path.resolve(
        process.env.DIR_BASE,
        process.env.DIR_APP,
        'locales'
    );

    i18n.configure({
        locales: [
            process.env.LOCALE_EN, process.env.LOCALE_UA, process.env.LOCALE_RU
        ],
        defaultLocale: 'en',
        cookie: process.env.COOKIE_LOCALE,
        directory: localePath
    });

    // Extend i18n with additional methods
    extend(i18n);

    return i18n;
};

export default configure;
