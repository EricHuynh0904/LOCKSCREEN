import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
     
      <ul className="nav col-md-4 justify-content-start list-unstyled d-flex">
        <li className="ms-3">Tài nguyên</li>
        <li className="ms-3">Pháp lý</li>
      </ul>

    
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="me-3"><i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i></li>
        <li className="me-3"><i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i></li>
        <li className="me-3"><i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i></li>
        <li className="me-3"><i className="bi bi-github" style={{ fontSize: '1.5rem' }}></i></li>
      </ul>
    </footer>
  );
}

export default Footer;
