/*jshint node:true*/
"use strict";

import { batchQuery } from '@helpers/database/mongoose';

import i18n from 'i18n';

import Case from '@models/mongoose/Case';

let homeTemplate = 'index';
let home = (req, res, next) => {
    res.render(homeTemplate, {
        title: 'Express',
        locale: i18n.getLocale(req),
    });
};

let aboutTemplate = 'about';
let about = (req, res, next) => {
    res.locals.path = req.path;
    res.render(aboutTemplate, {
        title: 'About Express',
        locale: i18n.getLocale(req),
    });
};

let casesTemplate = 'cases';
let cases = (req, res, next) => {
    Case.locale = i18n.getLocale(req);

    Case.find((err, cases) => {
        res.render(casesTemplate, { cases: cases });
    });
};

let casesDetailTemplate = 'case';
let casesDetail = (req, res, next) => {
    Case.locale = i18n.getLocale(req);

    let findParams = {
        _id: req.params.id,
        slug: req.params.slug,
    };

    Case.findOne(findParams, (err, theCase) => {
        res.render(casesDetailTemplate, { theCase: theCase });
    });
};

export default (router) => {
    /* Home page */
    router.get('/', 'index', home);

    /* About page */
    router.get('/about', 'about', about);

    /* Cases page */
    router.get('/cases', 'cases', cases);

    /* Case page */
    router.get('/cases/:id/:slug', 'case', casesDetail);

    return router;
};
