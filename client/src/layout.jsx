import React from 'react' 
import Header from './header.jsx'
import { Outlet } from 'react-router-dom'


const Layout = () => {
	return (<>

		<div className="px-8 flex flex-col min-h-screen py-4">

		<Header /> 

		<Outlet /> 

		</div>

	 </>)
}


export default Layout 