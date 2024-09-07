import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LoginModal from '../components/Login/LoginModal';

export const ProtectedRouteService = ({ element: Component, ...rest }) => {
  const { user, loginModalOpen, setLoginModalOpen } = useUser()

  if (!user) {
    setLoginModalOpen(true)
    return <Navigate to="/" />;
  }

  return (
    <>
      <Component {...rest} />
      <LoginModal isOpen={loginModalOpen} toggle={() => setLoginModalOpen(false)} />
    </>
  )
}
