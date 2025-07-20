import React, { useState } from 'react'
import {ImCross} from 'react-icons/im'
import { Link } from 'react-router-dom';

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

    return (
    <div className='join_container'>
      <div>
        <ImCross size={25} className='join_closeicon' onClick={props.ClickOnCross}></ImCross>
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
  )
}
