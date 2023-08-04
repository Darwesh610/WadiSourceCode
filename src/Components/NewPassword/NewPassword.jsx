import React, { useState } from 'react'
import img from "../Login/Word.jpg";
import logoOnly from "../Login/logo only.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';

export default function NewPassword() {
  let navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password:'',
    password_confirmation: '',
    code: "1234"
  })
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [errorList, setErrorList] = useState([])


  function getPasswords(e) {
    let userClone = { ...passwords };
    userClone[e.target.name] = e.target.value;
    setPasswords(userClone);
  }

  async function submitForm(e){
    e.preventDefault();
    setError(null);
    setErrorList([]);
    setSuccess(null);
    setisLoading(true);
    let validationCheck = ValidationUser(passwords)
    if(validationCheck.error){
      setisLoading(false);
      for (let i = 0; i < validationCheck.error.details.length; i++) {
       if(validationCheck.error.details[i].message.includes("fails to match the required pattern: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/") ) {
        validationCheck.error.details[i].message = `Password must have: 
        - at least 8 characters
        - at least 1 uppercase letter, 1 lowercase letter, and 1 number
        - Can contain special characters `
        setErrorList([...validationCheck.error.details]);
        console.log(errorList);
       }else {
        setErrorList([...validationCheck.error.details]);
        console.log(errorList);
       }
      }
    } else {
      if(passwords.password  === passwords.password_confirmation){
        let {data} = await axios.post('https://wadi.pro/api/auth/password/reset' , passwords)
        console.log(data);
        if (data.message === "Error Found") {
          if(data.errors.password){
            setisLoading(false);
            setError(data.errors.password);
          }else if (data.errors.password_confirmation){
            setisLoading(false);
            setError(data.errors.password_confirmation);
          }else {
            setisLoading(false);
            setError('Something Wrong ......');
          }
        } else {
          setisLoading(false);
          setError(null);
          setSuccess('New Password Created Successfully');
          navigate('/login');
        }
       }else {
        setisLoading(false);
         setError('Password and confirm password must be the same');
       }
      
    }
   
  }
  function ValidationUser(passwords) {
    let schema = Joi.object({
      password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .required(),
      password_confirmation : Joi.string().required(),
      code : Joi.string().required()
    });
    return schema.validate(passwords , {abortEarly:false});
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
                <form onSubmit={submitForm} className="w-100 rounded py-4">
                  <h3 className="font-color">Set A New Password</h3>
                  {error? <div className="alert alert-danger mt-4" role="alert">
                <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
                </div> : ''}
                { errorList.map((err , indx) => <div key={indx} className="alert alert-danger mt-4" role="alert">
                  <i className="fa-solid fa-triangle-exclamation me-2"></i> {err.message} </div>)}
                  {success ? <div className="alert alert-success mt-4" role="alert">
                <i className="fa-solid fa-check-double me-2"></i> {success}
                </div> : ''}
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="input w-100"
                      id="exampleInputPassword1"
                      placeholder='**********'
                      name='password'
                      onChange={getPasswords}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="input w-100"
                      id="exampleInputPassword2"
                      placeholder='**********'
                      name='password_confirmation'
                      onChange={getPasswords}
                    />
                  </div>
                  <button type="submit" className="button w-100">
                  {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i>  : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  )
  }