// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../../styles/Modal.css'
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';
// import { jwtDecode } from 'jwt-decode';

// export default function AdminModal({ isOpen, onClose }) {

//   const [ showRegister, setShowRegister] = useState(false);
//   const [ registerData, setRegisterData ] = useState({"firstname":"","lastname":"", "username":"","password":"","mobileno":"","specialization":"", "yearsofexperience":"", "bio":""})
//   const [ successMessage, setSuccessMessage ] = useState("");
//   const [profilepic, setProfilePic] = useState(null);
//   const [ loginData, setLoginData ] = useState({"username":"","password":""})
//   const navigate = useNavigate();
//   const { setAuthState } = useAuth();

//   const baseUrl = 'http://localhost:7070/health/admin';
//   const initialLoginState = {"username":"", "password":""};
//   const initialRegisterState = {"firstname":"","lastname":"", "username":"","password":"","mobileno":"","specialization":"", "yearsofexperience":"", "bio":""};

//   const handleRegisterClick = () => {
//     setLoginData(initialLoginState);
//     setShowRegister(true);
//     setSuccessMessage("")
//   }

//   // const handleBackToLogin = () => {
//   //   setRegisterData(initialRegisterState);
//   //   setShowRegister(false);
//   // }

//   const handleClose = () => {
//     setShowRegister(false);
//     onClose();
//   }

//   // const handleSubmitLogin = async (e) => {
//   //   e.preventDefault();
//   //   try{
//   //     const response = await axios.post(baseUrl + '/login', loginData);
//   //     const token = response.data.token;
//   //     localStorage.setItem('token', token);

//   //     const admin = jwtDecode(token);
//   //     setAuthState({isAuthenticated: true, doctor:null, patient:null, admin})

//   //     navigate('/admindashboard');
//   //     setLoginData(initialLoginState);
//   //   } catch (error) {
//   //     setLoginData(initialLoginState);
//   //     console.error("There was an error logging in!",error);
//   //   }
//   // };

//   const handleSubmitRegister = async (e) => {
//     e.preventDefault();
//     if (registerData.password !== registerData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//   }

//   const { confirmPassword, ...newRegisterData } = registerData;
//       const formData = new FormData();
//       formData.append("doctor",JSON.stringify(newRegisterData));
//       formData.append("image",profilepic);
//       try{
//         await axios.post(baseUrl + 'register',formData, {
//           headers: { 'Content-type': 'multipart/form-data'}
//         });
//           setRegisterData(initialRegisterState);
//           setShowRegister(false);
//           setProfilePic(null);
//           setSuccessMessage("You have registered successfully. Please log in.")
//     } catch(error) {
//           setRegisterData(initialRegisterState)
//           console.error("There was an error registering the patient!", error);
//         };
//     };

//     // const handleLoginChange = (e) => {
//     //   const { name, value } = e.target;
//     //   setLoginData((prevData) => ({
//     //     ...prevData,
//     //     [name]: value,
//     //   }));
//     // };

//     const handleRegisterChange = (e) => {
//       const { name, value } = e.target;
//       setRegisterData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     };

//     const handleFileChange = (e) =>{
//       setProfilePic(e.target.files[0]);
//     }

//   if (!isOpen) return null;

//   return (
    // <div className="register">
    //   <div className="modal-content">
    //      <div>
    //       <form onSubmit={handleSubmitRegister}>
    //       <button className="close-button" onClick={onClose}>×</button>
    //       <h2>Admin Login</h2>
    //       <div className='nameContainer'>
    //         <div className='flex-item'>
    //           <input 
    //             type="firstname"
    //             placeholder='FirstName'
    //             onChange={handleRegisterChange}
    //             value={registerData.firstname}
    //             name='firstname'
    //           />
    //         </div>
    //         <div className='flex-item'>
    //           <input 
    //             type="lastname"
    //             placeholder='LastName'
    //             onChange={handleRegisterChange}
    //             value={registerData.lastname}
    //             name='lastname'
    //           />
    //         </div>
    //       </div>     
    //      <input 
    //       type='text' 
    //       placeholder='Username' 
    //       autoFocus 
    //       required
    //       onChange={handleRegisterChange}
    //       value={registerData.username}
    //       name='username'
    //     />
    //     <div className='passwordContainer'>
    //       <div className='flex-item'>
    //         <input 
    //           type='password' 
    //           placeholder='Password' 
    //           required
    //           onChange={handleRegisterChange}
    //           value={registerData.password}
    //           name='password'
    //         />
    //       </div>
    //         <div className='flex-item'>
    //           <input 
    //             type='password' 
    //             placeholder='Confirm password' 
    //             required
    //             onChange={handleRegisterChange}
    //             value={registerData.confirmPassword}
    //             name='confirmPassword'
    //           />
    //         </div>
    //       </div>
    //       <input
    //         type='tel'
    //         placeholder='Mobile'
    //         required
    //         onChange={handleRegisterChange}
    //         value={registerData.mobileno}
    //         name='mobileno'
    //       />
    //       <div className='specialization'>
    //       <div className='flex-item'>
    //         <input 
    //           type='specialization' 
    //           placeholder='Specialization' 
    //           required
    //           onChange={handleRegisterChange}
    //           value={registerData.specialization}
    //           name='specialization'
    //         />
    //       </div>
    //         <div className='flex-item'>
    //           <input 
    //             type='yearofExperience' 
    //             placeholder='Years of Experience' 
    //             required
    //             onChange={handleRegisterChange}
    //             value={registerData.yearsofexperience}
    //             name='confirmPassword'
    //           />
    //         </div>
    //       </div>
    //       <input 
    //         type="text"
    //         placeholder='About'
    //         required
    //         onChange={handleRegisterChange}
    //         value={registerData.bio}
    //       />
    //       <input
    //           type='file'
    //           id='profilepic'
    //           onChange={handleFileChange}
    //           accept='image/*'
    //       />
    //     <button>Submit</button>
    //     {/* <button onClick={handleBackToLogin}>Already have an Account? Sign In</button> */}
    //     </form>
    //   </div>
    //     </div>
    // </div>
