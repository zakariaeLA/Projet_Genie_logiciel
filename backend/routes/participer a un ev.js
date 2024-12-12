const express = require('express');
const Evenement = require('../models/Evenement'); // Assurez-vous que le chemin est correct
const router = express.Router();
const authMiddleware = require('../middlewares/auth'); // Importer le middleware d'authentification
const Etudiant = require('../models/Etudiant');

// Route pour s'inscrire à un événement
router.post('/:id/participer', authMiddleware, async (req, res) => {
    try {
        const etudiantId = req.user.id; // Récupérer l'ID de l'étudiant depuis le token

        // Vérifiez si l'étudiant existe
        const etudiant = await Etudiant.findById(etudiantId);
        if (!etudiant) {
            return res.status(404).send({ message: 'Étudiant non trouvé' });
        }

        // Récupérer l'événement par ID
        const evenement = await Evenement.findById(req.params.id);
        if (!evenement) {
            return res.status(404).send({ message: 'Événement non trouvé' });
        }

        // Vérifiez si l'étudiant est déjà inscrit
        if (!evenement.participants.includes(etudiantId)) {
            evenement.participants.push(etudiantId); // Ajoutez l'étudiant à la liste des participants
            await evenement.save();
            return res.status(200).send({ message: 'Inscription réussie', evenement });
        } else {
            return res.status(400).send({ message: 'Vous êtes déjà inscrit à cet événement' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de l\'inscription à l\'événement', error });
    }
});

module.exports = router;
