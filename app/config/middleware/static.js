/*jshint node:true*/
"use strict";

import path from 'path';

import express from 'express';

let configure = () => {
    return ['/static', express.static(path.join(__dirname, '../../public'))];
};

export default configure;
