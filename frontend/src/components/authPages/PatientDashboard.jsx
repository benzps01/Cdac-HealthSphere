import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function PatientDashboard() {

    const [patient, setPatient] = useState(null);
    const baseUrl = 'http://localhost:7070/health/patient';
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthState({ isAuthenticated: false, patient: null});
        navigate('/login');
    }

    useEffect(() => {
        const fetchPatientDetails = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(baseUrl,{
                headers: { Authorization: `Bearer ${token}`},
            });
            setPatient(response.data);
        };

        fetchPatientDetails();
    },[]);

    if(!patient) return <div>Loading.....</div>

  return (
    <div>
        <h1>Welcome, {patient.firstname}</h1>
        <p>Phone Number: {patient.mobileno}</p>
        <button onClick={handleLogout} className='logout'>Logout</button>
    </div>
  );
};
