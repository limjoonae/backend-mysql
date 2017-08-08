var app = require('express');
var router = app.Router();
var userService = require('../services/users.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAllUsers);
router.get('/:email', getAllProjectByEmail);
router.delete('/delete', _delete);
// router.get('/current', getCurrent);
// router.put('/:_id', update);

module.exports = router;

function getAllUsers(req, res) {
    userService.getAllUsers()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllProjectByEmail(req, res) {
    userService.getAllProjectByEmail(req.params.email)
        .then(function (projects) {
            res.send(projects);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.createUser(req.body)
        .then(function (result) {
            res.status(200).send(result);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function _delete(req, res) {
    userService.deleteUser(req.body)
        .then(function (){
            res.status(200).send(`Delete success`);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}