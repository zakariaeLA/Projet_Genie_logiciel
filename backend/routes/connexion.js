const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");

// Route de connexion
router.post("/connexion", async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    console.log("Email reçu :", email);
    Etudiant.findOne({ email: email });
    console.log("Etudiant trouvé : email");

    if (!etudiant) {
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // Vérification du mot de passe
    const motDePasseValide = await bcrypt.compare(
      motDePasse,
      etudiant.motDePasse
    );
    if (!motDePasseValide) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // Génération du token JWT
    const token = jwt.sign({ email: etudiant.email }, "secret", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, message: "Connexion réussie." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
});

module.exports = router;
