"use strict";

import hbs from 'hbs';

import { instance as localization } from '@config/middleware/localization';

class Partials
{
    // Language menu
    locales() {
        let template = hbs.handlebars.partials.locales;
        let partial = hbs.handlebars.compile(template);

        return partial({ locales: localization.getLocales() });
    }
}

export default Partials;
