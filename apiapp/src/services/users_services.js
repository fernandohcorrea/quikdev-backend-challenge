const { parsePassword, parsePhone } = require('../helpers');
const User = require('../models/User');

/**
 * Cria Usuário
 * 
 * @param {object} user_data 
 * @returns Promise
 */
const createUser = async (user_data) => {
    return new Promise(async(res, rej) => {

        if(typeof user_data != 'object' || !Object.keys(user_data).length ){
            rej("Invalid user data");
        }

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

/**
 * Atualiza de Usuário
 * 
 * @param {object} user_data 
 * @returns Promise
 */
const updateUser = async (id, user_data) => {
    return new Promise(async(res,rej) => {

        if(typeof user_data != 'object' || !Object.keys(user_data).length ){
            rej("Invalid user data");
        }

        if(user_data.password){
            user_data.password = await parsePassword(user_data.password);
            if(!user_data.password){
                rej("Invalid password, please try another stronger password");
            }
        }

        if(user_data.primaryPhone){
            user_data.primaryPhone = parsePhone(user_data.primaryPhone);
            if(!user_data.primaryPhone){
                rej("Invalid primaryPhone format");
            }
        }

        const conditions = {
            _id: id
        };

        const options = {
            new : true
        }

        const promise = User.findOneAndUpdate(conditions, user_data, options).exec();

        promise.then((result) =>{
                res(result);
            })
            .catch((err) =>{
                rej(err);
            });
    });
}

/**
 * Remove Usuário
 * 
 * @param {string} id
 * @returns Promise
 */
const deleteUser = async(id) => {
    return new Promise(async (res,rej) =>{
        const promise = User.deleteOne({ _id: id }).exec();

        promise.then((result) =>{
                res(result);
            })
            .catch((err) =>{
                rej(err);
            });
    });
}

const selectUser = async(id, filters = {}) => {
    return new Promise(async (res,rej) => {

        let page  = typeof filters.page == 'undefined' ? 1 : parseInt(filters.page);
        let limit = typeof filters.limit == 'undefined' ? 5 : ( parseInt(filters.limit) > 100 ? 100 : parseInt(filters.limit)) ;
        let skip = (page - 1) * limit;

        let query = {}

        if(id) {
            query['_id'] = id;
        }

        const total =  await User.find(query).count().exec();

        if(limit > total){
            skip = 0;
        }

        let pages = Math.ceil(total/limit);

        const prepare = User.find(query).limit(limit).skip(skip);

        prepare.projection({
            _id: true,
            name: true,
            username: true,
            birthdate: true,
            address: true,
            addressNumber: true,
            primaryPhone: true,
            description: true,
            createdAt: true,
            updatedAt: true,

        });

        const promise = prepare.exec();

        promise.then((users) =>{
                let count = users.length;
                if(count == 1){
                    res(users);
                } else {
                    res({users, total, count, page, pages, limit});
                }
            })
            .catch((err) =>{
                rej(err);
            });
    });
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    selectUser
}