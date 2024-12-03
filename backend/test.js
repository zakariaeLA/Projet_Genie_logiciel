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

  try {
    // Récupérer les clubs existants
    const club1 = await Club.findOne({ nom: "Bénévolat" });
    const club2 = await Club.findOne({ nom: "Tech Innovators" });

    if (!club1 || !club2) {
      console.log("Certains clubs n'ont pas été trouvés.");
      return;
    }

    // Récupérer les étudiants existants
    const etudiant1 = await Etudiant.findOne({ email: "zakariae.lachhab@enim.ac.ma" });
    const etudiant2 = await Etudiant.findOne({ email: "aya.bouchama@enim.ac.ma" });
    const etudiant3 = await Etudiant.findOne({ email: "yahya.bakka@enim.ac.ma" });

    if (!etudiant1 || !etudiant2 || !etudiant3) {
      console.log("Certains étudiants n'ont pas été trouvés.");
      return;
    }

    // Création du premier événement
    const evenement3 = new Evenement({
      titre: "Entrepreneurial Exchange HuB",
      description: "Bridging students and industry Leaders",
      date: new Date("2024-05-01"),
      lieu: "Salle A, Université X",
      image: "https://github.com/zakariaeLA/Gestion_Parascolaire/blob/feature/PageEvenementFront/frontend/public/image/Histo5.jpeg",
      club: club1._id, // Associe l'événement au club "Bénévolat"
      participants: [etudiant1._id, etudiant2._id], // Associe les étudiants en tant que participants
    });

    // Création du deuxième événement
    const evenement4 = new Evenement({
      titre: "Atelier de programmation",
      description: "Un atelier pour apprendre à coder.",
      date: new Date("2024-06-01"),
      lieu: "Salle B, Université Y",
      image: "https://github.com/zakariaeLA/Gestion_Parascolaire/blob/feature/PageEvenementFront/frontend/public/image/mead1.jpeg",
      club: club2._id, // Associe l'événement au club "Tech Innovators"
      participants: [etudiant1._id, etudiant3._id], // Associe les étudiants en tant que participants
    });

    // Sauvegarde des événements dans la base de données
    const savedEvenement3 = await evenement3.save();
    const savedEvenement4 = await evenement4.save();

    console.log("Événements créés :", savedEvenement3, savedEvenement4);

    // Mise à jour des étudiants avec les événements participés et à venir
    etudiant1.evenementsParticipes.push(savedEvenement3._id);
    etudiant1.evenementsAVenir.push(savedEvenement4._id);
    etudiant2.evenementsParticipes.push(savedEvenement3._id);
    etudiant3.evenementsAVenir.push(savedEvenement4._id);

    // Sauvegarde des modifications des étudiants
    await etudiant1.save();
    await etudiant2.save();
    await etudiant3.save();

    console.log("Étudiants mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'exécution :", error.message);
  } finally {
    db.close(); // Fermer la connexion
  }
});
