import React, { useContext } from 'react'
import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'
import axios from 'axios'
import { useEffect } from 'react'
import LoadingPage from '../LoadingPage/LoadingPage'
import './CreditInvoice.css'
import { CertificationContext } from '../CertificationContext/CertificationContext'

export default function CreditInvoice() {

  let x = useContext(CertificationContext)


  
  const [CertCredit, setCertCredit] = useState(null)
  const [Amount, setAmount] = useState(null)
  const [Catgeroies, setCatgeroies] = useState([])
  const [pageLoading, setPageLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);




  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  };

  async function getCatgeories() {
    setPageLoading(true)
    await axios.get('https://wadi.pro/api/categories' , config).then(
      (res) => {
        setCatgeroies(res.data.data)
        x.setCreditsCatogries(res.data.data)
        console.log(res.data.data);
        setPageLoading(false)
      } 
    ).catch((error) => {
      setPageLoading(false)
      console.log(error)
    })
  }

  async function PurchaseCredits() {
    if(CertCredit){
      await axios.post('https://wadi.pro/api/instructor/balance/add' , CertCredit , config).then((res) => {
        setError(null)
        setSuccess(res.data.message)
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }else {
      setSuccess(null)
      setError('You Must Insert Any Count of Credits')
    }

  }

  useEffect(() => {
    getCatgeories();
  },[])
  
  function getCredits(e){
    let userClone = { ...CertCredit };
    userClone[e.target.id] = e.target.value
    setCertCredit(userClone)
  }
  function getAmountOfCredits(e){
    let userClone = { ...Amount };
    userClone[e.target.id] = e.target.value
    setAmount(userClone)
    console.log(Amount);
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
  <div className="container my-5">
    <div className="my-5 py-5">
    <div className="shadow px-5 py-4 bg-body rounded my-5">
<h3>Choose Your Credit To Buy :</h3>
<div className="radiosCon">
 {Catgeroies.length > 0 ? Catgeroies.map((cat , indx) =>  <div key={indx} className='CatCon'>
 <div className="form-check d-flex w-50 my-3">
   <input className="radio me-3 mt-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
   <label className="form-check-label" htmlFor="flexRadioDefault1">
     Credits For {cat.name}
   </label>
 </div>
 <div className="CountCredits ms-5">
   <h6>Please Insert Number of Credit do you want to add :</h6>
   <span className='span'>Every One Credit = {cat.price} $</span>
 <input onChange={getCredits} type="number" className="input" id={cat.name}/>
   <h6 className='mt-2' onChange={getAmountOfCredits} id={cat.name}>Total Amount : <span className='span d-inline fs-6'>{CertCredit ? CertCredit[cat.name] * cat.price : 0} $</span></h6>
 
 </div>
 </div> )
 : ""} 
</div>
  <button onClick={PurchaseCredits} type='submit' className='button w-100 my-5'>Purchase</button>
  </div>
    </div>
  </div>

  
  </>
}
