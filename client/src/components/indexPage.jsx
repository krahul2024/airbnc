import React , { useState , useEffect } from 'react' 
import { NavLink } from 'react-router-dom'
import Header from '../header.jsx'
import axios from 'axios'

const Index = () => {

	const baseUrl = 'http://localhost:5174/uploads/'

	const [places , setPlaces] = useState([])

	const getPlaces = async ( criteria ) => {
		try{
			const response = await axios.post('/place/places' , 
				{ criteria} , { withCredentials:true})
			const placesList = response.data.places  
			console.log({placesList}) 
			setPlaces([...placesList , ...placesList , ...placesList , ...placesList]) 
		}
		catch(error) {
			console.log({error})
		}
	}

	useEffect(() => {
		getPlaces() 
	},[])

	console.log({places})

	return (

		<div className="mt-12 p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-8">

			{places.length>0 && places.map((place , index) => (
				<div>
					<div className="rounded-2xl flex">
						{place.photos?.[0] && (
							<img className="mb-1 rounded-2xl object-cover aspect-square"
								src={`http://localhost:5174/uploads/${place?.photos[0]}`} alt="place"/>
							)}
					</div>
					<div className="flex flex-col p-2">
						<span className="text-sm font-semibold truncate leading-5"
							>{place.address}</span>
						<span className="text-sm truncate"
							>{place.title}</span>
						
					</div>
				  </div>
				))}

		</div>





		)
}

export default Index 