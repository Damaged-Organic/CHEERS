/*jshint node:true*/
"use strict";

import cookieParser from 'cookie-parser';

let configure = () => {
    return cookieParser(process.env.COOKIE_SECRET);
};

export default configure;
