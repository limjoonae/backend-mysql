var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'sql12.freemysqlhosting.net',
  user     : 'sql12188206',
  password : 'Apux8idpBH',
  database : 'sql12188206'
});

module.exports = {
    connection: connection
};

// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()