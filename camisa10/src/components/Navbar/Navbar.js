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

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


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
          <img className="modal-title" src="/img/camisa10Logo.png"/>
        </Modal.Header>
        <Modal.Body>
          <form className="form-login">
            <input className="input" placeholder="Usuário" type="text"></input>
            <input className="input" placeholder="Senha" type="password"></input>
            <div className="input">Não tem conta?    <Link to="/cadastro">Registre-se</Link></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Link to="/cadastro">
            {button && <Button onClick={handleClose} className="navbar-signup" buttonStyle='btn--outline'>Entrar</Button>}
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Navbar

