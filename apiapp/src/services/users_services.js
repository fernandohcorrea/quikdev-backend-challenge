const { parsePassword, parsePhone } = require('../helpers');
const User = require('../models/User');

/**
 * Cria Usuário
 * @param {object} user_data 
 * @returns Promise
 */
const createUser = async (user_data) => {
    return new Promise(async(res, rej) =>{
        user_data.password = await parsePassword(user_data.password);
        if(!user_data.password){
            rej("Invalid password, please try another stronger password");
        }

        user_data.primaryPhone = parsePhone(user_data.primaryPhone);
        if(!user_data.primaryPhone){
            rej("Invalid primaryPhone format");
        }
        const user = new User(user_data);

        await user.save()
            .then((result) =>{
                res(result);
            })
            .catch((err) =>{
                rej(err);
            });
    });
}

module.exports = {
    createUser 
}