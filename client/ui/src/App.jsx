import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import { Right_Container } from './components/Right_Container';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateTest } from './components/CreateTest';
import { ReviewTest } from './components/ReviewTest';
import { AttendTest } from './components/AttendTest';
import { Test } from './components/Test';
import { TestReview } from './components/TestReview';
import Settings from './components/Settings';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className='login_'>
        <Login />
      </div>
    },
    {
      path: "/signup",
      element: <div className='root1'>
        <Signup />
      </div>
    }, {
      path: "/dashboard",
      element: <div className='dashboard'>
        <Dashboard />
      </div>
    }, {
      path: "/createTest",
      element: <div className='createTest'>
        <CreateTest />
      </div>
    }, {
      path: "/reviewTest",
      element: <div className="reviewTest">
        <ReviewTest />
      </div>
    }, {
      path: "/attendTest",
      element: <div className="attendTest">
        <AttendTest />
      </div>
    }, {
      path: "/Test/:id",
      element: <div>
        <Test />
      </div>
    }, {
      path: "/reviewtest/:username/:id",
      element: <div>
        <TestReview />
      </div>
    }, {
      path: "/settings",
      element: <div>
        <Settings />
      </div>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App;