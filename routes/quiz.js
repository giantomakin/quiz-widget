var express = require('express');
var router = express.Router();
var db = require('../db.js');
var async = require('async');
var pool = db.connect();

/* GET users listing. */

function setHeaders(res){
	res.setHeader('Access-Control-Allow-Origin', 'http://107.170.39.72:3001');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
}

router.get('/:unique_id', function(req, res, next) {

	setHeaders(res);

	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM quiz WHERE unique_id = ?' , req.params.unique_id, function(err, rows, fields) {

			if (!err)
				res.send(rows);
			else
				console.log('Error while performing Query.');

			connection.release();
		});


	});



});

router.get('/result/:unique_id/:ans_id', function(req, res, next) {

	setHeaders(res);

	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM quiz WHERE unique_id = ?' , [req.params.unique_id] , function(err, rows, fields) {


			var data = [];

			if (!err){

				if(req.params.ans_id === rows[0].answer){

					data.result = "<h1 class='quizzer-question'>You got it Right!</h2>";

				}else{

					data.result = "<h1 class='quizzer-question'>You got it Right!</h2>";

				}

				data.ad = rows[0].ad;

				res.send({ad: rows[0].ad, result: data.result});

			}else{
				console.log('Error while performing Query.');
			}
			connection.release();
		});
	});
});

router.get('/mc/:_key/:_value/:_id', function(req, res, next) {

	setHeaders(res);

	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM quiz WHERE unique_id = ?' , req.params._key, function(err, rows, fields) {

			var datas = JSON.parse(rows[0].data);

			if (!err)

			for(data in datas){
				if(datas[data].answer_id === req.params._id){
					if(datas[data].answer === req.params._value){

						res.send({"response":"true" , "ad": datas[data].ad});
					}else{
						res.send({"response":"false" , "ad": datas[data].ad});
					}
				}

			}

			else
				console.log('Error while performing Query.');

			connection.release();
		});


	});



});


module.exports = router;
