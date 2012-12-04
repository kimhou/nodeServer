
/*
 * GET home page.
 */

exports.index = function(req, res){
    var http = require('http'),
        server = http.createServer(app),
        io = require('socket.io');
    io = io.listen(server);
    server.listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
    });
    io.sockets.on('connection', function(socket){
      socket.emit('connetMsg', {msg: 'socket is conneted at ' + (new Date())});
      socket.on('chatMsg', function(data){
        console.log('get clientMsg: ', data);
        socket.broadcast.emit('chatMsg', {name: data.name, msg: data.msg});
      });
    });
  res.render('index', { title: 'WebSocket Demo' });
};