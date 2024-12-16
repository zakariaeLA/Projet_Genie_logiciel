const mongoose = require('mongoose');

const formulaireSchema = new mongoose.Schema({
    idEtudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant', required: true },
    idClub: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
    niveau_etude: { type: String, required: true },
    motivation: { type: String, required: true },
    dateSoumission: { type: Date, default: Date.now },
    etat: { type: String, enum: ['En attente', 'Acceptée', 'Refusée'], default: 'En attente' }
});

module.exports = mongoose.model('Formulaire', formulaireSchema);