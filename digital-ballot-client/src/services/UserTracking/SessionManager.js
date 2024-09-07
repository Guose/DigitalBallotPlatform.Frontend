// src/components/SessionManager.js
import React, { useEffect, useState, useRef, useCallback } from 'react'
import ContinueSessionModal from '../../components/Login/ContinueSessionModal'
import LoginModal from '../../components/Login/LoginModal'
import { useUser } from '../../context/UserContext'
import axios from '../../api/axios'

export const SessionManager = ({ children }) => {
    const [isActive, setIsActive] = useState(false)
    const inactivityTimerRef = useRef(null)
    const promptTimerRef = useRef(null)
    const {
        token,
        logout, 
        loginModalOpen, 
        toggleLoginModal,
    } = useUser()

    const promptUserToContinue = useCallback(() => {
        console.log('Prompting user to continue...')
        
        promptTimerRef.current = setTimeout(() => {
            console.log('No response from user...')
            setIsActive(false)
            logout(false, true) // User didn't respond within 5 minutes
        }, 1 * 60 * 1000) // 5 minutes prompt
    }, [logout])

    const resetInactivityTimer = useCallback(() => {
        if (token) {
            console.log('Resetting inactivity timer...')
            clearTimeout(inactivityTimerRef.current)
            clearTimeout(promptTimerRef.current)
            inactivityTimerRef.current = setTimeout(() => {
                console.log('Inactivity detected, showing modal...')
                setIsActive(true)
                promptUserToContinue()
            }, 1 * 60 * 1000) // 15 minutes
        }
    }, [promptUserToContinue, token])

    const renewToken = useCallback(async () => {
        try {
            const response = await axios.post('/Auth/renewToken', token)
            console.log('response.data for S.M. renewToken: ', response.data)
            setIsActive(false)
            resetInactivityTimer()
        } catch (error) {
            console.error('Token renewal failed', error)
        }
    }, [resetInactivityTimer, token])

    useEffect(() => {
        if (token) {
            const events = ['keydown', 'click']
            const resetTimer = () => resetInactivityTimer()

            events.forEach(event => window.addEventListener(event, resetTimer))

            resetInactivityTimer()

            return () => {
                clearTimeout(inactivityTimerRef.current)
                clearTimeout(promptTimerRef.current)
                events.forEach(event => window.removeEventListener(event, resetTimer))
            }
        }
    }, [resetInactivityTimer, token])

    return (
        <>
            {children}
            <ContinueSessionModal
                isOpen={isActive}
                toggle={() => setIsActive(false)}
                renewToken={renewToken}
            />

            <LoginModal 
                isOpen={loginModalOpen} 
                toggle={toggleLoginModal} 
            />
        </>
    )
}
