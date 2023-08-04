import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu'
import AOWC_Referal_Form_color from './Forms/AOWC.Referal.Form_color.pdf'
import Class_Compleation_Form from './Forms/Class Compleation Form.pdf'
import DM_RecordSheet from './Forms/DM.RecordSheet.pdf'
import General_Liability_ENG from './Forms/General Liability ENG.pdf'
import Open_Water_Answer_Sheet_AR from './Forms/Open-Water-Answer-Sheet_AR.pdf'
import OWD_Answer_Sheet_Eng from './Forms/OWD.Answer Sheet-Eng.pdf'
import OWDC_Referal_Form_color from './Forms/OWDC.Referal.Form_color.pdf'
import SafePractise_Eng from './Forms/SafePractise-Eng.pdf'

export default function Fourms() {
  return <>
      <Navbar />
        <div className="container mt-5 ">
        <div className="row mt-5">
          <div className="col-md-6 mt-5">
            <div className="shadow p-3 my-5 bg-body rounded d-flex">
            <h3 className='me-4'><i class="fa-regular fa-file-pdf"></i></h3>
            <a href = {AOWC_Referal_Form_color} target = "_blank"><h3 className='color-green hoverAncor'>AOWC Referal Form color</h3></a>
            </div>
            <div className="shadow p-3 my-5 bg-body rounded d-flex">
            <h3 className='me-4'><i class="fa-regular fa-file-pdf"></i></h3>
            <a href = {Class_Compleation_Form} target = "_blank"><h3 className='color-green hoverAncor'>Class Compleation Form</h3></a>
            </div>
            <div className="shadow p-3 my-5 bg-body rounded d-flex">
            <h3 className='me-4'><i class="fa-regular fa-file-pdf"></i></h3>
            <a href = {DM_RecordSheet} target = "_blank"><h3 className='color-green hoverAncor'>DM RecordSheet</h3></a>
            </div>
            <div className="shadow p-3 my-5 bg-body rounded d-flex">
            <h3 className='me-4'><i class="fa-regular fa-file-pdf"></i></h3>
            <a href = {OWDC_Referal_Form_color} target = "_blank"><h3 className='color-green hoverAncor'>OWDC Referal Form color</h3></a>
            </div>
            </div>




            <div className="col-md-6 mt-5">
            <div className="shadow p-3 my-5 bg-body rounded d-flex">
            <h3 className='me-4'><i class="fa-regular fa-file-pdf"></i></h3>
            <a href = {General_Liability_ENG} target = "_blank"><h3 className='color-green hoverAncor'>General Liability ENG</h3></a>
            </div>
            <div className="shadow p-3 my-5 bg-body rounded d-flex">
            <h3 className='me-4'><i class="fa-regular fa-file-pdf"></i></h3>
            <a href = {Open_Water_Answer_Sheet_AR} target = "_blank"><h3 className='color-green hoverAncor'>Open Water Answer Sheet AR</h3></a>
            </div>
            <div className="shadow p-3 my-5 bg-body rounded d-flex">
            <h3 className='me-4'><i class="fa-regular fa-file-pdf"></i></h3>
            <a href = {OWD_Answer_Sheet_Eng} target = "_blank"><h3 className='color-green hoverAncor'>OWD Answer Sheet Eng</h3></a>
            </div>
            <div className="shadow p-3 my-5 bg-body rounded d-flex">
            <h3 className='me-4'><i class="fa-regular fa-file-pdf"></i></h3>
            <a href = {SafePractise_Eng} target = "_blank"><h3 className='color-green hoverAncor'>SafePractise Eng</h3></a>
            </div>
            </div>
            </div>
            </div>
  </>
}
