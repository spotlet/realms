
/**
 * Module dependencies
 */

var fs = require('fs')

var SPOTLET_INDEX = process.env.SPOTLET_INDEX || '/usr/local/spotlets';

module.exports = function (args, socket) {
  list(function (err, spotlets) {
    if (err) { socket.send(err); }
    else { socket.send(spotlets.join('\n')); }
  });
};

function list (fn) {
  setImmediate(function () {
    try { fn(null, fs.readdirSync(SPOTLET_INDEX)); }
    catch (e) { fn(e); }
  });
}

