import React, { useState, useEffect } from 'react';
import './eventHistory.css';

export default function EventHistory() {
  // State to store the events fetched from the API
  const [items, setEvents] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (!token) {
      setError('Utilisateur non authentifié.');
      return;
    }

    fetch('http://localhost:8000/api/etudiants/evenements', {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des événements.');
        }
        return response.json();
      })
      .then((data) => setEvents(data.evenementsParticipes || []))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="EventHistory_container">
      {items.length > 0 ? (
        items.map((item) => (
          <div className="img-container" key={item.id}>
            <img 
              src={`http://localhost:8000${item.image}`} 
              alt={`Image ${item.id}`} 
            />
            <div className="description">{item.titre} - {item.date} <br /> {item.description}</div>
          </div>
        ))
      ) : (
        <p>Aucun événement historique disponible.</p>
      )}
    </div>
  );
}


