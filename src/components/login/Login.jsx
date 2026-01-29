import React, { useActionState, useState , useId} from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthHook } from '../../context/Contextdata'

const Login = () => {
    //const navigate= useNavigate()
   const[email, setEmail]=useState('')
   const[password, setPassword]=useState('')

   const emailId= useId()
   const passwordId=useId()

   const {googleLogin, handleLogin, errors}=useAuthHook()

   const submitHandler =(e)=>{
     e.preventDefault()

     const form= e.target
     const formData= new FormData(form)

     handleLogin(formData)
   }

   const handleGoogleLogin= async (e)=>{
     e.preventDefault()
     await googleLogin()
     
   }
  return (
    <div className='login-container'>
        <form onSubmit={submitHandler} className='form-container'>
           <h1 className='heading'>Signup Page</h1>

           <button type='submit' onClick={handleGoogleLogin} className='google-btn'>
            Signin with Google
           </button>

           <div className='border-line'>
             <p className='or-text'>OR</p>
             <div className='divider'></div>
           </div>
            {/* email */}
           <label htmlFor={emailId}>Email</label>
           <input 
           type='text'
           id={emailId}
           name='email'
           placeholder='enter email'
           className='input'
           required
           onChange={(e)=>setEmail(e.target.value)}
           />

           {/* password */}
           <label htmlFor={passwordId}>Password</label>
           <input 
           type='password'
           id={passwordId}
           name='password'
           placeholder='enter password'
           className='input'
           required
           onChange={(e)=>setPassword(e.target.value)}
           />
           {errors && <p className="error">{errors}</p>}
           <button type='submit' className='login-btn'>Login</button>
           <p className='signup-link'>&copy; 2026 Origin. All Rights Reserved.</p>
        </form>
    </div>
  )
}

export default Login
