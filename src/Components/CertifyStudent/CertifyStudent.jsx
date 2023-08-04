import React, { useEffect, useState } from "react";
import "./CertifyStudent.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import Joi from "joi";
import LoadingPage from "../LoadingPage/LoadingPage";
import userImage from "./user.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CertificationContext } from "../CertificationContext/CertificationContext";







export default function CertifyStudent() {

  let date = new Date()


  // ................. Configiration ..................

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  };

  

  let x = useContext(CertificationContext)
  
  useEffect(() => {
    getBalance()
    x.getCatgeories()
    x.setAddStudent(null)
    x.setDateOfIssue(null)
    x.setCertItem(null)
    x.setStudentt(null)
    x.setTraningsSelected([])
    x.setRefInstructor(null)
    x.setDiveCenter(null)
    x.setviewTraningssList([])
  },[])
  // .............. Instructor Credits ...................
  const [Credits, setCredits] = useState(null);
  const [specialists, setspecialists] = useState(null);
  const [certifications, setCertificationss] = useState(null);
  

  async function getBalance(){
    await axios.get('https://wadi.pro/api/instructor/balance' , config).then((res) =>{
      console.log(res.data.data);
      setCredits(res.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  

  //............... Instructor States ......................
  const [instructor, setInstructor] = useState({
    wadi_id: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
  });
  const [searchInstructor, setSearchInstructor] = useState(null);
  const [AddRefInstructor, setAddRefInstructor] = useState(null);
  const [isLoadingInstructor, setisLoadingInstructor] = useState(false);
  const [isLoadingInstructorData, setisLoadingInstructorData] = useState(false);
  const [ErrorInstructor, setErrorInstructor] = useState(null);

  
  //............... Student States ......................
  const [student, setStudent] = useState({
    first_name:'',
    last_name:'',
    birth_date:'',
    wadi_id: ''
  });
  const [image, setImage] = useState(null);
  const [studentAdd, setStudentAdd] = useState({
    wadi_id: Math.floor(Math.random() * 1000000),
    password: `WADI${JSON.parse(localStorage.getItem('userData')).unique_id}`,
    password_confirmation: `WADI${JSON.parse(localStorage.getItem('userData')).unique_id}`,
    first_name: "",
    last_name: "",
    email: "",
    birth_date: '',
    address: "",
    counrty: "",
    mobile: "",
    photo: '',
    instructor_id: JSON.parse(localStorage.getItem('userData')).id.toString()
  });
  
  const [SearchStudent, setSearchStudent] = useState(null);
  const [isLoadingStudent, setisLoadingStudent] = useState(false);
  const [isLoadingStudentData, setisLoadingStudentData] = useState(false);
  const [ErrorStudent, setErrorStudent] = useState(null);


  const [error, setError] = useState(null);
  const [Warning, setWarning] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [LoadingButton, setLoadingButton] = useState(false)
  const [userData, setuserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const [DiveCenters, setDiveCenters] = useState([]);
  const [Certifications, setCertifications] = useState([]);
  const [Trainings, setTrainings] = useState([]);
  let TraningsSelectedClone = [];




// ................. Certification Shot ..................


let navigate = useNavigate();


 function showPreview(e) {

  setLoadingButton(true)
  // if (certifications <= 0){
  //   setError("Your balance is not enough to Generate a new certificate")
  //   setLoadingButton(false)
  //     setTimeout(() => {
  //       setError(null)
  //     }, 2000);

  // }else if (specialists < x.TraningsSelected.length){
  //   setError("Your balance is not enough to Generate a new Specialty")
  //   setLoadingButton(false)
  //     setTimeout(() => {
  //       setError(null)
  //     }, 2000);

  // }else 
  if(!x.AddStudent && !x.studentt){
    setError('You Must Add Student First')
  setLoadingButton(false)
    setTimeout(() => {
      setError(null)
    }, 2000);
  } else if (!x.CertItem) {
    setError('You Must Add Type of Certification')
  setLoadingButton(false)
    setTimeout(() => {
      setError(null)
    }, 2000);
  }else if (!x.DateOfIssue) {
    setError('You Must Insert Date Of Issue')
  setLoadingButton(false)
    setTimeout(() => {
      setError(null)
    }, 2000);
  }else if (x.DateOfIssue){

    let arrDate = x.DateOfIssue.split('-')
    let dateOfIssueNew = new Date(arrDate[0] , arrDate[1]-1 , arrDate[2])
    let y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDate();
    let dateNew = new Date(y,m,d);




   if(dateOfIssueNew > dateNew){
    console.log(dateOfIssueNew);
    console.log(dateNew);
    setError('You Must Insert Valid Date')
    setLoadingButton(false)
    setTimeout(() => {
      setError(null)
    }, 8000);
  }else if(!x.RefInstructor){
    setWarning("You didn't add a Reffiring Instructor or Dive Center")
    setTimeout(() => {
      setWarning(null)
    }, 2000);
    setTimeout(() => {
    navigate('/certification')
    }, 3000);
  }else if(!x.DiveCenter){
    setWarning("You didn't add a Dive Center or Reffiring Instructor")
    setTimeout(() => {
      setWarning(null)
    }, 2000);
    setTimeout(() => {
    navigate('/certification')
    }, 3000);
  }else {
    navigate('/certification')
  }
}


}



// ................. Add Student ..................


  function ChangeStyle(){
    if (document.getElementById('addNewStudent').classList.contains('noActive')) {
      document.getElementById('addNewStudent').classList.remove('noActive')
      document.getElementById('addNewStudent').classList.add('activee')
    }else {
      document.getElementById('addNewStudent').classList.add('noActive')
      document.getElementById('addNewStudent').classList.remove('activee')
    }
  }


  function getAddStudent(e) {
    let userClone = { ...studentAdd };
    if (e.target.name === 'photo') {
      setImage(e.target.files[0])
      userClone[e.target.name] = e.target.files[0]
    } else {
      userClone[e.target.name] = e.target.value
    }
    setStudentAdd(userClone);
  }

  async function SubmitLoginForm(e) {
    document.getElementById('addNewStudent').classList.add('activee')
    e.preventDefault();
    let fd = new FormData();
    setError(null);
    setSuccess(null);
    setErrorList([]);
    setisLoading(true);

    let ValidationCheck = ValidationUser(studentAdd);
    if (ValidationCheck.error) {
      setErrorList([ValidationCheck.error.details[0].message]);
      setTimeout(() => {
        setErrorList([])
        }, 5000);
    document.getElementById('addNewStudent').classList.add('activeeWith')
      setisLoading(false);
    } else if(!image){
      setErrorList(['Image must be Included'])
      setTimeout(() => {
        setErrorList([])
        }, 5000);
      setisLoading(false);
    } else {
      fd.append('wadi_id', Math.floor(Math.random() * 1000000))
      fd.append('password', `WADI${JSON.parse(localStorage.getItem('userData')).unique_id}`)
      fd.append('password_confirmation', `WADI${JSON.parse(localStorage.getItem('userData')).unique_id}`)
      fd.append('first_name', studentAdd.first_name)
      fd.append('last_name', studentAdd.last_name)
      fd.append('birth_date', studentAdd.birth_date)
      fd.append('email', studentAdd.email)
      fd.append('address', studentAdd.address)
      fd.append('counrty', studentAdd.counrty)
      fd.append('mobile', studentAdd.mobile)
      fd.append('instructor_id', JSON.parse(localStorage.getItem('userData')).id)
      fd.append('photo', image , 'photo1')
       await axios.post(
        "https://wadi.pro/api/student/store",
        fd,
        config
      ).catch((error) => {
      document.getElementById('addNewStudent').classList.add('activeeWith')
        setError(error.response.data.message)
        setTimeout(() => {
          setError(null)
          }, 5000);
        setisLoading(false);
      }).then((res) => { 
      document.getElementById('addNewStudent').classList.add('activeeWith')
       setisLoading(false);
      setSuccess(res.data.message);
        setTimeout(() => {
        setSuccess(null)
        }, 5000);
        setError(null)
        x.setStudentt({
          first_name : res.data.data.student.first_name,
          last_name : res.data.data.student.last_name,
          email: res.data.data.student.email,
          birth_date : res.data.data.student.birth_date,
          photo : res.data.data.student.photo,
          unique_id : res.data.data.student.unique_id,
          id : res.data.data.student.id,
        })
      }
        )
    }
  }

  function ValidationUser(student) {
    let schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      first_name: Joi.string().max(16).min(2).required(),
      last_name: Joi.string().max(16).min(2).required(),
      birth_date: Joi.date().required().less("12-31-2015"),
      address: Joi.string().required().min(2).max(100),
      counrty: Joi.string().required().min(2).max(15),
      mobile: Joi.any(),
      photo: Joi.any().required(),
      instructor_id: Joi.string(),
      wadi_id: Joi.any().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required(),
    });
    return schema.validate(student, { abortEarly: false });
  }

// ................. Search Instructor ..................

  function getInstructor(e) {
    
    if(e.target.name === 'wadi_id'){
      let userClone = {};
      userClone['wadi_id'] = e.target.value
      setInstructor(userClone);
    }else {
      let userClone = { ...instructor };
      userClone[e.target.name] = e.target.value;
      setInstructor(userClone);
    }

  }

  async function searchById() {
    setisLoadingInstructor(true);
    if(instructor.wadi_id){
      await axios.post(
        `https://wadi.pro/api/instructor/search`, instructor ,
        config
      ).then((res) => {
        console.log(res);
        setErrorInstructor(null);
      setisLoadingInstructor(false);
      setSearchInstructor(res.data.data);
      x.setRefInstructor(res.data.data);
        document.getElementById('searchINSbyId').value = ''
      }).catch((error) => {
        setisLoadingInstructor(false);
          setErrorInstructor(error.response.data.message);
        document.getElementById('searchINSbyId').value = ''
      })
    }else {
      setisLoadingInstructor(false);
      setErrorInstructor('You Must Insert ID of Instructor');
    }
     
  }


  function addInstructor(e){
    console.log(searchInstructor[e.target.id]);
    if (searchInstructor[e.target.id].unique_id === JSON.parse(localStorage.getItem('userData')).wadi_id) {
      setError("You Can't Choose the Same as Logged Instructor Right Now")
      setTimeout(() => {
        setError(null)
      }, 2000);
    }else {
      setAddRefInstructor(searchInstructor[e.target.id])
    }
  }

// .............. Dive Center .......................

  async function getDiveCenters() {
    let { data } = await axios.get(
      "https://wadi.pro/api/dive-center",
      config
    );
    setDiveCenters(data.data);
    x.setDiveCenter(data.data)
  }

  function pickDiveCenter(item){
    x.setDiveCenter(item.value)
  }
  function pickDiveCenter2(item){
    x.setDiveCenter2(item.value)
  }

// .............. Certifications .......................

  async function getCertifications() {
    let { data } = await axios.get(
      "https://wadi.pro/api/certification",
      config
    );
    setCertifications(data.data);
  }


  function pickCertfication(item){
    x.setCertItem(item.value)
  }


  // ............. Select Training ...............
  function selectTraining(e) {
    TraningsSelectedClone.push(e.value);
    x.setTraningsSelected((TraningsSelectedClone) => [...TraningsSelectedClone, e.value]);
    setViewTraningss(false)
  }

  const [viewTraningss, setViewTraningss] = useState(true)

  function viewTranings() {
    for (let i = 0; i < x.TraningsSelected.length; i++) {
      if (x.TraningsSelected[i] !== x.TraningsSelected[i - 1]) {
        TraningsSelectedClone.push(x.TraningsSelected[i]);
      }
    }
    console.log(TraningsSelectedClone);
    x.setviewTraningssList(TraningsSelectedClone);
    console.log(x.viewTraningssList);
  }

  async function getTraining() {
    let { data } = await axios.get(
      "https://wadi.pro/api/specialty",
      config
    );
    setTrainings(data.data)
  }




  // ............. Search Student ...............

  function getStudent(e) {
    if(e.target.name === 'wadi_id'){
      let userClone = {};
      userClone['wadi_id'] = e.target.value
      setStudent(userClone);
    }else {
      student.wadi_id = ''
      let userClone = { ...student };
      userClone[e.target.name] = e.target.value;
      setStudent(userClone);
    }
  }


  async function searchStudentById() {
    x.setAddStudent(null)
    setSearchStudent(null)
    setisLoadingStudent(true);
    if(student.wadi_id){
      await axios.post( `https://wadi.pro/api/student/search` , student ,
        config
      ).then((res) => {
        setErrorStudent(null);
        setisLoadingStudent(false);
      setSearchStudent(res.data.data);
        document.getElementById('wadi_idSTU').value = ''
      }).catch((error) => {
        setisLoadingStudent(false);
          setErrorStudent(error.response.data.message);
        document.getElementById('wadi_idSTU').value = ''
      })
    }else {
      setisLoadingStudent(false);
      setErrorStudent('You Must Insert ID of Student');
    }
     
  }

  async function searchStudentByData(e) {
    x.setAddStudent(null)
    setSearchStudent(null)
    e.preventDefault()
    setisLoadingStudentData(true);
    if(student.first_name && student.last_name && student.date_of_birth){
      let { data } = await axios.post(
        `https://wadi.pro/api/student/search`, student , 
        config
      )
      if (  data.status !== 200 ) {
        setisLoadingStudentData(false);
        if (data.errors) {
          setErrorStudent(data.errors);
        }
      }else {
        setisLoadingStudentData(false);
        if(data.data.length > 0){
          setErrorStudent(null);
          setSearchStudent(data.data);
          document.getElementById('firstNameSTUsearch').value = ''
          document.getElementById('lastNameSTUsearch').value = ''
          document.getElementById('DateNameSTUsearch').value = ''
        }else {
          setSearchStudent(null);
          setErrorStudent('Student Not Found');
        }
      }
    }else {
      setisLoadingStudentData(false);
      setErrorStudent('You Must Insert all Data About Student');
    } 
  }

  function addStudentSearch(e){
    if (x.studentt) {
      setError('You Already Added a Student')
      setTimeout(() => {
        setError(null)
      }, 2000);
    } else {
      x.setAddStudent(SearchStudent[e.target.id])
    }
  }

  function deleteStudent(){
    x.setAddStudent(null);
  }

  // ............................
  function deleteStudentt(){
    x.setStudentt(null);
  }
  function deleteInstructor(){
    setAddRefInstructor(null)
  }


  function getDateOfIssue(e) {
    x.setDateOfIssue(e.target.value)
  }


  return (
    <>
      <Navbar />
      
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
    {Warning ? <div className="NotiCon mt-5">
                    <div className="alert alert-warning mt-4" role="alert">
                      <i className="fa-solid fa-triangle-exclamation me-2"></i>{" "}
                      {Warning}
                    </div></div>  : ''}

  {errorList.map((err, indx) => (
    <div className="NotiCon mt-5" key={indx}>
                    <div
                      className="alert alert-danger mt-4"
                      role="alert"
                    >
                      <i className="fa-solid fa-triangle-exclamation me-2"></i>{" "}
                      {err}{" "}
                    </div>
                    </div>
                  ))}


      {pageLoading ? <LoadingPage /> : ""}
      <div className="container mt-5 position-relative">
        <div className="row mt-5">


        <div className="col-md-12 ps-4 row justify-content-between align-items-center mt-5 ">
            <div className="shadow p-3  bg-body rounded col-md-5">
              <h5 className="color-green">Certify as WADI Instructor</h5>
              <div className="infoCon my-4">
                <p className="font-color">
                  Instructor Name :{" "}
                  <span>
                    {userData.first_name} {userData.last_name}
                  </span>
                </p>
                <p className="font-color">
                  WADI Instructor ID: <span>{userData.wadi_id}</span>
                </p>
                <p className="font-color">
                  WADI Instructor Level: <span>{userData.level}</span>
                </p>
              </div>
            </div>

            <div className="shadow p-3  bg-body rounded col-md-6">

<h5 className="color-green">Certifications Credits</h5>
      <div className="infoCon my-4">
        {x.CreditsCatogries.length > 0 ? x.CreditsCatogries.map((cat , indx) => <>
          <p className="font-color my-4">
                   {cat.name} Credits: <span className="badgeCredit">{certifications}</span>
            </p>
        </>) : <h1>dont have</h1>}
            {/* <p className="font-color my-4">
                  Diving Certifications Credit: <span className="badgeCredit">{certifications}</span>
            </p>
              <p className="font-color my-4">
                  Diving Specialists Credit: <span className="badgeCredit">{specialists}</span>
            </p>
            <p className="font-color">
                first Aid Certifications Credit: <span className="badgeCredit">{firstaid}</span>
            </p> */}
  <Link to={'/creditInvoice'}><button
        type="submit"
        className="FinalButt w-100 mt-4">
          Add More Credits
      </button></Link>
</div>
</div>
</div>
          <div className="col-md-6 ">


                        {/*.............. Pick Certification and/or Specialties ....................*/}

                        <div className="shadow p-3 mb-5 bg-body rounded my-4">
              <h5 className="color-green">
                Pick Certification and/or Specialties
              </h5>
              <div className="infoCon my-4 w-100">
                                <DatalistInput
                  onFocus={getCertifications}
                  className="input"
                  label="Certification"
                  onSelect={pickCertfication}
                  items={Certifications.map((Cert) => {
                    return { id: Cert.id, value: Cert.name };
                  })}
                />
                                    <label
                      className="w-100 me-3 my-2"
                      htmlFor="DateOfIssue"
                    >
                      Date Of Issue :
                    </label>
                    <input
                      type="date"
                      className="date mb-4"
                      id="DateOfIssue"
                      name="DateOfIssue"
                      onChange={getDateOfIssue}
                    />
                <br />
                <DatalistInput
                  onFocus={getTraining}
                  onSelect={selectTraining}
                  className="input"
                  label="Specialty Training"
                  items={Trainings.map((Cert , indx) => {
              
                      return { id: indx, value: Cert.name } 
                    
                  })}
                />

                <button onClick={viewTranings} disabled={viewTraningss} className="button w-100 mt-4">View Specialties You Chosen It</button>
                <div className="selectedCon">
                  <div className="d-flex flex-wrap my-4">
                    {x.viewTraningssList ? x.viewTraningssList.map((traning , indx) => (
                      <div key={indx} className="selectTraining">
                        <p>{traning}</p>
                      </div>
                    )) : ''}
                  </div>
                </div>
              </div>
            </div>

            {/*.............. Pick Dive Centers ....................*/}

            <div className="shadow p-3 mb-5 bg-body rounded my-4">
              <h5 className="color-green">Pick Dive Centers</h5>
              <div className="infoCon my-4">
                <DatalistInput
                  onFocus={getDiveCenters}
                  className="input"
                  label="Dive Center ( Optional )"
                  onSelect={pickDiveCenter}
                  items={DiveCenters.map((dive) => {
                    return { id: dive.id, value: dive.name };
                  })}
                />
                <br />
                <DatalistInput
                  onFocus={getDiveCenters}
                  className="input"
                  label="Reffiring Dive Center ( Optional )"
                  onSelect={pickDiveCenter2}
                  items={DiveCenters.map((dive) => {
                    return { id: dive.id, value: dive.name };
                  })}
                />
              </div>
            </div>

            {/*.............. Pick referring Instructor ....................*/}

            <div className="shadow p-3 mb-5 bg-body rounded my-4">
              <h5 className="color-green">
                Pick referring Instructor{" "}
                <span className="font-color">( optional )</span>
              </h5>
              {ErrorInstructor ? (
                <div className="alert alert-danger mt-4" role="alert">
                  <i className="fa-solid fa-triangle-exclamation me-2"></i>{" "}
                  {ErrorInstructor}
                </div>
              ) : (
                ""
              )}
              <div className="formCon row my-4">
                <div className="col-md-12">
                  <div className="d-flex flex-column">
                    <label
                      className="w-100 me-3 my-2"
                      htmlFor="searchINSbyId"
                    >
                      WADI Instructor Certification ID
                    </label>
                    <input
                      type="text"
                      className="input w-100"
                      id="searchINSbyId"
                      name="wadi_id"
                      onChange={getInstructor}
                    />
                    <button
                      disabled={isLoadingInstructor}
                      onClick={searchById}
                      type="submit"
                      className="button w-100 my-4"
                    >
                      {isLoadingInstructor ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        `Search`
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {searchInstructor ? (
                <table className="w-100 tableINS">
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Level</th>
                  <th scope="col">Email</th>
                  <th scope="col">Add Instructor</th>
                </tr>
               </thead>
               <tbody>
                       {searchInstructor ? searchInstructor.map((INS , index) => <tr key={index}>
                  <th scope="row">{INS.id}</th>
                  <td>{INS.first_name}</td>
                  <td>{INS.last_name}</td>
                  <td>{INS.level}</td>
                  <td>{INS.email}</td>
                  <td><button type="button" onClick={addInstructor} id={index} className="buttInsTable">Add Instructor</button></td>
                </tr>
                       ) : ''}
               </tbody>
                    </table>
              ) : (
                ""
              )}
              {AddRefInstructor ? <div className="INSReff row my-3">
                <div className="ImgCon col-md-4"><img src={userImage} className="userImage" alt="user"/></div> 
                <div className="col-md-8 DataIns position-relative">
                <div onClick={deleteInstructor} className="closeCon2 position-absolute">
                <i className="fa-solid fa-xmark"></i>
                </div>
                  <div className="DataCon"><h3>ID :</h3> <p>{AddRefInstructor.id}</p></div>
                  <div className="DataCon"><h3>Name :</h3> <p>{`${AddRefInstructor.first_name}  ${AddRefInstructor.last_name}`}</p></div>
                  <div className="DataCon"><h3>Email :</h3> <p>{AddRefInstructor.email}</p></div>
                  <div className="DataCon"><h3>Level :</h3> <p>{AddRefInstructor.level}</p></div>
                </div>
              </div>: ''}
            </div>
          </div>

          <div className="col-md-6 mt-5">

            {/*................... Select Student Component ................... */}


            <div className="shadow p-3 mb-5 bg-body rounded mb-4">
              <h5 className="color-green">
                Pick Student{" "}
              </h5>
              {ErrorStudent ? (
                <div className="alert alert-danger mt-4" role="alert">
                  <i className="fa-solid fa-triangle-exclamation me-2"></i>{" "}
                  {ErrorStudent}
                </div>
              ) : (
                ""
              )}
              <div className="formCon row my-4">
                <form onSubmit={searchStudentByData} className="col-md-6">
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
                      id="firstNameSTUsearch"
                      name="first_name"
                      onChange={getStudent}
                    />
                    <input
                      type="text"
                      className="input w-50"
                      id="lastNameSTUsearch"
                      name="last_name"
                      onChange={getStudent}
                    />
                  </div>
                  <div className="dateCon my-4">
                    <label className="me-3" htmlFor="studentDate">
                      Date of Birth
                    </label>
                    <input
                      className="date"
                      type="date"
                      name="date_of_birth"
                      id="DateNameSTUsearch"
                      onChange={getStudent}
                    />
                  </div>
                  <button  disabled={isLoadingStudent}
                       type="submit" className="button w-100">
                     {isLoadingStudentData ?  <i className="fa-solid fa-spinner fa-spin"></i> : `Search` }
                  </button>
                </form>
                <div className="col-md-1">
                  <div className="line"></div>
                </div>
                <div className="col-md-5">
                  <div className="d-flex flex-column">
                    <label
                      className="w-100 me-3 my-2"
                      htmlFor="exampleInputEmail1"
                    >
                      WADI Student Certifcation ID
                    </label>
                    <input
                      type="text"
                      className="input w-100"
                      id="wadi_idSTU"
                      name="wadi_id"
                      onChange={getStudent}
                    />
                    <button
                      disabled={isLoadingStudent}
                      onClick={searchStudentById}
                      type="submit"
                      className="button w-100 my-4"
                    >
                      {isLoadingStudent ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        `Search`
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {SearchStudent ? (
                <table className="w-100 tableINS">
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Birth Date</th>
                  <th scope="col">Email</th>
                  <th scope="col">Add Instructor</th>
                </tr>
               </thead>
               <tbody>
                       {SearchStudent ? SearchStudent.map((INS , index) => <tr key={index}>
                  <th scope="row">{INS.id}</th>
                  <td>{INS.first_name}</td>
                  <td>{INS.last_name}</td>
                  <td>{INS.birth_date}</td>
                  <td>{INS.email}</td>
                  <td><button type="button" onClick={addStudentSearch} id={index} className="buttInsTable">Add Student</button></td>
                </tr>
                       ) : ''}
               </tbody>
                    </table>
              ) : (
                ""
              )}
              {x.AddStudent ? <div className="INSReff row my-3 ">

                <div className="ImgCon col-md-4"><img src={`https://wadi.pro/${x.AddStudent.photo}`} className="userImage" alt="user"/></div> 
                <div className="col-md-8 DataIns mt-5 position-relative">
                <div onClick={deleteStudent} className="closeCon2 position-absolute">
                <i className="fa-solid fa-xmark"></i>
                </div>
                  <div className="DataCon"><h3>ID :</h3> <p>{x.AddStudent.id}</p></div>
                  <div className="DataCon"><h3>Name :</h3> <p>{`${x.AddStudent.first_name}  ${x.AddStudent.last_name}`}</p></div>
                  <div className="DataCon"><h3>Email :</h3> <p>{x.AddStudent.email}</p></div>
                  <div className="DataCon"><h3>Birth Date :</h3> <p>{x.AddStudent.birth_date}</p></div>
                </div>
              </div>: ''}
            </div>

            {/*................... Add Student Component ................... */}

            <div className="shadow addNew p-3 mt-5 bg-body rounded noActive " id="addNewStudent">
              <button onClick={ChangeStyle} className="button w-100 my-3" disabled={x.AddStudent}>Add a New Student</button>
              <h5 className="color-green">Add Student</h5>
              <div className="formCon row mt-4">
                <form onSubmit={SubmitLoginForm} className="col-md-12">




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
                      id="exampleInputEmail1"
                      name="first_name"
                      onChange={getAddStudent}
                    />
                    <input
                      type="text"
                      className="input w-50"
                      id="exampleInputEmail1"
                      name="last_name"
                      onChange={getAddStudent}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="w-50 me-3 my-2"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="input w-100"
                      name="email"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={getAddStudent}
                    />
                  </div>
                  <div className="dateCon my-4">
                    <label className="me-3" htmlFor="date_of_birth">
                      Date of Birth
                    </label>
                    <input
                      className="date"
                      type="date"
                      name="birth_date"
                      onChange={getAddStudent}
                    />
                  </div>
                  <div className="mb-3">
                  <label className="label w-100">
                    Address
                  </label>
                    <input className="input w-75 my-2" name="address" placeholder="Address" type="text" onChange={getAddStudent}/>
                    <label className="label w-100">
                    Country
                  </label>
                    <select className="input w-75 my-2" name="counrty" placeholder="Counrty" type="text" onChange={getAddStudent}>
                      <option>Afghanistan</option>
                      <option>Albania</option>
                      <option>Algeria </option>
                      <option>Andorra</option>
                      <option>Angola </option>
                      <option>Antigua & Barbuda</option>
                      <option>Argentina </option>
                      <option>Armenia</option>
                      <option>Australia</option>
                      <option>Austria </option>
                      <option>Azerbaijan </option>
                      <option>The Bahamas</option>
                      <option>Bahrain </option>
                      <option>Bangladesh</option>
                      <option>Barbados </option>
                      <option>Belarus</option>
                      <option>Belgium </option>
                      <option>Belize </option>
                      <option>Benin </option>
                      <option>Bhutan </option>
                      <option>Bolivia </option>
                      <option>Bosnia & Herzegovina</option>
                      <option>Botswana</option>
                      <option>Brazil </option>
                      <option>Brunei</option>
                      <option>Bulgaria</option>
                      <option>Burkina Faso</option>
                      <option>Burundi </option>
                      <option>Cambodia </option>
                      <option>Cameroon </option>
                      <option>Canada </option>
                      <option>Cape Verde</option>
                      <option>Central African Republic</option>
                      <option>Chad </option>
                      <option>Chile </option>
                      <option>China</option>
                      <option>Colombia </option>
                      <option>Comoros </option>
                      <option>Republic of the Congo</option>
                      <option>Democratic Republic of the Congo</option>
                      <option>Costa Rica</option>
                      <option>Ivory Coast</option>
                      <option>Croatia</option>
                      <option>Cuba </option>
                      <option>Cyprus</option>
                      <option>Czech Republic</option>
                      <option>Denmark</option>
                      <option>Djibouti </option>
                      <option>Dominica </option>
                      <option>Dominican Republic</option>
                      <option>East Timor </option>
                      <option>Ecuador </option>
                      <option>Egypt  </option>
                      <option>El Salvador </option>
                      <option>Equatorial Guinea </option>
                      <option>Estonia </option>
                      <option>Ethiopia  </option>
                      <option>Eritrea </option>
                      <option>Fiji </option>
                      <option>France  </option>
                      <option>Finland </option>
                      <option>Gabon  </option>
                      <option>The Gambia </option>
                      <option>Georgia   </option>
                      <option>Germany </option>
                      <option>Ghana    </option>
                      <option>Greece  </option>
                      <option>Grenada    </option>
                      <option>Guatemala    </option>
                      <option>Guinea    </option>
                      <option>Guinea Bissau  </option>
                      <option>Guyana  </option>
                      <option>Haiti  </option>
                      <option>Honduras  </option>
                      <option>Hungary  </option>
                      <option>Iceland    </option>
                      <option>India  </option>
                      <option>Indonesia    </option>
                      <option>Iran  </option>
                      <option>Iraq    </option>
                      <option>Ireland</option>
                      <option>Italy  </option>
                      <option>Jamaica  </option>
                      <option>Japan</option>
                      <option>Jordan</option>
                      <option>Kazakhstan  </option>
                      <option>Kenya</option>
                      <option>Kiribati</option>
                      <option>Korea, North</option>
                      <option>Korea, South</option>
                      <option>Kuwait</option>
                      <option>Kyrgyzstan</option>
                      <option>Laos</option>
                      <option>Latvia</option>
                      <option>Lebanon</option>
                      <option>Lesotho</option>
                      <option>Liberia  </option>
                      <option>Libya</option>
                      <option>Liechtenstein</option>
                      <option>Luxembourg</option>
                      <option>Macedonia  </option>
                      <option>Madagascar  </option>
                      <option>Malawi  </option>
                      <option>Malaysia</option>
                      <option>Maldives  </option>
                      <option>Mali</option>
                      <option>Malta</option>
                      <option>Marshall Islands</option>
                      <option>Mauritania</option>
                      <option>Mauritius</option>
                      <option>Mexico  </option>
                      <option>Federated States of Micronesia</option>
                      <option>Moldova  </option>
                      <option>Monaco</option>
                      <option>Mongolia  </option>
                      <option>Montenegro  </option>
                      <option>Morocco  </option>
                      <option>Mozambique</option>
                      <option>Burma  </option>
                      <option>Namibia  </option>
                      <option>Nauru  </option>
                      <option>Nepal  </option>
                      <option>Netherlands</option>
                      <option>New Zealand</option>
                      <option>Nicaragua</option>
                      <option>Niger</option>
                      <option>Nigeria  </option>
                      <option>Norway  </option>
                      <option>Oman  </option>
                      <option>Pakistan  </option>
                      <option>Palau    </option>
                      <option>Panama  </option>
                      <option>Papua New Guinea  </option>
                      <option>Paraguay    </option>
                      <option>Peru    </option>
                      <option>Philippines    </option>
                      <option>Poland    </option>
                      <option>Portugal    </option>
                      <option>Qatar    </option>
                      <option>Romania    </option>
                      <option>Russia    </option>
                      <option>Rwanda  </option>
                      <option>Saint Kitts and Nevis  </option>
                      <option>Saint Lucia  </option>
                      <option>Saint Vincent and the Grenadines  </option>
                      <option>Samoa  </option>
                      <option>San Marino  </option>
                      <option>Sao Tome and Principe   </option>
                      <option>Saudi Arabia  </option>
                      <option>Senegal    </option>
                      <option>Serbia  </option>
                      <option>Seychelles  </option>
                      <option>Sierra Leone  </option>
                      <option>Singapore  </option>
                      <option>Slovakia  </option>
                      <option>Slovenia  </option>
                      <option>Solomon Islands  </option>
                      <option>Somalia  </option>
                      <option>South Africa</option>
                      <option>Spain  </option>
                      <option>Sri Lanka  </option>
                      <option>Sudan  </option>
                      <option>Suriname  </option>
                      <option>Swaziland  </option>
                      <option>Sweden  </option>
                      <option>Switzerland  </option>
                      <option>Syria  </option>
                      <option>Tajikistan  </option>
                      <option>Tanzania  </option>
                      <option>Thailand  </option>
                      <option>Togo  </option>
                      <option>Tonga  </option>
                      <option>Trinidad and Tobago  </option>
                      <option>Tunisia   </option>
                      <option>Turkey    </option>
                      <option>Turkmenistan    </option>
                      <option>Tuvalu </option>
                      <option>Uganda  </option>
                      <option>Ukraine  </option>
                      <option>United Arab Emirates</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Uruguay</option>
                      <option>Uzbekistan    </option>
                      <option>Vanuatu    </option>
                      <option>Vatican City (Holy See)  </option>
                      <option>Venezuela  </option>
                      <option>Vietnam  </option>
                      <option>Yemen  </option>
                      <option>Zambia    </option>
                      <option>Zimbabwe   </option>
                      </select>
                      <label className="label w-100">
                      Nationality
                  </label>
                    <select className="input w-75 my-2"  name="counrty" placeholder="Nationality" type="text" onChange={getAddStudent}>
                    <option>Afghanistan</option>
                      <option>Albania</option>
                      <option>Algeria </option>
                      <option>Andorra</option>
                      <option>Angola </option>
                      <option>Antigua & Barbuda</option>
                      <option>Argentina </option>
                      <option>Armenia</option>
                      <option>Australia</option>
                      <option>Austria </option>
                      <option>Azerbaijan </option>
                      <option>The Bahamas</option>
                      <option>Bahrain </option>
                      <option>Bangladesh</option>
                      <option>Barbados </option>
                      <option>Belarus</option>
                      <option>Belgium </option>
                      <option>Belize </option>
                      <option>Benin </option>
                      <option>Bhutan </option>
                      <option>Bolivia </option>
                      <option>Bosnia & Herzegovina</option>
                      <option>Botswana</option>
                      <option>Brazil </option>
                      <option>Brunei</option>
                      <option>Bulgaria</option>
                      <option>Burkina Faso</option>
                      <option>Burundi </option>
                      <option>Cambodia </option>
                      <option>Cameroon </option>
                      <option>Canada </option>
                      <option>Cape Verde</option>
                      <option>Central African Republic</option>
                      <option>Chad </option>
                      <option>Chile </option>
                      <option>China</option>
                      <option>Colombia </option>
                      <option>Comoros </option>
                      <option>Republic of the Congo</option>
                      <option>Democratic Republic of the Congo</option>
                      <option>Costa Rica</option>
                      <option>Ivory Coast</option>
                      <option>Croatia</option>
                      <option>Cuba </option>
                      <option>Cyprus</option>
                      <option>Czech Republic</option>
                      <option>Denmark</option>
                      <option>Djibouti </option>
                      <option>Dominica </option>
                      <option>Dominican Republic</option>
                      <option>East Timor </option>
                      <option>Ecuador </option>
                      <option>Egypt  </option>
                      <option>El Salvador </option>
                      <option>Equatorial Guinea </option>
                      <option>Estonia </option>
                      <option>Ethiopia  </option>
                      <option>Eritrea </option>
                      <option>Fiji </option>
                      <option>France  </option>
                      <option>Finland </option>
                      <option>Gabon  </option>
                      <option>The Gambia </option>
                      <option>Georgia   </option>
                      <option>Germany </option>
                      <option>Ghana    </option>
                      <option>Greece  </option>
                      <option>Grenada    </option>
                      <option>Guatemala    </option>
                      <option>Guinea    </option>
                      <option>Guinea Bissau  </option>
                      <option>Guyana  </option>
                      <option>Haiti  </option>
                      <option>Honduras  </option>
                      <option>Hungary  </option>
                      <option>Iceland    </option>
                      <option>India  </option>
                      <option>Indonesia    </option>
                      <option>Iran  </option>
                      <option>Iraq    </option>
                      <option>Ireland</option>
                      <option>Italy  </option>
                      <option>Jamaica  </option>
                      <option>Japan</option>
                      <option>Jordan</option>
                      <option>Kazakhstan  </option>
                      <option>Kenya</option>
                      <option>Kiribati</option>
                      <option>Korea, North</option>
                      <option>Korea, South</option>
                      <option>Kuwait</option>
                      <option>Kyrgyzstan</option>
                      <option>Laos</option>
                      <option>Latvia</option>
                      <option>Lebanon</option>
                      <option>Lesotho</option>
                      <option>Liberia  </option>
                      <option>Libya</option>
                      <option>Liechtenstein</option>
                      <option>Luxembourg</option>
                      <option>Macedonia  </option>
                      <option>Madagascar  </option>
                      <option>Malawi  </option>
                      <option>Malaysia</option>
                      <option>Maldives  </option>
                      <option>Mali</option>
                      <option>Malta</option>
                      <option>Marshall Islands</option>
                      <option>Mauritania</option>
                      <option>Mauritius</option>
                      <option>Mexico  </option>
                      <option>Federated States of Micronesia</option>
                      <option>Moldova  </option>
                      <option>Monaco</option>
                      <option>Mongolia  </option>
                      <option>Montenegro  </option>
                      <option>Morocco  </option>
                      <option>Mozambique</option>
                      <option>Burma  </option>
                      <option>Namibia  </option>
                      <option>Nauru  </option>
                      <option>Nepal  </option>
                      <option>Netherlands</option>
                      <option>New Zealand</option>
                      <option>Nicaragua</option>
                      <option>Niger</option>
                      <option>Nigeria  </option>
                      <option>Norway  </option>
                      <option>Oman  </option>
                      <option>Pakistan  </option>
                      <option>Palau    </option>
                      <option>Panama  </option>
                      <option>Papua New Guinea  </option>
                      <option>Paraguay    </option>
                      <option>Peru    </option>
                      <option>Philippines    </option>
                      <option>Poland    </option>
                      <option>Portugal    </option>
                      <option>Qatar    </option>
                      <option>Romania    </option>
                      <option>Russia    </option>
                      <option>Rwanda  </option>
                      <option>Saint Kitts and Nevis  </option>
                      <option>Saint Lucia  </option>
                      <option>Saint Vincent and the Grenadines  </option>
                      <option>Samoa  </option>
                      <option>San Marino  </option>
                      <option>Sao Tome and Principe   </option>
                      <option>Saudi Arabia  </option>
                      <option>Senegal    </option>
                      <option>Serbia  </option>
                      <option>Seychelles  </option>
                      <option>Sierra Leone  </option>
                      <option>Singapore  </option>
                      <option>Slovakia  </option>
                      <option>Slovenia  </option>
                      <option>Solomon Islands  </option>
                      <option>Somalia  </option>
                      <option>South Africa</option>
                      <option>Spain  </option>
                      <option>Sri Lanka  </option>
                      <option>Sudan  </option>
                      <option>Suriname  </option>
                      <option>Swaziland  </option>
                      <option>Sweden  </option>
                      <option>Switzerland  </option>
                      <option>Syria  </option>
                      <option>Tajikistan  </option>
                      <option>Tanzania  </option>
                      <option>Thailand  </option>
                      <option>Togo  </option>
                      <option>Tonga  </option>
                      <option>Trinidad and Tobago  </option>
                      <option>Tunisia   </option>
                      <option>Turkey    </option>
                      <option>Turkmenistan    </option>
                      <option>Tuvalu </option>
                      <option>Uganda  </option>
                      <option>Ukraine  </option>
                      <option>United Arab Emirates</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Uruguay</option>
                      <option>Uzbekistan    </option>
                      <option>Vanuatu    </option>
                      <option>Vatican City (Holy See)  </option>
                      <option>Venezuela  </option>
                      <option>Vietnam  </option>
                      <option>Yemen  </option>
                      <option>Zambia    </option>
                      <option>Zimbabwe   </option>


                    </select>
                  </div>
                  <div className="mb-3">
                  <label className="label w-100">
                  Mobile Number
                  </label>
                    <input className="input numInput w-75 my-2" name="mobile" type="number" onChange={getAddStudent}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Upload Picture
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="photo"
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                      id="formFile"
                      onChange={getAddStudent}
                    />
                    
                  </div>

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="button w-100"
                  >
                    {isLoading ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      "Add Student"
                    )}
                  </button>
                </form>
                {x.studentt ? (
                 <div className="INSReff row my-3 ">

                 <div className="ImgCon col-md-4"><img src={`https://wadi.pro/${x.studentt.photo}`} className="userImage" alt="user"/></div> 
                 <div className="col-md-8 DataIns mt-5 position-relative">
                 <div onClick={deleteStudentt} className="closeCon2 position-absolute">
                 <i className="fa-solid fa-xmark"></i>
                 </div>
                   <div className="DataCon"><h3>ID :</h3> <p>{x.studentt.id}</p></div>
                   <div className="DataCon"><h3>Name :</h3> <p>{`${x.studentt.first_name}  ${x.studentt.last_name}`}</p></div>
                   <div className="DataCon"><h3>Email :</h3> <p>{x.studentt.email}</p></div>
                   <div className="DataCon"><h3>Birth Date :</h3> <p>{x.studentt.birth_date}</p></div>
                 </div>
               </div>
                ) : (
                  ""
                )}
              </div>
            </div>



            
            {/*................... Generate Certification ..................... */}
            <button onClick={showPreview} className="FinalButt w-100 my-3 py-3">
              {Warning ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        `Generate Certification`
                      )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
