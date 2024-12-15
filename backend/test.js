const mongoose = require("mongoose");
const Etudiant = require("./models/Etudiant.js"); // Chemin vers ton modèle Étudiant
const Club = require("./models/Club.js"); // Chemin vers ton modèle Étudiant

// Connexion à MongoDB
mongoose.connect(
  "mongodb+srv://ayakandoussi:sesame@parascolaire.bzzso.mongodb.net/GestionPara?retryWrites=true&w=majority&appName=parascolaire",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.once("open", async () => {
  console.log("Connecté à MongoDB pour le test.");

  // Création d’un étudiant
  const nouvelclub = new Club({
    nom: "clubtest",
    filtre: ["art","sport","culture"],
    description: "abcdefgh ijklmnop qrstuv",
    image: "nononono",
    membres:[],
    responsables: [],
  });

  try {
    const result = await nouvelclub.save(); // Sauvegarde dans la base de données
    console.log("Club créé avec succès :", result);
  } catch (error) {
    console.error("Erreur lors de la création du club :", error.message);
  } finally {
    db.close(); // Ferme la connexion
  }
});