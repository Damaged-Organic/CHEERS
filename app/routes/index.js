/*jshint node:true*/
"use strict";

import { batchQuery } from '@helpers/database/mongoose';

import Case from '@models/Case';

export default function(router) {
    /* GET Home page. */
    router.get('/', 'index', (req, res, next) => {
        res.render('index', { title: 'Express' });
    });

    /* GET About page */
    router.get('/about/:id', 'about', (req, res, next) => {
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
}
