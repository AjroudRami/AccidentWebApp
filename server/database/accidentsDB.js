var Promise = require('promise');
var Accident = require('./model/AccidentSchema');
var url = "mongodb://database:27017/web";
var collectionName = 'accidents';
var dbName = 'web';
var limit = 3;
var mongoose = require('mongoose');

module.exports = {
    insertAccident: function (acc) {
        return new Promise(function (resolve, reject) {
            mongoose.connect(url)
                .then(function (result) {
                    var accident = new Accident();
                    accident.placeName = acc.placeName;
                    accident.loc = acc.loc;
                    accident.seriousness = acc.seriousness;
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
                        id: accident._id,
                        date: accident.date
                    };
                    resolve(res);
                })
                .catch(function (err) {
                    reject(err);
                    console.log(err);
                });
        });
    },

    getAccidentById: function (accidentID) {
        return new Promise(function (resolve, reject) {
            mongoose.connect(url)
                .then(function (result) {
                    Accident.findOne({_id: accidentID}).limit(1).exec()
                        .then(function (result) {
                            console.log('done');
                            if (result != undefined) {
                                resolve(result);
                            } else {
                                resolve([])
                            }
                        })
                        .catch(function (err) {
                            console.log('err' + err);
                            reject(err)
                        });
                }).catch(function (err) {
                reject(err);
            })
        })
    },

    getAccidents: function (lon, lat, radius) {
        return new Promise(function (resolve, reject) {
            // get the max distance or set it to 8 kilometers
            var maxDistance = radius || 8;

            mongoose.connect(url)
                .then(function (result) {
                    var query = Accident.find({
                        'loc': {
                            $near: [lon, lat],
                            $maxDistance: maxDistance
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
    },

    deleteAccident: function (accidentId) {
        return new Promise(function (resolve, reject) {
            mongoose.connect(url)
                .then(function (result) {
                    Accident.find({_id: accidentId}).remove().exec()
                        .then(function (result) {
                            console.log('done');
                            resolve(result);
                        })
                        .catch(function (err) {
                            console.log('err' + err);
                            reject(err)
                        });
                }).catch(function (err) {
                reject(err);
            })
        });
    },

    insertAccidentFromJson: function (acc) {
        return new Promise(function (resolve, reject) {
            mongoose.connect(url)
                .then(function (result) {
                    var accident = new Accident();
                    accident.placeName = acc.placeName;
                    accident.loc = acc.loc;
                    accident.seriousness = acc.seriousness;
                    accident.date = acc.date;
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
                        id: accident._id,
                        date: accident.date
                    };
                    resolve(res);
                })
                .catch(function (err) {
                    reject(err);
                    console.log(err);
                });
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
            id: accident._id,
            date: accident.date
        };
        result.push(filtered);
    }
    return result;
};

var filterAccident = function (accident) {
    var filtered = {
        placeName: accident.placeName,
        loc: accident.loc,
        seriousness: accident.seriousness,
        id: accident._id,
        date: accident.date
    };
    return filtered;
};
