var Promise = require('promise');
var Accident = require('./model/AccidentSchema');
var CommentSchema = require('./model/CommentSchema');
var url = "mongodb://database:27017/web";
var collectionName = 'accidents';
var dbName = 'web';
var limit = 3;
var mongoose = require('mongoose');

module.exports = {

    addComment: function (comment) {
        return new Promise(function (resolve, reject) {
            mongoose.connect(url)
                .then(function (result) {
                    var commentSchema = new CommentSchema();
                    commentSchema.accidentId = comment.accidentId;
                    commentSchema.userId = comment.userId;
                    commentSchema.title = comment.title;
                    commentSchema.message = comment.message;

                    commentSchema.save(function (err) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        console.log("inserted :");
                        console.log(commentSchema);
                    });
                    var res = {
                        id: commentSchema._id,
                        accidentId: commentSchema.accidentId,
                        userId: commentSchema.userId,
                        title: commentSchema.title,
                        message: commentSchema.message,
                        date: commentSchema.date
                    };
                    resolve(res);
                })
                .catch(function (err) {
                    reject(err);
                    console.log(err);
                });
        });
    },

    listComments: function (accidentID) {
        return new Promise(function (resolve, reject) {
            mongoose.connect(url)
                .then(function (result) {
                    var query = CommentSchema.find({});
                    query.where('accidentId', accidentID);
                    query.exec()
                        .then(function (result) {
                            console.log(result);
                            var filtered = filterComments(result);
                            resolve(filtered);
                        })
                        .catch(function (err) {
                            console.log(err);
                            reject(err);
                        })
                })
                .catch(function (err) {
                    console.log(err);
                    reject(err);
                })
        });
    }
};

var filterComments = function (list) {
    var res = [];
    for (var i in list) {
        var current = list[i];
        var tmp = {
            id: current._id,
            accidentId: current.accidentId,
            userId: current.userId,
            title: current.title,
            message: current.message,
            date: current.date
        };
        res.push(tmp);
    }
    return res;
};
