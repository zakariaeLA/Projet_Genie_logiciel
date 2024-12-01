const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB Atlas
const uri = process.env.MONGO_URI; // Assure-toi d'ajouter l'URL dans ton fichier .env
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Démarrer le serveur
app.listen(port, () => {
  console.log("Server is running on port: http://localhost:5000");
});

app.get("/", (req, res) => {
  res.send("Backend is working and connected to MongoDB!");
});
