import React, { useContext , useState } from 'react'
import {NavLink , useLocation , useNavigate , useParams} from 'react-router-dom'
import Perks from './perks.jsx'
import axios from 'axios'

const Place = () => {
	const navigate = useNavigate() 
	const {action } = useParams() 
	const [title , setTitle] = useState('')
	const [address , setAddress] = useState('')
	const [addedPhotos , setAddedPhotos] = useState([]) 
	const [photoLink , setPhotoLink] = useState('') 
	const [description , setDescription] = useState('')
	const [perks , setPerks] = useState([])
	const [extraInfo , setExtraInfo] = useState('') 
	const [checkIn , setCheckIn] = useState('')
	const [checkOut , setCheckOut] = useState('')
	const [maxGuests , setMaxGuests] = useState(1)
	const [redirect , setRedirect] = useState(null)
	const [refresh , setRefresh] = useState(false) 
	// const [uploadedPhotos , setUploadedPhotos] = useState([]

	function inputTitleAndDescription(title , description) {
		return (
			<>
				<h1 className="p-2 text-xl font-semibold text-sky-800">{title}</h1>
				<p className="px-3 -mt-1 text-sm text-sky-800">{description}</p>
			</>
			
		)
	}

	const addPhotoByLink = async(e) => {
		e.preventDefault()
		console.log(photoLink)
		const response = await axios.post('/place/uploadByLink' , {
			imageLink : photoLink
		})
		const filename = response.data.filename
		console.log({filename})
		//adding added photo to list of photos
		setAddedPhotos( prev => {
			return [...prev , filename]
		})
		setPhotoLink('')

	}

	const uploadPhoto = async(e) => {
		e.preventDefault() 
		const files = e.target.files 

		const data = new FormData() 

		for (let i = 0; i < files.length; i++) {
			console.log(files[i])
		 	data.append('photos' , files[i])
		 } 

		const response = await axios.post('/place/upload' , data , {
		 	headers:{
		 		'Content-Type':'multipart/form-data'
		 	}
		 })

		console.log({responsefromserver:response.data})
		const filenames = response.data.filenames
		setAddedPhotos(previous => {
			return [...previous , ...filenames]
		})

	}

	const addPlace = async(e) => {
		e.preventDefault() 
		const placeData = {
			title ,address , addedPhotos , description , perks , 
			extraInfo , checkIn , checkOut , maxGuests 
		}

		console.log({placeData})

		const response = await axios.post('/place/new' , {data:placeData} , {withCredentials:true}) 
		const {data } = response  
		console.log(data) 
		if(data.success) {
			setRefresh(true) 
			navigate('/user/accomodations')
		}
	}
	if(refresh){
		 setRefresh(false) 
		 window.location.reload()
		}
	

	return (<> 

		<div className="">
			{
				action!== 'new' && (

			<div className="text-center">
				<NavLink  className="inline-flex gap-2 bg-cyan-800 rounded-full py-2 px-6 text-white text-sm"
					to={'/user/accomodations/new'}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
					  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>

					Add New Place
				</NavLink>
			</div>		
			)}

			{
				action === 'new' && (

					<div>
						<form className="flex flex-col justify-around p-2 md:p-12 lg:p-16">
							<div className="p-2">
								{ inputTitleAndDescription('Title' , 'title for your place, short and catchy')}
								<input type="text" placeholder="Title" name="title"
									 value = {title} onChange = {(e) => setTitle(e.target.value)}
								 className="w-2/3 text-cyan-700 py-2 px-4 m-3 outline-0 rounded-xl py-1 px-4 shadow-2xl border-2 shadow-gray-200 backdrop-brightness-150"
								/>
							</div>

							<div className="p-2">
								{inputTitleAndDescription('Address' , 'address of the place , descriptive address serves as guide for guests.')}
								<input type="text" placeholder="Address" name="address" 
									value = {address}	onChange={(e) => setAddress(e.target.value)}
								 className="w-2/3 text-cyan-700 py-2 px-4 m-3 outline-0 rounded-xl py-1 px-4 shadow-2xl border-2 shadow-gray-200 backdrop-brightness-150"
								/>
							</div>

							<div className="p-2">
								{inputTitleAndDescription('Add Photos','photos are best description of your place as guests get to see how place looks and other things.')}
								<input type="text" placeholder="Add photos using link.." name="photoLink"
									value = {photoLink} onChange = {(e) => setPhotoLink(e.target.value)}
								 className="w-2/3 text-cyan-700 py-2 px-4 m-3 outline-0 rounded-xl py-1 px-4 shadow-2xl border-2 shadow-gray-200 backdrop-brightness-150"
								/>
								<button onClick = {(e) => addPhotoByLink(e)}
									className="bg-cyan-800 text-white px-3 py-2.5 rounded-xl w-auto mx-auto shadow-2xl"
									>Add photo</button>


								<div className="mt-2 grid gap-1 p-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center">
										{addedPhotos.length > 0 && addedPhotos.map((photo , index) => (
											<div className="" key = {index} >
												<img className="brightness-125 backdrop-brightness-150 cursor-pointer rounded-xl flex h-40 w-full object-center"
											 		src = { `http://localhost:5174/uploads/${photo}`} />
											</div>
										
										))}
									<label className="cursor-pointer flex px-6 py-14 justify-center shadow-md shadow-gray-300 rounded-2xl min-h-full items-center">
										<input type="file" multiple className="hidden" onChange = {uploadPhoto} />
										<span className="text-cyan-800 flex gap-2">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
											</svg>
											upload</span>
									</label>
								</div>
							</div>

							<div className="p-2">
								{inputTitleAndDescription('Description of the place','describe your place, what are special things, catchy descriptions tend to attract guests but keep it real.')}
								<textarea placeholder="Describe your place.." name="description"
									value = {description} onChange = {(e) => setDescription(e.target.value)}
								 className="w-2/3 text-cyan-700 py-2 px-4 m-3 outline-0 rounded-xl py-1 px-4 shadow-2xl border-2 shadow-gray-200 backdrop-brightness-150"
								/>
							</div>
                             {/* list of all the perks to be checked */}
							<Perks selectedPerks={perks} onChange={setPerks} />

							<div className="p-2">
								{inputTitleAndDescription('Extra Information','extra information such as perks which are not listed above, eg. house rules and other things.')}
								<textarea type="text" placeholder="Extra information goes here.." name="extraInfo"
									value = {extraInfo} onChange = {(e) => setExtraInfo(e.target.value)}
								 className="w-2/3 text-cyan-700 py-2 px-4 m-3 outline-0 rounded-xl py-1 px-4 shadow-2xl border-2 shadow-gray-200 backdrop-brightness-150"
								/>
							</div>

							<div className="p-3 gap-2">
								{inputTitleAndDescription('Check-in/out time and guest capacity','provide correct capacity and suitable timing.')}
								<div className="p-2 md:flex items-center">
									<div className="p-2">
										<h1 className="text-cyan-800 font-semibold p-1">Check-In time</h1>
										<input type="text" placeholder="11:00 AM" name="checkIn"
										 	value = {checkIn} onChange = {(e) => setCheckIn(e.target.value)}
										 className="p-1 m-2 w-3/5 text-cyan-700 py-2 px-4 w-auto outline-0 rounded-xl py-1 px-4 shadow-2xl border-2 shadow-gray-200 backdrop-brightness-150"
										/>
									</div>
									<div className="p-2">
										<h1 className="p-1 text-cyan-800 font-semibold">Check-Out time</h1>
										<input type="text" placeholder="8:00 PM" name="checkOut"
											value = {checkOut} onChange = { (e) => setCheckOut(e.target.value)}
										 className="p-1 m-2 w-3/5 text-cyan-700 py-2 px-4 w-auto outline-0 rounded-xl py-1 px-4 shadow-2xl border-2 shadow-gray-200 backdrop-brightness-150"
										/>
									</div>
									<div className="p-2">
										<h1 className="p-1 text-cyan-800 font-semibold">Max no. of guests</h1>
										<input type="text" placeholder="3" name="maxGuests"
											value = {maxGuests} onChange = {(e) => setMaxGuests(e.target.value)}
										 className="p-1 m-2 w-3/5 text-cyan-700 py-2 px-4 w-auto outline-0 rounded-xl py-1 px-4 shadow-2xl border-2 shadow-gray-200 backdrop-brightness-150"
										/>
									</div>
								</div>
							</div>

							<div className="flex justify-center">
								<button onClick = {addPlace}
									className="md:w-1/2 lg:w-1/3 mt-4 p-2 rounded-full hover:text-white text-gray-200 shadow-lg font-light shadow-cyan-100 bg-cyan-800 hover:bg-sky-800 mb-12"
									>Save My Place</button>
							</div>
						</form>
					</div>
			)}


		</div>

	</>)
}

export default Place 