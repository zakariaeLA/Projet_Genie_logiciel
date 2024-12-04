const express = require('express');
const Etudiant = require('../models/Etudiant'); // Modèle Etudiant
const Evenement = require('../models/Evenement');
const path = require('path');
const router = express.Router();

// Récupérer uniquement les événements participés et à venir d’un étudiant
router.get('/:id/evenements', async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id)
      .select('evenementsParticipes evenementsAVenir') // Sélectionner uniquement les champs des événements
      .populate({
        path: 'evenementsParticipes',
        select: 'description image', // Sélectionner uniquement les champs nécessaires
      })
      .populate({
        path: 'evenementsAVenir',
        select: 'description image', // Sélectionner uniquement les champs nécessaires
      });

    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    res.json({
      evenementsParticipes: etudiant.evenementsParticipes.map((event) => ({
        image: event.image ? `/images/${event.image}` : null, // URL de l'image
        description: event.description,
      })),
      evenementsAVenir: etudiant.evenementsAVenir.map((event) => ({
        image: event.image ? `/images/${event.image}` : null, // URL de l'image
        description: event.description,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des événements.', error: error.message });
  }
});

module.exports = router;
