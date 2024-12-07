const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middlewares/auth"); // Middleware pour vérifier le token
const Etudiant = require("../models/Etudiant"); // Modèle Etudiant
const bcrypt = require('bcrypt');
const upload = multer({ dest: 'uploads/' });
const jwt = require('jsonwebtoken');


// Configuration de multer pour gérer les téléchargements de fichiers (photo de profil)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où les photos seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nom de fichier unique
  },
});



// Route GET /api/profil - Afficher les informations de l'étudiant
router.get("/profil", authMiddleware, async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.user.id); // ID obtenu depuis le token
    if (etudiant) {
      res.status(200).json({
        nom: etudiant.nom,
        prenom: etudiant.prenom,
        email: etudiant.email,
        profilePic: etudiant.profilePic, // Photo de profil
      });
    } else {
      res.status(404).json({ message: "Étudiant non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Route POST /api/profil/upload - Télécharger la photo de profil
router.post(
  "/upload",
  authMiddleware,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Aucun fichier téléchargé." });
      }

      const etudiant = await Etudiant.findById(req.user.id); // ID obtenu depuis le token
      if (!etudiant) {
        return res.status(404).json({ message: "Étudiant non trouvé." });
      }

      // Mettre à jour la photo de profil dans la base de données
      etudiant.profilePic = req.file.filename;
      await etudiant.save();

      res.status(200).json({
        message: "Photo de profil mise à jour avec succès.",
        profilePic: req.file.filename, // Nouveau nom du fichier de la photo
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur serveur lors de la mise à jour de la photo.",
      });
    }
  }
);

// Route POST /api/profil - Modifier les informations du profil (comme le mot de passe)
router.post("/profil", authMiddleware, async (req, res) => {
  const { motDePasse, nouveauMotDePasse } = req.body;

  try {
    const etudiant = await Etudiant.findById(req.user.id); // ID obtenu depuis le token
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant non trouvé." });
    }

    // Modifier le mot de passe si un nouveau mot de passe est fourni
    if (nouveauMotDePasse && motDePasse) {
      console.log("Étudiant trouvé:", etudiant);

      const isMatch = await bcrypt.compare(motDePasse, etudiant.motDePasse); // Compare l'ancien mot de passe avec celui de la base de données
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Le mot de passe actuel est incorrect." });
      }
      const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10); // Le chiffre "10" est le nombre de "salts" (pour augmenter la sécurité)
      etudiant.motDePasse = hashedPassword; // Met à jour le mot de passe avec le hachage
    }

    await etudiant.save();
    res.status(200).json({ message: "Profil mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la mise à jour du profil.", error: error.message });
  }
});

module.exports = router;
