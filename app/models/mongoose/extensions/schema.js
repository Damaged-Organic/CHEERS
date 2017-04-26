"use strict";

import i18n from 'i18n';

import mongoose from 'mongoose';

import { I18nStringSchemaType } from '@models/mongoose/extensions/schemaType';

class I18nSchema extends mongoose.Schema {
    constructor(obj, options) {
        super(obj, options);

        this.statics.i18nInit = function(req, res) {
            this.locale = i18n.getLocale(req);

            return this;
        }

        this.virtual('locale')
            .set((locale) => {
                this.locale = locale;
            })
            .get(() => {
                if( !this.locale )
                    this.locale = i18n.defaultLocale;

                return this.locale;
            })
        ;
    }
}

I18nSchema.Types.I18nString = I18nStringSchemaType;

export { I18nSchema };
