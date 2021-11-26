let Users = () => {
  return {

    "index" : function(req, res) {
      res.json(['Index']);
    },

    "post" : function(req, res) {
      res.json(['Post']);
    }
  }

};

module.exports = Users();
