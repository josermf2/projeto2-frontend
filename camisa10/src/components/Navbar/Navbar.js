import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import {Link} from 'react-router-dom';
import './Navbar.css';
import ModalLogin from '../ModalLogin/ModalLogin';
import ModalRegistro from '../ModalRegistro/ModalRegistro';
import { BsFillPersonFill } from "react-icons/bs";
import { Dropdown } from 'react-bootstrap';

function Navbar() {
  const [button, setButton] = useState(true);

  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  
  const [userName, setUserName] = useState("");

  const [login, setLogin] = useState(false);
  const loginDone = () => {
    setLogin(true);
    setButton(false);
  }

  const [register, setRegister] = useState(false);

  const handleCallback = (childData) =>{
    setModal(childData)
    setRegister(childData)
  }

  const handleRegisterCallback = (childData) =>{
    setRegister(childData)
  }

  const handleRegisterCallbackClose = (childData) =>{
    setRegister(childData)
  }
  
  const handleLoginCallback = (childData) =>{
    setUserName(childData)
    loginDone()
  }

  const logout = () => {
    setLogin(false);
    setButton(true);
    setUserName("");
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="/img/camisa10Logo.png" alt="camisa 10 logo"/>
          </Link>
          <div>
            <div className="navbar-signup">
              {button && <Button className="navbar-signup" onClick={showModal} buttonStyle='btn--outline'>LOGIN</Button>}
            </div>
            <div className="navbar-signup">
              {login && 
                <Dropdown>
                  <Dropdown.Toggle style={{backgroundColor:'#119b15'}} className="navbar-signup" buttonStyle='btn--outline'>
                    <BsFillPersonFill />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Header>
                      <h5>{userName}</h5>
                    </Dropdown.Header>
                    <Dropdown.Divider />  
                    <Dropdown.Item>
                      <Link to='/favorites'>
                            Favoritos 
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link onClick={logout} to='/'>
                          Sair
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>}
            </div>
          </div>
        </div>
      </nav>
        <div>
          {modal && ( <ModalLogin loginCallback={handleLoginCallback} registerCallback={handleRegisterCallback} parentCallback = {handleCallback}/> )}
        </div>
        <div>
          {register && (<ModalRegistro parentCallback = {handleRegisterCallbackClose}/> )}
        </div>
    </>
  )
}

export default Navbar