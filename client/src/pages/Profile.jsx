import React, { useRef, useState } from 'react'
import Navbar from '../component/Navbar'
import image from '../../public/hp1book.jpg'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CountUp from 'react-countup'
export default function Profile() {
  const user = useSelector(state => state.user).users
  const inputRef = useRef(null);
  const [url, seturl] = useState(`http://localhost:5173/User/${user.image ? user.image : "pr.jpg"}`)
  console.log("at url =", url);
  const handleChangeimg = async (e) => {
    console.log("at change imahe");
    const formdata = new FormData()
    formdata.append("image", e.target.files[0])
    formdata.append("id", user.ID)
    const res = await axios.post('http://localhost:5000/user/image', formdata)
    const value = await res.data
    console.log(res.data);
    seturl(`http://localhost:5173/User/${res.data}`)
    // console.log("form=", formData);
  }
  const handleClick = () => {
    inputRef.current.click();
  };
  return (
    <>
      {/* {console.log(url)} */}
      {/* <img src={url}></img> */}
      <Navbar />
      <input type='file' onChange={handleChangeimg} ref={inputRef} hidden></input>
      {/* <button onClick={handleClick}>Focus Input</button> */}
      <div className='absolute bg-green-600 h-[50vh] w-full -z-10'></div>
      <div className=' h-[80vh] w-full flex justify-center rounded-t-lg  z-20 mx-auto mt-32' style={{ fontFamily: "Poppins" }}>
        <div className='flex justify-center items-center absolute h-[30vh] w-[30vh] font-normal'>
          <div className='flex justify-center font-bold'>
            <div className='w-[40vh]  mt-32'>
              <div className='flex flex-col justify-center items-center'>
                <label className='font-light'>Name :</label>
                <p>{user.Name}</p>
              </div>
            </div>
            <div className='flex justify-center w-[50vh]  '>
              <img onClick={handleClick} className='h-[30vh] w-[30vh]   hover:outline-4 hover:outline outline-[#658147] transition-all ease-out duration-300 relative mb-24 rounded-full object-contain' src={url}>
              </img>
            </div>
            <div className='w-[40vh] flex justify-center  mt-32'>
              <div className='flex flex-col'>
                <label className='font-light'>Email : </label>
                <p>{user.Email}</p>
              </div>
            </div>
          </div>


        </div>
        <div className='h-full absolute -z-10 flex justify-center items-center gap-20 font-medium m-0 text-2xl text-black  w-[80%]  rounded-lg  bg-[#DEF9C4]' style={{ fontFamily: "Poppins" }}>

          <div className='flex  justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
              <label>Friends</label>
              <p><CountUp end={14} duration={5} /></p>
            </div>
          </div><div className='flex  justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
              <label>Book Read</label>
              <p><CountUp end={54} duration={5} /></p>
            </div>
          </div><div className='flex  justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
              <label>Panding Book</label>
              <p><CountUp end={10} duration={5} /></p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
