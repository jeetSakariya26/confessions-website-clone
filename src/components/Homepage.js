import React, { useState , useEffect} from 'react'
import Navbar from './Navbar'
import Profilephoto from './profile.png'
import { BrowserRouter, Link } from 'react-router-dom'


export default function Homepage(props) {
  const [userDetails, setUserDetails] = useState([]);     
  const [loading, setLoading] = useState(true); // Show loading state
  // let mainGroups = [];
  
  async function getGroups(){
    try{
      let res = await fetch('http://localhost:3001/user/group', {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        header : {
          "token" : `${localStorage.getItem('token')}`
        }
      });
      let data = await res.json();
      setUserDetails(data.groups);
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
      document.querySelector(".homepage_groupContainer").style.marginLeft="30px";
    }else{
      document.querySelector(".homepage_groupContainer").style.marginLeft="17vw";
    }
  }
  const HandleOnCreate=(CreateGroup)=>{
    if(CreateGroup){
      document.querySelector(".homepage_maincontainer").style.display="flex";

    }else{
      document.querySelector(".homepage_maincontainer").style.display="none";

    }
  }


  // const filterGroupByName = (input)=>{
  //   setUserDetails(mainGroups.filter((ele)=>ele.name.startsWith(input)));
  // }

  const HandleOnJoin=(joingroup)=>{
    if(joingroup){
      document.querySelector(".homepage_maincontainer").style.display="flex";
    } else{
      document.querySelector(".homepage_maincontainer").style.display="none";
    }
  }

  const groupDetails=(obj)=>{
    localStorage.setItem('currGroup',JSON.stringify(obj));
  }

  return (
    <div>
        <Navbar menuOnclick={handleOnMenu} createGroup={HandleOnCreate} joinGroup={HandleOnJoin} userDetails={props.userDetails}></Navbar>
        {props.loading || <div className='homepage_maincontainer'>
          <div className='homepage_groupContainer'>
            {
              props.userDetails.map((elem)=>{
                
                return <Link to={"/group"} className='GroupContainer' onClick={() => groupDetails(elem)}><div>
                  <div>
                    <img src={Profilephoto}></img>
                  </div>
                  <div>
                    <h2>{elem.name}</h2>
                    <p>created by {elem.admin}</p>
                  </div>
                </div>
                </Link>
              })  
            }
          </div>
        </div>}
    </div>
  )
}
