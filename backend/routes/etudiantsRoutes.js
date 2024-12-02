const express = require('express');
const Etudiant = require('../models/Etudiant'); // Modèle Etudiant
const router = express.Router();

// Récupérer uniquement les événements participés et à venir d’un étudiant
router.get('/:id/evenements', async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id)
      .select('evenementsParticipes evenementsAVenir') // Sélectionner uniquement les champs des événements
      .populate({
        path: 'evenementsParticipes',
        select: 'titre description date', // Sélectionner uniquement les champs nécessaires
      })
      .populate({
        path: 'evenementsAVenir',
        select: 'titre description date', // Sélectionner uniquement les champs nécessaires
      });

    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    res.status(200).json({
      evenementsParticipes: etudiant.evenementsParticipes,
      evenementsAVenir: etudiant.evenementsAVenir,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des événements.',
      error: error.message,
    });
  }
});

module.exports = router;
