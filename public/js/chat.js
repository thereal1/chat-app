var socket = io();

function scrollToBottom () {
  let messages = jQuery('#messages');
  let newMessage = messages.children('li:last-child');
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('updateUserList', function (usersArray) {
  var ul = jQuery('<ul></ul>');
  usersArray.forEach(function (user) {
    ul.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ul);
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  const messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  });
});

let locationBtn = jQuery('#send-location');
locationBtn.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  locationBtn.attr('disabled', 'disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationBtn.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationBtn.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});
