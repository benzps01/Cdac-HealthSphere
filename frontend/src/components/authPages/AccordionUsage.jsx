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

  // const date = new Date().toISOString().split("T")[0];
  const date1 = "2024-08-22";

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5241/api/Doctor/appointments/3",
          {
            params: {
              date: date1,
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