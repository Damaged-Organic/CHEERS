"use strict";

let asyncHandler = (route) => {
    return (req, res, next) => {
        const routePromise = route(req, res, next);

        if( routePromise.catch ) {
            routePromise.catch(err => next(err));
        }
    }
}

let handler404 = (err, req, res, next) => {
    if( !err ) {
        err = new Error('Not Found');
        err.status = 404;
    }

    next(err);
};

let handler500 = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
};

export { asyncHandler, handler404, handler500 };
