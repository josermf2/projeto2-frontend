import { Button } from '../Button/Button';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import backend from "../../services/backend";
import './ModalPopUp.css'

function ModalPopUp(props) {
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const closeModal = () => {
      props.parentCallback(false)
      handleClose()
    }
    
    return (
      <>
        <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Body className="popup">Esse campeonato já está nos seus favoritos</Modal.Body>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ModalPopUp