process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../src/models/User');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/server');
const { expect } = require("chai");
let should = chai.should();


chai.use(chaiHttp);


describe('CRUD User', () => {

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

  let user_id = null;
  let token = null;

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
          user_id = res.body.id;
          done();
        });
    });

  });

  describe('/POST many users', () => {

    let user = {...userTest};

    for (let idx = 0; idx < 20; idx++) {

      it(`it should POST a new user(${idx})`, (done) => {
          let user = {...userTest};

          user.username =  user.username+`_${idx}`;

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
    }
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
          token = res.body.token;
          done();
        });
    });

  });

  describe('/PUT user', () => {

    it('it should update user', (done) => {
      let user = Object.assign({
        address: "Rua Chalalalá - Cidade - UF"
      }, userTest);

      chai.request(server)
      .put(`/v1/users/${user_id}`)
      .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('status').eq('OK');
          done();
        });
    });

  });

  describe('/GET user', () => {

    it('it should get a user', (done) => {
      chai.request(server)
      .get(`/v1/users/${user_id}`)
      .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('OK');
          res.body.should.have.property('data');
          let user = res.body.data[0];
          expect(user).property('_id').eq(user_id)
          done();
        });
    });

  });

  describe('/GET users', () => {

    it('it should get many users', (done) => {
      chai.request(server)
      .get(`/v1/users/`)
      .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('OK');
          res.body.should.have.property('data');
          const data = res.body.data;
          expect(data).property('users');
          expect(data).property('count').eq(5);
          expect(data).property('limit').eq(5);
          expect(data).property('page').eq(1);
          expect(data).property('pages').eq(5);
          expect(data).property('total').eq(21);
          const users = res.body.data.users;
          expect(users).length.gte(5);
          done();
        });
    });

  });

});