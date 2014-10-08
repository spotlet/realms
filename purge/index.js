
module.exports = function (args, socket) {

  console.error("Purging require cache")
  for (var _ in require.cache) {
    console.error("purge: %s", _);
    require.cache[_] = null;
  }

  socket.send("error: Cache purged");
};
