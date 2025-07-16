import React from 'react'
import search from './searchIcon.jpeg'
import profile_photo from './profile_photo.jpeg'
import menu from './menu.png'
import add from './addicon.png'
export default function Navbar() {
  return (
    <div className='navbar_container'>
      <div>
        <div className='menu_container'>
          <button>
            <img src={menu}></img>  
          </button>
        </div>
        <div className='heading_container'>
          <div>
            <h1>PostSecret</h1>
          </div>
        </div>
      </div>
      <div className='account_container'>
        <img src={add}></img>
        <div className='Profilephoto'>
          <img src={profile_photo}></img>
        </div>
      </div>
      
    </div>
  )
}
