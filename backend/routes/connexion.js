const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Pour générer un token JWT

const router = express.Router();

// Route de connexion
router.post('/connexion', async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    // Ici, tu peux vérifier les données d'un utilisateur fictif
    const utilisateur = { email: 'user@example.com', motDePasse: '$2b$10$APeq5Aik4.hAKpq.Iemb4Ob.MyGCHiq5c1f/4ZT116o5u0agCEMuO' }; // Remplace avec une vraie logique

    // Vérification de l'email (tu pourrais faire une recherche dans la base de données)
    if (email !== utilisateur.email) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification du mot de passe
    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { email: utilisateur.email },
      'secret',  // Clé secrète
      { expiresIn: '1h' }  // Durée de validité du token
    );

    return res.status(200).json({ token, message: 'Connexion réussie.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur.', error });
  }
});

module.exports = router;
