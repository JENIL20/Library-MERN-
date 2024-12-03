import React from "react";
import { useForm } from "react-hook-form";
import mage from '../../public/user.gif'
import { Link, useNavigate } from "react-router-dom";
import Alert from "../component/Alert";
import axios from 'axios'
const Signup = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    const res = await axios.post("http://localhost:5000/user/signup", data)
    if (res.status === 200)
      navigate('/login')
    console.log(res.cookies);

  };

  return (
    <div className="h-[100vh] w-[full] border border-black flex items-center justify-center ">

      <div className="h-[90vh] w-[160vh] bg-[#7FBCD2] rounded-2xl  flex  ">

        <div className="w-[50%] shadow-1xl flex flex-col h-full items-center">
          <h2 className="font-bold text-4xl pt-2">Sign-up</h2>
          <form className="flex flex-col gap-3 pt-10  " onSubmit={handleSubmit(onSubmit)} >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label >Name</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}

              />
              {errors.name && <Alert type="red" message={errors.name.message} />}
            </div>

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
                Signup
              </button>
              {/* <button type="submit" className="bg-[#CAE4DB] h-12 rounded-md w-[16vh] hover:bg-[#127C56] hover:text-white">
                Signup
              </button> */}
            </div>
            <div className="flex  justify-between">
              <label>Already a user?</label>
              <Link to='/login' className="text-blue-700 underline mr-3">Login</Link>
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

// // Inline styles
// const styles = {
//   container: {
//     width: "1000px",
//     margin: "auto",
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     fontFamily: "Arial, sans-serif",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   formGroup: {
//     marginBottom: "15px",
//   },
//   label: {
//     marginBottom: "5px",
//     fontWeight: "bold",
//   },
//   input: {
//     width: "100%",
//     padding: "8px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     padding: "10px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     fontSize: "0.8em",
//     marginTop: "5px",
//   },
// };

export default Signup;
