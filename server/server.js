const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const {generateMessage,generateLocationMessage}=require('./utils/message');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New user connected');

socket.emit('Newmessage',generateMessage('Admin','Welcome to chat app'));

// socket.broadcast.emit('Newmessage',{
//   from:'Admin',
//   text:'New User',
//   createAt:new Date().getTime()
// });
socket.broadcast.emit('Newmessage',generateMessage('Admin','New User joined'));

socket.on('CreateMessage',(message,callback)=>{
  console.log('CreateMessage',message);
  io.emit('Newmessage',generateMessage(message.from,message.text));
  callback('This is from server');
//     from:message.from,
//     text:message.text,
//     createdAt:new Date().getTime()
//
// });
});
socket.on('createLocationMessage',(coords)=>{
  io.emit('Newlocationmessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
});
  socket.on('disconnect',()=>{
    console.log('Disconnected from server');
  });
});

server.listen(port,()=>{
  console.log(`Server is up on ${port}`);

});
