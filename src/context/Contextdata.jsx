import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';

//create context
const AuthContext= createContext(null)
const Contextdata = ({children}) => {
const [user, setUser]=useState(null)
const[errors, setError]=useState('')
//const navigate= useNavigate()

//Goggle Login
const googleLogin= useGoogleLogin({
    onSuccess: async (tokenResponse) =>{
        try{
          //console.log(tokenResponse)
        const {data}= await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers:{
                'Authorization':`Bearer ${tokenResponse.access_token}`
            }
        })
        //console.log(data)
        const {data: dbData}=await axios.get('http://localhost:5000/users') 

        //console.log(dbData);
        const existUser= dbData.find((obj)=>obj.email === data.email)

        //if no user save tpo db.json() and if exists just login user
        let loggedUser;
        if(!existUser){
        const newUser = {
          id: uuidv4(),
          email: data.email,
          name: data.name,
          picture: data.picture,
          google: data.email_verified,
        };
           
        const {data: loginData}= await axios.post('http://localhost:5000/users', newUser)
        //console.log(loginData)

        loggedUser=loginData
        }else {
          loggedUser = existUser; 
         }
        setUser(loggedUser)

        toast.success('Login successful')
        //navigate('/')
        setError('')
        }catch(err){
          setError(`Google login failed ${err}`)
        } 
    }, 
    onError: ()=>{
      setError('Google login failed')
      return;
    }
})

//normallogin handling
 const handleLogin= async (formData )=>{
      const email=formData.get('email')
      const password=formData.get('password')

      if(password.length < 5){
        setError('Password must be at least 6 characters!')
        return;
      }
      if(!email.includes('@')){
        setError('Enter a valid email!')
        return;
      }
      const info={
        id: uuidv4(),
        email: email,
        password: password
      }

      try{
      const {data:userInfo}= await axios.get('http://localhost:5000/users')
    
      const existingData= userInfo.find((obj)=> obj.email === email)

      let normalUser;
      if(!existingData){
        const {data: loginInfo}= await axios.post('http://localhost:5000/users', info)

        normalUser=loginInfo
      }else{
         normalUser=existingData
      }
       setUser(normalUser)
        toast.success('Login successful')
        setError('')
        //navigate('/')

      }catch(err){
        console.log('Login failed', err)
      }
   }

const Logout=()=>{
    setUser(null)
     //navigate('/login')
}

  return (
    <AuthContext.Provider value={{user, googleLogin, handleLogin, Logout, errors, setUser}}>
     {children}
    </AuthContext.Provider>
  )
}

export default Contextdata

//custom hook for userContext(consuming data)
export const useAuthHook=()=>{
    return useContext(AuthContext)
    
}