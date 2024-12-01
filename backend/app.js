const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Importer les routes des événements
const eventRoutes = require('./routes/events');

// Utiliser les routes pour les événements
app.use('/api/events', eventRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});