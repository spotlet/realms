
module.exports = function (args, socket) {
  var opts = args[0];
  var out = null;
  if ('-h' == opts) {
    out = "usage: echo [-h] [-n] [arg ...]"
  } else if ('-' == opts[0]) {
    args.shift();
    out = args.join(' ');
    opts = opts.substr(1).split('');
    if (-1 != opts.indexOf('n')) {
      out = out.trim();
    }
  } else {
    out = args.join(' ');
  }

  socket.send(out);
};

