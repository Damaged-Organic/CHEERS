"use strict";

import subdomain from 'express-subdomain';

let getUserSubdomain = (req) => {
    let userSubdomain = req.subdomains[0];

    if( !userSubdomain )
        return false;

    let availableSubdomains = [
        process.env.LOCALE_EN, process.env.LOCALE_UA, process.env.LOCALE_RU
    ];

    if( userSubdomain ) {
        if( !availableSubdomains.includes(userSubdomain) )
            throw new Error('Subdomain not found');

         return userSubdomain;
    }
};

let processDependentModules = (subdomain, req, res) => {
    req.app.subdomains = {};

    let userSubdomain;
    if( (userSubdomain = getUserSubdomain(req)) )
        req.app.subdomains.userSubdomain = userSubdomain;
};

export default subdomain('*', (req, res, next) => {
    try {
        processDependentModules(subdomain, req, res);
    } catch(err) {
        err.status = 404;
        return next(err);
    }

    next();
});
