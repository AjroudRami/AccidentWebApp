var accidentDB = require('../database/accidentsDB');
var commentDB = require('../database/commentsDB');
var Promise = require('promise');

module.exports = {

    getById: function (accidentId) {
        return new Promise(function (resolve, reject) {
            accidentDB.getAccidentById(accidentId)
                .then(function (result) {
                    resolve(result)
                })
                .catch(function (err) {
                    console.log(err);
                    reject(err)
                })
        })
    },

    get: function (lon, lat, radius) {
        return new Promise(function (resolve, reject) {

            accidentDB.getAccidents(lon, lat, radius)
                .then(function (result) {
                    resolve(result)
                })
                .catch(function (err) {
                    console.log(err);
                    reject(err)
                })

        })
    },

    create: function (accident) {
        return new Promise(function (resolve, reject) {
            accidentDB.insertAccident(accident)
                .then(function (res) {
                    console.log(res);
                    resolve(res);
                }).catch(function (err) {
                console.log(err);
                reject(err);
            })
        })

    },

    delete: function (accidentId) {
        return new Promise(function (resolve, reject) {
            console.log("Attempt deletion");
            accidentDB.deleteAccident(accidentId)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (err) {
                    console.log(err);
                    console.log("You suck !");
                    reject(err);
                })
        })
    },

    getComments: function (accidentID) {
        return new Promise(function (resolve, reject) {
            console.log("Getting comments for " + accidentID);
            commentDB.listComments(accidentID)
                .then(function (result) {
                    resolve(result)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    },

    addComments: function (comment) {
        return new Promise(function (resolve, reject) {
            console.log('Adding comment ' + comment);
            commentDB.addComment(comment)
                .then(function (result) {
                    resolve(result)
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }

};

