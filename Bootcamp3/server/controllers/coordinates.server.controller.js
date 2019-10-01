var config = require('../config/config'), 
    request = require('request');

    const opencage = require('opencage-api-client');



module.exports = function(req, res, next) {
  if(req.body.address) {
      //This code just formats the address so that it doesn't have space and commas using escape characters
      var addressTemp = req.body.address;
      var addressTemp2 = addressTemp.toLowerCase();
      var addressTemp3 = addressTemp2.replace(/\s/g, "%20");
      var addressTemp4 = addressTemp3.replace(/,/g , "%2C");
      
    //Setup your options q and key are provided. Feel free to add others to make the JSON response less verbose and easier to read 
    var options = { 
      q: addressTemp4,
      key: config.openCage.key,  
    }

    //Setup your request using URL and options - see ? for format
    request({
      url: 'https://api.opencagedata.com/geocode/v1/json', 
      qs: options
      }, function(error, response, body) {
        //For ideas about response and error processing see https://opencagedata.com/tutorials/geocode-in-nodejs
        if(error){
          throw(err);
        }
        
        //JSON.parse to get contents. Remember to look at the response's JSON format in open cage data
        // Format for the response will be:
        // 
   

        /*Save the coordinates in req.results -> 
          this information will be accessed by listings.server.model.js 
          to add the coordinates to the listing request to be saved to the database.

          Assumption: if we get a result we will take the coordinates from the first result returned
        */
        //  req.results = stores you coordinates

        /* the geocaching returns the following:
        {"documentation":"https://opencagedata.com/api",
        "licenses":[{"name":"see attribution guide","url":"https://opencagedata.com/credits"}],
        "rate":{"limit":2500,"remaining":2485,"reset":1569801600},
        "results":[{"annotations":{"DMS":{"lat":"28\u00b0 45' 1.94400'' N","lng":"82\u00b0 30' 0.36000'' W"},
            "FIPS":{"state":"12"},"MGRS":"17RLM5353181270",
            "Maidenhead":"EL88rs90xd",
            "Mercator":{"x":-9183869.122,"y":3323385.452},
            "OSM":{"url":"https://www.openstreetmap.org/?mlat=28.75054&mlon=-82.50010#map=17/28.75054/-82.50010"},
            "UN_M49":{"regions":{"AMERICAS":"019","NORTHERN_AMERICA":"021","US":"840","WORLD":"001"},
            "statistical_groupings":["MEDC"]},
            "callingcode":1,
            "currency":{"alternate_symbols":["US$"],
            "decimal_mark":".",
            "disambiguate_symbol":"US$",
            "html_entity":"$",
            "iso_code":"USD",
            "iso_numeric":"840",
            "name":"United States Dollar",
            "smallest_denomination":1,
            "subunit":"Cent",
            "subunit_to_unit":100,
            "symbol":"$",
            "symbol_first":1,
            "thousands_separator":","},
            "flag":"\ud83c\uddfa\ud83c\uddf8","geohash":"djj7d9vk034g2w667qpc",
            "qibla":54.57,"roadinfo":{"drive_on":"right","speed_in":"mph"},
            "sun":{"rise":{"apparent":1569756060,"astronomical":1569751380,"civil":1569754680,"nautical":1569753000},
            "set":{"apparent":1569799020,"astronomical":1569717300,"civil":1569800400,"nautical":1569715680}},
            "timezone":{"name":"America/New_York","now_in_dst":1,"offset_sec":-14400,"offset_string":"-0400","short_name":"EDT"},
            "what3words":{"words":"thrills.equity.dote"}},
            "bounds":{"northeast":{"lat":31.000968,"lng":-79.974306},
            "southwest":{"lat":24.396308,"lng":-87.634896}},
            "components":{"ISO_3166-1_alpha-2":"US",
                "ISO_3166-1_alpha-3":"USA","_type":"state",
                "continent":"North America","country":"United States of America",
                "country_code":"us","state":"Florida","state_code":"FL"},
            "confidence":1,"formatted":"FL,
             United States of America",
             "geometry":{"lat":28.75054,"lng":-82.5001}}],
             "status":{"code":200,"message":"OK"},
             "stay_informed":{"blog":"https://blog.opencagedata.com",
                 "twitter":"https://twitter.com/opencagedata"},
                 "thanks":"For using an OpenCage API",
                 "timestamp":{"created_http":"Sun, 29 Sep 2019 23:24:05 GMT",
                 "created_unix":1569799445},"total_results":1} */
        var result = JSON.parse(body);
        //console.log(result.results[0].geometry);
        
        req.results = result.results[0].geometry;

        next();
    });
  } else {
    next();
  }
};  