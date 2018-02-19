var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController');


module.exports = router;

router.post('register/', function (req, res, err) {
    userController.addClient(req.body)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(err){
            throw err;
        })
});

router.post('registerManager', function(req, res, err) {
    userController.addManager(req.body)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(err){
            throw err;
        })
});

router.post('login', function(req, res, err) {
    userController.login(req.body)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(err){
            throw err;
        })
});
