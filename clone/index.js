
/**
 * Module dependencies
 */

var exec = require('child_process').exec
  , path = require('path')
  , exit = process.exit

var SPOTLET_INDEX = process.env.SPOTLET_INDEX || '/usr/local/spotlets';

module.exports = function (args) {
  var endpoint = args.shift();
  clone(endpoint, function (err, dest) {

  });
};

function clone (endpoint, fn) {
  var name = path.basename(endpoint); name = name.replace(path.extname(name), '');
  var dest = SPOTLET_INDEX +'/'+ name;
  var cmd = 'rm -rf '+ dest +' && git clone '+ endpoint + ' '+ dest;
  var child = exec(cmd, function (err, stderr, stdout) {
    if (err) { console.error(stderr); }
    fn(err, dest);
  });
}

