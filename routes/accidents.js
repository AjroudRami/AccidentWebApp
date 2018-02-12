var express = require('express');
var router = express.Router();
var accidentController = require('../controllers/accidents');
module.exports = router;

router.get('/', function(req, res, err) {
    res.send(accidentController.getAccidents(req.query.lon, req.query.lat, req.query.radius));
});

router.post('/', function(req, res, err) {
   try {
       var accident = accidentController.createAccident(req.body);
       res.send(accident);
   } catch (err) {
       res.send(err);
   }
});


router.delete('/:accidentID', function(req, res, err) {
    accidentController.deleteAccident(req.params.accidentID);
    res.send({id:req.params.accidentID});
});

router.get('/:accidentID/comments', function (req, res, err) {
    res.send(accidentController.getComments(req.params.accidentID));
});

router.post('/:accidentID/comments', function (req, res, err) {
    res.send(accidentController.addComments(req.body));
});

