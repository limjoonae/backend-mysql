var mongojs = require('mongojs');

var databaseUrl = 'mongodb://facAdmin:facAdmin@10.182.247.73:27017/fac';
var collections = ['users'];

var connect = mongojs(databaseUrl, collections);

module.exports = {
    connect: connect
};