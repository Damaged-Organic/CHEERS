/*jshint node:true*/
"use strict";

import mongoose from 'mongoose';

let databaseConnect = () => {
    // Set ES2015 promises to avoid deprecation notice
    mongoose.Promise = Promise;

    mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose errored: ' + err);
    });
};

export default databaseConnect;
