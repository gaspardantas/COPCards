const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

client.connect();

// REGISTER
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, login, password } = req.body;
  var error = "";

  try {
    const db = client.db("COP4331Cards");
    const existing = await db
      .collection("Users")
      .find({ Login: login })
      .toArray();

    if (existing.length > 0) {
      res.status(200).json({ error: "Username already taken" });
      return;
    }

    const count = await db.collection("Users").countDocuments();
    const newUserId = count + 1;

    const newUser = {
      UserID: newUserId,
      FirstName: firstName,
      LastName: lastName,
      Login: login,
      Password: password,
    };

    await db.collection("Users").insertOne(newUser);
    res.status(200).json({ error: "" });
  } catch (e) {
    res.status(200).json({ error: e.toString() });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    const db = client.db("COP4331Cards");
    const results = await db
      .collection("Users")
      .find({ Login: login, Password: password })
      .toArray();

    var id = -1;
    var fn = "";
    var ln = "";

    if (results.length > 0) {
      id = results[0].UserID;
      fn = results[0].FirstName;
      ln = results[0].LastName;
    }

    res.status(200).json({ id: id, firstName: fn, lastName: ln, error: "" });
  } catch (e) {
    res
      .status(200)
      .json({ id: -1, firstName: "", lastName: "", error: e.toString() });
  }
});

// ADD CARD
app.post("/api/addCard", async (req, res) => {
  const { userId, card } = req.body;
  var error = "";

  try {
    const db = client.db("COP4331Cards");
    const newCard = { Card: card, UserId: userId };
    await db.collection("Cards").insertOne(newCard);
  } catch (e) {
    error = e.toString();
  }

  res.status(200).json({ error: error });
});

// SEARCH CARDS
app.post("/api/searchCards", async (req, res) => {
  const { userId, search } = req.body;

  try {
    const db = client.db("COP4331Cards");
    var _search = search.trim();

    const results = await db
      .collection("Cards")
      .find({ Card: { $regex: _search + ".*", $options: "i" }, UserId: userId })
      .toArray();

    res.status(200).json({ results: results, error: "" });
  } catch (e) {
    res.status(200).json({ results: [], error: e.toString() });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
