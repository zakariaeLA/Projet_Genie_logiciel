const express = require('express');
const Etudiant = require('../models/Etudiant'); // Modèle Etudiant
const Evenement = require('../models/Evenement'); // Modèle Etudiant
const Club = require('../models/Club');
const router = express.Router();

// Récupérer les clubs participés et les autres clubs
router.get('/:id/clubs', async (req, res) => {

  try {
    const etudiant = await Etudiant.findById(req.params.id)
      .select('clubs') // Sélectionner uniquement les clubs de l'étudiant
      .populate({
        path: 'clubs',
        select: 'nom filtre image', // Sélectionner uniquement les champs nécessaires
      });

    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    // Récupérer tous les clubs disponibles
    const allClubs = await Club.find();

    // Séparer les clubs auxquels l'étudiant participe et les autres clubs
    const mesClubs = etudiant.clubs;
    const autresClubs = allClubs.filter(
      (club) => !mesClubs.some((etudiantClub) => etudiantClub._id.equals(club._id))
    );

    // Retourner une seule réponse avec les deux sections
    const clubsData = {
      mesClubs: mesClubs.map((club) => ({
        image: club.image ? `/imagesClubs/${club.image}` : null,
        nom: club.nom,
        filtre: club.filtre,
        id: club.id,
        description: club.description,
        
      })),
      autresClubs: autresClubs.map((club) => ({
        image: club.image ? `/imagesClubs/${club.image}` : null,
        nom: club.nom,
        filtre: club.filtre,
        id: club.id,
        description: club.description,
        
      })),
    };

    // Envoyer la réponse finale
    res.json(clubsData);
  } catch (error) {
    console.error('Erreur lors de la récupération des clubs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Rechercher des clubs par nom et/ou filtre
router.get('/:id/clubs/recherche', async (req, res) => {
  try {
    const { nom, filtre } = req.query; // Récupère les paramètres de recherche et de filtrage

    // Rechercher les clubs dans la base de données
    const query = {}; // Créons une requête vide pour MongoDB

    // Ajouter la recherche par nom si un nom est fourni
    if (nom) {
      query.nom = { $regex: new RegExp(nom, 'i') }; // Recherche insensible à la casse
    }

    // Ajouter le filtre si un filtre est fourni
    if (filtre) {
      query.filtre = { $regex: new RegExp(filtre, 'i') }; // Recherche insensible à la casse
    }

    // Effectuer la recherche
    const clubs = await Club.find(query).select('nom filtre image');

    // Vérifier si des clubs ont été trouvés
    if (clubs.length === 0) {
      return res.status(404).json({ message: 'Aucun club trouvé pour les critères spécifiés.' });
    }

    // Retourner les clubs trouvés
    const resultats = clubs.map((club) => ({
      image: club.image ? `/imagesClubs/${club.image}` : null,
      nom: club.nom,
      filtre: club.filtre,
    }));

    res.json(resultats);
  } catch (error) {
    console.error('Erreur lors de la recherche des clubs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find()
    res.json(clubs);
  } catch (error) {
    console.error('Erreur lors de la recherche des clubs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// Route pour rejoindre un club
router.post('/:id/rejoindre', async (req, res) => {
  const etudiantId = req.user.id; // Récupérer l'ID de l'étudiant depuis le token

  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).send({ message: 'Club non trouvé' });
    }
    // Vérifiez si l'étudiant est déjà membre du club
    if (!club.membres.includes(etudiantId)) {
      // club.membres.push(etudiantId); // Ajoutez l'étudiant à la liste des membres
      // await club.save();
      // await Etudiant.findByIdAndUpdate(etudiantId, { $addToSet: { clubs: club._id } });

      return res.status(200).send({ message: 'Inscription au club réussie', club });
    } else {
      return res.status(400).send({ message: 'Vous êtes déjà membre de ce club' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erreur lors de l\'inscription au club', error });
  }
});

// Route pour quitter un club
router.post('/:id/quitter', async (req, res) => {
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

      // Retirer le club de la liste des clubs de l'étudiant
      await Etudiant.findByIdAndUpdate(etudiantId, { $pull: { clubs: club._id } });

      return res.status(200).send({ message: 'Vous avez quitté le club', club });
    } else {
      return res.status(400).send({ message: 'Vous n\'êtes pas membre de ce club' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erreur lors de la sortie du club', error });
  }
});

// Route pour obtenir les événements d'un club
router.get('/:id/evenements', async (req, res) => {
  try {
    const events = await Evenement.find({ club: req.params.id });
    if (!events.length) {
      return res.status(404).send({ message: 'Aucun événement trouvé pour ce club' });
    }
    res.status(200).send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erreur lors de la récupération des événements', error });
  }
});


module.exports = router;