//   )
// }

//===================================================================================================

import React, { useState } from 'react';
import axios from 'axios';
import '../../../styles/AdminDashboard.css'

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


//===================================================================================

// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../../styles/AdminDashboard.css'

// const DoctorRegistrationForm = ({onClose}) => {
//   const [registerData, setRegisterData] = useState({
//     firstname: '',
//     lastname: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     mobileno: '',
//     specialization: '',
//     yearsofexperience: '',
//     bio: '',
//     profilepic: null
//   });

//   const [submissionStatus, setSubmissionStatus] = useState('');

//   const handleRegisterChange = (e) => {
//     const { name, value } = e.target;
//     setRegisterData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setRegisterData((prevState) => ({
//       ...prevState,
//       profilepic: e.target.files[0],
//     }));
//   };

//   const handleSubmitRegister = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(registerData).forEach((key) => {
//       formData.append(key, registerData[key]);
//     });

//     try {
//       const response = await axios.post('https://your-api-endpoint.com/api/doctors', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 200) {
//         setSubmissionStatus('Doctor registered successfully!');
//       } else {
//         setSubmissionStatus('Failed to register doctor.');
//       }
//     } catch (error) {
//       setSubmissionStatus('An error occurred. Please try again.');
//       console.error('There was an error registering the doctor!', error);
//     }
//   };

//   return (
//     <div className="registration-container">
//       <form onSubmit={handleSubmitRegister}>
//         <h2>Doctor Registration</h2>
//       <div className='nameContainer'>
//         <div >
//           <label>First Name</label>
//           <input 
//             type="text" 
//             name="firstname" 
//             placeholder="First Name" 
//             value={registerData.firstname} 
//             onChange={handleRegisterChange} 
//             required 
//           />


//           <label>Last Name</label>
//           <input 
//             type="text" 
//             name="lastname" 
//             placeholder="Last Name" 
//             value={registerData.lastname} 
//             onChange={handleRegisterChange} 
//             required 
//           />
//         </div>
//       </div>

//           <label>Username</label>
//           <input 
//             type="text" 
//             name="username" 
//             placeholder="Username" 
//             value={registerData.username} 
//             onChange={handleRegisterChange} 
//             required 
//           />

//           <label>Password</label>
//           <input 
//             type="password" 
//             name="confirmPassword" 
//             placeholder="Confirm Password" 
//             value={registerData.confirmPassword} 
//             onChange={handleRegisterChange} 
//             required 
//           />

//           <label>Confirm Password</label>
//           <input 
//             type="tel" 
//             name="mobileno" 
//             placeholder="Mobile Number" 
//             value={registerData.mobileno} 
//             onChange={handleRegisterChange} 
//             required 
//           />

//           <label>Mobile Number</label>
//           <input 
//             type="tel" 
//             name="mobileno" 
//             placeholder="Mobile Number" 
//             value={registerData.mobileno} 
//             onChange={handleRegisterChange} 
//             required 
//           />

//           <label>Specialization</label>
//           <input 
//             type="text" 
//             name="specialization" 
//             placeholder="Specialization" 
//             value={registerData.specialization} 
//             onChange={handleRegisterChange} 
//             required 
//           />

//           <label>Years of Experience</label>
//           <input 
//             type="number" 
//             name="yearsofexperience" 
//             placeholder="Years of Experience" 
//             value={registerData.yearsofexperience} 
//             onChange={handleRegisterChange} 
//             required 
//           />

//           <label>About</label>
//           <textarea 
//             name="bio" 
//             placeholder="About" 
//             value={registerData.bio} 
//             onChange={handleRegisterChange} 
//             required 
//           />

//           <label>Upload File</label>
//           <input
//             type='file'
//             id='profilepic'
//             onChange={handleFileChange}
//             accept='image/*'
//           />

      
//         <button type="submit">Register</button>

//         {submissionStatus && <p>{submissionStatus}</p>}
//       </form>
//     </div>
//   );
// };

// export default DoctorRegistrationForm;
