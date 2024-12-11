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
// Serve static files (images) from the 'public/images' folder
app.use('/imagesEvenement', express.static(path.join(__dirname, 'public', 'imagesEvenement')));
// Route to serve an image based on its filename
app.get('/api/imagesEvenement/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'public', 'imagesEvenement', imageName);
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});