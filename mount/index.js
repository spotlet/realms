
/**
 * Module dependencies
 */

var exec = require('child_process').exec
  , exit = process.exit

module.exports = function (args) {
  var cmd = 'spotlet-mount '+ args.concat(['-d']).join(' ');
  var child = exec(cmd, function (err, stderr, stdout) {
    if (err) { console.error(stderr) }
    console.log(stdout);
  });
};

