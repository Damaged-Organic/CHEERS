/*jshint node:true*/
"use strict";

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let caseSchema = new Schema({
    title: String,
    slug: String,
    image: {
        filename: String,
        size: Number,
        mimetype: String
    },
    content: String,
    createdAt: Date,
    updatedAt: Date
});

let Case = mongoose.model('Case', caseSchema);

export default Case;
