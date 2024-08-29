import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { useUser } from '../../context/UserContext'
import axios from 'axios'

export const SessionManager = ({ children }) => {
    const [isInactive, setIsInactive] = useState(false)
    const inactivityTimerRef = useRef(null)
    const promptTimerRef = useRef(null)
    const { logout } = useUser()
    const authInterval = 1

    const handleLogout = useCallback(() => {
        console.log('Logging out...')
        setIsInactive(false)
        logout()
    }, [logout])

    const promptUserToContinue = useCallback(() => {
        console.log('prompting user to continue...')
        promptTimerRef.current = setTimeout(() => {
            console.log('No response from user, logging out...')
            setIsInactive(false)
            handleLogout() // User didn't respond within 5 minutes
        }, 5 * 60 * 1000) // 5 minutes prompt
    }, [setIsInactive, handleLogout])

    const resetInactivityTimer = useCallback(() => {
        console.log('Resetting inactivity timer...')
        clearTimeout(inactivityTimerRef.current)
        inactivityTimerRef.current = setTimeout(() => {
            console.log('Inactivity detected, showing modal...')
            setIsInactive(true)
            promptUserToContinue()
        }, 20 * 60 * 1000) // 15 minutes
    }, [promptUserToContinue])


    const handleContinueSession = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')

            const response = await axios.post('http://localhost:3001/Auth/renewToken', { token, authInterval})
            if (response.data) {
                console.log('response for token renew is ok...')
                localStorage.setItem('token', response.data.token)
                setIsInactive(false)
                clearTimeout(promptTimerRef.current)
                resetInactivityTimer()
            } else {
                console.log('Bad response, logging user out...')
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
            </ModalFooter>
        </Modal>
        </>
    )
}
