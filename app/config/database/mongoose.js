"use strict";

import mongoose from 'mongoose';

const connectionURI = process.env.MONGO_URI;

let configure = () => {
    mongoose.Promise = Promise;

    // Set ES2015 promises to avoid deprecation notice
    mongoose.Promise = Promise;

    mongoose.connect(connectionURI);

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose errored: ' + err);
    });
};

export default configure;
