const UsersServices = require('../services/users_services')

/**
 * Users Controller
 * @returns object
 */
const UsersController = () => {
  return {

    "create" : async function(req, res)
    {
      UsersServices.createUser(req.body)
        .then((user) => {
          res.status(201).json({
            id: user._id,
            status: 'OK'
          }).end();
        })
        .catch((error) => {
          res.status(400).json({
            message : error.message,
            status: 'NOK',
            error
          }).end();
        });
    },

    "select" : async function(req, res) {
      UsersServices.selectUser(req.params.id, req.query)
      .then((data) => {
        res.status(200).json({
          data,
          status: 'OK'
        }).end();
      })
      .catch((error) => {
        res.status(400).json({
          message : error.message,
          status: 'NOK',
          error
        }).end();
      });
    },

    "update" : async function(req, res)
    {
      UsersServices.updateUser(req.params.id, req.body)
        .then((user) => {
          res.status(200).json({
            id: user._id,
            status: 'OK'
          }).end();
        })
        .catch((error) => {
          res.status(400).json({
            message : error.message,
            status: 'NOK',
            error
          }).end();
        });
    },

    "delete" : async function(req, res)
    {
      UsersServices.deleteUser(req.params.id)
        .then(() => {
          res.status(200).json({
            id: req.params.id,
            status: 'OK'
          }).end();
        })
        .catch((error) => {
          res.status(400).json({
            message : error.message,
            status: 'NOK',
            error
          }).end();
        });
    }
  }

};

module.exports = UsersController();
