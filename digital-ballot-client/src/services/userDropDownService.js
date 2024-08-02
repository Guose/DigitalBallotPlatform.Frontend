import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import { useUser } from '../context/UserContext'
import LoginModal from '../components/Login/LoginModal'
import '../shared/styles/userDropDown.css'

const UserDropDown = () => {
  const { user, logout, loginModalOpen, toggleLoginModal } = useUser()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userInitials, setUserInitials] = useState('')

  useEffect(() => {
    if (user !== null) {
      console.log('user', user)
      setUserInitials(user.firstname[0] + user.lastname[0])
    }
  }, [user])

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState)


  return (
    <>
      {user ? (
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="user-dropdown">
          <DropdownToggle className='user-emblem'>
            {userInitials}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{user.name}</DropdownItem>
            <DropdownItem>Settings (Coming Soon)</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <button onClick={toggleLoginModal} className="login-button">Login</button>
      )}
      <LoginModal isOpen={loginModalOpen} toggle={toggleLoginModal} />
    </>
  )
}

export default UserDropDown