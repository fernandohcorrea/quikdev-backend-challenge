let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let router = require('../router');

let app = express();

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