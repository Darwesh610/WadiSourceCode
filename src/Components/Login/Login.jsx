import img from "../Login/Word.jpg";
import logoOnly from "../Login/logo only.jpg";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import CertificationCheck from "../CertificationCheck/CertificationCheck";

import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const [error, setError] = useState(null)
  const [errorList, setErrorList] = useState([])
  const [success, setSuccess] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  function getUser(e) {
    let userClone = { ...user };
    userClone[e.target.name] = e.target.value;
    setUser(userClone);
  }



  async function SubmitLoginForm(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setErrorList([]);
    setisLoading(true);
    let ValidationCheck = ValidationUser(user);
    if(ValidationCheck.error){
      console.log(ValidationCheck.error);
      for (let i = 0; i < ValidationCheck.error.details.length; i++) {
       if(ValidationCheck.error.details[i].message.includes("fails to match the required pattern: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/") ) {
        ValidationCheck.error.details[i].message = `Password must have: 
        - at least 8 characters
        - at least 1 uppercase letter, 1 lowercase letter, and 1 number
        - Can contain special characters`
        setErrorList([...ValidationCheck.error.details]);
        console.log(i);
       }else {
        setErrorList([...ValidationCheck.error.details]);
        console.log(errorList);
       }
      }
      setisLoading(false)
    } else {
      let { data } = await axios.post("https://wadi.pro/api/auth/login", user );
      if (data.status === 200) {
        setSuccess(data.message);
        setError(null);
        setisLoading(false);
        if(data.data.instructor){
          localStorage.setItem('userData' , JSON.stringify(data.data.instructor)); 
          localStorage.setItem('image' , JSON.stringify(data.data.instructor.image)); 
          localStorage.setItem('userToken' , data.data.authorisation.token);
          navigate('/instructor')
        } else {
        setError("You're Not An Instructor");
        }

      } else {
        setError(data.errors || data.message);
        setSuccess(null);
        setisLoading(false);
      }
    }
   
  }

  function ValidationUser(user) {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2  , tlds:{allow : ['com' , 'net']}}),
      password: Joi.string()
        .required(),
    });
    return schema.validate(user , {abortEarly:false});
  }

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
              <form onSubmit={SubmitLoginForm} className="w-100 rounded py-4">
                <h3 className="font-color">
                  Welcome To WADI's Diver Certification App
                </h3>
                {error? <div className="alert alert-danger mt-4" role="alert">
                <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
                </div> : ''}


                {errorList.map((err , indx) => <div key={indx} className="alert alert-danger mt-4" role="alert">
                  <i className="fa-solid fa-triangle-exclamation me-2"></i> {err.message} </div>)}
                {success ? <div className="alert alert-success mt-4" role="alert">
                <i className="fa-solid fa-check-double me-2"></i> {success}
                </div> : ''}
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="input w-100"
                    name="email"
                    onChange={getUser}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="input w-100"
                    name="password"
                    onChange={getUser}
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="loginRouting d-flex">
                  <Link to={"/forgetpassword"} className="link mb-3" href="#">
                    Forget Password ?
                  </Link>
                </div>
                <button disabled={isLoading} type="submit" className="button w-100">
                  {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i>  : "Submit"}
                </button>
              </form>
              <CertificationCheck />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
