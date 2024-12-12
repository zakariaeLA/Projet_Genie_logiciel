const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    contenu: { type: String, required: true },
    auteurId: { type: Schema.Types.ObjectId, ref: 'Etudiant', required: true }, // Référence à l'étudiant qui a envoyé le message
    clubId: { type: Schema.Types.ObjectId, ref: 'Club', required: true }, // Référence au club associé au message
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
