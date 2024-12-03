import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import RingLoader from "react-spinners/ScaleLoader";

export default function Book1(props) {
  const loading = useSelector(state => state.loading).loading
  const data = { props }
  const params = useParams()
  const book = useSelector(state => state.book).books.find((item) => item.ID == params.id)
  const navigate = useNavigate()
  useEffect(() => {
    console.log(book);
    if (!book)
      navigate('/book')
  }, [])
  console.log("at book1", book);
  return (
    loading ? <RingLoader /> :
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={`http://localhost:5173/images/${book?.image}`}
              alt={book?.name}
              className="w-full h-auto rounded-md shadow-sm"
            />
          </div>
          <div className=" flex flex-col justify-between md:w-1/2 ml-5 md:pl-6">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800 mb-6">{book?.name}</h1>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Title :</span> {book?.title}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Author:</span> {book?.author}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Language:</span> {book?.language}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Pages:</span> {book?.pages}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Country :</span> {book?.country}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">yearofpublish :</span> {book?.yearofpublish}
              </p>
            </div>
            <div className='mt-12 flex justify-between mx-4 bottom-5'>
              <button className='bg-green-600 w-[15vh] h-[6vh] rounded-lg text-center content-center text-white font-bold hover:bg-green-700 '>Read</button>
              <button className='bg-green-600 w-[15vh] h-[6vh] rounded-lg text-center content-center text-white font-bold hover:bg-green-700 '>Buy</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
  )
}
