import './App.css';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import {BrowserRouter,Route,Routes,Router} from 'react-router-dom'
import SignUp from './components/SignUp.js';
import { useState } from 'react';
import Homepage from './components/Homepage.js';
import Group from './components/Group.js';
import Account from './components/Account.js';
import CreateGroup from './components/Creategroup.js';
import Joingroup from './components/Joingroup.js';

function App() {
  const [mode,setmode]=useState("login");
  const [token,settoken]=useState("");
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' index element={<Login setmode={setmode} mode={mode}></Login>}></Route>
        <Route path='/signup' element={<SignUp mode={mode} setmode={setmode} token={token}></SignUp>}></Route>
        <Route path='/user/Homepage' index element={<Homepage token={token}></Homepage>}></Route>
        <Route path='/group' element={<Group token={token}></Group>}></Route>
        <Route path='/account' element={<Account token={token}></Account>}></Route>
        <Route path='/user/creategroup' element={<CreateGroup token={token}></CreateGroup>}></Route>
        <Route path='/user/joingroup' element={<Joingroup token={token}></Joingroup>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
