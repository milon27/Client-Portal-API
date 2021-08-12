const Response = require("../../models/Response");
//for all other error
const ErrorMid = (e, req, res, next) => {
    console.log("error Middleware: ", e.code);
    if (e.code !== 'EBADCSRFTOKEN') {
        return next(e);
    }
    res.status(403).json(Response(true, e.message, e))
}
//for 404 error
const Error404Mid = (req, res) => {
    res.status(404).json(Response(true, "Not Found", false))
}


module.exports = [ErrorMid, Error404Mid]