const fs = require('fs');

const book = {
  title: 'Cloud Atlas',
  author: 'Mitchell'
}

const bookJSON = JSON.stringify(book);

/*
console.log(bookJSON);

const parsed = JSON.parse(bookString);

console.log(parsed);*/

fs.writeFile('1-json.json', bookJSON, (err) => {
  if(err) throw err;
});


fs.readFile('1-json.json', (err, dataBuffer) => {
  if(err) throw err;
  console.log(JSON.parse(dataBuffer.toString()));
});
