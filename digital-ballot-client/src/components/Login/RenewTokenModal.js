// src/components/Login/RenewTokenModal.js
import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const RenewTokenModal = ({ isOpen, onClose, renewToken }) => {

  const handleContinueSession = async () => {
    await renewToken()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Your session is about to expire</ModalHeader>
      <ModalBody>
        <p>Your session is about to expire. Do you want to continue?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleContinueSession}>Continue Session</Button>
      </ModalFooter>
    </Modal>
  )
}

export default RenewTokenModal
