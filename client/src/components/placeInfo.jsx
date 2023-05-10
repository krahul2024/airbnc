import React, { useContext , useState , useEffect } from 'react'
import {NavLink , useLocation , useNavigate , useParams} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../UserContext.jsx'  

const PlaceInfo = ({action}) => {

	if(!action) return <div>No such place found! Please try again.</div>
	const [place , setPlace ] = useState(null) 
	
	const getPlace = async() => {
		const response = await axios.get('/place/places/'+action , {} , {withCredentials:true})
		const result = response.data  
		// console.log({result})  
		if(result.success) setPlace(result.place) 
	}

	useEffect(() => {
		getPlace() 
	}, [])

	console.log({place})

	return ( <>

		{place && (
			<div>
				<span>{place.title}</span>
			</div>

			)}

		</>)
}

export default PlaceInfo 