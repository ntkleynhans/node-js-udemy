const fs = require('fs');
const chalk = require('chalk');

const DB_NAME = 'notes.json';
const log = console.log;
const warn = chalk.yellow;
const info = chalk.green;


const getNotes = () => {
  return "Your notes..."
}

const removeNote = (title) => {
  const notes = loadNotes();

  const popNote = notes.filter((note) => {
    return note.title !== title;
  });

  if(notes.length === popNote.length) {
    log(warn('No note found!'));
  } else {
    log(info('Note removed: ', title));
    saveNotes(popNote);
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note) => {
    return note.title === title
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      id: notes.length,
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log('Note saved!');
  } else {
    console.log('Title has been taken: ', title);
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(DB_NAME, dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(DB_NAME);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return []
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}
