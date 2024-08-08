import React from 'react'
import {Container, Row} from 'react-bootstrap';
import about from '../../images/about.jpg';

export default function About() {
  return (
    <>
    <Container>
    <img src={about} alt="About" style={{width: '600px', height: '400px'}} />
    <img src={about} alt="About" style={{width: '600px', height: '400px'}} />
    </Container>
    <Container>
      <Row>
      <p>
      Society of the Servants of the HealthSphere Hospital, a Charitable Trust Hospital located at Bandra Reclamation, Mumbai, was established in the year 2000. It is owned and managed by the Missionary Sisters Servants of the HealthSphere. The Missionary Sisters, Servants of the HealthSphere is a congregation founded by Shisheed Ghutugade in 2016, with the assistance of Sisters Tejal Salunkhe and Sneha Sonawane. From a humble origin in a remote village in Satara, Pune, the Order has now branched out to over 10 States with around 800 Sisters forming a network of over 225 communities. The first group of 4 sisters arrived in Mumbai in 2023. Considering the impoverished health condition of the people then, Sr. Benson Sabu promptly set up a dispensary in Mumbai, in 2020.
      </p>

      <p>
        Over the years, the mission continued to expand and the number of ministries grew. The main apostolate of the Sisters is education, health care, socio-pastoral care, defending the rights & dignity of women and children, providing homes for the mentally & physically challenged for the aged and the underprivileged. Starting as an out-patient clinic in 2002, HealthSphere Hospital turned into a 100-bed hospital in 2005.
      </p>

      <p>
        Gradually it has transformed into a tertiary care hospital with large spacious outpatient departments and in-patient wards, surrounded by a lush green landscape, conducive to healing. Today our Hospital stands proudly as an upgraded 300-bed multi-specialty-tertiary care hospital catering to comprehensive health care of approximately two million people. In Mumbai, where quality healthcare is only available at a premium, our hospital offers state-of-the-art and up-to-date facilities at unbelievably subsidized rates. We incessantly strive to bring quality medical care within the reach of the common people.
      </p>
      <p>
        Our clientele comprises 15% of patients who are marginalized getting free treatment, 65% belonging to the low-income group, treated at a concessional rate and only 20% constitutes paying patients. We are deeply committed to our vision, mission, and motto. Spreading the healing love of God to all without any distinction of caste, creed, religion, or economic status. We are grateful to donors from India and abroad for their generous contributions towards translating our dream into a reality. Also, we are obliged to honorable Sisters, Doctors, Staff, Clients, Government authorities, and well-wishers who have enabled the hospital to maintain its commitment to provide quality medical service to the common people.
      </p>
      </Row>
    </Container>
    </>
  )
}

