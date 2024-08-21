import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../../styles/Doctors.css';
import Building from '../../images/img1.jpg'

export default function Doctors() {
  const teamMembers = [
    {
      name: 'Sr. Lissy',
      title: 'Executive Director',
      imgSrc: {Building}, // Replace with actual image paths or URLs
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

