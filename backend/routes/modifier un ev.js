// Route pour mettre à jour un événement
router.put('/:id', async (req, res) => {
    const { titre, description, date, lieu, image, club } = req.body;

    try {
        const evenement = await Evenement.findByIdAndUpdate(req.params.id, {
            titre,
            description,
            date,
            lieu,
            image,
            club
        }, { new: true }); // Retourner le document mis à jour

        if (!evenement) {
            return res.status(404).send({ message: 'Événement non trouvé' });
        }

        res.send({ message: 'Événement mis à jour', event: evenement });
    } catch (error) {
        res.status(400).send({ message: 'Erreur lors de la mise à jour de l\'événement', error });
    }
});