
/**
 * Module dependencies
 */

var format = require('util').format

module.exports = function (args, socket) {
  if ('-h' == args[0] || '--help' == args[0]) {
    help(socket);
  } else if (0 == args.length) {
    help(socket);
  } else {
    socket.send(format.apply(null, args));
  }
};

function help (socket) {
  socket.send("usage: printf <format> [arguments]");
}

