import User from  '../models/user.js'  
import jwt from 'jsonwebtoken' 

const auth = async(req, res , next) => {
	const token = req.cookies.access_cookie  
	console.log('Access cookie: ' , token) 

	try {
		let result  = await jwt.verify(token ,"Thisismysecretforjsonwebtokensihopeitisthirtytwocharacterslong") 
		if(!result || !token) return res.status(403).send({
			success:false ,
			msg:"There was an error! Please try again or Try logging in again."
		}) 
		req.id = result.id 
		next() 
	}
	catch(error) {
		console.log(error) 
		return res.status(500).send({
			success:false ,
			msg:"Some error occured! Please try again later."
		})
	}
}

export default auth 