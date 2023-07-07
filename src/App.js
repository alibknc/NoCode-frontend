import React from 'react';
import './css/App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import authReducer from './reducers/authReducer';
import Protected from './Protected';
import Login from './views/login/Login';
import Projects from './views/projects/Projects';
import Tables from './views/tables/Tables';
import TableDetails from './views/table-details/TableDetails';
import Endpoints from './views/endpoints/Endpoints';
import NewEndpoint from './views/endpoints/NewEndpoint';

const router = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/projects/:id",
    element: <Tables />,
  },
  {
    path: "/projects/:id/content/:name",
    element: <TableDetails />,
  },
  {
    path: "/projects/:id/endpoints",
    element: <Endpoints />,
  },
  {
    path: "/projects/:id/endpoints/create",
    element: <NewEndpoint />,
  }
];

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null)

  useEffect(() => {
    const user = authReducer.getUser();
    console.log(user)

    const currentPath = window.location.pathname;
    const isProtectedRoute = currentPath !== '/login';
    
    console.log(currentPath)
    if (user == null && isProtectedRoute) {
      setIsSignedIn(false);
    } else {
      setIsSignedIn(true);
    }
  }, []);

  return (
    isSignedIn !== null ? 
      <BrowserRouter>
        <Routes>
          {router.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={
                <Protected isSignedIn={isSignedIn}>
                  {route.element}
                </Protected>
              }
            />
          ))}
        </Routes>
      </BrowserRouter> : <></>
  );
}

export default App;