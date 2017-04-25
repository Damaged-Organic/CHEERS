"use strict";

let throwNotFoundException = (message) => {
    let err = new Error(message);
    err.status = 404;
    throw err;
}

export { throwNotFoundException };
