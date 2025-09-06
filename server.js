const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let currentNote = '';

io.on('connection', (socket) => {
    socket.emit('noteUpdate', currentNote);

    socket.on('noteChange', (note) => {
        currentNote = note;
        socket.broadcast.emit('noteUpdate', currentNote);
    });

    socket.on('chatMessage', (message) => {
        io.emit('chatMessage', message);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});