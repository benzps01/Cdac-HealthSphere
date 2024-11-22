import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../../styles/Doctors.css';
<<<<<<< HEAD

const ManagementTeam = () => {
  const teamMembers = [
    {
      name: 'Sr. Lissy',
      title: 'Executive Director',
      imgSrc: 'path_to_image1', // Replace with actual image paths or URLs
    },
    {
      name: 'Dr. Susan',
      title: 'Medical Director',
      imgSrc: 'path_to_image2',
    },
    {
      name: 'Sr Felcy',
      title: 'Asst. Executive Director',
      imgSrc: 'path_to_image3',
    },
    {
      name: 'Dr Anuja',
      title: 'Asst. Medical Director',
      imgSrc: 'path_to_image4',
    },
    {
      name: 'Sr. Julie',
      title: 'HR Director',
      imgSrc: 'path_to_image5',
    },
    {
      name: 'Sr Usha Thomas',
      title: 'Nursing Director',
      imgSrc: 'path_to_image6',
    },
    {
      name: 'Sr Shruti',
      title: 'Finance Director & Head of IT',
      imgSrc: 'path_to_image7',
    },
    {
      name: 'Sr Elsy',
      title: 'Director Supportive Services & Head of Community Centre',
      imgSrc: 'path_to_image8',
    },
    {
      name: 'Sr Vasanthi',
      title: 'Head of OT and NABH',
      imgSrc: 'path_to_image9',
    },
    {
      name: 'Sr Prema',
      title: 'Clinical Counsellor',
      imgSrc: 'path_to_image10',
    },
    {
      name: 'Sr Lalita',
      title: 'Principal Of Nursing College',
      imgSrc: 'path_to_image11',
    },
    {
      name: 'Sr Lalita',
      title: 'Principal Of Nursing College',
      imgSrc: 'path_to_image11',
    },
  ];

  return (
    
    <Container className="my-5">
      {/* <h2 className="text-center mb-4">Team</h2> */}
      <Row>
      <h2 className="text-center mb-4">Management Team</h2>
        {teamMembers.map((member, index) => (
          <Col xs={12} md={6} lg={4} className="mb-4" key={index}>
            <Card className="h-100 text-center">
              <Card.Img variant="top" src={member.imgSrc} alt={member.name} />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Text>{member.title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManagementTeam;
=======
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.JPG';
import img3 from '../../images/img3.JPG';
import img4 from '../../images/img4.jpg';
import img5 from '../../images/img5.JPG';
import img6 from '../../images/img6.JPG';
import img7 from '../../images/img7.JPG';
import img8 from '../../images/img8.jpg';
import img9 from '../../images/img9.JPG';
import img10 from '../../images/img10.JPG';
import img11 from '../../images/img11.JPG';
import img12 from '../../images/img12.JPG';

export default function Doctors() {
  const teamMembers = [
    {
      name: 'Dr. Benson Sabu',
      title: 'Executive Director',
      imgSrc: img1,
    },
    {
      name: 'Dr. Rajul Dubey',
      title: 'Medical Director',
      imgSrc: img2,
    },
    {
      name: 'Dr. Hrishikesh Shedge',
      title: 'Asst. Executive Director',
      imgSrc: img3,
    },
    {
      name: 'Dr Shishir Ghutugale',
      title: 'Asst. Medical Director',
      imgSrc: img4,
    },
    {
      name: 'Sr. Nishant Deore',
      title: 'HR Director (Pune Region)',
      imgSrc: img5,
    },
    {
      name: 'Sr Dinesh Pukale',
      title: 'Nursing Director',
      imgSrc: img6,
    },
    {
      name: 'Sr Abhishek Desai',
      title: 'Finance Director & Head of IT',
      imgSrc: img7,
    },
    {
      name: 'Sr Rushikesh Ghughe',
      title: 'Director Supportive Services & Head of Community Centre',
      imgSrc: img8,
    },
    {
      name: 'Sr Pratik Bhoir',
      title: 'Head of OT and NABH',
      imgSrc: img9,
    },
    {
      name: 'Sr Sahil Lad',
      title: 'Clinical Counsellor',
      imgSrc: img10,
    },
    {
      name: 'Sr Abhijeet Pawar',
      title: 'Principal Of Nursing College',
      imgSrc: img11,
    },
    {
      name: 'Sr Ajay Sonawale',
      title: 'Vice-Principal Of Nursing College',
      imgSrc: img12,
    },
  ];

  return (
    <Container className="my-5">
      
      <Row>
      <h2 className="text-center mb-4">Management Team</h2>
        {teamMembers.map((member, index) => (
          <Col xs={12} md={6} lg={4} className="mb-4" key={index}>
            <Card className="h-100 text-center">
              <Card.Img variant="top" src={member.imgSrc} alt={member.name} className='images'/>
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Text>{member.title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
>>>>>>> dev-shisheer
