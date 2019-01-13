const WebSocket = require('ws');
const EventEmitter = require('events');

class Connecter {
  constructor(
    Reporter = null,
    Pinger = null
  ) {
    this.events = new EventEmitter();
    this.url = 'ws://localhost:8080';
    this.ws = null;
    this.tries = 0;
  }

  initialize() {
    const ws = new WebSocket(this.url);
    ws.on('close', this.onClose.bind(this));
    ws.on('error', this.onError.bind(this));
    ws.on('open', this.onOpen.bind(this));
  }

  on(event, cb) {
    return this.events.on(event, cb);
  }

  setReporter(Reporter) {
    this.Reporter = Reporter;
  }

  setPinger(Pinger) {
    this.Pinger = Pinger;
  }

  onError(error) {
    if (this.tries > 2) {
      this.events.emit('giveUp');
      return;
    }
    this.events.emit('error');
    console.log('Connection error.');
    this.tries++;
  }

  onOpen() {
    const reporter = new Reporter();
    const pinger = new Pinger(connection);
  
    pinger.on('ping', (e) => {
      console.log('ping happened!');
    })
  
    pinger.on('error', (e) => {
      console.log('connection error!');
    });
  
    pinger.start();
  }

  onClose(e) {
    console.log('connection closed.', e);
  }
}

module.exports = Connecter;