import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Layout from './shared/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {

		return(
			<>
				<Layout>
					<Routes>
						{AppRoutes.map((route, index) => {
								const { element, ...rest } = route
								return <Route key={index} {...rest} element={element} />
						})}
					</Routes>
				</Layout>
				<ToastContainer />
			</>
		)
}

export default App