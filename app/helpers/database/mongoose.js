/*jshint node:true*/
"use strict";

/*
 * Usage example:
 * let model_1_query = Model_1.find();
 * let model_2_query = Model_2.find();
 *
 * batchQuery([model_1_query, model_2_query], (objects) => {
 *     let [model_1_results, model_2_results] = objects;

 *     res.json({model_1_results, model_2_results});
 * });
 */
export function batchQuery(queries, cb) {
    Promise.all(queries).then(objects => cb(objects));
}
