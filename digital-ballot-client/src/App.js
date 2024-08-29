import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Layout from './shared/Layout'
import  { useUser } from './context/UserContext'
import './App.css'
import LoginModal from './components/Login/LoginModal'

const App = () => {
		const { loginModalOpen, toggleLoginModal } = useUser()

		return(
			<Layout>
				<LoginModal isOpen={loginModalOpen} toggle={toggleLoginModal} />
					<Routes>
						{AppRoutes.map((route, index) => {
								const { element, ...rest } = route
								return <Route key={index} {...rest} element={element} />
						})}
					</Routes>
				</Layout>
		)
}

export default App