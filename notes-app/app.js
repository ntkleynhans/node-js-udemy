/*const fs = require('fs');

fs.writeFileSync('notes.txt', 'This file was created by node.js');

fs.appendFileSync('notes.txt', 'Some text has been appended to the file');
*/
const chalk = require('chalk');
const validator = require('validator');
const add = require('./utils');
const getNotes = require('./notes');
const log = console.log

log(chalk.green('Success!'));
log(chalk.green.inverse('Success!'));
log(chalk.blue.bgRed.bold(add(2,3)));
log(chalk.blue(getNotes()));
log(chalk.green.bold(validator.isEmail('neil@example.com')));
