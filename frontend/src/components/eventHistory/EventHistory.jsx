import React, { useState, useEffect } from 'react';
import './eventHistory.css';

export default function EventHistory() {
  // State to store the items fetched from the API
  const [items, setEvents] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:8000/api/etudiants/67508266533eb41d8194ded0/evenements')
      .then((response) => response.json())
      .then((data) => setEvents(data.evenementsParticipes)) // Extract 'evenementsParticipes'
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className="EventHistory_container">
      {items.map((item) => (
        <div className="img-container" key={item.id}>
          <img src={`http://localhost:8000/imagesEvenement/histo5.jpeg${item.imageurl}`} alt={`Image ${item.id}`} />
          <div className="description">{item.titre} - {item.date} <br /> {item.description}</div>
        </div>
      ))}
    </div>
  );
}
