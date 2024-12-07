import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/profil.css";

const Profil = () => {
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    email: "",
    profilePic: "",
  });
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [motDePasseActuel, setMotDePasseActuel] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false); // État pour afficher/masquer le formulaire de changement de mot de passe

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/profil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
        setMessage("Impossible de charger les informations du profil.");
      }
    };
    fetchData();
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/profil/updatePassword",
        {
          motDePasseActuel,
          nouveauMotDePasse,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setIsPasswordChangeVisible(false); // Fermer le formulaire après mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      setMessage("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage("Veuillez sélectionner un fichier à téléverser.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/profil/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserData((prevData) => ({
        ...prevData,
        profilePic: response.data.profilePic,
      }));
      setMessage(response.data.message);
    } catch (error) {
      console.error("Erreur lors du téléversement de l'image:", error);
      setMessage("Erreur lors du téléversement de l'image.");
    }
  };

  return (
    <div className="profil-container">
      <h1>Mon Profil</h1>

      {/* Affichage de la photo de profil */}
      <div className="profile-pic-container">
        {userData.profilePic ? (
          <img
            src={`http://localhost:5000/uploads/${userData.profilePic}`}
            alt="Profil"
            className="profile-pic"
          />
        ) : (
          <img
            src="/default-profile.png"
            alt="Default Profil"
            className="profile-pic"
          />
        )}
        <label htmlFor="fileInput" className="change-photo-label">
          <span>✏️</span> Changer
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </div>

      {message && <p className="message">{message}</p>}

     

      {/* Informations du profil */}
      <div>
        <label>Nom:</label>
        <input type="text" value={userData.nom} disabled />
      </div>
      <div>
        <label>Prénom:</label>
        <input type="text" value={userData.prenom} disabled />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={userData.email} disabled />
      </div>

      {/* Bouton pour afficher/masquer le formulaire de changement de mot de passe */}
      <button onClick={() => setIsPasswordChangeVisible(!isPasswordChangeVisible)}>
        Modifier le mot de passe
      </button>

      {/* Formulaire de modification du mot de passe */}
      {isPasswordChangeVisible && (
        <form onSubmit={handleUpdatePassword}>
          <div>
            <label>Mot de passe actuel:</label>
            <input
              type="password"
              placeholder="Mot de passe actuel"
              value={motDePasseActuel}
              onChange={(e) => setMotDePasseActuel(e.target.value)}
            />
          </div>
          <div>
            <label>Nouveau mot de passe:</label>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={nouveauMotDePasse}
              onChange={(e) => setNouveauMotDePasse(e.target.value)}
            />
          </div>
          <button type="submit">Mettre à jour le mot de passe</button>
        </form>
      )}

    </div>
  );
};

export default Profil;
