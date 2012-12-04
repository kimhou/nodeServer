/**
 * chat demo index
 */
exports.init = function(req, res, options){
    var io = io = require('socket.io');
    io = io.listen(3003);
    io.sockets.on('connection', function(socket){
      socket.emit('connetMsg', {msg: 'socket is conneted at ' + (new Date())});
      socket.on('videoData', function(data){
        socket.broadcast.emit('videoData', data);
      });
    });
  res.render('video', {type: 'video', title: 'WebSocket getUserMedia Demo' });
}