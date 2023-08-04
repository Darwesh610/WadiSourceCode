import React from 'react'
import './LoadingPage.css'
import img from './logoonlypng.png'

export default function LoadingPage() {
  return (
    <>
    <div className="w-100 vh-100 loading d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center loadingCon">
        <img src={img} className='imgLoading' />
    <i className="fa-solid fa-spinner fa-spin spinSize color-green"></i>
        </div>
            </div>
    </>
  )
}
