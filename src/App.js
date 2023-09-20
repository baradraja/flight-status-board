// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Switch
import FlightListing from './components/FlightListing';
import FlightDetails from './components/FlightDetails';

function App() {
  return (
    <Router>

    
      <Routes>
          
          <Route exact path="/" element={<FlightListing />} />
          <Route exact path="/flights/:id" element={<FlightDetails />} />
      </Routes>

    </Router>
  );
}

export default App;
