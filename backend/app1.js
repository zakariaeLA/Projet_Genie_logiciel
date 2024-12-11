const express = require('express');
const bodyParser = require("body-parser");
const connexionRoute = require("./routes/connexion");
const etudiantRoutes = require('./routes/etudiantsRoutes'); // Import des routes étudiants
const authMiddleware = require('./middlewares/auth');


const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" }); // Assurez-vous que votre fichier .env existe et contient la clé MONGO_URI
const path = require('path');
const cors = require('cors'); // Importer le package CORS
const app1 = express();
const port = 8000;



// Middleware CORS : C'est correct, mais vous pouvez restreindre les origines si nécessaire
app1.use(cors()); // Cela permet à toutes les origines d'accéder à votre API, vous pouvez configurer cela pour plus de sécurité si nécessaire

// Serveur de fichiers statiques pour les images des événements
app1.use('/imagesEvenement', express.static(path.join(__dirname, 'public', 'imagesEvenement')));

// Route pour servir une image en fonction de son nom
app1.get('/api/imagesEvenement/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'public', 'imagesEvenement', imageName);
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
});

// Middleware : Body parser et JSON parsing
app1.use(bodyParser.json());
app1.use(express.json()); // Il n'est pas nécessaire d'utiliser bodyParser et express.json() ensemble. `express.json()` suffit pour les nouvelles versions d'Express.

// Utilisation des routes : Connexion et Étudiants
app1.use("/api", connexionRoute);
app1.use('/api/etudiants', etudiantRoutes);

// Connexion à MongoDB avec la variable d'environnement MONGO_URI
const uri = process.env.MONGO_URI; // Assurez-vous que MONGO_URI est défini dans le fichier .env
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Route par défaut pour vérifier si le backend fonctionne
app1.get("/", (req, res) => {
    res.send("Backend is working and connected to MongoDB!");
});

// Démarrage du serveur
app1.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});
