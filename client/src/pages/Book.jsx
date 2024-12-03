import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import { useSelector } from 'react-redux'
import Card from '../component/Card'
import { Link, useNavigate } from 'react-router-dom'

export default function Book() {
  const navigate = useNavigate()
  let books = useSelector(state => state.book)
  if (books.books)
    books = books.books
  // console.log("books me log he ", books);
  const handleclick = (id) => {
    navigate(`/book?${id}`)
  }
  return (
    <>
      <Navbar />
      <div className='flex flex-wrap justify-center'>
        {
          // console.log(typeof (books))
          books.length && books.map((item) => {
            return (
              <Link to={`/book/${item.ID}`} >
                <Card data={item} />
              </Link>
            )
          })
        }
      </div>
      <Footer />
    </>
  )
}
