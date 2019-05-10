const request = require('request');
const yargs = require('yargs');

const DARKSKY_URL = 'https://api.darksky.net/forecast/359540cf60a566a5bf311bab9ec5f1b7/';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibnRrbGV5bmhhbnMiLCJhIjoiY2p2aHBqeXBwMDVuYTN5dGVvdGI2enp1ZyJ9.mZCAlwRwsDvTbQKvn2pnkA';
const MAPBOX_FORWARD_GEOCODING = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const weatherLatLong = (latLong) => {
  const url = `${DARKSKY_URL}${latLong}`;
  console.log(url);
  request({url: url, json: true}, (error, response) => {
    if(!error || 200 === response.statusCode) {
      console.log(response.body.currently);
    } else {
      console.log('!Error:', error);
    }
  });
}

const weather = (address) => {
  const url = encodeURI(`${MAPBOX_FORWARD_GEOCODING}${address}.json?access_token=${MAPBOX_TOKEN}&limit=1`);
  request({url: url, json: true}, (error, response) => {
    if(error || 200 !== response.statusCode) {
      console.log('!Error:', error);
    } else {
      if( response.body.features.length > 0) {
        weatherLatLong(response.body.features[0].center.join(","));
      } else {
        console.log('!Error: cannot find location -- ' + address);
      }
    }
  });
}

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
    weather(argv.address);
  }
});

yargs.parse();
