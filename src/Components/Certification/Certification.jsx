import html2canvas from 'html2canvas';
import React, { useContext } from 'react'
import { useState } from 'react';
import InstructorAndAbove from "./Instructor and above.jpg";
import Advanced from "./Advanced.jpg";
import divemaster from "./divemaster.jpg";
import DiscoverDiving from "./Discover Diving.jpg";
import GreenGuard from "./Green Guard.jpg";
import Nitrox from "./Nitrox.jpg";
import OWD from "./OWD.jpg";
import RescueBack from "./Rescue Back.jpg";
import backSpecial from './specialBack.png';
import masterAndAboveFace from "./divemaster.jpg";
import masterLowFace from "./OpenWater.jpg";
import { useEffect } from 'react';
import { CertificationContext } from '../CertificationContext/CertificationContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import LoadingPage from '../LoadingPage/LoadingPage';




export default function Certification() {

  let navigate = useNavigate()
  const [success, setSuccess] = useState(null);
  const [faceCertification, setfaceCertification] = useState(null);
  const [Footer, setFooter] = useState(null);
  const [FooterSpecialty , setFooterSpecialty] = useState(null)

  // document.addEventListener('contextmenu', (e) => e.preventDefault());

  // function ctrlShiftKey(e, key) {
  //   return e.ctrlKey && e.shiftKey && e.key === key.charCodeAt(0);
  // }
  
  // document.onkeydown = (e) => {
  //   if(e.key == 'F12') {
  //     return false;
  // }

  // // disable I key
  // if(e.ctrlKey && e.shiftKey && e.key == 73){
  //     return false;
  // }

  // // disable J key
  // if(e.ctrlKey && e.shiftKey && e.key == 74) {
  //     return false;
  // }

  // // disable U key
  // if(e.ctrlKey && e.key == 85) {
  //     return false;
  // }
  // };


  let x = useContext(CertificationContext)


  const [userData, setuserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

let date = new Date()

const [CertficationSelected, setCertficationSelected] = useState(null);
const [pageLoading, setpageLoading] = useState(false)
const [DateOfCert, setDateOfCert] = useState({
  CertficationSelected : null,
  studentt : x.studentt,
  AddStudent: x.AddStudent,
  DateOfIssue: x.DateOfIssue,
  CertItem: x.CertItem || 'Rescue Diver',
  TraningsSelected : x.viewTraningssList || null 
})

let img = DateOfCert.AddStudent ? `https://wadi.pro/${DateOfCert.AddStudent.photo}` : DateOfCert.studentt ? `https://wadi.pro/${DateOfCert.studentt.photo}` : '' 
let year = date.getFullYear()
console.log(year);
let NumberOfCertification = year.toString().split('').splice(2 , 4).join('')  + DateOfCert.CertItem.charAt(0) + DateOfCert.CertItem.charAt(DateOfCert.CertItem.indexOf(' ') + 1) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
console.log(NumberOfCertification);
let id =  x.studentt ? x.studentt.id :  null ;
let id2 = x.AddStudent ?  x.AddStudent.id :  null ;
console.log(id , id2);
const [SendData, setSendData] = useState({
  student_id : id ? id : id2 ? id2 : '',
  instructor_id : userData.id,
  certification_name : x.CertItem,
  certification_number : NumberOfCertification,
  RefInstructor : x.RefInstructor,
  DiveCenter : x.DiveCenter,
})
let NumbersOfSpecialists = []
let NumOfOneSpecialty =  year.toString().split('').splice(2 , 4).join('')  + x.TraningsSelected[0].charAt(0) + x.TraningsSelected[0].charAt(x.TraningsSelected[0].indexOf(' ') + 1) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
let Specialists = []
for (let i = 0; i < x.viewTraningssList.length; i++) {
  NumbersOfSpecialists[i] = year.toString().split('').splice(2 , 4).join('')  + x.viewTraningssList[i].charAt(0) + x.viewTraningssList[i].charAt(x.viewTraningssList[i].indexOf(' ') + 1) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
  Specialists.push({
    student_id : id ? id : id2 ? id2 : '',
    instructor_id : userData.id,
    specialty_name : x.viewTraningssList[i],
    specialty_number : NumbersOfSpecialists[i],
    RefInstructor : x.RefInstructor,
    DiveCenter : x.DiveCenter,
  })
}
console.log(Specialists);





// ................. Configiration ..................

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
};
async function storeCerts(){
  x.setCountCertsSubmitted(++x.CountCertsSubmitted)
  console.log(x.CountCertsSubmitted);
  setpageLoading(true)
  await axios.post('https://wadi.pro/api/user-certification/store' , SendData , config ).then((res) => {
    console.log(res);
    setSuccess(res.data.message)
    setTimeout(() => {
      setSuccess(null)
    }, 5000);
  setpageLoading(false)
  }).catch((error) => {
    console.log(error);
  setpageLoading(false)
})
 }

 async function storeSpecialists(indx){
  x.setCountCertsSubmitted(++x.CountCertsSubmitted)
  console.log(x.CountCertsSubmitted);
  setpageLoading(true)
  await axios.post('https://wadi.pro/api/user-certification/store' , Specialists[indx] , config ).then((res) => {
    console.log(res);
    setSuccess('Student Specialty created Successfully')
    setTimeout(() => {
      setSuccess(null)
    }, 5000);
  setpageLoading(false)
  }).catch((error) => {
    console.log(error);
  setpageLoading(false)
})
 }


useEffect(() => {
      if (DateOfCert.CertItem === 'Advanced Scuba Diver') {
        setCertficationSelected(Advanced)
        setfaceCertification(masterLowFace)
        setFooter(' This certification Level is ISO 24801-1 & as set by WADI ')
      } else if (DateOfCert.CertItem === 'Divemaster'){
        setCertficationSelected(divemaster)
        setfaceCertification(masterLowFace)
        setFooter(' This certification Level is ISO 24801-3 & as set by WADI ')
      } else if (DateOfCert.CertItem === 'Discover Diving'){
        setCertficationSelected(DiscoverDiving)
        setfaceCertification(masterLowFace)
        setFooter('This Diver Successfully Meet Requirements For This Certification Level As Set By WADI')
      } else if (DateOfCert.CertItem === 'Parrotfish Protector' || DateOfCert.CertItem === 'Nemo Fish Protector' || DateOfCert.CertItem === 'Coral Reef protector'){
        setCertficationSelected(GreenGuard)
        setfaceCertification(masterLowFace)
        setFooter('This Diver Successfully Meet Requirements For This Certification Level As Set By WADI ')
      }else if (DateOfCert.CertItem === 'Nitrox') {
        setCertficationSelected(Nitrox)
        setfaceCertification(masterLowFace)
        setFooter(`This Diver Successfully Meets Requirements For This Certification Level As Set By WADI 
         ENRICHED AIR NITROX MAXIMUM 40% O2`)
      }else if (DateOfCert.CertItem === 'Open Water Diver') {
        setCertficationSelected(OWD)
        setfaceCertification(masterLowFace)
        setFooter(' This certification Level is ISO 24801-2 & as set by WADI ')
      }else if (DateOfCert.CertItem === 'Rescue Diver') {
        setCertficationSelected(RescueBack) 
        setfaceCertification(masterLowFace)
        setFooter(` This Diver Successfully Meet Requirements For This Certification Level As Set By WADI `)
      }else if(DateOfCert.CertItem === 'Assistant Instructor'){
        setFooter(' This certification Level is ISO 24802-1 & as set by WADI ')
      }else if(DateOfCert.CertItem === 'Assistant TOT'){
        setFooter(`This SCUBA Instructor Has successfully Meet The Requirements 
        For This Certification Level As Set By WADI International OU
        Visit WADI website for renewal status information`)
      }else if(DateOfCert.CertItem === 'Diving Instructor'){
        setFooter(' This certification Level is ISO 24802-2 & as set by WADI ')
      }else {
        setCertficationSelected(InstructorAndAbove)
        setfaceCertification(masterAndAboveFace)
        setFooter(` This Diver Successfully Meet Requirements For This Certification Level As Set By WADI`)
      }
      setFooterSpecialty(` This Diver Successfully Meet Requirements For This Certification Level As Set By WADI `)
      x.setCountCerts(x.viewTraningssList.length + 1)
    })
    

    
    

    function convert(e) {
      if (document.getElementById(e).parentNode.childNodes.length > 2) {
        document.getElementById(e).parentNode.childNodes[2].innerHTML = `<i class="fa-solid fa-check-double"></i>`
        document.getElementById(e).parentNode.childNodes[2].disabled = true
      }else {
        document.getElementById(e).parentNode.childNodes[1].innerHTML = `<i class="fa-solid fa-check-double"></i>`
        document.getElementById(e).parentNode.childNodes[1].disabled = true
      }
      storeCerts()
        const screenShotTarget = document.getElementById(e);
        html2canvas(screenShotTarget).then((canvas) => {
          const baseImage = canvas.toDataURL("image/jpg");
          var anchor = document.createElement("a");
          anchor.setAttribute("href", baseImage);
          anchor.setAttribute("download", `${e}.jpg`);
          anchor.click();
          anchor.remove();
        });
      }


      function convertSpecial(e , indx) {

          document.getElementById(e).innerHTML = `<i class="fa-solid fa-check-double"></i>`
          document.getElementById(e).disabled = true

        storeSpecialists(indx)
          const screenShotTarget = document.getElementById(e + 'SP');
          html2canvas(screenShotTarget).then((canvas) => {
            const baseImage = canvas.toDataURL("image/jpg");
            var anchor = document.createElement("a");
            anchor.setAttribute("href", baseImage);
            anchor.setAttribute("download", `${e}.jpg`);
            anchor.click();
            anchor.remove();
          });
        }


  return <>
  <Navbar/>
  {pageLoading ? <LoadingPage /> : ""}
  {success ?  <div className="NotiCon mt-5">
     
     <div className="alert alert-success mt-4" role="alert">
           <i className="fa-solid fa-check-double me-2"></i>{" "}
                     {success}
           </div>
   </div> : ''}

  <div className="container my-5">
    <div className="row my-5">
      <div className='col-md-3 '>
                <div className="imgCon position-relative w-100" id={NumberOfCertification}>
                  <img
                    src={CertficationSelected}
                    alt="face certification"
                    className="w-100 m-0 "
                  />
                 {faceCertification === masterAndAboveFace ? <> <img
                    src={masterAndAboveFace}
                    alt="face certification"
                    className="w-100 m-0 face"
                  />
                  <div className="infoCardCon">
                    <div className="infoCard">
                      <h3 className="CertName">{DateOfCert.CertItem || null}</h3>
                      <div className="CertStuImg"> <img src={img} className='h-100 w-100' alt="Student" /> </div>
                      <p className="StudName">{DateOfCert.AddStudent ? `${DateOfCert.AddStudent.first_name} ${DateOfCert.AddStudent.last_name}` : DateOfCert.studentt ? `${DateOfCert.studentt.first_name} ${DateOfCert.studentt.last_name}` : '' }</p>
                      <p className="StudName"></p>
                      <p className="DateOfIssue">{DateOfCert.DateOfIssue}</p>
                      <p className="InstrName">
                        {userData.first_name} {userData.last_name}
                      </p>
                      <p className="InstrNumber">{userData.wadi_id}</p>
                      <p className="NumOfCert">{NumberOfCertification}</p>
                      <div className="FooterCon"><p className="Footer">{Footer}</p></div> 
                    </div>
                  </div></> : <> <img
                    src={masterLowFace}
                    alt="face certification"
                    className="w-100 m-0 face"
                  />
                  <div className="infoCardCon">
                    <div className="infoCard">
                      <h3 className="CertName">{DateOfCert.CertItem || null}</h3>
                      <div className="CertStuImg"> <img src={img} className='h-100 w-100' alt="Student" /> </div>
                      <p className="StudName">{DateOfCert.AddStudent ? `${DateOfCert.AddStudent.first_name} ${DateOfCert.AddStudent.last_name}` : DateOfCert.studentt ? `${DateOfCert.studentt.first_name} ${DateOfCert.studentt.last_name}` : '' }</p>
                      <p className="StudName"></p>
                     <p className="DateOfBirth">{DateOfCert.AddStudent.birth_date}</p>
                      <p className="DateOfIssue">{DateOfCert.DateOfIssue}</p>
                      <p className="InstrName">
                        {userData.first_name} {userData.last_name}
                      </p>
                      <p className="InstrNumber">{userData.wadi_id}</p>
                      <p className="NumOfCert">{NumberOfCertification}</p>
                      <div className="FooterCon"><p className="Footer">{Footer}</p></div> 
                    </div>
                  </div></>}
                </div>
                <button
                  onClick={() => convert(NumberOfCertification)}
                  className="button w-100 my-3"
                  id={NumberOfCertification}
                  name='true'
                >
                  Submit Certification
                </button>
                </div>








                {x.viewTraningssList.length <= 0 ? <div className="col-md-3">  <div className="imgCon position-relative w-100" id={NumOfOneSpecialty + 'SP'}>
                <img
                  src={x.TraningsSelected[0] === 'Nitrox Diver' ? Nitrox : backSpecial}
                  alt="back specialty"
                  className="w-100 m-0 "
                />
                <img
                  src={masterAndAboveFace}
                  alt="face certification"
                  className="w-100 m-0 face"
                />
                <div className="infoCardCon">
                  <div className="infoCard">
                    <h3 className="CertName">{x.TraningsSelected[0] || null}</h3>
                    <div className="CertStuImg" style={{backgroundImage: `url(${img})`}}> <img src={img} className='h-100 w-100' alt="Student" /> </div>
                    <p className="StudName">{DateOfCert.AddStudent ? `${DateOfCert.AddStudent.first_name} ${DateOfCert.AddStudent.last_name}` : DateOfCert.studentt ? `${DateOfCert.studentt.first_name} ${DateOfCert.studentt.last_name}` : '' }</p>
                    <p className="DateOfIssue">{DateOfCert.DateOfIssue}</p>
                    <p className="InstrName">
                      {userData.first_name} {userData.last_name}
                    </p>
                    <p className="InstrNumber">{userData.wadi_id}</p>
                    <p className="NumOfCert">{NumOfOneSpecialty}</p>
                    <div className="FooterCon"><p className="Footer">{FooterSpecialty}</p></div> 
                  </div>
                </div>
              </div>
              <button
                onClick={() => convertSpecial(NumOfOneSpecialty , 0)}
                className="button w-100 my-3"
                id={NumOfOneSpecialty}
                name='true'
              >
                Submit Certification
              </button> </div> : x.viewTraningssList.map((e , indx) => <div className="col-md-3" key={indx}>  <div className="imgCon position-relative w-100" id={NumbersOfSpecialists[indx] + 'SP'}>
                  <img
                    src={e === 'Nitrox Diver' ? Nitrox : backSpecial}
                    alt="back specialty"
                    className="w-100 m-0 "
                  />
                  <img
                    src={masterAndAboveFace}
                    alt="face certification"
                    className="w-100 m-0 face"
                  />
                  <div className="infoCardCon">
                    <div className="infoCard">
                      <h3 className="CertName">{e || null}</h3>
                      <div className="CertStuImg" style={{backgroundImage: `url(${img})`}}> <img src={img} className='h-100 w-100' alt="Student" /> </div>
                      <p className="StudName">{DateOfCert.AddStudent ? `${DateOfCert.AddStudent.first_name} ${DateOfCert.AddStudent.last_name}` : DateOfCert.studentt ? `${DateOfCert.studentt.first_name} ${DateOfCert.studentt.last_name}` : '' }</p>
                      <p className="DateOfIssue">{DateOfCert.DateOfIssue}</p>
                      <p className="InstrName">
                        {userData.first_name} {userData.last_name}
                      </p>
                      <p className="InstrNumber">{userData.wadi_id}</p>
                      <p className="NumOfCert">{NumbersOfSpecialists[indx]}</p>
                      <div className="FooterCon"><p className="Footer">{Footer}</p></div> 
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => convertSpecial(NumbersOfSpecialists[indx] , indx)}
                  className="button w-100 my-3"
                  id={NumbersOfSpecialists[indx]}
                  name='true'
                >
                  Submit Certification
                </button> </div>) }

                </div>
  </div>
              </>
}
