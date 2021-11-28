// const UsersServices = require('../services/users_services')

const AuthServices = require("../services/auth_services");

/**
 * Login Controller
 * @returns object
 */
const LoginController = () => {
  return {

    "login" : async function(req, res)
    {
      AuthServices.loginUser(req.body)
        .then((token) => {
          res.status(201).json({
            token,
            status: 'OK'
          }).end();
        })
        .catch((error) => {
          res.status(401).json({
            message : error.message,
            status: 'NOK',
            error
          }).end();
        });
    },


  }

};

module.exports = LoginController();
