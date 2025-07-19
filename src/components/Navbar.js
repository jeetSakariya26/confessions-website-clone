import React, { useState } from 'react'
import search from './searchIcon.jpeg'
import cross from './cross1.jpg'
import profile_photo from './profile_photo.jpeg'
import menu from './menu.png'
import add from './addicon.png'
import { Link } from 'react-router-dom'
export default function Navbar(props){
  const [menuSlider,setmenuSlider]=useState(false);
  const [addSlider,setaddSlider]=useState(false);

  const userDetails=[];
  for(let i=1;i<101;i++){
    userDetails.push({
      username:`user ${i}`,
      groupname:`group ${i}`,
    })
  }

  const handleOnMenu=()=>{
    if(menuSlider){
      document.querySelector(".menu_slider").style.width="0vw";
      props.menuOnclick(menuSlider);
      // document.querySelector(".homepage_groupContainer").style.marginLeft="0vw";
      setmenuSlider(false);
    }else{
      document.querySelector(".menu_slider").style.width="15vw";
      props.menuOnclick(menuSlider);
      // document.querySelector(".homepage_groupContainer").style.marginLeft="16vw";
      setmenuSlider(true);
    }
  }
  const handleOnAdd=()=>{
    if(addSlider){
      console.log("1")
      document.querySelector(".group_creation").style.display="none";
      setaddSlider(false);
    }else{
      console.log("2")
      document.querySelector(".group_creation").style.display="flex";

      setaddSlider(true);
    }
  }
  return (
    <>
    <div className='navbar_container'>
      <div>
        <div className='menu_container'>
          <button onClick={handleOnMenu}>
            <img src={menuSlider?cross:menu} className='show_menu'></img>  
          </button>
        </div>
        <div className='heading_container'>
          <div>
            <h1>PostSecret</h1>
          </div>
        </div>
      </div>
      <div className='account_container'>
        <div className='DarkMode'>
          <div></div>
        </div>
        <div onClick={handleOnAdd}>
          <img src={add}></img>
        </div>
        <div className='Profilephoto'>
          <Link to={"/account"}>
            <img src={profile_photo}></img>
          </Link>
        </div>
      </div>
    </div>
    <div className='menu_slider'>
      <div>
        <ul>
          <li><Link to={"/Homepage"} className='groupNames'>Home</Link></li>
          {
            userDetails.map((elem)=>{
              return <li><Link to={`/group`} className='groupNames'>{elem.groupname}</Link></li>
            })
          }
        </ul>
      </div>
      <div>
        <Link to={"/"} className='Logout_btn'><p>Logout</p></Link>
      </div>
    </div>
    <div className='group_creation'>
      <Link className='groupCreateAndJoin'>Create Group</Link>
      <Link className='groupCreateAndJoin'>Join Group</Link>
    </div>
    </>
  )
}
