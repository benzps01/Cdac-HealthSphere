
import React from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Home.css';
export default function Home() {
  return (
    <div>
      <Carousel className='imgs' slide={false}>
        <Carousel.Item interval={2000}>
          <img 
            src='../'
            alt='Doctor'
            className='d-block w-100'
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img 
            src='Images/home.png'
            alt='Cardiology'
            className='d-block w-100'
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </Carousel.Item>

        <Carousel.Item  interval={2000}>
          <img 
            src='Images/Hospital.jpg'
            alt='Cardiology'
            className='d-block w-100'
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </Carousel.Item>

      </Carousel>
<br/>
<hr/>
<br/>


<Container>
<Row>
  <Col>
  {/* <Card > */}
  <div className='bg-light' >
    <h1>Welcome to HealthSphere</h1>
    {/* <hr /> */}
    <br/>
    <p > 
    <h3>  
    We have ten years of experience in the healthcare sector
    and is known for providing quality healthcare and valuable
    experience to all domestic and international patients.
    Our healthcare offerings are supported by a team of
    compassionate and dedicated medical professionals who 
    have rich knowledge and experience in their respective domains
    to evolve as a benchmark in quality healthcare available to one
    and all.
    </h3>
    </p>
    
  </div>
  {/* </Card> */}
  </Col>
  <Col>
  <Card className='testCard square bg-primary rounded'>
            <Card.Img src="Images/Hospital1.jpg"/>

          </Card>

  </Col>
</Row>

</Container>

<br />
<hr />
<br />



<Container className='cardcontainer'>
      <Row>
        <Col md={4}>
          <Card className='card1'>
            <Card.Img src="Images/docpic.jpeg" />
            <Card.Body>
              <Card.Title>Doctor</Card.Title>
              <Card.Subtitle>Doctor Name</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='card2'>
            <Card.Img src="Images/docpic1.jpeg" />
            <Card.Body>
              <Card.Title>Doctor</Card.Title>
              <Card.Subtitle>Doctor Name</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='card4'>
            <Card.Img src="Images/docpic2.jpeg" />
            <Card.Body>
              <Card.Title>Doctor</Card.Title>
              <Card.Subtitle>Doctor Name</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>

    
  );
}


