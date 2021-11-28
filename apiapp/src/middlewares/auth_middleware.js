const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AuthMiddleware = async(req, res, next) => {
    
    if(!req.headers.authorization){
        return res.status(401).json({
            message : "Auth Token error",
            status: 'NOK'
        }).end();
    }

    try {
        const authorization = req.headers.authorization;
    
        const token = authorization.replace('Bearer ', '');
            const chkToken = jwt.verify(token, process.env.JWT_SECRET);
    
            const user = await User.findById(chkToken.id);
            if (user === null) {
                return res.status(401).json({
                    message: "Auth Token error", 
                    status: 'NOK'
                }).end();
            }
            req.user = user;
        
    } catch (error) {
        return res.status(401).json({
            message: "Auth Token error",
            error,
            status: 'NOK'
        }).end();
    }

    next();
}

module.exports = AuthMiddleware;