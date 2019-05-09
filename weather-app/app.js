const request = require('request');

const DARKSKY_URL = 'https://api.darksky.net/forecast/359540cf60a566a5bf311bab9ec5f1b7/37.8267,-122.4233';

request({url: DARKSKY_URL}, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data.currently);
});
