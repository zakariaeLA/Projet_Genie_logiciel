const express = require('express');
const router = express.Router();
const Evenement = require('../models/Evenement');
const authMiddleware = require("../middlewares/auth");
const Etudiant = require("../models/Etudiant"); // Importer le modèle

// Route pour créer un événement
router.post('/', async (req, res) => {
    const {title, date, description} = req.body;
    const nouvelEvenement = new Evenement({title, date, description});

    try {
        await nouvelEvenement.save(); // Sauvegarder l'événement dans la base de données
        res.status(201).send({message: 'Événement créé', event: nouvelEvenement});
    } catch (error) {
        res.status(400).send({message: 'Erreur lors de la création de l\'événement', error});
    }
});

// Route pour obtenir tous les événements
router.get('/', async (req, res) => {
    try {
        const evenements = await Evenement.find(); // Récupérer tous les événements
        res.send(evenements);
    } catch (error) {
        res.status(500).send({message: 'Erreur lors de la récupération des événements', error});
    }
});

// Route pour mettre à jour un événement
router.put('/:id', async (req, res) => {
    const {titre, description, date, lieu, image, club} = req.body;

    try {
        const evenement = await Evenement.findByIdAndUpdate(req.params.id, {
            titre,
            description,
            date,
            lieu,
            image,
            club
        }, {new: true}); // Retourner le document mis à jour

        if (!evenement) {
            return res.status(404).send({message: 'Événement non trouvé'});
        }

        res.send({message: 'Événement mis à jour', event: evenement});
    } catch (error) {
        res.status(400).send({message: 'Erreur lors de la mise à jour de l\'événement', error});
    }
});
// Route pour s'inscrire à un événement
router.post('/:id/participer', authMiddleware, async (req, res) => {
    try {
        const etudiantId = req.user.id; // Récupérer l'ID de l'étudiant depuis le token

        // Vérifiez si l'étudiant existe
        const etudiant = await Etudiant.findById(etudiantId);
        if (!etudiant) {
            return res.status(404).send({message: 'Étudiant non trouvé'});
        }

        // Récupérer l'événement par ID
        const evenement = await Evenement.findById(req.params.id);
        if (!evenement) {
            return res.status(404).send({message: 'Événement non trouvé'});
        }

        // Vérifiez si l'étudiant est déjà inscrit
        if (!evenement.participants.includes(etudiantId)) {
            evenement.participants.push(etudiantId); // Ajoutez l'étudiant à la liste des participants
            await evenement.save();
            return res.status(200).send({message: 'Inscription réussie', evenement});
        } else {
            return res.status(400).send({message: 'Vous êtes déjà inscrit à cet événement'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Erreur lors de l\'inscription à l\'événement', error});
    }
});


module.exports = router;