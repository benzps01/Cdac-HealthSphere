import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../../styles/Dashboard.css';
import profile from '../../images/img1.jpg';

export default function DoctorDashboard() {

    const [doctor, setDoctor] = useState(null);
    const baseUrl = 'http://localhost:7070/health/doctor';
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
            const response = await axios.get(baseUrl,{
                headers: { Authorization: `Bearer ${token}`},
            });
            setDoctor(response.data);
        };

        fetchDoctorDetails();
    },[]);

    if(!doctor) return <div>Loading.....</div>

  return (
    <div>
        <div className='profile'>
            <img src={profile} alt="benson" className='profileImg'/>
            <h1>Welcome, Dr. {doctor.name}</h1>
            <p>Specialization: {doctor.specialization}</p>
            <button onClick={handleLogout} className='logout'>Logout</button>
        </div>
    </div>
  );
};
