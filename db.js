var mongojs = require('mongojs');

var databaseUrl = 'mongodb://admin:admin@ds123933.mlab.com:23933/fac';
var collections = ['users'];

var connect = mongojs(databaseUrl, collections);

module.exports = {
    connect: connect
};