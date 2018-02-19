var Promise = require('promise');
var userDB = require('../database/userDB');

module.exports.addClient = function (user) {
    console.log('Adding client: ' + user);
    return new Promise(function(resolve, reject) {
        userDB.addClient(user)
            .then(function(result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            })
    })
};

module.exports.addManager = function (user) {
    console.log('Adding manager: ' + user);
    return new Promise(function(resolve, reject) {
        userDB.addManager(user)
            .then(function(result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            })
    })
};

module.exports.login = function (user) {
    console.log('Logging ' + user);
    return new Promise(function(resolve, reject) {
        userDB.authenticate(user)
            .then(function(result) {
                resolve(result);
            })
            .catch(function (err) {
                reject(err);
            })
    })
};

