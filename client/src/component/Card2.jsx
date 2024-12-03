import React from 'react'
import { TbAirConditioning } from "react-icons/tb";
import { FaEnvira } from "react-icons/fa";
import { AiOutlineSound } from "react-icons/ai";
import { MdCleaningServices } from "react-icons/md";
import { useSelector } from 'react-redux';
import RingLoader from "react-spinners/ScaleLoader";
import Login from '../pages/Login';
export default function Card2(props) {
  const loading = useSelector(state => state.loading).loading
  // dispatch(Startloading())
  // dispatch(Endloading())
  const { type, text, header } = props
  // console.log(type);
  return (
    loading ? <RingLoader /> :
      <div className='h-[40vh] min-w-[40vh] outline  max-w-[40vh]  flex flex-col  rounded-lg hover:shadow-2xl hover:scale-105  hover:ease-out hover:transition-all hover:duration-500'>
        {/* {console.log("loading at card2 = ", loading)} */}

        <div className='h-[18vh] overflow-hidden flex content-center justify-center items-center bg-white rounded-t-lg '>
          {type == "1" && <TbAirConditioning className='text-5xl' />}
          {type == "2" && <FaEnvira className='text-5xl' />}
          {type == "3" && <AiOutlineSound className='text-5xl' />}
          {type == "4" && <MdCleaningServices className='text-5xl' />}
        </div>
        <div className='h-[8vh]  flex flex-col gap-0 bg-slate-200 items-center justify-center'>
          <p className='font-medium text-xl' style={{ fontFamily: "poppins", fontWeight: 600 }}>{header}</p>
        </div>
        <div className='h-[14vh] overflow-hidden flex justify-center bg-[#044343] text-white'>
          <p className='m-1 p b-2 text-center'>{text}</p>
        </div>

      </div >

  )
}
