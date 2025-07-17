import React,{useState} from 'react'
import { Link } from 'react-router-dom';

export default function SignUp(props) {
  const [Name,setName]=useState('');
  const [Nickname,setNickname]=useState('');
  const [Password,setPassword]=useState('');
  const [user,setuser]=useState('member');
  const handleOnPassword=(event)=>{
    console.log(event);
    setPassword(event.target.value);
  }
  
  const handleOnSubmit = async (event) => {
    event.preventDefault(); // prevent default form submit behavior
    try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Name,
          nickName: Nickname,
          password: Password,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert("Account created successfully!");
        // optionally redirect or clear form
      } else {
        alert(data.message || "Error creating account");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create account");
    }
};

  const handleOnUserName=(event)=>{
    console.log(event.target);
    setName(event.target.value)
  }
  const handleOnName=(event)=>{
    console.log(event.target)
    setNickname(event.target.value)

  }
  const changePositontoadmin=()=>{
    setuser("admin");
    document.querySelector(".singup_admin button").style.backgroundImage="linear-gradient(to left, rgb(30,212,252), rgb(117,78,231))";
    document.querySelector(".singup_member button").style.backgroundImage="none";
    document.querySelector(".singup_member button").style.backgroundColor="white"
    document.querySelector(".singup_member button").style.color="black";
    document.querySelector(".singup_admin  button").style.color="white";

  }
  const changePositontomember=()=>{
    setuser("member");
    document.querySelector(".singup_member button").style.backgroundImage="linear-gradient(to left, rgb(30,212,252), rgb(117,78,231))";
    document.querySelector(".singup_member button").style.color="white";

    document.querySelector(".singup_admin button").style.backgroundImage="none";
    document.querySelector(".singup_admin button").style.backgroundColor="white"
    document.querySelector(".singup_admin  button").style.color="black";
  }
  const account_create=()=>{
    
  }
  return (
    <div className='signup_container'>
      <div className='website_info1'>
        <h1>Welcome to PostSecret</h1>
        <p>Here you can make groups and join the groups. Your confession is anonymously and keep it private.</p>
      </div>
      <div className='new_account'>
        <div className='change_position'>
          <div className='singup_member'>
            <button onClick={changePositontomember}>Member</button>
          </div>
          <div className='singup_admin'>
            <button onClick={changePositontoadmin}>Admin</button>
          </div>
        </div>
        <div>
          <form onSubmit={handleOnSubmit}>
                <div>
                    <input className='User_name' value={Name} type='text' placeholder='User Name' onChange={handleOnUserName}/>
                    <label htmlFor='Username'>UserName:
                    </label>
                </div>
                <div>
                    <input className='User_name' value={Nickname} type='text' placeholder='Nickname' onChange={handleOnName}/>
                    <label htmlFor='Password'>Nickname:
                    </label>
                </div>
                <div>
                    <input className='User_name' value={Password} type='password' placeholder='Password' onChange={handleOnPassword}/>
                    <label htmlFor='Password'>Password:
                    </label>
                </div>
                <div className='signup_submit'>
                    <Link to={"/"} onClick={account_create} className='signup_Create_account'>SignUp</Link>
                </div>
                <div className='alreadyAccount'> 
                    <Link to={"/"} className='account' >I have an already account</Link>
                </div>
          </form>
        </div>
      </div>
    </div>
  )
}
