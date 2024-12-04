const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const Etudiant = require("../models/Etudiant"); // Assurez-vous que ce chemin est correct
const multer = require("multer");
const bcrypt = require("bcrypt");

// Configuration de multer pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route : Afficher les informations du profil
router.get("/", authMiddleware, async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.user.id);
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant introuvable." });
    }

    res.status(200).json({
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
      profilePic: etudiant.profilePic || null, // Photo de profil (null si non définie)
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
});

// Route : Modifier la photo de profil
router.post("/uploads", authMiddleware, upload.single("profilePic"), async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.user.id);
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant introuvable." });
    }

    etudiant.profilePic = req.file.path; // Chemin de la nouvelle photo
    await etudiant.save();

    res.status(200).json({ message: "Photo de profil mise à jour.", profilePic: etudiant.profilePic });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
});

// Route : Modifier le mot de passe
router.post("/motdepasse", authMiddleware, async (req, res) => {
  const { motDePasseActuel, nouveauMotDePasse } = req.body;

  try {
    const etudiant = await Etudiant.findById(req.user.id);
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant introuvable." });
    }

    // Vérifier le mot de passe actuel
    const isMatch = await bcrypt.compare(motDePasseActuel, etudiant.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe actuel incorrect." });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);
    etudiant.motDePasse = hashedPassword;
    await etudiant.save();

    res.status(200).json({ message: "Mot de passe mis à jour." });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
});

module.exports = router;
