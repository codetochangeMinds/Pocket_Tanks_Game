var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


var app = express();

app.set('port', 3000);
app.use('/client', express.static(__dirname + '/client'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/client/tank.html'));
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

http.listen(port, function() {
  console.log('Starting server on port 5000');
});
