
/**
 * Module dependencies
 */

var exec = require('child_process').exec

module.exports = function (args, socket) {
  var cid = null;

  if ('-h' == args[0] || '--help' == args[0]) {
    help(socket);
  } else if (0 == args.length) {
    help(socket);
  } else {

    cid = args.shift();
    stop(cid, function (err, cid) {
      if (err) { socket.send(err); }
      else { socket.send(cid); }
    });
  }
};

function help (socket) {
  socket.send("usage: list [-h]");
}

function stop (cid, fn) {
  var cmd = 'docker stop '+ cid;
  var child = exec(cmd, function (err, stdout, stderr) {
    fn(err, stderr || stdout);
  });
}

