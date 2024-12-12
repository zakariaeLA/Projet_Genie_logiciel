const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupérer le token du header

    if (!token) {
        return res.status(403).send({ message: 'Accès non autorisé. Aucun token fourni.' });
    }

    // Vérifier le token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Token invalide' });
        }
        req.user = decoded; // Ajouter les informations décodées à la requête
        next(); // Passer au middleware suivant
    });
};

module.exports = authMiddleware;
