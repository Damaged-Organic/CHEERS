"use strict";

import mongoose from 'mongoose';

import { I18nSchema } from '@models/mongoose/extensions/schema';
import { I18nString } from '@models/mongoose/extensions/schemaType';

const modelName = 'Case';

let caseSchema = new I18nSchema({
    caseBlocks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CaseBlock'
    },
    title: {
        type: I18nString, modelName: modelName
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

let Case = mongoose.model(modelName, caseSchema);

export default Case;
