/*jshint node:true*/
"use strict";

import path from 'path';

import favicon from 'serve-favicon';

let configure = () => {
    let faviconPath = path.resolve(
        process.env.DIR_BASE,
        process.env.DIR_APP,
        'public/favicon.png'
    );

    return favicon(faviconPath);
};

export default configure;
