import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import { Right_Container } from './components/Right_Container';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



function App() {
  
 


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