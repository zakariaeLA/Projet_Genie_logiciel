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
  const nvetudiant = new Etudiant({
    nom: "user",
    prenom: "user",
    email: "user@enim.ac.ma",
    motDePasse: "user",
    profilePic:"",
    clubs: [],
    evenementsParticipes: [],
    evenementsAVenir: [],
  });

  try {
    const result = await nvetudiant.save(); // Sauvegarde dans la base de données
    console.log("Club créé avec succès :", result);
  } catch (error) {
    console.error("Erreur lors de la création du club :", error.message);
  } finally {
    db.close(); // Ferme la connexion
  }
});
