/*jshint node:true*/
"use strict";

import path from 'path';
import i18n from 'i18n';

import extend from '@helpers/extensions/i18n';

const cookie = 'i18n';

let configure = () => {
    i18n.configure({
        locales: ['en', 'ua', 'ru'],
        defaultLocale: 'en',
        cookie: cookie,
        directory: path.join(__dirname, '../../locales')
    });

    // Extend i18n with additional methods
    extend(i18n);

    return i18n;
};

export default configure;

export { cookie };
