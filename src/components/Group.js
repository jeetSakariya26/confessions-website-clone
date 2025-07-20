import React, { use, useState,useEffect} from 'react'
import Navbar from './Navbar'
import Profilephoto from './profile.png'
import {FaBold,FaItalic,FaUnderline} from 'react-icons/fa'
import { MdSend } from 'react-icons/md';
export default function Group(props) {
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
    const [groupChat, setgroupChat] = useState([]);     
    const [loading, setLoading] = useState(true); // Show loading state
        // let mainGroups = [];
        
        async function getGroups(){
          try{
            let res = await fetch('http://localhost:3001/user/group/:groupId/chat', {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                "token" : `${localStorage.getItem('token')}`
              },
            });
            let data = await res.json();
            setgroupChat(data.groups);
            localStorage.setItem('userDetails',data.groups);
            setLoading(false);
          } catch(error){
            console.error(error);
            setLoading(false);
          }
        }
      
        useEffect(() => {
          getGroups();
        }, []);



    const handleOnMenu=(menuSlider)=>{
        if(menuSlider){
          document.querySelector(".GroupChating_maincontainer").style.marginLeft="0px"
        }else{
          document.querySelector(".GroupChating_maincontainer").style.marginLeft="15vw"
        }
    }
  return (
    <div>
      <Navbar menuOnclick={handleOnMenu} userDetials={props.userDetials}></Navbar>
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
                props.userDetials.map((elem)=>{
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
