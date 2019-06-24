var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'liqianqian'
});
 
connection.connect();
 
connection.query('SELECT * from userinfo', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});