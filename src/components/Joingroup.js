import React, { useState } from 'react'
import {ImCross} from 'react-icons/im'
import { Link } from 'react-router-dom';




export default function Joingroup(props) {
    const  [GroupCode,setGroupCode]=useState("");
    const HandleOnChange=(event)=>{
        setGroupCode(event.target.value);
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
        <button>Join Group</button>
      </div>
    </div>
  )
}
