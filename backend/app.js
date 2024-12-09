const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const connexionRoute = require("./routes/connexion");
const profilRoutes = require("./routes/profil");
const path = require("path");
const authMiddleware = require('./middlewares/auth');


require("dotenv").config({ path: "./config/.env" });

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes publiques (non protégées par JWT)
app.use("/api", connexionRoute);

// Routes protégées (nécessitent une authentification)
app.use("/api", authMiddleware, profilRoutes); // Applique le middleware auth avant profilRoutes

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
