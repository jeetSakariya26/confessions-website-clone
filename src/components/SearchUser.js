import React from 'react'
import Profilephoto from './profile.png'
export default function SearchUser() {
    const HandleOnFollow=()=>{

    }
  return (
    <div>
        <div className='searchAccountDetails'>
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
    </div>
  )
}
