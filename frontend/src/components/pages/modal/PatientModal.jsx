import React, { useState } from 'react'
import axios from 'axios';
import '../../../styles/Modal.css'
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../../AuthContext'; 

export default function PatientModal({ isOpen, onClose }) {

    const [ showRegister, setShowRegister ] = useState(false);
    const [ loginData, setLoginData ] = useState({"username":"","password":""})
    const [ registerData, setRegisterData ] = useState({"name":"", "username":"","mobile":"","email":"", "bloodgroup":"", "password":""})
    const [ successMessage, setSuccessMessage ] = useState("");
    const navigate = useNavigate();
    const { setAuthState } = useAuth(); 

    const bloodGroups = [
      'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Not Sure'
    ];

    const url = 'http://localhost:7070/health';

    const initialLoginState = {"username":"","password":""}
    const initialRegisterState = {"name":"", "username":"","mobile":"","email":"", "bloodgroup":"", "password":""};

    const handleRegisterClick = () => {
        setLoginData(initialLoginState);
        setShowRegister(true);
        setSuccessMessage("")
    }

    const handleBackToLogin = () => {
      setRegisterData(initialRegisterState);
      setShowRegister(false);
    }

    const handleClose = () => {
      setShowRegister(false);
      onClose();
    }

    const handleSubmitLogin = async (e) => {
      e.preventDefault();
      try{
        const response = await axios.post(url + '/patient/login', loginData);
        const token = response.data.token;
        localStorage.setItem('token', token);

        const patient = jwtDecode(token);
        setAuthState({isAuthenticated: true, patient, doctor:null});
        
        navigate('/patientdashboard');
        setLoginData(initialLoginState);
      } catch (error) {
        console.error('There was an error logging in!',error);
      }
    };

    const handleSubmitRegister = async (e) => {
      e.preventDefault();
      await axios.post(url + '/patient/register',registerData)
        .then(response => {
          console.log(response.data);
          setRegisterData(initialRegisterState);
          setShowRegister(false);
          setSuccessMessage("You have registered successfully. Please log in.")
        })
        .catch(error => {
          console.error("There was an error registering the patient!", error);
        });
    };

    const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleRegisterChange = (e) => {
      const { name, value } = e.target;
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    if(!isOpen) return null;

  return (
    <div className = "modal">
        <div className='modal-content'>
        {showRegister ? (
          <div>
            <form onSubmit={handleSubmitRegister}>
            <button className="close-button" onClick={handleClose}>×</button>
            <h2>Register</h2>
            <input 
              type='text' 
              placeholder='Name' 
              autoFocus 
              required
              value={registerData.name}
              onChange={handleRegisterChange}
              name='name'
            />
            <input 
              type='text' 
              placeholder='Username' 
              autoFocus 
              required
              value={registerData.username}
              onChange={handleRegisterChange}
              name='username'
            />
            <input 
              type='email' 
              placeholder='Email' 
              required
              value={registerData.email}
              onChange={handleRegisterChange}
              name='email'
            />
            <div className='flex-container'>
              <div className='flex-item'>
                <input
                  type='tel'
                  placeholder='Mobile'
                  required
                  onChange={handleRegisterChange}
                  value={registerData.mobile}
                  name='mobile'
                />
            </div>
              <div className='flex-item'>
                <select
                  name="bloodgroup"
                  value={registerData.bloodgroup}
                  onChange={handleRegisterChange}
                  required
                >
                  <option value="" disabled>Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
            <button>Submit</button>
            <button onClick={handleBackToLogin}>Already have an Account? Sign In</button>
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmitLogin}>
            <button className="close-button" onClick={handleClose}>×</button>
            <h2>Patient Login</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <input 
              type='text' 
              placeholder='Username' 
              autoFocus 
              required 
              onChange={handleLoginChange}
              value={loginData.username}
              name='username'
            />
            <input 
              type='password' 
              placeholder='Password' 
              required 
              onChange={handleLoginChange}
              value={loginData.password}
              name='password'
            />
            <button>Submit</button>
            <button onClick={handleRegisterClick}>New Patient? Register Here</button>
            </form>
          </div>
        )}
        </div>
    </div>
  )
}
