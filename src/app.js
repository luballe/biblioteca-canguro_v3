const express = require('express');
var bodyParser = require('body-parser');
const app = express();
module.exports = app;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static/main'));