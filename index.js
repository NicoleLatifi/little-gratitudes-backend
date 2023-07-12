const express = require("express"); // our express server
const app = express(); // generate an app object
const dotenv = require("dotenv");
const bodyParser = require("body-parser"); // requiring the body-parser
const cors = require("cors");
const PORT = process.env.PORT || 3000; // port that the server is running on => localhost:3000
const db = require("./models/");
const mongoose = require("mongoose");

dotenv.config();

app.use(bodyParser.json()); // telling the app that we are going to use json to handle incoming payload
app.use(cors());

function success(res, payload) {
  return res.status(200).json(payload);
}

// TODO: probably remove this get
app.get("/gratitudeEntries", async (req, res, next) => {
  try {
    const gratitudeEntries = await db.GratitudeEntry.find({});
    return success(res, gratitudeEntries);
  } catch (err) {
    next({ status: 400, message: "failed to get gratitude entries" });
  }
});

app.get("/gratitudeEntries/:userID", async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const gratitudeEntries = await db.GratitudeEntry.find({ userID: userID });
    return success(res, gratitudeEntries);
  } catch (err) {
    next({ status: 400, message: "failed to get gratitude entries" });
  }
});

app.post("/gratitudeEntries", async (req, res, next) => {
  try {
    const gratitudeEntry = await db.GratitudeEntry.create(req.body);
    return success(res, gratitudeEntry);
  } catch (err) {
    console.log("err: ", err);
    next({ status: 400, message: "failed to create gratitude entry" });
  }
});

app.put("/gratitudeEntries/:id", async (req, res, next) => {
  try {
    const gratitudeEntry = await db.GratitudeEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    return success(res, gratitudeEntry.value);
  } catch (err) {
    next({ status: 400, message: "failed to update gratitude entry" });
  }
});

app.delete("/gratitudeEntries/:id", async (req, res, next) => {
  try {
    await db.GratitudeEntry.findByIdAndRemove(req.params.id);
    return success(res, "gratitude entry deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete gratitude entry" });
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  });
});

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// mongoose.set("debug", true); // enabling debugging information to be printed to the console for debugging purposes
