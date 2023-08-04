import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";
import "./MyStudent.css";

export default function MyStudent() {
  const [Students, setStudents] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [DeletedStudent, setDeletedStudent] = useState(null);

  useEffect(() => {
    setPageLoading(true);
    getStudentsTable();
  }, [])
  
  const [student, setStudent] = useState({
    first_name : '',
    last_name : '' ,
    email : '',
    date_of_birth : '',
  })
  const [updated, setUpdated] = useState({
    first_name : '',
    last_name : '' ,
    email : '',
    date_of_birth : '',
    id:''
  })

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [errorList, setErrorList] = useState([])

  const config = {
    headers:{
      Authorization: `Bearer ${localStorage.getItem('userToken')}`
    }
  };
  function getStudent(e) {
    let userClone = { ...student };
    userClone[e.target.name] = e.target.value;
    setStudent(userClone);
  }

  async function SubmitLoginForm(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setErrorList([]);
    setisLoading(true);
    let ValidationCheck = ValidationUser(student);
    if(ValidationCheck.error){
      setErrorList([ValidationCheck.error.details[0].message])
      setisLoading(false)
    } else {
      let { data } = await axios.post("https://wadi.pro/api/student/store", student , config);
      console.log(data);
      if (data.message !== "Error Found") {
        setPageLoading(true);
        setSuccess(data.message);
        getStudentsTable();
        setError(null);
        setisLoading(false);
      } else {
        if(data.errors.email){
          setError(data.errors.email[0]);
        }else if(data.errors.first_name) {
          setError(data.errors.first_name[0]);
        }else if(data.errors.last_name){
          setError(data.errors.last_name[0]);
        }else {
          setError(data.errors.date_of_birth[0]);
        }
        setSuccess(null);
        setisLoading(false);
      }
    }
   
  }
  async function getStudentsTable(){
      let { data } = await axios.get('https://wadi.pro/api/student' , config);
      setStudents(data.data)
      if(data){
        setPageLoading(false)
      }
  }
  function getDeletedStudentId(e){
    console.log(e.target.id);
    setDeletedStudent(e.target.id)
  }
  async function deleteStudent(){
    setPageLoading(true);
    let id = DeletedStudent;
    await axios.post(`https://wadi.pro/api/student/destroy/${id}` , '' , config)
    getStudentsTable();
  }
  async function getUserProfile(e){
    let id = e.target.id;
    let { data } = await axios.get(`https://wadi.pro/api/student/${id}` , config)
    console.log(data.data);
    setUpdated(data.data)
    console.log(updated);
  }
  function getUpdated(e){
    let userClone = { ...updated };
    userClone[e.target.name] = e.target.value;
    setUpdated(userClone);
    console.log(updated);
  }
  async function SubmitUpdated(e){
    e.preventDefault()
    setPageLoading(true);
    let response = await axios.post(`https://wadi.pro/api/student/update/${updated.id}` , updated , config);
    console.log(response);
    getStudentsTable();
  }
  function ValidationUser(student) {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2  , tlds:{allow : ['com' , 'net']}}),
      first_name : Joi.string().max(16).min(2).required(),
      last_name : Joi.string().max(16).min(2).required(),
      date_of_birth : Joi.date().required().less('12-31-2015')
  })
    return schema.validate(student , {abortEarly:false});
  }
  return (
    <>
    <Navbar/>
    <SideMenu/>
    {pageLoading ? <LoadingPage/> : ''}
      <div className="ConStudents mt-5">
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-md-12 mt-5">
              <div className="shadow-lg p-3 bg-body rounded w-100 row m-auto mt-5">

                <form onSubmit={SubmitLoginForm} className="col-md-6">
                {error? <div className="alert alert-danger mt-4" role="alert">
                <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
                </div> : ''}


                { errorList.map((err , indx) => <div key={indx} className="alert alert-danger mt-4" role="alert">
                  <i className="fa-solid fa-triangle-exclamation me-2"></i> {err} </div>)}
                {success ? <div className="alert alert-success mt-4" role="alert">
                <i className="fa-solid fa-check-double me-2"></i> {success}
                </div> : ''}
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
                      onChange={getStudent}
                    />
                    <input
                      type="text"
                      className="input w-50"
                      id="exampleInputEmail1"
                      name="last_name"
                      onChange={getStudent}
                    />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="w-50 me-3 my-2">
                    Email
                  </label>
                  <input
                    type="text"
                    className="input w-100"
                    name="email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={getStudent}
                  />
                </div>
                  <div className="dateCon my-4">
                    <label className="me-3" htmlFor="date_of_birth">
                      Date of Birth
                    </label>
                    <input className="date" type="date" name="date_of_birth" 
                      onChange={getStudent}  />
                  </div>
                  <button disabled={isLoading} type="submit" className="button w-100">
                  {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i>  : "add Student"}
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
                      WADI Diver ID
                    </label>
                    <input
                      type="text"
                      className="input w-100"
                      id="exampleInputEmail1"
                    />
                  <button type="submit" className="button w-100 mt-3">
                    Add Student
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container rounded-3 shadow-lg mb-5 p-0">
 <table className="table rounded-3 table-success table-striped mt-6 p-3">
 <thead>
 <tr>
   <th scope="col">ID</th>
   <th scope="col">Photo</th>
   <th scope="col">First Name</th>
   <th scope="col">Last Name</th>
   <th scope="col">Date of Birth</th>
   <th scope="col">Update</th>
   <th scope="col">Delete</th>
 </tr>
</thead>
<tbody>
        {Students ? Students.map((student , index) => <tr key={index}>
   <th scope="row">{student.unique_id}</th>
   <td className="thead"><img src={`https://wadi.pro/${student.photo}`} alt="StudentPhoto" className="w-100 h-100" /></td>
   <td>{student.first_name}</td>
   <td>{student.last_name}</td>
   <td>{student.birth_date}</td>
   <td>

   <button type="button" onClick={getUserProfile} class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" id={student.id} data-bs-whatever="@mdo">Update</button>
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form onSubmit={SubmitUpdated} className="w-100">
        <h3>ID : {updated.id}</h3>
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
                      placeholder={updated.first_name}
                      onChange={getUpdated}
                    />
                    <input
                      type="text"
                      className="input w-50"
                      id="exampleInputEmail1"
                      name="last_name"
                      placeholder={updated.last_name}
                      onChange={getUpdated}
                    />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="input w-100"
                    name="email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={updated.email}
                    onChange={getUpdated}
                  />
                </div>
                  <div className="dateCon my-4">
                    <label className="me-3" htmlFor="date_of_birth">
                      Date of Birth
                    </label>
                    <input className="date" type="date" name="date_of_birth" 
                      onChange={getUpdated}  />
                  </div>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-warning" data-bs-dismiss="modal">Save Changes</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div>
    
    </td>
   <td id={student.id}>
<button onClick={getDeletedStudentId} id={student.id} type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal1">
  Delete
</button>

<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel1">Delete Confirmation</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        are you sure for delete this student ?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={deleteStudent}  data-bs-dismiss="modal" type="button" className="btn btn-danger">Save Changes</button>
      </div>
    </div>
  </div>
</div>
</td>
 </tr>
        ) : ''}
</tbody>
     </table>
        </div>
    </>
  );
}
