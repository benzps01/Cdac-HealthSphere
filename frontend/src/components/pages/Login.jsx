import React from 'react'
import '../../styles/LoginPage.css'
import img1 from '../../images/patientImg1.png'
import img2 from '../../images/doctorImg1.png'
import img3 from '../../images/adminImg1.png'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate();

  const handleClick = (route) => () => {
    navigate(route);
  }

  return (
    <div className="container">
      <span onClick={handleClick('/patientLogin')}>
        <img src={img1} alt="Patient"/>
      </span>
      <span onClick={handleClick('/doctorLogin')}>
        <img src={img2} alt="Doctor"/>
      </span>
      <span onClick={handleClick('/adminLogin')}>
        <img src={img3} alt="Admin"/>
      </span>
    </div>
  )
}
