import React, { useContext , useState , useEffect } from 'react'
import {NavLink , useLocation , useNavigate , useParams} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../UserContext.jsx'  



const SinglePlace = ({place}) => {

	console.log({place}) 
	const addUrl = 'http://localhost:5174/uploads/'
	const photos = []  
	for(let i=0;i<place.photos.length;i++)photos.push(addUrl + place.photos[i])
	console.log({photos})
	let shortDescription = ''
	for(let i=0;i<Math.min(place.description.length,260);i++)shortDescription += place.description[i]

	return (<>

		<NavLink to={'/user/accomodations/' + place._id} target = "_blank" className='flex bg-gray-100 p-3 gap-6 rounded-2xl cursor-pointer'>
		{/*This div is for displaying first image of the place*/}
			<div className="flex justify-center h-32 w-32 bg-gray-200 rounded-2xl gap-2 grow shrink-0">
				{photos.length>0 && (
					<img src={photos[0]} alt="" className='flex justify-center rounded-lg'/>
					)}
			</div>
			<div className="grow-0 shrink">
				<span className="p-2 text-md font-semibold text-cyan-800 flex text-center">{place.title}</span>
				<span className="text-sm">{shortDescription}...</span>
			</div>
			
		</NavLink>

	 </>)
}

export default SinglePlace 