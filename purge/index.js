
module.exports = function (args, socket) {

  if ('-h' == args[0] || '--help' == args[0]) {
    return help(socket);
  }

  console.error("Purging require cache");

  for (var _ in require.cache) {
    console.error("purge: %s", _);
    require.cache[_] = null;
  }

  socket.send("error: Cache purged");
};

function help (socket) {
  socket.send("usage: purge [-h]");
}
