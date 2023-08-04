import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './CertificationCheck.css'

export default function CertificationCheck() {
  let counter = JSON.parse(localStorage.getItem('checkTimes'))
  const [count, setCount] = useState(counter|| 0);
  const [user, setUser] = useState({
    wadi_id: '',
    certification_number: '',
    type: ''
  });
  const [userRes, setUserRes] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('checkTimes' , count);
    if(count >= 5){
      setTimeout(() => {
        setCount(0)
      }, 36000);}
  }, [count])

  const [CertOrWadi, setCertOrWadi] = useState(false)
function getUser(e) {
  let userClone = { ...user };
  console.log(e.target);
  if(document.getElementById('student1').checked){
    userClone['type'] = 'student'
  }else if(document.getElementById('instructor1').checked) {
    userClone['type'] = 'instructor'
  }else {
    userClone['type'] = ''
  }
  if (document.getElementById('wadi_id').checked) {
    setCertOrWadi(true);
    if(e.target.name === 'search'){
      userClone['wadi_id'] = e.target.value
      userClone['certification_number']  = ''
    }
    console.log('wadi');
  }else if(document.getElementById('certification_number').checked) {
    setCertOrWadi(true);
    if(e.target.name === 'search'){
      userClone['certification_number'] = e.target.value
      userClone['wadi_id'] = ''
    }
  }
  if (e.target.id === 'wadi_id' || e.target.id === 'certification_number') {
    document.getElementById('wadi_idSTU').value = ''
  }
  if (e.target.name === 'search' && CertOrWadi === false){
    setError('You Must Choose Type of Search Word First')
    setTimeout(() => {
      setError(null)
    }, 2000);
  }
  setUser(userClone);
  console.log(user);
}
async function SearchAbout(){
  setLoading(true);
  if (user.type === '') {
    setError('You Must Choose Type of User First')
    setTimeout(() => {
      setError(null)
    }, 2000);
  setLoading(false);
  }else if(CertOrWadi === false){
    setError('You Must Choose Type of Search Word First')
    setTimeout(() => {
      setError(null)
    }, 2000);
  setLoading(false);
  }else if (user.wadi_id === '' && user.certification_number === ''){
    setError('You Must Write a Search Word')
    setTimeout(() => {
      setError(null)
    }, 2000);
  setLoading(false);
  } else {
    setLoading(true);
    setCount(count + 1)
    axios.post('https://wadi.pro/api/checkCertification' , user).then((res) => {
      setError(null)
      if(res.data.data.length <= 0){
        setError(`${user.type} Not Found`)
        setTimeout(() => {
          setError(null)
        }, 2000);
        document.getElementById('wadi_idSTU').value = ''
      }else {
        setUserRes(res.data.data)
        document.getElementById('wadi_idSTU').value = ''
      }
  setLoading(false);
    }).catch((error) => {
      console.log(error);
      setError('Network Error ....')
      setTimeout(() => {
        setError(null)
      }, 2000);
      document.getElementById('wadi_idSTU').value = ''
  setLoading(false);
    })
  }
}

