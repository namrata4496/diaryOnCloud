import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'



const Login = () => {
  const [credent, setCredent] =useState({email:"",password:""});
  const history = useNavigate();

  
   const submit = async(e) =>{
       e.preventDefault();
       const response = await fetch('http://localhost:5000/aa/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({email:credent.email,password:credent.password})
       });
       const json = await response.json();
    //   console.log(json);
       if(json.success){
        localStorage.setItem('token',json.authToken)
        history('/add');
       }
   }

   const onchange = (e)=>{
    setCredent({...credent, [e.target.name]:e.target.value})
 }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credent.email} onChange={onchange} name="email" aria-describedby="emailHelp"/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onchange} value={credent.password} id="password" name="password"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Sign In</button>
</form>
    </div>
  )
}
export default Login