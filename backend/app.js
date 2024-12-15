const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const eventsRouter = require('./routes/evenements');
const connexionRoute = require("./routes/connexion");
const profilRoutes = require("./routes/profil");
const path = require("path");
const authMiddleware = require('./middlewares/auth');
require("dotenv").config({path: "./config/.env"});

const app = express();
const PORT = process.env.PORT || 8000;

// Allow all CORS requests
app.use(cors());

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Pour parser les requêtes JSON
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connexion à MongoDB Atlas
const uri = process.env.MONGO_URI;
mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
    res.send("Backend is working and connected to MongoDB!");
});

// Routes publiques (non protégées par JWT)
app.use("/api", connexionRoute);

// Routes protégées (nécessitent une authentification)
app.use("/api", authMiddleware, profilRoutes); // Applique le middleware auth avant profilRoutes
app.use('/api/events', eventsRouter); // Ajoutez vos autres routes ici
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

// Route de base
app.get("/", (req, res) => {
    res.send("Backend is working and connected to MongoDB!");
});

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose a mal tourné !');
});
app.use('/api/events', eventsRouter); // Ajoutez cette ligne pour intégrer les routes des événements