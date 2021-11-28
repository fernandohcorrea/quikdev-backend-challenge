const AppMiddleware3 = (req, res, next) => {
    console.log("auth_middleware")
    next();
}

module.exports = AppMiddleware3;