const express = require("express");
const mongoose = require("mongoose");
const Forum = require("./models/forum"); // Assurez-vous que le modèle est correct
const router = express.Router();

// Route pour créer une nouvelle publication
router.post("/publications", async (req, res) => {
  try {
    const { sujet, contenu, etudiant } = req.body;
    const nouvellePublication = new Forum({
      sujet,
      contenu,
      etudiant,
    });
    await nouvellePublication.save();
    res.status(201).json(nouvellePublication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour obtenir toutes les publications
router.get("/publications", async (req, res) => {
  try {
    const publications = await Forum.find().populate("etudiant", "nom").populate({
      path: "commentaires.etudiant",
      select: "nom"
    }).populate({
      path: "reactions.etudiant",
      select: "nom"
    });
    res.status(200).json(publications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour obtenir une publication spécifique par ID
router.get("/publications/:id", async (req, res) => {
  try {
    const publication = await Forum.findById(req.params.id).populate("etudiant", "nom").populate({
      path: "commentaires.etudiant",
      select: "nom"
    }).populate({
      path: "reactions.etudiant",
      select: "nom"
    });
    if (!publication) return res.status(404).json({ message: "Publication non trouvée" });
    res.status(200).json(publication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour ajouter un commentaire à une publication
router.post("/publications/:id/commentaires", async (req, res) => {
  try {
    const { texte, etudiant } = req.body;
    const publication = await Forum.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: "Publication non trouvée" });

    publication.commentaires.push({ texte, etudiant });
    await publication.save();
    res.status(201).json(publication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour ajouter une réaction (like/dislike) à une publication
router.post("/publications/:id/reactions", async (req, res) => {
  try {
    const { type, etudiant } = req.body;
    if (!["like", "dislike"].includes(type)) {
      return res.status(400).json({ message: "Type de réaction invalide" });
    }

    const publication = await Forum.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: "Publication non trouvée" });

    publication.reactions.push({ type, etudiant });
    await publication.save();
    res.status(201).json(publication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour supprimer un commentaire
router.delete("/publications/:publicationId/commentaires/:commentId", async (req, res) => {
  try {
    const publication = await Forum.findById(req.params.publicationId);
    if (!publication) return res.status(404).json({ message: "Publication non trouvée" });

    const commentaireIndex = publication.commentaires.findIndex(c => c._id.toString() === req.params.commentId);
    if (commentaireIndex === -1) return res.status(404).json({ message: "Commentaire non trouvé" });

    publication.commentaires.splice(commentaireIndex, 1);
    await publication.save();
    res.status(200).json(publication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour supprimer une réaction
router.delete("/publications/:publicationId/reactions/:reactionId", async (req, res) => {
  try {
    const publication = await Forum.findById(req.params.publicationId);
    if (!publication) return res.status(404).json({ message: "Publication non trouvée" });

    const reactionIndex = publication.reactions.findIndex(r => r._id.toString() === req.params.reactionId);
    if (reactionIndex === -1) return res.status(404).json({ message: "Réaction non trouvée" });

    publication.reactions.splice(reactionIndex, 1);
    await publication.save();
    res.status(200).json(publication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour modifier une publication
router.put("/publications/:id", async (req, res) => {
  try {
    const { sujet, contenu } = req.body;
    const publication = await Forum.findByIdAndUpdate(
      req.params.id,
      { sujet, contenu },
      { new: true }
    );
    if (!publication) return res.status(404).json({ message: "Publication non trouvée" });
    res.status(200).json(publication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
