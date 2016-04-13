var express = require('express')
var router = express.Router();
var db = require('../db.js');
var bodyParser = require('body-parser');
var twilio = require('twilio')('AC40691c0816f7dd360b043b23331f4f43','89f0d01b69bb6bcc473724b5b232b6f4');

var app = express();

router.post('/login', function (req, res) {
 	var username = req.body.user.username
 	var password = req.body.user.password
 	db.query();
})


router.get('/dashboard/:id', function (req, res) {
	var id = req.params.id;
	db.query('SELECT `full_name`, `username`, `createdAt` FROM `USERS` WHERE `id` = ?;',
	 [id],
	 function (err, rows) {
		if (err) {
			console.error(err)
			res.status(404).json({success: false})
		} else {
			res.json(rows)
		}
	})
})



module.exports = router;
