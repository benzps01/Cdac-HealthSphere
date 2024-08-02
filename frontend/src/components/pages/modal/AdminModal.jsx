import React from 'react';
import '../../../styles/Modal.css'

export default function AdminModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <form>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Admin Login</h2>
        <input type='text' placeholder='Username' autoFocus required/>
        <input type='password' placeholder='Password' required/>
        <button>Submit</button>
        </form>
      </div>
    </div>
  );
};
