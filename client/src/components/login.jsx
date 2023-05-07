import React , {useState , useEffect , useContext } from 'react' 
import { NavLink , useNavigate , useLocation } from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../UserContext.jsx'
const Login = () => {

	const location = useLocation() 
	const navigate = useNavigate() 

	let [user , setUser] = useState({
		username:"naplone73" , password:"pass"
	})

	//getting profile information from user-context 
	const {setProfile} = useContext(UserContext) 

	const setInputs = (e) => {
		const name = e.target.name , value = e.target.value 
		console.log(name , value) 
		setUser({...user , [name]:value})
	}
	const processInputs = async (e) => {
		e.preventDefault() 
		console.log(user) 
		try{
			const response = await axios.post("/user/login" , {
				username:user.username , password:user.password
			} , { withCredentials:true })

			console.log(response.data) 
			window.alert(response.data.msg)
			if(response.data.success) {
				setProfile(response.data.user) //setting user-information which we got after logging in of the user
				navigate("/")
			 }

		}
		catch(error) {
			console.log(error) 
		}
	}


	return (<>

		<div>

			<form action="" className="flex justify-center min-h-fit mt-28 md:mt-44">
				<div className="p-2 flex flex-col rounded-xl items-center shadow-md shadow-gray-200 w-[500px] md:w-[700px]">
					<div className="p-4 flex flex-col items-center">
						<span className="text-3xl font-semibold text-cyan-800">Login</span>
					</div>

					<div className="flex flex-col p-4 my-16 md:my-24 ">
						<input type="text" value={user.username} name="username"  onChange = { (e) => setInputs(e) }
							className="text-sm outline-0 border border-gray-300 hover:border-cyan-800 hover:border-2 rounded-full px-3 py-1 my-1 text-cyan-800 w-[300px]"
							/>
						<input type="password" placeholder="password" value={user.password} name="password" onChange = { (e) => setInputs(e) }
							className="text-sm mt-1 outline-0 border border-gray-300 hover:border-cyan-800 hover:border-2 rounded-full px-3 py-1 my-1 text-cyan-800"
							/>
						<button onClick = { (e) => processInputs(e) }
							className="flex justify-center text-md px-2 my-1 py-1 text-gray-100 bg-cyan-800 rounded-full hover:bg-cyan-900"
							>Login</button>

						<div className="flex gap-2 text-sm p-1 justify-center">
							<span className="flex ">Not registered?</span>
							<NavLink to="/register"
								className="text-sky-900 font-semibold">Register</NavLink>
						</div>
					</div>
				</div>

			</form>

		</div>

	 </>)
}

export default Login 