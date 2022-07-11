import React from 'react'
import './components.css'
import { Link, useNavigate } from "react-router-dom";




function Navbar() {

  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem('token');
    navigate('/');
    
  }

 
  return (
    <div >
   <nav className='navbar navbar1 navbar-expand-lg'>
        <div className="container-fluid nv">
        <div >
            <img className="logo" src="../logo.png" alt="logo"></img>
        </div>
        <Link className="brand mx-4" to="/">Quill</Link>
        <button className=' navbar-toggler btns' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span><img src='../hamburgur.png'  className='hamburger'  alt='burgur'></img></span>
      </button>
    {  !localStorage.getItem('token')?
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav nav-list d-flex ms-auto mb-2 mb-lg-0">
          <li className="nav-item navitem">
            <Link className="nav-link navlink " aria-current="page" to="/login">SignIn</Link>
          </li>
          <li className="nav-item navitem">
            <Link className="nav-link navlink" to="/register">SignUp</Link>
          </li>
        
        </ul>
        </div>:
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav nav-list d-flex ms-auto mb-2 mb-lg-0">
            <li className="nav-item navitem">
              <span className="nav-link navlink " aria-current="page" onClick={logout}>Logout</span>
            </li>
          </ul>
          </div>}
        </div>
   </nav>

    </div>
  )
}

export default Navbar
