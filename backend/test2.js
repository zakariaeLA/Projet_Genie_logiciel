const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Définir le modèle Etudiant
const etudiantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  pic: {
    type: String, // URL ou chemin vers l'image du profil
  },
});

// Hachage du mot de passe avant de le sauvegarder
etudiantSchema.pre("save", async function (next) {
  if (this.isModified("motDePasse")) {
    this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  }
  next();
});

const Etudiant = mongoose.model("Etudiant", etudiantSchema);

mongoose
  .connect(
    "mongodb+srv://ayakandoussi:sesame@parascolaire.bzzso.mongodb.net/GestionPara?retryWrites=true&w=majority&appName=parascolaire",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("Connexion à la base de données réussie");

    // Créer un nouvel étudiant
    for (i = 2; i < 10; i++) {
      const etudiant = new Etudiant({
        nom: "zaki" + i,
        prenom: "zaki" + i,
        email: "zaki" + i + "@enim.ac.ma",
        motDePasse: "zaki" + i, // Le mot de passe non-haché
        pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      });
    

    // Sauvegarder l'étudiant dans la base de données
    await etudiant.save();
    console.log("Nouvel étudiant créé avec succès :", etudiant);
    }
    // Fermer la connexion après l'insertion
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données:", err);
  });
