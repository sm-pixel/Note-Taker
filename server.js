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
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

//API routes
app.get("/api/notes", (req, res) => {
    res.json(notes)
});

//create new note
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = Math.floor(Math.random() * 1000) + 1;

    notes.push(newNote)

    fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
        if (err) console.log(err)
        res.sendStatus(200)
    })
})

//delete note
app.delete("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const filteredNotes = notes.filter(note => note.id !== id)
    notes = filteredNotes

    fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
        if (err) console.log(err);
         res.status(200).json(notes);
    });
});

//listener
app.listen(PORT, () => {
    console.log('Listening on PORT ' + PORT + ' ...');
});