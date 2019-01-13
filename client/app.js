const Connecter = require('./connecter');
const Pinger = require('./pinger');
const Reporter = require('./reporter');

(async function() {
  const connecter = new Connecter(Reporter, Pinger);
  
  connecter.on('giveUp', () => {
    console.log('Looks like you are not connected to the Internet at all.');
  });
  connecter.on('error', () => {
    setTimeout(() => connecter.initialize(), 1000);
  });
  connecter.initialize();
})();