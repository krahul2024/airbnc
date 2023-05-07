import express from 'express'
import cors from 'cors' 
import mongoose from 'mongoose' 
import cookie_parser from 'cookie-parser'
import body_parser from 'body-parser' 
import placeRouter from './routes/place.js'
import path from 'path'
import userRouter from './routes/user.js'
const file_path = path.resolve() 
// import config from './config.js'

const app = express() , PORT = 5174
app.use(cookie_parser()) 
app.use('/uploads',express.static(file_path + '/uploads'))
app.use(cors({ origin:'http://localhost:5173', credentials: true }))
app.use(express.urlencoded({extended:true})) //for using json format and sending messages and data in json format
app.use(express.json())  // for using json format and other stuff related to idk


//connecting to the database
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://0.0.0.0:27017/fairDB',{ useNewUrlParser : true })
	.then(() => console.log(`Connected to the database successfully!`))
	.catch((error) => {
		console.log(`There was an error connecting to the database. ${error}`) // printing the error
	})

app.get("/",(req,res) => {
	res.send("hello bro")
})


app.use('/user' , userRouter) 
app.use('/place', placeRouter)


app.listen(PORT, () => console.log(`Server is running on the PORT: ${PORT}`))