const { parsePassword } = require('../helpers');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Login de usuário
 * 
 * @param {object} user_data 
 * @returns Promise
 */
const loginUser = async (user_data) => {
    return new Promise(async (res,rej) => {
        const {username, password} = user_data;
        if(!username || !password){
            return rej("Username and password are required")
        }

        const passwordHash = await parsePassword(password);

        const user = await User.findOne({
            username: username,
            password: passwordHash
        }).exec();

        
        if ( user === null ) {
            return rej("Access denied");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h"} );
        if(token){
            res(token);
        } else {
            return rej("Access denied");
        }
    });
}


module.exports = {
    loginUser
}