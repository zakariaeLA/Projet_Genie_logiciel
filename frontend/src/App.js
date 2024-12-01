import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Eventparticipation from './Eventparticipation';  


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/eventparticipation" element={<Eventparticipation />} />
      </Routes>
    </Router>
  );
}

export default App;