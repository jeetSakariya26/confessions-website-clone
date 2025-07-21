import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { ImCross } from 'react-icons/im';

export default function Report() {
  const [Reportdescription,setReportdescription]=useState("");
  const HandleOnActiontaken=(event)=>{
    setReportdescription(event.target.value);
  }
  const close_reportContainer=()=>{
    // window.location.href="http://localhost:3000/user/homepage"
  }
  const HandleOnSubmitReport=async()=>{
    let reportReason=document.getElementsByName("reason");
    for(let i=0;i<5;i++){
      if(reportReason[i].checked){
        var selectedReason=reportReason[i].value;
      }
    }
    if(!selectedReason){
      alert("please select reason");
      return null;

    }
    let selectedChat=localStorage.getItem("reportedChat");
    let group = localStorage.getItem("currGroup");

    if(!selectedChat) {
      alert("Select chat first");
      return;
    } 
    try {
      let res = await fetch(
        `http://localhost:3001/user/group/${group._id}/chat/${selectedChat}/report`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          header: {
            token: `${localStorage.getItem("token")}`,
          },
          body : JSON.stringify({
            reason : selectedReason.value
          })
        }
      );
      let data = await res.json();
      if(res.ok){
        alert("Chat reported");
      } else {
        alert(data.message);
      }
    } catch (error) {
      
    }
  }
  return (
    <div className='Report_maincontainer'>
      <Navbar></Navbar>
      <div className='Report_container' onClick={close_reportContainer}>
            <div className='colse_report'>
              <ImCross size={25}></ImCross>
            </div>
            <h1>Report</h1>
            <div className='reason'>
                <h2>Reason:</h2>
                <ul>
                    <li><input type='radio' name='reason' className='reason_report' value={"spam"}></input><label>spam</label></li>
                    <li><input type='radio' name='reason' className='reason_report' value={"harassment"}></input><label>harassment</label></li> 
                    <li><input type='radio' name='reason' className='reason_report' value={"hate_speech"}></input><label>hate_speech</label></li> 
                    <li><input type='radio' name='reason' className='reason_report' value={"nudity"}></input><label>nudity</label></li>
                    <li><input type='radio' name='reason' className='reason_report' value={"other"}></input><label>other</label></li>
                </ul>
            </div>
            <div className='report_option'>
                <label htmlFor='descreption'>Descreption:</label>
                <textarea value={Reportdescription} name='descreption' onChange={HandleOnActiontaken}></textarea>
            </div>
            <div>
              <button onClick={HandleOnSubmitReport}>Submit</button>
            </div>
        </div>
    </div>
  )
}

// "spam", "harassment", "hate_speech", "nudity", "other"