var mysql = require('mysql')
var connection = mysql.createConnection('mysql://sql12188206:Apux8idpBH@sql12.freemysqlhosting.net/sql12188206');

module.exports = {
    connection: connection
};