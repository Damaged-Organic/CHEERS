/*jshint node:true*/
"use strict";

import i18n from 'i18n';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let LocalizedType = { en: String, ru: String };
let getLocalized = (v) => {
    return v[Case.locale];
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

caseSchema.virtual('locale')
    .set((locale) => {
        this.locale = locale;
    })
    .get(() => {
        let locale;

        if( !this.locale )
            locale = i18n.defaultLocale;

        return this.locale;
    })
;

caseSchema.pre('init', (done, caseObject) => {
    caseObject.locale = i18n.getLocale();
    done();
});

let Case = mongoose.model('Case', caseSchema);

export default Case;
