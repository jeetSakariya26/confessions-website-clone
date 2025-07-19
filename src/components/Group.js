import React from 'react'
import Navbar from './Navbar'

export default function Group() {
    const handleOnMenu=(menuSlider)=>{
        if(menuSlider){
            console.log(menuSlider);
        }else{
            console.log(menuSlider);
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
    
  return (
    <div>
      <Navbar menuOnclick={handleOnMenu}></Navbar>
      <div className='GroupChating_maincontainer'>
        <div className='GroupChating_info'>
          <div>

          </div>
          <div>
            <h1>Group Name</h1>
            <p>group descripation</p>
          </div>
          <div>
            <div>
              <p>Member</p>
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
            </div>
          </div>
        </div>
        <div className='GroupChat_container'>
              
        </div>
      </div>
    </div>
  )
}
