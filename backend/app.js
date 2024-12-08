const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventsRouter = require('./routes/creation et obtention');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Pour parser les requêtes JSON

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/gestion_parascolaire', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
app.use('/api/events', eventsRouter);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
const adminRouter = require('./routes/admin'); // Assurez-vous que le chemin est correct

app.use('/api/admin', adminRouter); // Préfixer les routes d'administration