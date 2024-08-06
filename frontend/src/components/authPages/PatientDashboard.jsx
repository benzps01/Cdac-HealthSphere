import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function PatientDashboard() {

    const [patient, setPatient] = useState(null);
    const baseUrl = 'http://localhost:7070/health';
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
            const response = await axios.get(baseUrl + "/patient",{
                headers: { Authorization: `Bearer ${token}`},
            });
            setPatient(response.data);
        };

        fetchPatientDetails();
    },[]);

    if(!patient) return <div>Loading.....</div>

  return (
    <div>
        <h1>Welcome, {patient.name}</h1>
        <p>Phone Number: {patient.mobile}</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
