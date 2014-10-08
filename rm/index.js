/**
 * Module dependencies
 */

var exec = require('child_process').exec
  , path = require('path')

var SPOTLET_INDEX = process.env.SPOTLET_INDEX || '/usr/local/spotlets';

module.exports = function (args, socket) {
  rm(args, function (err, list) {
    if (err) { socket.send(err); }
    else { socket.send(list); }
  });
};

function rm (spotlet, fn) {
  var cmd = null;

  if (!spotlet) {
    return fn(new Error("Nothing to remove"));
  }

  cmd = 'rm -rf '+ path.resolve(SPOTLET_INDEX, spotlet);
  exec(cmd, function (err, stderr, stdout) {
    fn(err, stderr || stdout);
  });
}

