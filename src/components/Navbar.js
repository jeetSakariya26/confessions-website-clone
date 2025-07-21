import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {CgAddR,CgProfile} from 'react-icons/cg'
import {FiList} from 'react-icons/fi'
import {ImCross} from 'react-icons/im'
import Joingroup from './Joingroup'
import CreateGroup from './Creategroup'
import SearchUser from './SearchUser'




export default function Navbar(props){
  const [menuSlider,setmenuSlider]=useState(false);
  const [addSlider,setaddSlider]=useState(false);
  const [joingroup,setjoingroup]=useState(false);
  const [creategroup,setcreategroup]=useState(false);
  const [SearchUser,setSearchUser]=useState("");
  // let userDetails = JSON.parse(localStorage.getItem('userDetails'));
  // let userDetails= localStorage.getItem('userDetails');
  // for(let i=0;i<userDetails.length;i++){
  //   userDetails[i] = JSON.parse(userDetails[i]);
  // }

  const HandleOnCreate=()=>{
    window.location.href="http://localhost:3000/user/create"
  }
  const HandleOnJoin=()=>{
    window.location.href="http://localhost:3000/user/join"
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
    if(addSlider){
      document.querySelector(".group_creation").style.display="none";
      setaddSlider(false);
    }else{
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
          <CgAddR size={40}></CgAddR>
        </div>
        <div className='Profilephoto'>
          <Link to={"/account"}>
            <CgProfile size={50} color='white'></CgProfile>
          </Link>
        </div>
      </div>
    </div>
    <div className='menu_slider'>
      <div>
        <ul>
            <li><Link to={`/user/Homepage`} className='groupNames'>Groups</Link></li>
            <li><Link to={`/user/search`} className='groupNames'>Search User</Link></li>
            <li><Link to={`/user/create`} className='groupNames'>Create Group</Link></li>
            <li><Link to={`/user/join`} className='groupNames'>Join Group</Link></li>
        </ul>
      </div>
      <div>
        <Link to={"/"} className='Logout_btn' onClick={logoutUser}><p>Logout</p></Link>
      </div>
    </div>
    <div className='group_creation'>
      <Link to={"/user/create"}>Create Group</Link>
      <Link to={"/user/join"}>Join Group</Link>
    </div>
    {/* <SearchUser></SearchUser> */}
    </>
  )
}
