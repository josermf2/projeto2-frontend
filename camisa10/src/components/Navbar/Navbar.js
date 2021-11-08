import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Modal from "react-bootstrap/Modal";

function Navbar() {
  const [button, setButton] = useState(true);
  
  const showButton = () => {
    setButton(true);
  };

  useEffect(() => {
    showButton();
  }, []);
  
  window.addEventListener('resize', showButton);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="/img/camisa10Logo.png" alt="camisa 10 logo"/>
          </Link>
          <div className="navbar-signup">
            {button && <Button className="navbar-signup" onClick={handleShow} buttonStyle='btn--outline'>LOGIN</Button>}
          </div>
        </div>
      </nav>
      <Modal show={show} onHide={handleClose} style={{opacity:1}}>
        <Modal.Header closeButton>
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-login">
            <input className="input" placeholder="Usuário" type="text"></input>
            <input className="input" placeholder="Senha" type="text"></input>
            <div className="input">Não tem conta?    <Link>Registre-se</Link></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          {button && <Button className="navbar-signup" onClick={handleClose} buttonStyle='btn--outline'>Login</Button>}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Navbar

