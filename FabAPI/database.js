var mysql = require('mysql');
var util = require('util');

var con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	multipleStatements: true,
});

con.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');
});

con.queryAsync = util.promisify(con.query);

module.exports = con;	