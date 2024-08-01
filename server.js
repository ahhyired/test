const express = require('express');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = require('http').createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

module.exports = app;
module.exports.server = server;