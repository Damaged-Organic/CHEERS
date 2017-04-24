/*jshint node:true*/
"use strict";

import i18n from 'i18n';

let i18nType = { en: String, ua: String, ru: String };

let i18nTypeGetter = (modelName) => {
    return function(fieldValue) {
        return fieldValue[this.model(modelName).locale];
    };
};

let i18nVirtualMethods = (schema) => {
    schema.virtual('locale')
        .set(function(locale) {
            this.locale = locale;
        })
        .get(function() {
            if( !this.locale )
                this.locale = i18n.defaultLocale;

            return this.locale;
        })
    ;
};

let i18nModelMethods = (model) => {
    model.i18nInit = function(req, res) {
        this.locale = i18n.getLocale(req);

        return this;
    };
};

export { i18nType, i18nTypeGetter, i18nVirtualMethods, i18nModelMethods };
