import React, { useEffect } from 'react'
import image from '../../public/tree.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteuser } from '../features/userslice'

export default function Navbar() {
  // const [user, setuser] = ("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const logout = () => {
    dispatch(deleteuser())
    console.log("deleteduser");
    navigate('/login')
  }
  useEffect(() => {
    console.log("user is here=", user.users);
  }, [])
  return (
    <div className='h-16 bg bg-green-600 flex justify-between' style={{ fontFamily: "Poppins", fontWeight: 500 }}>
      <div className='text-white flex justify-center items-center ml-8'>
        <img className='h-12 scale-[1.5]' src={image}></img>
        <p className='font-extrabold text-2xl ml-4' >Something</p>
      </div>
      <div className='text-white flex justify-center items-center content-center gap-6 text-lg' >
        <Link to='/' >Home</Link>
        <Link to='/about'>About</Link>
        <Link>Gallary</Link>
        <Link to='/book'>Books</Link>
        <Link>Thaughts</Link>
        <Link to='/chat'>Chat</Link>
        {

        }
      </div>
      <div className='text-white flex justify-center items-center gap-6 pr-2 text-2qxl font-bold'>
        {user.users.Name ? <Link to='/profile'>{user.users.Name}</Link> : <Link to='/login' >Login</Link>}

        {user.users.Email ? <button onClick={logout}>Logout</button> : <div>Signup</div>}
      </div>
    </div>
  )
}
