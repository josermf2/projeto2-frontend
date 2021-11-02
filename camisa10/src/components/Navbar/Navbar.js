import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import {Link} from 'react-router-dom'
import './Navbar.css';

function Navbar() {
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
          <div className="navbar-signup">
            {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
