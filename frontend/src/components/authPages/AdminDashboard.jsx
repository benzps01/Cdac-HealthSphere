import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function AdminDashboard() {

    const [admin, setAdmin] = useState(null);
    const baseUrl = 'http://localhost:7070/health/admin';
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthState({ isAuthenticated: false, admin: null});
        navigate('/login');
    }

    useEffect(() => {
        const fetchPatientDetails = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(baseUrl,{
                headers: { Authorization: `Bearer ${token}`},
            });
            setAdmin(response.data);
        };

        fetchPatientDetails();
    },[]);

    if(!admin) return <div>Loading.....</div>

  return (
    <div>
        <h1>Welcome, {admin.username}</h1>
        <p>Phone Number: {admin.password}</p>
        <button onClick={handleLogout} className='logout'>Logout</button>
    </div>
  );
};
