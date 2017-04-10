var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
  socket.emit('createMessage', {
    from: 'zac@gmail.com',
    text: 'blood oranges and tangos'
  });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message received', message);
});
