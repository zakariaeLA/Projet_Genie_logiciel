const express = require("express");
const router = express.Router();
const profilController = require("../controllers/profilController");
const authMiddleware = require("../middlewares/auth"); // Assurez-vous d'importer le middleware

// Route GET pour afficher le profil (protégée par authentification)
router.get("/profil", authMiddleware, profilController.afficherProfil);

// Route PUT pour mettre à jour le mot de passe (protégée par authentification)
router.put("/profil/updatePassword", authMiddleware, profilController.mettreAJourMotDePasse);

// Route POST pour uploader une photo de profil (protégée par authentification)
router.post("/profil/upload", authMiddleware, profilController.mettreAJourPhotoProfil);


module.exports = router;
