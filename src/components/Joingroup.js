import React, { useState } from 'react'
import {ImCross} from 'react-icons/im'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Joingroup(props) {
    const  [GroupCode,setGroupCode]=useState("");
    const HandleOnChange=(event)=>{
        setGroupCode(event.target.value);
    }

    const joinGroup = async()=>{
      let res = await fetch(`http://localhost:3001/user/group/${GroupCode}/join`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "token" : `${localStorage.getItem('token')}`
        },
      });
      let data = await res.json();
      if(res.ok){
        alert("Joined Group");
      } else {
        alert(data.message || "Error joining group");
      }
    }
    const ClickOnCross=()=>{
      window.location.href="http://localhost:3000/user/Homepage";
    }
    return (
      <>
      <Navbar></Navbar>
    <div className='join_container'>
      <div>
        <Link>
          <ImCross size={25} color='black' className='join_closeicon'></ImCross>
        </Link>
      </div>
      <div>
        <h1>Join Group</h1>
      </div>
      <div>
        <input type='text' onChange={HandleOnChange} value={GroupCode} name='groupcode'></input>
        <label htmlFor='groupcode'>Group Code:</label>
      </div>
      <div>
        <button onClick={joinGroup}>Join Group</button>
      </div>
    </div>
      </>
  )
}
