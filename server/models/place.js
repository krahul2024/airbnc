import mongoose from 'mongoose'  
import User from './user.js'

const placeSchema = new mongoose.Schema({
	owner:{
		type:mongoose.Schema.Types.ObjectId,
		ref:User
	},
	title:String,
	address:String,
	photos:[String],
	description:String,
	perks:[String],
	extraInfo:String,
	checkIn:String, 
	checkOut:String,
	maxGuests:Number,
	mainPhoto:String
})

export default mongoose.model('Place' , placeSchema) 