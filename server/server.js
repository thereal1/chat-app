const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'skankunt42@southpark.com',
    text: 'wow',
    createdAt: 12343
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('createMessage', (message) => {
    console.log('Client has created new message', message);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
