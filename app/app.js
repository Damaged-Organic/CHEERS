"use strict";

import express from 'express';

import NamedRouter from 'named-routes';

import configureTemplating from '@config/templating/handlebars';
import configureDatabase from '@config/database/mongoose';

import configureLogger from '@config/middleware/logger';
import configureHelmet from '@config/middleware/helmet';
import configureBodyParser from '@config/middleware/bodyParser';
import configureCookieParser from '@config/middleware/cookieParser';
import configureSession from '@config/middleware/session';
import configureCors from '@config/middleware/cors';
import configureFavicon from '@config/middleware/favicon';
import configureStatic from '@config/middleware/static';

import subdomain from '@middleware/subdomain';
import ipDetection from '@middleware/ipDetection';
import geolocation from '@middleware/geolocation';
import localization from '@middleware/localization';

import { handler404, handler500 } from '@routes/errors';
import index from '@routes/index';

const app = express();

// Set named-routes views helpers
const router = express.Router();
const namedRouter = new NamedRouter();
namedRouter.extendExpress(router);

// Templating (Handlebars)
configureTemplating(app, router);

// Database (Mongoose)
configureDatabase();

// Third-party middleware
app.use(configureHelmet());
app.use(configureLogger(app.get('env')));

const bodyParser = configureBodyParser();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded);

app.use(configureCookieParser());
app.use(configureSession());
app.use(configureCors());
app.use(configureFavicon());
app.use(...configureStatic());

// Custom-tailored middleware
app.use(subdomain);
app.use(ipDetection);
app.use(geolocation);
app.use(localization);

// Routes
app.use('/', index(router));

// Error handlers
app.use(handler404);
app.use(handler500);

export default app;
