import React from 'react';
import './css/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Projects from './views/projects/Projects'
import Endpoint from './views/endpoint/Endpoint'
import Login from './views/login/Login'
import Register from './views/login/Register'
import Tables from './views/tables/Tables'

const router = createBrowserRouter([
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/endpoint",
    element: <Endpoint />,
  },
  {
    path: "/tables",
    element: <Tables />,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
