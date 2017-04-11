/*jshint node:true*/
"use strict";

import { config as dotenv_config } from 'dotenv';

import { connect as database_connect } from '@config/database';

import path from 'path';

import express from 'express';

import helmet from 'helmet';
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
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

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
