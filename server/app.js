/* const express = require('express');
const app = express();

// handling CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin",
			"http://localhost:4200");
	res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// route for handling requests from the Angular client
app.get('/api/message', (req, res) => {
	res.json({ message:
			'Hello GEEKS FOR GEEKS Folks from the Express server!' });
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
 */
/* 
const express=require('express');
const socketIO=require('socket.io');
const http=require('http')
const port=process.env.PORT||3000
var app = express();
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin",
			"http://localhost:4200");
	res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
	next();
});
let server = http.createServer(app);
var io=socketIO(server);

// make connection with user from server side
io.on('connection', (socket)=>{
console.log('New user connected');
//emit message from server to user
socket.emit('newMessage', {
	from:'jen@mds',
	text:'hepppp',
	createdAt:123
});

// listen for message from user
socket.on('createMessage', (newMessage)=>{
	console.log('newMessage', newMessage);
});

// when server disconnects from user
socket.on('disconnect', ()=>{
	console.log('disconnected from user');
});
});

app.get("/", (req, res) => {
res.sendFile(__dirname + "/client-side.html");
});

server.listen(port);
 */

const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id.substr(0, 2)}`);

  socket.on('message', (message) => {
      console.log(message);
      if(message != '')
      io.emit('message', ` ${message}`);
      //io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));