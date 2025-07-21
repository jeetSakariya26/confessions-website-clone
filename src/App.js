import './App.css';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import {BrowserRouter,Route,Routes,Router} from 'react-router-dom'
import SignUp from './components/SignUp.js';
import { useState,useEffect } from 'react';
import Homepage from './components/Homepage.js'; 
import Group from './components/Group.js';
import Account from './components/Account.js';
import CreateGroup from './components/Creategroup.js';
import Joingroup from './components/Joingroup.js';
import Devloper from './components/Devloper.js';
import Report from './components/Report.js'
import DevloperReport from './components/DevloperReport.js';
import Searchuserlist from './components/SearchUserlist.js';
import SearchUser from './components/SearchUser.js';

function App() {
  const [mode,setmode]=useState("login");
  const [token,settoken]=useState("");
  const [userDetails, setUserDetails] = useState([]);     
  const [loading, setLoading] = useState(true); // Show loading state
    // let mainGroups = [];
    
    async function getGroups(){
      try{
        let res = await fetch('http://localhost:3001/user/group', {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "token" : `${localStorage.getItem('token')}`
          },
        });
        let data = await res.json();
        setUserDetails(data.groups);
        localStorage.setItem('userDetails',data.groups);
        setLoading(false);
      } catch(error){
        console.error(error);
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getGroups();
    }, []);
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' index element={<Login setmode={setmode} mode={mode}></Login>}></Route>
        <Route path='/dev' index element={<Devloper setmode={setmode} mode={mode}></Devloper>}></Route>
        <Route path='/signup' element={<SignUp mode={mode} setmode={setmode} token={token}></SignUp>}></Route>
        <Route path='/user/Homepage' index element={<Homepage token={token} userDetails={userDetails} loading={loading}></Homepage>}></Route>
        <Route path='/group' element={<Group token={token} userDetails={userDetails} loading={loading}></Group>}></Route>
        <Route path='/account' element={<Account token={token} userDetails={userDetails} loading={loading}></Account>}></Route>
        <Route path='/user/create' element={<CreateGroup token={token}></CreateGroup>}></Route>
        <Route path='/user/join' element={<Joingroup token={token}></Joingroup>}></Route>
        <Route path='/user/report' element={<Report token={token}></Report>}></Route>
        <Route path='/dev/report' element={<DevloperReport token={token}></DevloperReport>}></Route>
        <Route path='/user/Homepage/search' element={<Searchuserlist token={token}></Searchuserlist>}></Route>
        <Route path='/user/Homepage/search/useraccount' element={<SearchUser token={token}></SearchUser>}></Route>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
