const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
module.exports = app;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static/main'));
