import { Button } from '../Button/Button';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

function ModalLogin(props){ 
    const [button, setButton] = useState(true);

    const [show, setShow] = useState(true);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onTrigger = (event) => {
        props.parentCallback(false);
    }

    const onTriggerRegister = (event) => {
        props.parentCallback(false);
        props.registerCallback(true);
    }


    const closeModal = () => {
        onTrigger()
        handleClose()
    }

    const openRegister = () => {
        onTriggerRegister()
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
                    <div className="input">Não tem conta?   
                        <span> </span>

                        <Link onClick={openRegister} to=''>
                            Registre-se 
                        </Link>
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Fechar
                </Button>
                <Link to="/">
                    {button && <button onClick={closeModal} className="navbar-signup" buttonStyle='btn--outline'>BsFillPersonFill</button>}
                </Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalLogin;