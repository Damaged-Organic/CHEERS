"use strict";

import path from 'path';

import express from 'express';

let configure = () => {
    let staticPath = path.resolve(
        process.env.DIR_BASE,
        process.env.DIR_APP,
        'public'
    );

    return ['/static', express.static(staticPath)];
};

export default configure;
