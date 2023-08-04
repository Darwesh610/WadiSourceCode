import React from 'react'
import logo from './logo.png'
import user from './user.png'
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';




export default function Navbar() {
  let userData = {...JSON.parse(localStorage.getItem('userData'))}
  let navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  };
  
  async function logOut(){
    await axios.post('https://wadi.pro/api/auth/logout' , '' , config ).then((res) => {
      console.log(res);
      localStorage.removeItem('userData')
      localStorage.removeItem('userToken')
      navigate('/login');
    }).catch((error) => {
      console.log(error);
    })
  }


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light position-fixed fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to={'/instructor'}><img src={logo} className="logoNav" alt="wadi logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fa-solid fa-bars navbar-toggler-icon"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown mr-5">
          <a className="nav-link dropdown-toggle" href=" " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <p className='userName'>{userData.first_name} {userData.last_name}</p> 
            <div className="ImageNavCon">
              <img className='userImageNav' src={`https://wadi.pro/${JSON.parse(localStorage.getItem('image'))}` || user} alt="wadi user" />
              </div>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className='link' to={'/userprofile'}><li><a className="dropdown-item" href=" "><i className="fa-solid fa-user"></i> Profile</a></li></Link>
            <li><hr className="dropdown-divider"/></li>
            <li><div className="dropdown-item cursPointer " onClick={logOut}><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</div></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
