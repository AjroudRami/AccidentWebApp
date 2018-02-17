var express = require('express');
var router = express.Router();
var accidentController = require('../controllers/accidentsController');
var mongoose = require('mongoose');

module.exports = router;

router.get('/', function(req, res, err) {
    accidentController.get(req.query.lon, req.query.lat, req.query.radius)
        .then(function (result) {
            res.send(result)
        })
        .catch(function (err) {
            console.log(err);
            throw err
        });
});

router.post('/', function(req, res, err) {
    accidentController.create(req.body)
        .then(function (result) {
            console.log(result);
            res.send(result);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({message: err});
        });
});


router.delete('/:accidentID', function(req, res, err) {
    accidentController.delete(req.params.accidentID)
        .then(function (result) {
            console.log(result);
            if (result.n == 0) {
                res.status(404).json(
                    {message: "not found, not deleted Ehhhré :D"});
            } else {
                res.send(result);
            }
        })
        .catch(function (err) {
            res.send(err);
            console.log(err);
        });
});

router.get('/:accidentID/comments', function (req, res, err) {
    accidentController.getComments(req.params.accidentID)
        .then(function (result) {
            console.log(result);
            res.send(result);
        })
        .catch(function (err) {
            console.log("Error" + err);
            res.send(err);
        });
});

router.post('/:accidentID/comments', function (req, res, err) {
    console.log("Getting post request to add a comment");
    try {
        var comment = req.body;
        comment.accidentId = new mongoose.Types.ObjectId(req.params.accidentID);
        comment.userId = new mongoose.Types.ObjectId(comment.userId);
        console.log(comment);
    } catch (err) {
        console.log(err);
    }
    accidentController.addComments(comment)
        .then(function (result) {
            console.log(result);
            res.send(result);
        })
        .catch(function (err) {
            console.log(err);
            res.send(err);
        })
});

var handleError = function (error) {

};

var handleOK = function (result) {

};