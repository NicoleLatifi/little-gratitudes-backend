const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/gratitude-app", {
  // connecting to the mongodb database name: "gratitude-app" locally
  keepAlive: true, // keeping the connection alive
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise


module.exports.GratitudeEntry = require("./gratitudeEntries") // requiring the gratitude model that we just created in mongodb
