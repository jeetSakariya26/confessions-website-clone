import React, {useState,useEffect} from 'react'
import Profilephoto from './profile.png'
import Navbar from './Navbar'
export default function SearchUser() {
    
    const [user,setuser]=useState({});
    const [loading,setLoading]=useState([]);
    const [nums,setNums] = useState([0,0,0]);

    const getUserDetails = async()=>{
        let username = localStorage.getItem('targetUsername');
        try{
            let res = await fetch(`http://localhost:3001/user/${username}/profile`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
                header : {
                "token" : `${localStorage.getItem('token')}`
                }
            });
            setLoading(false);
            let data = await res.json();
            setNums([data.followers.length,data.followings.length,data.friends.length]);
            setuser(data);
            } catch(error){
                console.error(error);
                setLoading(false);
            }
    }

    useEffect(() => {
            getUserDetails();
    }, []);
    
    const HandleOnFollow=()=>{

    }

    if(loading){
        return <h1>Loading...</h1>
    }
  return (
    <>
    <Navbar></Navbar>
    <div>
        <div className='searchAccountDetails'>
                    <div>
                        <img src={Profilephoto}></img>
                    </div>
                    <div>
                        <div className='searchAccount_heading'>
                            <h2>@{user.username}</h2>
                            <p>{user.nickName}</p>
                        </div>
                        <div className='searchAccount_userdetails'>
                            <ul>
                                <li><div><p>followers</p></div><div>{nums[0]}</div></li>
                                <li><div><p>following</p></div><div>{nums[1]}</div></li>
                                <li><div><p>friend</p></div> <div>{nums[2]}</div></li>
                            </ul>
                            <div>
                                <button onClick={HandleOnFollow}>Follow</button>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
    </>
  )
}
