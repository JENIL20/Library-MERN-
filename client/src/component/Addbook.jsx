import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Alert from './Alert';
import axios from 'axios'
import { set } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Endloading, Startloading } from '../features/loadingslice';
export default function Addbook() {
  const [alert, setalert] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    author: "",
    country: "",
    pages: "",
    language: "",
    image: "",
    yearofpublish: "",
  });
  const [file, setfile] = useState()
  // const [img, setimg] = useState()
  const formdata = new FormData()
  const handleChange = (e) => {
    // setalert(false)
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };
  const dispatch = useDispatch()
  const handleChangeimg = async (e) => {
    dispatch(Startloading())
    const { name } = e.target;

    formdata.append("image", e.target.files[0])
    // console.log(name, value);
    setfile(URL.createObjectURL(e.target.files[0]));
    const res = await axios.post('http://localhost:5000/book/addimg', formdata)
    const value = await res.data
    // console.log(res.data);
    setFormData({ ...formData, "image": value });
    // console.log("form=", formData);
    dispatch(Endloading())
  }
  const onSubmit = async (data) => {
    dispatch(Startloading())
    console.log(data);

    const res = await axios.post('http://localhost:5000/book/addbook', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    if (res.status === 200) {
      setalert(true)
      console.log("responce at add book = ", res);
    }
    dispatch(Endloading())
  }

  const handleSubmit = (e) => {
    dispatch(Startloading())
    onSubmit(formData); // Pass data to the parent or API
    console.log("Booking Data:", formData);
    e.preventDefault();
    formdata.delete('image')
    // Optionally reset the form after submission
    setFormData({
      name: "",
      title: "",
      author: "",
      country: "",
      pages: "",
      language: "",
      yearofpublish: "",
      image: "",
    });
    setfile("")
    dispatch(Endloading())
  };
  useEffect(() => {
    const timer = setTimeout(() => setalert(false), 5000);
  }, [alert]);
  return (
    <>
      <Navbar />
      {
        alert && <Alert type="green" message="Book added successfully" />
      }
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add a New Book
        </h2>

        {/* Bookname */}
        <div className="mb-4">
          <label
            htmlFor="Bookname"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Book Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Book name"
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Book title"
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* author  */}
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Author name
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* country */}
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Contry"
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* pages */}
        <div className="mb-4">
          <label
            htmlFor="pages"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            pages
          </label>
          <input
            type="text"
            id="pages"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            placeholder="pages"
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* language */}
        <div className="mb-4">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            language
          </label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="language"
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* yearofpublish */}
        <div className="mb-4">
          <label
            htmlFor="yearofpublish"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            yearofpublish
          </label>
          <input
            type="date"
            id="yearofpublish"
            name="yearofpublish"
            value={formData.yearofpublish}
            onChange={handleChange}
            placeholder="Yearofpublish"
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* image */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            // value={file}
            onChange={handleChangeimg}
            placeholder="image"
            required
            accept="image/*"
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          // onClick={() => onSubmit(formData)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Book Now
        </button>
      </form>
      {/* {console.log("file image e che k", file.length)} */}
      {file && file.length ? <img src={file} alt='sadfasdf' className='bg-black h-[80vh]' /> : <></>}
      <Footer />
    </>
  )
}
