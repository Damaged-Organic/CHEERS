"use strict";

import mongoose from 'mongoose';

import { I18nSchema } from '@models/mongoose/extensions/schema';
import { I18nString } from '@models/mongoose/extensions/schemaType';

const modelName = 'CaseBlock';

let caseBlockSchema = new I18nSchema({
    case: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Case'
    },
    title: {
        type: I18nString, modelName: modelName
    },
    content: {
        type: I18nString, modelName: modelName
    }
});

let CaseBlock = mongoose.model(modelName, caseBlockSchema);

export default CaseBlock;
