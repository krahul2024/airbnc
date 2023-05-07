import React , {useState, useEffect , useContext} from 'react'  
import { NavLink , useLocation , useNavigate , useParams} from 'react-router-dom'
import axios from 'axios'  
import {UserContext} from '../UserContext.jsx'
import Place from './place.jsx'


const Profile = () => {

	const navigate = useNavigate() 
	const location = useLocation()
	const {profile , ready , setReady , setProfile } = useContext(UserContext)
	const {subpage } = useParams() 

	//the thing is fastest loading when working in dev on device then it takes approx 20ms to load the 
	//information and due to this when refreshed our page will display error so we are using ready with 
	//2 if conditions such that if one is executed and displays loading , event then next one will be displayed 
	if(!ready) {
		return <div className="text-cyan-800 text-lg font-semibold">Loading....</div>
	}

	if(ready && !profile){ 
		 navigate("/login")
		
	}//redirecting to login page in case if the user is not logged in

	//this function is for setting when a particular section is clicked then to style only that section and leave others
	function presentClass(url) {
		let classes = 'inline-flex text-center items-center bg-gray-200 gap-3 px-6 py-2 text-cyan-800 font-semibold rounded-full'
		if(url === subpage) return `inline-flex text-center items-center gap-3 px-6 py-2 text-cyan-800 font-semibold text-white bg-cyan-800 rounded-full` 
		return classes
	} 

	const logout = async (e) => {
		e.preventDefault() 
		const response = await axios.post('/user/logout' ,{username:profile.username},{withCredentials:true})  
		console.log(response.data) 
		setProfile(null)
		location.window.reload() 
		navigate("/login")
	}

	const update = (e) => {
		e.preventDefault() 

		console.log('This is updating user information')
	}

	return (<>

		<nav className="flex w-full justify-center p-12 gap-4"> 
			<NavLink to = {`/user/profile`}  
				className={presentClass('profile')}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
				</svg>
				My Profile
				 </NavLink >

			<NavLink to={'/user/bookings'}
				className={presentClass('bookings')}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
				</svg>
				My Bookings
				</NavLink>

			<NavLink to={`/user/accomodations`}
				className={presentClass('accomodations')}> 
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
				</svg>
				My Accomodations
				</NavLink>
		</nav>

		{/* from here we are displaying various things like logout option and other things*/}
		{
			subpage === 'profile' && (
					<div className="p-6 flex flex-col justify-center">
						<span className="flex justify-center font-semibold text-sky-800">Name: {profile.name}</span>
						<span className="flex justify-center font-semibold text-sky-800">Username: {profile.username}</span>
						<div className="flex flex-col items-center">
							<button onClick = { (e) => update(e) }
								className="mx-12 px-2 py-1 mt-3 bg-sky-800 w-[180px] text-gray-200 rounded-full">Update Profile</button>
							<button onClick = { (e) => logout(e) }
								className="mx-12 px-2 py-1 bg-sky-800 mt-2 w-[180px] text-gray-200 rounded-full">Log Out</button>
						</div>
							
					</div>
				)
		}
		{
			subpage === 'accomodations' && (

				<div>
						< Place />
				</div>

				)
		}

	</>)
}

export default Profile