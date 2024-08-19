import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

export default function BookAppointment({patientid}) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});
  const [starttime, setStartTime] = useState('');
  const [endtime, setEndTime] = useState('');

  const formatTimeHHMMSStoHHMM = (time) => {
    if (!time || typeof time !== 'string') {
      console.error("Invalid time format:", time);
      return ''; // Return an empty string or a default time like '00:00'
    }
    return time.slice(0, 5);
  };

  const formatTimeHHMMtoHHMMSS = (time) => {
    // Match time format including period (AM/PM)
    const match = time.match(/(\d{2}):(\d{2})([ap]m)/);
    
    if (!match) {
        throw new Error('Invalid time format');
    }
    
    let [_, hours, minutes, period] = match;
    let hours24 = parseInt(hours, 10);
    
    // Convert to 24-hour format
    if (period === 'pm' && hours24 !== 12) hours24 += 12;
    if (period === 'am' && hours24 === 12) hours24 = 0;

    // Return formatted time in 24-hour format with seconds as '00'
    return `${hours24.toString().padStart(2, '0')}:${minutes}:00`;
};

  const fetchAllDoctors = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:7070/health/doctor/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const doctorsList = response.data.map(doctor => ({
        doctorid: doctor.doctorid,
        firstname: doctor.firstname,
        specialization: doctor.specialization,
        starttime: formatTimeHHMMSStoHHMM(doctor.starttime),
        endtime: formatTimeHHMMSStoHHMM(doctor.endtime)
      }));
      setDoctors(doctorsList);
    } catch (error) {
      console.error("Error fetching doctors: ", error);
    }
  }, []);

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

    if(selectedDoctorId){
      fetchTimeSlots(starttime,endtime);
    }

    setBookedSlots({
      "2024-08-17": ["09:00am", "10:30am", "01:00pm"],
      "2024-08-18": ["11:00am", "02:00pm", "03:30pm"],
      "2024-08-19": ["09:30am", "12:00pm", "04:00pm"],
      "2024-08-20": ["10:00am", "01:30pm", "03:00pm"],
      "2024-08-21": ["09:00am", "11:00am", "02:30pm"],
    });
  }, [fetchAllDoctors, selectedDoctorId, starttime, endtime]);

  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value;
    const selectedDoctor = doctors.find(doctor => doctor.doctorid === parseInt(selectedDoctorId));

    if(selectedDoctor){
      setSelectedDoctorId(selectedDoctor.doctorid);
      setStartTime(selectedDoctor.starttime);
      setEndTime(selectedDoctor.endtime);
      fetchTimeSlots(selectedDoctor.starttime, selectedDoctor.endtime);
    } else {
      setSelectedDoctorId('');
      setStartTime('');
      setEndTime('');
      setTimeSlots([]);
    }
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
    try{
      const bookingDetails = {
        doctorid: selectedDoctorId,
        appointment_date: selectedDate,
        appointment_time: formatTimeHHMMtoHHMMSS(selectedTimeSlot),
        status: "scheduled",
        patientid: patientid
      };
      alert(`Booking Details:\nDoctor ID: ${bookingDetails.doctorid}\nDate: ${bookingDetails.appointment_date}\nTime: ${selectedTimeSlot} \nAppointment Booked.`);
      console.log("bookingDetails: ", bookingDetails);
        setSelectedDoctorId('');
        setSelectedDate('');
        setSelectedTimeSlot('');
        setTimeSlots([]);
        setStartTime('');
        setEndTime('');
        setBookedSlots({});
    } catch (error) {
      console.error("Error booking appointment: ",error);
      alert("Failed to book appointment. Please try again.");
    }

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
