import React from 'react';
import { Card, Carousel, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Home.css';
import doctor1 from '../../images/Doctor1.png';
import home from '../../images/home.png';
import hospital from '../../images/hospital.jpg';
import hospital1 from '../../images/Hospital1.jpg';
import doc1 from '../../images/docpic.jpeg';
import doc2 from '../../images/docpic1.jpeg';
import doc3 from '../../images/docpic2.jpeg';

export default function Home() {
  return (
    <div>
      <Carousel className='imgs' slide={false}>
        <Carousel.Item interval={2000}>
          <img
            src={doctor1}
            alt='Doctor'
            className='d-block w-100'
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            src={home}
            alt='Cardiology'
            className='d-block w-100'
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            src={hospital}
            alt='Cardiology'
            className='d-block w-100'
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </Carousel.Item>
      </Carousel>
      <hr />

      <div className='container' id='abc'>
        <Row>
          <Col>
            <div className='test-dark'>
              <h1>Welcome to HealthSphere</h1>
              <br />
              <p>
                <h3>
                  We have ten years of experience in the healthcare sector and
                  is known for providing quality healthcare and valuable
                  experience to all domestic and international patients. Our
                  healthcare offerings are supported by a team of compassionate
                  and dedicated medical professionals who have rich knowledge
                  and experience in their respective domains to evolve as a
                  benchmark in quality healthcare available to one and all.
                </h3>
              </p>
            </div>
          </Col>
          <Col>
            <Card className='testCard square bg-primary rounded'>
              <Card.Img src={hospital1} />
            </Card>
          </Col>
        </Row>
      </div>

      <br />
      <hr />
      <br />

      <div className='cardcontainer' id="cardcontainer">
        <Row>
          <Col md={4}>
            <Card className='card1'>
              <Card.Img src={doc1} />
              <Card.Body>
                <Card.Title>Doctor</Card.Title>
                <Card.Subtitle>Doctor Name</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='card2'>
              <Card.Img src={doc2} />
              <Card.Body>
                <Card.Title>Doctor</Card.Title>
                <Card.Subtitle>Doctor Name</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='card4'>
              <Card.Img src={doc3} />
              <Card.Body>
                <Card.Title>Doctor</Card.Title>
                <Card.Subtitle>Doctor Name</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
