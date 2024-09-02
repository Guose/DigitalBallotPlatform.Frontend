import React, { useState, useEffect, useRef } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { useUser } from '../../context/UserContext2'
import './login.css'

const LoginModal = ({ isOpen, toggle }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const { login } = useUser()
  const authInterval = 2
  const usernameRef = useRef(null)

  useEffect(() => {
    if (isOpen && usernameRef.current) {
      usernameRef.current.focus()
    }
  }, [isOpen])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const response = await axios.post('http://localhost:3001/Auth/authenticateUser', { username, password, authInterval })
      const userToken  = response.data.token
      const userData = response.data.user
      localStorage.setItem('user', JSON.stringify(userData))
      login(userData, userToken)


    } catch (error) {
      console.error('Login failed', error)
      alert('Login failed, please check your credentials and try again.')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Return') {
      handleLogin(event)
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Login</ModalHeader>
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
                  type='checkbox'
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