process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../src/models/User');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/server');
let should = chai.should();


chai.use(chaiHttp);


describe('Users', () => {

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

  beforeEach((done) => { //Before each test we empty the database
    User.deleteMany({}, (err) => {
      done();
    });
  });

  after((done) => { //After all tests
    User.deleteMany({}, (err) => {
      done();
    });
  });


  describe('/POST user', () => {
    it('it should not POST a user without name field', (done) => {
      let user = {...userTest}
      delete(user.name);

      chai.request(server)
        .post('/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('User validation failed: name: Path `name` is required.');
          res.body.should.have.property('status').eq('NOK');
          done();
        });
    });

  
    it('it should not POST a user without username field', (done) => {
      let user = {...userTest}
      delete(user.username);

      chai.request(server)
        .post('/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('User validation failed: username: Path `username` is required.');
          res.body.should.have.property('status').eq('NOK');
          done();
        });
    });


    it('it should not POST a user without password field', (done) => {
      let user = {...userTest}
      delete(user.password);

      chai.request(server)
        .post('/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eq('Invalid password, please try another stronger password');
          res.body.should.have.property('status').eq('NOK');
          done();
        });
    });


    it('it should not POST a user without birthdate field', (done) => {
      let user = {...userTest}
      delete(user.birthdate);

      chai.request(server)
        .post('/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('User validation failed: birthdate: Path `birthdate` is required.');
          res.body.should.have.property('status').eq('NOK');
          done();
        });
    });


    it('it should not POST a user without address field', (done) => {
      let user = {...userTest}
      delete(user.address);

      chai.request(server)
        .post('/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('User validation failed: address: Path `address` is required.');
          res.body.should.have.property('status').eq('NOK');
          done();
        });
    });


    it('it should not POST a user without addressNumber field', (done) => {
      let user = {...userTest}
      delete(user.addressNumber);

      chai.request(server)
        .post('/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('User validation failed: addressNumber: Path `addressNumber` is required.');
          res.body.should.have.property('status').eq('NOK');
          done();
        });
    });

    it('it should not POST a user without primaryPhone field', (done) => {
      let user = {...userTest}
      delete(user.primaryPhone);

      chai.request(server)
        .post('/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eq('Invalid primaryPhone format');
          res.body.should.have.property('status').eq('NOK');
          done();
        });
    });


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

});