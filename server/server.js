var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var cors = require('cors');


var app = express();

app.use(bodyParser());
app.use(cors());

app.listen(8080);