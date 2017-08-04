var app = require('express');
var router = app.Router();
var userService = require('../services/user.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAllUsers);
// router.get('/current', getCurrent);
// router.put('/:_id', update);
// router.delete('/:_id', _delete);

module.exports = router;

function getAllUsers(req, res) {
    userService.getAllUsers(req, res)
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}