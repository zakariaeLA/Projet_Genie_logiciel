const express = require('express');
const router = express.Router();

// Route pour créer un événement
router.post('/', (req, res) => {
    const { title, date, description } = req.body;
    // Logique pour sauvegarder l'événement dans la base de données
    res.status(201).send({ message: 'Événement créé', event: { title, date, description } });
});

// Route pour obtenir tous les événements
router.get('/', (req, res) => {
    // Logique pour récupérer les événements depuis la base de données
    res.send([{ title: 'Exemple d\'événement', date: '2024-12-01', description: 'Description de l\'événement' }]);
});

module.exports = router;