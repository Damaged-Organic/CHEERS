"use strict";

import i18n from 'i18n';

import mongoose from 'mongoose';

import { I18nStringSchemaType } from '@models/mongoose/extensions/schemaType';

const _locale = Symbol();

// Could also accept the response argument
const i18nInit = function(req) {
    this.schema.locale = i18n.getLocale(req);

    return this;
}

class I18nSchema extends mongoose.Schema
{
    constructor(obj, options) {
        super(obj, options);

        this[_locale] = i18n.defaultLocale;

        this.statics.i18nInit = i18nInit;
    }

    set locale(locale) {
        if( !(typeof locale === 'string') )
            return false;

        this[_locale] = locale;
    }

    get locale() {
        if( !this[_locale] )
            return undefined;

        return this[_locale];
    }
}

I18nSchema.Types.I18nString = I18nStringSchemaType;

export { I18nSchema };
