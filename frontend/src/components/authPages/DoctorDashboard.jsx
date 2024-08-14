import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AccordionUsage from './AccordionUsage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../../styles/Dashboard.css';
import profile from '../../images/img1.jpg';

export default function DoctorDashboard() {

    const [doctor, setDoctor] = useState(null);
    const [showAccordion, setShowAccordion] = useState(false)
    const baseUrl = 'http://localhost:7070/health/doctor';
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthState({ isAuthenticated: false, patient: null, doctor: null});
        navigate('/login');
    }

    const viewAppointments = () => {
        //navigate('/doctordashboard');
       // navigate('/AccordionUsage')
        setShowAccordion(!showAccordion);
    }

    const setCalendar = () => {
        navigate('/doctordashboard');
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

    const accordionItems = [
        {
            title: 'Appointment 1',
            content: 'View all appointments for this doctor',
        },
        {
            title: 'Appointment 2',
            content: 'Update your profile details',
            
        },
        {
            title: 'Appointment 3',
            content: 'Update your account settings',
            
        },
    ]

  return (
    <div className='dashboard-container'>
        <div className='profile'>
            <img src={profile} alt="benson" className='profileImg'/> 
            <div className='content'>
            <h2>Dr. {doctor.name}</h2>
            <p><h4>Specialization: {doctor.specialization}</h4></p>
            </div>
            <hr />
            <br />
            <button onClick={viewAppointments} className='view'>View Appointments</button>
            <br />
            <button onClick={setCalendar} className='calendar'>Set Calendar</button>
            <br />
            <button onClick={handleLogout} className='logout'>Logout</button>
        </div>

        {showAccordion && (
            <div className='accordion-container'>
                <AccordionUsage items={accordionItems} />
            </div>
        )}
    </div>
  );
};
