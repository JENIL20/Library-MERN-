import express, { Router } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import NotFoundError from '../middleware/error.js'
import sqlite from 'sqlite3';
import bodyParser from 'body-parser'
import multer from 'multer'


const router = express.Router()
var storage = multer.diskStorage({
  destination: '../Pr/public/User/',
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage })
const db = new sqlite.Database("./user.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err)
})
// let sql = `CREATE TABLE user (ID INTEGER PRIMARY KEY,Name text,Email text,Password text,Img text)`
let sql = "alter table user add column image text"
// db.run(sql)

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser())
router.get('/all', (req, res, next) => {
  sql = "SELECT * from user"
  db.all(sql, [], (err, rows) => {
    if (err) return res.json({ status: 400, success: false, error: err })
    if (rows.length < 1) {
      return res.json({ status: 300, message: "no data found" })
    } else
      return res.json({ status: 200, data: rows, success: true })
  })
})
router.get('/:id', (req, res, next) => {
  console.log("find at user", req.params);
  sql = "SELECT * from user where id = ?"

  db.all(sql, [req.params.id], (err, rows) => {
    if (err) return res.json({ status: 400, success: false, error: err })
    if (rows.length < 1) {
      return res.json({ status: 300, message: "no data found" })
    } else
      return res.json({ status: 200, data: rows, success: true })
  })
})
router.post('/signup', (req, res) => {
  console.log(req.body);
  const { id, name, email, password } = req.body
  sql = "INSERT INTO user (ID,Name,Email,Password) VALUES (?,?,?,?)"
  db.run(sql, [id, name, email, password], (err) => {

    if (err) {
      return res.send({ status: 400, success: err })
    } else {
      const token = jwt.sign({ id, name, email, password }, "sdfa csdgfhsjdf")
      // res.cookie("jwt-token", token)
      return res.status(200).send({ success: "data added successsfully", token: token })
    }
  })

})
router.post('/image', upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log("id is here");
  // console.log(req.file.filename);
  sql = "select * from user where id=?"
  db.get(sql, [req.body.id], (err, row) => {
    console.log("at delet image", row);
    fs.unlink(`../Pr/public/User/${row.image}`, (err) => {
      if (err)
        console.log(err);
      else
        console.log("deleted successfull ", row.image);
    })
  })
  sql = "UPDATE user set image=? where id =? "
  db.run(sql, [req.file.filename, req.body.id], (err) => {

    if (err) {
      console.log(err);
      return res.send({ status: 400, success: err })
    } else {
      return res.status(200).send(req.file.filename)
    }
  })
})
router.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body
  sql = "select * from user where Email = ? and Password = ?"
  db.all(sql, [email, password], (err, rows) => {
    if (err) return res.json({ status: 400, success: false, error: err })
    if (rows.length < 1) {
      return res.json({ status: 300, message: "no data found" })
    } else {
      const token = jwt.sign({ email, password }, "sdfa csdgfhsjdf")
      return res.status(200).send({ ...rows[0], token: token })
    }
  })
})


export default router