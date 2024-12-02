const mongoose = require("mongoose");
const Etudiant = require("../models/Etudiant.js"); // Chemin vers ton modèle Étudiant
const Evenement = require("../models/Evenement.js"); // Chemin vers ton modèle Evenement
const Club = require("./models/Club.js"); // Chemin vers ton modèle Club

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

      // Récupérer les événements existants
      const evenement1 = await Evenement.findOne({ titre: "Conférence sur la technologie" });
      const evenement2 = await Evenement.findOne({ titre: "Atelier de programmation" });
      
      // Vérifier si les événements existent
      if (!evenement1 || !evenement2) {
        console.log("Certains événements n'ont pas été trouvés.");
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

    // Récupérer les clubs existants
    const club1 = await Club.findOne({ nom: "Bénévolat" });
    const club2 = await Club.findOne({ nom: "Tech Innovators" });

    // Vérifier si les clubs existent
    if (!club1 || !club2) {
      console.log("Certains clubs n'ont pas été trouvés.");
      return;
    }

    // Mettre à jour les étudiants avec les événements passés et à venir
    etudiant1.evenementsParticipes.push(evenement1._id); // Ajouter à l'événement passé
    etudiant1.evenementsAVenir.push(evenement2._id); // Ajouter à l'événement à venir
    etudiant2.evenementsParticipes.push(evenement1._id); // Ajouter à l'événement passé
    etudiant2.evenementsAVenir.push(evenement2._id); // Ajouter à l'événement à venir
    etudiant3.evenementsParticipes.push(evenement1._id); // Ajouter à l'événement passé
    etudiant3.evenementsAVenir.push(evenement2._id); // Ajouter à l'événement à venir

    // Sauvegarder les modifications des étudiants
    const updatedEtudiant1 = await etudiant1.save();
    const updatedEtudiant2 = await etudiant2.save();
    const updatedEtudiant3 = await etudiant3.save();

    console.log("Étudiants modifiés :", updatedEtudiant1, updatedEtudiant2, updatedEtudiant3);

  } catch (error) {
    console.error("Erreur lors de la mise à jour des étudiants :", error.message);
  } finally {
    db.close(); // Ferme la connexion
  }
});
