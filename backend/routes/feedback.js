

const express = require('express');
const router = express.Router();
const Evenement = require('../models/Evenement'); // Assurez-vous que cela pointe vers le bon modèle

// Route pour ajouter un feedback à un événement
router.post('/:id/feedback', async (req, res) => {
    const { feedback } = req.body;

    try {
        // Utilisez le modèle Evenement pour trouver l'événement par ID
        const evenement = await Evenement.findById(req.params.id);
        
        if (!evenement) {
            return res.status(404).send({ message: 'Événement non trouvé' });
        }

        // Vous pouvez également stocker le feedback dans un tableau dans le modèle
        // Par exemple : evenement.feedback.push(feedback);
        // await evenement.save(); // Enregistrer les modifications

        // Pour cet exemple, nous allons juste retourner le feedback
        res.send({ message: 'Feedback reçu', feedback });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de l\'ajout du feedback', error });
    }
});

module.exports = router;