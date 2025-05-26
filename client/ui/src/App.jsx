import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import { Signup } from './components/signup';
import { Right_Container } from './components/Right_Container';
import { Login } from './components/Login';



function App() {
  const [msg, setMsg] = useState("");
  let fetchData=async()=>{
    let data=await fetch("http://localhost:8080/data");
    let response=await data.json();
    setMsg(response.message);
  }
  return (
    <>
    <div>
      <Login/>
      </div>
      <div>
        <Right_Container/>
      </div>
    </>
  )
}

export default App

