"use strict";

import path from 'path';

import favicon from 'serve-favicon';

const faviconPath = path.resolve(
    process.env.DIR_BASE,
    process.env.DIR_APP,
    'public/favicon.png'
);

let configure = () => {
    return favicon(faviconPath);
};

export default configure;
