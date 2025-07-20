import React, { use, useState } from 'react'
import Profilephoto from './profile.png'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

export default function Account() {
    const [Username,setUsername]=useState("");
    const [Nickname,setNickname]=useState("");
    const [Password,setPassword]=useState("");
    const [editMenu,seteditMenu]=useState(false);
    const [Follow,setFollow]=useState(false);
    const handleOnMenu=(menuSlider)=>{
    // if(menuSlider){
    //   document.querySelector(".Account_container").style.marginLeft="30px";
    // }else{
    //   document.querySelector(".Account_container").style.marginLeft="17vw";
    // }
    console.log(menuSlider)
  }
  const HandleOnEditprofile=()=>{
    console.log("hii");
    if(editMenu){
        document.querySelector(".Edit_container").style.display="none";
        document.querySelector(".Account_maincontainer").style.display="flex";
        seteditMenu(false)
    }else{
        document.querySelector(".Edit_container").style.display="flex";                
        document.querySelector(".Account_maincontainer").style.display="none";
        seteditMenu(true);
    }
  }
  const HandleOnUsername=(event)=>{
    setUsername(event.target.value);
  }
  const HandleOnNickname=(event)=>{
    setNickname(event.target.value);
  }
  const HandleOnPassword=(event)=>{
    setPassword(event.target.value);
  }
  const HandleOnSave=()=>{

  }
  const HandleOnCloseEdit=()=>{
    if(editMenu){
        document.querySelector(".Edit_container").style.display="none";
        document.querySelector(".Account_maincontainer").style.display="flex";
        seteditMenu(false)
    }else{
        document.querySelector(".Edit_container").style.display="flex";                
        document.querySelector(".Account_maincontainer").style.display="none";
        seteditMenu(true);
    }
  }
  const HandleOnFollow=()=>{
    if(Follow){
        document.querySelector(".AccountDetails button").innerHTML="follow";
        setFollow(false);
    }else{
        document.querySelector(".AccountDetails button").innerHTML="unfollow";
        setFollow(true);
    }
  }
  const HandleOnLogout=()=>{
    window.location.href="http://localhost:3000/"
  }
  return (
    <>
    <Navbar menuOnclick={handleOnMenu}></Navbar>
    <div className='Account_maincontainer'>
        <div>
            <ImCross size={25} className='close_accountpage'/>
        </div>
        <div className='Account_container'>
            <div className='AccountDetails'>
                <div>
                    <img src={Profilephoto}></img>
                </div>
                <div>
                    <div>
                        <h2>User Name</h2>
                        <p>Nick Name</p>
                    </div>
                    <div>
                        <ul>
                            <li><div><p>followers</p></div><div>100</div></li>
                            <li><div><p>following</p></div><div>100</div></li>
                            <li><div><p>freind</p></div> <div>100</div></li>
                        </ul>
                    </div>
                    <div>
                        <button onClick={HandleOnFollow}>Follow</button>
                    </div>
                </div>
            </div>
            <div className='AccountLogout'>
                <button onClick={HandleOnEditprofile}>Edit Profile</button>
                <button onClick={HandleOnLogout}>Logout</button>
            </div>
        </div>
        </div>
        <div className='Edit_container'>
            <div className='close_editcontainer'>
                <ImCross size={25} onClick={HandleOnCloseEdit}></ImCross>
            </div>
            <div>
                <h1>Edit user Details</h1>
            </div>
            <div>
                <div>
                    <input name='username' value={Username} onChange={HandleOnUsername}></input>
                    <label htmlFor='username'>Username:</label>
                </div>
                <div>
                    <input name='Nickname' value={Nickname} onChange={HandleOnNickname}></input>
                    <label htmlFor='Nickname'>Nickname:</label>
                </div>
                <div>
                    <input name='Password' value={Password} onChange={HandleOnPassword}></input>
                    <label htmlFor='Password'>Password:</label>
                </div>
            </div>
            <div>
                <button onClick={HandleOnSave}>Save Changes</button>
            </div>
    </div>
    </>
  )
}
