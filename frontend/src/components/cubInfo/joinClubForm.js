import React, { useState } from "react";

export default function JoinClubForm({ onSubmit, onCancel,clubId }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [annee, setAnnee] = useState('1ere année');
    const [motivations, setMotivations] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { firstname, lastname, annee, motivations };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/clubs/${clubId}/rejoindre`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to join the club');
            }

            const result = await response.json();
            console.log('Successfully joined the club:', result);

            // After a successful POST request, call onSubmit to inform the parent component
            onSubmit(formData);
        } catch (error) {
            console.error('Error joining the club:', error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Rejoindre le club</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Prénom:</label>
                        <input
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nom:</label>
                        <input
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Année:</label>
                        <select value={annee} onChange={(e) => setAnnee(e.target.value)}>
                            <option value="1ere année">1ère année</option>
                            <option value="2eme année">2ème année</option>
                            <option value="3eme année">3ème année</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Motivations:</label>
                        <textarea
                            value={motivations}
                            onChange={(e) => setMotivations(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-btn">Envoyer</button>
                        <button type="button" className="cancel-btn" onClick={onCancel}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
}