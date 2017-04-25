"use strict";

import bodyParser from 'body-parser';

let configure = () => {
    return {
        json: bodyParser.json(),
        urlencoded: bodyParser.urlencoded({ extended: true }),
    };
};

export default configure;
