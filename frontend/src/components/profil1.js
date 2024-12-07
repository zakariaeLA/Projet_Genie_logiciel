
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/prof.css";

const Profile = () => {
    const [userData, setUserData] = useState({
      nom: "",
      prenom: "",
      email: "",
      profilePic: "",
      motDePasse: "",
      nouveauMotDePasse: "",
    });
    const [image, setImage] = useState(null);
  
    // Utiliser useEffect pour charger les informations du profil de l'étudiant
    useEffect(() => {
      const token = localStorage.getItem("token"); // Assure-toi d'avoir le token stocké
      axios
        .get("http://localhost:5000/api/profil", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData({
            ...userData,
            nom: response.data.nom,
            prenom: response.data.prenom,
            email: response.data.email,
            profilePic: response.data.profilePic,
          });
        })
        .catch((error) => {
          console.error("Erreur lors du chargement du profil", error);
        });
    }, []);
  
    // Gérer la mise à jour de la photo de profil
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
  
    const handleSubmitProfilePic = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("profilePic", image);
  
      const token = localStorage.getItem("token"); // Récupérer le token
  
      axios
        .post("http://localhost:5000/api/profil/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert("Photo de profil mise à jour");
          setUserData({ ...userData, profilePic: response.data.profilePic });
        })
        .catch((error) => {
          console.error("Erreur lors du téléchargement de l'image", error);
        });
    };
  
    // Gérer la mise à jour du mot de passe
    const handleChangePassword = (e) => {
      e.preventDefault();
  
      const { motDePasse, nouveauMotDePasse } = userData;
      const token = localStorage.getItem("token");
  
      axios
        .post(
          "http://localhost:5000/api/profil",
          { motDePasse, nouveauMotDePasse },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          alert("Mot de passe mis à jour");
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour du mot de passe", error);
        });
    };
  
    // Gérer la modification des champs
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    };
  
    return (
      <div className="container">
        <h2>Profil de l'étudiant</h2>
  
        {/* Section de téléchargement de la photo */}
        <form className="file-upload-section" onSubmit={handleSubmitProfilePic}>
          <h3>Mettre à jour la photo de profil</h3>
          <input type="file" name="profilePic" onChange={handleImageChange} />
          <button type="submit">Mettre à jour la photo de profil</button>
        </form>
  
        {/* Affichage de la photo de profil actuelle */}
        {userData.profilePic && (
          <div>
            <h3>Photo actuelle :</h3>
            <img
              src={`http://localhost:5000/uploads/${userData.profilePic}`}
              alt="Profile"
              width="100"
              height="100"
            />
          </div>
        )}
  
        {/* Formulaire pour modifier le mot de passe */}
        <form onSubmit={handleChangePassword}>
          <h3>Modifier le mot de passe</h3>
          <label>Ancien mot de passe</label>
          <input
            type="password"
            name="motDePasse"
            value={userData.motDePasse}
            onChange={handleChange}
            required
          />
          <br />
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            name="nouveauMotDePasse"
            value={userData.nouveauMotDePasse}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Mettre à jour le mot de passe</button>
        </form>
  
        {/* Affichage des informations de l'étudiant */}
        <div className="information">
          <h3>Informations de l'étudiant</h3>
          <p>Nom: {userData.nom}</p>
          <p>Prénom: {userData.prenom}</p>
          <p>Email: {userData.email}</p>
        </div>
      </div>
    );
  };
  
  export default Profile;