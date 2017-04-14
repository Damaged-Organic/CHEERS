/*jshint node:true*/
"use strict";

import path from 'path';

import { config as dotenv_config } from 'dotenv';
import databaseConnect from '@config/database/mongoose';

import express from 'express';

import NamedRouter from 'named-routes';

import helmet from 'helmet';
import logger from 'morgan';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

import configureCookieParser from '@config/cookieParser';
import configureSession from '@config/session';
import configureCors from '@config/cors';

import ipDetection from '@middleware/ipDetection';
import geolocation from '@middleware/geolocation';
import localization from '@middleware/localization';

import { registerHandlebarsHelpers } from '@helpers/view/handlebars';

import index from '@routes/index';

dotenv_config();
databaseConnect();

const app = express();

const router = express.Router();
const namedRouter = new NamedRouter();

// Set named-routes views helpers
namedRouter.extendExpress(router);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register handlebars helpers
registerHandlebarsHelpers(app, router);

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(configureCookieParser());
app.use(configureSession());
app.use(configureCors());
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(ipDetection);
app.use(geolocation);
app.use(localization);

// Routes
app.use('/', index(router));

// Set 404 if no error given and forward to error handler
app.use((err, req, res, next) => {
    if( !err ) {
        err = new Error('Not Found');
        err.status = 404;
    }

    next(err);
});

// Main error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
