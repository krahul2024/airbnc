import React , { createContext , useState , useEffect} from 'react' 
import axios from 'axios'

export const UserContext = createContext({})

export function UserContextProvider({children}) {

	const [profile , setProfile] = useState(null)
	const [ready , setReady] = useState(false)  //this we are adding so that it takes some-time to load the user information 
	                            //and during that period we will be getting errors and to avoid that we are using ready

	const getUserInfo = async() => {
		if(!profile) {
			const response = await axios.get("/user/profile" , { withCredentials:true })
			setProfile(response.data.user)
			setReady(true) 
			console.log('Get user information called!')
		}
	}

	useEffect(() => {
		getUserInfo() 
	},[])

	return (<> 

		<UserContext.Provider value={{profile , setProfile , ready , setReady}}>
			{children}
		</UserContext.Provider>

		</>)
}