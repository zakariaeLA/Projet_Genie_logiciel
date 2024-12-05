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
    
    

    // Récupérer les étudiants existants
    const etudiant1 = await Etudiant.findOne({ email: "zakariae.lachhab@enim.ac.ma" });
   
    
    // Création d’un étudiant
  const nouvelEtudiant = new Etudiant({
    nom: "bouc",
    prenom: "aya",
    email: "aya.bouc@enim.ac.ma",
    motDePasse: "sesameee",
    profilePic:"bblaooa",
    clubs: null,
    evenementsParticipes: [],
    evenementsAVenir: [],
  });

  
  const result = await nouvelEtudiant.save(); // Sauvegarde dans la base de données
  console.log("Étudiant créé avec succès :", result);
  
    

   
  } catch (error) {
    console.error("Erreur lors de l'exécution :", error.message);
  } finally {
    db.close(); // Fermer la connexion
  }
});
