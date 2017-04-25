"use strict";

import cors from 'cors';

let configure = () => {
    return cors({
        origin: [process.env.CORS_ORIGIN],
        methods: ["GET", "POST"]
    });
};

export default configure;
