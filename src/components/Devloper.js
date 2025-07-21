import React, { useState ,useEffect} from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

export default function Devloper() {
    const [reprotDetails,setreprotDetails]=useState({});
    const [reportStatus,setreportStatus]=useState("pending");
    const [report,setreport]=useState(false);
    const [pendingreports, setpendingreports] = useState([]);
    const [actionTaken, setactionTaken] = useState([]);     
    const [dismissed, setdismissed] = useState([]);     
    const [selectedReportId, setReportId] = useState('');
    const [loading, setLoading] = useState(true); // Show loading state
      async function getPendingReport(){
        try{
          let res = await fetch('http://localhost:3001/dev/reports/pending', {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
            header : {
              "token" : `${localStorage.getItem('token')}`
            }
          });
          let data = await res.json();
          setpendingreports(data.reports);
          localStorage.setItem('userDetails',JSON.stringify(data.reports));
          setLoading(false);
        } catch(error){
          console.error(error);
          setLoading(false);
        }
      }
    async function getActionTakenReport() {
        try{
          let res = await fetch('http://localhost:3001/dev/reports/actionTaken', {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
            header : {
              "token" : `${localStorage.getItem('token')}`
            }
          });
          let data = await res.json();
          setactionTaken(data.reports);
          localStorage.setItem('userDetails',JSON.stringify(data.reports));
          setLoading(false);
        } catch(error){
            console.error(error);
            setLoading(false);
        }
      }
    async function getDismissedReports() {
        try{
          let res = await fetch('http://localhost:3001/dev/reports/dismissed', {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
            header : {
              "token" : `${localStorage.getItem('token')}`
            }
          });
          let data = await res.json();
          setdismissed(data.reports);
          localStorage.setItem('userDetails',JSON.stringify(data.reports));
          setLoading(false);
        } catch(error){
            console.error(error);
            setLoading(false);
        }
      }
        useEffect(() => {
            getPendingReport();
            getActionTakenReport();
            getDismissedReports()
            }, []);
    const HandleOnClick=(menuSlider)=>{
        // if(menuSlider){
        //     document.querySelector(".Devloper_maincontainer").style.marginLeft="30px";
        // }else{
        //     document.querySelector(".Devloper_maincontainer").style.marginLeft="16vw";

        // }
    }

    async function getReportDetails(reportId) {
        try{
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
    const reportOpen=async(elem)=>{
      if(report){
        document.querySelector(".Devloper_maincontainer").style.display="flex";
        document.querySelector(".Report_container").style.display="none";
      }else{
        document.querySelector(".Devloper_maincontainer").style.display="none";
        getReportDetails(elem._id);
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

            <div>
                <div className='report_heading'>
                    <h1>Reports</h1>
                </div>
                {pendingreports.map((elem)=>{

                    return <div className='report_lists' onClick={()=>{reportOpen(elem)}}>
                            <div>
                                <p>User name:{elem.reporter}</p>
                            </div>
                            <div>
                                <div><p>Chat:{}</p></div>
                                <div><button className={`devloper_reportStatus ${reportStatus}`}>{reportStatus}</button></div>
                            </div>
                        </div>
                    })
                }
                {actionTaken.map((elem)=>{

                    return  <div className='report_lists' onClick={()=>{reportOpen(elem)}}>
                            <div>
                                <p>User name:{elem.reporter}</p>
                            </div>
                            <div>
                                <div><p>Chat:{}</p></div>
                                <div><button className={`devloper_reportStatus ${reportStatus}`}>{reportStatus}</button></div>
                            </div>
                        </div>
                    })
                }
                {dismissed.map((elem)=>{

                    return  <div className='report_lists' onClick={()=>{reportOpen(elem)}}>
                            <div>
                                <p>User name:{elem.reporter}</p>
                            </div>
                            <div>
                                <div><p>Chat:{}</p></div>
                                <div><button className={`devloper_reportStatus ${reportStatus}`}>{reportStatus}</button></div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        {{reprotDetails}?<div className='Report_container'>
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
    </>
  )
}