const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const connexionRoute = require("./routes/connexion");
const profilRoutes = require("./routes/profil");

require("dotenv").config({ path: "./config/.env" });

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Utilisation de la route de connexion
app.use("/api", connexionRoute);
app.use("/api", profilRoutes);

// Connexion à MongoDB Atlas
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Démarrer le serveur
app.listen(port, () => {
  console.log("Server is running on port: http://localhost:5000");
});

app.get("/", (req, res) => {
  res.send("Backend is working and connected to MongoDB!");
});
