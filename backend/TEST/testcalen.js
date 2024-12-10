const mongoose = require("mongoose");
const Etudiant = require("../models/Etudiant"); // Chemin corrigé
const Evenement = require("../models/Evenement"); // Chemin corrigé

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

  // Fonction pour créer un nouvel étudiant
  async function createEtudiant() {
    try {
      const nouvelEtudiant = new Etudiant({
        nom: "John Doe",
        prenom: "jojo",
        email: "john.doe@example.com",
        motDePasse: "password123",
      });

      await nouvelEtudiant.save();
      console.log("Étudiant créé :", nouvelEtudiant);
      return nouvelEtudiant;
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
        image: "url_de_l_image",
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
  const etudiant = await createEtudiant();
  if (etudiant) {
    await createEvenement(etudiant._id);
  }

  // Fermer la connexion à MongoDB
  mongoose.connection.close();
}).on("error", (error) => {
  console.error("Erreur de connexion à MongoDB :", error);
});