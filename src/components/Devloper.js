import React, { useState } from 'react'
import Navbar from './Navbar'

export default function Devloper() {
    const [reportStatus,setreportStatus]=useState("pending");
    const [report,setreport]=useState(false);
    const HandleOnClick=(menuSlider)=>{
        // if(menuSlider){
        //     document.querySelector(".Devloper_maincontainer").style.marginLeft="30px";
        // }else{
        //     document.querySelector(".Devloper_maincontainer").style.marginLeft="16vw";

        // }
    }
    const HandleReport=()=>{
        if(report){
            document.querySelector(".Devloper_maincontainer").style.display="flex";
            document.querySelector(".Report_container").style.display="none";
        }else{
            document.querySelector(".Devloper_maincontainer").style.display="none";
            document.querySelector(".Report_container").style.display="flex";

        }
    }
    const HandleOnActiontaken=()=>{
        
    }
    const HandleOndismiss=()=>{

    }
  return (
    <>
        <Navbar menuOnclick={HandleOnClick}></Navbar>
        <div className='Devloper_maincontainer'>

            <div onClick={HandleReport}>
                <div className='report_heading'>
                    <h1>Reports</h1>
                </div>
                <div className='report_lists'>
                    <div>
                        <p>User name:{}</p>
                    </div>
                    <div>
                        <div><p>Chat</p></div>
                        <div><button className={`devloper_reportStatus ${reportStatus}`}>{reportStatus}</button></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='Report_container'>
            <div>
                <p>reporter:{}</p>
                <p>reportedUser:{}</p>
                <p>Chat:{}</p>
                <p>Reason:{}</p>
                <p>Description:{}</p>
            </div>
            <div className='report_option'>
                <button onClick={HandleOnActiontaken} >Action Taken</button>
                <button onClick={HandleOndismiss}>Dismissed</button>
            </div>
        </div>
    </>
  )
}
