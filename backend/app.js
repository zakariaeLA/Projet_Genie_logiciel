const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventsRouter = require('./routes/creation et obtention');
require("dotenv").config({ path: "./config/.env" });
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http');
const socketIo = require('socket.io');


// Middleware
app.use(bodyParser.json()); // Pour parser les requêtes JSON

// Connexion à MongoDB
const uri = process.env.MONGO_URI; // Assure-toi d'ajouter l'URL dans ton fichier .env
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));


// Routes
app.use('/api/events', eventsRouter);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
// Créez le serveur HTTP
const server = http.createServer(app);
const io = socketIo(server);

// Écoutez les connexions des clients
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('message', (data) => {
        io.emit('message', data); // Émettez le message à tous les clients connectés
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
    });
});

// Remplacez app.listen par server.listen
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});