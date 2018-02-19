process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../app');
var Accident = require("../database/model/AccidentSchema");

var should = chai.should();
chai.use(chaiHttp);

describe('Accidents tests', function () {

    console.log('started');
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

    describe('GET api/accidents/:AccidentID', function () {
        it('it should GET a accident by the given id', function (done) {
            var newAccident = new Accident({
                loc: [43.6237776, 7.0473906],
                placeName: "Route des Dolines",
                seriousness: 5
                // date: Date.now()
            });

            newAccident.save(function (err, newAccident) {
                chai.request(server)
                    .get('/api/accidents/' + newAccident.id)
                    .send(newAccident)
                    .end(function (err, res) {
                        res.should.have.status(200);

                        res.should.be.json;
                        res.body.should.be.a('object');

                        res.body.should.have.property('_id');
                        res.body.should.have.property('placeName');
                        res.body.should.have.property('date');
                        res.body.should.have.property('loc');
                        res.body.should.have.property('seriousness');

                        res.body._id.should.equal(newAccident.id);
                        res.body.loc[0].should.equal(43.6237776);
                        res.body.loc[1].should.equal(7.0473906);
                        res.body.placeName.should.equal('Route des Dolines');
                        res.body.seriousness.should.equal(5);

                        done();
                    });
            });
        });
    });



    describe('POST api/accidents/', function() {
        it('it should add a new accident to the database', function(done) {
            var accident = {
                loc: [44.6237776, 8.0473906],
                placeName: "Route du Soleil",
                seriousness: 2
            };

            chai.request(server)
                .post('/api/accidents/')
                .send(accident)
                .end(function(err, res) {
                    res.should.have.status(200);

                    res.should.be.json;
                    res.body.should.be.a('object');

                    res.body.should.have.property('_id');
                    res.body.should.have.property('placeName');
                    res.body.should.have.property('date');
                    res.body.should.have.property('loc');
                    res.body.should.have.property('seriousness');

                    res.body._id.should.equal(accident.id);
                    res.body.loc[0].should.equal(accident.loc[0]);
                    res.body.loc[1].should.equal(accident.loc[1]);
                    res.body.placeName.should.equal(accident.placeName);
                    res.body.seriousness.should.equal(accident.seriousness);

                    done();
                })
            });
    });


    describe('GET api/accidents/', function() {
        it('it should return at least one accident', function(done) {

            var lon = 45.6237776;
            var lat = 7.1473906;
            var rad = 1;

            chai.request(server)
                .get('/api/accidents?lat=' + lat + '&lon=' + lon + '&rad=' + rad)
                .send()
                .end(function(err, res) {
                    res.should.have.status(200);

                    res.should.be.json;
                    res.body.should.be.a('object');

                    expect(res.body).to.have.lengthOf(1);

                    done(err);
                })
        });
    })
});

