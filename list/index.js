
/**
 * Module dependencies
 */

var fs = require('fs')

var SPOTLET_INDEX = process.env.SPOTLET_INDEX || '/usr/local/spotlets';

module.exports = function (args, socket) {
  if ('-h' == args[0] || '--help' == args[0]) {
    help(socket);
  } else if (0 == args.length) {
    list(function (err, spotlets) {
      if (err) { socket.send(err); }
      else { socket.send(spotlets.join('\n')); }
    });
  } else {
    help(socket);
  }
};

function help (socket) {
  socket.send("usage: list [-h]");
}

function list (fn) {
  setImmediate(function () {
    try { fn(null, fs.readdirSync(SPOTLET_INDEX)); }
    catch (e) { fn(e); }
  });
}

