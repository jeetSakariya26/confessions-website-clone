import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { BrowserRouter, Link } from 'react-router-dom'

export default function CreateGroup(props) {
    const [GroupName,setGroupName]=useState("");
    const HandleOnGroupname=(event)=>{
        setGroupName(event.target.value);
    }
  return (
    <div className='Create_container'>
      <div>
        <ImCross size={25} className='join_closeicon' onClick={props.ClickOnCross}></ImCross>
      </div>
      <div>
        <h1>Create Group</h1>
      </div>
      <div>
        <input type='text' onChange={HandleOnGroupname} value={GroupName} name='groupnname'></input>
        <label htmlFor='groupname'>Group Name: </label>
      </div>
      <div>
        <button>Create Group</button>
      </div>
    </div>
  )
}
