import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import { Right_Container } from './components/Right_Container';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


function App() {
  // const [msg, setMsg] = useState("");
  // let fetchData=async()=>{
  //   let data=await fetch("http://localhost:8080/data");
  //   let response=await data.json();
  //   setMsg(response.message);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <div>
          <Signup />
        </div>
        <div>
          <Right_Container />
        </div></>
    },

    {
      path: "/login",
      element: <>
        <div>
          <Login />
        </div>
        <div>
          <Right_Container />
        </div></>
    }
  ])

return (
  <>
    <RouterProvider router={router}/>
  </>
)}


export default App;