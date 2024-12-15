const express = require('express');
const bodyParser = require("body-parser");
const connexionRoute = require("./routes/connexion");
const etudiantRoutes = require('./routes/etudiantsRoutes'); // Import des routes étudiants
const clubRoutes = require('./routes/clubRoutes');
const profilRoutes = require("./routes/profil");
const eventsRouter = require("./routes/evenements");
const mongoose = require("mongoose");
const authMiddleware = require('./middlewares/auth');

require("dotenv").config({ path: "./config/.env" });
const path = require('path');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = process.env.PORT || 8000;


// Middleware
app.use(cors()); // This allows all origins by default
app.use(bodyParser.json());
app.use(express.json());

// Utilisation de la route de connexion
app.use("/api", connexionRoute);
app.use("/api", authMiddleware, profilRoutes); // Applique le middleware auth avant profilRoutes
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/clubs',clubRoutes);
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
// Serve static files (images) from the 'public/images' folder
app.use('/imagesClubs', express.static(path.join(__dirname, 'public', 'imagesClubs')));
// Route to serve an image based on its filename
app.get('/api/imagesClubs/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'public', 'imagesClubs', imageName);
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
});

// Connexion à MongoDB Atlas
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

  app.get("/", (req, res) => {
    res.send("Backend is working and connected to MongoDB!");
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: :${PORT}`);
});