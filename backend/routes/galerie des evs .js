// Route pour obtenir les événements d'un club
router.get('/:id/evenements', async (req, res) => {
    try {
        const events = await Evenement.find({ club: req.params.id }); // Supposant que chaque événement a une référence au club
        if (!events.length) {
            return res.status(404).send({ message: 'Aucun événement trouvé pour ce club' });
        }
        res.status(200).send(events);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de la récupération des événements', error });
    }
});
