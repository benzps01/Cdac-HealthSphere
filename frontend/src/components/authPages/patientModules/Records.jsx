import React from 'react'
import '../../../styles/Records.css'
import test from '../../../images/about.jpg'

export default function Records() {
  return (
    <div className='record-container'>
      <table>
        <thead>
          <th>Sr.No</th>
          <th>EHR ID</th>
          <th>Doctor</th>
          <th>Diagnosis</th>
          <th>Prescriptions</th>
          <th>Visit Date</th>
          <th>Treatment</th>
          <th>Notes</th>
          <th>XRAY</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>Dr. John Doe</td>
            <td>Has Chest Pain</td>
            <td>Amlodipine 5mg</td>
            <td>2023-12-31</td>
            <td>Lifestyle changes</td>
            <td>Patient advised to reduce salt intake</td>
            <td>
              <img src={test} alt='test'/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
