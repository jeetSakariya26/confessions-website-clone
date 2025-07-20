import React, { useState } from 'react'
import { href, Link } from 'react-router-dom';
import SignUp from './SignUp';

export default function Login(props) {
    const [Name,setName]=useState('');
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const [user,setuser]=useState('member');
    
    const handleOnSubmit=async(event)=>{
        event.preventDefault(); // prevent default form submit behavior
        try {
            if(user==="memeber"){
                const res = await fetch("http://localhost:3001/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: Name,
                        password: Password,
                    }),
                });
                const data = await res.json();
                console.log("Response:", data);
                if (res.ok) {
                    alert("Logged In");
                    window.location.href="http://localhost:3000/user/Homepage";
                } else {
                    alert(data.message);
                }
            }else if(user==="devloper"){
                const res = await fetch("http://localhost:3001/dev/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: Name,
                        password: Password,
                    }),
                });
                const data = await res.json();
                console.log("Response:", data);
                if (res.ok) {
                    alert("Logged In");
                    window.location.href="http://localhost:3000/dev/Homepage";
                } else {
                    alert(data.message);
        }
        }

        } catch (error) {
            alert("Failed logIn");
        }
    }

    const handleOnPassword=(e)=>{
        // console.log(e.target.value);
        setPassword(e.target.value);
    }
    const handleOnUserName=(e)=>{
        setName(e.target.value);
    }
    const changePositontoadmin=()=>{
    setuser("devloper");
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
    return (
    <div className='login_maincontainer'>
        <div className='login_data'>
            <h2>User Login</h2>
            <div className='change_position'>
                <div className='singup_member'>
                    <button onClick={changePositontomember}>Member</button>
                </div>
                <div className='singup_admin'>
                    <button onClick={changePositontoadmin}>Devloper</button>
                </div>
            </div>
            <form action={handleOnSubmit}>
                <div>
                    <input className='User_name' value={Name} type='text' placeholder='User Name' onChange={handleOnUserName}/>
                    <label htmlFor='Username'>UserName:
                    </label>
                </div>
                <div>
                    <input className='User_name' value={Password} type='password' placeholder='Password' onChange={handleOnPassword}/>
                    <label htmlFor='Password'>Password:
                    </label>
                </div>
                <div>
                    <Link to={"/user/Homepage"} onClick={handleOnSubmit} className='login_submit'>Login</Link>
                </div>
                <div>
                    <Link className='login_account' to={"/signup"}>Create an Account</Link>
                </div>
            </form>
        </div>
        <div className='website_info'>
            <h1>Welcome to PostSecret</h1>
            <p>Here you can make groups and join the groups. Your confession is anonymously and keep it private.</p>
        </div>
    </div>
    )
}
