/*jshint node:true*/
"use strict";

import path from 'path';
import i18n from 'i18n';

import extend from '@helpers/extentions/i18n';

let configure = () => {
    i18n.configure({
        locales: ['en', 'ua', 'ru'],
        defaultLocale: 'en',
        cookie: 'i18n',
        directory: path.join(__dirname, '../locales')
    });

    // Extend i18n with additional methods
    extend(i18n);

    return i18n;
};

export default configure;
