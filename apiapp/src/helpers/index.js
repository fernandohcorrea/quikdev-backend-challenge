const bcrypt = require('bcrypt')
const sha256 = require('sha256');

/**
 * Hash Text
 * @param {string} str 
 * @returns string | false
 */
const hashText = async (str, type='sha256', salt=10) => {
    if(typeof str != "string" || str.length < 3){
        return false;
    }

    let hashString = '';
    switch (type) {
        case 'crypt':
            hashString = await bcrypt.hash(str, salt);
            break;
    
        case 'sha256':
        default:
            hashString = sha256(`${str}${salt}`);
            break;
    }

    return hashString;
}

/**
 * Parse de Password e Validação
 * @param {*} password_plain_text 
 * @returns string | false
 */
const parsePassword = async (password_plain_text) => {
    if(typeof password_plain_text != "string" || password_plain_text.length < 8){
        return false;
    }
    return await hashText(password_plain_text);
}

/**
 * Parse phone
 * @param {*} phone_number 
 * @returns string | false
 */
const parsePhone = (phone_number) => {
    phone_number = String(phone_number);
    phone_number = phone_number.match( /\d+/ig ).join('');
    if(phone_number.length < 10 || phone_number.length > 11){
        return false;
    }

    const parts_phone = /^(?<ddd>\d{2})(?<part>\d+)(?<last>\d{4})$/g.exec(phone_number);
    if(!parts_phone){
        return false;
    }

    phone_number =  `(${parts_phone.groups.ddd}) ${parts_phone.groups.part}-${parts_phone.groups.last}`;

    return phone_number;
}

module.exports = {
    hashText,
    parsePassword,
    parsePhone
}