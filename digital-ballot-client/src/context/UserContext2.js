import axios from 'axios'
import React, { createContext, useState, useEffect, useContext } from 'react'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [bearerToken, setBearerToken] = useState('')
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (storedToken && !user && userId) {
        try {
          const response = await axios.get(`http://localhost:3001/User/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          setUser(response.data)
          localStorage.setItem('user', response.data)
          console.log('initial if statement closes LoginModal')
          setLoginModalOpen(false)

        } catch (error) {
          console.error('Failed to get user:', error)
          console.log('catch opens LoginModal')
          setLoginModalOpen(true)
        }
      } else if (!storedToken || !userId) {
        console.log('if else - no token or userId found: opens LoginModal')
        setLoginModalOpen(true)
      }
    }

    fetchData()
  }, [user])

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (bearerToken) {
          config.headers.Authorization = `Bearer ${bearerToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
    }
  }, [bearerToken])

  const login = (userData, userToken) => {
    console.log('In memory User:', localStorage.getItem('user'))
    console.log('userToken:', userToken)
    setUser(userData)
    setBearerToken(userToken)
    localStorage.setItem('token', userToken)
    localStorage.setItem('userId', userData.id)
    console.log('login function closes LoginModal')
    setLoginModalOpen(false)
  }

  const logout = () => {
    // localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setUser(null)
    setBearerToken('')
    setLoginModalOpen(false)
  }

  const toggleLoginModal = () => setLoginModalOpen(prevState => !prevState)

  return (
    <UserContext.Provider value={
      {
        user, 
        bearerToken, 
        login, 
        logout, 
        loginModalOpen,
        toggleLoginModal,      
      }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext }