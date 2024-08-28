import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const SessionManager = ({ children }) => {
    const [isInactive, setIsInactive] = useState(false);
    const navigate = useNavigate();
    const inactivityTimerRef = useRef(null);
    const promptTimerRef = useRef(null);

    const logout = useCallback(() => {
        // Clear the token and redirect to the login page
        localStorage.removeItem('token');
        navigate('/Login');
    }, [navigate]);

    const promptUserToContinue = useCallback(() => {
        console.log('promptUserToContinue')
        promptTimerRef.current = setTimeout(() => {
            logout(); // User didn't respond within 5 minutes
        }, 5 * 60 * 1000); // 5 minutes prompt
    }, [logout]);

    const resetInactivityTimer = useCallback(() => {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(() => {
            setIsInactive(true);
            promptUserToContinue();
        }, 5 * 60 * 1000); // 15 minutes
    }, [promptUserToContinue]);


    const renewToken = async () => {
        try {
            const response = await fetch('http://localhost:3001/Login', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(localStorage.getItem('user'))
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.newToken);
                setIsInactive(false);
                clearTimeout(promptTimerRef.current);
                resetInactivityTimer();
            } else {
                logout(); // Handle failure in token renewal
            }
        } catch (error) {
            console.error('Token renewal failed', error);
            logout();
        }
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click'];
        const resetTimer = () => resetInactivityTimer();

        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        resetInactivityTimer();

        return () => {
            clearTimeout(inactivityTimerRef.current);
            clearTimeout(promptTimerRef.current);
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [resetInactivityTimer]);

    return (
        <>
            {children}
            {isInactive && (
                <div className="inactivity-modal">
                    <p>Your session is about to expire. Do you want to continue?</p>
                    <button onClick={renewToken}>Continue Session</button>
                </div>
            )}
        </>
    );
};
