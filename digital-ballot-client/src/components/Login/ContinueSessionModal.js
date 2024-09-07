// src/components/Login/RenewTokenModal.js
import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { useUser } from '../../context/UserContext'

const ContinueSessionModal = ({ isOpen, toggle, renewToken }) => {
  const { logout } = useUser()

  const handleContinueSession = async () => {
    await renewToken()
    toggle()
  }

  const handleLogout = async () => {
    await logout(true, false)    
    toggle()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Your session is about to expire</ModalHeader>
      <ModalBody>
        <p>Your session is about to expire. Do you want to continue?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleContinueSession}>Continue Session</Button>
        <Button color="primary" onClick={handleLogout}>Logout</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ContinueSessionModal
