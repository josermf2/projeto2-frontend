import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import {Link} from 'react-router-dom'
import './Navbar.css';

function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [button, setButton] = useState(true);
  
  const showButton = () => {
    setButton(true);
  };

  useEffect(() => {
    showButton();
  }, []);
  
  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="/img/camisa10Logo.png" alt="camisa 10 logo"/>
          </Link>
          <Link to="/login" className="navbar-signup">
            {button && <Button buttonStyle='btn--outline'>LOGIN</Button>}
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
