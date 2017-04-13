/*jshint node:true*/
"use strict";

import { batchQuery } from '@helpers/database/mongoose';

import Case from '@models/Case';
import i18n from 'i18n';

export default (router) => {
    /* GET Home page. */
    router.get('/', 'index', (req, res, next) => {
        res.render('index', {
            title: 'Express',
            locale: i18n.getLocale(req)
        });
    });

    router.get('/en', 'i18n_english', (req, res, next) => {
        res.cookie('i18n', 'en');
        res.redirect('/');
    });

    router.get('/ua', 'i18n_ukrainian', (req, res, next) => {
        res.cookie('i18n', 'ua');
        res.redirect('/');
    });

    router.get('/ru', 'i18n_russian', (req, res, next) => {
        res.cookie('i18n', 'ru');
        res.redirect('/');
    });

    /* GET About page */
    router.get('/about', 'about', (req, res, next) => {
        res.render('about', { title: 'About Express' });
    });

    router.get('/cases', 'cases', (req, res, next) => {
        // let cases_query_1 = Case.find();
        // let cases_query_2 = Case.find();
        //
        // batchQuery([cases_query_1, cases_query_2], (objects) => {
        //     let [cases_1, cases_2] = objects;
        //
        //     res.json({cases_1, cases_2});
        // });

        Case.find((err, cases) => {
            res.render('cases', { cases: cases });
        });
    });

    router.get('/cases/:id/:slug', 'case', (req, res, next) => {
        let findParams = {
            _id: req.params.id,
            slug: req.params.slug
        };

        Case.findOne(findParams, (err, theCase) => {
            res.render('case', { theCase: theCase });
        });
    });

    return router;
};
