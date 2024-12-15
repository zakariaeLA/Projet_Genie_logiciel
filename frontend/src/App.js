import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connexion from './components/connexion';
import Profil from './components/profil';
import  EventParticipation from "./eventParticipation/Eventparticipation"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil/>}/>
          <Route path="/eventparticipation" element={<EventParticipation />} />

      </Routes>
    </Router>
  );
}

export default App;