const multer = require("multer");

// Définir le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où enregistrer les fichiers
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtre pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Fichier non pris en charge : uniquement des images."), false);
  }
};

// Middleware Multer
const upload = multer({ storage, fileFilter });

module.exports = upload;