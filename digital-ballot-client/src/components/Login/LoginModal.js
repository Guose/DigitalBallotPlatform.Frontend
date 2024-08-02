import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { useUser } from '../../context/UserContext'
import './login.css'

const LoginModal = ({ isOpen, toggle }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useUser()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/Login', { username, password })
      const userToken  = response.data.token
      const userData = response.data.user
      login(userData, userToken)
    } catch (error) {
      console.error('Login failed', error)
      alert('Login failed, please check your credentials and try again.')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='username'>Username</Label>
              <Input
                type='text'
                name='username'
                id='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
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
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleLogin}>Login</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>              
    </Modal>
  )
}

export default LoginModal