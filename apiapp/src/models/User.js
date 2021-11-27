const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  "name": {
    type: String,
    required: true
  },
  "username": {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  "password": {
    type: String,
    required: true
  },
  "birthdate": {
    type: Date,
    required: true
  },
  "address":{
    type: String,
    required: true
  },
  "addressNumber": {
    type: String,
    required: true
  },
  "primaryPhone": {
    type: String,
    required: true
  },
  "description": String,
  "createdAt": { type: Date, default: Date.now },
  "updatedAt": { type: Date, default: Date.now }
});

const User = mongoose.model("User", UsersSchema, 'users');

module.exports = User;