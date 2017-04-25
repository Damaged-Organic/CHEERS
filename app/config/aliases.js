"use strict";

import path from 'path';
import moduleAlias from 'module-alias';

/* Application path aliases definition */

moduleAlias.addAlias('@root', path.resolve(__dirname, '../'));
moduleAlias.addAlias('@config', path.resolve(__dirname, '../config'));
moduleAlias.addAlias('@routes', path.resolve(__dirname, '../routes'));
moduleAlias.addAlias('@models', path.resolve(__dirname, '../models'));
moduleAlias.addAlias('@views', path.resolve(__dirname, '../views'));
moduleAlias.addAlias('@middleware', path.resolve(__dirname, '../middleware'));
moduleAlias.addAlias('@helpers', path.resolve(__dirname, '../helpers'));

export default moduleAlias;
