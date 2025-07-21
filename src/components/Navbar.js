import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {CgAddR,CgProfile} from 'react-icons/cg'
import {FiList} from 'react-icons/fi'
import {ImCross} from 'react-icons/im'



export default function Navbar(props){
  const [menuSlider,setmenuSlider]=useState(false);
  const [addSlider,setaddSlider]=useState(false);
  const [SearchUser,setSearchUser]=useState("");
  let user=localStorage.getItem("user");
  if(user=="member"){
    var userPoisition=true;
  }else{
    var userPoisition=false;
  }
  const handleOnMenu=()=>{
    if(menuSlider){
      document.querySelector(".menu_slider").style.width="0vw";
      setmenuSlider(false);
    }else{
      document.querySelector(".menu_slider").style.width="15vw";
      setmenuSlider(true);
    }
  }
  const handleOnAdd=()=>{
    if(addSlider && userPoisition){
      document.querySelector(".group_creation").style.display="none";
      setaddSlider(false);
    }else if(!addSlider && userPoisition){
      document.querySelector(".group_creation").style.display="flex";
      setaddSlider(true);
    }
  }
  const HandleOnSearch=()=>{
  }

  const HandleOnSearchUser=(event)=>{
    setSearchUser(event.target.value);
  }

  const logoutUser = ()=>{
    localStorage.setItem('token',"");
  }
  return (
    <>
    <div className='navbar_container'>
      <div>
        <div className='menu_container'>
          <button onClick={handleOnMenu}>
            {menuSlider?<ImCross size={30} color='white'/>:<FiList size={30} color='white'/>}  
          </button>
        </div>
        <div className='heading_container'>
          <div>
            <h1>PostSecret</h1>
          </div>
        </div>
      </div>
      <div className='navbar_search'>
        <input type='search' value={SearchUser} onChange={HandleOnSearchUser}></input>
        <button onClick={HandleOnSearch}>Search</button>
      </div>
      <div className='account_container'>
        <div onClick={handleOnAdd}>
          {userPoisition?<CgAddR size={40}></CgAddR>:<></>}
        </div>
        <div className='Profilephoto'>
          <Link to={"/account"}>
            {userPoisition?<CgProfile size={50} color='white'></CgProfile>:<></>}
          </Link>
        </div>
      </div>
    </div>
    <div className='menu_slider'>
      <div>
        {
          userPoisition?
          (<ul>
            <li><Link to={`/user/Homepage`} className='groupNames'>Groups</Link></li>
            <li><Link to={`/user/search`} className='groupNames'>Search User</Link></li>
            <li><Link to={`/user/create`} className='groupNames'>Create Group</Link></li>
            <li><Link to={`/user/join`} className='groupNames'>Join Group</Link></li>
          </ul>):
          (
            <ul>
              <li><Link to={`/dev`} className='groupNames'>Reports</Link></li>
          </ul>
          )
        }
      </div>
      <div>
        <Link to={"/"} className='Logout_btn' onClick={logoutUser}><p>Logout</p></Link>
      </div>
    </div>
      {
        userPoisition?(
        <div className='group_creation'>
          <div>
            <Link to={"/user/create"}>Create Group</Link>
            <Link to={"/user/join"}>Join Group</Link>
          </div>
        </div>
        ):(<></>)
      }
    {/* <SearchUser></SearchUser> */}
    </>
  )
}
