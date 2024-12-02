const express = require('express');
const router = express.Router();
const Evenement = require('../models/Evenement'); // Importer le modèle

// Route pour créer un événement
router.post('/', async (req, res) => {
    const { title, date, description } = req.body;
    const nouvelEvenement = new Evenement({ title, date, description });

    try {
        await nouvelEvenement.save(); // Sauvegarder l'événement dans la base de données
        res.status(201).send({ message: 'Événement créé', event: nouvelEvenement });
    } catch (error) {
        res.status(400).send({ message: 'Erreur lors de la création de l\'événement', error });
    }
});

// Route pour obtenir tous les événements
router.get('/', async (req, res) => {
    try {
        const evenements = await Evenement.find(); // Récupérer tous les événements
        res.send(evenements);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la récupération des événements', error });
    }
});

module.exports = router;