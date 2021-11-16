import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import {Link} from 'react-router-dom';
import './Navbar.css';
import ModalLogin from '../ModalLogin/ModalLogin';
import ModalRegistro from '../ModalRegistro/ModalRegistro';
import { BsFillPersonFill } from "react-icons/bs";
import { Dropdown } from 'react-bootstrap';
import backend from "../../services/backend";
import ModalPopUp from '../../components/ModalPopUp/ModalPopUp'

function Navbar(props) {

  
  const [button, setButton] = useState(true);

  const [modal, setModal] = useState(false);
  const [modalPopUp, setModalPopUp] = useState(false);

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
  const handleModalPopUpCallback = (childData) =>{
    setModalPopUp(childData)
  }
  
  const handleRegisterCallback = (childData) =>{
    setRegister(childData)
  }

  const handleRegisterCallbackClose = (childData) =>{
    setRegister(childData)
  }
  
  const handleLoginCallback = (childData) =>{
    setUserName(childData)
    props.userName(childData);
    loginDone()
  }

  const logout = () => {
    setLogin(false);
    setButton(true);
    props.userName("");
    setUserName("");
  }


  const postFavorite = (code) => {
    backend.get('/favorite/'+userName).then((response) => {
      var favoriteList = []
      for (var i = 0; i < response.data.length; i++) {
        favoriteList.push(response.data[i].tournament)
      }
      if (favoriteList.includes(code)){
        setModalPopUp(true)
      } else {
        backend.post('/favorite', {user:userName, tournament:code}).then((response) => {
          console.log(response)
        })
      }
    })
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
            <div className='buttons'>
              <div className="navbar-signup">
                {login && 
                  <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor:'#119b15'}} className="navbar-signup" buttonStyle='btn--outline'>
                      <h9>Adicionar Favoritos</h9>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Header>
                        <h9>Adicionar Favoritos</h9>
                      </Dropdown.Header>
                      <Dropdown.Divider />  
                      <Dropdown.Item onClick={() => postFavorite('2002')}><Link to='/'>Bundesliga</Link></Dropdown.Item>
                      <Dropdown.Item onClick={() => postFavorite('2003')}><Link to='/'>Eredivisie</Link></Dropdown.Item>
                      <Dropdown.Item onClick={() => postFavorite('2013')}><Link to='/'>Campeonato Brasileiro Série A</Link></Dropdown.Item>
                      <Dropdown.Item onClick={() => postFavorite('2014')}><Link to='/'>Primera Division</Link></Dropdown.Item>
                      <Dropdown.Item onClick={() => postFavorite('2015')}><Link to='/'>Ligue 1</Link></Dropdown.Item>
                      <Dropdown.Item onClick={() => postFavorite('2017')}><Link to='/'>Primeira Liga</Link></Dropdown.Item>
                      <Dropdown.Item onClick={() => postFavorite('2019')}><Link to='/'>Serie A</Link></Dropdown.Item>
                      <Dropdown.Item onClick={() => postFavorite('2021')}><Link to='/'>Premier League</Link></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>}
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
        </div>
      </nav>
        <div>
          {modal && ( <ModalLogin loginCallback={handleLoginCallback} registerCallback={handleRegisterCallback} parentCallback = {handleCallback}/> )}
        </div>
        <div>
          {register && (<ModalRegistro parentCallback = {handleRegisterCallbackClose}/> )}
        </div>
        <div>
          {modalPopUp && (<ModalPopUp parentCallback = {handleModalPopUpCallback}/> )}
        </div>
    </>
  )
}

export default Navbar