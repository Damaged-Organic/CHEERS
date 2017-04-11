/*jshint node:true*/
"use strict";

import mongoose from 'mongoose';

/* Using Mongoose connector for MongoDB as default */

let mongooseConnect = () => {
    // Set ES2015 promises to avoid deprecation notice
    mongoose.Promise = Promise;

    mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose errored: ' + err);
    });
};

export {
    mongooseConnect as connect
};
