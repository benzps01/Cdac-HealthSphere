import React from 'react';
import '../../../styles/Records.css';
import test from '../../../images/about.jpg';

export default function Records() {
  // Example data from backend
  const ehrData = [
    {
      id: 1,
      doctorName: "Dr. John Doe",
      diagnosis: "Diagnosis 1",
      prescription: "Prescription 1",
      treatment: "Treatment 1",
      visitDate: "2024-08-19",
      notes: "Notes 1",
      xrayImage: test // Replace this with the actual image path or URL
    },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      diagnosis: "Diagnosis 2",
      prescription: "Prescription 2",
      treatment: "Treatment 2",
      visitDate: "2024-08-18",
      notes: "Notes 2",
      xrayImage: test
    }
  ];

  return (
    <div className='record-container'>
      <div className='record-heading'>
        <h1 className='head'>EHR DATA</h1>
      </div>
      <hr className='title-line' /> {/* Line after the EHR DATA heading */}
      {ehrData.map((record, index) => (
        <div key={record.id} className='record-data'>
          <div className='record-data-1'>
            <p><strong>EHR id:</strong> {record.id}</p>
            <p><strong>Dr Name:</strong> {record.doctorName}</p>
            <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
            <p><strong>Prescription:</strong> {record.prescription}</p>
            <p><strong>Treatment:</strong> {record.treatment}</p>
            <p><strong>Visit Date:</strong> {record.visitDate}</p>
            <p><strong>Notes:</strong> {record.notes}</p>
          </div>
          <div className='record-data-2'>
            <img src={record.xrayImage} alt={`X-ray for record ${record.id}`} />
          </div>
        </div>
      ))}
      <hr />
    </div>
  );
}
