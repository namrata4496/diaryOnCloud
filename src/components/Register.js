import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'


const Register = () => {

  const navigate = useNavigate();
  const [credent, setCredent] =useState({name:"",email:"",password:""});

  
  const submit = async(e) =>{
      e.preventDefault();
      const response = await fetch('http://localhost:5000/aa/createUser',{
       method:'POST',
       headers:{
         'Content-Type':'application/json',
       },
       body:JSON.stringify({name:credent.name,email:credent.email,password:credent.password})
      });
      const json = await response.json();
     // console.log(json)
      if(!json.error){
      alert("You are registered. Please login to get started");
      navigate('/login');
      }
      else{
        alert(json.error);
        setCredent({name:"",email:"",password:""})
      }


  }

  const onchange = (e)=>{
   setCredent({...credent, [e.target.name]:e.target.value})
}




  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={submit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onchange} value={credent.name} name="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onchange} value={credent.email} name="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onchange} value={credent.password} name="password"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Sign In</button>
</form>
    </div>
  )
}
export default Register