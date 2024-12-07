const Etudiant = require('../models/Etudiant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
      console.log("Utilisateur trouvé : ", etudiant.nom); // Log pour vérifier l'utilisateur récupéré
  
      // Comparaison du mot de passe actuel avec le mot de passe haché stocké dans la base de données
      const isMatch = await bcrypt.compare(motDePasseActuel, etudiant.motDePasse);
      console.log("Mot de passe actuel correspond :", isMatch); // Log pour vérifier si les mots de passe correspondent

      if (!isMatch) {
        return res.status(400).json({ message: "Mot de passe incorrect." });
      }
  
      // Hachage du nouveau mot de passe avant de le sauvegarder
      const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);
      console.log("Nouveau mot de passe haché :", hashedPassword); // Log pour vérifier le mot de passe haché
  
      // Mise à jour du mot de passe dans la base de données
      etudiant.motDePasse = hashedPassword;
      await etudiant.save();

      console.log("Mot de passe mis à jour avec succès.");
      res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
    }
  };

// Uploader une photo de profil
exports.mettreAJourPhotoProfil = async (req, res) => {
  try {
    // Utilisation de req.user.id
    const etudiant = await Etudiant.findById(req.user.id);
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant non trouvé." });
    }

    etudiant.profilePic = req.file.filename;
    await etudiant.save();
    res.status(200).json({ message: "Photo de profil mise à jour." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};
