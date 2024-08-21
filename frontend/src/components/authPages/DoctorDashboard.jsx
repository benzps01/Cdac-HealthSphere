import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AccordionUsage from './AccordionUsage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../../styles/Dashboard.css';
import defaultImg from '../../images/default.jpg';

export default function DoctorDashboard() {

    const [doctor, setDoctor] = useState(null);
    const [showAccordion, setShowAccordion] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const baseUrl = 'http://localhost:7070/health/doctor';
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthState({ isAuthenticated: false, patient: null, doctor: null});
        navigate('/login');
    }

    const viewAppointments = () => {
        if (showCalendar){
            setShowCalendar(false);
        }
        setShowAccordion(!showAccordion);
    }

    const setCalendar = () => {
        if(showAccordion){
            setShowAccordion(false);
        }
        setShowCalendar(!showCalendar);
    }

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try{
            const token = localStorage.getItem('token');
            const response = await axios.get(baseUrl,{
                headers: { Authorization: `Bearer ${token}`},
            });
            setDoctor(response.data);

            if (response.data.doctorid) {
                const imageResponse = await axios.get(`${baseUrl}/picture/${response.data.doctorid}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'arraybuffer',
                });

                if (imageResponse.data.byteLength > 0) { 
                    const base64Image = btoa(
                        new Uint8Array(imageResponse.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    );
                    setProfileImageUrl(`data:image/jpeg;base64,${base64Image}`);
                } else {
                    setProfileImageUrl(null);
                }
            }
        } catch (error) {
            console.error("Error fetching doctor details or profile image:", error);
        }
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
            <img src={profileImageUrl || defaultImg} alt={doctor.firstname} className='profileImg'/> 
            <div className='content'>
            <h2>Dr. {doctor.firstname}</h2>
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
                <h2>Appointments</h2>
                <AccordionUsage items={accordionItems} />
            </div>
        )}

        {showCalendar &&(
            <div className='calendar-container'>
                <AppointmentScheduler />
            </div>
        )}
    </div>
  );
};
