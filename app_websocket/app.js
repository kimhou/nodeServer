
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  ,http = require('http')
  , user = require('./routes/user')
    , path = require('path'),
  io = require('socket.io');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'assets')));
  app.use('/static', express.static(path.join(__dirname, 'assets/html')));
  app.use('/bscss', express.static(path.join(__dirname, 'assets/bootstrap/css')));
  app.use('/bsjs', express.static(path.join(__dirname, 'assets/bootstrap/js')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

app.get('/', function(req, res){
loadModule(req, res);
});
app.get(/\/([\w\d_]+)\.n/, function(req, res){
  loadModule(req, res);
});
function loadModule(req, res){
  var mod = req.params[0] || 'chat';
  require('./server_modules/' + mod).init(req, res, {
    qpp: app,
    server: server
  });
}



