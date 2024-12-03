import React, { useState, useEffect } from 'react';
import './upcomingEvents.css';

export default function UpcomingEvents() {
  // State to store the items fetched from the API
  const [items, setItems] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:8000/api/evenmentAVenir')
      .then((response) => response.json())
      .then((data) => setItems(data))  // Store the fetched data
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className="UpcomingEvents_container">
      {items.map((item) => (
        <div className="img-container" key={item.id}>
          <img src={`http://localhost:8000/api/images/${item.imageurl}`} alt={`Image ${item.id}`} />
          <div className="description">{item.titre} - {item.date} <br /> {item.description}</div>
        </div>
      ))}
    </div>
  );
}
