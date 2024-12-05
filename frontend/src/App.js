import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connexion from './connexion';
import EvenementsAvenir from './components/upcomingEvents/UpcomingEvents.jsx' ;
import EvenementsHistorique from './components/eventHistory/EventHistory';



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
      </Routes>
    </Router>
  );
}

export default App;
