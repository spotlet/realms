

/**
 * Module dependencies
 */

var exec = require('child_process').exec
  , path = require('path')

var SPOTLET_INDEX = process.env.SPOTLET_INDEX || '/usr/local/spotlets';

module.exports = function (args, socket) {
  var spotlet = args.shift();

  if ('-h' == spotlet || '--help' == spotlet) {
    help(socket);
  } else if (null == spotlet) {
    help(socket);
  } else {
    update(spotlet, function (err, out) {
      if (err) { socket.send(err); }
      else { socket.send(out); }
    });
  }
};

function help (socket) {
  socket.send("usage: update [-h] <spotlet>");
}

function update (spotlet, fn) {
  var p = path.resolve(SPOTLET_INDEX, spotlet);
  var cmd = 'cd '+ p +' && git reset --hard && git pull';
  var child = exec(cmd, function (err, stdout, stderr) {
    if (err) { console.error(stderr); }
    fn(err, "Updated "+ spotlet);
  });
}

