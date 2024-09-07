import React, { createContext, useState, useEffect, useCallback, useContext } from 'react'
import Cookies from 'js-cookie'
import axios from '../api/axios'
import { toast } from 'react-toastify'

const UserContext = createContext()
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
    const [rememberUser, setRememberUser] = useState(false)
    const [loginModalOpen, setLoginModalOpen] = useState(false)

    const login = async (username, password, rememberMe) => {
        try {
            const response = await axios.post('/Auth/authenticateUser', {
                username,
                password,
                authInterval: 2,
                rememberMe,
            })          

            if (response.data && response.data.token && response.data.user) {
                setToken(response.data.token)
                setUser(response.data.user)

                const cookieOptions = rememberMe ? { expires: 1 } : {}
                Cookies.set('authToken', token, cookieOptions)
                setRememberUser(rememberMe)                

                return response.data
            } else {
                console.error('Unexpected response structure:', response.data)
                return null
            }
        } catch (error) {
            console.error('Login failed', error)
            toast.error('Login failed, please check your credentials and try again.', {
                position: 'bottom-left',
                autoClose: 5000, // Auto close after 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
        }
    }

    const logout = async (manualLogout = false, isInactive = false) => {
        try {
            if (manualLogout || isInactive) {
                Cookies.remove('authToken')
                if (!rememberUser || (!manualLogout && isInactive)) {
                    localStorage.removeItem('username')
                    localStorage.removeItem('password')
                    localStorage.removeItem('rememberMe')

                    const response = await axios.post('/Auth/logout')
                    console.log('Auth/logout response:', response.data)
                }
                setToken('')
                setUser(null)
            }
            setLoginModalOpen(false)
            console.log('token after logging out: ', token)
            
        } catch (error) {
            console.error('Logout failed', error)
        }
    }

    const toggleLoginModal = () => setLoginModalOpen(prev => !prev)

    const fetchUser = useCallback(async () => {
        const authToken = Cookies.get('authToken') 
        if (authToken) {
            try {
                const response = await axios.get('http://localhost:3001/Auth/me', authToken, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    },
                })           
                setToken(authToken)
                setUser(response.data.user)
            } catch (error) {
                console.log('Error: ', error)          
            }
        } 
        
    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return (
        <UserContext.Provider value={{
            user,
            rememberUser,
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


// toast.success('Please wait - Logging you in...', {
                //     position: 'top-center',
                //     autoClose: 1000, // auto-close after 3 seconds
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //   })