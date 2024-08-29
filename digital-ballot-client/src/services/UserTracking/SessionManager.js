import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { useUser } from '../../context/UserContext'

export const SessionManager = ({ children }) => {
    const [isInactive, setIsInactive] = useState(false)
    const navigate = useNavigate()
    const inactivityTimerRef = useRef(null)
    const promptTimerRef = useRef(null)
    const { logout } = useUser()

    const handleLogout = useCallback(() => {
        console.log('Logging out...')
        setIsInactive(false)
        logout()
    }, [logout])

    const promptUserToContinue = useCallback(() => {
        console.log('prompting user to continue...')
        promptTimerRef.current = setTimeout(() => {
            console.log('No response from user, logging out...')
            handleLogout() // User didn't respond within 5 minutes
        }, 5 * 60 * 1000) // 5 minutes prompt
    }, [handleLogout])

    const resetInactivityTimer = useCallback(() => {
        console.log('Resetting inactivity timer...')
        clearTimeout(inactivityTimerRef.current)
        inactivityTimerRef.current = setTimeout(() => {
            console.log('Inactivity detected, showing modal...')
            setIsInactive(true)
            promptUserToContinue()
        }, 1 * 60 * 1000) // 15 minutes
    }, [promptUserToContinue])


    const handleContinueSession = useCallback(async () => {
        try {
            console.log('Renewing token...-')
            const user = JSON.parse(localStorage.getItem('user'))
            const token = localStorage.getItem('token')

            const response = await fetch('http://localhost:3001/Login', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user })
            })

            if (response.ok) {
                console.log('response for token renew is ok...')
                const data = await response.json()
                localStorage.setItem('token', data.newToken)
                setIsInactive(false)
                clearTimeout(promptTimerRef.current)
                resetInactivityTimer()
            } else {
                console.log('Bad response, logging use out...')
                handleLogout()
            }
        } catch (error) {
            console.error('Token renewal failed', error)
            handleLogout()
        }
    }, [handleLogout, resetInactivityTimer])

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click']
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
        <Modal isOpen={isInactive}>
            <ModalHeader>Your session is about to expire</ModalHeader>
            <ModalBody>
                <p>Your session is about to expire. Do you want to continue?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleContinueSession}>Continue Session</Button>
                <Button color="secondary" onClick={handleLogout}>Logout</Button>
            </ModalFooter>
        </Modal>
        </>
    )
}
