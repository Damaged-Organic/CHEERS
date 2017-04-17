/*jshint node:true*/
"use strict";

import path from 'path';

import favicon from 'serve-favicon';

let configure = () => {
    return favicon(path.join(__dirname, '../../public', 'favicon.png'));
};

export default configure;
