const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// Route pour approuver un club
router.put('/clubs/:id/approve', async (req, res) => {
    try {
        const club = await Club.findByIdAndUpdate(req.params.id, { statut: 'approuvé' }, { new: true });
        if (!club) {
            return res.status(404).send({ message: 'Club non trouvé' });
        }
        res.send({ message: 'Club approuvé', club });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de l\'approbation du club', error });
    }
});

// Route pour refuser un club
router.put('/clubs/:id/reject', async (req, res) => {
    try {
        const club = await Club.findByIdAndUpdate(req.params.id, { statut: 'refusé' }, { new: true });
        if (!club) {
            return res.status(404).send({ message: 'Club non trouvé' });
        }
        res.send({ message: 'Club refusé', club });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors du refus du club', error });
    }
});