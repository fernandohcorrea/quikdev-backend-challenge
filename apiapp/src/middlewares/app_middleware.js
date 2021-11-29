const AppMiddleware = (req, res, next) => {
    //console.log("universal middleware");
    // code here ..
    next();
}

module.exports = AppMiddleware;