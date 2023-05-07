import React , {useState , useEffect} from 'react' 
import { NavLink , useLocation , useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

		const location = useLocation()  
		const navigate = useNavigate() 
		let [user , setUser] = useState({
			name:"Thibaut Beaulé" , username:"naplone73" , password:"pass"
		})

		const setInputs = (e) => {
			const name = e.target.name , value = e.target.value 
			// console.log(name ,value )
			setUser({...user , [name]:value})
		}

		const processInputs  = async (e) => {
			e.preventDefault() 
			console.log(user) 
			try{
				const response = await axios.post(`/user/register` , {
				name:user.name , username:user.username , password:user.password 
				})
				console.log(response.data) 
				window.alert(response.data.msg) 
			} 
			catch(error) {
				const result = error.response.data
				console.log(result) 
				window.alert(result.msg) 
			}
			

		}

	return (<>

		

		<div>

			<form action="" className="flex justify-center min-h-fit mt-28 md:mt-44">
				<div className="p-2 flex flex-col rounded-xl items-center shadow-md shadow-gray-200 w-[500px] md:w-[700px]">
					<div className="p-4 flex flex-col items-center">
						<span className="text-3xl font-semibold text-cyan-800">Register</span>
					</div>

					<div className="flex flex-col p-4 my-12 ">
						<input type="text" value={user.name} name="name" onChange = { (e) => setInputs(e) }
							className="text-sm outline-0 border border-gray-300 hover:border-cyan-800 hover:border-2 rounded-full px-3 py-1 my-1 text-cyan-800 w-[300px]"
							/>
						<input type="text" value={user.username} name="username" onChange = { (e) => setInputs(e) }
							className="text-sm outline-0 border border-gray-300 hover:border-cyan-800 hover:border-2 rounded-full px-3 py-1 my-1 text-cyan-800 w-[300px]"
							/>
						<input type="password" value={user.password} name="password" onChange = { (e) => setInputs(e) }
							className="text-sm mt-1 outline-0 border border-gray-300 hover:border-cyan-800 hover:border-2 rounded-full px-3 py-1 my-1 text-cyan-800"
							/>
						<button onClick = { (e) => processInputs(e) }
							className="flex justify-center text-md px-2 my-1 py-1 text-gray-100 bg-cyan-800 rounded-full hover:bg-cyan-900"
							>Register</button>
						<div className="flex gap-2 text-sm p-1 justify-center">
							<span className="flex ">Already registered?</span>
							<NavLink to="/login"
								className="text-sky-900 font-semibold">Login</NavLink>
						</div>
					</div>
				</div>

			</form>

		</div>

	 </>)
}

export default Register