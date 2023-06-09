import React, { useContext , useState , useEffect } from 'react'
import {NavLink , useLocation , useNavigate , useParams} from 'react-router-dom'
import Perks from './perks.jsx'
import axios from 'axios'
import { UserContext } from '../UserContext.jsx'
import SinglePlace from './places.jsx'
import PlaceInfo from './placeInfo.jsx'
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
	const {profile } = useContext(UserContext)
	const [isShown , setIsShown] = useState(false)
	const [places , setPlaces] = useState([])
	const [mainPhoto , setMainPhoto] = useState('') 
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
			extraInfo , checkIn , checkOut , maxGuests , mainPhoto 
		}

		// console.log({placeData})

		const response = await axios.post('/place/new' , {data:placeData} , {withCredentials:true}) 
		const {data } = response  
		// console.log(data) 
		if(data.success) {
			setRefresh(true) 
			navigate('/user/accomodations')
		}
	}
	if(refresh){
		 setRefresh(false) 
		 window.location.reload()
		}

	// getting list of all the places so that we can display
		const getPlaces = async() => {
			// console.log({profile})
			const response = await axios.post('/place/place_list' , { user:profile} , { withCredentials:true})
			const result = response.data   
			// console.log(result) 

			setPlaces(result.places) 
		}
		useEffect(() => {
			getPlaces()  
		},[])

		// console.log({places})
		console.log({action})

		// this is for deletion of a photo when user clicks to remove it also we need to remove that photo from backend
		const deleteSelectedPhoto = (e , index) => {
			e.preventDefault() 
			console.log(addedPhotos[index])
			console.log(addedPhotos.length) 
			//deleting the selected photo from uploaded photos
			const photosList = addedPhotos.filter((item) => { return item !== addedPhotos[index]})
			setAddedPhotos(photosList) 
		}
		
		// this is for setting an image as main image 
		const setMain = (e , index) => {
			e.preventDefault() 
			setMainPhoto(addedPhotos[index])
			console.log({mainPhoto})
		}

	return (<> 

		<div className="">
			{
				action!== 'new' && action === undefined &&  (

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
											<div className="flex relative" key = {index} >
												<img className="brightness-125 backdrop-brightness-150 cursor-pointer rounded-xl flex h-40 w-full object-center"
											 		src = { `http://localhost:5174/uploads/${photo}`} />
												<button onClick = { (e) => deleteSelectedPhoto(e , index) }
													className="cursor-pointer absolute bottom-1 right-1 text-sky-800 rounded-lg hover:bg-sky-800 hover:text-gray-400 border-sky-800 border-2">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
													  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
													</svg>
												</button>		
												<button onClick = { (e) => setMain(e , index) }
													className="cursor-pointer absolute bottom-1 left-1 text-white border-gray-100 ">
													{mainPhoto !== photo && (
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
														  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
														</svg>
														) }
													{ mainPhoto === photo && (
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" strokeWidth={4.7}  className="w-6 h-6 text-sky-500">
														  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
														</svg>
														)}
												</button>	
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
                             {/* list of all the perks dsato be checked */}
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

			{/*displaying list of all the places which user has added */}
			<div className="mt-4 flex flex-col">
				{ places.length >0 && places.map((place) => (
					<div>
						{ action !== 'new' && action === undefined && (
							<div>
								<span className="p-2 font-semibold text-sky-800 text-lg">Your Places</span>
								<SinglePlace place = {place}  /> 
							</div>
						)}
						{
							action && action !== 'new' && (
								<div>
									<PlaceInfo action = {action}  />
								</div>
								)
						}
					</div>	
					

				))}


			</div>


		</div>

	</>)
}

export default Place 