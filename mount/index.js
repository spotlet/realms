
/**
 * Module dependencies
 */

var exec = require('child_process').exec

module.exports = function (args, socket) {
  mount(args, function (err, cid) {
    if (err) { socket.send(err); }
    else { socket.send(cid); }
  });
};

function mount (args, fn) {
  var cmd = 'spotlet-mount '+ args.concat(['-d']).join(' ');
  var child = exec(cmd, function (err, stderr, stdout) {
    if (err) { fn(err); }
    else { fn(null, stderr || stdout); }
  });
}

