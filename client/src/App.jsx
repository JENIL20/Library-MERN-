import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import './App.css'
import Signup from './pages/Signup';
import Alert from './component/Alert';
import Login from './pages/Login';
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import Book from './pages/Book';
import Addbook from './component/Addbook';
import axios from 'axios'
import { addbook } from './features/bookslice';
import Profile from './pages/Profile';
import Book1 from './pages/Book1';
import Nofound from './component/Nofound';
import PrivateRoute from './component/PrivateRoute';
import About from './pages/About';
import { Endloading, Startloading } from './features/loadingslice';
import Chat from './pages/Chat';
function App() {
  const loading = useSelector(state => state.loading).loading
  const user = useSelector(state => state.user).users
  const dispatch = useDispatch()
  const books = async () => {

    dispatch(Startloading())
    const res = await axios.get('http://localhost:5000/book/allbook')
    console.log("loadinf is here bro ", res);
    dispatch(addbook(res.data.data))
    dispatch(Endloading())
  }
  useEffect(() => {
    books()
    // console.log("user at app = ", user);
  }, [])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute user={user} element={Home} />,
      // children: < Home />
    }, {
      path: "/signup",
      element: < Signup />,
    }, {
      path: "/login",
      element: < Login />
    }, {
      path: '/book/',
      children: [
        {
          path: '',
          element: <PrivateRoute user={user} element={Book} />
        }, {
          path: ':id',
          element: <PrivateRoute user={user} element={Book1} />
        }
      ]
    }, {
      path: "/profile",
      element: <PrivateRoute user={user} element={Profile} />,
    }, {
      path: "*",
      element: <Nofound></Nofound>
    }, {
      path: "/about",
      element: <PrivateRoute user={user} element={About} />,
    }, {
      path: "/chat",
      element: <PrivateRoute user={user} element={Chat} />,
    },
  ]);

  return (
    <RouterProvider router={router} >
    </RouterProvider>
  )
}

export default App
