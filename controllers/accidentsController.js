var accidentDB = require('../database/accidentsDB');
var Promise = require('promise');

module.exports = {

    get: function (lon, lat, radius) {
        return new Promise(function (resolve, reject) {

            accidentDB.get(lon, lat, radius)
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
            accidentDB.insert(accident)
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
            accidentDB.delete(accidentId)
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
        //TODO
    },

    addComments: function (comment) {
        //TODO
    }

};

