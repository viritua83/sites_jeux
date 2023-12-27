const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serveur HTTP
const port = 3000;
server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté');

  // Gestion des messages du client vers le serveur
  socket.on('chat message', (msg) => {
    console.log(`Message reçu : ${msg}`);
    
    // Diffuser le message à tous les clients connectés
    io.emit('chat message', msg);
  });

  // Gestion de la déconnexion de l'utilisateur
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

// Serveur Web (Express)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
