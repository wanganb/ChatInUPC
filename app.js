var app = require('express')();
var http = require('http').Server(app);
var sio = require('socket.io')(http);
var expressSession = require('express-session')
var session=expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
});
app.use(session);
app.get('/', function(req, res){
  res.sendfile('index.html');
});

sio.on('connection', function(socket){
    session(socket.handshake, {}, function (err) {
        var session = socket.handshake.session;
        console.log('sessionid:'+session.id);
        var astop=1;
    });
    console.log('a user connected');
    socket.on('chat message', function(msg){
        sio.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});