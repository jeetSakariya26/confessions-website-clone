import React, { useState } from 'react'
import Navbar from './Navbar'
import Profilephoto from './profile_photo.jpeg'
import { Link } from 'react-router-dom'

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
  return (
    <div>
        <Navbar menuOnclick={handleOnMenu}></Navbar>
        <div>
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
