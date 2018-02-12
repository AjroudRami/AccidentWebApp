var Promise = require('promise');
var Accident = require('./model/Accident');
var url = "mongodb://novagen.fr:27017/web";
var collectionName = 'accidents';
var dbName = 'web';
var limit = 3;
var mongoose = require('mongoose');

module.exports = {
    insert: function (acc) {
        return new Promise(function (resolve, reject) {
            mongoose.connect(url)
                .then(function (result) {
                    var accident = new Accident();
                    accident.placeName = acc.placeName;
                    accident.loc = acc.loc;
                    accident.seriousness = acc.seriousness;
                    console.log();
                    accident.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("inserted :");
                        console.log(accident);
                    });
                    var res = {
                        placeName: accident.placeName,
                        loc: accident.loc,
                        seriousness: accident.seriousness,
                        id: accident._id
                    };
                    resolve(res);
                })
                .catch(function (err) {
                    reject(err);
                    console.log(err);
                });
        });
    },

    get: function (lon, lat, radius) {
        return new Promise(function (resolve, reject) {
            // get the max distance or set it to 8 kilometers
            var maxDistance = radius || 8;

            // we need to convert the distance to radians
            // the raduis of Earth is approximately 6371 kilometers
            maxDistance /= 6371;

            mongoose.connect(url)
                .then(function (result) {
                    var query = Accident.find({
                        'loc': {
                            $near: [lon, lat],
                            $maxDistance: 10
                        }
                    }).limit(limit);

                    query.exec()
                        .then(function (res) {
                            //console.log(res);
                            var filtered = filterAccidentList(res);
                            resolve(filtered);
                        })
                        .catch(function (err) {
                            console.log(err);
                            reject(err);
                        })
                })
                .catch(function (err) {
                    reject(err);
                })
        });
    }
};

var filterAccidentList = function (list) {
    var result = [];
    for (var i in list) {
        var accident = list[i];
        var filtered = {
            placeName: accident.placeName,
            loc: accident.loc,
            seriousness: accident.seriousness,
            id: accident._id
        };
        result.push(filtered);
    }
    return result;
};