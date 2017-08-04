var app = require('express');

module.exports = showIndex;

function showIndex(req, res) {
    res.send('Welcome to Index');
}