const [UserData, setUserData] = useState({
  type: '',
  first_name: '',
  last_name: '',
  birth_date: ''
})
function getUserData(e) {
  let userClone = { ...UserData };
  console.log(e.target);
  if(document.getElementById('student').checked){
    userClone[e.target.name] = e.target.value
    userClone['type'] = 'student'
  }else if(document.getElementById('instructor').checked) {
    userClone[e.target.name] = e.target.value
    userClone['type'] = 'instructor'
  }else {
    userClone[e.target.name] = e.target.value
    userClone['type'] = ''
  }
  console.log(userClone);
  setUserData(userClone)
}
async function SearchAboutUser(){
  setLoading(true);
  if (!UserData.type || UserData.type === '') {
    setError('You Must Choose Type of User First')
    setTimeout(() => {
      setError(null)
    }, 2000);
  setLoading(false);
  }else if (!UserData.first_name || UserData.first_name === ''){
    setError('You Must Write a First Name')
    setTimeout(() => {
      setError(null)
    }, 2000);
  setLoading(false);
  }else if(!UserData.last_name || UserData.last_name === '') {
    setError('You Must Write a Last Name')
    setTimeout(() => {
      setError(null)
    }, 2000);
  setLoading(false);
  }else if(!UserData.birth_date || UserData.birth_date === '') {
    setError('You Must Write a Date of Birth')
    setTimeout(() => {
      setError(null)
    }, 2000);
  setLoading(false);
  }else {
    setLoading(true);
    setCount(count + 1)
    axios.post('https://wadi.pro/api/checkCertification' , UserData).then((res) => {
      setError(null)
      console.log(res);
      if(res.data.data.length <= 0){
        setError(`${UserData.type} Not Found`)
        setTimeout(() => {
          setError(null)
        }, 2000);
        document.getElementById('firstNameINSsearch').value = ''
        document.getElementById('lastNameINSsearch').value = ''
        document.getElementById('DateNameINSsearch').value = ''
      }else {
        setUserRes(res.data.data)
        document.getElementById('firstNameINSsearch').value = ''
        document.getElementById('lastNameINSsearch').value = ''
        document.getElementById('DateNameINSsearch').value = ''
      }
  setLoading(false);
    }).catch((error) => {
      console.log(error);
      setError('Network Error ....')
      setTimeout(() => {
        setError(null)
      }, 2000);
  setLoading(false);
    })
  }
}
  
  return (
    <div className="CheckCon">
    <hr className="w-100 "/>
    <h3 className='w-100 font-color'><i className="fa-regular fa-circle-check color-green"></i> Certification Check</h3>
    <p className='font-color fs-6'><i className="fa-solid fa-exclamation color-green mx-1"></i> You have 5 times only to can check</p>
    
    <div className="px-3 bg-body rounded">

                    {error ? <div className="NotiCon mt-5">
                    <div className="alert alert-danger mt-4" role="alert">
                      <i className="fa-solid fa-triangle-exclamation me-2"></i>{" "}
                      {error}
                    </div></div>  : ''}
              <div className="formCon row my-4">
              <div className="col-md-12 py-3">
              <form className="col-md-12">
                  <div className="d-flex w-100">
                    <label
                      className="w-50 me-3 my-2"
                      htmlFor="exampleInputEmail1"
                    >
                      First Name
                    </label>
                    <label className="w-50 my-2" htmlFor="exampleInputEmail1">
                      Last Name
                    </label>
                  </div>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="input me-3 w-50"
                      id="firstNameINSsearch"
                      name="first_name"
                      onChange={getUserData}
                    />
                    <input
                      type="text"
                      className="input w-50"
                      id="lastNameINSsearch"
                      name="last_name"
                      onChange={getUserData}
                      
                    />
                  </div>
                  <div className="dateCon my-4">
                    <label className="me-3" htmlFor="studentDate">
                      Date of Birth
                    </label>
                    <input
                      className="date"
                      type="date"
                      name="birth_date"
                      id='DateNameINSsearch'
                      onChange={getUserData}
                    />
                  </div>
                </form>
                <div className="d-flex justify-content-start align-items-center mb-4 ">

<div className="form-check marginRadio1">

<input className="form-check-input" onClick={getUserData} type="radio" name="user" id="instructor"/>
<label className="form-check-label" htmlFor="instructor">
Instructor
</label>
</div>
<div className="form-check marginRadio">
<input className="form-check-input" onClick={getUserData} type="radio" name="user" id="student"/>
<label className="form-check-label" htmlFor="student">
Student
</label>
</div>
</div>
                <button onClick={SearchAboutUser} disabled={count >= 5} className='button w-100 mb-3'>{Loading ?  <i className="fa-solid fa-spinner fa-spin"></i> : `Certification Check` }</button>
                

                </div>
                <hr />
                <div className="col-md-12 mt-3">
                <div className="d-flex justify-content-start align-items-center mb-4 ">

<div className="form-check marginRadio1">

<input className="form-check-input" onClick={getUser} type="radio" name="searchType" id="certification_number"/>
<label className="form-check-label" htmlFor="certification_number">
Certification ID
</label>
</div>
<div className="form-check marginRadio">
<input className="form-check-input" onClick={getUser} type="radio" name="searchType" id="wadi_id"/>
<label className="form-check-label" htmlFor="wadi_id">
WADI ID
</label>
</div>
</div>
                  <div className="d-flex flex-column">
                    <label
                      className="w-100 me-3 my-2"
                      htmlFor="exampleInputEmail1"
                    >
                      You Can Search by ( <span className='spanSize'>Wadi ID, Certification ID</span> )
                    </label>
                    <input
                      type="text"
                      className="input inputCheck w-100"
                      id="wadi_idSTU"
                      name="search"
                      onChange={getUser}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center mb-4 ">

<div className="form-check marginRadio1">

<input className="form-check-input" onClick={getUser} type="radio" name="user" id="instructor1"/>
<label className="form-check-label" htmlFor="instructor1">
Instructor
</label>
</div>
<div className="form-check marginRadio">
<input className="form-check-input" onClick={getUser} type="radio" name="user" id="student1"/>
<label className="form-check-label" htmlFor="student1">
Student
</label>
</div>
</div>
            {userRes.length > 0 ? <table className="w-100 tableINS my-3">
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Active/Inactive</th>
                  <th scope="col">List of Certifications</th>
                </tr>
               </thead>
               <tbody>
              {userRes.map((user , indx) => <tr key={indx}>
                  <th scope="row">{user.wadi_id}</th>
                  <td className='tableData'>{`${user.first_name} ${user.last_name}`}</td>
                  <td className='tableData'>{user.email}</td>
                  <td className='activeSign'>{user.active === 1 ? <i class="fa-solid fa-check Right"></i> : <i class="fa-solid fa-xmark wrong"></i>}</td>
                  <td>
                  <button type="button" class="buttInsTable" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  List of Certifications</button>
                  </td>


              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div className="shadow-lg modal-of-certs">
                      <table className="w-100 tableINS my-3">
                      <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                </tr>
               </thead>
            <tbody>
               {user.student_certification ? user.student_certification.length > 0 ? user.student_certification.map((cert , indx) => <tr key={indx}>
                <td className='tableDataCets text-center'>{cert.certification_number}</td>
                  <td className='tableDataCerts text-center'>{cert.certification_name}</td>
               </tr> ) : '' : 
               user.certifications ? user.certifications.length > 0 ? user.certifications.map((cert , indx) => <tr key={indx}>
                <td className='tableDataCets'>{cert.pivot.certification_id}</td>
                  <td className='tableDataCerts'>{cert.name}</td>
                  <td className='tableDataCerts'>{cert.description}</td>
               </tr> ) : '' : ''}
               </tbody>
                      </table>
                    </div>
                    </div>
              </div>
                </tr>)}
                </tbody>
                    </table> : ''}
    <button onClick={SearchAbout} disabled={count >= 5} className='button w-100 mb-3'>{Loading ?  <i className="fa-solid fa-spinner fa-spin"></i> : `Certification Check` }</button>
    {count >= 5 ? <p className='font-color fs-6'><i className="fa-solid fa-triangle-exclamation color-green mx-1"></i> Button will Not Disabled after one hour</p> : ''}
    </div> 
  )
}

