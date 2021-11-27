const UsersServices = require('../services/users_services')



const UsersController = () => {
  return {


    "create" : async function(req, res) {
      if(!req.body || !Object.keys(req.body).length){
        return res.status(403).json({
          message: 'Invalid request data',
          status: 'NOK'
        });
      }

      UsersServices.createUser(req.body)
        .then((user) => {
          res.status(201).json({
            id: user._id
          }).end();
        })
        .catch((error) => {
          res.status(400).json({
            message : error.message,
            error
          }).end();
        });

    },

    "select" : async function(req, resp) {

      let filters = req.query;

      // const conn = mongoose.connect('mongodb://root:rootpass@localhost:27017/quickdev?authSource=admin&readPreference=primary&appname=mongodb-vscode%200.6.14&ssl=false');
      
      // const user = new  User({
      //   name: "Fernando H Corrêa"
      // });

      // user.save();

      resp.status(200).json(req.query).end();
    },

    "update" : function(req, res) {
      res.json(['Post']);
    },

    "delete" : function(req, res) {
      res.json(['Post']);
    }
    
  }

};

module.exports = UsersController();
