import React, { useState } from "react";
import axios from "axios";
import "../styles/connexion.css";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/connexion", {
        email,
        motDePasse,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setMessage("Connexion réussie !");
        console.log("Token reçu :", response.data.token);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.response?.data);
      setMessage(error.response?.data?.message || "Une erreur est survenue.");
      setEmail("");
      setMotDePasse("");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="password-field">
                <label>Mot de passe :</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "🙊" : "🙈"}
                  </span>
                </div>
              </div>
              <button type="submit">Se connecter</button>
            </form>
            {message && <p className="error-message">{message}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Connexion;
