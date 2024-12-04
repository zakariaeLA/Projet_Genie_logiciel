const express = require('express');
const bodyParser = require("body-parser");
const connexionRoute = require("./routes/connexion");
const etudiantRoutes = require('./routes/etudiantsRoutes'); // Import des routes étudiants

const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const path = require('path');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 8000;




app.use(cors()); // This allows all origins by default

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


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Utilisation de la route de connexion
app.use("/api", connexionRoute);
app.use('/api/etudiants', etudiantRoutes);

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
app.listen(port, () => {
    console.log("Server is running on port: http://localhost:8000");
}); 