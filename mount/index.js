
/**
 * Module dependencies
 */

var exec = require('child_process').exec

module.exports = function (args, socket) {
  if ('-h' == args[0] || '--help' == args[0]) {
    help(socket);
  } else if (0 == args.length) {
    help(socket);
  } else {
    mount(args, function (err, cid) {
      if (err) { socket.send(cid || err); }
      else { socket.send(cid); }
    });
  }
};

function help (socket) {
  socket.send("usage: mount [-h] <spotlet>");
}

function mount (args, fn) {
  var cmd = 'spotlet-mount '+ args.concat(['-d']).join(' ');
  var child = exec(cmd, function (err, stdout, stderr) {
    fn(err, stdout);
  });
}

