import React, { useEffect, useState } from 'react'

export default function Report() {
    const [reprotDetails,setreprotDetails]=useState([]);
    let report=localStorage.getItem("currReport");
    async function getReportDetails() {
        try{
            let res = await fetch(`http://localhost:3001/user/group/${report._id}/chat/new`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
                header : {
                    "token" : `${localStorage.getItem('token')}`
                },
            });
            let data = await res.json();
            setreprotDetails(data.responce);
            if(res.ok){
                alert(data.message);
            } else {
                alert("Something went wrong");
            }
        } catch(error){
            console.log(error);
        }
    } 
    const HandleOnActiontaken=()=>{
        
    }
    const HandleOndismiss=()=>{

    }
    useEffect(useEffect(() => {
        getReportDetails();
      }, []))
  return (
    <div>
      <div className='Report_container'>
            <div>
                <p>reporter:{reprotDetails.reporter}</p>
                <p>reportedUser:{reprotDetails.reportedUser}</p>
                <p>Chat:{reprotDetails.chatContent}</p>
                <p>Reason:{reprotDetails.reason }</p>
                <p>Description:{reprotDetails.description}</p>
            </div>
            <div className='report_option'>
                <button onClick={HandleOnActiontaken} >Action Taken</button>
                <button onClick={HandleOndismiss}>Dismissed</button>
            </div>
        </div>
    </div>
  )
}
