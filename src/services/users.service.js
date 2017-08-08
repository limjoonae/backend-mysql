// var _ = require('lodash');
// var bcrypt = require('bcryptjs');
var Q = require('q');

var config = require("../mysql-db");
var connection = config.connection;

var service = {};

service.getAllUsers = getAllUsers;
service.getAllProjectByEmail = getAllProjectByEmail;
service.createUser = createUser;
service.deleteUser = deleteUser;
service.insertOne = insertOne;
service.deleteOne = deleteOne;

module.exports = service;

function getAllUsers () {
  var deferred = Q.defer();
  var selectAllUsersQuery = 'SELECT * FROM users';

  connection.query(selectAllUsersQuery , function (err, rows, fields) {
    if (err) throw deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(rows);
  })
  return deferred.promise;
};

function getAllProjectByEmail(userEmail) {
  var deferred = Q.defer();
  var selectAllProjectQuery = `SELECT * FROM users WHERE  ?? = ?`;
  // ?? stand for column name, ? stand for value
  var selectAllProjectStatementParam = ['email', userEmail];
  selectAllProjectQuery = connection.format(selectAllProjectQuery, selectAllProjectStatementParam);

  connection.query(selectAllProjectQuery , function (err, rows, fields) {
    if (err) throw deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(rows);
  })
  return deferred.promise;
};

function getExistingUserInSomeProject(userParam) {
  var selectOneQuery = `SELECT * FROM users WHERE  ?? = ? AND ?? = ? AND ?? = ? AND ?? = ?`;
  // ?? stand for column name, ? stand for value
  var selectStatementParam = ['ul_code', userParam.ulCode, 'service_name', userParam.serviceName, 'project_name', userParam.projectName, 'email', userParam.email];
  return selectOneQuery = connection.format(selectOneQuery, selectStatementParam);
};

function createUser(userParam) {
  var deferred = Q.defer();
  var selectByInputQuery = getExistingUserInSomeProject;

  connection.query(selectByInputQuery(userParam) , function (err, rows, fields) {
    if (err) throw deferred.reject(err.name + ': ' + err.message);
    if (rows.length) {
      deferred.reject('Username "' + userParam.firstName + '" of project "'+ userParam.projectName +'" is already taken');
    } else {
      insertOne(userParam);
    }
  });
  return deferred.promise;
};

function insertOne(userObj) {
    var deferred = Q.defer();
    var insertRegisterDataQuery = `INSERT INTO users (ul_code, service_name, project_name, first_name, last_name, email) 
                                  VALUES (?, ?, ?, ?, ?, ?)`;
    var insertStatementParam = [userObj.ulCode, userObj.serviceName, userObj.projectName, userObj.firstName, userObj.lastName, userObj.email]
    insertRegisterDataQuery = connection.format(insertRegisterDataQuery, insertStatementParam);

    connection.query(insertRegisterDataQuery , function (err, rows, fields) {
      if (err) throw deferred.reject(err.name + ': ' + err.message);
      deferred.resolve('Insertion success');
    });
    return deferred.promise;
};

function deleteUser(userParam) {
  var deferred = Q.defer();
  var selectByInputQuery = getExistingUserInSomeProject;

  connection.query(selectByInputQuery(userParam) , function (err, rows, fields) {
    if (err) throw deferred.reject(err.name + ': ' + err.message);
    if (rows.length) {
        deleteOne(userParam);
      } else {
      deferred.reject('Username "' + userParam.firstName + '" of project "'+ userParam.projectName +'" is does not exist');
    }
  });
  return deferred.promise;
}

function deleteOne(userParam) {
  var deferred = Q.defer();
  var deleteOneQuery = `DELETE FROM users WHERE  ?? = ? AND ?? = ? AND ?? = ? AND ?? = ?`;
  var deleteStatementParam = ['ul_code', userParam.ulCode, 'service_name', userParam.serviceName, 'project_name', userParam.projectName, 'email', userParam.email];
  deleteOneQuery = connection.format(deleteOneQuery, deleteStatementParam);
  connection.query(deleteOneQuery , function (err, rows, fields) {
    if (err) throw deferred.reject(err.name + ': ' + err.message);
    deferred.resolve('Deletion success');
  });
  return deferred.promise;
};