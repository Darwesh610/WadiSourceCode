import './Instructor.css'
import logoOnly from './logoonlypng.png'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'
import React, { useState } from 'react'



export default function Instructor() {

  const [Certs, setCerts] = useState(JSON.parse(localStorage.getItem('userData')).certifications )
  const [addresses, setaddresses] = useState(JSON.parse(localStorage.getItem('userData')).address)
  return (
    <>
      <img src={logoOnly} className="logoInside" alt="wadi logo" />
      <Navbar/>
      <SideMenu/>




{/* ....................... Certifications Section ......................... */}
      <div className="CertsCon">
        <div className="row">
          <div className="col-md-12">
            <h3 className='font-color'><i className="fa-solid fa-certificate color-green"></i> Your Certifications</h3>
            <div className="cardCont row  mt-4">
              {Certs.length > 0 ? Certs.map((cert , indx) => <div key={indx} className="card border-success certCard mx-4 mb-3 col-md-3">
  <div className="card-header">WADI Certification</div>
  <div className="card-body color-green">
    <h5 className="card-title"><i className="fa-solid fa-graduation-cap me-3"></i>{cert.name}</h5>
  </div>
</div>) :  <h1 className='color-green'>No Certifications Added Yet</h1>
}
            </div>
           
          </div>
        </div>
      </div>



{/* ....................... Addresses Section ......................... */}


<div className="CertsCon my-5">
        <div className="row">
          <div className="col-md-12">
            <h3 className='font-color'><i className="fa-solid fa-map-location-dot color-green"></i> Your Addresses</h3>
            <div className="cardCont row  mt-4">
              {addresses ?  addresses.map((cert , indx) => <div key={indx} className="card border-success certCard mx-4 mb-3 col-md-3">
  <div className="card-header">Address</div>
  <div className="card-body text-success">
    <h5 className="card-title"><i className="fa-solid fa-map-location-dot me-3"></i>{cert.name}</h5>
  </div>
</div>) : <h1 className='color-green'>No Addresses Added Yet</h1>}
            </div>
           
          </div>
        </div>
      </div>
      
      </>
  )
}



 