import React from 'react'
import Profilephoto from './profile_photo.jpeg'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

export default function Account() {
    const handleOnMenu=(menuSlider)=>{
    if(menuSlider){
      document.querySelector(".Account_container").style.marginLeft="30px";
    }else{
      document.querySelector(".Account_container").style.marginLeft="17vw";
    }
  }
  const userDetails=[];
  for(let i=1;i<101;i++){
    userDetails.push({
        group:`group ${i}`,
    })
  }
  return (
    <>
    <Navbar menuOnclick={handleOnMenu}></Navbar>
    <div className='Account_maincontainer'>
        
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
                            <li>100 followers</li>
                            <li>100 following</li>
                            <li>100 freind</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='Joined_groups'>
                <div className='created_groupsbyUser'>
                    <div>
                        <p>Created Group</p>
                    </div>
                    <div className='list_of_createdGroup'>
                        <ul>
                        {
                            userDetails.map((elem)=>{
                                return <li>{elem.group}</li>
                            })
                        }
                        </ul>
                    </div>
                </div>
                <div className='joined_groupsbyUser'>
                    <div>
                        <p>Joined Group</p>
                    </div>
                    <div className='list_of_joinedGroup'>
                        <ul>
                        {
                            userDetails.map((elem)=>{
                                return <li>{elem.group}</li>
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Link to={"/Edit"}>Edit Profile</Link>
            <Link to={"/"}>Logout</Link>
        </div>
    </div>
    </>
  )
}
