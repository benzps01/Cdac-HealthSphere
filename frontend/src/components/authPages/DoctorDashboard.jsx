import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function DoctorDashboard() {

    const [doctor, setDoctor] = useState(null);
    const baseUrl = 'http://localhost:7070/health';
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthState({ isAuthenticated: false, patient: null, doctor: null});
        navigate('/login');
    }

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(baseUrl + "/doctor",{
                headers: { Authorization: `Bearer ${token}`},
            });
            setDoctor(response.data);
        };

        fetchDoctorDetails();
    },[]);

    if(!doctor) return <div>Loading.....</div>

  return (
    <div>
        <h1>Welcome, {doctor.name}</h1>
        <p>Specialization: {doctor.specialization}</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
