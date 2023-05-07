import { useState , useEffect} from 'react'
import { NavLink , Routes , Route} from 'react-router-dom'
import './App.css'
import Index from './components/indexPage.jsx'
import Login from './components/login.jsx'
import Layout from './layout.jsx'
import Register from './components/register.jsx'
import axios from 'axios'
import {UserContextProvider} from './UserContext.jsx'
import Profile from './components/profile.jsx'

axios.defaults.baseURL = 'http://localhost:5174'

function App() {
  
  return (

    <UserContextProvider>
      <Routes>
        
        <Route path="/" element = { <Layout /> } >

          <Route index element = { < Index /> } />
          <Route path="/login" element = { < Login /> } /> 
          <Route path="/register" element = { < Register /> } /> 
          <Route path="/user/:subpage" element = { < Profile /> } /> 
          <Route path="/user/:subpage/:action" element = { < Profile /> } />

        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
