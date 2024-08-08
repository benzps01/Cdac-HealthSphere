import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container" style={{margin:"auto"}}>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6text-md-end">
            <ul className="list-unstyled d-flex mb-0">
              <li className="ms-3"><a className="text-white" href="/about">About Us</a></li>
              <li className="ms-3"><a className="text-white" href="/contact">Contact</a></li>
              <li className="ms-3"><a className="text-white" href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;