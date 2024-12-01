import React from 'react';
import './upcomingEvents.css';

export default function UpcomingEvents() {
  const images = [
    { src: '../../../image/forum1.jpeg', description: '07 Février | 10h00 - Rencontre avec le Ministre de l’Industrie.' },
    { src: '../../../image/sport3.jpeg', description: '12 Février | 19h00 - Soirée musicale pour une bonne cause.' },
    { src: '../../../image/Sport2.jpeg', description: '18 Février | 21h00 - Compétition de DJs.' },
    { src: '../../../image/Histo5.jpeg', description: '14 Mars | 15h30 - Conférence sur l’innovation entrepreneuriale.' },
    { src: '../../../image/Histo1.jpeg', description: '27 Décembre | 18h00 - Soirée cinéma : Spirited Away.' },
    { src: '../../../image/ben1.jpeg', description: '27-28 Janvier | Toute la journée - Caravane socio-médicale.' },
  ];

  return (
    <div className="UpcomingEvents_container">
      {images.map((img, index) => (
        <div className="img-container" key={index}>
          <img src={img.src} alt={`Image ${index + 1}`} />
          <div className="description">{img.description}</div>
        </div>
      ))}
    </div>
  );
}

