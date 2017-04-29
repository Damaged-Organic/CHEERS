"use strict";

import session from 'express-session';

const cookie = process.env.COOKIE_SECRET;
const origin = process.env.COOKIE_SECRET;

let configure = () => {
    return session({
        secret: cookie,
        resave: false,
        saveUninitialized: true,
        cookie: {
            domain: origin, maxAge: 86000
        }
    });
};

export default configure;
