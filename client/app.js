const moment = require('moment');
const connect = require('./lib/connect');
const report = require('./lib/report');

(async function() {
  console.log('Starting connection to websocket...');

  let inactiveSince;
  const connection = connect();

  connection.addEventListener('open', () => {
    if (inactiveSince && Number.isFinite(inactiveSince)) {
      const now = Date.now();
      const diff = (now - inactiveSince) / 1000;
      report('Internet was inactive for ' + diff + ' seconds');
      
      inactiveSince = null;
    }
  });

  connection.addEventListener('error', error => {
    if (!inactiveSince) {
      inactiveSince = Date.now();
      report('Internet broke at ' + moment().format('HH:MM:ss'));
    }
  });
})();