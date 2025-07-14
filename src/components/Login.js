import React, { useState } from 'react'
import { href, Link } from 'react-router-dom';
import SignUp from './SignUp';

export default function Login(props) {
    const [Name,setName]=useState('');
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const handleOnSubmit=(event)=>{
        // event.append(Name)
        console.log(event)
    }
    const handleOnPassword=(e)=>{
        // console.log(e.target.value);
        setPassword(e.target.value);
    }
    const handleOnUserName=(e)=>{
        setName(e.target.value);
    }

    return (
    <div className='login_maincontainer'>
        <div className='login_data'>
            <h2>User Login</h2>
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
                    <button type='submit' className='login_submit'>Submit</button>
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
