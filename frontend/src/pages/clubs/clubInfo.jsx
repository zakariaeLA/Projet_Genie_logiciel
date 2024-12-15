import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./ClubInfo.css"; // Import the CSS file
import JoinClubForm from "../../components/cubInfo/joinClubForm";

const descriptionMap = {
    "Mines IT":
        "Mines IT est un club étudiant de l'École Nationale Supérieure des Mines de Rabat (ENSMR) qui se concentre sur le domaine de l'informatique et a pour mission de promouvoir les compétences technologiques parmi les étudiants de l'école.",
    "Astronomines":
        "Astronomines est un club étudiant de l'École Nationale Supérieure des Mines de Rabat (ENSMR), dédié à la promotion des sciences et de l'astronomie. Ce club a pour objectif de sensibiliser les étudiants et le grand public aux enjeux astronomiques et scientifiques à travers diverses activités.",
    "Alumni":
        "Le club ALUMNI de l'École Nationale Supérieure des Mines de Rabat (ENSMR) joue un rôle clé dans la vie professionnelle des anciens élèves. Cette association vise à maintenir un lien entre les diplômés et l'école, tout en favorisant le réseautage et le partage d'expériences professionnelles.",
    "Bénévolat":
        "Enim bénévolat est un club de l'École Nationale des Mines de Rabat (ENIM) qui se consacre à des initiatives humanitaires et sociales. Enim Bénévolat est impliqué dans diverses actions sociales, telles que l'organisation de concerts de charité et les campagnes de don de sang.",
    "Japamines":
        "Japamines est un club étudiant de l'École Nationale Supérieure des Mines de Rabat (ENSMR), axé sur la culture japonaise et l'apprentissage de la langue japonaise. Ce club vise à promouvoir la découverte et l'appréciation de la culture nippone parmi les étudiants, tout en offrant des activités variées.",
    "Mines Leaders":
        "Mines Leaders est un club qui repousse les limites des sports mécaniques en concevant des véhicules innovants avec créativité, passion et une touche unique d’audace.",
        "Forum": 
        "Le club Forum de l'École Nationale Supérieure des Mines de Rabat (ENSMR) est la vitrine professionnelle de l'école. Ce club joue un rôle central dans l'organisation d'événements tels que le Forum des Entreprises, un espace d'échange et de rencontre entre les étudiants, les diplômés et les entreprises partenaires. Avec professionnalisme et engagement, le club Forum vise à renforcer le lien entre le monde académique et le milieu professionnel, en mettant en avant l'excellence et le savoir-faire des Mines de Rabat."

};

export default function ClubInfo() {
    const { clubId } = useParams();
    const navigate = useNavigate();
    const [club, setClub] = useState(null);
    const [events, setEvents] = useState([]);
    const [studentInClub, setStudentInClub] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchClubInfo = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/connexion');
                return;
            }

            try {
                // 1. Fetch the user profile to get currentEtudiantId
                const profileResponse = await fetch('http://localhost:8000/api/profil', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (!profileResponse.ok) {
                    throw new Error(`Profile fetch failed: ${profileResponse.status} ${profileResponse.statusText}`);
                }

                const profileData = await profileResponse.json();
                const etudiantId = profileData._id;

                // 2. Fetch the clubs using the retrieved etudiantId
                const clubsResponse = await fetch(`http://localhost:8000/api/clubs/${etudiantId}/clubs`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!clubsResponse.ok) {
                    throw new Error(`Clubs fetch failed: ${clubsResponse.status} ${clubsResponse.statusText}`);
                }

                const clubsData = await clubsResponse.json();
                let foundClub = clubsData.mesClubs.find((c) => c.id === clubId);

                if (foundClub) {
                    foundClub.description = descriptionMap[foundClub.nom] || 'No description available';
                    setClub(foundClub);
                    setStudentInClub(true);
                } else {
                    foundClub = clubsData.autresClubs.find((c) => c.id === clubId);
                    if (foundClub) {
                        foundClub.description = descriptionMap[foundClub.nom] || 'No description available';
                        setClub(foundClub);
                        setStudentInClub(false);
                    } else {
                        // Club not found in either list
                        setClub(null);
                        setStudentInClub(false);
                    }
                }

                const eventsResponse = await fetch(`http://localhost:8000/api/clubs/${clubId}/evenements`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const eventsData = await eventsResponse.json();
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching club information:', error);
            }
        };

        fetchClubInfo();
    }, [clubId]);

    const handleJoinClick = () => {
        setShowForm(true);
    };

    const handleFormCancel = () => {
        setShowForm(false);
    };

    const handleFormSubmit = async (formData) => {
        setShowForm(false);
        alert("Demande Envoyée !");
    };

    if (club === null) {
        return <div>Club not found.</div>;
    }
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/clubs/${clubId}/quitter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setStudentInClub(false);
            } else {
                console.log('Succès:', response);
            }
        } catch (error) {
            console.error('Erreur lors de la sortie du club:', error);
        }
    };
    return (
        <div className="club-info-container">
            {club ? (
                <div className="club-card">
                    <h1 className="club-title">{club.nom}</h1>
                    <div className="club-image-container">
                        <img
                            src={`http://localhost:8000${club.image}`}
                            alt={`Image ${club.nom}`}
                            className="club-image"
                        />
                    </div>
                    <p className="club-description">{club.description}</p>
                    {events && events.length > 0 ? (
                        <div className="events-container">
                            {events.map((event) => (
                                <div key={event._id} className="event-card">
                                    <img
                                        src={
                                            event.image.startsWith('http')
                                                ? event.image
                                                : `http://localhost:8000/${event.image}`
                                        }
                                        alt={event.titre}
                                        className="event-image"
                                        onError={(e) => {
                                            e.target.src =
                                                'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-events-text">Aucun événement à afficher.</p>
                    )}
                    {studentInClub ? (
                        <button
                            className="club-action-btn leave-btn"
                            onClick={handleDelete}
                        >
                            Quitter le club
                        </button>
                    ) : (
                        <button className="club-action-btn join-btn" onClick={handleJoinClick}>Rejoindre le club</button>
                    )}
                </div>
            ) : (
                <p className="loading-text">Rechargement...</p>
            )}

            {showForm && (
                <JoinClubForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    clubId={clubId}
                />
            )}
        </div>
    );
}