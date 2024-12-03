import { Server as SocketIOServer } from "socket.io"
import cors from "cors"
import sqlite from 'sqlite3';


// const router = express.Router()
const db = new sqlite.Database('./msg.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err)
})
let sql = ``
const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      credentials: true,
      methods: ["GET", "POST"],
      origin: 'http://localhost:5173'
    }
  })

  io.on("connection", (socket) => {
    console.log("connected to = ", socket.id);

    socket.on("join_room", (data) => {
      console.log("joind room ", data);
      socket.join(data);
    });
    socket.on("send", (data) => {
      // console.log(data);
      // console.log(data.reciver + data.sender);
      const { message, senderId, reciverId, time } = data

      sql = `INSERT INTO msg (senderId,reciverId,message,time) VALUES (?,?,?,?)`
      db.run(sql, [senderId, reciverId, message, time], (err) => {
        if (err) {
          console.log("error in msg saving", err);
        } else {
          io.to(Number(senderId) + Number(reciverId)).emit("bckend", data)
          console.log("successful", Number(senderId) + Number(reciverId));
          // return res.status(200).send({ success: "Message sended successfully" })
        }
      })

    })

  })
}


export default setupSocket