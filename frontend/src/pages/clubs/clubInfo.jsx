import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const descriptionMap = {
    "Mines IT": "This is a technology-oriented club focusing on IT, coding, and innovations.",
    "Astronomines": "A club dedicated to exploring astronomy and related sciences.",
    "Alumni": "A networking hub connecting current students with alumni.",
    "Bénévolat": "A volunteer-focused group working on charitable and community projects."
    // Add more mappings as needed
  };

export default function ClubInfo() {
  const { clubId, studentId } = useParams();
  const [club, setClub] = useState(null);
  const [studentInClub, setStudentInClub] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/clubs/${studentId}/clubs`)
      .then((response) => response.json())
      .then((data) => {
        let foundClub = data.mesClubs.find((c) => c.id === clubId);
        if (foundClub) {
            foundClub.description = descriptionMap[foundClub.nom];
          setClub(foundClub);
          setStudentInClub(true);
        } else {  
          foundClub = data.autresClubs.find((c) => c.id === clubId);
          if (foundClub) {
            foundClub.description = descriptionMap[foundClub.nom];
            setClub(foundClub);
            setStudentInClub(false);
          } else {
            setClub(null);
            setStudentInClub(false);
          }
        }

        
        
      })
      .catch((error) => console.error("Error fetching clubs:", error));
  }, [clubId, studentId]);

  return (
    <div>
      

      {club ? (
        <div>
          <h2>{club.nom}</h2>
          <img 
            src={`http://localhost:3000${club.image}`} 
            alt={`Image ${club.nom}`} 
          />
          <p>{club.description}</p>
          {studentInClub ? (
            <button>Quitter le club</button>
          ) : (
            <button>Rejoindre le club</button>
          )}
        </div>
      ) : (
        <p>Rechargement...</p>
      )}

    </div>
  );
}