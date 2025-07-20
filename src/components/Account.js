import React, { useState } from 'react'
import Profilephoto from './profile.png'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

export default function Account() {
    const [Username,setUsername]=useState("");
    const [Nickname,setNickname]=useState("");
    const [Password,setPassword]=useState("");
    const [editMenu,seteditMenu]=useState(false);

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
        document.querySelector(".Edit_container").style.display="flex";
    }else{
        document.querySelector(".Edit_container").style.display="flex";

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
                        <button>Follow</button>
                    </div>
                </div>
            </div>
            <div className='AccountLogout'>
                <button onClick={HandleOnEditprofile}>Edit Profile</button>
                <button>Logout</button>
            </div>
        </div>
        <div className='Edit_container'>
            <div>
                <h1>Edit user Details</h1>
            </div>
            <div>
                <div>
                    <input name='username' value={Username} onChange={HandleOnUsername}></input>
                    <label htmlFor='username'></label>
                </div>
                <div>
                    <input name='Nickname' value={Nickname} onChange={HandleOnNickname}></input>
                    <label htmlFor='Nickname'></label>
                </div>
                <div>
                    <input name='Password' value={Password} onChange={HandleOnPassword}></input>
                    <label htmlFor='Password'></label>
                </div>
            </div>
            <div>
                <button onClick={HandleOnSave}>Save Changes</button>
            </div>
        </div>
    </div>
    </>
  )
}
