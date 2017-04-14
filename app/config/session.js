/*jshint node:true*/
"use strict";

import session from 'express-session';

let configure = () => {
    return session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 86000, secure: true }
    });
};

export default configure;
