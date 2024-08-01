import React from 'react';
import '../styles/App.css';
import { Navbar } from './Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import PatientLogin from './pages/PatientLogin';
import DoctorLogin from './pages/DoctorLogin';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  const location = useLocation();
  const NavbarRoutes = ['/', '/about', '/doctors', '/login'];
  const showNavbar = NavbarRoutes.includes(location.pathname);

  return (
    <div className='App'>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/patientLogin' element={<PatientLogin />} />
        <Route path='/doctorLogin' element={<DoctorLogin />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
      </Routes>
    </div>
  );
}
