const httpBuildQuery = require('http-build-query');
const mongoose = require('mongoose');

let mongo_config = {}

const required_config = [
    'MONGO_DB_USER',
    'MONGO_DB_USER_PASS',
    'MONGO_DB_HOST',
    'MONGO_DB_PORT',
    'MONGO_DB_DATABASE'
];

required_config.forEach(key => {
    if( !process.env[key] ){
        throw new Error(`Environment key(${key}) is required`);
    }

    mongo_config[key] = process.env[key];
});

if(process.env.NODE_ENV == 'test'){
    mongo_config.MONGO_DB_DATABASE += '-test'
}

const query_params = {
    authSource: process.env['MONGO_DB_AUTH_SOURCE'] || 'admin',
    readPreference: process.env['MONGO_DB_READ_PREFERENCE'] || 'primary',
    ssl: process.env['MONGO_DB_SSL'] || false
}

const mongo_url_params = httpBuildQuery(query_params);
const mongo_str_connection = `mongodb://${mongo_config.MONGO_DB_USER}:${mongo_config.MONGO_DB_USER_PASS}@${mongo_config.MONGO_DB_HOST}:${mongo_config.MONGO_DB_PORT}/${mongo_config.MONGO_DB_DATABASE}?${mongo_url_params}`
const conn = mongoose.connect(mongo_str_connection);

module.exports = conn;