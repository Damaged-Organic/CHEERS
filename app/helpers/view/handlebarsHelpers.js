"use strict";

import path from 'path';
import moment from 'moment';

import i18n from 'i18n';

import hbs from 'hbs';

let staticHelper = (directory, filename) => {
    return path.join(process.env.PATH_PUBLIC, directory, filename);
};

let dateHelper = (date, format) => {
    date = moment(date);

    if( !date.isValid() )
        throw new Error('Invalid date.');

    return date.format(format);
};

let toUpperHelper = (text) => {
    return text.toUpperCase();
};

let toLowerHelper = (text) => {
    return text.toLowerCase();
};

let i18nHelper = (res) => {
    return (...args) => {
        let name = args.shift();
        return res.__(name);
    };
};

let absoluteURLHelper = (req) => {
    return (subdomain) => {
        let domain = process.env.ORIGIN;

        subdomain = subdomain ? subdomain + '.' : null;

        return `${req.protocol}://${subdomain}${domain}${req.path}`;
    };
};

let urlHelper = (router) => {
    return (name, params, method) => {
        params = params.hash;
        return router.namedRoutes.build(name, params, method);
    };
};

export function registerHandlebarsHelpers(app, router) {
    hbs.registerPartials(path.join(__dirname, '../../views/partials'));

    hbs.registerPartial('locale_partial', () => {
        let template = hbs.handlebars.partials.locale;
        let partial = hbs.handlebars.compile(template);

        return partial({ locales: i18n.getLocales() });
    });

    // Static assets path
    hbs.registerHelper('static', staticHelper);

    // Date formatter
    hbs.registerHelper('date', dateHelper);

    // Case transformers
    hbs.registerHelper('toUpper', toUpperHelper);
    hbs.registerHelper('toLower', toLowerHelper);

    // i18n translator
    app.use((req, res, next) => {
        hbs.registerHelper('i18n', i18nHelper(res));
        next();
    });

    // Absolute URL builder
    app.use((req, res, next) => {
        hbs.registerHelper('absoluteURL', absoluteURLHelper(req));
        next();
    });

    // Hotfix to make named-routes helper work
    // due to route arguments handling error
    hbs.registerHelper('url', urlHelper(router));
}
