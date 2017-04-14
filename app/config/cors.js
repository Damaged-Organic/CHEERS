/*jshint node:true*/
"use strict";

import cors from 'cors';

let configure = () => {
    return cors({
        origin: [process.env.ORIGIN],
        methods: ["GET", "POST"]
    });
};

export default configure;
