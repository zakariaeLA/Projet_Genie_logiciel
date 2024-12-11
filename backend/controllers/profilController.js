const Etudiant = require("../models/Etudiant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../middlewares/upload"); // Importer Multer

// Afficher le profil
exports.afficherProfil = async (req, res) => {
  try {
    // Utilisation de req.user.id provenant du middleware auth
    const etudiant = await Etudiant.findById(req.user.id);
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant non trouvé." });
    }
    res.status(200).json(etudiant);
  } catch (error) {
    console.error("Erreur lors du chargement du profil :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Mettre à jour le mot de passe
exports.mettreAJourMotDePasse = async (req, res) => {
  const { motDePasseActuel, nouveauMotDePasse } = req.body;

  try {
    // Utilisation de req.user.id pour obtenir l'ID de l'utilisateur depuis le token JWT
    const etudiant = await Etudiant.findById(req.user.id);
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant non trouvé." });
    }

    // Comparaison du mot de passe actuel avec le mot de passe haché stocké dans la base de données
    const isMatch = await bcrypt.compare(motDePasseActuel, etudiant.motDePasse);

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    // Mise à jour du mot de passe dans la base de données
    etudiant.motDePasse = nouveauMotDePasse;
    await etudiant.save();
    res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
  }
};

// Mettre à jour ou initialiser la photo de profil
exports.modifierPhotoDeProfil = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.user.id);
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant non trouvé." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Aucune image fournie." });
    }

    // Mettre à jour la photo de profil avec le chemin du fichier
    etudiant.profilePic = req.file.path;
    await etudiant.save();

    res.status(200).json({
      message: "Photo de profil mise à jour avec succès.",
      profilePic: etudiant.profilePic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour de la photo de profil.",
    });
  }
};