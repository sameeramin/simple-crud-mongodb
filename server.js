// Importing the required modules
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// Creating the express app
const app = express();

// Setting up the template engine
app.set("view engine", "ejs");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static("public"));

// Setting MongoClient for MongoDB
const MongoClient = require("mongodb").MongoClient;

const connectionString = process.env.CONNECTION_STRING;

// Connecting to the database
MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.log(err);
    console.log("Connected to the database");
    const db = client.db("star-wars-qoutes");
    const quotesCollection = db.collection("quotes");

    // Setting the port for the server to run on port 3000
    app.listen(3000, function () {
        console.log("listening on 3000");
    });

    // Creating an index route
    app.get("/", (req, res) => {
        quotesCollection
            .find()
            .toArray()
            .then((results) => {
                res.render("index.ejs", { quotes: results });
            });
    });

    // Creating a qoute route
    app.post("/quotes", (req, res) => {
        // Inserting the qoute into the database
        quotesCollection
            .insertOne(req.body)
            .then((result) => {
                res.redirect("/");
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // Creating update route for quotes
    app.put("/quotes", (req, res) => {
        quotesCollection
            .findOneAndUpdate(
                { name: "Sameer" },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote,
                    },
                },
                {
                    upsert: true,
                }
            )
            .then((result) => {
                console.log(result);
                res.send("Success");
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // Creating delete route for quotes
    app.delete("/quotes", (req, res) => {
        quotesCollection
            .deleteOne({ name: req.body.name })
            .then((result) => {
                res.json(`Deleted Darth Vadar's quote`);
            })
            .catch((error) => console.error(error))
            .then((result) => {
                if (result.deletedCount === 0) {
                    return res.json("No quote to delete");
                }
                res.json(`Deleted Darth Vadar's quote`);
            })
            .catch((error) => console.error(error));
    });
});
