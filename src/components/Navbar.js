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
  let userDetails = JSON.parse(localStorage.getItem('userDetails'));
  // let userDetails= localStorage.getItem('userDetails');
  // for(let i=0;i<userDetails.length;i++){
  //   userDetails[i] = JSON.parse(userDetails[i]);
  // }

  const HandleOnCreate=()=>{
     if(!creategroup && joingroup){
      console.log(creategroup);
      setjoingroup(false);
      setcreategroup(true);
      document.querySelector(".Create_container").style.display="flex";
      document.querySelector(".join_container").style.display="none";

    }else if(creategroup){
      props.createGroup(creategroup);
      setcreategroup(false);
      document.querySelector(".Create_container").style.display="none";
    }else{
      props.createGroup(creategroup);
      setcreategroup(true);
      document.querySelector(".Create_container").style.display="flex";
      
    }
  }
  const HandleOnJoin=()=>{
    console.log("hii")
    if(!joingroup && creategroup){
      console.log(creategroup);
      // props.joinGroup(joingroup);
      setjoingroup(true);
      setcreategroup(false);
      document.querySelector(".join_container").style.display="flex";
      document.querySelector(".Create_container").style.display="none";
    }else if(joingroup){
      props.joinGroup(joingroup);
      setjoingroup(false);
      document.querySelector(".join_container").style.display="none";
    }else{
      props.joinGroup(joingroup);
      setjoingroup(true);
      document.querySelector(".join_container").style.display="flex";
    }
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
  const JoinClickOnCross=()=>{
    document.querySelector(".join_container").style.display="none";
    props.joinGroup(joingroup);
    setjoingroup(false)

  }
  const CreateClickOnCross=()=>{
    document.querySelector(".Create_container").style.display="none";
    props.createGroup(creategroup);
    setcreategroup(false);
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
          <li><Link to={"/user/Homepage"} className='groupNames'>Home</Link></li>
          {
            userDetails.map((elem)=>{
              return <li><Link to={`/group`} className='groupNames'>{elem.name}</Link></li>
            })
          }
        </ul>
      </div>
      <div>
        <Link to={"/"} className='Logout_btn' onClick={logoutUser}><p>Logout</p></Link>
      </div>
    </div>
    <div className='group_creation'>
      <button onClick={HandleOnCreate}>Create Group</button>
      <button onClick={HandleOnJoin}>Join Group</button>
    </div>
    <Joingroup ClickOnCross={JoinClickOnCross}></Joingroup>
    <CreateGroup ClickOnCross={CreateClickOnCross}></CreateGroup>
    {/* <SearchUser></SearchUser> */}
    </>
  )
}
