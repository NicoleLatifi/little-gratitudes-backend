const express = require("express") // our express server
const cors = require("cors")
const app = express() // generate an app object
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 3000 // port that the server is running on => localhost:3000
const db = require("./models/")

app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload
app.use(cors())

function success(res, payload) {
  return res.status(200).json(payload)
}

app.get("/gratitudeEntries", async (req, res, next) => {
  try {
    const gratitudeEntries = await db.GratitudeEntry.find({})
    return success(res, gratitudeEntries)
  } catch (err) {
    next({ status: 400, message: "failed to get gratitude entries"})
  }
})

app.post("/gratitudeEntries", async (req, res, next) => {
  try {
    const gratitudeEntry = await db.GratitudeEntry.create(req.body)
    return success(res, gratitudeEntry)
  } catch (err) {
    console.log('err: ', err)
    next({ status: 400, message: "failed to create gratitude entry"})
  }
})

app.put("/gratitudeEntries/:id", async (req, res, next) => {
  try {
    const gratitudeEntry = await db.GratitudeEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    return success(res, gratitudeEntry)
  } catch (err) {
    next({ status: 400, message: "failed to update gratitude entry" })
  }
})

app.delete("/gratitudeEntries/:id", async (req, res, next) => {
  try {
    await db.GratitudeEntry.findByIdAndRemove(req.params.id)
    return success(res, "todo deleted!")
  } catch (err) {
    next({ status: 400, message: "failed to delete gratitude entry"})
  }
})

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request"
  })
})

app.listen(PORT, () => {
  // listening on port 3000
  console.log(`listening on port ${PORT}`) // print this when the server starts
})
