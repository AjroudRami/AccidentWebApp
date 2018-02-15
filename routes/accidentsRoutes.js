var express = require('express');
var router = express.Router();
var accidentController = require('../controllers/accidentsController');
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
    res.send(accidentController.getComments(req.params.accidentID));
});

router.post('/:accidentID/comments', function (req, res, err) {
    res.send(accidentController.addComments(req.body));
});

