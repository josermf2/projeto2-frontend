import { Button } from '../Button/Button';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

function ModalRegistro(props){
    const [button, setButton] = useState(true);

    const [show, setShow] = useState(true);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onTrigger = (event) => {
        props.parentCallback(false);
    }

    const closeModal = () => {
        onTrigger()
        handleClose()
    }

    return(
        <>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                <img className="modal-title" src="/img/camisa10Logo.png"/>
                </Modal.Header>
                <Modal.Body>
                <form className="form-login">
                    <input className="input" placeholder="Usuário" type="text"></input>
                    <input className="input" placeholder="Senha" type="password"></input>
                    <input className="input" placeholder="Confirmar senha" type="password"></input>                    
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Fechar
                </Button>
                    {button && <Button onClick={closeModal} className="navbar-signup" buttonStyle='btn--outline'>Registrar</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalRegistro;