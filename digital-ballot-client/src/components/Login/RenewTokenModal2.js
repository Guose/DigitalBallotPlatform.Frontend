import React, { useCallback } from 'react'
import axios from 'axios'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { useUser } from '../../context/UserContext'

const RenewTokenModal = ({ isOpen, onClose, resetInactivityTimer }) => {
  const { logout } = useUser()
  const authInterval = 1

  const handleContinueSession = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:3001/Auth/renewToken', { token, authInterval })
      
      if (response.data) {
        localStorage.setItem('token', response.data.token)
        resetInactivityTimer()
        onClose()
      } else {
        logout()
      }
    } catch (error) {
      console.error('Token renewal failed', error)
      logout()
    }
  }, [logout, resetInactivityTimer, onClose])

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Your session is about to expire</ModalHeader>
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