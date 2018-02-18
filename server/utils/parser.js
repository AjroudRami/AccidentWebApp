var fs = require('fs');
var Promise = require('promise');

var csvToJson = require('csvtojson');
var converter = require('convert-csv-to-json');
var csvParser = require('csv-parse');

var accidentDB = require('../database/accidentsDB');

module.exports = {

    /*
     *  Fonction pour convertir le csv en json
     */
    basicConversionCSVToJSON: function (csvFilePath) {
        return new Promise(function (done, reject) {
            console.log("Start basic conversion of " + csvFilePath + " to JSON file.");

            var outputFileName = 'JsonOutputFile.json';

            converter
                .fieldDelimiter(',')
                .generateJsonFileFromCsv(csvFilePath, outputFileName)
                .then(function (result) {
                    console.log("JSON conversion done.");
                    console.log(result);
                    done(result);
                })
                .catch(function (err) {
                    console.log(err);
                    reject(err);
                });
        });
    },

    /*
     *  Fonction pour convertir le csv en json
     */
    convertCSVToDB: function (csvFilePath) {
        return new Promise(function (done, reject) {
            console.log("Start conversion of " + csvFilePath + " for add in DB.");

            cleanCSVFile(csvFilePath)
                .then(function (result) {
                    console.log("JSON conversion done.");
                    console.log(result);
                    done(result);
                })
                .catch(function (err) {
                    console.log(err);
                    reject(err);
                });
        });
    }

};

/*
 *  Fonction pour faire l'insertion en BD
 */
var insert = function (accident) {
    return new Promise(function (resolve, reject) {
        accidentDB.insertAccidentFromJson(accident)
            .then(function (res) {
                console.log(res);
                resolve(res);
            })
            .catch(function (err) {
                console.log(err);
                reject(err);
            })
    })
};

/*
 *  Fonction pour clean le csv qu'on utilise
 */
var cleanCSVFile = function(csvFilePath) {

    var csvData = {
        accidents : []
    };

    fs.createReadStream(csvFilePath)
        .pipe(csvParser({
            delimiter: ',',
            columns: true
            // skip_empty_lines: true
            // skip_lines_with_empty_values: true
        }))

        .on('data', function(csvrow) {

            if (csvrow.gps === "M" &&
                !(csvrow.adr === "") &&
                !(csvrow.lat === "") &&
                !(csvrow.lat === "0000000") &&
                !(csvrow.long === "") &&
                !(csvrow.long === "0000000")) {

                var element = {};

                element.placeName = csvrow.adr;

                element.loc =
                    csvrow.long.substring(0, 2) +
                    "." + csvrow.long.substring(2, 20) +
                    ", " +
                    csvrow.lat.substring(0, 2) +
                    "." + csvrow.lat.substring(2, 20);

                element.seriousness = csvrow.col;

                if (csvrow.hrmn.length === 3) {
                    csvrow.hrmn = "0".concat(csvrow.hrmn);
                }

                if (csvrow.mois.length === 1) {
                    csvrow.mois = "0".concat(csvrow.mois);
                }

                if (csvrow.jour.length === 1) {
                    csvrow.jour = "0".concat(csvrow.jour);
                }

                element.date = new Date("20" + csvrow.an + "-"
                    + csvrow.mois + "-"
                    + csvrow.jour + "T"
                    + csvrow.hrmn.substring(0, 2) + ":" + csvrow.hrmn.substring(2, 4) + ":00");



                csvData.accidents.push(element);
            }

        })

        .on('end', function() {
            var json = JSON.stringify(csvData, null, 2);
            fs.writeFile('accidents.json', json, 'utf8');
        })

        .on('error', function() {
            console.log("Erreur dans le parsing..")
        });

};