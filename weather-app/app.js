const yargs = require('yargs');
const weather = require('./weather');

yargs.command({
  command: 'weather',
  describe: 'Get weather for address',
  builder: {
    address: {
      describe: '',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    weather.geocode(argv.address, weather.forecast);
  }
});

yargs.parse();
