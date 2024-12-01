const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true }, // Mot de passe hashé
  profilePic: { type: String, required: true },
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }], // Clubs auxquels l'étudiant est inscrit
  evenementsParticipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evenement' }], // Événements passés
  evenementsAVenir: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evenement' }], // Événements à venir
});

module.exports = mongoose.model('Etudiant', etudiantSchema);

