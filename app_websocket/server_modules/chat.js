/**
 * chat demo index
 */
exports.init = function(req, res, options){
    var io = io = require('socket.io');
    io = io.listen(3002);

    io.sockets.on('connection', function(socket){
      socket.emit('connetMsg', {msg: 'socket is conneted at ' + (new Date())});
      socket.on('chatMsg', function(data){
        console.log('get clientMsg: ', data);
        socket.broadcast.emit('chatMsg', {name: data.name, msg: data.msg});
      });
    });
  res.render('chat', {type: 'chat', title: 'WebSocket Demo' });
}