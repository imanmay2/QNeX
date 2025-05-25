import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import { Signup } from './components/signup';

function App() {
  const [msg, setMsg] = useState("");
  let fetchData=async()=>{
    let data=await fetch("http://localhost:8080/data");
    let response=await data.json();
    setMsg(response.message);
  }
  
  return (
    <>
      <Signup/>
    </>
  )
}

export default App

