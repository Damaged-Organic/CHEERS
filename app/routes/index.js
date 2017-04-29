"use strict";

import i18n from 'i18n';

import { throwNotFoundException } from '@routes/exceptions/http';
import { asyncHandler } from '@routes/errors';

import Case from '@models/mongoose/Case';

let homeTemplate = 'index';
let home = asyncHandler(async (req, res) => {
    res.render(homeTemplate, {
        title: 'Express',
        locale: i18n.getLocale(req),
    });
});

let aboutTemplate = 'about';
let about = asyncHandler(async (req, res) => {
    res.render(aboutTemplate, {
        title: 'About Express',
        locale: i18n.getLocale(req),
    });
});

let casesTemplate = 'cases';
let cases = asyncHandler(async (req, res) => {
    let cases = await Case.i18nInit(req, res).find();

    res.render(casesTemplate, { cases: cases });
});

let casesDetailTemplate = 'case';
let casesDetail = asyncHandler(async (req, res) => {
    let findParams = {
        _id: req.params.id,
        slug: req.params.slug,
    };

    let theCase = await Case.i18nInit(req, res).findOne(findParams);

    if( !theCase )
        throwNotFoundException('Case not found!');

    res.render(casesDetailTemplate, { theCase: theCase });
});

export default (router) => {
    /* Home page */
    router.get(
        '/', 'index', home);

    /* About page */
    router.get(
        '/about', 'about', about);

    /* Cases page */
    router.get(
        '/cases', 'cases', cases);

    /* Case page */
    router.get(
        '/cases/:id/:slug', 'case', casesDetail);

    return router;
};
