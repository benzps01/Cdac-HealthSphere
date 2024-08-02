import React, { useState } from 'react'
import '../../../styles/Modal.css'

export default function PatientModal({ isOpen, onClose }) {

    const [ showRegister, setShowRegister ] = useState(false);

    const handleRegisterClick = () => {
        setShowRegister(true);
    }

    const handleBackToLogin = () => {
        setShowRegister(false);
    }

    const handleClose = () => {
      setShowRegister(false);
      onClose();
    }

    if(!isOpen) return null;

  return (
    <div className = "modal">
        <div className='modal-content'>
        {showRegister ? (
          <div>
            <button className="close-button" onClick={handleClose}>×</button>
            <h2>Register</h2>
            <input type='text' placeholder='Username' autoFocus required/>
            <input type='email' placeholder='Email' required/>
            <input type='password' placeholder='Password' required/>
            <input type='password' placeholder='Password' required/>
            <button>Submit</button>
            <button onClick={handleBackToLogin}>Already have an Account? Sign In</button>
          </div>
        ) : (
          <div>
            <button className="close-button" onClick={handleClose}>×</button>
            <h2>Patient Login</h2>
            <input type='text' placeholder='Username' autoFocus required/>
            <input type='password' placeholder='Password' required/>
            <button onClick={handleRegisterClick}>New Patient? Register Here</button>
          </div>
        )}
        {/* <button onClick={onClose}>Close</button> */}
        </div>
    </div>
  )
}
