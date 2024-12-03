import React from 'react'
import image from '../../public/hp1book.jpg'
import RingLoader from "react-spinners/ScaleLoader";
import { useSelector } from 'react-redux';

export default function Card(props) {
  // const book = {
  //   author: "Honoré de Balzac",
  //   country: "France",
  //   imageLink: "images/le-pere-goriot.jpg",
  //   language: "French",
  //   link: "https://en.wikipedia.org/wiki/Le_P%C3%A8re_Goriot\n",
  //   pages: 443,
  //   title: "Le Père Goriot",
  //   year: 1835
  // }
  const loading = useSelector(state => state.loading).loading
  const { data } = props
  // console.log("itemat-", data)
  const url = `http://localhost:5173/images/${data.image}`
  return (
    loading ? <RingLoader /> :
      <div className='h-[50vh] w-[40vh] max-w-[40vh] bg-slate-500 flex flex-col shadow-2xl  m-10 rounded-lg'>
        <div className='w-[40vh] h-[40vh] overflow-hidden bg-green-400 rounded-t-lg '>
          <img src={url || image} className='w-[40vh] object-contain overflow-scroll hover:scale-110  hover:ease-out hover:transition-all hover:duration-500'></img>
        </div>
        {
          <div className='h-[10vh] rounded-b-lg flex flex-col gap-0 bg-slate-200 items-center justify-center'>
            <p className='font-medium text-center justify-center text-xl' style={{ fontFamily: "poppins", fontWeight: 600 }}>{data.title && data.title.substring(0, 20)}...</p>
            <p className='text-xs font-thin justify-center items-center '>{data.author}</p>
          </div>
        }

      </div >
  )
}
