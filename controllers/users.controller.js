var app = require('express');
var router = app.Router();
var userService = require('../services/user.service');

var mongojs = require('../db');
var db = mongojs.connect;

// routes
// router.post('/authenticate', authenticate);
// router.post('/register', register);
router.get('/', getAllUsers);
// router.get('/current', getCurrent);
// router.put('/:_id', update);
// router.delete('/:_id', _delete);

module.exports = router;

function getAllUsers(req, res) {
    db.users.find().toArray(function(err, users) {
        res.json(users);
    });
    // userService.getAllUsers(req, res)
    //     .then(function (users) {
    //         res.send(users);
    //     })
    //     .catch(function (err) {
    //         res.status(400).send(err);
    //     });
}

function register(req, res) {
    db.users.insert();
    // userService.create(req.body)
    //     .then(function () {
    //         res.sendStatus(200);
    //     })
    //     .catch(function (err) {
    //         res.status(400).send(err);
    //     });
}