//Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4040;

let notes = require("./db/db.json");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serves resources from pulic folder
app.use(express.static("public"));


//HTML routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

//API routes
app.get("/api/notes", function(req, res) {
    res.json(notes)
});
//use fs.writeFile to write notes to json
//create new note
app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    newNote.id = Math.floor(Math.random() * 1000) + 1;

    notes.push(newNote)

    fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
        if (err) console.log(err)
        res.sendStatus(200)
    })
})

//delete note
app.delete("/api/notes/:id", function(req, res) {
    const id = parseInt(req.params.id);
    // const removed = data.splice(id, 1);
    const filteredNotes = notes.filter(note => note.id !== id)
    notes = filteredNotes

    fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
        if (err) console.log(err);
         res.status(200).json(notes);
    });
});

//listener
app.listen(4040, function() {
    console.log('Listening on PORT ' + PORT + ' ...');
});