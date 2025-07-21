import React,{useEffect, useState} from 'react'

export default function DevloperReport() {
    const [reprotDetails,setreprotDetails]=useState({});
    async function getReportDetails() {
            try{
                let reportId=localStorage.getItem("reportId");
                let res = await fetch(`http://localhost:3001/dev/reports/${reportId}/view`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    header : {
                        "token" : `${localStorage.getItem('token')}`
                    },
                });
                let data = await res.json();
                console.log(data);
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
        useEffect(()=>{
            getReportDetails();
        },[])
    const HandleOnActiontaken=()=>{

    }
    const HandleOndismiss=()=>{

    }
    console.log(reprotDetails);
  return (
    <div>
      {{reprotDetails}?<div className='Report_maincontainer'>
            <div>
                <p>reporter: {reprotDetails.reporter}</p>
                <p>reportedUser:{reprotDetails.reportedUser}</p>
                <p>Chat:{reprotDetails.chatContent}</p>
                <p>Reason:{reprotDetails.reason }</p>
                <p>Description:{reprotDetails.description?reprotDetails.description : `""`}</p>
            </div>
            <div className='report_option'>
                <button onClick={HandleOnActiontaken} >Action Taken</button>
                <button onClick={HandleOndismiss}>Dismissed</button>
            </div>
        </div>:<></>}
    </div>
  )
}
