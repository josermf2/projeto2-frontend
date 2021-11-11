import { Button } from '../Button/Button';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Modal from '../Modal/Modal';

function ModalLogin(){
    const [button, setButton] = useState(true);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return(
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <img className="modal-title" src="/img/camisa10Logo.png"/>
            </Modal.Header>
            <Modal.Body>
            <form className="form-login">
                <input className="input" placeholder="Usuário" type="text"></input>
                <input className="input" placeholder="Senha" type="password"></input>
                <div className="input">Não tem conta?    <Link onClick={handleClose} to="/cadastro">Registre-se</Link></div>
            </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Fechar
            </Button>
                {button && <Button onClick={handleClose} className="navbar-signup" buttonStyle='btn--outline'>Entrar</Button>}
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModalLogin;