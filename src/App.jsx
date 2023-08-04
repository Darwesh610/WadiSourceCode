import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../src/Components/Login/Login'
import Instructor from '../src/Components/Instructor/Instructor'
import CertifyStudent from './Components/CertifyStudent/CertifyStudent';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import OneTImePassword from './Components/OneTimePassword/OneTImePassword';
import NewPassword from './Components/NewPassword/NewPassword';
import IssuedCertifications from './Components/IssuedCertifications/IssuedCertifications';
import IssuedTrainings from './Components/IssuedTrainings/IssuedTrainings';
import MyStudent from './Components/MyStudent/MyStudent';
import UserProfile from './Components/UserProfile/UserProfile';
import CreditInvoice from './Components/CreditInvoice/CreditInvoice';
import { useContext, useState } from 'react';
import Certification from './Components/Certification/Certification';
import { CertificationContext, CertificationContextProvider } from './Components/CertificationContext/CertificationContext';
import Fourms from './Components/Fourms/Fourms';




function AuthGuard({children}){
  if(!localStorage.getItem('userToken')){
    return <Navigate to='/login'/>
  }else {
    return children;
  }
}

function AuthGuardLogin({children}){
  if(localStorage.getItem('userToken')){
    return <Navigate to='/instructor'/>
  }else {
    return children;
  }
}



function App() {
const [AddStudent, setAddStudent] = useState(null);
const [DateOfIssue, setDateOfIssue] = useState(null)
const [CertItem, setCertItem] = useState(null)
const [studentt, setStudentt] = useState(null);

const [DateOfCert, setDateOfCert] = useState({
    CertficationSelected : null,
    studentt : studentt,
    AddStudent: AddStudent,
    DateOfIssue: DateOfIssue,
    CertItem: CertItem
  })






  return ( <>
    <CertificationContextProvider>
   <Routes>
    <Route path='*' element={<PageNotFound/>} />
    <Route path='' element={<Navigate to='/login'/>} />
    <Route path='login' element={<AuthGuardLogin><Login /></AuthGuardLogin>} />
    <Route path='instructor' element={<AuthGuard><Instructor/></AuthGuard>} />
    <Route path='IssuedCertifications' element={<AuthGuard><IssuedCertifications/></AuthGuard>} />
    <Route path='certifyStudent' element={<AuthGuard><CertifyStudent/></AuthGuard>} />
    <Route path='IssuedTrainings' element={<AuthGuard><IssuedTrainings/></AuthGuard>} />
    <Route path='mystudent' element={<AuthGuard><MyStudent/></AuthGuard>} />
    <Route path='forums' element={<AuthGuard><Fourms/></AuthGuard>} />
    <Route path='certification' element={<AuthGuard><Certification/></AuthGuard>} />
    <Route path='userprofile' element={<AuthGuard><UserProfile/></AuthGuard>} />
    <Route path='Creditinvoice' element={<AuthGuard><CreditInvoice/></AuthGuard>} />
    <Route path='forgetPassword' element={<ForgetPassword/>} />
    <Route path='onetimepassword' element={<OneTImePassword/>} />
    <Route path='newpassword' element={<NewPassword/>} />
   </Routes>
   </CertificationContextProvider>

   </>
  );
}

export default App;
