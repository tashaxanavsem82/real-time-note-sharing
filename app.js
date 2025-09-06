const socket = io();

const noteInput = document.getElementById('note-input');
const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');

// Handle note input change
let currentNote = '';
noteInput.addEventListener('input', () => {
    if (noteInput.value !== currentNote) {
        currentNote = noteInput.value;
        socket.emit('noteChange', currentNote);
    }
});

// Update the note when received from other users
socket.on('noteUpdate', (note) => {
    noteInput.value = note;
    currentNote = note; // Update current note to match received note
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