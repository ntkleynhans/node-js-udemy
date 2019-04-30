const fs = require('fs');
const chalk = require('chalk');

const DB_NAME = 'notes.json';
const log = console.log;
const warn = chalk.yellow;
const info = chalk.green;

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    log(info(title))
    log(info(note.body));
  } else {
    log(error('Title not found: ', title));
  }
}

const listNotes = () => {
  const notes = loadNotes();
  //debugger
  log(chalk.green.inverse('Your notes:'))

  notes.forEach((note) => {
    log(info(note.id, 'Title:', note.title))
  })
}

const removeNote = (title) => {
  const notes = loadNotes();
  const popNote = notes.filter((note) => note.title !== title);

  if(notes.length === popNote.length) {
    log(warn('No note found!'));
  } else {
    log(info('Note removed: ', title));
    saveNotes(popNote);
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      id: notes.length,
      title: title,
      body: body
    });

    saveNotes(notes);
    log(info('Note saved!'));
  } else {
    log(error('Title has been taken: ', title));
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
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
