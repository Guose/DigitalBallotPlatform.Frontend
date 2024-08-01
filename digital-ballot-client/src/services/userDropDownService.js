import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import { useUser } from '../context/UserContext'
import LoginModal from '../components/Login/LoginModal'

const UserDropDown = () => {
  const { user, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  const toggleLoginModal = () => setLoginModalOpen(prevState => !prevState);

  return (
    <>
      {user ? (
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="user-dropdown">
          <DropdownToggle caret>
            {user.initials}
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