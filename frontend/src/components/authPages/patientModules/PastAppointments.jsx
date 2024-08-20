import React, { useEffect, useState } from "react";
import '../../../styles/PastAppointment.css';
import axios from "axios";

const PastAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5241/api/Appointment");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching the appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Appointments</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Doctor ID</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.patient?.name}</td>
              <td>{appointment.doctorId}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.status}</td>
              <td>{appointment.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastAppointments;
