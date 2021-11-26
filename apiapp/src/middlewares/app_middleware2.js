const AppMiddleware2 = (req, res, next) => {
    console.log("universal middleware 2")
    next();
}

module.exports = AppMiddleware2;