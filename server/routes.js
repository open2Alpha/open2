var express = require('express')
var router = express.Router()
var db = require('../db.js')


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

module.exports = router
