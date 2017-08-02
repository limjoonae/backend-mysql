var _ = require('lodash');
var bcrypt = require('bcryptjs');
var Q = require('q');

// var mongojs = require('../db');
// var db = mongojs.connect;

var mysqlconfig = require("../mysql-db");
var connection = mysqlconfig.connection;

var service = {};

service.getAllUsers = getAllUsers;
// service.create = create;

module.exports = service;

//MySQL Style
function getAllUsers (req, res) {
  var deferred = Q.defer();
  var selectAllUsersQuery = 'SELECT * FROM users WHERE 1';
  connection.connect();
  connection.query(selectAllUsersQuery , function (err, rows, fields) {
    if (err) throw deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(rows);
    console.log('Data is: ', rows)
  })

  connection.end()
  return deferred.promise;
}

//Mongo Style
// function getAllUsers (req, res) {
//   // Find some documents
//     var deferred = Q.defer();

//     db.users.find().toArray(function (err, users) {
//         if (err) deferred.reject(err.name + ': ' + err.message);

//         // return users (without hashed passwords)
//         users = _.map(users, function (user) {
//             return _.omit(user, 'hash');
//         });

//         deferred.resolve(users);
//     });

//     return deferred.promise;
// }

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