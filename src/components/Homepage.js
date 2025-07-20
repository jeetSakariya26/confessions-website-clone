import React, { useState } from 'react'
import Navbar from './Navbar'
import Profilephoto from './profile.png'
import { BrowserRouter, Link } from 'react-router-dom'

export default function Homepage() {
  const userDetails=[]
  for(let i=1;i<10;i++){
    userDetails.push({
      username:`user ${i}`,
      groupname:`group ${i}`,
    })
  }
  
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
      console.log("hii");
    }else{
      document.querySelector(".homepage_maincontainer").style.display="none";
      console.log("hii");

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
