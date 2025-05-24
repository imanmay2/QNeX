import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';


function App() {
  const [msg, setMsg] = useState("");
  // let url=;
  let fetchData=async()=>{
    let data=await fetch("http://localhost:8080/data");
    let response=await data.json();
    setMsg(response.message);
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
      <h2>Data from backend: </h2>
      <p>{msg}</p>
    </>
  )
}

export default App
