import axios from 'axios'
import React, { createContext, useState, useEffect, useContext } from 'react'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [bearerToken, setBearerToken] = useState(localStorage.getItem('token'))
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      console.log('Initial storedToken:', storedToken)
      console.log('Initial userId:', userId)

      if (storedToken && !user && userId) {
        try {
          const response = await axios.get(`http://localhost:3001/User/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          setUser(response.data)
        } catch (error) {
          console.error('Failed to get user:', error)
          setLoginModalOpen(true)
        }
      } else if (!storedToken || !userId) {
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
    console.log('login in UserContext.js', userData)
    setUser(userData)
    setBearerToken(userToken)
    localStorage.setItem('token', userToken)
    localStorage.setItem('userId', userData.id)
    setLoginModalOpen(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setUser(null)
    setBearerToken(null)
    setLoginModalOpen(true)
  }

  const toggleLoginModal = () => setLoginModalOpen(prevState => !prevState)

  return (
    <UserContext.Provider value={{user, bearerToken, login, logout, loginModalOpen, toggleLoginModal }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext }