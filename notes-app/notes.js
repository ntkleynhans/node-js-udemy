const fs = require('fs');

const DB_NAME = 'notes.json';

const getNotes = () => {
  return "Your notes..."
}

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
  addNote: addNote
}
