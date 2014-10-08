
/**
 * Module dependencies
 */

var exec = require('child_process').exec

module.exports = function (args, socket) {
  ps(args, function (err, list) {
    if (err) { socket.send(err); }
    else { socket.send(list); }
  });
};

function ps (args, fn) {
  var cmd = 'docker ps -q '+ args.join(' ');
  exec(cmd, function (err, stderr, stdout) {
    fn(err, stderr || stdout);
  });
}
