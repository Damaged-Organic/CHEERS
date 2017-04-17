/*jshint node:true*/
"use strict";

let handler_404 = (err, req, res, next) => {
    if( !err ) {
        err = new Error('Not Found');
        err.status = 404;
    }

    next(err);
};

let handler_500 = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
};

export { handler_404, handler_500 };
