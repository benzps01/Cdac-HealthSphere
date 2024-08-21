// import { useEffect, useState } from "react"
// import { Accordion, AccordionCollapse } from "react-bootstrap"
// import axios from "axios"


// function AccordionUsage({doctorid}){

//     const [appointmentsData, setAppointmentsData] = useState([])
//     const date = new Date().toISOString().split('T')[0];
//     const date1 = "2024-01-02";

//     useEffect(() =>{
//         const fetchAppointments = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5241/api/Doctor/appointments/1', {
//                     params: {
//                         date: '2024-01-02'
//                     },
//                 });
//                 console.log("response: " + response);
//                 // setAppointmentsData(response.data)
//                 // setAppointmentsData(response.data || []);
//                 setAppointmentsData(Array.isArray(response.data) ? response.data : []);
//                 console.log('Fetched appointments:', response.data);
//             }
//             catch (error) {
//                 console.error('Error fetching appointments:', error)
//                 setAppointmentsData([]);
//             }
//         }
//         fetchAppointments()
//     }, [doctorid, date1])

//     useEffect(() => {
//         console.log('Appointments Data Updated:', appointmentsData);
//     }, [appointmentsData]);


//     return (
//         <Accordion>
//             {appointmentsData && appointmentsData.length > 0 ? (
//             appointmentsData.map((item,index) =>(
//                 <Accordion.Item eventKey={index.toString()} key={index}> 
//                     <Accordion.Header>{item.title}</Accordion.Header>
//                         <Accordion.Body>
//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th>Name</th>
//                                         <th>Blood Group</th>
//                                         <th>Gender</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {item.appointments && item.appointments.length > 0 ? (
//                                     item.appointments.map((appointment) =>(
//                                         <tr key={appointment.patientid}>
//                                             <td>{appointment.patient_name}</td>
//                                             <td>{appointment.patient_Bgroup}</td>
//                                             <td>{appointment.patient_gender}</td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                 <tr>
//                                     <td colSpan="3">No appointments available</td>
//                                 </tr>)
//                                 }
//                                 </tbody>
//                             </table>
//                         </Accordion.Body>
//                 </Accordion.Item>
//             ))
//         ):(
//             <div>No Appointments Found</div>
//         )
//         }
//         </Accordion>
//     )
// }
// export default AccordionUsage





import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";

function AccordionUsage({ doctorid }) {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [formData, setFormData] = useState({
         diagnosis: '',
         prescriptions: '',
         treatment: '',
         visitdate: '2024-08-21',
         notes: '',
         patient: {
            patientid: '',
         },
         doctor: {
            doctorid: doctorid,
         }
       });
       
    const [xray, setXray] = useState(null);

  const handleSubmitEhr = async (e) => {
    e.preventDefault();
    const form = new FormData();
    // formData.patientId = patientId;
    form.append('ehrdata', JSON.stringify(formData));
    form.append('xray', xray);

    try {
        const response = await axios.post(
          "http://localhost:9090/ehr",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Response: ",response);
        setSubmissionStatus("Form submitted successfully!");
      } catch (error) {
        console.error('There was an error registering the doctor!', error);

    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setXray(e.target.files[0]);
  };

  const date = new Date().toISOString().split("T")[0];
  const date1 = "2024-01-02";

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5241/api/Doctor/appointments/1",
          {
            params: {
              date: "2024-01-02",
            },
          }
        );
        console.log("response:", response);
        setAppointmentsData(Array.isArray(response.data) ? response.data : []);
        console.log("Fetched appointments:", response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointmentsData([]);
      }
    };
    fetchAppointments();
  }, [doctorid, date1]);

  useEffect(() => {
    console.log("Appointments Data Updated:", appointmentsData);
  }, [appointmentsData]);

  const handleAccordionClick = (patientid) => {
    setFormData((prevState) => ({
      ...prevState,
      patient : {
        patientid: patientid,
      }, 
    }));
  };

  return (
    <Accordion>
      {appointmentsData && appointmentsData.length > 0 ? (
        appointmentsData.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header onClick={() => handleAccordionClick(item.patientid)}>
              {item.patient_name} - {item.patientid}
            </Accordion.Header>
            <Accordion.Body>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>Gender</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={item.patientid}>
                    <td>{item.patient_name}</td>
                    <td>{item.patient_BGroup}</td>
                    <td>{item.patient_gender}</td>
                    <td>{item.patient_notes}</td>
                  </tr>
                </tbody>
                
              </table>
              <form onSubmit={handleSubmitEhr}>
              <div>
                <input 
                  type="text" 
                  placeholder="Diagnosis" 
                  name="diagnosis" 
                  value={formData.diagnosis} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Prescriptions" 
                  name="prescriptions" 
                  value={formData.prescriptions} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Treatment" 
                  name="treatment" 
                  value={formData.treatment} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <label>Upload X-ray Image</label>
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  required 
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            </Accordion.Body>
          </Accordion.Item>
        ))
      ) : (
        <div>No Appointments Found</div>
      )}
    </Accordion>
  );
}

