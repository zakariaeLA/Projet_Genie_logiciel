import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // Charger les données du profil
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assurez-vous que le token est stocké
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

  // Mettre à jour le mot de passe
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/profil/updatePassword", // Utiliser PUT pour la mise à jour
        {
          motDePasseActuel,
          nouveauMotDePasse,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      setMessage("Erreur lors de la mise à jour du mot de passe.");
    }
  };

  // Téléverser la photo de profil
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
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleUpdateProfile}>
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

      <form onSubmit={handleFileUpload}>
        <div>
          <label>Photo de profil:</label>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>
        {userData.profilePic && (
          <img
            src={`/uploads/${userData.profilePic}`}
            alt="Profil"
            className="profile-pic"
          />
        )}
        <button type="submit">Téléverser une nouvelle photo</button>
      </form>
    </div>
  );
};

export default Profil;
