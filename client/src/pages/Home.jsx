import React, { useEffect } from 'react'
import Navbar from '../component/Navbar'
import Number from '../component/Number'
import Card from '../component/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import library from '../../public/library.jpg'
import { FaUsersLine } from "react-icons/fa6";
import Card2 from '../component/Card2'
import Footer from '../component/Footer'
import CountUp from 'react-countup';


export default function Home() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  let books = useSelector(state => state.book)
  if (books.books)
    books = books.books
  // useEffect(() => {
  //   // console.log("athome", user);
  //   if (user.users.token == null) {
  //     console.log("hi i m heare at home", user.users.token);
  //     navigate('/login')
  //   }
  // }, [])
  return (
    <>
      <Navbar />

      <div className='h-[70vh]  bg-[#200E3A]'>
        <div class="h-[50vh] grid grid-cols-4 gap content-end pb-12 rounded-2xl items-center mx-20 text-4xl text-white " style={{
          fontFamily: 'Poppins'
        }}>
          < div className='text-center ' >
            <div>Users</div>
            <p>
              <CountUp end={100} duration={5} />+</p>
          </div>
          <div className='text-center'>
            <h3>Books</h3>
            <p><CountUp end={1500} duration={5} />+</p>
          </div>
          <div className='text-center'>
            <h3 >Visits</h3>
            <p ><CountUp end={2892} duration={5} />+</p>
          </div>
          <div className='text-center'>
            <h3 >Visits</h3>
            <p ><CountUp end={3230} duration={5} />+</p>
          </div>
        </div >
      </div >
      <h1 className='text-center text-5xl mt-20 font-extrabold' style={{ fontFamily: "Poppins" }}>At Our Library</h1>
      <div className='flex flex-wrap justify-center gap-12 m-8'>
        <Card2 type="1" text="This 12 months course aims to provide an introduction to the principles of air conditioning and refrigeration. The course will provide" header="AC classes" />
        <Card2 type="2" text="You can describe the air outside as fresh air, especially when you mean that it is good for you because it does not contain dirt or dangerous substances. 'Let's take the b" header="Fresh env" />
        <Card2 type="3" text="Silence, whatever it is, is not a sound,” Firestone tells Scientific American's Shayla Love. “It's the absence of sound. And yet it often feels like " header="No noice" />
        <Card2 type="4" text="free from any dirty marks, pollution, bacteria, etc.: a clean white shirt. clean air/water." header="Clean" />
      </div>
      <h1 className='text-center text-5xl mt-20 font-extrabold' style={{ fontFamily: "Poppins" }}>Some Of the famous Books </h1>
      <div className='flex flex-wrap mx-2 justify-center'>
        {
          books.length && books.slice(0, 4).map((item) => {
            return (
              <Link to={`/book/${item.ID}`} >
                <Card data={item} />
              </Link>
            )
          })
        }
      </div>

      <div className='flex flex-wrap mx-2 justify-center'>
        {
          books.length && books.slice(0, 4).map((item) => {
            return (
              <Link to={`/book/${item.ID}`} >
                <Card data={item} />
              </Link>
              // <Card data={item} />
            )
          })
        }
      </div>
      <Footer />
    </>
  )
}