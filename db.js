var mysql = require('mysql');
DB_NAME = 'marble_com';
var pool = null,
pool = mysql.createPool({
		connectionLimit : 100,
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : DB_NAME,
		debug    :  false
	});
exports.connect = function(){

	pool.getConnection(function(err, connection) {
	  if(!err) {
	  	console.log("connected to " + DB_NAME);
	  } else {
	  	console.log("Error connecting database ... nn");
	  }

	});

	return pool;



}