export default AccordionUsage;



// import React, { useState } from 'react';
// import { Accordion, Button } from 'react-bootstrap';
// import axios from 'axios';

// const PatientAccordion = ({ patient }) => {
//   const [formData, setFormData] = useState({
//     diagnosis: '',
//     prescriptions: '',
//     treatment: '',
//   });
//   const [xrayImage, setXrayImage] = useState(null);
//   const [submissionStatus, setSubmissionStatus] = useState('');
//   const [formVisible, setFormVisible] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setXrayImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append('diagnosis', formData.diagnosis);
//     form.append('prescriptions', formData.prescriptions);
//     form.append('treatment', formData.treatment);
//     form.append('xrayImage', xrayImage);
//     form.append('patientId', patient.id);

//     try {
//       const response = await axios.post('http://localhost:7070/api/patient/diagnosis', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         setSubmissionStatus('Diagnosis submitted successfully!');
//       } else {
//         setSubmissionStatus('Failed to submit diagnosis.');
//       }
//     } catch (error) {
//       setSubmissionStatus('An error occurred. Please try again.');
//       console.error('There was an error submitting the diagnosis!', error);
//     }
//   };

//   return (
//     <Accordion>
//       <Accordion.Item eventKey="0">
//         <Accordion.Header>
//           Patient Details: {patient.patient_name} - {patient.patientid}
//         </Accordion.Header>
//         <Accordion.Body>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Blood Group</th>
//                 <th>Gender</th>
//                 <th>Notes</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{patient.patient_name}</td>
//                 <td>{patient.patient_BGroup}</td>
//                 <td>{patient.patient_gender}</td>
//                 <td>{patient.patient_notes}</td>
//               </tr>
//             </tbody>
//           </table>
//           <Button variant="primary" onClick={() => setFormVisible(!formVisible)}>
//             {formVisible ? 'Hide Form' : 'Show Form'}
//           </Button>
//           {formVisible && (
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <input 
//                   type="text" 
//                   placeholder="Diagnosis" 
//                   name="diagnosis" 
//                   value={formData.diagnosis} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>
//               <div>
//                 <input 
//                   type="text" 
//                   placeholder="Prescriptions" 
//                   name="prescriptions" 
//                   value={formData.prescriptions} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>
//               <div>
//                 <input 
//                   type="text" 
//                   placeholder="Treatment" 
//                   name="treatment" 
//                   value={formData.treatment} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>
//               <div>
//                 <label>Upload X-ray Image</label>
//                 <input 
//                   type="file" 
//                   onChange={handleFileChange} 
//                   accept="image/*" 
//                   required 
//                 />
//               </div>
//               <button type="submit">Submit</button>
//             </form>
//           )}
//           {submissionStatus && <p>{submissionStatus}</p>}
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//   );
// };

// export default PatientAccordion;

