process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
Promise = require('promise');
mongoose.Promise = Promise;
var server = require('../app');
var Accident = require("../database/model/AccidentSchema");

var should = chai.should();
chai.use(chaiHttp);

describe('Accidents tests', function () {

    console.log('started');
    var newAccident;
    //Drop collection before all test once
    before(function (done) {
        console.log('before');
        Accident.collection.remove();
        newAccident = new Accident({
            loc: [45.6237776, 7.1473906],
            placeName: "Route des Prolines",
            seriousness: 3
            // date: Date.now()
        });

        newAccident.save().then(done());
    });

    /**beforeEach( function(done) {
        var newAccident = new Accident({
            loc: [45.6237776, 7.1473906],
            placeName: "Route des Prolines",
            seriousness: 3
            // date: Date.now()
        });

        newAccident.save(function(err) {
            done();
        });
        console.log('before each')

    });**/

    describe('GET api/accidents/:AccidentID', function () {
        it('it should GET a accident by the given id', function (done) {
            var accident = {
                loc: [44.6237776, 8.0473906],
                placeName: "Route du Soleil",
                seriousness: 2
            };

            chai.request(server)
                .get('/api/accidents/' + newAccident._id)
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

                    res.body._id.should.equal('' + newAccident._id);
                    res.body.loc[0].should.equal(newAccident.loc[0]);
                    res.body.loc[1].should.equal(newAccident.loc[1]);
                    res.body.placeName.should.equal(newAccident.placeName);
                    res.body.seriousness.should.equal(newAccident.seriousness);

                    done();
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

                    res.body.should.have.property('id');
                    res.body.should.have.property('placeName');
                    res.body.should.have.property('date');
                    res.body.should.have.property('loc');
                    res.body.should.have.property('seriousness');

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
            chai.request(server)
                .get('/api/accidents/?lat=' + 7.1473906 + '&lon=' + 45.6237776 + '&radius=1000')
                .send({lon: 45.6237776, lat: 7.1473906, radius: 1000})
                .end(function (err, res) {
                    res.should.have.status(200);

                    res.should.be.json;
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});


