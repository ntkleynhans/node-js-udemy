/*const fs = require('fs');

fs.writeFileSync('notes.txt', 'This file was created by node.js');

fs.appendFileSync('notes.txt', 'Some text has been appended to the file');
*/

const add = require('./utils');
const getNotes = require('./notes');

console.log(add(2,3));
console.log(getNotes());
