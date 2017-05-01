"use strict";

import mongoose from 'mongoose';

import { instance as localization } from '@config/middleware/localization';
import { I18nStringSchemaType } from '@models/mongoose/extensions/schemaType';

const _locale = Symbol();

// Could also accept the response argument
const i18nInit = function(req) {
    this.schema.locale = localization.getLocale(req);

    return this;
}

class I18nSchema extends mongoose.Schema
{
    constructor(obj, options) {
        super(obj, options);

        this[_locale] = null;

        this.statics.i18nInit = i18nInit;
    }

    set locale(locale) {
        if( !(typeof locale === 'string') )
            return false;

        this[_locale] = locale;
    }

    get locale() {
        if( !this[_locale] )
            return localization.defaultLocale;

        return this[_locale];
    }
}

I18nSchema.Types.I18nString = I18nStringSchemaType;

export { I18nSchema };
