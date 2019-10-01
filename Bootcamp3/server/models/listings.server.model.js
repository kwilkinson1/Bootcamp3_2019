//You can replace this entire file with your Bootcamp Assignment #2 - ListingSchema.js File

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  /* your code here from Bootcamp Assignment #2 - ListingSchema.js File*/
    /* Listing example:
          {
            "code": "AAF", 
            "name": "Academic Advisement - Farrior Hall", 
            "coordinates": {
                "latitude": 29.6502323, 
                "longitude": -82.34563860000002
            }, 
            "address": "100 Fletcher Dr, Gainesville, FL 32611, United States"
        },  */
    code: { type: String, required: true },
    name: { type: String, required: true },
    coordinates: {latitude: Number, longitude: Number },
    address: String,
    created_at: Date,
    updated_at: Date
});

/* create a 'pre' function that adds the updated_at and created_at if not already there property */
listingSchema.pre('save', function(next) {
  /* your code here from Bootcamp Assignment #2 - ListingSchema.js File */
    var currDate = new Date();

    this.updated_at = currDate;

    if (!this.created_at) {
        this.created_at = currDate;
    }

  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
