import express, { Router } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import NotFoundError from '../middleware/error.js'
import sqlite from 'sqlite3';
import multer from 'multer'
import { log } from 'console'

const router = express.Router()
var storage = multer.diskStorage({
  destination: '../Pr/public/images/',
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage })
const db = new sqlite.Database("./book.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err)
})
// name: "",
// title: "",
// author: "",
// country: "",
// pages: "",
// language: "",
// yearofpublish: "",
// image: "",
let sql = `CREATE TABLE book (ID INTEGER PRIMARY KEY,name text,title text,author text,country text,pages text,language text,yearofpublish text,image text)`

// db.run(sql)

router.get('/allbook', (req, res) => {
  sql = "SELECT * from book"
  db.all(sql, [], (err, rows) => {
    if (err) return res.json({ status: 400, success: false, error: err })
    if (rows.length < 1) {
      return res.json({ status: 300, message: "no data found" })
    } else
      return res.json({ status: 200, data: rows, success: true })
  })
})
router.get('/:id', (req, res, next) => {
  const { id } = req.params
  sql = "SELECT * from book where ID = ?"
  db.all(sql, [id], (err, rows) => {
    if (err) return res.json({ status: 400, success: false, error: err })
    if (rows.length < 1) {
      return res.json({ status: 300, message: "no data found" })
    } else
      return res.json({ status: 200, data: rows, success: true })
  })
})
router.post('/addbook', upload.single('image'), (req, res) => {
  console.log(req.body);
  const { id,
    name,
    title,
    author,
    country,
    pages,
    language,
    yearofpublish,
    image
  } = req.body
  console.log(image);
  sql = "INSERT INTO book (id,name,title,author,country,pages,language,yearofpublish,image) VALUES (?,?,?,?,?,?,?,?,?)"
  db.run(sql, [id, name,
    title,
    author,
    country,
    pages,
    language,
    yearofpublish,
    image], (err) => {

      if (err) {
        return res.status(400).send({ status: 400, success: err.message })
      } else {
        return res.status(200).send({ success: "Book added successsfully" })
      }
    })

})
router.post('/updatebook', (req, res) => {
  const { id,
    name,
    title,
    author,
    country,
    pages,
    language,
    yearofpublish,
    image
  } = req.body
  console.log(id);
  sql = "UPDATE book set name=?,title=?,author=?,country=?,pages=?,language=?,yearofpublish=?,image=? where ID = ?"
  db.run(sql, [name,
    title,
    author,
    country,
    pages,
    language,
    yearofpublish,
    image,
    id,], (err) => {
      if (err) {
        return res.send({ status: 400, success: err.message })
      } else {
        return res.status(200).send({ success: "Book edited successsfully" })
      }
    })
  // res.send("success")
})
router.post('/addimg', upload.single('image'), (req, res) => {
  console.log(req.file.filename);
  res.send(req.file.filename)
})


export default router