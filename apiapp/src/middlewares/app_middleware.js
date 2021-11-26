const AppMiddleware = (req, res, next) => {
    console.log("universal middleware")
    next();
}

module.exports = AppMiddleware;