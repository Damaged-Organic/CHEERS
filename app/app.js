/*jshint node:true*/
"use strict";

import path from 'path';

import { config as dotenvConfigure } from 'dotenv';

import express from 'express';

import NamedRouter from 'named-routes';

import databaseConnect from '@config/database/mongoose';

import configuredLogger from '@config/middleware/logger';
import configuredHelmet from '@config/middleware/helmet';
import configuredBodyParser from '@config/middleware/bodyParser';
import configuredCookieParser from '@config/middleware/cookieParser';
import configuredSession from '@config/middleware/session';
import configuredCors from '@config/middleware/cors';
import configuredFavicon from '@config/middleware/favicon';
import configuredStatic from '@config/middleware/static';

import ipDetection from '@middleware/ipDetection';
import geolocation from '@middleware/geolocation';
import localization from '@middleware/localization';

import { registerHandlebarsHelpers } from '@helpers/view/handlebars';

import { handler_404, handler_500 } from '@routes/errors';
import index from '@routes/index';

dotenvConfigure();
databaseConnect();

const app = express();
const router = express.Router();

const bodyParser = configuredBodyParser();

// Set named-routes views helpers
const namedRouter = new NamedRouter();
namedRouter.extendExpress(router);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register handlebars helpers
registerHandlebarsHelpers(app, router);

// Third-party middleware
app.use(configuredHelmet());
app.use(configuredLogger());
app.use(bodyParser.json);
app.use(bodyParser.urlencoded);
app.use(configuredCookieParser());
app.use(configuredSession());
app.use(configuredCors());
app.use(configuredFavicon());
app.use(...configuredStatic());

// Custom-tailored middleware
app.use(ipDetection);
app.use(geolocation);
app.use(localization);

// Routes
app.use('/', index(router));

// Error handlers
app.use(handler_404);
app.use(handler_500);

export default app;
