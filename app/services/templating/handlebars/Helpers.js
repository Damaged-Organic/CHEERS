"use strict";

import path from 'path';
import moment from 'moment';

const _publicPath = Symbol();

class Helpers
{
    constructor(publicPath) {
        this[_publicPath] = publicPath;
    }

    // Static assets path
    staticPath() {
        let publicPath = this[_publicPath];

        return function(directory, filename) {
            return path.join(publicPath, directory, filename);
        }
    }

    // Date formatter
    formatDate(date, format) {
        date = moment(date);

        if( !date.isValid() )
            throw new Error('Invalid date.');

        return date.format(format);
    }

    // Upper case transformers
    toUpper(text) {
        return text.toUpperCase();
    }

    // Lower case transformers
    toLower(text) {
        return text.toLowerCase();
    }

    // Localization translator
    localize(res) {
        return (...args) => {
            let name = args.shift();
            return res.__(name);
        };
    }

    // Hotfix to make named-routes helper work
    // due to route arguments handling error
    getURL(router) {
        return (name, params, method) => {
            params = params.hash;

            return router.namedRoutes.build(name, params, method);
        };
    }

    // Absolute URL builder
    getAbsoluteURL(req) {
        return (subdomain) => {
            let domain = process.env.ORIGIN;

            subdomain = subdomain ? subdomain + '.' : null;

            return `${req.protocol}://${subdomain}${domain}${req.path}`;
        };
    }
}

export default Helpers;
