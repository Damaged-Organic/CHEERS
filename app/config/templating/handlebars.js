"use strict";

import path from 'path';

import hbs from 'hbs';

import Helpers from '@services/templating/handlebars/Helpers';
import Partials from '@services/templating/handlebars/Partials';

const publicPath = process.env.PATH_PUBLIC;

const viewsPath = path.resolve(
    process.env.DIR_BASE, process.env.DIR_APP, 'views'
);

const partialsPath = path.resolve(
    process.env.DIR_BASE, process.env.DIR_APP, 'views/partials'
);

let configure = (app, router) => {
    app.set('views', viewsPath);
    app.set('view engine', 'hbs');

    let helpers = new Helpers(publicPath);
    registerHelpers(helpers, app, router);

    let partials = new Partials();
    registerPartials(partials);
};

function registerHelpers(helpers, app, router) {
    hbs.registerHelper('date', helpers.formatDate);
    hbs.registerHelper('toUpper', helpers.toUpper);
    hbs.registerHelper('toLower', helpers.toLower);
    hbs.registerHelper('static', helpers.staticPath());
    hbs.registerHelper('url', helpers.getURL(router));

    app.use((req, res, next) => {
        hbs.registerHelper('i18n', helpers.localize(res));
        next();
    });

    app.use((req, res, next) => {
        hbs.registerHelper('absoluteURL', helpers.getAbsoluteURL(req));
        next();
    });
}

function registerPartials(partials) {
    hbs.registerPartials(partialsPath);

    hbs.registerPartial('localesPartial', partials.locales);
}

export default configure;
