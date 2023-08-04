import React, { useState } from 'react'
import img from "../Login/Word.jpg";
import logoOnly from "../Login/logo only.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ForgetPassword() {

  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    email:''
  })
  const [error, setError] = useState(null);
  function getUser(e) {
    setError(null);
    let userClone = { ...userData };
    userClone.email = e.target.value;
    console.log(userClone);
    setUserData(userClone);
  }
  
  async function sendEmail(e){
    e.preventDefault();
    let { data } = await axios.post('https://wadi.pro/api/auth/password/email/check' ,  userData)
    if(data.message === 'Error Found'){
      setError(data.errors.email);
    }else {
      localStorage.setItem('email' , userData.email);
      navigate('/onetimepassword');
    }
    console.log(data)
  }

  //Error Found
  //The selected email is invalid
  return (
    <>
     <div className="container">
          <div className="row mt-4">
            <div className="col-md-6 text-center">
            <img src={logoOnly} alt="Wadi logo" className="headerLogo" />
              <img src={img} className="w-100 header" alt="Wadi Logo" />
            </div>
            <div className="col-md-6 p-5">
              <div className="formCon shadow p-3 mb-5 bg-body rounded w-100">
                <form onSubmit={sendEmail} className="w-100 rounded py-4">
                  <h3 className="font-color">Forget Password</h3>
                  {error? <div className="alert alert-danger mt-4" role="alert">
                <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
                </div> : ''}
                  <div className="my-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="input w-100"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder='Enter your email address'
                      onChange={getUser}
                    />
                  </div>
                  <button type="submit" className="button w-100">
                    Sent an Email</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
