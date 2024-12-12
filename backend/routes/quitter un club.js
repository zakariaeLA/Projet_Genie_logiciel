// Route pour quitter un club
router.post('/:id/quitter', authMiddleware, async (req, res) => {
    const etudiantId = req.user.id; // Récupérer l'ID de l'étudiant depuis le token

    try {
        const club = await Club.findById(req.params.id);
        if (!club) {
            return res.status(404).send({ message: 'Club non trouvé' });
        }

        // Vérifiez si l'étudiant est membre du club
        if (club.membres.includes(etudiantId)) {
            // Retirer l'étudiant de la liste des membres
            club.membres = club.membres.filter(member => member.toString() !== etudiantId);
            await club.save();
            return res.status(200).send({ message: 'Vous avez quitté le club', club });
        } else {
            return res.status(400).send({ message: 'Vous n\'êtes pas membre de ce club' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de la sortie du club', error });
    }
});
