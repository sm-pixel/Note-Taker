//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 4040;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//data

//html routes
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'index.html'))
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'notes.html'))
});

//api routes

//use fs.writeFile to write notes to json

//listener
app.listen(4040, function() {
    console.log("Listening on PORT " + PORT + " ...");
});