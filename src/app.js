const subscriberModel = require("./models/subscribers.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to get all the subscribers
app.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await subscriberModel.find({}, { __v: 0 });
    res.status(200).json(subscribers);
  } catch (ex) {
    res.status(404), json({ error: ex.message });
  }
});

// Route to get all the subscribers but only their names and their subscribed channels
app.get("/subscribers/names", async (req, res) => {
  try {
    const subscribers = await subscriberModel
      .find({})
      .select({ name: 1, subscribedChannel: 1, _id: 0 });
    res.status(200).json(subscribers);
  } catch (ex) {
    res.status(404), json({ error: ex.message });
  }
});

// route to get subscribers using an id
app.get("/subscribers/:id", async (req, res) => {
  // to get id from request parameters
  const idToGet = req.params.id;
  try {
    const subscribers = await subscriberModel.findById(idToGet, { __v: 0 });
    res.status(200).json(subscribers);
  } catch (ex) {
    res.status(404), json({ error: ex.message });
  }
});

module.exports = app;
