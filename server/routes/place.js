import express from 'express'  
const router = express.Router()  
import image_downloader from 'image-downloader'
import path from 'path'
import auth from '../middlewares/auth.js'
import multer from 'multer'
import fs from 'fs'
import User from '../models/user.js'
import Place from '../models/place.js'


let file_path = path.resolve()
router.get("/" , async(req,res) => {
	res.status(200).send({
		msg:"This is places page! Thanks for visiting."
	})
})


// console.log(file_path)

router.post('/uploadByLink', async(req,res) => {
	const { imageLink } = req.body  
	const filename = 'user-image-'+Date.now() + '.jpg'
	const dest = file_path + '/uploads/' + filename

	let result = await image_downloader.image({
		url:imageLink, dest 
	})

	console.log(result)

	if(!result) return res.status(500).send({
		success:false ,
		msg:"There was an error uploading the file! Please try again later."
	})
	
	return res.status(200).send({
		success:true , 
		filename
	})

})

const upload_middleware = multer({ dest:'uploads'})

router.post('/upload' , upload_middleware.array('photos' , 100) , async(req,res) => {
	console.log('from image upload section')
	
	//setting file extension and location
	const uploadedFiles = []

	for(let i=0;i<req.files.length;i++){
		console.log(req.files[i])
		let {path , originalname} = req.files[i] , originalExtension = '.'  
		let temp = originalname.split('.') 
		originalExtension += temp[temp.length-1] 
		// console.log(originalExtension) 
		const newPath = path + originalExtension  
		fs.renameSync(path , newPath) 
		uploadedFiles.push(newPath.replace('uploads/',''))
	}

	res.status(200).send({
		success:true ,
		msg:"file uploaded successfully",
		filenames:uploadedFiles
	})
})

router.post('/new' , auth , async(req,res) => {
	// const user = await User.findOne({_id : req.id}) 
	// console.log({user})
	const { 
			title , address , addedPhotos ,
			description , perks , extraInfo ,  
			checkIn , checkOut , maxGuests  
		}   = req.body.data  

	try{
		console.log("inside try block") 
		let place = new Place({
			owner : req.id ,
			title , address , photos:addedPhotos ,
			description , perks , extraInfo ,
			checkIn ,checkOut , maxGuests 
		})

		console.log({place})  

		place = await place.save() //saving the place
		if(!place) return res.status(500).send({
			success:false , 
			msg:"There was an error! Please try again later."
		})

		res.status(200).send({
			success:true, 
			msg:"Successfully added your place." ,
			place 
		})

	}
	catch(error) {
		return res.status(500).send({
			success:false , 
			msg:"There was an error! Please try again later."
		})
	}

})

router.post('/place_list' , auth ,  async(req,res) => {
	// console.log(req.body)  
	const { user } = req.body  
	try{
			const places = await Place.find({owner : user._id})
			console.log({places})

			if(!places) return res.status(500).send({
				msg:'There was an error! Please try again.',
				success:true 
			})

			return res.status(200).send({
				success:true ,
				msg:'successfully fetched list of all the places owned by this user.' ,
				places 
			})
	}
	catch(error) {
		console.log(error.message) 
		return res.status(500).send({
			msg:'There was an error! Please try again.',
			success:true 
		})
	}
})

router.get('/places/:id' , async(req,res) => {
	// console.log(req.params) 
	const {id} = req.params  
	try{
		const place = await Place.findOne({_id:id})  
		if(!place) return res.status(500).send({
				msg:'There was an error! Please try again.',
				success:true 
			})

		return res.status(200).send({
			success:true , 
			msg:"Successfully fetched the place information.",
			place  
		})
	}
	catch(error) {
		console.log(error.message) 
		return res.status(500).send({
			msg:'There was an error! Please try again.',
			success:true 
		})
	}

	
})

export default router 