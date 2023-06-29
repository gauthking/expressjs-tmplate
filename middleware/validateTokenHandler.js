const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validate_Token = asyncHandler(async (res, req, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized")
            }
            req.user = decoded.user;
            next();

        });

        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing")
        }
    }
})

module.exports = validate_Token