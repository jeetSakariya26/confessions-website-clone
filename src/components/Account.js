import React, { use, useEffect, useState } from 'react';
import Profilephoto from './profile.png'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';


export default function Account(props) {
    const [Nickname,setNickname]=useState("");
    const [editMenu,seteditMenu]=useState(false);
    const [Follow,setFollow]=useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            let res = await fetch("http://localhost:3001/user/profile", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
            },
                header: {
                  "token": localStorage.getItem("token"), // use your token key
                }
            });
            let data = await res.json();
            if(res.ok){
              setUserDetails(data);
            } else {
              alert(data.message);
            }
          } catch (err) {
            alert("Failed to fetch user details:");
            setUserDetails({});
          } finally {
            setLoading(false);
          }
        }
        
        fetchUserDetails();
      }, []);
    
      if (loading) {
        return <div>Loading user account...</div>; // you can replace this with a spinner
      }
    
      if (!userDetails) {
        return <div>Failed to load user details.</div>; // error case
      }


    const handleOnMenu=(menuSlider)=>{
    // if(menuSlider){
    //   document.querySelector(".Account_container").style.marginLeft="30px";
    // }else{
    //   document.querySelector(".Account_container").style.marginLeft="17vw";
    // }
  }
  const HandleOnEditprofile=()=>{
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
  const HandleOnNickname=(event)=>{
    setNickname(event.target.value);
  }
  const HandleOnSave=async()=>{
    let res = await fetch(`http://localhost:3001/user/edit/${Nickname}`,{
        method : "get",
        headers: {
          "Content-Type": "application/json",
        },
        header : {
          "token" : `${localStorage.getItem('token')}`
        }
    });
    if(res.ok){
        alert("NickName Changed");
        window.location.href = "http://localhost:3000/account";
    } else {
        alert("Try Again!");
    }
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
    localStorage.removeItem('token');
    window.location.href="http://localhost:3000/"
  }
  return (
    <>
    <Navbar menuOnclick={handleOnMenu} userDetails={props.userDetails}></Navbar>
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
                        <h2>@{userDetails.username}</h2>
                        <p>{userDetails.nickName}</p>
                    </div>
                    <div>
                        <ul>
                            <li><div><p>followers</p></div><div>{userDetails.followers.length}</div></li>
                            <li><div><p>following</p></div><div>{userDetails.followings.length}</div></li>
                            <li><div><p>freind</p></div> <div>{userDetails.friends.length}</div></li>
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
                    <input name='Nickname' value={Nickname} onChange={HandleOnNickname}></input>
                    <label htmlFor='Nickname'>Nickname:</label>
                </div>
            </div>
            <div>
                <button onClick={HandleOnSave}>Save Changes</button>
            </div>
    </div>
    </>
  )
}
