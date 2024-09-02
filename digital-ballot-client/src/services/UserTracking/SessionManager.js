// src/components/SessionManager.js
import React, { useEffect, useState, useRef, useCallback } from 'react'
import RenewTokenModal from '../../components/Login/RenewTokenModal'
import LoginModal from '../../components/Login/LoginModal'
import { useUser } from '../../context/UserContext'
import axios from '../../api/axios'

export const SessionManager = ({ children }) => {
    const [isInactive, setIsInactive] = useState(false)
    const inactivityTimerRef = useRef(null)
    const promptTimerRef = useRef(null)
    const { logout, loginModalOpen, toggleLoginModal } = useUser()

    const handleLogout = useCallback(() => {
        console.log('Logging out...')
        logout()
    }, [logout])

    const promptUserToContinue = useCallback(() => {
        console.log('Prompting user to continue...')
        
        promptTimerRef.current = setTimeout(() => {
            console.log('No response from user, logging out...')
            setIsInactive(false)
            handleLogout() // User didn't respond within 5 minutes
        }, 5 * 60 * 1000) // 5 minutes prompt
    }, [handleLogout])

    const resetInactivityTimer = useCallback(() => {
        console.log('Resetting inactivity timer...')
        clearTimeout(inactivityTimerRef.current)
        clearTimeout(promptTimerRef.current)
        inactivityTimerRef.current = setTimeout(() => {
            console.log('Inactivity detected, showing modal...')
            setIsInactive(true)
            promptUserToContinue()
        }, 20 * 60 * 1000) // 15 minutes
    }, [promptUserToContinue])

    const renewToken = useCallback(async () => {
        try {
            const response = await axios.post('/Auth/renewToken')
            console.log(response.data.message)
            setIsInactive(false)
            resetInactivityTimer()
        } catch (error) {
            console.error('Token renewal failed', error)
            setIsInactive(false)
            handleLogout()
        }
    }, [handleLogout, resetInactivityTimer])

    useEffect(() => {
        const events = ['keydown', 'click']
        const resetTimer = () => resetInactivityTimer()

        events.forEach((event) => {
            window.addEventListener(event, resetTimer)
        })

        resetInactivityTimer()

        return () => {
            clearTimeout(inactivityTimerRef.current)
            clearTimeout(promptTimerRef.current)
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer)
            })
        }
    }, [resetInactivityTimer])

    return (
        <>
            {children}
            <RenewTokenModal
                isOpen={isInactive}
                onClose={() => setIsInactive(false)}
                renewToken={renewToken}
            />
            <LoginModal isOpen={loginModalOpen} toggle={toggleLoginModal} />
        </>
    )
}
