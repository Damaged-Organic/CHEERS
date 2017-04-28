"use strict";

import session from 'express-session';

let configure = () => {
    return session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { domain: process.env.ORIGIN, maxAge: 86000 }
    });
};

export default configure;
