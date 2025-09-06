const socket = io();

const noteInput = document.getElementById('note-input');
const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');

// Handle note input change
noteInput.addEventListener('input', () => {
    socket.emit('noteChange', noteInput.value);
});

// Update the note when received from other users
socket.on('noteUpdate', (note) => {
    noteInput.value = note;
});

// Handle chat input
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = chatInput.value;
        socket.emit('chatMessage', message);
        chatInput.value = '';
    }
});

// Add incoming chat message to chat box
socket.on('chatMessage', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
});