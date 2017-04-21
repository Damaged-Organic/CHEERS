/*jshint node:true*/
"use strict";

import path from 'path';

import i18n from 'i18n';

import hbs from 'hbs';

export function registerHandlebarsPartials() {
    hbs.registerPartials(path.join(__dirname, '../../views/partials'));

    hbs.registerPartial('localesPartial', (options) => {
        let template = hbs.handlebars.partials.locales;
        let partial = hbs.handlebars.compile(template);

        return partial({ locales: i18n.getLocales() });
    });
}
