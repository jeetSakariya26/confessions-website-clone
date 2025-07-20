import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { BrowserRouter, Link } from 'react-router-dom'

export default function CreateGroup(props) {
    const [GroupName,setGroupName]=useState("");
    const HandleOnGroupname=(event)=>{
        setGroupName(event.target.value);
    }
    const HandleOnCreate=async(event)=>{
      alert("creating account");
      let res = await fetch(`http://localhost:3001/user/group/${GroupName}/create`,
        {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "token" : `${header.token}`
        },
      }
      
    )
    const data = await res.json();
    if (res.ok) {
        alert("Group created successfully!");
      } else {
        alert(data.message || "Error creating group");
      }
    window.location.href="http://localhost:3000/user/Homepage";
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
        <button onClick={HandleOnCreate}>Create Group</button>
      </div>
    </div>
  )
}
