import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { BrowserRouter, Link } from 'react-router-dom'
import Navbar from './Navbar';

export default function CreateGroup(props) {
    const [GroupName,setGroupName]=useState("");
    const HandleOnGroupname=(event)=>{
        setGroupName(event.target.value);
    }
    const HandleOnCreate=async(event)=>{
      let res = await fetch(`http://localhost:3001/user/group/${GroupName}/create`,
        {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "token" : `${localStorage.getItem('token')}`
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
    const ClickOnCross=()=>{
      window.location.href="http://localhost:3000/user/Homepage";
    }
  return (
    <>
    <Navbar></Navbar>
    <div className='Create_container'>
      <div>
        <Link to={"/user/Homepage"}>
        <ImCross size={25} color='black' className='join_closeicon'></ImCross>
        </Link>
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
    </>
  )
}
