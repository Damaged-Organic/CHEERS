/*jshint node:true*/
"use strict";

import { config as dotenv_config } from 'dotenv';

import { connect as database_connect } from '@config/database';

import ipware from '@middleware/ipware';
import geolocation from '@middleware/geolocation';
import i18n from '@middleware/i18n';

import path from 'path';

import express from 'express';

import helmet from 'helmet';
import cors from 'cors';

import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';

import NamedRouter from 'named-routes';

import { registerHandlebarsHelpers } from '@helpers/view/handlebars';

import index from '@routes/index';

dotenv_config();
database_connect();

const app = express();

const router = express.Router();
const namedRouter = new NamedRouter();

// Set named-routes views helpers
namedRouter.extendExpress(router);

// Register handlebars helpers
registerHandlebarsHelpers(app, router);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(helmet());
app.use(cors({
    origin: ["http://127.0.0.1"],
    methods: ["GET", "POST"]
}));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 86000, secure: true }
}));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(ipware);

// Geolocation module
app.use(geolocation);

// i18n
app.use(i18n);

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
