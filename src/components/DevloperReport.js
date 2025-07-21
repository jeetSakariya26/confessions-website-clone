import React,{useEffect, useState} from 'react'
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';

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
            <span className='close_devreportdetails'><Link to={"http://localhost:3000/dev"}><ImCross size={25} color='black'></ImCross></Link></span>

            <div><h1>Report Details</h1></div>
            <div>
                <p>reporter:<span> {reprotDetails.reporter}</span></p>
                <p>reportedUser:<span>{reprotDetails.reportedUser}</span></p>
                <p>Chat:<span>{reprotDetails.chatContent}</span></p>
                <p>Reason:<span>{reprotDetails.reason }</span></p>
                <p>Description:<span>{reprotDetails.description?reprotDetails.description : `""`}</span></p>
            </div>
            <div className='devreport_option'>
                <button onClick={HandleOnActiontaken} className='DevactionTaken' >Action Taken</button>
                <button onClick={HandleOndismiss} className='Devdismissed'>Dismissed</button>
            </div>
        </div>:<></>}
    </div>
  )
}
