const mongoose = require("mongoose"); // requiring the mongoose package

const gratitudeSchema = new mongoose.Schema({
  // creating a schema for gratitude
  gratitudeDescription: {
    // field1: gratitudeDescription
    type: String, // gratitudeDescription is a string
    // unique: true, // it has to be unique
    required: true, // it is required
  },
  favorited: {
    // field2: favorited
    type: Boolean, // it is a boolean
    default: false, // the default is false
  },
});

const gratitudeModel = mongoose.model("GratitudeEntry", gratitudeSchema); // creating the model from the schema

module.exports = gratitudeModel; // exporting the model
