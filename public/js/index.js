
var socket=io();

socket.on('connect', function(){
  console.log('Connected to server');

});
socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('Newmessage',function(message){
  console.log('New message',message);
  var li=jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});
socket.on('Newlocationmessage',function(message){
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My Location</a>');

  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

socket.emit('CreateMessage',{
  from:'User',
  text:jQuery("[name=message]").val()

},function(){

});
});

var locationbutton=jQuery('#send-location');
locationbutton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    alert('Unable to fetch the location')
  });
});
