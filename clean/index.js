
/**
 * Module dependencies
 */

var exec = require('child_process').exec
  , path = require('path')

var SPOTLET_INDEX = process.env.SPOTLET_INDEX || '/usr/local/spotlets';

module.exports = function (args, socket) {
  var spotlet = args.shift();
  if ('-h' == spotlet || '--help' == spotlet || null == spotlet) {
    help(socket);
  } else {
    clean(spotlet, function (err, out) {
      if (err) { socket.send(err); }
      else { socket.send(out); }
    });
  }
};

function help (socket) {
  socket.send("usage: clean [-h] <spotlet>");
}

function clean (spotlet, fn) {
  var files = ['.status', 'spins'];
  var cmd = 'rm -rf '+ path.resolve(SPOTLET_INDEX, spotlet) +'/{'+files+'}';
  var child = exec(cmd, function (err, stdout, stderr) {
    if (err) { console.error(stderr); }
    fn(err, files.map(function (f) { return 'clean: '+ f; }).join('\n'));
  });
}
