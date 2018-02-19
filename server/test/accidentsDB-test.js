process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../app');
var Accident = require("../database/model/AccidentSchema");

var should = chai.should();
chai.use(chaiHttp);

describe('Accidents', function() {

    Accident.collection.drop();

    beforeEach(function(done) {

        var newAccident = new Accident({
            loc: [45.6237776, 7.1473906],
            placeName: "Route des Prolines",
            seriousness: 3
            // date: Date.now()
        });

        newAccident.save(function(err) {
            done();
        });

    });

    afterEach(function(done) {
        Accident.collection.drop();
        done();
    });

    it('it should GET a accident by the given id', function(done) {
        var newAccident = new Accident({
            loc: [43.6237776, 7.0473906],
            placeName: "Route des Dolines",
            seriousness: 5
            // date: Date.now()
        });

        newAccident.save(function(err, newAccident) {
            chai.request(server)
                .get('/api/accidents/' + newAccident.id)
                .send(newAccident)
                .end(function(err, res) {
                    res.should.have.status(200);

                    res.should.be.json;
                    res.body.should.be.a('object');

                    res.body.should.have.property('_id');
                    res.body.should.have.property('placeName');
                    res.body.should.have.property('date');
                    res.body.should.have.property('loc');
                    res.body.should.have.property('seriousness');

                    res.body._id.should.equal(newAccident.id);
                    // res.body.loc.should.equal([43.6237776, 7.0473906]);
                    res.body.placeName.should.equal('Route des Dolines');
                    res.body.seriousness.should.equal(5);

                    done();
                });
        });
    });

});