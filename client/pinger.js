const EventEmitter = require('events');

class Pinger {
  constructor(socket) {
    this.socket = socket;
    this.events = new EventEmitter();
  }

  on(event, cb) {
    return this.events.on(event, cb);
  }

  start() {
    const interval = setInterval(async () => {
      try {
        await this.sendOne('message!');
      } catch(error) {
        clearInterval(interval);
        this.events.emit('error', error);
      }
    }, 1000);
  }

  sendOne(message = '') {
    return new Promise((resolve, reject) => {
      this.socket.send(message, (err) => {
        if (err) {
          reject('No connection!');
          return;
        }
        resolve();
      });
    });
  }
}

module.exports = Pinger;