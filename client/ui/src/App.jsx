import React from 'react';
import './App.css';
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
import NotFoundPage from './components/404PageNotFound';
import { ThemeToggle } from './components/ThemeToggle';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    }, {
      path: "/dashboard",
      element: <Dashboard />
    }, {
      path: "/createTest",
      element: <CreateTest />
    }, {
      path: "/reviewTest",
      element: <ReviewTest />
    }, {
      path: "/attendTest",
      element: <AttendTest />
    }, {
      path: "/Test/:id",
      element: <Test />
    }, {
      path: "/reviewtest/:username/:id",
      element: <TestReview />
    }, {
      path: "/settings",
      element: <Settings />
    }, {
      path: "*",
      element: <NotFoundPage />
    }
  ])

  return (
    <>
      <ThemeToggle />
      <RouterProvider router={router} />
    </>
  )
}


export default App;
