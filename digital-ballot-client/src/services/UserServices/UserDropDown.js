import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import { useUser } from '../../context/UserContext'
import '../../shared/styles/userDropDown.css'

const UserDropDown = () => {
  const { user, logout, toggleLoginModal, rememberUser } = useUser()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userInitials, setUserInitials] = useState('')

  useEffect(() => {
    if (user !== null) {
      setUserInitials(user.firstname[0] + user.lastname[0])
    }
  }, [user])

  const handleLogout = () => {
    if (!rememberUser) {
      localStorage.removeItem('username')
      localStorage.removeItem('password')
      localStorage.removeItem('rememberMe')
    }
    logout(true, false)
  }

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
            <DropdownItem>Profile (Coming Soon)</DropdownItem>
            <DropdownItem>Settings (Coming Soon)</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <button onClick={toggleLoginModal} className="login-button">Login</button>
      )}
    </>
  )
}

export default UserDropDown