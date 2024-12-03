const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventsRouter = require('./routes/creation et obtention');
require("dotenv").config({ path: "./config/.env" });
const cors = require('cors');
const app = express();



// Allow all CORS requests
app.use(cors());
const PORT = process.env.PORT || 3000;

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