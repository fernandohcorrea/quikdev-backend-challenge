process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../src/models/User');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/server');
let should = chai.should();


chai.use(chaiHttp);


describe('Login', () => {

  const userTest = {
    name: "Quikdev",
    username: "quikdev",
    password: "super_senha_secreta",
    birthdate: "1981-05-05",
    address: "Rua fake",
    addressNumber: "99",
    primaryPhone: "11 987654321",
    description: "Observações"
  }

  before((done) => { //Before tests
    User.deleteMany({}, (err) => {
      done();
    });
  });

  after((done) => { //After tests
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('/POST user', () => {
   
    it('it should POST a new user', (done) => {
      let user = {...userTest}

      chai.request(server)
        .post('/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('status').eq('OK');
          done();
        });
    });

  });


  describe('/POST /auth/login', () => {

    it('it should POST a new user', (done) => {
      let {username, password} = userTest;

      login_data = {
        username: username,
        password: password
      };

      chai.request(server)
        .post('/v1/auth/login')
        .send(login_data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.have.property('status').eq('OK');
          done();
        });
    });

  });

});