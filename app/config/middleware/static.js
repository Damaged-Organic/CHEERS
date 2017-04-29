"use strict";

import path from 'path';

import express from 'express';

const staticPath = path.resolve(
    process.env.DIR_BASE,
    process.env.DIR_APP,
    'public'
);

let configure = () => {
    return ['/static', express.static(staticPath)];
};

export default configure;
