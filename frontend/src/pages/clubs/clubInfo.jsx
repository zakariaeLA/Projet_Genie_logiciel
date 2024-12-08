import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const descriptionMap = {
    "Mines IT": "Mines IT est un club étudiant de l'École Nationale Supérieure des Mines de Rabat (ENSMR)qui se concentre sur le domaine de l'informatique et a pour mission de promouvoir les compétences technologiques parmi les étudiants de l'école.",
    "Astronomines": "Astronomines est un club étudiant de l'École Nationale Supérieure des Mines de Rabat (ENSMR), dédié à la promotion des sciences et de l'astronomie. Ce club a pour objectif de sensibiliser les étudiants et le grand public aux enjeux astronomiques et scientifiques à travers diverses activités.",
    "Alumni": "Le club ALUMNI de l'École Nationale Supérieure des Mines de Rabat (ENSMR) joue un rôle clé dans la vie professionnelle des anciens élèves. Cette association vise à maintenir un lien entre les diplômés et l'école, tout en favorisant le réseautage et le partage d'expériences professionnelles.",
    "Bénévolat": "Enim bénévolat est un club de l'École Nationale des Mines de Rabat (ENIM) qui se consacre à des initiatives humanitaires et sociales.Enim Bénévolat est impliqué dans diverses actions sociales, telles que l'organisation de concerts de charité et les campagnes de don de sang."
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