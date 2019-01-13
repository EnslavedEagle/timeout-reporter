const WebSocket = require('ws');
const Pinger = require('./pinger');
const Reporter = require('./reporter');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const connection = new WebSocket('ws://localhost:8080');

(async function() {
  
  connection.on('open', async () => {
    const reporter = new Reporter();
    const pinger = new Pinger(connection);

    pinger.on('ping', (e) => {
      console.log('ping happened!');
    })

    pinger.on('error', (e) => {
      console.log('connection error!');
    });

    pinger.start();
  });
})();