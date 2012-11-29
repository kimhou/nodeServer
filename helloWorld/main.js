var express = require('express');
var app = express();
var http = require('http');

app.get('/', function(req, res){
res.send('hello world');
});
http.createServer(app).listen(app.get('port'));
//app.listen(80);
