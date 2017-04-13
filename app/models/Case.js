/*jshint node:true*/
"use strict";

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let LocalizedType = { en: String, ru: String };
let getLocalized = (v) => {
    return v.en;
};

let caseSchema = new Schema({
    title: {
        type: LocalizedType, get: getLocalized
    },
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
