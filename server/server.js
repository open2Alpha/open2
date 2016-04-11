var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var cors = require('cors');
var router = express.Router();
var app = express();

app.use(cors());


<-----Routes----->
var routes = require('./server/routes');


app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '*******')));


var host = process.env.PORT || 8080

app.listen(host, console.log("Host is working", host));
