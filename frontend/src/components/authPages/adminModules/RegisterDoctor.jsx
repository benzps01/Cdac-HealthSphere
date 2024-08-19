import React, { useState } from 'react';
import axios from 'axios';
import '../../../styles/Dashboard.css'

const DoctorRegistrationForm = ({ onClose }) => {
  const [profilepic, setProfilePic] = useState(null);
  const [registerData, setRegisterData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
    mobileno: '',
    specialization: '',
    yearsofexperience: '',
    bio: '',
    profilepic: null,
  });

  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

  const { confirmPassword, ...newRegisterData } = registerData;
  const formData = new FormData();
  formData.append("doctor",JSON.stringify(newRegisterData));
  formData.append("image",profilepic);

    try {
      const response = await axios.post('http://localhost:7070/health/doctor/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfilePic(null);
      if (response.status === 200) {
        setSubmissionStatus('Doctor registered successfully!');
      } else {
        setSubmissionStatus('Failed to register doctor.');
      }
    } catch (error) {
      setSubmissionStatus('An error occurred. Please try again.');
      console.error('There was an error registering the doctor!', error);
    }
  };



  return (
    <div className="admin-dashboard">
      <div className="modal-content1">
        <div>
          <form onSubmit={handleSubmitRegister}>
            <button className="close-button" onClick={onClose}>×</button>
            <h2>Doctor Registration</h2>
            <div className='nameContainer'>
              <div className='flex-item'>
                <input 
                  type="text"
                  placeholder='First Name'
                  onChange={handleRegisterChange}
                  value={registerData.firstname}
                  name='firstname'
                  required
                />
              </div>
              <div className='flex-item'>
                <input 
                  type="text"
                  placeholder='Last Name'
                  onChange={handleRegisterChange}
                  value={registerData.lastname}
                  name='lastname'
                  required
                />
              </div>
            </div>     
            <input 
              type='text' 
              placeholder='Username' 
              autoFocus 
              required
              onChange={handleRegisterChange}
              value={registerData.username}
              name='username'
            />
            <div className='passwordContainer'>
              <div className='flex-item'>
                <input 
                  type='password' 
                  placeholder='Password' 
                  required
                  onChange={handleRegisterChange}
                  value={registerData.password}
                  name='password'
                />
              </div>
              <div className='flex-item'>
                <input 
                  type='password' 
                  placeholder='Confirm password' 
                  required
                  onChange={handleRegisterChange}
                  value={registerData.confirmPassword}
                  name='confirmPassword'
                />
              </div>
            </div>
            <input
              type='tel'
              placeholder='Mobile'
              required
              onChange={handleRegisterChange}
              value={registerData.mobileno}
              name='mobileno'
            />
            <div className='specialization'>
              <div className='flex-item'>
                <input 
                  type='text' 
                  placeholder='Specialization' 
                  required
                  onChange={handleRegisterChange}
                  value={registerData.specialization}
                  name='specialization'
                />
              </div>
              <div className='flex-item'>
                <input 
                  type='number' 
                  placeholder='Years of Experience' 
                  required
                  onChange={handleRegisterChange}
                  value={registerData.yearsofexperience}
                  name='yearsofexperience'
                />
              </div>
            </div>
            <input
              type="text"
              placeholder='About'
              required
              onChange={handleRegisterChange}
              value={registerData.bio}
              name='bio'
            />
            <label>Upload Profile Photo</label>
            <input
              type='file'
              id='profilepic'
              onChange={handleFileChange}
              accept='image/*'
            />
            <button type="submit">Submit</button>
          </form>
          {submissionStatus && <p>{submissionStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistrationForm;
