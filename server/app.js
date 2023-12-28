const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Stockage des utilisateurs connectés
const connectedUsers = {};

// Serveur HTTP
const port = 3000;
server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté');

  // Gestion de la connexion de l'utilisateur
  socket.on('user connected', (username) => {
    connectedUsers[socket.id] = username;
    io.emit('chat message', `[${username} a rejoint le chat]`);
  });

  // Gestion des messages du client vers le serveur
  socket.on('chat message', (msg) => {
    const username = connectedUsers[socket.id];
    io.emit('chat message', `[${username}]: ${msg}`);
  });

  // Gestion de la déconnexion de l'utilisateur
  socket.on('disconnect', () => {
    const username = connectedUsers[socket.id];
    delete connectedUsers[socket.id];
    io.emit('chat message', `[${username} a quitté le chat]`);
    console.log('Un utilisateur s\'est déconnecté');
  });
});

// Serveur Web (Express)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
