var mongojs = require('../db');
var db = mongojs.connect;

var service = {};

service.getAllUsers = getAllUsers;

module.exports = service;

function getAllUsers (req, res) {
  // Find some documents
  db.users.find().toArray(function(err, users) {
    res.json(users);
  });
}