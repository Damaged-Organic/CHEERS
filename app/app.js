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

import subdomain from '@middleware/subdomain';
import ipDetection from '@middleware/ipDetection';
import geolocation from '@middleware/geolocation';
import localization from '@middleware/localization';

import { registerHandlebarsHelpers } from '@helpers/view/handlebarsHelpers';
import { registerHandlebarsPartials } from '@helpers/view/handlebarsPartials';

import { handler404, handler500 } from '@routes/errors';
import index from '@routes/index';

const app = express();

dotenvConfigure({ path: path.resolve(`.${app.get('env')}.env`) });
databaseConnect();

// Set named-routes views helpers
const router = express.Router();
const namedRouter = new NamedRouter();
namedRouter.extendExpress(router);

const bodyParser = configuredBodyParser();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register handlebars helpers
registerHandlebarsHelpers(app, router);
registerHandlebarsPartials();

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
