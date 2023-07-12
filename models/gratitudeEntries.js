const mongoose = require("mongoose"); // requiring the mongoose package

const gratitudeSchema = new mongoose.Schema({
  gratitudeDescription: {
    type: String, // gratitudeDescription is a string
    // unique: true, // it has to be unique
    required: true, // it is required
  },
  favorited: {
    type: Boolean, // it is a boolean
    default: false, // the default is false
  },
  userID: {
    type: String,
    required: true,
  },
});

const gratitudeModel = mongoose.model("GratitudeEntry", gratitudeSchema); // creating the model from the schema

module.exports = gratitudeModel; // exporting the model
