const express = require('express');
const Evenement = require('../models/Evenement'); // Assurez-vous que le chemin est correct
const router = express.Router();

// Route pour s'inscrire à un événement
router.post('/:id/participer', async (req, res) => {
    const { etudiantId } = req.body; // Assurez-vous que l'ID de l'étudiant est envoyé dans le corps de la requête

    try {
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