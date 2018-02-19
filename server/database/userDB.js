var Promise = require('promise');
var UserSchema = require('./model/UserSchema');
var url = "mongodb://database:27017/web";
var mongoose = require('mongoose');

mongoose.connect(url).then(console.log).catch(console.error);


module.exports.addClient = function (user) {
    return new Promise(function (resolve, reject) {

        var userSave = new UserSchema();

        userSave.email = user.email;
        userSave.password = user.password;
        userSave.userRank = 'CLIENT';

        userSave.save(function(err) {
            if(err) {
                console.log(err);
                reject(err);
            }
            console.log("Registered a new client :");
            console.log('email: ' + user.email);
        });

        var res = {
            email:userSave.email,
            userRank:userSave.userRank,
            id:userSave._id
        };
        resolve(res);
    });
};

module.exports.addManager = function (accidentID) {
    return new Promise(function (resolve, reject) {
        var userSave = new UserSchema();

        userSave.email = user.email;
        userSave.password = user.password;
        userSave.userRank = 'MANAGER';

        userSave.save(function(err) {
            if(err) {
                console.log(err);
                reject(err);
            }
            console.log("Registered a new client :");
            console.log('email: ' + user.email);
        });

        var res = {
            email:userSave.email,
            userRank:userSave.userRank,
            id:userSave._id
        };
        resolve(res);
    });
};

module.exports.authenticate = function (user) {
    return new Promise(function (resolve, reject) {
        UserSchema.findOne({email: user.email, password: user.password}).exec()
            .then(function (result) {
                console.log('done');
                if (result != undefined) {
                    var res = {
                        email:result.email,
                        userRank:result.userRank,
                        id:result._id
                    };
                    resolve(res);
                } else {
                    resolve([])
                }
            })
            .catch(function (err) {
                console.log('err' + err);
                reject(err)
            });
    })
};

