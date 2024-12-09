const mongoose = require('mongoose');

const schemaclub = new mongoose.Schema({
  nom: { type: String, required: true, unique: true }, // Nom du club
  filtre: [{ type: String }], // Filtre pour les clubs
  description: { type: String, required: true, minlength: 10 }, // Description du club
  image: { type: String, required: true },
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }], // Liste des membres du club
  responsables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }], // Responsables du club
  statut: { type: String, enum: ['en attente', 'approuvé', 'refusé'], default: 'en attente' },
});

// Exporter le modèle Club
module.exports = mongoose.model('Club', schemaclub);
 
