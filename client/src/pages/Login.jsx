import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import mage from '../../public/user.gif'
import { Link, useNavigate } from "react-router-dom";
import Alert from "../component/Alert";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { createuser } from "../features/userslice";
const Login = () => {
  const user = useSelector(state => state.user)
  useEffect(() => {
    if (user && user.users && user.users.token && user.users.token != null) {
      console.log("hi i m heare at login", user.users);
      navigate('/')
    }
  }, [])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    const res = await axios.post("http://localhost:5000/user/login", data)
    const user = res.data
    console.log("response + ", user);
    dispatch(createuser(user))
    if (res.status === 200) {
      alert("user login")
      navigate('/')
    }
  };

  return (
    <div className="h-[100vh] w-[full] border border-black flex items-center justify-center ">

      <div className="h-[80vh] w-[160vh] bg-[#7FBCD2] rounded-2xl  flex  ">

        <div className="w-[50%] shadow-1xl flex flex-col h-full items-center">
          <h2 className="font-bold text-4xl pt-2">Login</h2>
          <form className="flex flex-col gap-3 pt-10  " onSubmit={handleSubmit(onSubmit)} >

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label >Email</label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}

              />
              {errors.email && <Alert type="red" message={errors.email.message} />}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label >Password</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <Alert type="red" message={errors.password.message} />
              )}
            </div>

            {/* Submit Button */}
            <div className="flex  justify-between mt-4 ">
              <button type="submit" className="bg-[#CAE4DB] h-12 rounded-md w-[16vh] hover:bg-[#127C56] hover:text-white">
                Login
              </button>
              {/* <button type="submit" className="bg-[#CAE4DB] h-12 rounded-md w-[16vh] hover:bg-[#127C56] hover:text-white">
                Signup
              </button> */}
            </div>
            <div className="flex  justify-between">
              <label>New User?</label>
              <Link to='/signup' className="text-blue-700 underline mr-3">Signup</Link>
            </div>
          </form>
        </div>
        <div className="w-[50%] shadow-2xl flex flex-col justify-center items-center h-full bg-white border-4 border-black  rounded-r-xl">
          <img className="" src={mage}></img>
        </div>
      </div>
    </div>

  );
};


export default Login;
