// Route pour supprimer un événement
router.delete('/:id', async (req, res) => {
    try {
        const evenement = await Evenement.findByIdAndDelete(req.params.id);

        if (!evenement) {
            return res.status(404).send({ message: 'Événement non trouvé' });
        }

        res.send({ message: 'Événement supprimé avec succès' });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la suppression de l\'événement', error });
    }
});