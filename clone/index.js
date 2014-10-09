
/**
 * Module dependencies
 */

var exec = require('child_process').exec
  , path = require('path')

var SPOTLET_INDEX = process.env.SPOTLET_INDEX || '/usr/local/spotlets';

module.exports = function (args, socket) {
  var endpoint = args.shift();

  if ('-h' == endpoint || '--help' == endpoint) {
    help(socket);
  } else if (null == endpoint) {
    help(socket);
  } else {
    clone(endpoint, function (err, dest) {
      if (err) { socket.send(err); }
      else { socket.send(dest); }
    });
  }
};

function help (socket) {
  socket.send("usage: clone [-h] <endpoint>");
}

function clone (endpoint, fn) {
  var name = path.basename(endpoint); name = name.replace('.git', '');
  var dest = SPOTLET_INDEX +'/'+ name;
  var cmd = 'rm -rf '+ dest +' && git clone '+ endpoint + ' '+ dest;
  var child = exec(cmd, function (err, stdout, stderr) {
    if (err) { console.error(stderr); }
    fn(err, dest);
  });
}

