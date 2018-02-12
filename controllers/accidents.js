 express : require('express');

module.exports = {

    getAccidents : function(lon, lat, radius) {
        //TODO
        return {lat:lat,
            lon: lon,
            radius: radius};
    },
    
     createAccident : function (accident) {
        //TODO
    },

     deleteAccident : function(accidentId){
        //TODO
    },

     getComments : function(accidentID) {
        //TODO
    },

     addComments : function(comment) {
        //TODO
    }

};

