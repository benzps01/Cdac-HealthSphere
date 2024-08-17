import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});

  const fetchAllDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:7070/health/doctor/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const doctorsList = response.data.map(doctor => ({
        doctorid: doctor.doctorid,
        firstname: doctor.firstname,
        specialization: doctor.specialization,
      }));
      setDoctors(doctorsList);
    } catch (error) {
      console.error("Error fetching doctors: ", error);
    }
  };

  const fetchTimeSlots = (startTime, endTime, interval = 30) => {
    let slots = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00`);
    const endTimeObj = new Date(`1970-01-01T${endTime}:00`);
  
    while (currentTime < endTimeObj) {
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).replace(/\s/g, '');
      slots.push(formattedTime);
      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }
    setTimeSlots(slots);
  };
  

  // const fetchBookedSlots = async () => {
  //   try{
  //     const token = localStorage.getItem('token');
  //     const response = await axios.get("/",{
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const bookedData = response.data;
  //     setBookedSlots(bookedData);
  //   } catch (error){
  //     console.error("Error fetching booked slots: ", error);
  //   }
  // };

  useEffect(() => {
    fetchAllDoctors();

    const today = new Date();
    const days = [];
    for (let i = 1; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    setAvailableDates(days);

    const startTime = '10:00';
    const endTime = '15:00'

    fetchTimeSlots(startTime,endTime);
    //fetchBookedSlots();
    setBookedSlots({
      "2024-08-17": ["09:00am", "10:30am", "01:00pm"],
      "2024-08-18": ["11:00am", "02:00pm", "03:30pm"],
      "2024-08-19": ["09:30am", "12:00pm", "04:00pm"],
      "2024-08-20": ["10:00am", "01:30pm", "03:00pm"],
      "2024-08-21": ["09:00am", "11:00am", "02:30pm"],
    });
  }, []);

  const handleDoctorChange = (e) => {
    setSelectedDoctorId(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBooking = () => {
    if (!selectedDoctorId || !selectedDate || !selectedTimeSlot) {
      alert('Please select a doctor, date, and time slot.');
      return;
    }

    console.log(`Booking Appointment for Doctor ID: ${selectedDoctorId}, Date: ${selectedDate}, Time Slot: ${selectedTimeSlot}`);
  };

  return (
    <div className='appointment'>
      <h1>Book Appointment</h1>
      <div className='appointment-container'>
        <select onChange={handleDoctorChange} required>
          <option value="" disabled selected>Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorid} value={doctor.doctorid}>
              {`Dr. ${doctor.firstname} (${doctor.specialization})`}
            </option>
          ))}
        </select>
        <br/>
        <br/>
        <div>
          <input type='text' placeholder='Explain your symptoms (Optional)'></input>
        </div>
        <hr/>
        <div className="date-selection">
          {availableDates.map((date) => (
            <div key={date} className="date-section">
              <h3>{new Date(date).toDateString()}</h3>
              <div className="time-slots">
                {timeSlots.map((timeSlot) => {
                  const isBooked = bookedSlots[date] && bookedSlots[date].includes(timeSlot);
                  const isSelected = selectedDate === date && selectedTimeSlot === timeSlot;
                  return (
                    <button
                    key={timeSlot}
                    className={`time-slot ${isSelected ? 'selected' : ''}`}
                    disabled={isBooked}
                    onClick={() => {
                      if(!isBooked) {
                        handleDateChange(date);
                        handleTimeSlotChange(timeSlot);
                      }
                    }}
                  >
                    {timeSlot}
                  </button>
                  );
              })}
              </div>
              <hr/>
            </div>
          ))}
        </div>
        <button onClick={handleBooking}>Book Appointment</button>
      </div>
    </div>
  );
}

