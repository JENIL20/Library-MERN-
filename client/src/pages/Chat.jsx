import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { CiSearch } from "react-icons/ci";

const socket = io.connect("http://localhost:5000")

export default function Chat() {
  const user = useSelector(state => state.user).users
  const [users, setusers] = useState()
  const [room, setroom] = useState()
  const [chats, setchats] = useState([])
  const [search, setsearch] = useState("")
  const [message, setmessage] = useState("")
  const sendmessage = () => {
    const date = new Date()
    const data = { message, senderId: String(user.ID), reciverId: String(room.ID), time: String(date.getHours()) + ':' + String(date.getMinutes()) }
    socket.emit("send", data)
    setchats(prev => [...prev, data])

    // console.log("message sent");

    setmessage("")
  }
  const joinroom = async (data) => {
    const res = await axios.post("http://localhost:5000/msg/find", { senderId: user.ID, reciverId: data.ID })
    // console.log("chats=", res.data.data);
    setchats(res.data.data)
    setroom(data)
    setsearch("")
    socket.emit("join_room", user.ID + data.ID);
  }
  // console.log("chats =", chats);
  // console.log("room= ", room);
  useEffect(() => {
    socket.on("bckend", (data) => {
      setchats(prev => [...prev, data])
    });
  }, [socket]);
  const findusers = async () => {
    const res = await axios.get("http://localhost:5000/user/all")
    setusers(res.data.data)
    // console.log(res);
  }
  useEffect(() => {
    findusers()
  }, [])
  return (
    <div style={{ fontFamily: "Poppins" }}>
      {console.log(search)}
      <Navbar />
      {/* <div>
        <button value={"18"} onClick={() => { setstr(str + "18") }}>18</button>
        <button value={"26"} onClick={() => { setstr(str + "26") }}>26</button>
        <button onClick={joinroom}>jion</button>
      </div> */}
      <div className='flex h-[95vh] w-full '>

        <div className='h-full w-[30%]   bg-white'>
          <div className='h-[8%]  w-[95%] mx-auto flex flex-row items-center justify- my-1 content-center rounded-md hover:border-2 hover:border-black
           hover:border-solid'>
            <input className='w-[80%] bg-white border-none outline-none rounded-xl px-1 text-black text-xl' placeholder='Search for Person ' value={search} onChange={(e) => setsearch(e.target.value)}>
            </input>
            <CiSearch className='w-[20%] h-full' />
          </div>
          <div className='rounded-md  h-[88%] w-full bg-white overflow-scroll overflow-x-hidden '>
            {
              users?.filter((item) => user.ID != item.ID && (String(item?.ID).includes(search) || item?.Name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()))).map(
                (item) => {
                  return (
                    <div key={item.ID} onClick={() => joinroom(item)} className=' flex  justify-start mx-2  items-center h-16 border gap-2  hover:bg-slate-500 rounded-md bg-[#4E89AE] ' >
                      <img className='w-10 h-10  rounded-full ml-2' src={`http://localhost:5173/User/${item?.image}`}></img>
                      <div className='flex flex-col text-white justify-start items-start ml-4'>
                        <h2 className='text-xl font-bold'>{item?.Name}</h2>
                        <label>{(item?.ID)}</label>
                      </div>
                    </div>
                  )
                })
            }
          </div>
        </div>
        <div className='h-full w-[70%] flex flex-col  '>
          <div className='h-[9%]  w-full bg-[#4E89AE]  flex justify-start items-center'>
            <img className='w-12 h-12  rounded-full ml-2' src={`http://localhost:5173/User/${room?.image}`}></img>
            <div className='flex flex-col text-white ml-4 p-2 justify-start items-start'>
              <h2 className='text-2xl font-bold'>{room?.Name}</h2>
              <label>{room?.ID}</label>
            </div>
          </div>
          <div className='bg-slate-200 rounded-md border-l-8 border-r-8 py-2 border-l-green-600 border-r-purple-700  w-[95%] m-auto h-[70vh] flex flex-col overflow-scroll overflow-x-hidden align-bottom my-2 bottom-2 '>
            {

              chats?.map((item) => {
                return item.senderId == user.ID ?
                  <div key={Math.random()} className='flex justify-end items-center'>
                    <div className='items-end'>{item?.time}</div>
                    <div className='min-h-14 max-h-full max-w-[55%] mr-2 mt-2 justify-center content-center border-y-[1px] border-y-green-950  rounded-md border-l-8 border-r-8 border-l-green-600 border-r-purple-700 right-1 px-3'>{item.message}
                    </div>
                  </div>
                  :
                  // <div className='flex  items-center justify-start'>
                  <div className='flex content-center items-center justify-start'>
                    <div className='min-h-14 max-h-full max-w-[55%] ml-2 mt-2 rounded-md border-y-[0.01rem] justify-center content-center border-y-green-950 border-l-8 border-r-8 border-l-green-600 border-r-purple-700 right-1 px-2'>{item.message}
                    </div>
                    <div>{item?.time}</div>
                  </div>
              })

            }

          </div>
          <div className='h-[10vh] w-[95%] m-auto  m- flex justify-between rounded-md'>
            <input className='w-[80%] bg-gray-500 rounded-l-md px-2 text-white text-xl' placeholder='Type a message' value={message} onChange={(e) => setmessage(e.target.value)}></input>
            <button className='w-[20%] bg-green-500 rounded-r-md text-white content-center font-bold text-2xl' onClick={sendmessage} >Send</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
