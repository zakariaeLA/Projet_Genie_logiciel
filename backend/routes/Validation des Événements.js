const Evenement = require('../models/Evenement');

// Route pour approuver un événement
router.put('/evenements/:id/approve', async (req, res) => {
    try {
        const evenement = await Evenement.findByIdAndUpdate(req.params.id, { statut: 'approuvé' }, { new: true });
        if (!evenement) {
            return res.status(404).send({ message: 'Événement non trouvé' });
        }
        res.send({ message: 'Événement approuvé', evenement });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de l\'approbation de l\'événement', error });
    }
});

// Route pour refuser un événement
router.put('/evenements/:id/reject', async (req, res) => {
    try {
        const evenement = await Evenement.findByIdAndUpdate(req.params.id, { statut: 'refusé' }, { new: true });
        if (!evenement) {
            return res.status(404).send({ message: 'Événement non trouvé' });
        }
        res.send({ message: 'Événement refusé', evenement });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors du refus de l\'événement', error });
    }
});