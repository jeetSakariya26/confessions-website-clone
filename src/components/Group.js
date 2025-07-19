import React, { use, useState } from 'react'
import Navbar from './Navbar'
import Profilephoto from './profile.png'
import {FaBold,FaItalic,FaUnderline} from 'react-icons/fa'
import { MdSend } from 'react-icons/md';
export default function Group() {
    const [inputText,setinputText]=useState("");
    const [bold,setbold]=useState(false);
    const [italic,setitalic]=useState(false);
    const [underline,setunderline]=useState(false)
    const handleOnTextChange=(event)=>{
      setinputText(event.target.value)
    }
    const HandleOnBold=()=>{
        console.log(inputText);
    }
    const HandleOnItalic=()=>{

    }
    const HandleOnUnderline=()=>{

    }
    const HandleOnSendChat=()=>{
      
    }
    const HandleOnLeaveGroup=()=>{
      
    }




    const handleOnMenu=(menuSlider)=>{
        if(menuSlider){
          document.querySelector(".GroupChating_maincontainer").style.marginLeft="0px"
        }else{
          document.querySelector(".GroupChating_maincontainer").style.marginLeft="15vw"
        }
    }
    const userDetials=[]
    for(let i=0;i<10;i++){
      userDetials.push({
        username:`user ${i}`,
        position:"admin"
      })
    }
    for(let i=0;i<10;i++){
      userDetials.push({
        username:`user 1${i}`,
        position:"member"
      })
    }
    const groupChat=[]
    for(let i=0;i<10;i++){
      groupChat.push({
        content:"Each child in a list should have a unique propCheck the render method of `ul`. It was passed a child from Navbar. See https://react.dev/link/warning-keys for more information."
      })
    }
    for(let i=0;i<10;i++){
      groupChat.push({
        content:"Each child in a list should have a unique propCheck the render method of `ul`. It was passed a child from Navbar. See https://react.dev/link/warning-keys for more information.Each child in a list should have a unique propCheck the render method of `ul`. It was passed a child from Navbar. See https://react.dev/link/warning-keys for more information.Each child in a list should have a unique propCheck the render method of `ul`. It was passed a child from Navbar. See https://react.dev/link/warning-keys for more information."
      })
    }
  return (
    <div>
      <Navbar menuOnclick={handleOnMenu}></Navbar>
      <div className='GroupChating_maincontainer'>
        <div className='GroupChating_info'>
          <div>
            <img src={Profilephoto}></img>
          </div>
          <div className='Group_descripation'>
            <h1>Group Name</h1>
            <button type='button'>Genrate code</button>
          </div>
          <div className='Group_memberDetails'>
            <div>
              <p className='ListOfMember'>Member</p>
            </div>
            <div>
              <ul>
              {
                userDetials.map((elem)=>{
                  if(elem.position==="admin"){
                    return <li className={elem.position}><p>{elem.username}</p><span>{elem.position}</span></li>  
                  }else{
                    return <li>{elem.username}</li>
                  }
                })
              }
              </ul>
              <button type='button' onClick={HandleOnLeaveGroup}>Leave the Group</button>
            </div>
          </div>
        </div>
        <div className='GroupChat_container'>
              <div className='GroupChats'>
                <ul>
              {
                groupChat.map((elem)=>{
                  return <li>{elem.content}</li>
                })
              }
              </ul>
              </div>
              <div className='SendChats'>
                <div className='SendChats_option'>
                  <button type='button' onClick={HandleOnBold}><FaBold size={20}></FaBold></button>
                  <button type='button' onClick={HandleOnItalic}><FaItalic size={20}></FaItalic></button>
                  <button type='button' onClick={HandleOnUnderline}><FaUnderline size={20}></FaUnderline></button>
                </div>
                <div className='SendChats_area'>
                  <textarea value={inputText} onChange={handleOnTextChange}></textarea>
                </div>
                <div className='SendChats_btn'>
                  <button type='button' onClick={HandleOnSendChat}><MdSend size={25}></MdSend></button>
                </div>
              </div>

        </div>
      </div>
    </div>









   







  )
}
