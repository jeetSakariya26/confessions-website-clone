import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import {CgProfile} from 'react-icons/cg'

export default function Searchuserlist() {
    const [userList,setuserList]=useState([]);
    const [loading,setLoading]=useState([]);
    async function getUsers(){
        try{
            let input=localStorage.getItem("seachedUser");
            let res = await fetch(`http://localhost:3001/user/:${input}/find`, {
                method: "get",
                headers: {
                "Content-Type": "application/json",
                },
                header : {
                "token" : `${localStorage.getItem('token')}`
                }
            });
            let data = await res.json();
            setuserList(data.users);
            setLoading(false);
            } catch(error){
            console.error(error);
            setLoading(false);
            }
        }
    useEffect(() => {
        getUsers();
    }, []);
        
  return (
    <>
        <Navbar></Navbar>
        <div className='Searchmemberlist'>
            <div>
                <ul>
                    {
                        userList.map((elem)=>{
                            return <li><Link to={"/user/Homepage/search/useraccount"}><CgProfile size={30}></CgProfile><span>{elem.name}</span></Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    </>
  )
}
