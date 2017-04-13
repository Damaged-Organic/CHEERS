/*jshint node:true*/
"use strict";

import path from 'path';
import moment from 'moment';

import i18n from 'i18n';

import hbs from 'hbs';

let staticHelper = (directory, filename) => {
    return path.join(process.env.PUBLIC_PATH, directory, filename);
};

let dateHelper = (date, format) => {
    date = moment(date);

    if( !date.isValid() )
        throw new Error('Invalid date.');

    return date.format(format);
};

let i18nHelper = (res) => {
    return (...args) => {
        let name = args.shift();
        return res.__(name);
    };
};

let urlHelper = (router) => {
    return (name, params, method) => {
        params = params.hash;
        return router.namedRoutes.build(name, params, method);
    };
};

export function registerHandlebarsHelpers(app, router) {
    // Static assets path
    hbs.registerHelper('static', staticHelper);

    // Date formatter
    hbs.registerHelper('date', dateHelper);

    // i18n translator
    app.use((req, res, next) => {
        hbs.registerHelper('i18n', i18nHelper(res));
        next();
    });

    // Hotfix to make named-routes helper work
    // due to route arguments handling error
    hbs.registerHelper('url', urlHelper(router));
}
