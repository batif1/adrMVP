import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerifyAccount from './VerifyAccount';
import CreateIdentity from './CreatePatientIdentity';
import CreateDoctorIdentity from  './CreateDoctorIdentity';
import CreatePatientIdentity from './CreatePatientIdentity';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-identity" element={<CreateIdentity />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/create-identity-doctor" element={<CreateDoctorIdentity/>}/>
        <Route path="/create-identity-patient" element={<CreatePatientIdentity/>}/>

      </Routes>
    </Router>
  );
};

export default App;
