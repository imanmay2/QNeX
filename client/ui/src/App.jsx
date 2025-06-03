import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import { Right_Container } from './components/Right_Container';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { Options } from './components/Options';
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
      element: <div className='root1'>
        <div>
          <Signup />
        </div>
        <div>
          <Right_Container />
        </div></div>
    },

    {
      path: "/login",
      element: <div className='root1'>
        <div>
          <Login />
        </div>
        <div>
          <Right_Container />
        </div></div>
    },{
      path:"/dashboard",
      element: <div className='dashboard'>
        <Options/>
        <Dashboard/>
      </div>
    }
  ])

return (
  <>
    <RouterProvider router={router}/>
  </>
)}


export default App;