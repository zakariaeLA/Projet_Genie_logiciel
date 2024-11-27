const express = require("express");
const mongoose = require("mongoose");
//const Etudiant = require("./models/Etudiant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Pour créer des tokens

const app = express();
app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const etudiant = await Etudiant.findOne({ email });
    if (!etudiant) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const motDePasseValide = await bcrypt.compare(
      motDePasse,
      etudiant.motDePasse
    );
    if (!motDePasseValide) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: etudiant._id, email: etudiant.email },
      "secret", // Clé secrète
      { expiresIn: "1h" } // Durée de validité
    );

    res.status(200).json({ token, message: "Connexion réussie." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error });
  }
});

// Lancer le serveur pour Test seulement
const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Serveur démarré sur le port http://localhost:5000/ `)
);

app.get("/", (req, res) => {
  res.send(" Login route Working :-) ");
});
