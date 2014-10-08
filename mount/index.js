
/**
 * Module dependencies
 */

var exec = require('child_process').exec

module.exports = function (args, socket) {
  if ('-h' == args[0] || '--help' == args[0]) {
    return help(socket);
  }

  mount(args, function (err, cid) {
    if (err) { socket.send(cid || err); }
    else { socket.send(cid); }
  });
};

function help (socket) {
  socket.send("error: usage: mount [-h] <spotlet>");
}

function mount (args, fn) {
  var cmd = 'spotlet-mount '+ args.concat(['-d']).join(' ');
  console.log(cmd)
  var child = exec(cmd, function (err, stderr, stdout) {
    fn(err, stderr || stdout);
  });
}

