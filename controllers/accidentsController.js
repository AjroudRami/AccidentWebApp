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
                    console.log('aaaaa');
                    resolve(res);
                }).catch(function (err) {
                console.log(err);
                console.log("ppppp");
                reject(err);
            })
        })

    },

    delete: function (accidentId) {
        //TODO
    },

    getComments: function (accidentID) {
        //TODO
    },

    addComments: function (comment) {
        //TODO
    }

};

