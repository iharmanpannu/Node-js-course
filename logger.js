const EventEmitter = require('events');

var url = 'http://example.com/log';

class Logger extends EventEmitter {
  log(message) {
    //send the HTTP request¯
    console.log(message);

    // Raise an event
    this.emit('messageLogged', {
      id: 1,
      url: 'http://'
    });
  }
}

module.exports = Logger;
