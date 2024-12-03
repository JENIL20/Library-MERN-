import sqlite from 'sqlite3';
import express from 'express'


const router = express.Router()
const db = new sqlite.Database('./msg.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err)
})
// let sql = `TRUNCATE TABLE msg`
let sql = `CREATE TABLE msg (ID INTEGER PRIMARY KEY,senderId INTEGER,reciverId INTEGER,message text,time DATETIME )`
// let sql = "alter table user add column image text"
// db.run(sql, [], (err) => {
//   if (err)
//     console.log(err);
// })

router.post('/send', (req, res) => {
  const { msg, sender, reciver, time } = req.body
  sql = `INSERT INTO msg (senderId,reciverId,message) VALUES (?,?,?)`
  db.run(sql, [sender, reciver, msg], (err) => {
    if (err) {
      return res.status(400).send({ status: 400, success: err.message })
    } else {
      return res.status(200).send({ success: "Message sended successfully" })
    }
  })
})

router.post('/find', (req, res) => {
  // console.log(req.body);
  const { senderId, reciverId } = req.body
  sql = "SELECT * from msg where senderId = ? and reciverId = ? union SELECT * from msg where senderId = ? and reciverId = ?"
  db.all(sql, [senderId, reciverId, reciverId, senderId], (err, rows) => {
    if (err) return res.json({ status: 400, success: false, error: err })
    if (rows.length < 1) {
      return res.json({ status: 300, message: "no data found" })
    } else
      return res.json({ status: 200, data: rows, success: true })
  })
})
router.get('/all', (req, res) => {
  sql = "SELECT * from msg"
  db.all(sql, [], (err, rows) => {
    if (err) return res.json({ status: 400, success: false, error: err })
    if (rows.length < 1) {
      return res.json({ status: 300, message: "no data found" })
    } else
      return res.json({ status: 200, data: rows, success: true })
  })
})

export default router 