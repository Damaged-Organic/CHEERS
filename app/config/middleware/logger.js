"use strict";

import fs from 'fs';
import path from 'path';

import morgan from 'morgan';

const logPath = path.resolve(
    process.env.DIR_BASE,
    'logs/morgan.log'
);

let configure = (env) => {
    let options = [];

    if( env == 'production' ) {
        options = ['common', {
            skip: function(req, res) { return res.statusCode < 400 },
            stream: fs.createWriteStream(logPath, { flags: 'a' })
        }];
    } else {
        options = ['dev'];
    }

    return morgan(...options);
};

export default configure;
