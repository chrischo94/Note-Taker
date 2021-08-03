const express = require("express");
const path = require('path');
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const notes = require('./db/db.json');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})
app.post('/api/notes', (req, res) =>{
    const note = req.body
    note.id - notes.length.toString()
    notes.push(note)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(note)
})
app.delete('/api/notes/:id', (req, res)=> {
    notes = notes.filter(note => {
        return note.id !== req.params.id
    })
        fs.writeFileSync('./db/db.json', JSON.stringify(notes))
        res.json(notes)
})
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  