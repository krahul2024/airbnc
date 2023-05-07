import express from 'express'  
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import cookie_parser from 'cookie-parser'
import auth from '../middlewares/auth.js'
const router = express.Router()
router.use(cookie_parser()) 

router.get("/" , async(req, res) => {
	return res.status(200).send({
		name:"Rahul" ,
		username:"username"
	})
})

//-------------------all post requests---------------------------------------

router.post("/register" , async(req , res) => {
	const {name , username, password } = req.body 

	try{
		let user = await User.findOne({username})
		if(user) return res.status(380).send({
			success:false ,
			msg:"This username is already in use! Please try again with another username or Try loggin in."
		})
		user = new User({
			name , username , password 
		})

		user = await user.save()  
		if(!user) return res.status(500).send({
			success:false , 
			msg:"An error occured during registration! Please try again later."
		})

		user.password = null //sending null password in response 

		return res.status(200).send({
			success:true ,
			msg:"Registration successful! You can login now" ,
			user,
			toPath:"/login" //in case of successful registration we redirect the user to login page
		})
	}
	catch(error) {
		console.log(error) 
		return res.status(500).send({
			success:false ,
			msg:"There was an error while signing you up! Please try again later."
		})
	}
})

router.post("/login" , async(req,res) => {
	const {username , password } = req.body 

	try{
		let user = await User.findOne({username})
		if(!user) return res.status(212).send({
			success:false ,
			msg:"No such username exists! Please try again later with registered username or Try registering."
		})
		else if(user.password !== password) return res.status(213).send({
			success:false ,
			msg:"Try entering correct password or Try with another username."
		})
		else if(user.password === password) {
			//here we will be setting a cookie and also providing user a token 
			const token =await jwt.sign(
				{id:user._id} , 
				"Thisismysecretforjsonwebtokensihopeitisthirtytwocharacterslong",
				{
					expiresIn:24*3600*365
				})
			console.log('Token' , token) 

			res.cookie('access_cookie' , token , {
				withCredentials:true ,
				httpOnly:true ,
				maxAge:24*3600*365,
				secure:false 
			})	

			console.log(res)

			user.token = token 
			user = await user.save() 
			if(!user) return res.status(500).send({
				success:false ,
				msg:"Login failed! Please try again later."
			})	

			user.password = null 

			return res.status(200).send({
				success:true ,
				msg:"Login successful!",
				user ,
				toPath:"/" //redirecting user to homepage on successful login
			})

		}
	} 
	catch(error) {
		console.log(error) 
		return res.status(500).send({
			success:false ,
			msg:"Login failed! Please try again later."
		})
	}
})

router.post("/logout" ,auth , async(req,res) => {
	console.log(req.id)
	let user = await User.findOne({_id:req.id}) //finding the user to clear token
	if(!user) return res.status(500).send({
		success:false ,
		msg:"There was an error! Please try again later."
	})
	user.token = null  
	user = await user.save() 
	if(!user) return res.status(500).send({
		success:false ,
		msg:"There was an error! Please try again later."
	})

	res.clearCookie('access_cookie')
	res.status(200).send({
		success:true ,
		msg:"User logged out successfully" ,
		toPath:"/login"
	})
})

router.get("/profile" , auth, async (req, res) => {
	try {

		let user = await User.findOne({_id:req.id}) 
		if(!user) return res.status(403).send({
			success:false ,
			msg:"Please login to access this page"
		})	

		user.password = null 

		return res.status(200).send({
			success:true ,
			msg:"user information fetched successfully!",
			user 
		})
	}
	catch(error) {
		console.log(error) 
		return res.status(403).send({
			success:false ,
			msg:"An error occured! Please log in again."
		})
	}
})




export default router 