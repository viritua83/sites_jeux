// Importer le module http
const http = require('http');

// Configuration du serveur
const server = http.createServer((req, res) => {
    // Gérer les requêtes ici
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
});

// Écouter sur le port 3000
const port = 3000;
server.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}/`);
});