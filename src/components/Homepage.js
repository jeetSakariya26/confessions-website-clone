import React, { useState } from 'react'
import Navbar from './Navbar'
import Profilephoto from './profile_photo.jpeg'
import { BrowserRouter, Link } from 'react-router-dom'

export default function Homepage(props) {
  let userDetails=[];
  // let res = await fetch('http://localhost:3001/user/group', {
  //   method: "get",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "token" : `${localStorage.getItem('token')}`
  //   },
  // });
  // if(res.ok){
  //   console.log("Found Groups");
  // } else {
  //   console.log("Error");
  // }
  // let data = await res.json();
  // userDetails = data.groups;

  const handleOnMenu=(menuSlider)=>{
    if(menuSlider){
      document.querySelector(".homepage_groupContainer").style.marginLeft="30px";
    }else{
      document.querySelector(".homepage_groupContainer").style.marginLeft="17vw";
    }
  }
  const HandleOnCreate=(CreateGroup)=>{
    if(CreateGroup){
      document.querySelector(".homepage_maincontainer").style.display="flex";

    }else{
      document.querySelector(".homepage_maincontainer").style.display="none";

    }
  }
  const HandleOnJoin=(joingroup)=>{
    if(joingroup){
      document.querySelector(".homepage_maincontainer").style.display="flex";
    } else{
      document.querySelector(".homepage_maincontainer").style.display="none";
    }
  }
  return (
    <div>
        <Navbar menuOnclick={handleOnMenu} createGroup={HandleOnCreate} joinGroup={HandleOnJoin}></Navbar>
        <div className='homepage_maincontainer'>
          <div className='homepage_groupContainer'>
            {
              userDetails.map((elem)=>{
                
                return <Link to={"/group"} className='GroupContainer'><div>
                  <div>
                    <img src={Profilephoto}></img>
                  </div>
                  <div>
                    <h2>{elem.groupname}</h2>
                    <p>created by {elem.username}</p>
                  </div>
                </div>
                </Link>
              })  
            }
            

          </div>
        </div>
    </div>
  )
}
