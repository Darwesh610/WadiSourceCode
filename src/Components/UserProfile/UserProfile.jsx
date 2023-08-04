import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'
import userImage from './user.png'
import './UserProfile.css'
import axios from "axios";
import { useState } from 'react'
import LoadingPage from '../LoadingPage/LoadingPage'
export default function UserProfile() {

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  };

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);


  async function ChangePhoto(e){
    setPageLoading(true)
    let UserImage = e.target.files[0]
    let fdUser = new FormData();
    fdUser.append('image', UserImage , 'ImageUser');
    await axios.post('https://wadi.pro/api/instructor/updateImage' , fdUser , config).then((res) => {
      console.log(`instructors/${res.data.data}`);
    localStorage.setItem('image' , JSON.stringify(`instructors/${res.data.data}`))
    setSuccess('Image Uploaded Successfully')
    setTimeout(() => {
      setSuccess('')
    setPageLoading(false)
    }, 2000);
    }).catch((err) => {
    setPageLoading(false)
      console.log(err);
      setError(err.response.data.message)
      setTimeout(() => {
        setError('')
      }, 2000);
    })
  }

  

  return <>
  <Navbar/>
  <SideMenu/>
  {pageLoading ? <LoadingPage /> : ""}

  {success ?  <div className="NotiCon mt-5">
     
     <div className="alert alert-success mt-4" role="alert">
           <i className="fa-solid fa-check-double me-2"></i>{" "}
                     {success}
           </div>
   </div> : ''}

   {error ? <div className="NotiCon mt-5">
                   <div className="alert alert-danger mt-4" role="alert">
                     <i className="fa-solid fa-triangle-exclamation me-2"></i>{" "}
                     {error}
                   </div></div>  : ''}
  <div className="container mt-5">
        <div className="row mt-5">
            <div className="mt-4">
  <div className="shadow p-3 my-5 bg-body rounded row">
    <div className="col-md-5 position-relative">
        <div className="ImageCon"><img src={`https://wadi.pro/${JSON.parse(localStorage.getItem('image'))}` || userImage} className='w-100 m-auto imgg' alt="user"/></div>
        <div className="UpdatePhoto"><i className="fa-solid fa-pen"></i> <input
                      className="fileUploadInput"
                      type="file"
                      name="photo"
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                      id="formFile"
                      onChange={ChangePhoto}
                    /></div>
    </div>
    <div className="col-md-7 ms-s-4">
    <div className="DataInsProfile mt-5">
                  <div className="DataConProfile  w-100"><h3>ID :</h3> <p>{JSON.parse(localStorage.getItem('userData')).id}</p></div>
                  <div className="DataConProfile  w-100"><h3>Name :</h3> <p>{JSON.parse(localStorage.getItem('userData')).first_name} {JSON.parse(localStorage.getItem('userData')).last_name}</p></div>
                  <div className="DataConProfile  w-100"><h3>Email :</h3> <p>{JSON.parse(localStorage.getItem('userData')).email}</p></div>
                  <div className="DataConProfile  w-100"><h3>Date Of Birth :</h3> <p>{JSON.parse(localStorage.getItem('userData')).birth_date}</p></div>
                  <div className="DataConProfile  w-100"><h3>Unique ID :</h3> <p>{JSON.parse(localStorage.getItem('userData')).wadi_id}</p></div>
                </div>
    </div>

  </div>
  </div>
  </div>
  </div>
  
  </>
}
