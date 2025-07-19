import './App.css';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import {BrowserRouter,Route,Routes,Router} from 'react-router-dom'
import SignUp from './components/SignUp.js';
import { useState } from 'react';
import Homepage from './components/Homepage.js';
import Group from './components/Group.js';
import Account from './components/Account.js';

function App() {
  const [mode,setmode]=useState("login")
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' index element={<Login setmode={setmode} mode={mode}></Login>}></Route>
        <Route path='/signup' element={<SignUp mode={mode} setmode={setmode}></SignUp>}></Route>
        <Route path='/Homepage' index element={<Homepage></Homepage>}></Route>
        <Route path='/group' element={<Group></Group>}></Route>
        <Route path='/account' element={<Account></Account>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
