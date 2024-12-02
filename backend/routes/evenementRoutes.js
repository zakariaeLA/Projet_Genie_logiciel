const express = require('express');
const Evenement = require('../models/Evenement'); // Modèle Evenement
const router = express.Router();

// Récupérer les détails d’un événement spécifique
router.get('/:id', async (req, res) => {
  try {
    const evenement = await Evenement.findById(req.params.id)
      .populate({ path: 'club', select: 'nom' }) // Inclure les informations du club
      .populate({ path: 'participants', select: 'nom prenom' }); // Inclure les informations des participants

    if (!evenement) {
      return res.status(404).json({ message: 'Événement non trouvé.' });
    }

    res.status(200).json(evenement);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération de l\'événement.',
      error: error.message,
    });
  }
});

module.exports = router;

