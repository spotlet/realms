
/**
 * Module dependencies
 */

var exec = require('child_process').exec
  , path = require('path')

var SPOTLET_INDEX = process.env.SPOTLET_INDEX || '/usr/local/spotlets';

module.exports = function (args, socket) {
  if ('-h' == args[0]) {
    help(socket);
  } else if (!args || 0 == args.length) {
    help(socket);
  } else {
    status(args[0], function (err, status) {
      if (err) { socket.send(err); }
      else { socket.send(status); }
    });
  }
};

function help (socket) {
  socket.send("usage: status [-h] <spotlet>");
}

function status (spotlet, fn) {
  var cmd = 'cat '+ path.resolve(SPOTLET_INDEX, spotlet) +'/.status';
  exec(cmd, function (err, stdout, stderr) {
    fn(null, err ? "error: Failed to read status for `"+spotlet+"'" : stdout);
  });
}

