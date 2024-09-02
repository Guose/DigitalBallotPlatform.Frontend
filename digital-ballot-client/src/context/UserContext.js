import React, { createContext, useState, useEffect, useCallback, useContext } from 'react'
import Cookies from 'js-cookie'
import axios from '../api/axios'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
    // const [rememberMe, setRememberMe] = useState(false)
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const authInterval = 2

    const login = async (username, password, rememberMe) => {
        try {
            const response = await axios.post('/Auth/authenticateUser', {
                username,
                password,
                authInterval,
                rememberMe,
            })          

            if (response.data && response.data.token && response.data.user) {
                const token = response.data.token
                setToken(token)
                setUser(response.data.user)

                const cookieOptions = rememberMe ? { expires: 1 } : {}
                Cookies.set('authToken', token, cookieOptions)

                return response.data
            } else {
                console.error('Unexpected response structure:', response.data)
                return null
            }
        } catch (error) {
            console.error('Login failed', error)
            alert('Login failed, please check your credentials and try again.')
        }
    }

    const logout = async () => {
        try {
            await axios.post('/Auth/logout')
        } catch (error) {
            console.error('Logout failed', error)
        } finally {
            setUser(null)
            setLoginModalOpen(false)
        }
    }

    const toggleLoginModal = () => setLoginModalOpen(prev => !prev)

    const fetchUser = useCallback(async () => {
        try {
            const token = Cookies.get('authToken')

            if (token) {
                setToken(token)
            }
            const response = await axios.get('http://localhost:3001/Auth/me', token, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                      
            setUser(response.data.user)

        } catch (error) {
            setTimeout(() => {
                setUser(null)
                alert('Please log in.')
            }, 1 * 60 * 1000)            
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return (
        <UserContext.Provider value={{
            user,
            token,
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
