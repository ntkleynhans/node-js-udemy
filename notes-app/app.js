const chalk = require('chalk');
//const validator = require('validator');
const yargs = require('yargs');

//const add = require('./utils');
const notes = require('./notes');

const log = console.log;
const error = chalk.red;
const warn = chalk.yellow;
const info = chalk.green;

//log(chalk.green.bold(validator.isEmail('neil@example.com')));

yargs.version('0.0.1');

yargs.command({
  command: 'add',
  describe: 'Add a note to the store',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note from a store',
  handler: () => {
    log(info('Removing your note'));
  }
});

yargs.command({
  command: 'list',
  describe: 'List a note from a store',
  handler: () => {
    log(info('Listing your note'));
  }
});

yargs.command({
  command: 'read',
  describe: 'Read a note from a store',
  handler: () => {
    log(info('Reading your note'));
  }
});

yargs.parse();
