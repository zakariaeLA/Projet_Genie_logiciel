const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connexionRoute = require('./routes/connexion');

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Middleware pour parser les requêtes JSON

// Utilisation de la route de connexion
app.use('/api', connexionRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
