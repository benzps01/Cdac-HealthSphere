import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function BookAppointment() {

  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  
  const docid = '';

    const fetchAllDoctor = async () => {
      try{
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:7070/health/doctor/list", {
          headers: { Authorization: `Bearer ${token}`},
      });
      const doctorsList = response.data.map(doctor => ({
        doctorid: doctor.doctorid,
        firstname: doctor.firstname,
        specialization: doctor.specialization,
      }));

      setDoctors(doctorsList);
    } catch (error){
      console.error("Error fetching doctors: ", error);
    }
  };

  useEffect(() => {
    fetchAllDoctor();
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
  }


  return (
    <div className='appointment'>
      <h1>Book Appointment</h1>
      <div className='appointment-container'>
        <select onChange={handleChange} required>
          <option value="" disabled>Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorid} value={doctor.doctorid}>
              {`Dr. ${doctor.firstname} (${doctor.specialization})`}
            </option>
          ))}
        </select>
        <br/>
        <br/>
        <hr/>
        <button>Book Appointment</button>
      </div>
    </div>
  )
}
