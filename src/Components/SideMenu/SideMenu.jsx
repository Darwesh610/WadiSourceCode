import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import './SideMenu.css'


export default function SideMenu() {
  return (
    <>
    <button className="button px-3 sideMenu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="fa-solid fa-bars"></i></button>

<div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Colored with scrolling</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  </div>
</div>
<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">Offcanvas with backdrop</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <p>.....</p>
  </div>
</div>
<div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header d-flex flex-column text-center">
  <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel"><img src={logo} className="w-50" alt="logo wadi"/></h5>
  </div>
  <div className="offcanvas-body">
  <div className="d-flex align-items-start">
  <div className="nav w-100 flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <Link to={'/IssuedCertifications'} ><button className="button text-start px-4 my-2 w-100 active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa-solid mx-1 fa-graduation-cap"></i> My Students Certifications</button></Link>
    <Link to={'/IssuedTrainings'} ><button className="button text-start px-4 my-2 w-100" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa-solid mx-1 fa-graduation-cap"></i> My Students Specialities </button></Link>
    <Link to={'/certifyStudent'} ><button className="button text-start px-4 my-2 w-100" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa-solid mx-1 fa-handshake"></i> Certify Diver Students</button></Link>
    <Link to={'/forums'} ><button className="button text-start px-4 my-2 w-100" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa-regular mx-1 fa-file-pdf"></i> Forms </button></Link>
  </div>
</div>
  </div>
</div>
    
    </>
  )
}
