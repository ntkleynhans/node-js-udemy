const request = require('request');

const DARKSKY_URL = 'https://api.darksky.net/forecast/359540cf60a566a5bf311bab9ec5f1b7/';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibnRrbGV5bmhhbnMiLCJhIjoiY2p2aHBqeXBwMDVuYTN5dGVvdGI2enp1ZyJ9.mZCAlwRwsDvTbQKvn2pnkA';
const MAPBOX_FORWARD_GEOCODING = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const forecast = (coords) => {
  const { latitude, longitude } = coords;
  const url = `${DARKSKY_URL}${latitude},${longitude}`;
  request({url, json: true}, (error, response) => {
    if(!error || 200 === response.statusCode) {
      console.log(response.body.currently);
    } else {
      console.log('!Error:', error);
    }
  });
}

const geocode = (address, callback) => {
  const url = encodeURI(`${MAPBOX_FORWARD_GEOCODING}${address}.json?access_token=${MAPBOX_TOKEN}&limit=1`);
  request({url, json: true}, (error, response) => {
    if(error || 200 !== response.statusCode) {
      console.log('!Error:', error);
    } else {
      if( response.body.features.length > 0) {
        let [latitude, longitude] = response.body.features[0].center;
        const coords = {latitude, longitude};
        callback(coords);
      } else {
        console.log('!Error: cannot find location -- ' + address);
      }
    }
  });
}

module.exports = {
  geocode: geocode,
  forecast: forecast
}