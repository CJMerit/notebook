const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      id: uuidv4(),
      title,
      text
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

notes.delete('/:id', (req, res) => {
  readFromFile('./db/notes.json')
  .then((data) => {
    let noteList = JSON.parse(data);
    for( let i = 0; i < noteList.length; i++) {
      if (noteList[i].id === req.params.id) {
        noteList.splice(i, 1);
      }
    }
    writeToFile('./db/notes.json', noteList);
  });
  res.json(`Note deleted successfully 🚀`);
})

module.exports = notes;