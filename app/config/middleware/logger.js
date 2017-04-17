/*jshint node:true*/
"use strict";

import morgan from 'morgan';

let configure = () => {
    return morgan('dev');
};

export default configure;
