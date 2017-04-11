/*jshint node:true*/
"use strict";

export function batchQuery(queries, cb) {
    Promise.all(queries).then(objects => cb(objects));
}
