// src/components/Login/LoginModal.js
import React, { useState, useEffect, useRef } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useUser } from '../../context/UserContext'
import './styles/login.css'

const LoginModal = ({ isOpen, toggle }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const { login } = useUser()
  const usernameRef = useRef(null)

  useEffect(() => {
    if (isOpen && usernameRef.current) {
      usernameRef.current.focus()
    }

    if (rememberMe) {
      const savedUsername = localStorage.getItem('username')
      const savedPassword = localStorage.getItem('password')
      const savedRememberMe = JSON.parse(localStorage.getItem('rememberMe'))

      if (savedUsername && savedPassword && savedRememberMe) {
        setUsername(savedUsername)
        setPassword(savedPassword)
        setRememberMe(savedRememberMe)
      }
    }
  }, [isOpen, rememberMe])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      if (rememberMe) {
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe))
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        localStorage.removeItem('rememberMe')
      }
      await login(username, password, rememberMe)        
      toggle()
      
    } catch (error) {
        console.error('Login failed in LoginModal', error)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event)
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader >Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label for='username'>Username</Label>
              <Input
                type='text'
                name='username'
                id='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                ref={usernameRef}
                required
                autoFocus
                />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={() => setRememberMe(!rememberMe)} 
                />{' '}
                Remember Me
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type='submit' onClick={handleLogin}>Login</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>              
    </Modal>
  )
}

export default LoginModal
