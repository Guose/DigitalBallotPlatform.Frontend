import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (token !== null && userId !== null) {
        await axios.get(`http://localhost:3001/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          console.log('response.data:', response.data)
          setUser(response.data)
        })
        .catch(err => {
          console.log('Failed to get user', err)
          alert('Failed to get user', err)
        })
      }
    }
    fetchData()

  }, [])

  const login = (userData) => {
    console.log('login in UserContext.js', userData)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{user, login, logout}}>
      {children}
    </UserContext.Provider>
  );
}
