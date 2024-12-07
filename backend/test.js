const mongoose = require("mongoose");
const Etudiant = require("./models/Etudiant.js"); // Modèle Étudiant
const Evenement = require("./models/Evenement.js"); // Modèle Evenement
const Club = require("./models/Club.js"); // Modèle Club

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
  const Club = require('../models/Club'); // Assurez-vous que le modèle Club est bien importé

  async function updateClubFilters() {
    try {
      // Modifier le filtre du club "Mines IT"
      await Club.updateOne(
        { nom: "Mines IT" }, // Filtrer par le nom du club
        { $set: { filtre: ["science"] } } // Mettre à jour le champ filtre avec "science"
      );
  
      // Modifier le filtre du club "Japamines"
      await Club.updateOne(
        { nom: "Japamines" }, // Filtrer par le nom du club
        { $set: { filtre: ["science"] } } // Mettre à jour le champ filtre avec "science"
      );
  
      console.log("Les filtres des clubs ont été mis à jour.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des filtres des clubs:", error);
    }
  }
  
  // Appeler la fonction pour effectuer la mise à jour
  updateClubFilters();
  
});