import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from "../Login/Word.jpg";
import logoOnly from "../Login/logo only.jpg";
import './OneTimePassword.css'
import axios from 'axios';

export default function OneTImePassword() {
  useEffect(() => {
    document.getElementById('input1').focus()
  }, [])
  
  let navigate = useNavigate();
  const [error, setError] = useState()
    let count=1;
    let codeArr = [];
    function verificationCode(event){

        count++
        if(count > 5){
          return
        }else {
            document.getElementById(`input${count}`).focus();
        }
    }
    


    function fetchCode(e){
      codeArr.push(e.target.value)
    }
   async function sendCode(e){
      e.preventDefault();
      let { data } = await axios.post('https://wadi.pro/api/auth/password/code/check' , {code : codeArr.join('')});
      console.log(data);
      if(data.message === 'Error Found'){
        setError(data.errors.code);
        for (let i = 1; i <= 5; i++) {
          document.getElementById(`input${i}`).value = '';
        }
        document.getElementById('input1').focus();
      }else {
        localStorage.setItem('code' , codeArr.join(''));
      navigate('/newpassword');
      }

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
              <div className="formCon shadow p-3 mb-5 bg-green rounded w-100 position-relative">

                <form onSubmit={sendCode} className="w-100 rounded py-4">
                    <h3 className='font-white'>Hey {localStorage.getItem('email')}</h3>
                    <p className='font-white mt-3'>To Complete Sign in, Enter the verfication code on login verfication page</p>
                    {error? <div className="alert alert-danger mt-4" role="alert">
                <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
                </div> : ''}
                    <h3 className='text-center font-white my-3'>Verification Code</h3>
                    <div className="w-100 text-center my-3">
                    <input className='verfiInput inputWhite' onKeyUp={verificationCode} onChange={fetchCode} name='1' id='input1' type="text" maxLength={1} />
                    <input className='verfiInput inputWhite' onKeyUp={verificationCode} onChange={fetchCode} name='2' id='input2' type="text" maxLength={1}/>
                    <input className='verfiInput inputWhite' onKeyUp={verificationCode} onChange={fetchCode} name='3' id='input3' type="text" maxLength={1}/>
                    <input className='verfiInput inputWhite' onKeyUp={verificationCode} onChange={fetchCode} name='4' id='input4' type="text" maxLength={1}/>
                    <input className='verfiInput inputWhite' onKeyUp={verificationCode} onChange={fetchCode} name='5' id='input5' type="text" maxLength={1}/>
                    </div>
                  <button type="submit" className="buttonWhite w-100 my-4">
                    Sent a Code</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
