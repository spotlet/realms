
/**
 * Module dependencies
 */


var exec = require('child_process').exec

module.exports = function (args, socket) {
  var cid = args.shift();
  stop(cid, function (err, cid) {
    if (err) { socket.send(err); }
    else { socket.send(cid); }
  });
};

function stop (cid, fn) {
  var cmd = 'docker stop '+ cid;
  var child = exec(cmd, function (err, stderr, stdout) {
    fn(err, stderr || stdout);
  });
}

