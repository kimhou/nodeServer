var express = require('express'),
    path = require('path'),
    io = require('socket.io');
var app = express();
app.set('port', 80);
app.use(express.static(path.join(__dirname, 'html')));


app.get('/', function(req, res){
    res.send('hello');
});

var server = require('http').createServer(app);
io = io.listen(server);

server.listen(80,function(){
    console.log('express listen on ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });

});


