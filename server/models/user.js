import mongoose from 'mongoose'   

const userSchema = new mongoose.Schema({
	name:{
		type:String , 
		required:true 
	},
	username:{
		type:String , 
		required:true 
	},
	password:{
		type:String ,
		required:true 
	},
	email:{
		type:String 
	},
	phone:{
		type:String 
	},
	token:{
		type:String
	}
})

export default mongoose.model('User' , userSchema) 