/**
 * Module dependencies
 */

var exec = require('child_process').exec
  , path = require('path')

var SPOTLET_INDEX = process.env.SPOTLET_INDEX || '/usr/local/spotlets';

module.exports = function (args, socket) {
  if ('-h' == args[0] || '--help' == args[0]) {
    help(socket);
  } else if (!args || 0 == args.length) {
    help(socket);
  } else {
    rm(args[0], function (err, list) {
      if (err) { socket.send(err); }
      else { socket.send(list); }
    });
  }
};

function help (socket) {
  socket.send("usage: rm [-h] <spotlet>");
}

function rm (spotlet, fn) {
  var cmd = null;

  if (!spotlet) {
    return fn(new Error("Nothing to remove"));
  }

  cmd = 'rm -rf '+ path.resolve(SPOTLET_INDEX, spotlet);
  exec(cmd, function (err, stdout, stderr) {
    fn(err, stdout || "rm: "+ spotlet);
  });
}

