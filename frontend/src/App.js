import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connexion from './connexion';
import EvenementsAvenir from './components/upcomingEvents/UpcomingEvents.jsx' ;
import EvenementsHistorique from './components/eventHistory/EventHistory';
import ClubInfo from './pages/clubs/clubInfo.jsx';



function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/evenementsavenir" element={<EvenementsAvenir/>} />
        <Route path="/evenementshistorique" element={<EvenementsHistorique/>} />
        <Route path="/clubInfo/:clubId" element={<ClubInfo/>} />
      </Routes>
    </Router>
  );
}

export default App;