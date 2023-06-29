const { constants } = require("../constants")

const handler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
    switch (status) {
        case constants.VALIDATION_ERR:
            res.json({
                title: "Validation FAILED",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "NOT FOUND ERR",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized ACCESS!",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "FORBIDDEN",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERR:
            res.json({
                title: "Server ERROR",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        default:
            console.log("No error detected")
            break;
    }
}

module.exports = handler