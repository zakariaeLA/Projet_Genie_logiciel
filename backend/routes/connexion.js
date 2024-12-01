const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const router = express.Router();

// Route de connexion
router.post('/connexion', async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    // Au lieu de la base de donnees
    const etudiant = { email: 'user@example.com', motDePasse: '$2b$10$APeq5Aik4.hAKpq.Iemb4Ob.MyGCHiq5c1f/4ZT116o5u0agCEMuO' }; // Remplace avec une vraie logique

    if (email !== etudiant.email) {
      return res.status(404).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Vérification du mot de passe
    const motDePasseValide = await bcrypt.compare(motDePasse, etudiant.motDePasse);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { email: etudiant.email },
      'secret', 
      { expiresIn: '1h' }  
    );

    return res.status(200).json({ token, message: 'Connexion réussie.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur.', error });
  }
});

module.exports = router;
