const AppMiddleware3 = (req, res, next) => {
    console.log("route middleware 3")
    next();
}

module.exports = AppMiddleware3;