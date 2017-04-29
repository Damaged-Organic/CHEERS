"use strict";

import cookieParser from 'cookie-parser';

const cookie = process.env.COOKIE_SECRET;

let configure = () => {
    return cookieParser(cookie);
};

export default configure;
