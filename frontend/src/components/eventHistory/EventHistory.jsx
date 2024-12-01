import React from 'react';
import './eventHistory.css';

export default function EventHistory() {
  const images = [
    { src: '../../../image/masjid1.jpeg', description: '20 Janvier | 14h00 - أمسية قرآنية لاختتام فعاليات المهرجان القرآني في نسخته الحادية عشرة' },
    { src: '../../../image/mead1.jpeg', description: '25 Février | 16h00 - Découvrez notre nouveau film « The Legend of Mines Leaders 09 », une expérience cinématographique unique à ne pas manquer!' },
    { src: '../../../image/Sport1.jpeg', description: '18 Mars | 09h00 - Participez à une aventure captivante de laser tag et relevez le défi avec votre équipe!' },
    { src: '../../../image/make1.jpeg', description: '05 Avril | 10h00 - La 7ᵉ édition du Moroccan Robotics Challenge vous attend. Soyez prêt à innover!' },
    { src: '../../../image/astro1.jpeg', description: '10 Mai | 20h00 - Pour la 4ᵉ édition de Cosmelody, découvrez des conférences fascinantes sur l’astronomie et les sciences.' },
    { src: '../../../image/energ1.jpeg', description: '15 Juin | 11h00 - L’IA et les énergies renouvelables : un mariage parfait pour un avenir durable.' },
  ];

  return (
    <div className="EventHistory_container">
      {images.map((img, index) => (
        <div className="img-container" key={index}>
          <img src={img.src} alt={`Image ${index + 1}`} />
          <div className="description">{img.description}</div>
        </div>
      ))}
    </div>
  );
}
