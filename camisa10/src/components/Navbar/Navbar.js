import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import {Link} from 'react-router-dom';
import './Navbar.css';
import ModalLogin from '../Modal/Modal';

function Navbar() {
  const [button, setButton] = useState(true);
  
  const showButton = () => {
    setButton(true);
  };

  useEffect(() => {
    showButton();
  }, []);

  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="/img/camisa10Logo.png" alt="camisa 10 logo"/>
          </Link>
          <div className="navbar-signup">
            {button && <Button className="navbar-signup" onClick={showModal} buttonStyle='btn--outline'>LOGIN</Button>}
          </div>
        </div>
      </nav>
      <div show={modal}>
        <ModalLogin />
      </div>
    </>
  )
}

export default Navbar

