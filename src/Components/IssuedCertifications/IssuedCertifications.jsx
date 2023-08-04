import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'
import "react-datalist-input/dist/styles.css";
import axios from 'axios';
import { useEffect } from 'react';
import LoadingPage from '../LoadingPage/LoadingPage';
import './IssuedCertifications.css'

export default function IssuedCertifications() {
  const [Certs, setCerts] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [IdInstructor, setIdInstructor] = useState(JSON.parse(localStorage.getItem('userData')).wadi_id);


  useEffect(() => {
    const config = {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    };
    getCertsTable(config)
  }, [])
  

  async function getCertsTable(config){
    setPageLoading(true)
     await axios.post('https://wadi.pro/api/instructor/students/certifications' , '', config).then((data) => {
      setCerts(data.data.data)
      console.log(data.data.data);
    setPageLoading(false)
    }).catch((error) => {
      console.log(error);
    setPageLoading(false)
    })
}
let count = 0;

  return (
    <>
    <Navbar/>
    <SideMenu/>
  {pageLoading ? <LoadingPage /> : ""}

    <div className="container-fluid tableCon mt-6">
    {Certs.length > 0 ? '' : <div>   <div className="alert alert-warning" role="alert">
    <i className="fa-solid fa-circle-exclamation me-1"></i> You hadn't Certified any Students Before
</div> </div>}
    <table className="table table-success table-striped mt-3 shadow">
    <thead>
    <tr>
      <th scope="col">N</th>
      <th scope="col">Number</th>
      <th scope="col">Name</th>
      <th scope="col">Student Name</th>
      <th scope="col">Birth Date</th>
      <th scope="col">Date of Issue</th>
      <th scope="col">Instructor Number</th>
      <th scope="col">Student Email</th>
    </tr>
  </thead>
  <tbody>
  {Certs.length > 0 ? Certs.map((cert , indx) => <tr key={indx}> 
    <th scope="col">{++count}</th>
      <th scope="col">{cert.certification_number}</th>
      <th scope="col">{cert.certification_name}</th>
      <th scope="col">{cert.student.first_name} {cert.student.last_name}</th>
      <th scope="col">{cert.student.birth_date}</th>
      <th scope="col">{cert.created_at.split('').splice(0,10).join('')}</th>
      <th scope="col">{IdInstructor}</th>
      <th scope="col">{cert.student.email}</th>
    </tr> )
   : ''
}
</tbody>
        </table>
        </div>
    </>
  )
}
