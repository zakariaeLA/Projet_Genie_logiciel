const express = require("express");
const router = express.Router();
const profilController = require("../controllers/profilController");
const authMiddleware = require("../middlewares/auth"); // Assurez-vous d'importer le middleware
const upload = require("../middlewares/upload"); // Middleware Multer

// Route GET pour afficher le profil (protégée par authentification)
router.get("/profil", authMiddleware, profilController.afficherProfil);

// Route PUT pour mettre à jour le mot de passe (protégée par authentification)
router.put("/profil/updatePassword", authMiddleware, profilController.mettreAJourMotDePasse);

router.put(
    "/profil/upload",
    authMiddleware, // Vérifie l'authentification
    upload.single("photo"), // Accepte un fichier sous le champ "photo"
    profilController.modifierPhotoDeProfil
  );
  

module.exports = router;