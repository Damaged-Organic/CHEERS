"use strict";

import cors from 'cors';

const origin = process.env.CORS_ORIGIN;

let configure = () => {
    return cors({
        origin: [origin],
        methods: ["GET", "POST"]
    });
};

export default configure;
