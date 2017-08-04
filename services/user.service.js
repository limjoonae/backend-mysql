var _ = require('lodash');
var bcrypt = require('bcryptjs');
var Q = require('q');

var mysqlconfig = require("../mysql-db");
var connection = mysqlconfig.connection;

var service = {};

service.getAllUsers = getAllUsers;
service.create = create;

module.exports = service;

//MySQL Style
function getAllUsers (req, res) {
  var deferred = Q.defer();
  var selectAllUsersQuery = 'SELECT * FROM users';
  connection.connect();
  connection.query(selectAllUsersQuery , function (err, rows, fields) {
    if (err) throw deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(rows);
    console.log('Data is: ', rows)
  })

  connection.end();
  return deferred.promise;
}

function create(userParam) {
  var deferred = Q.defer();
  var selectByInputQuery = 'SELECT * FROM users ' + 
                           `WHERE  ?? = ?? AND 
                            ?? = ?? AND
                            ?? = ?? AND
                            ?? = ??`;
  var selectStatementParam = ['ul_code', userParam.ulCode, 'service_name', userParam.serviceName, 'project_name', userParam.projectName, 'email', userParam.email];
  selectByInputQuery = connection.format(selectByInputQuery, selectStatementParam);
  
  connection.connect();
  connection.query(selectByInputQuery , function (err, rows, fields) {
    if (err) throw deferred.reject(err.name + ': ' + err.message);

    if (user) {
        deferred.reject('Username "' + userParam.firstName + '" of project "'+ userParam.projectName +'" is already taken');
    } else {
        createRegisteration(userParam);
    }
  });

  function createUser(userParam) {
      var insertRegisterDataStatement = 'INSERT INTO users (`ul_code`, `service_name`, `project_name`, `first_name`, `last_name`, `email`)' +  
                                        `VALUES (??, ??, ??, ??, ??, ??);`;
      var insertStatementParam = [userParam.ulCode, userParam.serviceName, userParam.projectName, userParam.firstName, userParam.lastName, userParam.email]
      insertRegisterDataStatement = connection.format(insertRegisterDataStatement, insertStatementParam);
      connection.query(selectByInputQuery , function (err, rows, fields) {
        if (err) throw deferred.reject(err.name + ': ' + err.message);
        deferred.resolve();
      });
  }

  connection.end();
  return deferred.promise;

}

// function create(userParam) {
//     var deferred = Q.defer();

//     // validation
//     db.users.findOne(
//         { firstname: userParam.firstname },
//         function (err, user) {
//             if (err) deferred.reject(err.name + ': ' + err.message);

//             if (user) {
//                 // username already exists
//                 deferred.reject('Username "' + userParam.firstname + '" is already taken');
//             } else {
//                 createUser(userParam);
//             }
//         });

//     function createUser(userParam) {
//         // set user object to userParam without the cleartext password
//         // var user = _.omit(userParam, 'password');

//         // // add hashed password to user object
//         // user.hash = bcrypt.hashSync(userParam.password, 10);

//         db.users.insert(
//             userParam,
//             function (err, doc) {
//                 if (err) deferred.reject(err.name + ': ' + err.message);

//                 deferred.resolve();
//             });
//     }

//     return deferred.promise;
// }