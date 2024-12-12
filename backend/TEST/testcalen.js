const mongoose = require("mongoose");
const Etudiant = require("../models/Etudiant"); // Chemin corrigé
const Evenement = require("../models/Evenement"); // Chemin corrigé

// Connexion à MongoDB
mongoose.connect(
  "mongodb+srv://ayakandoussi:sesame@parascolaire.bzzso.mongodb.net/GestionPara?retryWrites=true&w=majority"
);

// Écouter l'événement 'open' pour confirmer la connexion
const db = mongoose.connection;
db.once("open", async () => {
  console.log("Connecté à MongoDB pour le test.");

  // Fonction pour créer un nouvel étudiant
  async function createEtudiant() {
    try {
      const nouvelEtudiant = new Etudiant({
        nom: "John Doe",
        prenom: "Jojo",
        email: "jiinno.doe@example.com",
        motDePasse: "password123",
      });

      await nouvelEtudiant.save();
      console.log("Étudiant créé :", nouvelEtudiant);
      return nouvelEtudiant; // Retourne l'étudiant créé
    } catch (error) {
      console.error("Erreur lors de la création de l'étudiant :", error);
    }
  }

  // Fonction pour créer un nouvel événement
  async function createEvenement(etudiantId) {
    try {
      const nouvelEvenement = new Evenement({
        titre: "Atelier de Programmation",
        description: "Un atelier pour apprendre la programmation.",
        date: new Date("2024-12-15T10:00:00Z"),
        lieu: "Salle A",
        image: "https://res.cloudinary.com/dpatphkug/image/upload/v1733944197/ai-artificial-intelligence-blur-546819-1200x800_ku4lm9.jpg",
        club: null, // Remplacez par l'ID du club si nécessaire
        participants: [etudiantId], // Ajoutez l'étudiant comme participant
      });

      await nouvelEvenement.save();
      console.log("Événement créé :", nouvelEvenement);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
    }
  }

  // Appeler les fonctions pour créer l'étudiant et l'événement
  const etudiant = await createEtudiant(); // Crée l'étudiant et obtient son ID
  if (etudiant) {
    await createEvenement(etudiant._id); // Utilise l'ID de l'étudiant créé
  }

  // Fermer la connexion à MongoDB
  mongoose.connection.close();
}).on("error", (error) => {
  console.error("Erreur de connexion à MongoDB :", error);
});