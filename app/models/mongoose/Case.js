"use strict";

import mongoose from 'mongoose';

import {
    i18nType, i18nTypeGetter, i18nVirtualMethods, i18nModelMethods
} from '@helpers/database/i18n';

const modelName = 'Case';
const Schema = mongoose.Schema;

let caseSchema = new Schema({
    title: {
        type: i18nType, get: i18nTypeGetter(modelName)
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

i18nVirtualMethods(caseSchema);

let Case = mongoose.model(modelName, caseSchema);

i18nModelMethods(Case);

export default Case;
