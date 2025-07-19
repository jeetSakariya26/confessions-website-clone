import React from 'react'
import Profilephoto from './profile.png'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

export default function Account() {
    const handleOnMenu=(menuSlider)=>{
    // if(menuSlider){
    //   document.querySelector(".Account_container").style.marginLeft="30px";
    // }else{
    //   document.querySelector(".Account_container").style.marginLeft="17vw";
    // }
    console.log(menuSlider)
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
                <button>Edit Profile</button>
                <button>Logout</button>
            </div>
        </div>
    </div>
    </>
  )
}
