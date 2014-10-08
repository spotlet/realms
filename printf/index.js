
/**
 * Module dependencies
 */

var format = require('util').format

module.exports = function (args, socket) {
  socket.send(format.apply(null, args));
};

