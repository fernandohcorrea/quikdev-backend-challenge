const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require('../router');
const db = require('../db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(
    path.resolve(
        path.join(__dirname, '../../', 'public')
    )
));

app.use(router);

module.exports = app;
