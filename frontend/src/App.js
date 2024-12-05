import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connexion from './components/connexion';
import Profile from './components/profil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
