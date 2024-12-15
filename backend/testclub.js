const mongoose = require("mongoose");
const Etudiant = require("./models/Etudiant.js"); // Modèle Étudiant
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

  async function updateClubFilters() {
    try {
      // Modifier le filtre du club "Mines IT"
      const minesITClub = await Club.findOne({ nom: "Mines IT" });
      if (minesITClub) {
        await Club.updateOne(
          { nom: "Mines IT" }, // Filtrer par le nom du club
          { $set: { filtre: ["science"] } } // Mettre à jour le champ filtre avec "science"
        );
        console.log("Le filtre du club Mines IT a été mis à jour.");
      } else {
        console.log("Le club Mines IT n'existe pas.");
      }

      // Modifier le filtre du club "Japamines"
      const japaminesClub = await Club.findOne({ nom: "Japamines" });
      if (japaminesClub) {
        await Club.updateOne(
          { nom: "Japamines" }, // Filtrer par le nom du club
          { $set: { filtre: ["science"] } } // Mettre à jour le champ filtre avec "science"
        );
        console.log("Le filtre du club Japamines a été mis à jour.");
      } else {
        console.log("Le club Japamines n'existe pas.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des filtres des clubs:", error);
    } finally {
      // Fermer la connexion à MongoDB après la mise à jour
      mongoose.connection.close();
    }
  }

  // Appeler la fonction pour effectuer la mise à jour
  updateClubFilters();
});