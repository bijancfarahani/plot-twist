var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(morgan('dev'));

app.use(express.static(__dirname + '/../public'));

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

var clients = {};
var roomSize = {room1: 0, room2: 0, room3: 0, room4: 0};

io.on('connection', function(socket){
  console.log(socket.id + ' connected');
  clients.push(socket.id);
  socket.on('clientInfo', function(clientInfo) {
      console.log('clientInfo: ' + clientInfo.name + clientInfo.age);
  })

  console.log(io.sockets.adapter.rooms)
  socket.broadcast.emit('newRoom', socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
    

http.listen(3000,function() {
	console.log('listening on ' + 3000);
})