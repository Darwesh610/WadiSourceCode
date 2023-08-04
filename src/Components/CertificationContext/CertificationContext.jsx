import axios from "axios";
import { createContext, useState } from "react";

export let CertificationContext = createContext(0)


export function CertificationContextProvider(props){

    const [AddStudent, setAddStudent] = useState(null);
const [DateOfIssue, setDateOfIssue] = useState(null)
const [CertItem, setCertItem] = useState(null)
const [studentt, setStudentt] = useState(null);
const [RefInstructor, setRefInstructor] = useState(null);
const [DiveCenter, setDiveCenter] = useState(null);
const [DiveCenter2, setDiveCenter2] = useState(null);
const [TraningsSelected, setTraningsSelected] = useState([]);
const [viewTraningssList, setviewTraningssList] = useState([])
const [CreditsCatogries, setCreditsCatogries] = useState([])
const [CountCerts, setCountCerts] = useState(null)
const [CountCertsSubmitted, setCountCertsSubmitted] = useState(0)
const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  };
async function getCatgeories() {
    await axios.get('https://wadi.pro/api/categories' , config).then(
      (res) => {
        setCreditsCatogries(res.data.data)
        console.log(res.data.data);
      } 
    ).catch((error) => {
      console.log(error)
    })
  }





    return <>
    
     <CertificationContext.Provider value={{getCatgeories , CreditsCatogries , setCreditsCatogries , DiveCenter2 , setDiveCenter2 ,viewTraningssList , setviewTraningssList ,AddStudent , setAddStudent , DateOfIssue , setDateOfIssue , CertItem , setCertItem 
    , studentt , setStudentt , TraningsSelected , CountCertsSubmitted , setCountCertsSubmitted , CountCerts , setCountCerts , setTraningsSelected ,RefInstructor,setRefInstructor , DiveCenter , setDiveCenter}}>
        {props.children}
    </CertificationContext.Provider>

    </>

}