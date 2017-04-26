"use strict";

import mongoose from 'mongoose';

class I18nString {
    constructor(v) {
        for(let lang in v) {
            this[lang] = v[lang];
        }
    }
}

class I18nStringSchemaType extends mongoose.SchemaType {
    constructor(path, options, instance) {
        if( !options.modelName )
            throw new Error('Model name should be set!');

        super(path, options, instance);
    }

    cast(v) {
        let model = mongoose.model(this.options.modelName);

        return new I18nString(v)[model.locale];
    }
}

export { I18nString, I18nStringSchemaType };
